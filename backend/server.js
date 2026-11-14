import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import knowledgeRoutes from "./src/routes/knowledge.js";
import platformRoutes from "./src/routes/platform.js";
dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || true }));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("uploads")));
app.get("/api/health", (_req, res) =>
  res.json({
    success: true,
    message: "ABG Knowledge Hub API is running",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  })
);
app.use("/api/knowledge", knowledgeRoutes);
app.use("/api", platformRoutes);
app.use((req, res) =>
  res
    .status(404)
    .json({
      success: false,
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    })
);
app.use((err, _req, res, _next) => {
  console.error(err);
  res
    .status(err.name === "ValidationError" ? 400 : 500)
    .json({ success: false, message: err.message || "Server error" });
});
const port = process.env.PORT || 5000;
if (!process.env.MONGODB_URI)
  console.error(
    "MONGODB_URI is missing. Copy .env.example to .env and add your Atlas connection string."
  );
else
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Atlas connected"))
    .catch((e) => console.error("MongoDB connection failed:", e.message));
app.listen(port, () =>
  console.log(`ABG Knowledge Hub API listening on http://localhost:${port}`)
);
