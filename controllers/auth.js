import User from "../models/User.js";
import { registerValidation, loginValidation } from "../utils/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  //Validate data before creating a new user
  const { error, value } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists.");

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    phone: req.body.phone,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  //Validate data before logging in
  const { error, value } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the email is exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Could't find your email.");

  //Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  //Create token for user
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header("Access-Token", token).send(token);
};
