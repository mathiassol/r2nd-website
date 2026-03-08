"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const systems = [
  {
    name: "M++",
    description: "Low-level compiled language with LLVM backend. Designed for control and performance.",
    icon: "{ }",
    href: "/projects/mpp",
    tags: ["Language", "LLVM", "Compiled"],
  },
  {
    name: "Core Libraries",
    description: "Standard library built from scratch. No external dependencies, full control.",
    icon: "lib",
    href: "/projects/tools",
    tags: ["Stdlib", "Zero-dep", "Modular"],
  },
  {
    name: "R2ND UI",
    description: "Custom UI rendering engine. Hardware-accelerated, lightweight, and modular.",
    icon: "UI",
    href: "/projects/ui",
    tags: ["Renderer", "GPU", "Custom"],
  },
  {
    name: "3D Renderer",
    description: "Built-in 3D rendering pipeline. From scratch, no OpenGL wrappers.",
    icon: "3D",
    href: "/projects/renderer",
    tags: ["Graphics", "Pipeline", "Native"],
  },
  {
    name: "Networking",
    description: "Full networking stack. TCP/UDP, HTTP, WebSocket — all built internally.",
    icon: "NET",
    href: "/projects/networking",
    tags: ["TCP/UDP", "HTTP", "Sockets"],
  },
  {
    name: "R2ND Desktop",
    description: "Complete desktop environment. Window management, workspaces, modular apps.",
    icon: "DE",
    href: "/projects/desktop",
    tags: ["Desktop", "WM", "Environment"],
  },
];

export function EcosystemOverview() {
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
            Ecosystem
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            One ecosystem. Zero dependencies.
          </motion.h2>
          <motion.p
            className="mt-4 text-text-secondary text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Every layer of the stack, built from scratch and designed to work
            together.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((system, i) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={system.href} className="block group">
                <div className="relative rounded-xl border border-border bg-card p-6 h-full transition-all duration-300 hover:border-accent/30 hover:shadow-sm">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center font-mono font-bold text-xs text-accent mb-4">
                    {system.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {system.name}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {system.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {system.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs font-mono text-text-muted bg-surface border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-6 right-6 text-text-muted group-hover:text-accent transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
