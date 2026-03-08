"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "Introduction",
    description: "What R2ND is, why it exists, and what problems it solves.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Getting Started",
    description: "Set up your environment and build your first R2ND project.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "M++ Language Reference",
    description: "Complete language specification: syntax, types, memory model, and more.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Core Libraries",
    description: "Standard library documentation: data structures, I/O, math, and utilities.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "UI Framework",
    description: "Building interfaces with the R2ND UI engine: components, layout, events.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: "Tools & Build System",
    description: "Using the R2ND toolchain: compiler flags, build configuration, debugging.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Architecture",
    description: "How the R2ND ecosystem is structured and how the layers interact.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function DocsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-mono text-accent tracking-wider uppercase font-medium">
            Documentation
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Learn R2ND
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
            Everything you need to understand, use, and contribute to the R2ND
            ecosystem. From getting started to deep architecture guides.
          </p>
        </motion.div>

        {/* Quick start */}
        <motion.div
          className="mb-16 rounded-xl border border-border bg-surface p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold mb-4 text-text-primary">Quick Start</h2>
          <div className="code-block">
            <div className="space-y-2">
              <div>
                <span className="text-text-secondary">$</span>{" "}
                <span className="text-text-primary">git clone</span>{" "}
                <span className="text-text-primary">https://github.com/R2ND/r2nd</span>
              </div>
              <div>
                <span className="text-text-secondary">$</span>{" "}
                <span className="text-text-primary">cd r2nd</span>
              </div>
              <div>
                <span className="text-text-secondary">$</span>{" "}
                <span className="text-text-primary">make build</span>
              </div>
              <div>
                <span className="text-text-secondary">$</span>{" "}
                <span className="text-text-primary">./r2nd run examples/hello.mpp</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Doc sections */}
        <div className="space-y-3">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <div className="group rounded-xl border border-border bg-card p-6 hover:border-accent/30 hover:shadow-sm transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary group-hover:text-text-primary transition-colors">
                      {section.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {section.description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors ml-auto shrink-0 mt-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          className="mt-16 rounded-xl border border-border bg-surface p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-text-secondary">
            Documentation is actively being written. Want to help?{" "}
            <a
              href="https://github.com/R2ND"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-medium"
            >
              Contribute on GitHub
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
