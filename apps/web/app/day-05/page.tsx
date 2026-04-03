"use client";

import { useMemo, useState } from "react";
import { debounce } from "@repo/lib";

export default function DAY05() {
  const [text, setText] = useState("");

  const [message, setMessage] = useState<string>("");

  const showMessage = (value: string) => {
    setMessage(`Stopped typing: "${value}"`);
  };

  const debouncedFn = useMemo(() => debounce(showMessage, 800), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setMessage("Typing...");

    debouncedFn(value);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <input placeholder="Enter text" onChange={handleChange} />
      {message}
    </div>
  );
}
