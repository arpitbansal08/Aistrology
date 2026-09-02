import React from "react";

const Input = ({ type, placeholder, className, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value} // Ensure input value is controlled
      onChange={onChange} // Forward onChange event
      className={`border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 ${className}`}
    />
  );
};

export default Input;
