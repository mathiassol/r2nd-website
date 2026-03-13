"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    href: "/projects/mpp",
    icon: "{ }",
    name: "M++",
    subtitle: "Low-level compiled language",
    status: "Active Development",
    description:
      "A compiled systems language with LLVM backend, manual memory management, and no garbage collector. The foundation of the R2ND ecosystem.",
  },
  {
    href: "/projects/ui",
    icon: "UI",
    name: "R2ND UI",
    subtitle: "UI rendering engine",
    status: "In Progress",
    description:
      "A fully custom hardware-accelerated UI rendering engine with its own layout engine, event system, and compositing pipeline.",
  },
  {
    href: "/projects/desktop",
    icon: "DE",
    name: "R2ND Desktop",
    subtitle: "Complete desktop environment",
    status: "Planning Phase",
    description:
      "A full desktop environment built on M++ and R2ND UI, including a window manager, compositor, launcher, and native applications.",
  },
  {
    href: "/projects/renderer",
    icon: "3D",
    name: "R2ND Renderer",
    subtitle: "3D rendering pipeline",
    status: "In Progress",
    description:
      "A 3D rendering pipeline written from scratch with no OpenGL or Vulkan wrappers, covering shaders, scene graphs, and lighting.",
  },
  {
    href: "/projects/networking",
    icon: "NET",
    name: "R2ND Networking",
    subtitle: "Full networking stack",
    status: "Planning",
    description:
      "A complete in-house networking stack covering TCP/UDP, HTTP, WebSocket, DNS, and TLS with zero external dependencies.",
  },
  {
    href: "/projects/tools",
    icon: "TLS",
    name: "R2ND Tools",
    subtitle: "Developer toolchain",
    status: "Planning",
    description:
      "The official developer toolchain for R2ND: build system, package manager, debugger, profiler, formatter, and doc generator.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link href="/" className="hover:text-text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-text-primary">Projects</span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-text-secondary leading-relaxed text-lg max-w-2xl">
            R2ND is built from the ground up — every layer of the stack is
            designed, written, and owned internally. Explore the components that
            make up the ecosystem.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.07 }}
            >
              <Link
                href={project.href}
                className="group flex flex-col h-full rounded-xl border border-border bg-card hover:border-border-hover hover:bg-card-hover transition-all p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg border border-border bg-surface flex items-center justify-center font-mono font-bold text-text-primary text-xs shrink-0">
                    {project.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {project.name}
                    </div>
                    <div className="text-xs text-text-muted truncate">
                      {project.subtitle}
                    </div>
                  </div>
                  <div className="ml-auto shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      {project.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs text-accent font-medium">
                  Learn more
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
