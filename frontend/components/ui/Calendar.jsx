import { useState } from "react";
import { format } from "date-fns";

export function Calendar({ selected, onSelect }) {
  const [date, setDate] = useState(selected || new Date());

  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setDate(newDate);
    onSelect(newDate);
  };

  return (
    <input
      type="date"
      value={format(date, "yyyy-MM-dd")}
      onChange={handleDateChange}
      className="w-full bg-gray-700 text-gray-200 p-2 rounded border border-gray-500"
    />
  );
}
