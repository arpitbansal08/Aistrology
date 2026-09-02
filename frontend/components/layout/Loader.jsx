import React, { useState, useEffect } from "react";

const Loader = ({ minDuration = 2000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  return show ? (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 z-30">
      <div className="relative w-24 h-24 rounded-full bg-gray-300 border-4 border-gray-300 shadow-md ">
        <div
          className="absolute w-28 h-28 rounded-full bg-gray-900 -top-1 left-0"
          style={{
            animation: "moveX 3s infinite 1.5s",
          }}
        ></div>
      </div>
      <style>
        {`
          @keyframes moveX {
            0% { transform: translateX(150px); background-color: #212121; }
            50% { transform: translateX(-10px); background-color: #212121; }
            100% { transform: translateX(-170px); background-color: #212121; }
          }
        `}
      </style>
    </div>
  ) : null;
};

export default Loader;

