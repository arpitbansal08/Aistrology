import React, { Suspense, useState, useEffect } from "react";
import Loader from "../components/layout/Loader.jsx"

const DelayedSuspense = ({ children, minDuration = 3000 }) => {
  const [delayPassed, setDelayPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDelayPassed(true), minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  return (
    <Suspense fallback={<Loader />}>
      {!delayPassed ? <Loader /> : children}
    </Suspense>
  );
};

export default DelayedSuspense;
