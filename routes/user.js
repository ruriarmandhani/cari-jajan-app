import express from "express";
import { getUsers, getUserById, updateUser } from "../controllers/user.js";
import verifyToken from "../utils/verify_token.js";

const router = express.Router();

// Get all users
router.get("/", verifyToken, getUsers);

// Get user by ID
router.get("/:id", verifyToken, getUserById);

// update user by id
router.put("/:id", verifyToken, updateUser);

export default router;
