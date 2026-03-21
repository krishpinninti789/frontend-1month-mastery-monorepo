"use client";

import { Button } from "@repo/ui";
import { useRef, useState } from "react";

function createCounter() {
  let count = 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCurrentCount: () => count,
  };
}

export default function Page() {
  const counterRef = useRef(createCounter());
  const [, forceUpdate] = useState(0);

  const updateUI = () => forceUpdate((p) => p + 1);

  return (
    <div className="p-2">
      <h1>DAY-02</h1>

      <Button
        onClick={() => {
          counterRef.current.increment();
          updateUI();
        }}
      >
        Increment
      </Button>

      <Button
        onClick={() => {
          counterRef.current.decrement();
          updateUI();
        }}
      >
        Decrement
      </Button>

      <p>{counterRef.current.getCurrentCount()}</p>
    </div>
  );
}
