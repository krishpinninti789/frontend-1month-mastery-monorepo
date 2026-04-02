"use client";

import { useState } from "react";

const options = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  "+",
  "-",
  "*",
  "/",
  "%",
  "^",
  "=",
  "C",
];

export default function DAY04() {
  const [exp, setExp] = useState("");
  const [res, setRes] = useState("");

  const handleAdd = (item) => {
    if (item == "C") {
      setExp("");
      setRes("");
      return;
    }
    if (item === "=") {
      if (!/^[0-9+\-*/.() ]+$/.test(exp)) {
        throw new Error("Invalid input");
      }
      const result = eval(exp);
      setRes(result);
      return;
    }

    setExp((prev) => prev + item);
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center h-screen border border-gray-600">
      <div className="border border-gray-500">
        <div className="h-20 bg-green-200 text-black">{exp}</div>
        <div>Result: {res}</div>
        <div className="grid grid-cols-4 border-2 ">
          {options.map((item, idx) => (
            <div
              key={idx}
              className="p-6 border-2 border-gray-500 cursor-pointer"
              onClick={() => handleAdd(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
