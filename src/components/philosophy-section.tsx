"use client";

import { motion } from "framer-motion";

const principles = [
  {
    title: "No Unnecessary Dependencies",
    description:
      "Every component is built from scratch. No hidden supply chains, no unexpected breakage from upstream changes.",
    icon: "01",
  },
  {
    title: "Full Transparency",
    description:
      "Every line of code is open. Every decision is documented. No black boxes, no proprietary layers.",
    icon: "02",
  },
  {
    title: "Open Ecosystem",
    description:
      "Everything is free and open source. Fork it, modify it, build on it. The ecosystem belongs to everyone.",
    icon: "03",
  },
  {
    title: "Developer Freedom",
    description:
      "No vendor lock-in, no forced upgrades, no telemetry. You own your tools and your workflow.",
    icon: "04",
  },
  {
    title: "Long-term Maintainability",
    description:
      "Built to last. A coherent codebase means fewer breaking changes and simpler maintenance over decades.",
    icon: "05",
  },
];

export function PhilosophySection() {
  return (
    <section className="py-24 md:py-32 bg-surface relative">
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            className="text-sm font-mono text-accent tracking-wider uppercase font-medium"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Philosophy
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Built on principles, not convenience
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              className={`rounded-xl border border-border bg-card p-8 hover:border-accent/30 hover:shadow-sm transition-all duration-300 ${
                i === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="text-3xl font-bold font-mono text-accent/25">
                {principle.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-text-primary">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
