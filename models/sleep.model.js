import mongoose from "mongoose";

const SleepHistorySchema = new mongoose.Schema({
  client_uuid: String,
  user_id: String,

  sleep_start: Date,
  sleep_end: Date,
  duration_seconds: Number,
  quality_score: Number,

  source: String,
  datetime: Date,

  raw: Object,
});

export default mongoose.model("SleepHistory", SleepHistorySchema);
