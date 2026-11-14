import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    community: String,
    title: String,
    body: String,
    author: { type: String, default: "Employee" },
    likes: { type: Number, default: 0 },
    comments: [
      {
        author: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("CommunityPost", postSchema);
