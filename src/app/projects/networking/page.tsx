"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  "TCP/UDP implementation",
  "HTTP client/server",
  "WebSocket support",
  "DNS resolution",
  "TLS support",
  "Zero external dependencies",
];

export default function NetworkingPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-text-primary">R2ND Networking</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl border border-border bg-card flex items-center justify-center font-mono font-bold text-text-primary text-sm">
              NET
            </div>
            <div>
              <h1 className="text-4xl font-bold">R2ND Networking</h1>
              <p className="text-text-secondary mt-1">Full networking stack built internally</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/5 text-accent text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Planning
          </div>
        </motion.div>

        <motion.section className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-text-secondary leading-relaxed text-lg">
            R2ND Networking is a complete networking stack implemented entirely in-house, covering everything
            from raw TCP/UDP sockets up through HTTP, WebSocket, and TLS — with no reliance on third-party
            networking libraries. By owning the full stack, R2ND gains precise control over protocol
            behaviour, performance tuning, and security guarantees, ensuring seamless integration with the
            rest of the ecosystem without the overhead or opacity of external dependencies.
          </p>
        </motion.section>

        <motion.section className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-lg border border-accent/20 bg-surface p-4">
                <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-text-secondary">{f}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Link href="/docs" className="px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent-hover font-medium text-sm transition-all">
            Read Documentation
          </Link>
          <a href="https://github.com/R2ND" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-accent/20 hover:border-accent/30 text-text-primary font-medium text-sm transition-all hover:bg-surface flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View Source
          </a>
        </motion.div>
      </div>
    </div>
  );
}
