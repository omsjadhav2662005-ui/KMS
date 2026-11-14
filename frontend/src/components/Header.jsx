import React from "react";
import {
  Search,
  Bell,
  Bookmark,
  ChevronDown,
  Plus,
  Command,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Header({ search, setSearch }) {
  const nav = useNavigate();
  return (
    <header className="topbar">
      <div className="search-wrap">
        <Search size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search knowledge, topics, businesses, experts..."
          onKeyDown={(e) => e.key === "Enter" && nav("/discover")}
        />
        <kbd>⌘ K</kbd>
      </div>
      <div className="top-actions">
        <button className="outline-btn" onClick={() => nav("/contribute")}>
          <Plus size={16} /> Contribute
        </button>
        <button
          className="icon-btn"
          title="Notifications"
          onClick={() => nav("/notifications")}
        >
          <Bell size={19} />
          <i />
        </button>
        <button
          className="icon-btn"
          title="Bookmarks"
          onClick={() => nav("/workspace")}
        >
          <Bookmark size={18} />
        </button>
        <div className="user-chip">
          <div className="avatar">OJ</div>
          <div>
            <b>Om</b>
            <small>Learning Champion</small>
          </div>
          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  );
}
