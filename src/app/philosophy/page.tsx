"use client";

import { motion } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "No Unnecessary Dependencies",
    description:
      "The modern software ecosystem is built on layers upon layers of third-party code. A single vulnerability or breaking change in one package can cascade through thousands of projects. R2ND eliminates this risk by building every component from the ground up. No npm, no pip, no cargo — just code we understand and control.",
  },
  {
    number: "02",
    title: "Full Transparency",
    description:
      "Every line of code in the R2ND ecosystem is open and auditable. Every architectural decision is documented. There are no proprietary layers, no closed-source modules, no black boxes. If something breaks, you can trace the issue to its root. If something needs changing, you can change it.",
  },
  {
    number: "03",
    title: "Open Ecosystem",
    description:
      "R2ND is not a product — it's an ecosystem. Everything is free, open source, and designed to be forked, modified, and extended. The goal is not to create a walled garden but an open platform that belongs to the developer community. Use what you need, ignore what you don't.",
  },
  {
    number: "04",
    title: "Developer Freedom",
    description:
      "No vendor lock-in. No forced upgrades. No telemetry or tracking. R2ND tools work for you, not the other way around. You choose what to install, how to configure it, and when to update. Your development environment, your rules.",
  },
  {
    number: "05",
    title: "Long-term Maintainability",
    description:
      "Software should be built to last decades, not months. By controlling the entire stack, R2ND ensures that updates are coherent, migrations are smooth, and the codebase remains understandable. A unified ecosystem means fewer breaking changes and a codebase that any developer can navigate.",
  },
];

export default function PhilosophyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-mono text-accent tracking-wider uppercase font-medium">
            Philosophy
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Why we build from scratch
          </h1>
          <p className="mt-6 text-text-secondary text-lg leading-relaxed">
            R2ND isn&apos;t just a collection of tools. It&apos;s a philosophy
            about how software should be built — transparent, independent, and
            designed for the long term.
          </p>
        </motion.div>

        <div className="space-y-8">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.number}
              className="rounded-2xl border border-border bg-surface p-8 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <div className="flex items-start gap-6">
                <span
                  className="text-4xl font-bold font-mono text-accent/30 shrink-0"
                >
                  {principle.number}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-text-primary mb-3">
                    {principle.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl font-bold text-text-primary">
            Road to No Dependencies.
          </p>
          <p className="mt-4 text-text-secondary">
            Built from scratch. Owned by everyone.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
