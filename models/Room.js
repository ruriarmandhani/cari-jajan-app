import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  members: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    required: true,
  },
  messages: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    required: true,
  },
});

export default mongoose.model("Room", roomSchema);
