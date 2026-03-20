const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "../apps/web/app");

for (let i = 1; i <= 30; i++) {
  const day = `day-${String(i).padStart(2, "0")}`;
  const dir = path.join(basePath, day);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const fileContent = `"use client";

import { useState } from "react";

export default function ${day.replace("-", "").toUpperCase()}() {
  const [state, setState] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>${day.toUpperCase()}</h1>
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
`;

  fs.writeFileSync(path.join(dir, "page.tsx"), fileContent);
}

console.log("✅ All 30 days generated");
