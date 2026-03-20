"use client";

import { Button } from "@repo/ui";
import { useState } from "react";

export default function CallStackVisualizer() {
  const [stack, setStack] = useState<string[]>([]);

  const push = (fn: string) => {
    setStack((prev) => [...prev, fn]);
  };

  const pop = () => {
    setStack((prev) => prev.slice(0, -1));
  };

  const run = () => {
    setStack([]);

    push("global");

    setTimeout(() => {
      push("a()");

      setTimeout(() => {
        push("b()");

        setTimeout(() => {
          pop(); // b
          pop(); // a
        }, 500);
      }, 500);
    }, 500);
  };

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={run}>Run Simulation</Button>
      <h2>Call Stack</h2>

      <div>
        {stack.map((item, index) => (
          <div key={index} style={{ border: "1px solid black", margin: 5 }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
