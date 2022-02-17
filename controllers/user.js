import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const user = await User.find().select("name email phone");
  res.send(user);
  // res.send("test");
};

export const getUserById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  res.send(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  res.send(user);
};
