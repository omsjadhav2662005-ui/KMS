import React from "react";
import { Heart, Eye, Bookmark, Share2, Star, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
const palettes = ["blue", "green", "violet", "orange"];
export default function KnowledgeCard({ item, index = 0, onRefresh }) {
  const nav = useNavigate();
  const act = async (type) => {
    try {
      await api.post(`/knowledge/${item._id}/${type}`);
      onRefresh?.();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <article className="knowledge-card">
      <div
        className="card-image"
        onClick={() => nav(`/knowledge/${item._id}`)}
        style={{
          backgroundImage: `url(${item.thumbnail || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900"})`,
        }}
      >
        <span className={`type-pill ${palettes[index % 4]}`}>
          {item.contentType || "Knowledge"}
        </span>
        <button
          className="save-float"
          onClick={(e) => {
            e.stopPropagation();
            act("bookmark");
          }}
          title="Bookmark"
        >
          <Bookmark size={16} />
        </button>
      </div>
      <div className="card-body">
        <div className="card-meta">
          {item.business} <span>•</span> {item.function}
        </div>
        <h3 onClick={() => nav(`/knowledge/${item._id}`)}>{item.title}</h3>
        <p>{item.description}</p>
        <div className="card-topic">{item.topic}</div>
        <div className="card-footer">
          <span>
            <Star size={13} fill="#f5b544" stroke="#f5b544" />{" "}
            {Number(item.rating || 4.5).toFixed(1)}
          </span>
          <span>
            <Eye size={14} /> {item.views || 0}
          </span>
          <span>
            <Heart size={14} /> {item.likes || 0}
          </span>
          <button onClick={() => act("share")} title="Share">
            <Share2 size={14} />
          </button>
          <button onClick={() => nav(`/knowledge/${item._id}`)} title="Open">
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
