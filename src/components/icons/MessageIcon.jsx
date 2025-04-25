import React from "react";

const MessageIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transition: "transform 0.3s cubic-bezier(.4,2,.6,1), filter 0.3s",
    }}
  >
    <defs>
      <linearGradient id="message-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C45DD8" />
        <stop offset="1" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
    <rect x="6" y="12" width="36" height="24" rx="4" fill="url(#message-gradient)" style={{ filter: "drop-shadow(0 2px 8px rgba(196,93,216,0.15))" }} />
    <polyline points="10,16 24,28 38,16" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default MessageIcon; 