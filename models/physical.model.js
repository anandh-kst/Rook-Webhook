import mongoose from "mongoose";

const PhysicalSummarySchema = new mongoose.Schema(
  {
    client_uuid: String,
    user_id: String,

    active_seconds: Number,
    rest_seconds: Number,

    calories_expenditure: Number,
    calories_bmr: Number,

    steps: Number,
    traveled_distance_meters: Number,

    hr_avg: Number,
    hr_rest: Number,

    source: String,
    datetime: String,

    raw: Object 
  },
  { timestamps: true }
);

export default mongoose.model("PhysicalSummary", PhysicalSummarySchema);
