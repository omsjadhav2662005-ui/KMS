import mongoose from "mongoose";
import dotenv from "dotenv";
import Knowledge from "./src/models/Knowledge.js";
import Question from "./src/models/Question.js";
import CommunityPost from "./src/models/CommunityPost.js";
import Activity from "./src/models/Activity.js";
dotenv.config();
if (!process.env.MONGODB_URI) {
  console.error("Set MONGODB_URI in backend/.env");
  process.exit(1);
}
await mongoose.connect(process.env.MONGODB_URI);
const samples = [
  {
    title: "AI-Powered Predictive Salary Planning",
    description:
      "Using analytics and automation to improve workforce cost forecasting and planning.",
    content:
      "A finance and HR collaboration case study covering data consolidation, " +
      "forecasting, governance and measurable process improvements.",
    business: "Aditya Birla Group",
    function: "Finance",
    topic: "Digital Transformation",
    contentType: "Case Study",
    author: "Finance Excellence Team",
    keywords: ["AI", "forecasting", "payroll", "automation"],
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900",
    views: 1280,
    likes: 86,
    rating: 4.8,
  },
  {
    title: "Waste Heat Recovery Optimisation",
    description:
      "A practical approach to energy efficiency and operational excellence in manufacturing.",
    content:
      "This best practice documents opportunity identification, baseline measurement, implementation governance and operational monitoring.",
    business: "UltraTech Cement",
    function: "Operations",
    topic: "Sustainability & ESG",
    contentType: "Best Practice",
    author: "Operations Centre of Excellence",
    keywords: ["energy", "sustainability", "manufacturing"],
    thumbnail:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=900",
    views: 970,
    likes: 64,
    rating: 4.7,
  },
  {
    title: "People First Culture Transformation",
    description:
      "Building an inclusive, collaborative and high-performance employee experience.",
    content:
      "A transformation story focused on listening mechanisms, manager enablement, employee engagement and continuous feedback.",
    business: "Aditya Birla Capital",
    function: "Human Resources",
    topic: "People & Culture",
    contentType: "Success Story",
    author: "People & Culture Team",
    keywords: ["culture", "people", "engagement"],
    thumbnail:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900",
    views: 845,
    likes: 73,
    rating: 4.9,
  },
  {
    title: "Generative AI in Customer Operations",
    description:
      "Applying GenAI to streamline customer service workflows and knowledge retrieval.",
    content:
      "The use case explains responsible AI adoption, knowledge grounding, human review and service quality measurement.",
    business: "Hindalco",
    function: "Information Technology",
    topic: "AI & Analytics",
    contentType: "AI Use Case",
    author: "Digital Innovation Office",
    keywords: ["GenAI", "AI", "customer", "analytics"],
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900",
    views: 1520,
    likes: 112,
    rating: 4.9,
  },
  {
    title: "Working Capital Improvement Playbook",
    description:
      "A repeatable framework to improve receivables, inventory and cash conversion.",
    content:
      "A functional practice with diagnostic metrics, ownership model, review cadence and lessons learned.",
    business: "Grasim Industries",
    function: "Finance",
    topic: "Financial Excellence",
    contentType: "Functional Practice",
    author: "Corporate Finance",
    keywords: ["working capital", "cash flow", "finance"],
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900",
    views: 690,
    likes: 52,
    rating: 4.6,
  },
  {
    title: "Digital Procurement Transformation",
    description:
      "Standardising procurement processes through digital workflows and spend visibility.",
    content:
      "A business transformation story on process mapping, supplier collaboration, adoption and governance.",
    business: "Aditya Birla Group",
    function: "Procurement",
    topic: "Digital Transformation",
    contentType: "Transformation Story",
    author: "Procurement Excellence",
    keywords: ["procurement", "digital", "process"],
    thumbnail:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900",
    views: 730,
    likes: 48,
    rating: 4.5,
  },
  {
    title: "Safety Excellence Through Daily Management",
    description:
      "Embedding consistent safety routines and frontline ownership.",
    content:
      "A practical case study covering leading indicators, daily huddles, incident learning and accountability.",
    business: "UltraTech Cement",
    function: "Operations",
    topic: "Operational Excellence",
    contentType: "Case Study",
    author: "Safety Council",
    keywords: ["safety", "operations", "best practice"],
    thumbnail:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900",
    views: 610,
    likes: 39,
    rating: 4.6,
  },
  {
    title: "Customer Insights and Service Recovery",
    description:
      "Using customer feedback to identify recurring issues and improve service outcomes.",
    content:
      "An expert insight on feedback loops, root-cause analysis and customer-centric process design.",
    business: "Aditya Birla Capital",
    function: "Customer Experience",
    topic: "Customer Centricity",
    contentType: "Knowledge Article",
    author: "Customer Experience Office",
    keywords: ["customer", "service", "insights"],
    thumbnail:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900",
    views: 560,
    likes: 42,
    rating: 4.4,
  },
];
if ((await Knowledge.countDocuments()) === 0) {
  await Knowledge.insertMany(samples);
  console.log("Inserted sample knowledge records");
} else
  console.log(
    "Knowledge collection already has records; skipping sample insert"
  );
if ((await Question.countDocuments()) === 0)
  await Question.insertMany([
    {
      question:
        "How can we improve working capital visibility across business units?",
      askedBy: "Finance Team",
      expert: "Ravi Kulkarni",
      status: "Open",
    },
    {
      question:
        "What governance is recommended for GenAI knowledge assistants?",
      askedBy: "Digital Office",
      expert: "Vikram Nair",
      status: "Answered",
      answer:
        "Use approved source content, clear ownership, human review and periodic quality checks.",
    },
  ]);
if ((await CommunityPost.countDocuments()) === 0)
  await CommunityPost.insertMany([
    {
      community: "Finance Excellence",
      title: "Ideas to improve monthly forecasting accuracy",
      body: "What practices have worked well across your teams for improving forecast assumptions and variance reviews?",
      author: "Finance Excellence Team",
      likes: 18,
    },
    {
      community: "AI & Analytics",
      title: "Responsible GenAI adoption – lessons learned",
      body: "Share examples of how your teams are grounding AI responses in trusted internal knowledge.",
      author: "Digital Innovation Office",
      likes: 26,
    },
    {
      community: "People & Culture",
      title: "Building communities of practice",
      body: "How can we encourage more peer-to-peer learning across businesses?",
      author: "People Team",
      likes: 12,
    },
  ]);
if ((await Activity.countDocuments()) === 0)
  await Activity.create({
    type: "system",
    message: "ABG Knowledge Hub sample workspace initialised",
  });
await mongoose.disconnect();
console.log("Seed completed.");
