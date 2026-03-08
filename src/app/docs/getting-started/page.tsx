"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const examples = [
  "hello.mpp",
  "variables.mpp",
  "functions.mpp",
  "structs.mpp",
  "enums.mpp",
  "generics.mpp",
  "traits.mpp",
  "closures.mpp",
  "error_handling.mpp",
  "modules.mpp",
  "defer.mpp",
  "lowlevel.mpp",
  "memory.mpp",
];

const projectLayout = `mpp/
├── mpp.exe                      # Pre-built bootstrap compiler
├── mpp_runtime_llvm.c           # C runtime linked into every binary
├── bootstrap/
│   └── mpp.mpp                  # Self-hosted compiler source
├── examples/
│   ├── hello.mpp
│   ├── variables.mpp
│   ├── structs.mpp
│   └── ...
├── tests/
│   └── run_bootstrap_tests.ps1
└── README.md`;

export default function GettingStartedPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Breadcrumb */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/docs"
            className="text-sm font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← Back to Docs
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <span className="text-sm font-mono text-accent tracking-wider uppercase font-medium">
            Getting Started
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Build Your First M++ Program
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
            Get M++ running on your machine and compile your first program in
            minutes.
          </p>
        </motion.div>

        {/* Prerequisites */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold mb-4 text-text-primary">
            Prerequisites
          </h2>
          <div className="rounded-xl border border-border bg-card divide-y divide-border">
            <div className="px-6 py-4 flex items-start gap-3">
              <span className="text-accent font-mono text-sm shrink-0 mt-0.5">
                01
              </span>
              <div>
                <span className="font-medium text-text-primary">
                  LLVM / Clang 14+
                </span>
                <p className="text-sm text-text-secondary mt-0.5">
                  Required to compile LLVM IR to native binaries.{" "}
                  <a
                    href="https://llvm.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Download from llvm.org
                  </a>
                </p>
              </div>
            </div>
            <div className="px-6 py-4 flex items-start gap-3">
              <span className="text-accent font-mono text-sm shrink-0 mt-0.5">
                02
              </span>
              <div>
                <span className="font-medium text-text-primary">
                  Windows (x86_64)
                </span>
                <p className="text-sm text-text-secondary mt-0.5">
                  Currently the only supported platform. Linux support is
                  planned.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 flex items-start gap-3">
              <span className="text-accent font-mono text-sm shrink-0 mt-0.5">
                03
              </span>
              <div>
                <span className="font-medium text-text-primary">mpp.exe</span>
                <p className="text-sm text-text-secondary mt-0.5">
                  A pre-built bootstrap compiler binary is included in the
                  repository — no build step required to get started.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 1 */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-xl font-bold text-text-primary">Get M++</h2>
          </div>
          <div className="code-block">
            <pre className="text-text-primary">{`git clone https://github.com/mathiassol/mpp
cd mpp`}</pre>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-xl font-bold text-text-primary">
              Write Your First Program
            </h2>
          </div>
          <p className="text-text-secondary mb-4">
            Create a file called{" "}
            <code className="font-mono text-accent text-sm">hello.mpp</code>:
          </p>
          <div className="code-block">
            <pre className="text-text-primary">{`fn main() {
    let message = "Hello, R2ND!";
    print(message);
}`}</pre>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-xl font-bold text-text-primary">
              Compile and Run
            </h2>
          </div>
          <div className="code-block">
            <pre className="text-text-primary">{`.\\mpp.exe hello.mpp --llvm
.\\hello.exe`}</pre>
          </div>
          <div className="mt-3 rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm">
            <span className="text-text-muted"># Output: </span>
            <span className="text-text-primary">Hello, R2ND!</span>
          </div>
        </motion.div>

        {/* Step 4 */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent font-bold text-sm flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="text-xl font-bold text-text-primary">
              Explore Examples
            </h2>
          </div>
          <p className="text-text-secondary mb-4">
            The repository includes a full examples directory covering all
            language features:
          </p>
          <div className="mb-6 flex flex-wrap gap-2">
            {examples.map((ex) => (
              <span
                key={ex}
                className="font-mono text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full border border-accent/20"
              >
                {ex}
              </span>
            ))}
          </div>
          <div className="code-block">
            <pre className="text-text-primary">{`.\\mpp.exe examples\\structs.mpp --llvm
.\\structs.exe`}</pre>
          </div>
        </motion.div>

        {/* What just happened */}
        <motion.div
          className="mb-14 rounded-xl border border-border bg-card p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold mb-6 text-text-primary">
            What Just Happened?
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "Parse",
                desc: "The compiler reads your .mpp source file and builds an AST.",
              },
              {
                step: "Emit LLVM IR",
                desc: "The AST is lowered to LLVM IR (.ll file) — a portable assembly-level language.",
              },
              {
                step: "Compile to native",
                desc: "clang is invoked to compile the .ll file to a native Windows executable.",
              },
              {
                step: "Link runtime",
                desc: "mpp_runtime_llvm.c is automatically linked, providing built-ins like print().",
              },
            ].map((item, i) => (
              <div key={item.step} className="flex items-start gap-4">
                <span className="text-accent font-mono text-xs mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="font-semibold text-text-primary">
                    {item.step}
                  </span>
                  <span className="text-text-secondary text-sm ml-2">
                    — {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Build from source */}
        <motion.div
          id="build"
          className="mb-14 scroll-mt-28"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-2 text-text-primary">
            Build the Compiler from Source
          </h2>
          <p className="text-text-secondary mb-6">
            M++ is self-hosted — the compiler is written in M++ itself. Once you
            have{" "}
            <code className="font-mono text-accent text-sm">mpp.exe</code>, you
            can rebuild the compiler with:
          </p>
          <div className="code-block">
            <pre className="text-text-primary">{`# Self-hosted: build the compiler with itself
.\\mpp.exe bootstrap\\mpp.mpp --llvm

# Run tests
powershell -ExecutionPolicy Bypass -File tests\\run_bootstrap_tests.ps1`}</pre>
          </div>
        </motion.div>

        {/* Project layout */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-text-primary">
            Project Layout
          </h2>
          <div className="code-block">
            <pre className="text-text-primary">{projectLayout}</pre>
          </div>
        </motion.div>

        {/* Next steps */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-text-primary">
            Next Steps
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/docs/mpp"
              className="group rounded-xl border border-border bg-card p-6 hover:border-accent/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                M++ Language Reference →
              </div>
              <p className="mt-1 text-sm text-text-secondary">
                Complete syntax, types, functions, and built-ins.
              </p>
            </Link>
            <Link
              href="/docs/introduction"
              className="group rounded-xl border border-border bg-card p-6 hover:border-accent/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                Introduction →
              </div>
              <p className="mt-1 text-sm text-text-secondary">
                Why R2ND exists and what it&apos;s trying to achieve.
              </p>
            </Link>
          </div>
        </motion.div>

        {/* Bottom navigation */}
        <motion.div
          className="flex items-center justify-between pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/docs"
            className="text-sm font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← Back to Docs
          </Link>
          <Link
            href="/docs/mpp"
            className="text-sm font-mono text-accent hover:underline"
          >
            M++ Reference →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
