"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "installation", label: "Installation" },
  { id: "quick-start", label: "Quick Start" },
  { id: "project-structure", label: "Project Structure" },
  { id: "package-system", label: "Package System" },
  { id: "mpp-language", label: "M++ Language" },
  { id: "ui-framework", label: "UI Framework" },
  { id: "cli-reference", label: "CLI Reference" },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="code-block">
      <pre className="text-text-primary">{children}</pre>
    </div>
  );
}

export default function DocsPage() {
  const [activeId, setActiveId] = useState("introduction");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-70px 0px -60% 0px", threshold: 0 }
    );

    for (const { id } of NAV_SECTIONS) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <motion.div
      className="pt-24 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors font-mono"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            R2ND Docs
          </h1>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl leading-relaxed">
            Everything you need to build with the R2ND ecosystem — from installation to shipping a full UI app.
          </p>
        </div>

        {/* Mobile nav — horizontal scrollable */}
        <nav className="lg:hidden mb-10 -mx-6 px-6 overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
            {NAV_SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeId === id
                    ? "bg-accent text-white"
                    : "bg-surface text-text-secondary hover:text-text-primary"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Sidebar + Content */}
        <div className="flex gap-12">
          {/* Sticky sidebar — desktop only */}
          <aside className="hidden lg:block w-52 shrink-0">
            <nav className="sticky top-[70px] pt-2 space-y-1">
              {NAV_SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    activeId === id
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1 space-y-20">

            {/* ─── 1. Introduction ─── */}
            <section id="introduction">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Introduction</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                <strong className="text-text-primary">R2ND</strong> stands for{" "}
                <strong className="text-text-primary">&quot;Road to No Dependencies&quot;</strong> — a
                self-hosted ecosystem built entirely from scratch. Custom language, UI framework,
                renderer, package manager — all with zero external dependencies.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                At the core is <strong className="text-text-primary">M++</strong>, a compiled language
                that emits LLVM IR and produces native binaries via <code className="font-mono text-accent">clang</code>.
                The toolchain, standard library, and every layer of the stack are written from the
                ground up.
              </p>
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="text-sm text-text-secondary">
                  <span className="font-medium text-text-primary">Pipeline:</span>{" "}
                  <span className="font-mono text-sm">.mpp → LLVM IR → clang → native binary</span>
                </p>
              </div>
            </section>

            {/* ─── 2. Installation ─── */}
            <section id="installation">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Installation</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                The R2ND installer handles everything automatically. Download it from{" "}
                <a
                  href="https://files.r2nd.org/installers/r2nd_setup.exe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-medium"
                >
                  files.r2nd.org
                </a>{" "}
                and run it.
              </p>
              <CodeBlock>{`# Download and run the installer
# From: https://files.r2nd.org/installers/r2nd_setup.exe

# The installer will:
#   1. Download mpp.exe (M++ compiler)
#   2. Download r2nd.exe (CLI tool)
#   3. Bundle LLVM/clang if not found
#   4. Install C++ build tools if needed
#   5. Add everything to PATH

# After install, restart your terminal:
mpp --version`}</CodeBlock>
              <div className="mt-4 rounded-xl border border-border bg-surface p-5 space-y-2">
                <p className="text-sm text-text-secondary">
                  <span className="font-medium text-text-primary">LLVM &amp; Build Tools:</span>{" "}
                  The installer automatically detects and bundles LLVM/clang. If Visual Studio Build Tools are missing, it installs them too.
                </p>
                <p className="text-sm text-text-secondary">
                  <span className="font-medium text-text-primary">Install scope:</span>{" "}
                  Supports both per-user and system-wide installation.
                </p>
              </div>
            </section>

            {/* ─── 3. Quick Start ─── */}
            <section id="quick-start">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Quick Start</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Create a new project and run it in two commands:
              </p>
              <CodeBlock>{`# Create a new project
mpp init
# Creates: mpp.toml, src/main.mpp, .mpp_packages/

# Build and run
mpp build --run`}</CodeBlock>
              <p className="text-text-secondary leading-relaxed mt-6 mb-3">
                The generated <code className="font-mono text-accent">src/main.mpp</code>:
              </p>
              <CodeBlock>{`fn main() {
    print("Hello from my-project!");
}`}</CodeBlock>
            </section>

            {/* ─── 4. Project Structure & Build System ─── */}
            <section id="project-structure">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Project Structure &amp; Build System</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">mpp.toml</h3>
              <CodeBlock>{`name = "my-app"
version = "1.0.0"
main = "src/main.mpp"
opt = "0"

[dependencies]
r2nd-ui = "0.1.0"`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-8 mb-3">Commands</h3>
              <div className="space-y-2">
                {[
                  ["mpp init", "Create new project"],
                  ["mpp build", "Compile project"],
                  ["mpp build --run", "Compile and run"],
                  ["mpp install <package>", "Install a package"],
                  ["mpp <file.mpp> --llvm", "Compile single file"],
                ].map(([cmd, desc]) => (
                  <div key={cmd} className="flex items-baseline gap-3">
                    <code className="font-mono text-sm text-accent shrink-0">{cmd}</code>
                    <span className="text-sm text-text-muted">— {desc}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold mt-8 mb-3">Project layout</h3>
              <CodeBlock>{`my-app/
├── mpp.toml          # Project config
├── src/
│   └── main.mpp      # Entry point
├── examples/         # Example files
└── .mpp_packages/    # Installed packages`}</CodeBlock>
            </section>

            {/* ─── 5. Package System ─── */}
            <section id="package-system">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Package System</h2>
              <CodeBlock>{`# Install a package
mpp install r2nd-ui

# This downloads from files.r2nd.org/packages/
# Adds to mpp.toml [dependencies]
# Extracts to .mpp_packages/r2nd-ui/

# Use in code:
import "r2nd-ui"`}</CodeBlock>
            </section>

            {/* ─── 6. M++ Language ─── */}
            <section id="mpp-language">
              <h2 className="text-2xl font-bold tracking-tight mb-4">M++ Language</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Variables &amp; Types</h3>
              <CodeBlock>{`let name = "R2ND";
let mut count: int = 0;
let pi: float = 3.14159;
let active: bool = true;`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-8 mb-3">Functions</h3>
              <CodeBlock>{`fn add(a: int, b: int) -> int {
    return a + b;
}

fn greet(name: string) {
    print("Hello, " + name + "!");
}`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-8 mb-3">Arrays &amp; Loops</h3>
              <CodeBlock>{`let items = ["one", "two", "three"];
let mut i = 0;
while i < len(items) {
    print(items[i]);
    i = i + 1;
}`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-8 mb-3">Structs</h3>
              <CodeBlock>{`struct Point {
    x: float,
    y: float
}

let p = Point { x: 1.0, y: 2.5 };
print(p.x);`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-8 mb-3">Imports</h3>
              <CodeBlock>{`import "utils.mpp"
import "r2nd-ui"  // package import`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-8 mb-3">Built-in Functions</h3>
              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex flex-wrap gap-2">
                  {[
                    "print", "input", "len", "push", "pop", "to_string", "to_int",
                    "parse_int", "trim", "split", "file_read", "file_write",
                    "file_exists", "dir_list", "exec", "alloc", "free", "getenv",
                  ].map((fn) => (
                    <code
                      key={fn}
                      className="font-mono text-sm px-2 py-0.5 rounded-md bg-card border border-border text-accent"
                    >
                      {fn}
                    </code>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── 7. R2ND UI Framework ─── */}
            <section id="ui-framework">
              <h2 className="text-2xl font-bold tracking-tight mb-4">R2ND UI Framework</h2>

              <p className="text-text-secondary leading-relaxed mb-4">
                A complete, zero-dependency UI framework. Declare layout in R2ML (XML), wire logic in M++.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Setup</h3>
              <CodeBlock>{`mpp init
mpp install r2nd-ui`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-8 mb-3">
                Layout — <code className="font-mono text-accent">examples/app.r2ml</code>
              </h3>
              <CodeBlock>{`<window width="800" height="600" bg="181825" layout="flex-col">
  <div height="48" bg="1e1e3a" layout="flex-row" padding="12">
    <label height="28" fg="a0b0ff" font-scale="2">My App</label>
    <div grow="1"></div>
    <button width="80" height="28" bg="3050c0" fg="ffffff" radius="6">Click Me</button>
  </div>
  <div grow="1" bg="1a1a2e" layout="flex-col" padding="20">
    <label height="24" fg="d0d8ff">Welcome to R2ND UI!</label>
  </div>
</window>`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-8 mb-3">
                Logic — <code className="font-mono text-accent">src/main.mpp</code>
              </h3>
              <CodeBlock>{`import "r2nd-ui"

let mut root: int = -1;

fn load_ui(w: int, h: int) {
    root = r2ml_load("examples/app.r2ml");
    ui_set(root, EF_W, w);
    ui_set(root, EF_H, h);
    ui_layout(root);
}

fn on_resize(w: int, h: int) {
    ui_set(root, EF_W, w);
    ui_set(root, EF_H, h);
    ui_layout(root);
}

fn on_click() {
    ui_set_text(evt_target, "Clicked!");
}

fn main() {
    let hwnd = win32_create_window("My App", 800, 600);
    win32_show_window(hwnd);
    gfx_init(800, 600);
    timer_init();
    ui_init();
    ui_events_init();
    load_ui(800, 600);

    // Bind click to all buttons
    let mut i = 0;
    while i < ui_elem_count {
        if ui_get(i, EF_TAG) == ETAG_BUTTON {
            ui_on(i, EVT_CLICK, on_click as ptr);
        }
        i = i + 1;
    }

    let msg = alloc(48);
    while win32_running {
        while (PeekMessageA(msg, null, 0u32, 0u32, 1u32) as int) != 0 {
            TranslateMessage(msg);
            DispatchMessageA(msg);
        }
        if !win32_running { break; }
        if win32_width != fb_width || win32_height != fb_height {
            gfx_resize(win32_width, win32_height);
            on_resize(win32_width, win32_height);
        }
        ui_process_events(root);
        gfx_clear(rgb(24, 24, 37));
        ui_render(root);
        gfx_present(hwnd);
        win32_clear_input();
        Sleep(1u32);
    }
    free(msg);
}`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-8 mb-3">R2ML Reference</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-surface p-5">
                  <p className="text-sm font-medium text-text-primary mb-2">Elements</p>
                  <div className="flex flex-wrap gap-2">
                    {["window", "div", "label", "button", "input"].map((el) => (
                      <code
                        key={el}
                        className="font-mono text-sm px-2 py-0.5 rounded-md bg-card border border-border text-accent"
                      >
                        {el}
                      </code>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <p className="text-sm font-medium text-text-primary mb-2">Attributes</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "width", "height", "bg", "fg", "border", "layout", "gap",
                      "padding", "grow", "radius", "overflow", "font-scale",
                    ].map((attr) => (
                      <code
                        key={attr}
                        className="font-mono text-sm px-2 py-0.5 rounded-md bg-card border border-border text-text-secondary"
                      >
                        {attr}
                      </code>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">UI API Functions</h3>
              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex flex-wrap gap-2">
                  {[
                    "ui_init", "ui_events_init", "ui_layout", "ui_render",
                    "ui_process_events", "ui_on", "ui_set", "ui_get",
                    "ui_set_text", "ui_get_text", "r2ml_load", "gfx_init",
                    "gfx_resize", "gfx_clear", "gfx_present",
                  ].map((fn) => (
                    <code
                      key={fn}
                      className="font-mono text-sm px-2 py-0.5 rounded-md bg-card border border-border text-accent"
                    >
                      {fn}
                    </code>
                  ))}
                </div>
              </div>
            </section>

            {/* ─── 8. CLI Reference ─── */}
            <section id="cli-reference">
              <h2 className="text-2xl font-bold tracking-tight mb-4">CLI Reference</h2>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left px-5 py-3 font-semibold text-text-primary border-b border-border">Command</th>
                      <th className="text-left px-5 py-3 font-semibold text-text-primary border-b border-border">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["mpp init", "Create new project with mpp.toml"],
                      ["mpp build", "Build project from mpp.toml"],
                      ["mpp build --run", "Build and run"],
                      ["mpp install <pkg>", "Install package from files.r2nd.org"],
                      ["mpp <file> --llvm", "Compile single file"],
                      ["mpp <file> --llvm -q", "Compile quietly"],
                      ["mpp <file> --llvm --run", "Compile and run single file"],
                      ["r2nd mpp build", "Same as mpp build (via r2nd CLI)"],
                      ["r2nd --version", "Show version"],
                    ].map(([cmd, desc], i) => (
                      <tr
                        key={cmd}
                        className={i % 2 === 0 ? "bg-card" : "bg-surface/50"}
                      >
                        <td className="px-5 py-3 border-b border-border">
                          <code className="font-mono text-accent">{cmd}</code>
                        </td>
                        <td className="px-5 py-3 border-b border-border text-text-secondary">
                          {desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
