import React from "react";

const MenuPathIcon = ({
  size = "w-5",
  color = "text-white",
}) => {
  return (
    <svg
      className={`${size} ${color}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
      />
      <path
        fill="currentColor"
        d="M23,6H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
      />
      <path
        fill="currentColor"
        d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
      />
    </svg>
  );
};

export default MenuPathIcon;
