import mongoose from "mongoose";

const BodyHistorySchema = new mongoose.Schema({
  client_uuid: String,
  user_id: String,
  
  weight: Number,
  height: Number,
  bmi: Number,
  
  source: String,
  datetime: Date,

  raw: Object, 
});


export default mongoose.model("BodyHistory", BodyHistorySchema);
