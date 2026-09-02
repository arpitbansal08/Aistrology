import { useState } from "react";

export function Popover({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      {children({ open, setOpen })}
    </div>
  );
}

export function PopoverTrigger({ children, setOpen }) {
  return <div onClick={() => setOpen((prev) => !prev)}>{children}</div>;
}

export function PopoverContent({ children, open }) {
  return (
    open && (
      <div className="absolute mt-2 bg-gray-800 text-white p-2 rounded shadow-lg z-10">
        {children}
      </div>
    )
  );
}
