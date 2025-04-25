import React from "react";

const HomeIcon = ({ className = "" }) => (
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
      <linearGradient id="home-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C45DD8" />
        <stop offset="1" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
    <g>
      <path
        d="M24 6L6 23h6v15h24V23h6L24 6z"
        fill="url(#home-gradient)"
        style={{ filter: "drop-shadow(0 2px 8px rgba(196,93,216,0.15))" }}
      />
      <rect
        x="18"
        y="28"
        width="12"
        height="10"
        rx="2"
        fill="#fff"
        opacity="0.8"
      />
    </g>
  </svg>
);

export default HomeIcon; 