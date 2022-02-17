import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      max: 255,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0.0, 0.0],
      },
    },
  },
  {
    timestamps: true,
  }
);

sellerSchema.index({ location: "2dsphere" });

export default mongoose.model("Seller", sellerSchema);
