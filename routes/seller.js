import express from "express";
import {
  becomeSeller,
  getSeller,
  getLocations,
} from "../controllers/seller.js";
import verifyToken from "../utils/verify_token.js";

const router = express.Router();

router.post("/", verifyToken, becomeSeller);

router.get("/locations", verifyToken, getLocations);

router.get("/search/:id", verifyToken, getSeller);

export default router;
