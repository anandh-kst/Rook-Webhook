import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  client_uuid: { type: String, required: true },
  name: String,
});

export default mongoose.model("User", UserSchema);
