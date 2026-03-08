"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
  { text: "$ r2nd init my-project", color: "text-text-primary", delay: 0 },
  { text: "Creating project structure...", color: "text-text-secondary", delay: 0.8 },
  { text: "  src/", color: "text-text-secondary", delay: 1.2 },
  { text: "  lib/", color: "text-text-secondary", delay: 1.4 },
  { text: "  build/", color: "text-text-secondary", delay: 1.6 },
  { text: "", color: "", delay: 2.0 },
  { text: "$ mpp build main.mpp", color: "text-text-primary", delay: 2.4 },
  { text: "Compiling with M++ v0.1.0...", color: "text-text-secondary", delay: 3.2 },
  { text: "  Lexing ............ done", color: "text-text-secondary", delay: 3.8 },
  { text: "  Parsing ........... done", color: "text-text-secondary", delay: 4.2 },
  { text: "  LLVM codegen ...... done", color: "text-text-secondary", delay: 4.6 },
  { text: "  Linking ........... done", color: "text-text-secondary", delay: 5.0 },
  { text: "", color: "", delay: 5.4 },
  { text: "Build successful. 0 dependencies.", color: "text-accent", delay: 5.6 },
  { text: "Output: build/main (42kb)", color: "text-text-secondary", delay: 6.0 },
];

export function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    lines.forEach((line, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), line.delay * 1000)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="ml-2 text-xs text-text-muted font-mono">
          r2nd-terminal
        </span>
      </div>

      {/* Terminal content */}
      <div className="p-5 font-mono text-sm leading-7 min-h-[380px]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={line.color}
          >
            {line.text || "\u00A0"}
          </motion.div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block w-2 h-5 bg-accent animate-pulse" />
        )}
      </div>
    </div>
  );
}
