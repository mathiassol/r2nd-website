"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-xs text-accent font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Open Source &middot; Free Forever
            </div>
          </motion.div>

          <motion.h1
            className="text-[64px] font-medium leading-[77px] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The open ecosystem built{" "}
            <span className="text-accent">from scratch</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-[20px] font-light leading-[30px] text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            R2ND rebuilds the entire software stack — language, libraries, UI,
            and applications — with zero external dependencies. 100% open
            source. 100% free forever.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/docs"
              className="px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-all shadow-sm"
            >
              Get Started
            </Link>
            <Link
              href="/projects/mpp"
              className="px-6 py-3 rounded-lg border border-border hover:border-border-hover text-text-primary font-medium text-sm transition-all hover:bg-surface"
            >
              View Projects
            </Link>
            <a
              href="https://github.com/mathiassol/r2nd"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border border-border hover:border-border-hover text-text-secondary hover:text-text-primary font-medium text-sm transition-all hover:bg-surface flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </motion.div>

          {/* Stats row like Tailscale social proof */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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
                <div className="text-xs text-text-muted mt-1 font-medium">
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
