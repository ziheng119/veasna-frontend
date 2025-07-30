import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export const CrossFaceIcon = ({ className = "", size = 48 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Face Circle */}
    <circle cx="24" cy="24" r="22" fill="none" />

    {/* Left X Eye */}
    <line x1="14" y1="14" x2="20" y2="20" />
    <line x1="20" y1="14" x2="14" y2="20" />

    {/* Right X Eye */}
    <line x1="28" y1="14" x2="34" y2="20" />
    <line x1="34" y1="14" x2="28" y2="20" />

    {/* O Mouth */}
    <circle cx="24" cy="34" r="4" />
  </svg>
);
