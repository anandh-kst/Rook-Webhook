import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/webhook.route.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "5mb" }));

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || "rook_health",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/webhook/rook", router);

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
