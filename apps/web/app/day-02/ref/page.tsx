"use client";

import { Button } from "@repo/ui";
import { useEffect, useRef, useState } from "react";

export default function UseRefExample() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number | null>(null);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Current: {count}</h2>
      <h3>Previous: {prevCountRef.current}</h3>

      <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
    </div>
  );
}
