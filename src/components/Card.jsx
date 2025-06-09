// src/components/Card.jsx
import React from "react";
import "../pages/Home.css";

export default function Card({ icon, title, text }) {
  return (
    <div className="card">
      <span className="card-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
