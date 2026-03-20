"use client";

import { useState } from "react";

export default function DAY20() {
  const [state, setState] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>DAY-20</h1>
      <p>Build your daily project here</p>

      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Type something"
      />

      <p>{state}</p>
    </div>
  );
}
