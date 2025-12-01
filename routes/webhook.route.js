import express from "express";
import User from "../models/user.model.js";
import BodyHistory from "../models/body.model.js";
import SleepHistory from "../models/sleep.model.js";
import StepsHistory from "../models/steps.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { data_structure, client_uuid, user_id } = req.body;

    let user = await User.findOne({ client_uuid, user_id });
    if (!user) {
      user = await User.create({ client_uuid, user_id });
      console.log("NEW USER CREATED:", user_id);
    }

    if (data_structure === "body_summary") {
      const summary = req.body.body_health.summary.body_summary;

      await BodyHistory.create({
        client_uuid,
        user_id,
        weight: summary.body_metrics.weight_kg_float,
        height: summary.body_metrics.height_cm_int,
        bmi: summary.body_metrics.bmi_float,
        source: summary.metadata.sources_of_data_array[0],
        datetime: summary.metadata.datetime_string,
        raw: req.body,
      });
    }

    if (data_structure === "sleep_summary") {
      const summary = req.body.sleep_health.summary.sleep_summary;

      await SleepHistory.create({
        client_uuid,
        user_id,
        sleep_start: summary.duration.sleep_start_datetime_string,
        sleep_end: summary.duration.sleep_end_datetime_string,
        duration_seconds: summary.duration.sleep_duration_seconds_int,
        quality_score: summary.scores.sleep_efficiency_1_100_score_int,
        source: summary.metadata.sources_of_data_array[0],
        datetime: summary.metadata.datetime_string,
        raw: req.body,
      });
    }

    if (data_structure === "steps_event") {
      const event = req.body.physical_health.events.steps_event[0];

      await StepsHistory.create({
        client_uuid,
        user_id,
        steps: parseInt(event.steps.accumulated_steps_int),
        datetime: event.metadata.datetime_string,
        source: event.metadata.sources_of_data_array[0],
        raw: req.body,
      });
    }

    return res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process Rook data" });
  }
});


export default router;
