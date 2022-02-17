import express from "express";
import Room from "../models/Room.js";
import Message from "../models/Message.js";

const router = express.Router();

router.post("/send-message", async (req, res) => {
  const message = new Message({
    senderId: req.body.senderId,
    // receiverId: req.body.receiverId,
    message: req.body.message,
  });
  await message.save();
  res.send(message);
  // try {
  //   const savedMessage = await message.save();
  //   console.log(savedMessage);
  //   res.send(savedMessage);
  // } catch (error) {
  //   res.status(400).send(error);
  // }
});

export default router;
