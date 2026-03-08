"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ===================================================
// PUT YOUR DOWNLOAD LINK HERE
const DOWNLOAD_URL = "https://files.r2nd.org/installers/r2nd_setup.exe";
// ===================================================

export default function DownloadPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-mono text-accent tracking-wider">
            DOWNLOAD
          </span>
          <h1 className="text-5xl font-bold mt-4 mb-4">Get R2ND Desktop</h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Download the R2ND Desktop installer and experience a complete
            desktop environment built entirely from scratch.
          </p>
        </motion.div>

        {/* Download card */}
        <motion.div
          className="rounded-xl border border-border bg-surface p-8 md:p-12 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-2">R2ND Desktop Installer</h2>
          <p className="text-text-secondary mb-2">Windows</p>
          <p className="text-xs text-text-muted font-mono mb-8">
            Latest release
          </p>

          <a
            href={DOWNLOAD_URL}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white hover:bg-accent-hover font-medium text-base transition-all shadow-sm hover:shadow-md"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Installer
          </a>
        </motion.div>

        {/* System requirements */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">System Requirements</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "OS", value: "Windows 10 or later" },
              { label: "Architecture", value: "x86_64" },
              { label: "RAM", value: "4 GB minimum" },
              { label: "Disk Space", value: "500 MB free" },
            ].map((req) => (
              <div
                key={req.label}
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-4"
              >
                <span className="text-sm font-medium text-text-primary">
                  {req.label}
                </span>
                <span className="text-sm text-text-secondary font-mono">
                  {req.value}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Installation steps */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">Installation</h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Download the installer",
                desc: "Click the download button above to get the latest R2ND Desktop installer.",
              },
              {
                step: "2",
                title: "Run the installer",
                desc: "Open the downloaded file and follow the installation wizard.",
              },
              {
                step: "3",
                title: "Launch R2ND Desktop",
                desc: "Once installed, launch R2ND Desktop from your applications.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5"
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/docs"
            className="px-6 py-3 rounded-lg border border-accent/20 hover:border-accent/30 text-text-primary font-medium text-sm transition-all hover:bg-surface"
          >
            Read Documentation
          </Link>
          <Link
            href="/projects/desktop"
            className="px-6 py-3 rounded-lg border border-border hover:border-accent/20 text-text-secondary font-medium text-sm transition-all hover:bg-surface"
          >
            Learn More About R2ND Desktop
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
