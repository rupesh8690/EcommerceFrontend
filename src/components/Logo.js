import React from "react";

const Logo = ({ w = 120, h = 50 }) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 200 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shopping Cart Icon */}
      <g>
        {/* Wheels */}
        <circle cx="20" cy="35" r="5" fill="#000" />
        <circle cx="40" cy="35" r="5" fill="#000" />
        {/* Cart body */}
        <path
          d="M10 10 H50 L40 30 H15 Z"
          fill="#000"
          stroke="#000"
          strokeWidth="1"
        />
      </g>

      {/* Brand Name */}
      <text
        x="70"
        y="32"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="#000"
      >
        ShopEasy
      </text>
    </svg>
  );
};

export default Logo;
