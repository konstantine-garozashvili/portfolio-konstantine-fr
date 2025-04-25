import React from "react";

const FolderIcon = ({ className = "" }) => (
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
      <linearGradient id="folder-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C45DD8" />
        <stop offset="1" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
    <g>
      <path
        d="M6 14a2 2 0 012-2h10l3 4h21a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V14z"
        fill="url(#folder-gradient)"
        style={{ filter: "drop-shadow(0 2px 8px rgba(196,93,216,0.15))" }}
      />
      <rect
        x="6"
        y="20"
        width="36"
        height="14"
        rx="2"
        fill="#fff"
        opacity="0.7"
      />
    </g>
  </svg>
);

export default FolderIcon; 