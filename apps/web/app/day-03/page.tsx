"use client";

import { useState } from "react";

type Task = {
  id: string;
  label: string;
  type: "sync" | "microtask" | "macrotask";
};

export default function Page() {
  const [code, setCode] = useState(`console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("end");`);

  const [callStack, setCallStack] = useState<Task[]>([]);
  const [microtasks, setMicrotasks] = useState<Task[]>([]);
  const [macrotasks, setMacrotasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  // 🔍 Simple parser (not AST-based, just demo level)
  const parseCode = () => {
    const lines = code.split("\n").map((l) => l.trim());

    const sync: Task[] = [];
    const micro: Task[] = [];
    const macro: Task[] = [];

    lines.forEach((line, i) => {
      if (line.startsWith("console.log")) {
        sync.push({
          id: `sync-${i}`,
          label: line,
          type: "sync",
        });
      } else if (line.includes("Promise")) {
        micro.push({
          id: `micro-${i}`,
          label: "Promise callback",
          type: "microtask",
        });
      } else if (line.includes("setTimeout")) {
        macro.push({
          id: `macro-${i}`,
          label: "setTimeout callback",
          type: "macrotask",
        });
      }
    });

    setCallStack(sync);
    setMicrotasks(micro);
    setMacrotasks(macro);
    setLogs([]);
  };

  // ▶ Step execution
  const step = () => {
    if (callStack.length > 0) {
      const task = callStack[0];
      setCallStack((prev) => prev.slice(1));
      setLogs((prev) => [...prev, `Executed: ${task.label}`]);
      return;
    }

    if (microtasks.length > 0) {
      const task = microtasks[0];
      setMicrotasks((prev) => prev.slice(1));
      setLogs((prev) => [...prev, `Microtask → ${task.label}`]);
      return;
    }

    if (macrotasks.length > 0) {
      const task = macrotasks[0];
      setMacrotasks((prev) => prev.slice(1));
      setLogs((prev) => [...prev, `Macrotask → ${task.label}`]);
      return;
    }

    setLogs((prev) => [...prev, "✅ Event Loop Finished"]);
    setRunning(false);
  };

  // ▶ Auto run
  const run = () => {
    setRunning(true);
    const interval = setInterval(() => {
      setCallStack((cs) => {
        if (
          cs.length === 0 &&
          microtasks.length === 0 &&
          macrotasks.length === 0
        ) {
          clearInterval(interval);
          return cs;
        }
        return cs;
      });
      step();
    }, 800);
  };

  const reset = () => {
    setCallStack([]);
    setMicrotasks([]);
    setMacrotasks([]);
    setLogs([]);
    setRunning(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">⚙️ Event Loop Visualizer</h1>

      {/* Code Input */}
      <textarea
        className="w-full h-40 p-3 mb-4 text-black rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <button onClick={parseCode} className="bg-blue-600 px-4 py-2 rounded">
          Parse
        </button>
        <button onClick={step} className="bg-green-600 px-4 py-2 rounded">
          Step
        </button>
        <button onClick={run} className="bg-yellow-600 px-4 py-2 rounded">
          Run
        </button>
        <button onClick={reset} className="bg-red-600 px-4 py-2 rounded">
          Reset
        </button>
      </div>

      {/* Visualization */}
      <div className="grid grid-cols-3 gap-4">
        {/* Call Stack */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="font-semibold mb-2">📦 Call Stack</h2>
          {callStack.map((t) => (
            <div key={t.id} className="bg-gray-700 p-2 mb-2 rounded">
              {t.label}
            </div>
          ))}
        </div>

        {/* Microtask Queue */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="font-semibold mb-2">⚡ Microtasks</h2>
          {microtasks.map((t) => (
            <div key={t.id} className="bg-gray-700 p-2 mb-2 rounded">
              {t.label}
            </div>
          ))}
        </div>

        {/* Macrotask Queue */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="font-semibold mb-2">🕒 Macrotasks</h2>
          {macrotasks.map((t) => (
            <div key={t.id} className="bg-gray-700 p-2 mb-2 rounded">
              {t.label}
            </div>
          ))}
        </div>
      </div>

      {/* Logs */}
      <div className="mt-6 bg-black p-4 rounded h-40 overflow-y-auto">
        <h2 className="mb-2 font-semibold">📜 Execution Log</h2>
        {logs.map((log, i) => (
          <div key={i} className="text-sm">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
