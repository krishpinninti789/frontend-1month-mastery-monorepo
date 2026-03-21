"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let start = localStorage.getItem("startTime");

    if (!start) {
      start = String(Date.now());
      localStorage.setItem("startTime", start);
    }

    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - Number(start)) / 1000);
      setTime(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Time: {time}</div>;
};

export default Page;
