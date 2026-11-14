import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import {
  Sparkles,   ArrowRight,
  ChevronRight,  ChevronLeft,
  TrendingUp,  PlayCircle,
  Send,  SlidersHorizontal,
  Plus,  FileText,
  Users,  Eye,
  Heart,  MessageCircle,
  Bookmark,  Clock3,
  CheckCircle2,  XCircle,
  RefreshCw,  Search,
  Download,  ExternalLink,
  Star,  Lightbulb,
  Mic,  MoreHorizontal,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import KnowledgeCard from "./components/KnowledgeCard";
import api, {
  getKnowledge,
  getDashboard,
  getFilters,
  getQuestions,
  getCommunities,
  getExperts,
  getLeaderboard,
} from "./services/api";
const fallback = [
  {
    _id: "demo1",
    title: "AI-Powered Predictive Salary Planning",
    description:
      "Using analytics and automation to improve workforce cost forecasting and planning.",
    business: "Aditya Birla Group",
    function: "Finance",
    topic: "Digital Transformation",
    contentType: "Case Study",
    author: "Finance Excellence Team",
    views: 1280,
    likes: 86,
    rating: 4.8,
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900",
  },
  {
    _id: "demo2",
    title: "Waste Heat Recovery Optimisation",
    description:
      "A practical approach to energy efficiency and operational excellence in manufacturing.",
    business: "UltraTech Cement",
    function: "Operations",
    topic: "Sustainability & ESG",
    contentType: "Best Practice",
    views: 970,
    likes: 64,
    rating: 4.7,
    thumbnail:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=900",
  },
  {
    _id: "demo3",
    title: "People First Culture Transformation",
    description:
      "Building an inclusive, collaborative and high-performance employee experience.",
    business: "Aditya Birla Capital",
    function: "Human Resources",
    topic: "People & Culture",
    contentType: "Success Story",
    views: 845,
    likes: 73,
    rating: 4.9,
    thumbnail:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900",
  },
  {
    _id: "demo4",
    title: "Generative AI in Customer Operations",
    description:
      "Applying GenAI to streamline customer service workflows and knowledge retrieval.",
    business: "Hindalco",
    function: "Information Technology",
    topic: "AI & Analytics",
    contentType: "AI Use Case",
    views: 1520,
    likes: 112,
    rating: 4.9,
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900",
  },
];
function SectionTitle({ title, sub, action, onAction }) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {action && (
        <button className="text-action" onClick={onAction}>
          {action} <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}
function Home({ items, refresh }) {
  const nav = useNavigate();
  const [slide, setSlide] = useState(0);
  const featured = items[slide % Math.max(items.length, 1)] || fallback[0];
  return (
    <>
      <div className="welcome-row">
        <div>
          <div className="eyebrow">THURSDAY, 12 NOVEMBER 2026</div>
          <h1>
            Good afternoon, Om <span>✦</span>
          </h1>
          <p>
            Discover insights. Connect with experts. Turn knowledge into impact.
          </p>
        </div>
        <div className="welcome-badge">
          <Sparkles size={16} /> Your learning journey
        </div>
      </div>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span /> KNOWLEDGE THAT MOVES US FORWARD
          </div>
          <h2>
            Powering business impact
            <br />
            through <em>shared knowledge.</em>
          </h2>
          <p>
            Discover insights. Connect with experts.
            <br />
            Create impact across ABG.
          </p>
          <button className="primary-btn" onClick={() => nav("/discover")}>
            Explore Case Studies <ArrowRight size={16} />
          </button>
        </div>
        <div className="hero-art">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="art-panel">
            <div className="art-top">
              <span /> KNOWLEDGE ECOSYSTEM
            </div>
            <div className="art-grid">
              <div className="art-tile tile-a">
                <TrendingUp />
                <b>
                  Business
                  <br />
                  Impact
                </b>
              </div>
              <div className="art-tile tile-b">
                <Lightbulb />
                <b>
                  New
                  <br />
                  Ideas
                </b>
              </div>
              <div className="art-tile tile-c">
                <Users />
                <b>
                  Shared
                  <br />
                  Learning
                </b>
              </div>
              <div className="art-tile tile-d">
                <Sparkles />
                <b>Innovation</b>
              </div>
            </div>
            <div className="art-caption">CAPTURE · CONNECT · CREATE</div>
          </div>
        </div>
      </section>
      <div className="main-grid">
        <div className="main-column">
          <SectionTitle
            title="Recommended for you"
            sub="Handpicked knowledge based on your interests"
            action="View all"
            onAction={() => nav("/discover")}
          />
          <div className="cards-grid">
            {items.slice(0, 4).map((x, i) => (
              <KnowledgeCard
                key={x._id}
                item={x}
                index={i}
                onRefresh={refresh}
              />
            ))}
          </div>
          <SectionTitle
            title="Explore by theme"
            sub="Find knowledge across our focus areas"
            action="Explore all"
            onAction={() => nav("/discover")}
          />
          <div className="theme-grid">
            {[
              ["Digital Transformation", "48 Case Studies", "theme-blue", "✧"],
              ["Sustainability & ESG", "32 Best Practices", "theme-green", "◈"],
              [
                "Manufacturing Excellence",
                "26 Case Studies",
                "theme-purple",
                "▧",
              ],
              ["People & Culture", "18 Success Stories", "theme-orange", "♧"],
              [
                "Operational Excellence",
                "42 Knowledge Assets",
                "theme-slate",
                "◎",
              ],
              ["Finance Excellence", "21 Knowledge Assets", "theme-cyan", "◉"],
            ].map((t) => (
              <button
                className="theme-tile"
                key={t[0]}
                onClick={() =>
                  nav(`/discover?topic=${encodeURIComponent(t[0])}`)
                }
              >
                <span className={t[2]}>{t[3]}</span>
                <b>{t[0]}</b>
                <small>{t[1]}</small>
                <ChevronRight size={15} />
              </button>
            ))}
          </div>
          <SectionTitle
            title="Recently added knowledge"
            action="View all"
            onAction={() => nav("/discover")}
          />
          <div className="compact-list">
            {items.slice(0, 3).map((x, i) => (
              <div className="compact-item" key={x._id}>
                <div className={`compact-icon c${i}`}>
                  <FileText size={19} />
                </div>
                <div>
                  <b>{x.title}</b>
                  <small>
                    {x.business} · {x.contentType} ·{" "}
                    {new Date(x.createdAt || Date.now()).toLocaleDateString()}
                  </small>
                </div>
                <button onClick={() => nav(`/knowledge/${x._id}`)}>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <aside className="right-column">
          <AssistantPanel />
          <div className="side-widget">
            <SectionTitle
              title="Trending this week"
              action="View all"
              onAction={() => nav("/discover")}
            />
            {items
              .slice()
              .sort((a, b) => (b.views || 0) - (a.views || 0))
              .slice(0, 4)
              .map((x, i) => (
                <div className="trend-row" key={x._id}>
                  <span className="trend-num">0{i + 1}</span>
                  <div>
                    <b>{x.title}</b>
                    <small>{x.business}</small>
                  </div>
                  <span className="trend-views">
                    <Eye size={12} />
                    {x.views || 0}
                  </span>
                </div>
              ))}
          </div>
          <div className="side-widget quick-widget">
            <b>Knowledge at a glance</b>
            <div className="quick-stats">
              <div>
                <strong>12.8k</strong>
                <small>Knowledge views</small>
              </div>
              <div>
                <strong>86%</strong>
                <small>Learning activity</small>
              </div>
            </div>
            <p>Every insight shared helps us grow together.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
function AssistantPanel() {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [busy, setBusy] = useState(false);
  const ask = async (text = q) => {
    if (!text.trim()) return;
    setBusy(true);
    try {
      const r = await api.post("/assistant", { question: text });
      setAnswer(r.data.data.answer);
      setSources(r.data.data.sources);
    } catch {
      setAnswer(
        "Connect the backend to MongoDB Atlas to search the knowledge repository."
      );
      setSources([]);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="assistant-widget">
      <div className="assistant-head">
        <div className="ai-icon">
          <Sparkles size={17} />
        </div>
        <div>
          <b>Ask Knowledge AI</b>
          <small>GEN AI ASSISTANT</small>
        </div>
        <span className="online-dot" />
      </div>
      <p className="assistant-intro">
        Hi Om! I can help you discover insights from ABG knowledge.
      </p>
      <div className="prompt-list">
        {[
          "Show me best practices in manufacturing",
          "What are the top cost optimisation cases?",
          "Find sustainability best practices",
        ].map((p) => (
          <button
            key={p}
            onClick={() => {
              setQ(p);
              ask(p);
            }}
          >
            {p}
            <ChevronRight size={14} />
          </button>
        ))}
      </div>
      {answer && (
        <div className="ai-answer">
          {answer}
          {sources.map((s) => (
            <button
              key={s._id}
              onClick={() => (location.href = `/knowledge/${s._id}`)}
            >
              ↗ {s.title}
            </button>
          ))}
        </div>
      )}
      <form
        className="assistant-input"
        onSubmit={(e) => {
          e.preventDefault();
          ask();
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button disabled={busy}>
          <Send size={16} />
        </button>
      </form>
      <small className="ai-disclaimer">
        AI responses are grounded in published repository content.
      </small>
    </div>
  );
}
function Discover({ items, refresh, search }) {
  const [type, setType] = useState("All");
  const [business, setBusiness] = useState("All");
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState({ businesses: [], contentTypes: [] });
  useEffect(() => {
    getFilters()
      .then(setFilters)
      .catch(() => { });
  }, []);
  const filtered = items.filter(
    (x) =>
      (type === "All" || x.contentType === type) &&
      (business === "All" || x.business === business)
  );
  return (
    <>
      <PageHeading
        title="Discover knowledge"
        subtitle="Explore validated knowledge, ideas and best practices from across ABG."
      />
      <div className="filter-bar">
        <div className="filter-label">
          <SlidersHorizontal size={16} /> Filters
        </div>
        <select value={business} onChange={(e) => setBusiness(e.target.value)}>
          <option>All</option>
          {filters.businesses.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>All</option>
          {(filters.contentTypes.length
            ? filters.contentTypes
            : [...new Set(items.map((x) => x.contentType))]
          ).map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Recently added</option>
          <option value="trending">Trending</option>
          <option value="mostViewed">Most viewed</option>
          <option value="rating">Top rated</option>
        </select>
        <span className="results-count">{filtered.length} results</span>
      </div>
      <div className="cards-grid discover-grid">
        {filtered.map((x, i) => (
          <KnowledgeCard key={x._id} item={x} index={i} onRefresh={refresh} />
        ))}
      </div>
      {!filtered.length && (
        <Empty
          title="No knowledge found"
          text="Try changing your filters or search terms."
        />
      )}
    </>
  );
}
function PageHeading({ title, subtitle, action }) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">ABG KNOWLEDGE HUB</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
function Detail({ refresh }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [comment, setComment] = useState("");
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  useEffect(() => {
    api
      .get(`/knowledge/${id}`)
      .then((r) => setItem(r.data.data))
      .catch(() => setItem(null));
  }, [id]);
  if (!item)
    return (
      <Empty
        title="Knowledge item not found"
        text="Return to Discover and select a published item."
      />
    );
  const submitComment = async (e) => {
    e.preventDefault();
    await api.post(`/knowledge/${id}/comments`, { text: comment });
    setComment("");
    const r = await api.get(`/knowledge/${id}`);
    setItem(r.data.data);
  };
  return (
    <>
      <button className="back-link" onClick={() => history.back()}>
        ← Back to knowledge
      </button>
      <div className="detail-layout">
        <article className="detail-main">
          <div
            className="detail-cover"
            style={{ backgroundImage: `url(${item.thumbnail})` }}
          />
          <div className="detail-content">
            <span className="type-pill blue">{item.contentType}</span>
            <h1>{item.title}</h1>
            <p className="detail-desc">{item.description}</p>
            <div className="detail-byline">
              {item.business} · {item.function} · By {item.author}
            </div>
            <div className="detail-actions">
              <button
                onClick={async () => {
                  await api.post(`/knowledge/${id}/like`);
                  setItem({ ...item, likes: item.likes + 1 });
                }}
              >
                <Heart size={16} /> Like ({item.likes})
              </button>
              <button onClick={() => api.post(`/knowledge/${id}/bookmark`)}>
                <Bookmark size={16} /> Bookmark
              </button>
              <button onClick={() => api.post(`/knowledge/${id}/share`)}>
                <ExternalLink size={16} /> Share
              </button>
              <span>
                <Eye size={15} /> {item.views} views
              </span>
            </div>
            <h2>Overview</h2>
            <p>{item.content || item.description}</p>
            <h2>Key information</h2>
            <div className="detail-facts">
              <div>
                <small>Business</small>
                <b>{item.business}</b>
              </div>
              <div>
                <small>Function</small>
                <b>{item.function}</b>
              </div>
              <div>
                <small>Topic / Theme</small>
                <b>{item.topic}</b>
              </div>
              <div>
                <small>Rating</small>
                <b>★ {item.rating}</b>
              </div>
            </div>
            <h2>Comments & discussion</h2>
            {(item.comments || []).map((c, i) => (
              <div className="comment" key={i}>
                <div className="avatar">
                  {(c.name || "U").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <b>{c.name}</b>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
            <form className="comment-form" onSubmit={submitComment}>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                required
              />
              <button className="primary-btn">Post comment</button>
            </form>
          </div>
        </article>
        <aside className="detail-aside">
          <AssistantPanel />
          <div className="side-widget">
            <b>About this knowledge</b>
            <p>Validated knowledge asset from across ABG.</p>
            <div className="detail-facts vertical">
              <div>
                <small>Published by</small>
                <b>{item.author}</b>
              </div>
              <div>
                <small>Keywords</small>
                <b>{(item.keywords || []).join(", ") || item.topic}</b>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
function Contribute() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    business: "Aditya Birla Group",
    function: "Finance",
    topic: "Business Excellence",
    contentType: "Case Study",
    author: "Om",
    keywords: "",
  });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("status", "Pending");
    if (file) fd.append("file", file);
    try {
      await api.post("/knowledge", fd);
      setMsg("Your knowledge has been submitted for approval.");
      setForm({
        ...form,
        title: "",
        description: "",
        content: "",
        keywords: "",
      });
    } catch (err) {
      setMsg(
        err.response?.data?.message ||
        "Could not submit. Check your backend connection."
      );
    }
  };
  return (
    <>
      <PageHeading
        title="Contribute knowledge"
        subtitle="Share a case study, best practice or insight with colleagues across ABG."
      />
      <form className="form-panel" onSubmit={submit}>
        <div className="form-section-title">
          <div className="form-icon">
            <FileText />
          </div>
          <div>
            <b>Knowledge details</b>
            <small>Fields marked * are required</small>
          </div>
        </div>
        <div className="form-grid">
          <label>
            Title *
            <input
              name="title"
              value={form.title}
              onChange={change}
              required
              placeholder="Enter a clear title"
            />
          </label>
          <label>
            Content type *
            <select
              name="contentType"
              value={form.contentType}
              onChange={change}
            >
              {[
                "Case Study",
                "Best Practice",
                "Success Story",
                "Transformation Story",
                "Functional Practice",
                "AI Use Case",
                "Knowledge Article",
                "Expert Insight",
              ].map((x) => (
                <option>{x}</option>
              ))}
            </select>
          </label>
          <label className="full">
            Short description *
            <textarea
              name="description"
              value={form.description}
              onChange={change}
              required
              rows="2"
              placeholder="Summarise the knowledge asset"
            />
          </label>
          <label className="full">
            Detailed content
            <textarea
              name="content"
              value={form.content}
              onChange={change}
              rows="5"
              placeholder="Share context, approach, outcomes and learnings"
            />
          </label>
          <label>
            Business
            <input name="business" value={form.business} onChange={change} />
          </label>
          <label>
            Function
            <input name="function" value={form.function} onChange={change} />
          </label>
          <label>
            Topic / Theme
            <input name="topic" value={form.topic} onChange={change} />
          </label>
          <label>
            Keywords
            <input
              name="keywords"
              value={form.keywords}
              onChange={change}
              placeholder="AI, process, finance"
            />
          </label>
          <label>
            Content author
            <input name="author" value={form.author} onChange={change} />
          </label>
          <label>
            Attach document
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <small>PDF, Word, PPT, Excel or other files · max 25 MB</small>
          </label>
        </div>
        <div className="workflow-note">
          <CheckCircle2 size={17} /> Your submission will be marked Pending and
          routed to the content approval queue.
        </div>
        {msg && <div className="success-message">{msg}</div>}
        <div className="form-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={() => history.back()}
          >
            Cancel
          </button>
          <button className="primary-btn">
            Submit for approval <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </>
  );
}
function Approvals({ items, refresh }) {
  const pending = items.filter(
    (x) => x.status === "Pending" || x.status === "Revision"
  );
  const act = async (id, status) => {
    await api.patch(`/knowledge/${id}/workflow`, {
      status,
      by: "Content Approver",
    });
    refresh();
  };
  return (
    <>
      <PageHeading
        title="Content approvals"
        subtitle="Review and validate knowledge submitted by employees and experts."
      />
      <div className="stat-row">
        <Stat
          label="Awaiting review"
          value={pending.length}
          icon={<Clock3 />}
        />
        <Stat
          label="Published"
          value={items.filter((x) => x.status === "Published").length}
          icon={<CheckCircle2 />}
        />
        <Stat
          label="Needs revision"
          value={items.filter((x) => x.status === "Revision").length}
          icon={<RefreshCw />}
        />
      </div>
      <div className="table-panel">
        <div className="table-heading">
          <b>Approval queue</b>
          <span>{pending.length} submissions</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Knowledge title</th>
                <th>Submitted by</th>
                <th>Business / Function</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((x) => (
                <tr key={x._id}>
                  <td>
                    <b>{x.title}</b>
                    <small>{new Date(x.createdAt).toLocaleDateString()}</small>
                  </td>
                  <td>{x.author}</td>
                  <td>
                    {x.business}
                    <small>{x.function}</small>
                  </td>
                  <td>{x.contentType}</td>
                  <td>
                    <span className="status pending">{x.status}</span>
                  </td>
                  <td className="table-actions">
                    <button
                      title="Approve"
                      onClick={() => act(x._id, "Published")}
                    >
                      <CheckCircle2 />
                    </button>
                    <button
                      title="Send back"
                      onClick={() => act(x._id, "Revision")}
                    >
                      <RefreshCw />
                    </button>
                    <button
                      title="Reject"
                      onClick={() => act(x._id, "Rejected")}
                    >
                      <XCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!pending.length && (
          <Empty
            title="All caught up"
            text="There are no submissions waiting for review."
          />
        )}
      </div>
    </>
  );
}
function Stat({ label, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <strong>{value}</strong>
        <small>{label}</small>
      </div>
    </div>
  );
}
function Reports({ dashboard, items }) {
  return (
    <>
      <PageHeading
        title="Reports & analytics"
        subtitle="Understand platform adoption and knowledge content performance."
      />
      <div className="stat-row">
        <Stat
          label="Total knowledge assets"
          value={dashboard?.total ?? items.length}
          icon={<FileText />}
        />
        <Stat
          label="Published assets"
          value={dashboard?.published ?? items.length}
          icon={<CheckCircle2 />}
        />
        <Stat
          label="Total content views"
          value={(
            dashboard?.views ?? items.reduce((s, x) => s + (x.views || 0), 0)
          ).toLocaleString()}
          icon={<Eye />}
        />
        <Stat
          label="Total likes"
          value={
            dashboard?.likes ?? items.reduce((s, x) => s + (x.likes || 0), 0)
          }
          icon={<Heart />}
        />
      </div>
      <div className="report-grid">
        <div className="table-panel">
          <div className="table-heading">
            <b>Top performing knowledge</b>
            <span>By views</span>
          </div>
          {items
            .slice()
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 6)
            .map((x, i) => (
              <div className="rank-row">
                <span>{i + 1}</span>
                <div>
                  <b>{x.title}</b>
                  <small>
                    {x.business} · {x.function}
                  </small>
                </div>
                <strong>{(x.views || 0).toLocaleString()} views</strong>
              </div>
            ))}
        </div>
        <div className="side-widget report-summary">
          <b>Content performance</b>
          <div className="donut">
            <div>
              <strong>{items.length}</strong>
              <small>Assets</small>
            </div>
          </div>
          <div className="legend">
            <span /> Published{" "}
            <b>{items.filter((x) => x.status === "Published").length}</b>
          </div>
          <div className="legend orange">
            <span /> Pending{" "}
            <b>{items.filter((x) => x.status === "Pending").length}</b>
          </div>
          <div className="legend gray">
            <span /> Other{" "}
            <b>
              {
                items.filter(
                  (x) => !["Published", "Pending"].includes(x.status)
                ).length
              }
            </b>
          </div>
        </div>
      </div>
      <div className="table-panel usage-panel">
        <div className="table-heading">
          <b>Content catalogue</b>
          <button className="text-action" onClick={() => window.print()}>
            <Download size={15} /> Export / Print
          </button>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Business</th>
                <th>Function</th>
                <th>Content type</th>
                <th>Views</th>
                <th>Likes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr>
                  <td>{x.title}</td>
                  <td>{x.business}</td>
                  <td>{x.function}</td>
                  <td>{x.contentType}</td>
                  <td>{x.views}</td>
                  <td>{x.likes}</td>
                  <td>{x.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
function Experts() {
  const [experts, setExperts] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    getExperts()
      .then(setExperts)
      .catch(() => { });
    getQuestions()
      .then(setQuestions)
      .catch(() => { });
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    await api.post("/questions", { question: q });
    setQ("");
    getQuestions().then(setQuestions);
  };
  return (
    <>
      <PageHeading
        title="Ask an Expert"
        subtitle="Connect with subject matter experts across businesses and functions."
      />
      <div className="expert-grid">
        {experts.map((x) => (
          <div className="expert-card">
            <div className="expert-avatar">{x.initials}</div>
            <b>{x.name}</b>
            <small>{x.role}</small>
            <span>{x.business}</span>
            <p>{x.expertise}</p>
            <button
              className="secondary-btn"
              onClick={() => setQ(`I would like guidance on ${x.expertise}`)}
            >
              Ask a question <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="table-panel question-panel">
        <div className="table-heading">
          <b>Ask the expert community</b>
          <span>Questions become reusable knowledge</span>
        </div>
        <form className="ask-form" onSubmit={submit}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="What would you like expert guidance on?"
            required
          />
          <button className="primary-btn">
            <Send size={15} /> Submit question
          </button>
        </form>
        {questions.map((x) => (
          <div className="question-row">
            <div className="avatar">{(x.askedBy || "E").slice(0, 1)}</div>
            <div>
              <b>{x.question}</b>
              <small>
                Asked by {x.askedBy} · {x.status}
              </small>
              {x.answer && <p>{x.answer}</p>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function Communities() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [community, setCommunity] = useState("Finance Excellence");
  const load = () =>
    getCommunities()
      .then(setPosts)
      .catch(() => { });
  useEffect(() => {
    load();
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    await api.post("/communities", {
      community,
      title,
      body,
      author: "Om",
    });
    setTitle("");
    setBody("");
    load();
  };
  return (
    <>
      <PageHeading
        title="Communities of Practice"
        subtitle="Learn together, exchange experiences and solve challenges across ABG."
      />
      <div className="community-banner">
        <div>
          <span>COLLABORATE · LEARN · SHARE</span>
          <h2>
            Better knowledge.
            <br />
            Stronger together.
          </h2>
          <p>Join conversations with colleagues who share your interests.</p>
        </div>
        <Users size={100} />
      </div>
      <div className="community-layout">
        <div className="community-feed">
          <SectionTitle title="Community discussions" />
          <form className="post-composer" onSubmit={submit}>
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
            >
              {[
                "Finance Excellence",
                "AI & Analytics",
                "People & Culture",
                "Operational Excellence",
                "Sustainability & ESG",
              ].map((x) => (
                <option>{x}</option>
              ))}
            </select>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Start a discussion..."
              required
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Add context or a question"
              required
              rows="2"
            />
            <button className="primary-btn">Publish discussion</button>
          </form>
          {posts.map((x) => (
            <article className="discussion-card">
              <div className="discussion-meta">
                <span>{x.community}</span>
                <small>
                  {x.author} · {new Date(x.createdAt).toLocaleDateString()}
                </small>
              </div>
              <h3>{x.title}</h3>
              <p>{x.body}</p>
              <div className="discussion-actions">
                <button
                  onClick={async () => {
                    await api.post(`/communities/${x._id}/like`);
                    load();
                  }}
                >
                  <Heart size={15} /> {x.likes} Likes
                </button>
                <button>
                  <MessageCircle size={15} /> {(x.comments || []).length}{" "}
                  Comments
                </button>
                <button>
                  <Share2Icon /> Share
                </button>
              </div>
            </article>
          ))}
        </div>
        <aside className="side-widget">
          <b>Popular communities</b>
          {[
            "Finance Excellence",
            "AI & Analytics",
            "People & Culture",
            "Operational Excellence",
            "Sustainability & ESG",
          ].map((x, i) => (
            <div className="popular-community">
              <span>{["₹", "✦", "♧", "◎", "◈"][i]}</span>
              <div>
                <b>{x}</b>
                <small>{[128, 96, 84, 72, 63][i]} members</small>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
function Share2Icon() {
  return <ExternalLink size={15} />;
}
function Leaderboard() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getLeaderboard()
      .then(setRows)
      .catch(() => { });
  }, []);
  return (
    <>
      <PageHeading
        title="Leaderboard & recognition"
        subtitle="Celebrating colleagues who share knowledge and help others grow."
      />
      <div className="leader-hero">
        <Trophy size={42} />
        <div>
          <h2>Knowledge Champions</h2>
          <p>Every contribution creates collective impact.</p>
        </div>
        <span>✦ TOP CONTRIBUTORS</span>
      </div>
      <div className="table-panel">
        <div className="table-heading">
          <b>Organisation-wide leaderboard</b>
          <span>Based on published knowledge contributions</span>
        </div>
        {rows.map((x, i) => (
          <div className="leader-row">
            <span className={`leader-rank rank-${i + 1}`}>{i + 1}</span>
            <div className="avatar">
              {String(x._id || "U")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="leader-name">
              <b>{x._id || "Contributor"}</b>
              <small>
                {i === 0 ? "Knowledge Champion" : "Knowledge Contributor"}
              </small>
            </div>
            <div>
              <b>{x.contributions}</b>
              <small>Contributions</small>
            </div>
            <div>
              <b>{x.views}</b>
              <small>Views</small>
            </div>
            <div>
              <b>{x.likes}</b>
              <small>Likes</small>
            </div>
          </div>
        ))}
        {!rows.length && (
          <Empty
            title="Leaderboard is warming up"
            text="Publish knowledge to appear here."
          />
        )}
      </div>
    </>
  );
}
function Workspace({ items }) {
  const saved = items.filter((x) => (x.bookmarks || 0) > 0);
  return (
    <>
      <PageHeading
        title="My workspace"
        subtitle="Your saved knowledge and personal learning space."
      />
      <SectionTitle
        title="Bookmarked knowledge"
        sub="Knowledge assets saved for later"
      />
      <div className="cards-grid discover-grid">
        {(saved.length ? saved : items.slice(0, 3)).map((x, i) => (
          <KnowledgeCard key={x._id} item={x} index={i} />
        ))}
      </div>
    </>
  );
}
function Notifications({ items }) {
  return (
    <>
      <PageHeading
        title="Notifications"
        subtitle="Updates from your Knowledge Hub activity."
      />
      <div className="table-panel">
        {items.slice(0, 8).map((x, i) => (
          <div className="notification-row">
            <div className="notification-icon">
              <BellIcon />
            </div>
            <div>
              <b>{x.title || x.message}</b>
              <small>
                {x.business || "Knowledge Hub"} · {x.status || "Update"} ·{" "}
                {new Date(x.createdAt || Date.now()).toLocaleDateString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function BellIcon() {
  return <Sparkles size={17} />;
}
function Empty({ title, text }) {
  return (
    <div className="empty-state">
      <div>✧</div>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  );
}
export default function App() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(fallback);
  const [dashboard, setDashboard] = useState(null);
  const refresh = () =>
    getKnowledge()
      .then((x) => {
        if (x.length) setItems(x);
      })
      .catch(() => { });
  useEffect(() => {
    refresh();
    getDashboard()
      .then(setDashboard)
      .catch(() => { });
  }, []);
  const filtered = useMemo(
    () =>
      items.filter(
        (x) =>
          !search ||
          [x.title, x.description, x.business, x.function, x.topic]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
      ),
    [items, search]
  );
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-area">
        <Header search={search} setSearch={setSearch} />
        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={<Home items={filtered} refresh={refresh} />}
            />
            <Route
              path="/discover"
              element={
                <Discover items={filtered} refresh={refresh} search={search} />
              }
            />
            <Route
              path="/case-studies"
              element={
                <Discover
                  items={filtered.filter((x) =>
                    ["Case Study", "Best Practice", "Success Story"].includes(
                      x.contentType
                    )
                  )}
                  refresh={refresh}
                />
              }
            />
            <Route
              path="/knowledge/:id"
              element={<Detail refresh={refresh} />}
            />
            <Route path="/contribute" element={<Contribute />} />
            <Route
              path="/approvals"
              element={<Approvals items={items} refresh={refresh} />}
            />
            <Route
              path="/reports"
              element={<Reports dashboard={dashboard} items={items} />}
            />
            <Route path="/experts" element={<Experts />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route
              path="/assistant"
              element={
                <div className="assistant-page">
                  <PageHeading
                    title="Knowledge AI Assistant"
                    subtitle="Ask questions and discover validated insights from the ABG repository."
                  />
                  <AssistantPanel />
                </div>
              }
            />
            <Route path="/workspace" element={<Workspace items={items} />} />
            <Route
              path="/recent"
              element={
                <>
                  <PageHeading
                    title="Recently viewed"
                    subtitle="Continue exploring knowledge from across ABG."
                  />
                  <div className="cards-grid discover-grid">
                    {items.slice(0, 4).map((x, i) => (
                      <KnowledgeCard item={x} index={i} />
                    ))}
                  </div>
                </>
              }
            />
            <Route
              path="/notifications"
              element={<Notifications items={items} />}
            />
            <Route
              path="*"
              element={
                <Empty
                  title="Page not found"
                  text="Use the navigation to explore the Knowledge Hub."
                />
              }
            />
          </Routes>
        </div>
        <footer className="footer">
          © 2026 Aditya Birla Group · Knowledge Hub{" "}
          <span>Knowledge that moves us forward.</span>
        </footer>
      </main>
    </div>
  );
}
