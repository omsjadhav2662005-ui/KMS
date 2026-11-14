import React from "react";
import { NavLink } from "react-router-dom";
import {
  House,
  Compass,
  MessagesSquare,
  Users,
  BrainCircuit,
  FolderOpen,
  Bookmark,
  Clock3,
  ChartNoAxesCombined,
  Trophy,
  Settings,
  PlusCircle,
  PanelLeftClose,
} from "lucide-react";
const links = [
  ["Home", "/", House],
  ["Discover", "/discover", Compass],
  ["Case Studies", "/case-studies", FolderOpen],
  ["Ask an Expert", "/experts", MessagesSquare],
  ["Communities", "/communities", Users],
  ["Knowledge AI", "/assistant", BrainCircuit],
  ["My Workspace", "/workspace", Bookmark],
  ["Recently Viewed", "/recent", Clock3],
];
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">ABG</div>
        <div>
          <b>ADITYA BIRLA GROUP</b>
          <small>Knowledge Hub</small>
        </div>
      </div>
      <div className="side-label">WORKSPACE</div>
      <nav>
        {links.map(([label, to, Icon]) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <NavLink to="/contribute" className="nav-link">
        <PlusCircle size={17} />
        Contribute Knowledge
      </NavLink>
      <NavLink to="/approvals" className="nav-link">
        <FolderOpen size={17} />
        Approvals
      </NavLink>
      <NavLink to="/reports" className="nav-link">
        <ChartNoAxesCombined size={17} />
        Reports & Analytics
      </NavLink>
      <NavLink to="/leaderboard" className="nav-link">
        <Trophy size={17} />
        Leaderboard
      </NavLink>
      <div className="sidebar-bottom">
        <div className="mini-card">
          <span className="sparkle">✦</span>
          <b>
            Share knowledge.
            <br />
            Create impact.
          </b>
          <small>Your expertise can help someone move forward.</small>
          <NavLink to="/contribute">Contribute now →</NavLink>
        </div>
        <div className="profile-mini">
          <div className="avatar">OJ</div>
          <div>
            <b>Om</b>
            <small>Knowledge Hub User</small>
          </div>
          <Settings size={16} />
        </div>
      </div>
    </aside>
  );
}
