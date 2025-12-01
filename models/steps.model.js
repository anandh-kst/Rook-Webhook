import mongoose from "mongoose";
const StepsHistorySchema = new mongoose.Schema({
  client_uuid: String,
  user_id: String,

  steps: Number,
  datetime: Date,
  source: String,

  raw: Object,
});

export default mongoose.model("StepsHistory", StepsHistorySchema);
