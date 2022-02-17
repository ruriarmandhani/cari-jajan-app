import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

//Import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import sellerRoutes from "./routes/seller.js";
import chatRoutes from "./routes/chat.js";
import otpRoutes from "./routes/otp.js";

dotenv.config({ path: "./config/config.env" });

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, () =>
  console.log("Connected to MongoDB")
);

const app = express();

const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Route middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/otp", otpRoutes);

app.get("/", (req, res) => {
  res.send("API is ready");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
