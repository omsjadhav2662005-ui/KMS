import { Router } from "express";
import Knowledge from "../models/Knowledge.js";
import Activity from "../models/Activity.js";
import Question from "../models/Question.js";
import CommunityPost from "../models/CommunityPost.js";
const router = Router();
router.get("/dashboard", async (_req, res, next) => {
  try {
    const [total, published, pending, views, likes, top, recent, activity] =
      await Promise.all([
        Knowledge.countDocuments({ status: { $ne: "Archived" } }),
        Knowledge.countDocuments({ status: "Published" }),
        Knowledge.countDocuments({ status: "Pending" }),
        Knowledge.aggregate([
          { $group: { _id: null, total: { $sum: "$views" } } },
        ]),
        Knowledge.aggregate([
          { $group: { _id: null, total: { $sum: "$likes" } } },
        ]),
        Knowledge.find({ status: "Published" }).sort({ views: -1 }).limit(5),
        Knowledge.find({ status: "Published" })
          .sort({ createdAt: -1 })
          .limit(5),
        Activity.find().sort({ createdAt: -1 }).limit(8),
      ]);
    res.json({
      success: true,
      data: {
        total,
        published,
        pending,
        views: views[0]?.total || 0,
        likes: likes[0]?.total || 0,
        top,
        recent,
        activity,
      },
    });
  } catch (e) {
    next(e);
  }
});
router.get("/filters", async (_req, res, next) => {
  try {
    const [businesses, functions, types, topics] = await Promise.all(
      ["business", "function", "contentType", "topic"].map((k) =>
        Knowledge.distinct(k)
      )
    );
    res.json({
      success: true,
      data: { businesses, functions, contentTypes: types, topics },
    });
  } catch (e) {
    next(e);
  }
});
router.get("/activity", async (_req, res, next) => {
  try {
    res.json({
      success: true,
      data: await Activity.find().sort({ createdAt: -1 }).limit(30),
    });
  } catch (e) {
    next(e);
  }
});
router.get("/questions", async (_req, res, next) => {
  try {
    res.json({
      success: true,
      data: await Question.find().sort({ createdAt: -1 }),
    });
  } catch (e) {
    next(e);
  }
});
router.post("/questions", async (req, res, next) => {
  try {
    const q = await Question.create({
      question: req.body.question,
      askedBy: req.body.askedBy || "Employee",
    });
    res.status(201).json({ success: true, data: q });
  } catch (e) {
    next(e);
  }
});
router.patch("/questions/:id", async (req, res, next) => {
  try {
    const q = await Question.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json({ success: true, data: q });
  } catch (e) {
    next(e);
  }
});
router.get("/communities", async (_req, res, next) => {
  try {
    const posts = await CommunityPost.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (e) {
    next(e);
  }
});
router.post("/communities", async (req, res, next) => {
  try {
    const post = await CommunityPost.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (e) {
    next(e);
  }
});
router.post("/communities/:id/like", async (req, res, next) => {
  try {
    const post = await CommunityPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json({ success: true, data: post });
  } catch (e) {
    next(e);
  }
});
router.get("/experts", (_req, res) =>
  res.json({
    success: true,
    data: [
      {
        name: "Priya Mehta",
        role: "Digital Transformation Lead",
        business: "Grasim Industries",
        expertise: "Digital Transformation, Automation",
        initials: "PM",
      },
      {
        name: "Ravi Kulkarni",
        role: "Finance Excellence Partner",
        business: "UltraTech Cement",
        expertise: "FP&A, Cost Optimisation",
        initials: "RK",
      },
      {
        name: "Ananya Shah",
        role: "People & Culture Expert",
        business: "Aditya Birla Capital",
        expertise: "Talent, Culture",
        initials: "AS",
      },
      {
        name: "Vikram Nair",
        role: "AI & Analytics Specialist",
        business: "Hindalco",
        expertise: "AI, Data Analytics",
        initials: "VN",
      },
    ],
  })
);
router.get("/leaderboard", async (_req, res, next) => {
  try {
    const rows = await Knowledge.aggregate([
      { $match: { status: "Published" } },
      {
        $group: {
          _id: "$author",
          contributions: { $sum: 1 },
          views: { $sum: "$views" },
          likes: { $sum: "$likes" },
        },
      },
      { $sort: { contributions: -1, likes: -1 } },
      { $limit: 10 },
    ]);
    res.json({ success: true, data: rows });
  } catch (e) {
    next(e);
  }
});
router.post("/assistant", async (req, res, next) => {
  try {
    const question = String(req.body.question || "").trim();
    if (!question)
      return res.status(400).json({ message: "Please enter a question" });
    const terms = question
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2);
    const candidates = await Knowledge.find({ status: "Published" }).limit(200);
    const scored = candidates
      .map((k) => {
        const hay = [
          k.title,
          k.description,
          k.content,
          k.topic,
          k.function,
          ...k.keywords,
        ]
          .join(" ")
          .toLowerCase();
        return {
          item: k,
          score: terms.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0),
        };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    res.json({
      success: true,
      data: {
        answer: scored.length
          ? `I found ${scored.length} relevant item(s) in the Knowledge Hub. ` +
            "Review the cited knowledge cards below for the source material. " +
            "This assistant currently searches the approved repository; " +
            "it does not invent answers beyond those records."
          : "I could not find a matching published item. Try different keywords, or submit this question to an expert.",
        sources: scored.map((x) => ({
          _id: x.item._id,
          title: x.item.title,
          business: x.item.business,
          topic: x.item.topic,
          description: x.item.description,
        })),
      },
    });
  } catch (e) {
    next(e);
  }
});
export default router;
