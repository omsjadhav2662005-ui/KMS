import mongoose from "mongoose";
const activitySchema = new mongoose.Schema(
  {
    type: String,
    actor: { type: String, default: "Knowledge Hub User" },
    message: String,
    knowledgeId: String,
  },
  { timestamps: true }
);
export default mongoose.model("Activity", activitySchema);
