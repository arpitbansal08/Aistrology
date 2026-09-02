import React from "react";
import { twMerge } from "tailwind-merge";
const Button = ({ children, className, onClick }) => {
  return (
    <button
      className={twMerge(
        "rounded-lg font-medium transition-all",
        "px-4 py-2",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
