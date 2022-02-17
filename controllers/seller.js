import mongoose from "mongoose";
import Seller from "../models/Seller.js";
import { sellerValidation } from "../utils/validation.js";

export const becomeSeller = async (req, res) => {
  const { error, value } = sellerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the userId already exists
  const userId = await Seller.findOne({ userId: req.body.userId });
  if (userId) return res.status(400).send("userId already exists.");

  //Become a seller
  const seller = new Seller({
    userId: req.body.userId,
    name: req.body.name,
    items: req.body.items,
  });

  try {
    const savedSeller = await seller.save();
    res.send(savedSeller);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getSeller = async (req, res) => {
  const seller = await Seller.findOne({ _id: req.params.id }).populate({
    path: "userId",
    select: "name phone",
  });
  if (!seller) return res.status(404).send("Seller not found.");
  res.send(seller);
};

export const getLocations = async (req, res) => {
  const long = parseFloat(req.query.long);
  const lat = parseFloat(req.query.lat);
  const coordinates = long && lat ? [long, lat] : [0, 0];
  const maxDist = req.query.max_distance || 2000;

  const locations = await Seller.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        $maxDistance: maxDist,
      },
    },
  }).select("location items");

  if (!locations.length) return res.status(404).send("Can't find any seller.");

  res.send(locations);
};
