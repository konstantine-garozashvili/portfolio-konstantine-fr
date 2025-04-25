import React from "react";

const InfoIcon = ({ className = "" }) => (
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
      <linearGradient id="info-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C45DD8" />
        <stop offset="1" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="20" fill="url(#info-gradient)" style={{ filter: "drop-shadow(0 2px 8px rgba(196,93,216,0.15))" }} />
    <rect x="22" y="20" width="4" height="12" rx="2" fill="#fff" opacity="0.9" />
    <rect x="22" y="14" width="4" height="4" rx="2" fill="#fff" opacity="0.9" />
  </svg>
);

export default InfoIcon; 