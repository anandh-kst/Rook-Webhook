import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/webhook.route.js";
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use("/webhook/rook", router);

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || "rook",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Rook Webhook API Running...");
});


app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
