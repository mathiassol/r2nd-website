"use client";

import { motion } from "framer-motion";

export function DeveloperSection() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="p-10 md:p-16">
            <div className="max-w-2xl">
              <motion.span
                className="text-sm font-mono text-accent tracking-wider uppercase font-medium"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Community
              </motion.span>
              <motion.h2
                className="mt-4 text-3xl md:text-4xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Build with us
              </motion.h2>
              <motion.p
                className="mt-6 text-lg text-text-secondary leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Everything is open source. Anyone can explore, fork, or
                contribute. Whether you want to write code, report issues,
                improve documentation, or just learn — you&apos;re welcome.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href="https://github.com/mathiassol/r2nd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
                <a
                  href="/docs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-border-hover text-text-primary font-medium text-sm transition-all hover:bg-card-hover"
                >
                  Read the Docs
                </a>
              </motion.div>
            </div>

            {/* Code snippet */}
            <motion.div
              className="mt-12 code-block max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-text-muted text-xs mb-3">
                Get started in seconds
              </div>
              <div>
                <span className="text-text-muted">$</span>{" "}
                <span className="text-text-primary">git clone</span>{" "}
                <span className="text-text-secondary">https://github.com/mathiassol/r2nd</span>
              </div>
              <div>
                <span className="text-text-muted">$</span>{" "}
                <span className="text-text-primary">cd r2nd</span>
              </div>
              <div>
                <span className="text-text-muted">$</span>{" "}
                <span className="text-text-primary">make build</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
