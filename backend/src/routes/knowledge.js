import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Knowledge from "../models/Knowledge.js";
import Activity from "../models/Activity.js";
const router = Router();
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) =>
    cb(
      null,
      `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")}`
    ),
});
const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });
router.get("/", async (req, res, next) => {
  try {
    const {
      q,
      business,
      function: fn,
      contentType,
      status,
      sort = "newest",
      limit = 100,
    } = req.query;
    const filter = {};
    if (q)
      filter.$or = [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { content: new RegExp(q, "i") },
        { keywords: new RegExp(q, "i") },
        { topic: new RegExp(q, "i") },
      ];
    if (business) filter.business = business;
    if (fn) filter.function = fn;
    if (contentType) filter.contentType = contentType;
    if (status) filter.status = status;
    else filter.status = { $ne: "Archived" };
    const sortMap = {
      trending: { views: -1, likes: -1 },
      mostViewed: { views: -1 },
      newest: { createdAt: -1 },
      rating: { rating: -1 },
    };
    const items = await Knowledge.find(filter)
      .sort(sortMap[sort] || sortMap.newest)
      .limit(Math.min(Number(limit) || 100, 250));
    res.json({ success: true, count: items.length, data: items });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Knowledge.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!item)
      return res.status(404).json({ message: "Knowledge item not found" });
    res.json({ success: true, data: item });
  } catch (e) {
    next(e);
  }
});
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    const body = { ...req.body };
    if (typeof body.keywords === "string")
      body.keywords = body.keywords
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
    if (req.file) body.fileUrl = `/uploads/${req.file.filename}`;
    const item = await Knowledge.create(body);
    await Activity.create({
      type: "created",
      message: `${item.title} was added to the repository`,
      knowledgeId: String(item._id),
    });
    res.status(201).json({ success: true, data: item });
  } catch (e) {
    next(e);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const item = await Knowledge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item)
      return res.status(404).json({ message: "Knowledge item not found" });
    res.json({ success: true, data: item });
  } catch (e) {
    next(e);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const item = await Knowledge.findByIdAndUpdate(
      req.params.id,
      { status: "Archived" },
      { new: true }
    );
    if (!item)
      return res.status(404).json({ message: "Knowledge item not found" });
    res.json({ success: true, message: "Content archived", data: item });
  } catch (e) {
    next(e);
  }
});
router.post("/:id/like", async (req, res, next) => {
  try {
    const item = await Knowledge.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json({ success: true, data: item });
  } catch (e) {
    next(e);
  }
});
router.post("/:id/bookmark", async (req, res, next) => {
  try {
    const item = await Knowledge.findByIdAndUpdate(
      req.params.id,
      { $inc: { bookmarks: 1 } },
      { new: true }
    );
    res.json({ success: true, data: item });
  } catch (e) {
    next(e);
  }
});
router.post("/:id/share", async (req, res, next) => {
  try {
    const item = await Knowledge.findByIdAndUpdate(
      req.params.id,
      { $inc: { shares: 1 } },
      { new: true }
    );
    res.json({ success: true, data: item });
  } catch (e) {
    next(e);
  }
});
router.post("/:id/comments", async (req, res, next) => {
  try {
    const item = await Knowledge.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: { name: req.body.name || "Employee", text: req.body.text },
        },
      },
      { new: true }
    );
    res.json({ success: true, data: item });
  } catch (e) {
    next(e);
  }
});
router.patch("/:id/workflow", async (req, res, next) => {
  try {
    const { status, by = "Approver", note = "" } = req.body;
    const item = await Knowledge.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status },
        $push: {
          approvalHistory: { action: status, by, note, at: new Date() },
        },
      },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Content not found" });
    await Activity.create({
      type: "workflow",
      message: `${item.title}: ${status}`,
      knowledgeId: String(item._id),
    });
    res.json({ success: true, data: item });
  } catch (e) {
    next(e);
  }
});
export default router;
