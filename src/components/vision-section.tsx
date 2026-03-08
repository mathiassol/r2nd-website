"use client";

import { motion } from "framer-motion";

export function VisionSection() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            className="text-sm font-mono text-accent tracking-wider uppercase"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Problem
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Modern software depends on thousands of independent tools
          </motion.h2>
          <motion.p
            className="mt-6 text-text-secondary leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Every layer of the stack is owned by a different team, built with
            different philosophies, and maintained on different timelines. The
            result is fragile, bloated software.
          </motion.p>
          <motion.p
            className="mt-4 text-text-secondary leading-relaxed text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            R2ND aims to rebuild the stack &mdash; language, libraries, UI, and
            applications &mdash; into a{" "}
            <span className="text-accent font-semibold">
              coherent open ecosystem
            </span>
            .
          </motion.p>

          <motion.div
            className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {[
              { value: "0", label: "Dependencies" },
              { value: "100%", label: "Open Source" },
              { value: "1", label: "Ecosystem" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-xs text-text-secondary mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
