import mongoose from "mongoose";
const knowledgeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    content: { type: String, default: "" },
    business: { type: String, default: "Aditya Birla Group" },
    function: { type: String, default: "General" },
    topic: { type: String, default: "Business Excellence" },
    contentType: { type: String, default: "Case Study" },
    author: { type: String, default: "Knowledge Hub Team" },
    keywords: [{ type: String }],
    thumbnail: { type: String, default: "" },
    fileUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Published", "Pending", "Revision", "Rejected", "Archived"],
      default: "Published",
    },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5 },
    bookmarks: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: [
      {
        name: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    approvalHistory: [
      {
        action: String,
        by: String,
        note: String,
        at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Knowledge", knowledgeSchema);
