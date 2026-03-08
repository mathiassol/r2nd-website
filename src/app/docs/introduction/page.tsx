"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stackLayers = [
  {
    name: "Applications",
    desc: "User-facing programs built entirely on the R2ND stack",
    color: "bg-accent/10 border-accent/20",
  },
  {
    name: "R2ND Desktop",
    desc: "Window management and OS integration layer",
    color: "bg-purple-500/10 border-purple-500/20",
  },
  {
    name: "UI · Renderer · Networking",
    desc: "Interface framework, 3D graphics engine, and communication stack",
    color: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    name: "Core Libraries",
    desc: "Standard library: data structures, I/O, math, file system, and utilities",
    color: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    name: "M++ Language",
    desc: "Statically-typed, LLVM-compiled systems language — the foundation of everything",
    color: "bg-blue-500/10 border-blue-500/20",
  },
];

const projectStatus = [
  { name: "M++", status: "Active", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { name: "Core Libraries", status: "Active", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { name: "R2ND UI", status: "In Progress", color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20" },
  { name: "3D Renderer", status: "In Progress", color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20" },
  { name: "R2ND Networking", status: "Planning", color: "text-text-muted bg-surface border-border" },
  { name: "R2ND Desktop", status: "Planning", color: "text-text-muted bg-surface border-border" },
  { name: "R2ND Tools", status: "Planning", color: "text-text-muted bg-surface border-border" },
];

const principles = [
  {
    title: "No Unnecessary Dependencies",
    desc: "Every component in R2ND is built from scratch or relies only on other R2ND components. External dependencies are treated as a design failure.",
  },
  {
    title: "Full Transparency",
    desc: "All source code is open. You can read, audit, and understand every line of code that runs on your machine.",
  },
  {
    title: "Open Ecosystem",
    desc: "R2ND is not a product — it's a platform. Anyone can build on it, extend it, or replace parts of it.",
  },
  {
    title: "Developer Freedom",
    desc: "No magic, no hidden runtime, no opaque framework. You control your memory, your types, and your execution.",
  },
  {
    title: "Long-term Maintainability",
    desc: "A codebase with zero external dependencies never breaks because a package was deprecated or silently changed its API.",
  },
];

const sampleCode = `// A simple M++ program

fn greet(name: string) -> string {
    return "Hello, " + name + "!";
}

struct Point {
    x: float,
    y: float,
}

fn Point.length(self: Point) -> float {
    return sqrt(self.x * self.x + self.y * self.y);
}

fn main() {
    let msg = greet("R2ND");
    print(msg);               // Hello, R2ND!

    let p = Point { x: 3.0, y: 4.0 };
    print(p.length());        // 5.0
}`;

export default function IntroductionPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Breadcrumb */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/docs"
            className="text-sm font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← Back to Docs
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <span className="text-sm font-mono text-accent tracking-wider uppercase font-medium">
            Introduction
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            What is R2ND?
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
            <span className="text-text-primary font-medium">R2ND</span> (Road to
            No Dependencies) is an open ecosystem rebuilding the software stack
            from scratch — with zero external dependencies.
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          className="mb-16 rounded-xl border border-border bg-card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-text-secondary leading-relaxed">
            Most software stacks depend on hundreds of third-party packages,
            hidden runtimes, and frameworks built on top of other frameworks.
            R2ND is a bet that this doesn&apos;t have to be the case. Starting
            from a new programming language —{" "}
            <span className="text-text-primary font-semibold font-mono">
              M++
            </span>{" "}
            — the project builds every layer of the stack: language, standard
            library, UI framework, 3D renderer, networking stack, and desktop
            environment.
          </p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            The goal is a complete, self-hosted software ecosystem where every
            line of code is readable, auditable, and under your control.
          </p>
        </motion.div>

        {/* The Stack */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-2xl font-bold mb-2 text-text-primary">
            The Stack
          </h2>
          <p className="text-text-secondary mb-8">
            Each layer is built on top of the one below it — and nothing else.
          </p>
          <div className="space-y-3">
            {stackLayers.map((layer, i) => (
              <motion.div
                key={layer.name}
                className={`rounded-xl border p-5 ${layer.color}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <div className="font-semibold text-text-primary">
                  {layer.name}
                </div>
                <div className="text-sm text-text-secondary mt-1">
                  {layer.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project Status */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-2 text-text-primary">
            Project Status
          </h2>
          <p className="text-text-secondary mb-8">
            R2ND is under active development. Here&apos;s where each component
            stands.
          </p>
          <div className="rounded-xl border border-border overflow-hidden">
            {projectStatus.map((project, i) => (
              <div
                key={project.name}
                className={`flex items-center justify-between px-6 py-4 ${
                  i < projectStatus.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="font-medium text-text-primary">
                  {project.name}
                </span>
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded-full border ${project.color}`}
                >
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-2 text-text-primary">
            Philosophy
          </h2>
          <p className="text-text-secondary mb-8">
            Five principles guide every design decision in R2ND.
          </p>
          <div className="space-y-4">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                className="rounded-xl border border-border bg-card p-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-accent font-mono text-sm shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sample M++ program */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-2 text-text-primary">
            M++ at a Glance
          </h2>
          <p className="text-text-secondary mb-6">
            Here&apos;s what M++ code looks like:
          </p>
          <div className="code-block">
            <pre className="text-text-primary">{sampleCode}</pre>
          </div>
        </motion.div>

        {/* Bottom navigation */}
        <motion.div
          className="flex items-center justify-between pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/docs"
            className="text-sm font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← Back to Docs
          </Link>
          <Link
            href="/docs/getting-started"
            className="text-sm font-mono text-accent hover:underline"
          >
            Getting Started →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
