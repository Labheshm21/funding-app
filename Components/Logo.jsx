import React from "react";

export default function Logo  ({
  size = "w-8",
  color = "text-teal-accent-400",
}) {
  return (
    <svg
      className={`${size} ${color}`}
      viewBox="0 0 24 24"
      strokeLinejoin="round"
      strokeWidth="2"
      strokeLinecap="round"
      strokeMiterlimit="10"
      stroke="currentColor"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3"  y="1"  width="7" height="12" />
      <rect x="3"  y="17" width="7" height="6"  />
      <rect x="14" y="1"  width="7" height="6"  />
      <rect x="14" y="11" width="7" height="12" />
    </svg>
  );
};


