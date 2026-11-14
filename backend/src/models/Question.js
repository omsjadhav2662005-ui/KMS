import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    askedBy: { type: String, default: "Employee" },
    expert: { type: String, default: "" },
    answer: { type: String, default: "" },
    status: { type: String, default: "Open" },
  },
  { timestamps: true }
);
export default mongoose.model("Question", questionSchema);
