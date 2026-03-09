"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    name: "M++ Language",
    status: "Active",
    description: "A low-level compiled language with LLVM backend, designed for maximum control.",
    href: "/projects/mpp",
    language: "M++",
  },
  {
    name: "R2ND UI",
    status: "In Progress",
    description: "Custom UI rendering engine with hardware acceleration and minimal overhead.",
    href: "/projects/ui",
    language: "M++ / C",
  },
  {
    name: "R2ND Renderer",
    status: "In Progress",
    description: "3D rendering pipeline built from scratch without graphics library wrappers.",
    href: "/projects/renderer",
    language: "M++ / C",
  },
  {
    name: "R2ND Desktop",
    status: "Planning",
    description: "A complete desktop environment: window manager, compositor, and native apps.",
    href: "/projects/desktop",
    language: "M++",
  },
  {
    name: "R2ND Networking",
    status: "Planning",
    description: "Full networking stack with TCP/UDP, HTTP, and WebSocket implementations.",
    href: "/projects/networking",
    language: "M++",
  },
  {
    name: "R2ND Tools",
    status: "Planning",
    description: "Developer toolchain: build system, package manager, debugger, and profiler.",
    href: "/projects/tools",
    language: "M++",
  },
];

const statusColors: Record<string, string> = {
  Active: "text-accent bg-accent/10 border-accent/20",
  "In Progress": "text-accent bg-accent/10 border-accent/20",
  Planning: "text-text-muted bg-surface border-border",
};

export function FeaturedProjects() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            className="text-sm font-mono text-accent tracking-wider uppercase font-medium"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Projects
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            What we&apos;re building
          </motion.h2>
        </div>

        <div className="space-y-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={project.href} className="group block">
                <div className="rounded-xl border border-border bg-card px-6 py-5 flex items-center justify-between gap-6 hover:border-accent/30 hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-6 min-w-0">
                    <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors whitespace-nowrap">
                      {project.name}
                    </h3>
                    <span
                      className={`hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        statusColors[project.status]
                      }`}
                    >
                      {project.status}
                    </span>
                    <p className="hidden md:block text-sm text-text-secondary truncate">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="hidden lg:inline text-xs font-mono text-text-muted">
                      {project.language}
                    </span>
                    <svg
                      className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
