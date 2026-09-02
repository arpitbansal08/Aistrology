import { useState } from "react";

export function Select({ value, onValueChange, children }) {
  return <div className="relative">{children({ value, onValueChange })}</div>;
}

export function SelectTrigger({ children, className }) {
  return (
    <div className={`p-2 border border-gray-500 rounded bg-gray-700 text-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function SelectValue({ value }) {
  return <span>{value || "Select an option"}</span>;
}

export function SelectContent({ children }) {
  return <div className="absolute mt-2 bg-gray-800 text-white p-2 rounded shadow-lg">{children}</div>;
}

export function SelectItem({ value, children, onClick }) {
  return (
    <div className="p-2 hover:bg-gray-700 cursor-pointer rounded" onClick={() => onClick(value)}>
      {children}
    </div>
  );
}
