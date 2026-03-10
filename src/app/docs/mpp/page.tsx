"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// TOC data
// ---------------------------------------------------------------------------
const tocItems = [
  { id: "getting-started", label: "Getting Started", keywords: ["hello world", "compile", "build", "install", "entry"] },
  { id: "variables", label: "Variables & Constants", keywords: ["let", "mut", "const", "type inference", "mutable", "immutable"] },
  { id: "types", label: "Primitive Types", keywords: ["int", "float", "bool", "string", "ptr", "void", "u8", "i32", "u64", "sized", "hex", "binary"] },
  { id: "operators", label: "Operators", keywords: ["arithmetic", "comparison", "logical", "bitwise", "assignment", "cast", "sizeof"] },
  { id: "control-flow", label: "Control Flow", keywords: ["if", "else", "while", "for", "match", "break", "continue", "range", "pattern"] },
  { id: "functions", label: "Functions", keywords: ["fn", "return", "first-class", "method", "receiver", "function type"] },
  { id: "strings", label: "Strings", keywords: ["string", "escape", "raw", "interpolation", "len", "substr", "split", "contains", "trim", "replace"] },
  { id: "arrays", label: "Arrays", keywords: ["array", "append", "pop", "len", "indexing", "bounds", "iteration", "arr_copy"] },
  { id: "maps", label: "Maps", keywords: ["map", "hashmap", "key", "value", "map_set", "map_get", "map_has", "map_del", "map_keys"] },
  { id: "structs", label: "Structs", keywords: ["struct", "field", "method", "drop", "destructor", "initialization"] },
  { id: "enums", label: "Enums", keywords: ["enum", "sum type", "variant", "payload", "pattern matching", "destructuring"] },
  { id: "traits", label: "Traits & Impl", keywords: ["trait", "impl", "interface", "polymorphism", "trait bound", "dispatch"] },
  { id: "generics", label: "Generics", keywords: ["generic", "monomorphization", "type parameter", "parameterized"] },
  { id: "closures", label: "Closures & Lambdas", keywords: ["closure", "lambda", "capture", "higher-order", "anonymous", "callback"] },
  { id: "error-handling", label: "Error Handling", keywords: ["Result", "Option", "ok", "err", "unwrap", "Some", "None", "is_ok", "is_err", "?"] },
  { id: "modules", label: "Modules & Imports", keywords: ["import", "mod", "module", "priv", "visibility", "file"] },
  { id: "ffi", label: "C FFI", keywords: ["extern", "ffi", "c", "interop", "linking", "foreign"] },
  { id: "memory", label: "Memory Management", keywords: ["alloc", "free", "memcpy", "memset", "reference counting", "rc", "slice"] },
  { id: "defer", label: "Defer", keywords: ["defer", "cleanup", "LIFO", "scope", "resource"] },
  { id: "stdlib", label: "Standard Library", keywords: ["std", "io", "math", "json", "csv", "net", "thread", "sync", "testing", "hash", "log", "datetime"] },
  { id: "compilation", label: "Compilation", keywords: ["build", "mpp.toml", "LLVM", "linking", "compile", "pipeline", "output"] },
];

// ---------------------------------------------------------------------------
// Helper components
// ---------------------------------------------------------------------------

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-20">
      <h2 className="text-xl font-bold mb-4 text-text-primary border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="mb-4">
      {label && (
        <div className="text-[11px] font-mono text-text-muted bg-surface border border-border border-b-0 rounded-t-lg px-3 py-1 w-fit">
          {label}
        </div>
      )}
      <div className={`code-block !text-[13px] !leading-[1.6] !py-3 !px-4 ${label ? "!rounded-t-none !rounded-tl-none" : ""}`}>
        <pre className="text-text-primary whitespace-pre">{children}</pre>
      </div>
    </div>
  );
}

function Sub({ title, id }: { title: string; id?: string }) {
  return (
    <h3 id={id} className="text-base font-semibold mt-6 mb-2 text-text-primary">
      {title}
    </h3>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="rounded-lg border border-border overflow-hidden mb-4 text-[13px]">
      <table className="w-full">
        <thead>
          <tr className="bg-surface border-b border-border">
            {headers.map((h) => (
              <th key={h} className="text-left py-2 px-3 font-semibold text-text-primary">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i < rows.length - 1 ? "border-b border-border/50" : ""}>
              {row.map((cell, j) => (
                <td key={j} className={`py-1.5 px-3 ${j === 0 ? "font-mono text-accent" : "text-text-secondary"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Note({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "tip" }) {
  const styles = {
    info: "border-accent/30 bg-accent/5",
    warning: "border-yellow-500/30 bg-yellow-500/5",
    tip: "border-green-500/30 bg-green-500/5",
  };
  const labels = { info: "Note", warning: "Warning", tip: "Tip" };
  return (
    <div className={`rounded-lg border ${styles[type]} px-4 py-3 mb-4 text-sm`}>
      <span className="font-semibold text-text-primary">{labels[type]}:</span>{" "}
      <span className="text-text-secondary">{children}</span>
    </div>
  );
}

function Param({ name, type, desc }: { name: string; type: string; desc: string }) {
  return (
    <div className="flex gap-2 text-sm mb-1">
      <code className="font-mono text-accent text-[13px]">{name}</code>
      <span className="text-text-muted">:</span>
      <code className="font-mono text-text-secondary text-[13px]">{type}</code>
      <span className="text-text-muted">&mdash;</span>
      <span className="text-text-secondary">{desc}</span>
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[13px] bg-surface border border-border rounded px-1.5 py-0.5 text-accent">
      {children}
    </code>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MppPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Full-text search state
  const [searchResults, setSearchResults] = useState<{ sectionId: string; sectionLabel: string; snippet: string; node: Text; charIndex: number }[]>([]);
  const [activeResultIdx, setActiveResultIdx] = useState(0);
  const RESULTS_PER_PAGE = 20;
  const [resultPage, setResultPage] = useState(0);

  // Clear highlights helper
  const clearHighlights = () => {
    if (!contentRef.current) return;
    const marks = contentRef.current.querySelectorAll("mark[data-search-hl]");
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
        parent.normalize();
      }
    });
  };

  // Full-text search through DOM content
  useEffect(() => {
    if (!contentRef.current) return;

    // Always clear old highlights first
    clearHighlights();
    setActiveResultIdx(0);
    setResultPage(0);

    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 2) {
      setSearchResults([]);
      return;
    }

    const results: typeof searchResults = [];
    const sections = contentRef.current.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionId = section.id;
      const tocItem = tocItems.find((t) => t.id === sectionId);
      const sectionLabel = tocItem?.label || sectionId;

      // Walk all text nodes in this section
      const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT, null);
      let textNode: Text | null;
      while ((textNode = walker.nextNode() as Text | null)) {
        const text = textNode.textContent || "";
        const lower = text.toLowerCase();
        let startIdx = 0;
        let matchIdx: number;
        while ((matchIdx = lower.indexOf(q, startIdx)) !== -1) {
          // Build snippet: up to 40 chars around match
          const snippetStart = Math.max(0, matchIdx - 20);
          const snippetEnd = Math.min(text.length, matchIdx + q.length + 20);
          const prefix = snippetStart > 0 ? "…" : "";
          const suffix = snippetEnd < text.length ? "…" : "";
          const snippet = prefix + text.slice(snippetStart, snippetEnd) + suffix;

          results.push({ sectionId, sectionLabel, snippet, node: textNode, charIndex: matchIdx });
          startIdx = matchIdx + q.length;
        }
      }
    });

    setSearchResults(results);

    // Highlight all matches in DOM
    if (results.length > 0) {
      // Group results by text node (reverse order to preserve offsets)
      const nodeMap = new Map<Text, { charIndex: number; len: number }[]>();
      for (const r of results) {
        if (!nodeMap.has(r.node)) nodeMap.set(r.node, []);
        nodeMap.get(r.node)!.push({ charIndex: r.charIndex, len: q.length });
      }

      nodeMap.forEach((matches, textNode) => {
        // Sort by charIndex descending so we can split from the end
        matches.sort((a, b) => b.charIndex - a.charIndex);
        let currentNode: Text = textNode;
        for (const m of matches) {
          if (m.charIndex + m.len > (currentNode.textContent || "").length) continue;
          const afterMatch = currentNode.splitText(m.charIndex + m.len);
          const matchNode = currentNode.splitText(m.charIndex);
          const mark = document.createElement("mark");
          mark.setAttribute("data-search-hl", "true");
          mark.className = "bg-accent/30 text-text-primary rounded-sm px-0";
          mark.textContent = matchNode.textContent;
          matchNode.parentNode?.replaceChild(mark, matchNode);
          currentNode = afterMatch.previousSibling?.previousSibling as Text || afterMatch;
          // Find the actual text node before the mark for further splits
          if (afterMatch.parentNode) {
            const prevSibling = mark.previousSibling;
            if (prevSibling && prevSibling.nodeType === Node.TEXT_NODE) {
              currentNode = prevSibling as Text;
            }
          }
        }
      });
    }
  }, [searchQuery]);

  // Navigate to active result
  useEffect(() => {
    if (searchResults.length === 0) return;
    // Remove "active" styling from all marks
    if (!contentRef.current) return;
    const marks = contentRef.current.querySelectorAll("mark[data-search-hl]");
    marks.forEach((m) => {
      m.className = "bg-accent/30 text-text-primary rounded-sm px-0";
    });
    // Highlight the active one
    if (marks[activeResultIdx]) {
      marks[activeResultIdx].className = "bg-accent text-white rounded-sm px-0";
      marks[activeResultIdx].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeResultIdx, searchResults]);

  const goToResult = (idx: number) => {
    setActiveResultIdx(idx);
    setResultPage(Math.floor(idx / RESULTS_PER_PAGE));
  };
  const goNext = () => {
    if (searchResults.length === 0) return;
    goToResult((activeResultIdx + 1) % searchResults.length);
  };
  const goPrev = () => {
    if (searchResults.length === 0) return;
    goToResult((activeResultIdx - 1 + searchResults.length) % searchResults.length);
  };

  // Keyboard shortcut: Enter=next, Shift+Enter=prev
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) { e.preventDefault(); goPrev(); }
    else if (e.key === "Enter") { e.preventDefault(); goNext(); }
    else if (e.key === "Escape") { setSearchQuery(""); }
  };

  // Paged results
  const totalPages = Math.ceil(searchResults.length / RESULTS_PER_PAGE);
  const pagedResults = searchResults.slice(resultPage * RESULTS_PER_PAGE, (resultPage + 1) * RESULTS_PER_PAGE);

  // TOC filtering — show all sections, mark which ones have results
  const sectionHitCounts = new Map<string, number>();
  for (const r of searchResults) {
    sectionHitCounts.set(r.sectionId, (sectionHitCounts.get(r.sectionId) || 0) + 1);
  }

  const isSearching = searchQuery.trim().length >= 2;

  return (
    <div className="pt-[70px]">
      <div className="mx-auto max-w-7xl flex">
        {/* ---- Mobile TOC button ---- */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed bottom-5 right-5 z-40 bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-accent-hover transition-colors"
          aria-label="Table of contents"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>

        {/* ---- Mobile TOC overlay ---- */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-30 bg-background/95 backdrop-blur-sm pt-[70px] overflow-y-auto">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Contents</p>
                <button onClick={() => setMobileMenuOpen(false)} className="text-text-muted hover:text-text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-full text-sm rounded-lg border border-border bg-card px-3 py-2 mb-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
              />
              {isSearching && (
                <div className="flex items-center gap-2 mb-3 text-xs text-text-muted">
                  <span className="font-mono">
                    {searchResults.length > 0 ? `${activeResultIdx + 1}/${searchResults.length}` : "No matches"}
                  </span>
                  {searchResults.length > 0 && (
                    <>
                      <button onClick={goPrev} className="px-2 py-0.5 rounded border border-border text-[11px] hover:bg-surface">▲</button>
                      <button onClick={goNext} className="px-2 py-0.5 rounded border border-border text-[11px] hover:bg-surface">▼</button>
                    </>
                  )}
                </div>
              )}
              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm text-text-secondary hover:text-accent transition-colors py-1.5"
                  >
                    <span>{item.label}</span>
                    {isSearching && sectionHitCounts.has(item.id) && (
                      <span className="text-[10px] font-mono text-accent">{sectionHitCounts.get(item.id)}</span>
                    )}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* ---- Sidebar ---- */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-[70px] overflow-y-auto max-h-[calc(100vh-70px)] py-4 pr-4 pl-6">
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full text-[13px] rounded-lg border border-border bg-card px-3 py-1.5 mb-2 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
            />

            {/* Search result count + nav arrows */}
            {isSearching && (
              <div className="flex items-center justify-between mb-3 text-[11px]">
                <span className="text-text-muted font-mono">
                  {searchResults.length > 0
                    ? `${activeResultIdx + 1} / ${searchResults.length}`
                    : "No matches"}
                </span>
                {searchResults.length > 0 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={goPrev}
                      className="w-5 h-5 flex items-center justify-center rounded border border-border hover:bg-surface text-text-muted hover:text-text-primary transition-colors"
                      title="Previous (Shift+Enter)"
                    >
                      ▲
                    </button>
                    <button
                      onClick={goNext}
                      className="w-5 h-5 flex items-center justify-center rounded border border-border hover:bg-surface text-text-muted hover:text-text-primary transition-colors"
                      title="Next (Enter)"
                    >
                      ▼
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* When searching: show results grouped by section */}
            {isSearching && searchResults.length > 0 && (
              <div className="mb-3 border-b border-border pb-3">
                <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-2">
                  Results
                </p>
                <div className="space-y-0.5 max-h-[40vh] overflow-y-auto">
                  {pagedResults.map((r, i) => {
                    const globalIdx = resultPage * RESULTS_PER_PAGE + i;
                    return (
                      <button
                        key={globalIdx}
                        onClick={() => goToResult(globalIdx)}
                        className={`block w-full text-left text-[11px] py-1 px-2 rounded transition-colors truncate ${
                          globalIdx === activeResultIdx
                            ? "bg-accent/15 text-accent"
                            : "text-text-muted hover:text-text-secondary hover:bg-surface"
                        }`}
                        title={r.snippet}
                      >
                        <span className="font-medium text-text-secondary text-[10px]">{r.sectionLabel}</span>
                        <br />
                        <span className="opacity-80">{r.snippet}</span>
                      </button>
                    );
                  })}
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-2 text-[10px] text-text-muted">
                    <button
                      onClick={() => setResultPage(Math.max(0, resultPage - 1))}
                      disabled={resultPage === 0}
                      className="hover:text-accent disabled:opacity-30 transition-colors"
                    >
                      ← Prev
                    </button>
                    <span className="font-mono">{resultPage + 1}/{totalPages}</span>
                    <button
                      onClick={() => setResultPage(Math.min(totalPages - 1, resultPage + 1))}
                      disabled={resultPage >= totalPages - 1}
                      className="hover:text-accent disabled:opacity-30 transition-colors"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            )}

            <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-2">
              Contents
            </p>
            <nav className="space-y-0.5">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center justify-between text-[13px] text-text-secondary hover:text-accent transition-colors py-1"
                >
                  <span className="truncate">{item.label}</span>
                  {isSearching && sectionHitCounts.has(item.id) && (
                    <span className="text-[10px] font-mono text-accent ml-1 shrink-0">
                      {sectionHitCounts.get(item.id)}
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* ---- Content ---- */}
        <div ref={contentRef} className="flex-1 min-w-0 px-6 py-4">
          {/* Breadcrumb */}
          <div className="mb-4 text-sm font-mono text-text-muted">
            <Link href="/docs" className="hover:text-accent transition-colors">&larr; Docs</Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">M++ Reference</span>
          </div>

          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span className="text-xs font-mono text-accent tracking-wider uppercase font-medium">
              Language Reference
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              M++ Language Reference
            </h1>
            <p className="mt-3 text-text-secondary text-base max-w-2xl leading-relaxed">
              Complete documentation for M++ &mdash; a statically-typed, LLVM-compiled systems language with no external runtime. From hello world to low-level memory management.
            </p>
          </motion.div>

          {/* ================================================================
              SECTION 1: Getting Started
              ================================================================ */}
          <Section id="getting-started" title="Getting Started">
            <p className="text-text-secondary text-sm mb-3">
              M++ source files use the <InlineCode>.mpp</InlineCode> extension. Every program needs a <InlineCode>main</InlineCode> function as its entry point.
            </p>

            <Sub title="Hello World" />
            <CodeBlock label="main.mpp">{`fn main() {
    print("Hello, world!");
}`}</CodeBlock>

            <Sub title="Compiling & Running" />
            <p className="text-text-secondary text-sm mb-3">
              The <InlineCode>mpp</InlineCode> CLI compiles source to native binaries via LLVM.
            </p>
            <CodeBlock label="shell">{`mpp build          # build from mpp.toml
mpp main.mpp       # compile single file
mpp build --run    # build and run`}</CodeBlock>

            <Sub title="Project Structure" />
            <p className="text-text-secondary text-sm mb-3">
              For multi-file projects, create a <InlineCode>mpp.toml</InlineCode> in your project root:
            </p>
            <CodeBlock label="mpp.toml">{`name = "hello"
version = "0.1.0"
main = "src/main.mpp"`}</CodeBlock>
            <p className="text-text-secondary text-sm">
              Then run <InlineCode>mpp build</InlineCode> to compile. The output binary is placed in the project root by default.
            </p>
          </Section>

          {/* ================================================================
              SECTION 2: Variables & Constants
              ================================================================ */}
          <Section id="variables" title="Variables & Constants">
            <p className="text-text-secondary text-sm mb-3">
              Variables are declared with <InlineCode>let</InlineCode>. They are immutable by default. Use <InlineCode>let mut</InlineCode> for mutable bindings.
            </p>

            <CodeBlock>{`let name = "R2ND";              // immutable, type inferred
let mut counter = 0;            // mutable
let x: int = 42;                // explicit type
const MAX_BUFFER: int = 4096;   // compile-time constant`}</CodeBlock>

            <Sub title="Type Inference" />
            <p className="text-text-secondary text-sm mb-3">
              The compiler infers types from the right-hand side. Explicit annotations are optional but can improve clarity.
            </p>
            <CodeBlock>{`let a = 3.14;       // inferred as float
let b = true;       // inferred as bool
let c = "hello";    // inferred as string
let d: i64 = 100;   // explicit sized integer`}</CodeBlock>

            <Sub title="Constants" />
            <p className="text-text-secondary text-sm mb-3">
              <InlineCode>const</InlineCode> values are evaluated at compile time. They must have an explicit type annotation and cannot be reassigned.
            </p>
            <CodeBlock>{`const PI: float = 3.14159265;
const APP_NAME: string = "MyApp";
const MAX_RETRIES: int = 3;`}</CodeBlock>

            <Note>
              Attempting to reassign an immutable variable or a <InlineCode>const</InlineCode> is a compile-time error.
            </Note>
          </Section>

          {/* ================================================================
              SECTION 3: Primitive Types
              ================================================================ */}
          <Section id="types" title="Primitive Types">
            <p className="text-text-secondary text-sm mb-3">
              M++ has a small set of built-in primitive types. Sized integer variants are available for low-level control.
            </p>

            <Table
              headers={["Type", "Description", "Example"]}
              rows={[
                ["int", "Platform-sized signed integer (64-bit on x86_64)", "42"],
                ["float", "64-bit floating point (IEEE 754)", "3.14"],
                ["bool", 'Boolean true or false', "true"],
                ["string", "UTF-8 string", '"hello"'],
                ["ptr", "Raw pointer", "null"],
                ["void", "No value / unit type", "—"],
              ]}
            />

            <Sub title="Sized Integer Types" />
            <Table
              headers={["Type", "Bits", "Range"]}
              rows={[
                ["u8", "8", "0 to 255"],
                ["i8", "8", "−128 to 127"],
                ["u16", "16", "0 to 65,535"],
                ["i16", "16", "−32,768 to 32,767"],
                ["u32", "32", "0 to 4,294,967,295"],
                ["i32", "32", "−2³¹ to 2³¹−1"],
                ["u64", "64", "0 to 2⁶⁴−1"],
                ["i64", "64", "−2⁶³ to 2⁶³−1"],
              ]}
            />

            <Sub title="Hex & Binary Literals" />
            <CodeBlock>{`let a: u8  = 255;
let b: u32 = 0xFF;        // hex literal
let c: i64 = 0b10101010;  // binary literal
let d: u64 = 1_000_000;   // underscore separators allowed`}</CodeBlock>

            <Note type="tip">
              Use sized types when working with FFI, binary protocols, or when exact memory layout matters. Prefer <InlineCode>int</InlineCode> and <InlineCode>float</InlineCode> for general-purpose code.
            </Note>
          </Section>

          {/* ================================================================
              SECTION 4: Operators
              ================================================================ */}
          <Section id="operators" title="Operators">
            <Sub title="Arithmetic" />
            <Table
              headers={["Operator", "Description", "Example"]}
              rows={[
                ["+", "Addition / string concatenation", "a + b"],
                ["-", "Subtraction", "a - b"],
                ["*", "Multiplication", "a * b"],
                ["/", "Division", "a / b"],
                ["%", "Modulo (remainder)", "a % b"],
              ]}
            />

            <Sub title="Comparison" />
            <Table
              headers={["Operator", "Description"]}
              rows={[
                ["==", "Equal to"],
                ["!=", "Not equal to"],
                ["<", "Less than"],
                [">", "Greater than"],
                ["<=", "Less than or equal"],
                [">=", "Greater than or equal"],
              ]}
            />

            <Sub title="Logical" />
            <Table
              headers={["Operator", "Description", "Example"]}
              rows={[
                ["&&", "Logical AND (short-circuits)", "a && b"],
                ["||", "Logical OR (short-circuits)", "a || b"],
                ["!", "Logical NOT", "!flag"],
              ]}
            />

            <Sub title="Bitwise" />
            <Table
              headers={["Operator", "Description"]}
              rows={[
                ["&", "Bitwise AND"],
                ["|", "Bitwise OR"],
                ["^", "Bitwise XOR"],
                ["~", "Bitwise NOT"],
                ["<<", "Left shift"],
                [">>", "Right shift"],
              ]}
            />

            <Sub title="Assignment & Compound Assignment" />
            <Table
              headers={["Operator", "Equivalent"]}
              rows={[
                ["=", "Assign"],
                ["+=", "a = a + b"],
                ["-=", "a = a - b"],
                ["*=", "a = a * b"],
                ["/=", "a = a / b"],
                ["%=", "a = a % b"],
                ["&=", "a = a & b"],
                ["|=", "a = a | b"],
                ["^=", "a = a ^ b"],
                ["<<=", "a = a << b"],
                [">>=", "a = a >> b"],
              ]}
            />

            <Sub title="Other Operators" />
            <Table
              headers={["Operator", "Description", "Example"]}
              rows={[
                ["as", "Type cast", "x as float"],
                ["sizeof", "Size of type in bytes", "sizeof(int)"],
                ["&x", "Address-of (get pointer)", "let p = &x;"],
                ["*p", "Dereference pointer", "let val = *p;"],
                ["..", "Range (exclusive end)", "0..10"],
              ]}
            />

            <CodeBlock>{`let mut x = 10;
x += 5;                    // x is now 15
let y = x as float;        // cast to float: 15.0
let mask: u8 = 0b1111_0000;
let low = mask & 0x0F;     // bitwise AND: 0
let high = mask >> 4;      // right shift: 15`}</CodeBlock>
          </Section>

          {/* ================================================================
              SECTION 5: Control Flow
              ================================================================ */}
          <Section id="control-flow" title="Control Flow">
            <Sub title="If / Else" />
            <CodeBlock>{`let score = 85;
if score >= 90 {
    print("A");
} else if score >= 80 {
    print("B");
} else {
    print("C");
}`}</CodeBlock>

            <Sub title="While Loop" />
            <CodeBlock>{`let mut i = 0;
while i < 10 {
    print(to_string(i));
    i += 1;
}`}</CodeBlock>

            <Sub title="For..in (Range)" />
            <p className="text-text-secondary text-sm mb-3">
              Ranges use <InlineCode>..</InlineCode> syntax with an exclusive upper bound.
            </p>
            <CodeBlock>{`for i in 0..5 {
    print(to_string(i));  // prints 0, 1, 2, 3, 4
}`}</CodeBlock>

            <Sub title="For-each (Arrays)" />
            <CodeBlock>{`let names = ["Alice", "Bob", "Charlie"];
for name in names {
    print("Hello, " + name);
}`}</CodeBlock>

            <Sub title="For-each (Maps)" />
            <CodeBlock>{`let ages = { "Alice": 30, "Bob": 25 };
for key, value in ages {
    print(key + " is " + to_string(value));
}`}</CodeBlock>

            <Sub title="Break & Continue" />
            <CodeBlock>{`for i in 0..100 {
    if i % 2 == 0 {
        continue;  // skip even numbers
    }
    if i > 20 {
        break;     // stop at 20
    }
    print(to_string(i));
}`}</CodeBlock>

            <Sub title="Match / Pattern Matching" />
            <p className="text-text-secondary text-sm mb-3">
              <InlineCode>match</InlineCode> expressions support literal patterns, enum destructuring, and a wildcard <InlineCode>_</InlineCode> default case.
            </p>
            <CodeBlock>{`match status_code {
    200 => { print("OK"); },
    404 => { print("Not Found"); },
    500 => { print("Server Error"); },
    _ => { print("Unknown status"); }
}`}</CodeBlock>

            <p className="text-text-secondary text-sm mb-3">
              Pattern matching is especially powerful with enums (see the Enums section):
            </p>
            <CodeBlock>{`match shape {
    Shape.Circle(r) => {
        return 3.14159 * r * r;
    },
    Shape.Rect(w, h) => {
        return w * h;
    },
    _ => { return 0.0; }
}`}</CodeBlock>
          </Section>

          {/* ================================================================
              SECTION 6: Functions
              ================================================================ */}
          <Section id="functions" title="Functions">
            <Sub title="Declaration" />
            <p className="text-text-secondary text-sm mb-3">
              Functions are declared with <InlineCode>fn</InlineCode>. Return types come after <InlineCode>{"->"}</InlineCode>.
            </p>
            <CodeBlock>{`fn add(a: int, b: int) -> int {
    return a + b;
}

fn greet(name: string) {
    print("Hello, " + name + "!");
}`}</CodeBlock>

            <Sub title="Return Types" />
            <p className="text-text-secondary text-sm mb-3">
              Functions without an explicit return type return <InlineCode>void</InlineCode>. Multiple returns are handled through structs or tuples.
            </p>
            <CodeBlock>{`fn divide(a: float, b: float) -> Result[float] {
    if b == 0.0 {
        return err("division by zero");
    }
    return ok(a / b);
}`}</CodeBlock>

            <Sub title="First-Class Functions" />
            <p className="text-text-secondary text-sm mb-3">
              Functions can be stored in variables, passed as arguments, and returned from other functions.
            </p>
            <CodeBlock>{`fn apply(f: fn(int) -> int, x: int) -> int {
    return f(x);
}

fn double(n: int) -> int {
    return n * 2;
}

let result = apply(double, 5);  // 10`}</CodeBlock>

            <Sub title="Function Types" />
            <CodeBlock>{`let op: fn(int, int) -> int = add;
let result = op(3, 4);  // 7`}</CodeBlock>

            <Sub title="Methods (Receiver Syntax)" />
            <p className="text-text-secondary text-sm mb-3">
              Methods are functions with a type prefix before the name. The first parameter <InlineCode>self</InlineCode> refers to the instance.
            </p>
            <CodeBlock>{`struct Counter {
    value: int,
}

fn Counter.increment(self) {
    self.value += 1;
}

fn Counter.get(self) -> int {
    return self.value;
}

let mut c = Counter { value: 0 };
c.increment();
print(to_string(c.get()));  // 1`}</CodeBlock>
          </Section>

          {/* ================================================================
              SECTION 7: Strings
              ================================================================ */}
          <Section id="strings" title="Strings">
            <Sub title="String Literals" />
            <CodeBlock>{`let greeting = "Hello, world!";
let multiline = "Line one\nLine two\nLine three";`}</CodeBlock>

            <Sub title="Escape Sequences" />
            <Table
              headers={["Sequence", "Meaning"]}
              rows={[
                ["\n", "Newline"],
                ["\t", "Tab"],
                ["\r", "Carriage return"],
                ["\\", "Backslash"],
                ['\"', "Double quote"],
                ["\0", "Null byte"],
              ]}
            />

            <Sub title="Raw Strings" />
            <p className="text-text-secondary text-sm mb-3">
              Raw strings disable escape sequence processing, useful for regex and file paths.
            </p>
            <CodeBlock>{`let path = r"C:\Users\mathi\Desktop";
let pattern = r"\d+\.\d+";`}</CodeBlock>

            <Sub title="String Interpolation" />
            <CodeBlock>{`let name = "M++";
let version = 1;
print("Welcome to " + name + " v" + to_string(version));`}</CodeBlock>

            <Sub title="String Concatenation" />
            <p className="text-text-secondary text-sm mb-3">
              Use the <InlineCode>+</InlineCode> operator to concatenate strings.
            </p>
            <CodeBlock>{`let full = "Hello" + ", " + "world!";`}</CodeBlock>

            <Sub title="Built-in String Functions" />
            <Table
              headers={["Function", "Description", "Example"]}
              rows={[
                ['len(s)', "Length of string", 'len("abc") → 3'],
                ['substr(s, start, len)', "Substring extraction", 'substr("hello", 1, 3) → "ell"'],
                ['split(s, sep)', "Split into array", 'split("a,b,c", ",") → ["a","b","c"]'],
                ['contains(s, sub)', "Check substring presence", 'contains("hello", "ell") → true'],
                ['trim(s)', "Remove leading/trailing whitespace", 'trim("  hi  ") → "hi"'],
                ['replace(s, old, new)', "Replace occurrences", 'replace("aab", "a", "x") → "xxb"'],
                ['to_upper(s)', "Convert to uppercase", 'to_upper("hi") → "HI"'],
                ['to_lower(s)', "Convert to lowercase", 'to_lower("HI") → "hi"'],
                ['index_of(s, sub)', "Find index of substring (−1 if not found)", 'index_of("abc", "b") → 1'],
                ['join(arr, sep)', "Join array into string", 'join(["a","b"], "-") → "a-b"'],
                ['char_at(s, i)', "Character at index", 'char_at("abc", 0) → "a"'],
                ['char_code(s, i)', "Character code at index", 'char_code("A", 0) → 65'],
                ['int_to_char(n)', "Integer to character", 'int_to_char(65) → "A"'],
              ]}
            />

            <CodeBlock>{`let csv_line = "Alice,30,Engineer";
let fields = split(csv_line, ",");
print(fields[0]);                     // "Alice"
print(to_string(len(csv_line)));      // "18"

let upper = to_upper("hello world");
print(upper);                         // "HELLO WORLD"

let idx = index_of(csv_line, "30");
print(to_string(idx));                // "6"`}</CodeBlock>
          </Section>

          {/* ================================================================
              SECTION 8: Arrays
              ================================================================ */}
          <Section id="arrays" title="Arrays">
            <Sub title="Array Literals" />
            <CodeBlock>{`let numbers = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob"];
let empty: int[] = [];`}</CodeBlock>

            <Sub title="Indexing" />
            <p className="text-text-secondary text-sm mb-3">
              Arrays are zero-indexed. Out-of-bounds access causes a runtime panic.
            </p>
            <CodeBlock>{`let first = numbers[0];  // 1
let last = numbers[4];   // 5`}</CodeBlock>

            <Sub title="Mutation" />
            <CodeBlock>{`let mut items = [10, 20, 30];
items[1] = 25;                // [10, 25, 30]
append(items, 40);            // [10, 25, 30, 40]
let removed = pop(items);     // removed = 40, items = [10, 25, 30]`}</CodeBlock>

            <Sub title="Built-in Array Functions" />
            <Table
              headers={["Function", "Description"]}
              rows={[
                ["len(arr)", "Number of elements"],
                ["append(arr, val)", "Add element to end"],
                ["pop(arr)", "Remove and return last element"],
                ["arr_copy(arr)", "Create a shallow copy"],
              ]}
            />

            <Sub title="Iteration" />
            <CodeBlock>{`let scores = [95, 87, 92, 78, 100];
let mut total = 0;
for score in scores {
    total += score;
}
let avg = total / len(scores);
print("Average: " + to_string(avg));`}</CodeBlock>

            <Note>
              Array bounds are checked at runtime. Accessing an invalid index will panic with a descriptive error message.
            </Note>
          </Section>

          {/* ================================================================
              SECTION 9: Maps
              ================================================================ */}
          <Section id="maps" title="Maps">
            <Sub title="Map Literals" />
            <CodeBlock>{`let ages = { "Alice": 30, "Bob": 25, "Charlie": 35 };
let config: map[string, string] = {};`}</CodeBlock>

            <Sub title="Access & Mutation" />
            <CodeBlock>{`let age = map_get(ages, "Alice");   // 30
map_set(ages, "Diana", 28);          // add entry
map_del(ages, "Bob");                // remove entry`}</CodeBlock>

            <Sub title="Built-in Map Functions" />
            <Table
              headers={["Function", "Description"]}
              rows={[
                ["map_set(m, key, val)", "Set or update a key-value pair"],
                ["map_get(m, key)", "Get value by key"],
                ["map_has(m, key)", "Check if key exists (returns bool)"],
                ["map_del(m, key)", "Delete a key-value pair"],
                ["map_keys(m)", "Return array of all keys"],
              ]}
            />

            <Sub title="Iteration" />
            <CodeBlock>{`let headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123",
    "Accept": "*/*",
};

for key, value in headers {
    print(key + ": " + value);
}

// Check before access
if map_has(headers, "Authorization") {
    let auth = map_get(headers, "Authorization");
    print("Auth: " + auth);
}`}</CodeBlock>
          </Section>

          {/* ================================================================
              SECTION 10: Structs
              ================================================================ */}
          <Section id="structs" title="Structs">
            <Sub title="Definition" />
            <CodeBlock>{`struct Vec2 {
    x: float,
    y: float,
}`}</CodeBlock>

            <Sub title="Initialization & Field Access" />
            <CodeBlock>{`let v = Vec2 { x: 3.0, y: 4.0 };
print(to_string(v.x));  // "3.0"
print(to_string(v.y));  // "4.0"`}</CodeBlock>

            <Sub title="Methods" />
            <p className="text-text-secondary text-sm mb-3">
              Methods use receiver syntax: <InlineCode>fn TypeName.method(self)</InlineCode>.
            </p>
            <CodeBlock>{`fn Vec2.length(self) -> float {
    return sqrt(self.x * self.x + self.y * self.y);
}

fn Vec2.scale(self, factor: float) -> Vec2 {
    return Vec2 { x: self.x * factor, y: self.y * factor };
}

let v = Vec2 { x: 3.0, y: 4.0 };
print(to_string(v.length()));  // "5.0"

let doubled = v.scale(2.0);
print(to_string(doubled.x));  // "6.0"`}</CodeBlock>

            <Sub title="Drop / Destructors" />
            <p className="text-text-secondary text-sm mb-3">
              If a struct defines a <InlineCode>drop</InlineCode> method, it is called automatically when the value goes out of scope.
            </p>
            <CodeBlock>{`struct FileHandle {
    fd: int,
    path: string,
}

fn FileHandle.drop(self) {
    // called automatically when FileHandle goes out of scope
    close_fd(self.fd);
    print("Closed: " + self.path);
}`}</CodeBlock>

            <Note type="tip">
              Use <InlineCode>drop</InlineCode> for RAII-style resource management &mdash; file handles, network connections, locks, etc.
            </Note>
          </Section>

          {/* ================================================================
              SECTION 11: Enums
              ================================================================ */}
          <Section id="enums" title="Enums">
            <Sub title="Simple Enums" />
            <CodeBlock>{`enum Color {
    Red,
    Green,
    Blue,
}

let c = Color.Red;
match c {
    Color.Red => { print("Red!"); },
    Color.Green => { print("Green!"); },
    Color.Blue => { print("Blue!"); },
}`}</CodeBlock>

            <Sub title="Sum Types (Enums with Payloads)" />
            <p className="text-text-secondary text-sm mb-3">
              Enum variants can carry data, making them algebraic sum types.
            </p>
            <CodeBlock>{`enum Shape {
    Circle(float),
    Rect(float, float),
    Point,
}

fn area(s: Shape) -> float {
    match s {
        Shape.Circle(r) => {
            return 3.14159 * r * r;
        },
        Shape.Rect(w, h) => {
            return w * h;
        },
        Shape.Point => {
            return 0.0;
        },
    }
}

let s = Shape.Circle(5.0);
print(to_string(area(s)));  // "78.53975"`}</CodeBlock>

            <Sub title="Destructuring in Match" />
            <CodeBlock>{`enum Message {
    Text(string),
    Binary(ptr, int),
    Disconnect,
}

fn handle(msg: Message) {
    match msg {
        Message.Text(content) => {
            print("Text: " + content);
        },
        Message.Binary(data, size) => {
            print("Binary: " + to_string(size) + " bytes");
        },
        Message.Disconnect => {
            print("Client disconnected");
        },
    }
}`}</CodeBlock>
          </Section>

          {/* ================================================================
              SECTION 12: Traits & Impl
              ================================================================ */}
          <Section id="traits" title="Traits & Impl">
            <Sub title="Trait Definition" />
            <p className="text-text-secondary text-sm mb-3">
              Traits define shared behavior as a set of method signatures.
            </p>
            <CodeBlock>{`trait Drawable {
    fn draw(self);
    fn bounds(self) -> Rect;
}`}</CodeBlock>

            <Sub title="Impl Blocks" />
            <p className="text-text-secondary text-sm mb-3">
              Use <InlineCode>impl</InlineCode> to implement a trait for a type.
            </p>
            <CodeBlock>{`impl Drawable for Circle {
    fn draw(self) {
        draw_circle(self.x, self.y, self.radius);
    }

    fn bounds(self) -> Rect {
        return Rect {
            x: self.x - self.radius,
            y: self.y - self.radius,
            w: self.radius * 2.0,
            h: self.radius * 2.0,
        };
    }
}`}</CodeBlock>

            <Sub title="Trait Bounds" />
            <p className="text-text-secondary text-sm mb-3">
              Constrain generic parameters to types that implement specific traits.
            </p>
            <CodeBlock>{`fn render[T: Drawable](item: T) {
    item.draw();
}

fn render_all[T: Drawable](items: T[]) {
    for item in items {
        item.draw();
    }
}`}</CodeBlock>

            <Sub title="Polymorphism" />
            <CodeBlock>{`trait Serializable {
    fn to_json(self) -> string;
}

impl Serializable for User {
    fn to_json(self) -> string {
        return "{\"name\":\"" + self.name + "\"}";
    }
}

impl Serializable for Config {
    fn to_json(self) -> string {
        return "{\"debug\":" + to_string(self.debug) + "}";
    }
}

fn save[T: Serializable](item: T) {
    let json = item.to_json();
    write_file("out.json", json);
}`}</CodeBlock>
          </Section>

          {/* ================================================================
              SECTION 13: Generics
              ================================================================ */}
          <Section id="generics" title="Generics">
            <Sub title="Generic Functions" />
            <CodeBlock>{`fn identity[T](x: T) -> T {
    return x;
}

let a = identity[int](42);
let b = identity[string]("hello");`}</CodeBlock>

            <Sub title="Generic Structs" />
            <CodeBlock>{`struct Pair[A, B] {
    first: A,
    second: B,
}

let p = Pair[string, int] { first: "age", second: 30 };
print(p.first + ": " + to_string(p.second));`}</CodeBlock>

            <Sub title="Multiple Type Parameters" />
            <CodeBlock>{`fn map_pair[A, B, C](p: Pair[A, B], f: fn(A) -> C) -> Pair[C, B] {
    return Pair[C, B] { first: f(p.first), second: p.second };
}`}</CodeBlock>

            <Sub title="Monomorphization" />
            <p className="text-text-secondary text-sm mb-3">
              M++ monomorphizes generics at compile time &mdash; each concrete type combination generates specialized code. There is no runtime dispatch overhead for generics.
            </p>
            <Note type="tip">
              Monomorphization means <InlineCode>{"identity[int]"}</InlineCode> and <InlineCode>{"identity[string]"}</InlineCode> compile to separate, optimized functions. Zero cost at runtime.
            </Note>
          </Section>

          {/* ================================================================
              SECTION 14: Closures & Lambdas
              ================================================================ */}
          <Section id="closures" title="Closures & Lambdas">
            <Sub title="Lambda Syntax" />
            <CodeBlock>{`let double = |x: int| -> int { return x * 2; };
let add = |a: int, b: int| -> int { return a + b; };

print(to_string(double(5)));   // "10"
print(to_string(add(3, 4)));   // "7"`}</CodeBlock>

            <Sub title="Capturing Variables" />
            <p className="text-text-secondary text-sm mb-3">
              Closures capture variables from their enclosing scope.
            </p>
            <CodeBlock>{`let multiplier = 3;
let scale = |x: int| -> int { return x * multiplier; };
print(to_string(scale(10)));  // "30"`}</CodeBlock>

            <Sub title="Higher-Order Functions" />
            <CodeBlock>{`fn apply_twice(f: fn(int) -> int, x: int) -> int {
    return f(f(x));
}

let inc = |x: int| -> int { return x + 1; };
print(to_string(apply_twice(inc, 5)));  // "7"`}</CodeBlock>

            <Sub title="Function Types" />
            <p className="text-text-secondary text-sm mb-3">
              Lambda types are written as <InlineCode>{"fn(params) -> return_type"}</InlineCode>.
            </p>
            <CodeBlock>{`fn make_adder(n: int) -> fn(int) -> int {
    return |x: int| -> int { return x + n; };
}

let add5 = make_adder(5);
print(to_string(add5(10)));  // "15"`}</CodeBlock>

            <Sub title="Common Patterns" />
            <CodeBlock>{`// Callback pattern
fn on_complete(callback: fn(string)) {
    // ... do work ...
    callback("done");
}

on_complete(|msg: string| {
    print("Status: " + msg);
});`}</CodeBlock>
          </Section>

          {/* ================================================================
              SECTION 15: Error Handling
              ================================================================ */}
          <Section id="error-handling" title="Error Handling">
            <Sub title="Result[T]" />
            <p className="text-text-secondary text-sm mb-3">
              M++ uses <InlineCode>{"Result[T]"}</InlineCode> for fallible operations. Results are either <InlineCode>ok(value)</InlineCode> or <InlineCode>err(message)</InlineCode>.
            </p>
            <CodeBlock>{`fn parse_port(s: string) -> Result[int] {
    let n = to_int(s);
    if n < 0 || n > 65535 {
        return err("port out of range");
    }
    return ok(n);
}`}</CodeBlock>

            <Sub title="Checking Results" />
            <Table
              headers={["Function", "Description"]}
              rows={[
                ["is_ok(r)", "Returns true if result is ok"],
                ["is_err(r)", "Returns true if result is err"],
                ["unwrap(r)", "Extract value, panic on err"],
              ]}
            />
            <CodeBlock>{`let r = parse_port("8080");
if is_ok(r) {
    let port = unwrap(r);
    print("Port: " + to_string(port));
}`}</CodeBlock>

            <Sub title="Match on Result" />
            <CodeBlock>{`match parse_port("8080") {
    ok(port) => { print("Port: " + to_string(port)); },
    err(msg) => { print("Error: " + msg); }
}`}</CodeBlock>

            <Sub title="The ? Operator" />
            <p className="text-text-secondary text-sm mb-3">
              The <InlineCode>?</InlineCode> operator propagates errors to the calling function. If the result is <InlineCode>err</InlineCode>, it returns early with that error.
            </p>
            <CodeBlock>{`fn connect(host: string, port_str: string) -> Result[Connection] {
    let port = parse_port(port_str)?;
    let conn = tcp_connect(host, port)?;
    return ok(conn);
}`}</CodeBlock>

            <Sub title={"Option<T>"} />
            <p className="text-text-secondary text-sm mb-3">
              <InlineCode>{"Option<T>"}</InlineCode> represents a value that may or may not exist. Use <InlineCode>Some(value)</InlineCode> and <InlineCode>None</InlineCode>.
            </p>
            <CodeBlock>{`fn find_user(id: int) -> Option<User> {
    if id == 0 {
        return None;
    }
    return Some(User { id: id, name: "Alice" });
}

match find_user(1) {
    Some(user) => { print("Found: " + user.name); },
    None => { print("User not found"); }
}`}</CodeBlock>

            <Note type="warning">
              Calling <InlineCode>unwrap()</InlineCode> on an <InlineCode>err</InlineCode> result or <InlineCode>None</InlineCode> option will panic. Prefer <InlineCode>match</InlineCode> or the <InlineCode>?</InlineCode> operator for safe handling.
            </Note>
          </Section>

          {/* ================================================================
              SECTION 16: Modules & Imports
              ================================================================ */}
          <Section id="modules" title="Modules & Imports">
            <Sub title="File Imports" />
            <p className="text-text-secondary text-sm mb-3">
              Import other M++ files with <InlineCode>import</InlineCode>. Imports are flat &mdash; all public symbols become available.
            </p>
            <CodeBlock>{`import "math.mpp";
import "utils/helpers.mpp";

fn main() {
    let result = add(1, 2);  // from helpers.mpp
    print(to_string(sqrt(16.0)));  // from math.mpp
}`}</CodeBlock>

            <Sub title="Inline Module Blocks" />
            <CodeBlock>{`mod utils {
    fn clamp(val: int, min: int, max: int) -> int {
        if val < min { return min; }
        if val > max { return max; }
        return val;
    }
}`}</CodeBlock>

            <Sub title="Private Visibility" />
            <p className="text-text-secondary text-sm mb-3">
              Use <InlineCode>priv</InlineCode> to restrict visibility. Private symbols are accessible only within the same module or file.
            </p>
            <CodeBlock>{`priv fn internal_helper() -> int {
    return 42;
}

fn public_api() -> int {
    return internal_helper();  // OK within same file
}`}</CodeBlock>

            <Note>
              By default, all top-level functions and types are public. Use <InlineCode>priv</InlineCode> explicitly to hide implementation details.
            </Note>
          </Section>

          {/* ================================================================
              SECTION 17: C FFI
              ================================================================ */}
          <Section id="ffi" title="C FFI">
            <Sub title="Extern Functions" />
            <p className="text-text-secondary text-sm mb-3">
              Declare C functions with <InlineCode>extern fn</InlineCode>. M++ links them at compile time.
            </p>
            <CodeBlock>{`extern fn MessageBoxA(hwnd: ptr, text: string, caption: string, flags: u32) -> i32;

fn main() {
    MessageBoxA(null, "Hello from M++!", "R2ND", 0u32);
}`}</CodeBlock>

            <Sub title="Type Mapping" />
            <Table
              headers={["C Type", "M++ Type"]}
              rows={[
                ["int / int32_t", "i32"],
                ["long long / int64_t", "i64"],
                ["unsigned char", "u8"],
                ["float", "float"],
                ["char*", "string"],
                ["void*", "ptr"],
                ["NULL", "null"],
              ]}
            />

            <Sub title="Linking" />
            <p className="text-text-secondary text-sm mb-3">
              Specify link flags in <InlineCode>mpp.toml</InlineCode> to link against system or third-party libraries.
            </p>
            <CodeBlock label="mpp.toml">{`name = "win-app"
main = "src/main.mpp"
link = ["-luser32", "-lgdi32", "-lopengl32"]`}</CodeBlock>

            <CodeBlock>{`// Use Win32 API directly
extern fn CreateWindowExA(
    exStyle: u32, className: string, windowName: string,
    style: u32, x: i32, y: i32, w: i32, h: i32,
    parent: ptr, menu: ptr, instance: ptr, param: ptr
) -> ptr;`}</CodeBlock>
          </Section>

          {/* ================================================================
              SECTION 18: Memory Management
              ================================================================ */}
          <Section id="memory" title="Memory Management">
            <Sub title="Manual Allocation" />
            <CodeBlock>{`let buf = alloc(1024);
defer free(buf);

memset(buf, 0, 1024);
// ... use buf ...
// free() called automatically when function exits`}</CodeBlock>

            <Sub title="Memory Functions" />
            <Table
              headers={["Function", "Description"]}
              rows={[
                ["alloc(size)", "Allocate size bytes, returns ptr"],
                ["free(ptr)", "Free previously allocated memory"],
                ["memcpy(dst, src, n)", "Copy n bytes from src to dst"],
                ["memset(ptr, val, n)", "Set n bytes to val"],
              ]}
            />

            <Sub title="Reference Counting" />
            <p className="text-text-secondary text-sm mb-3">
              For shared ownership, M++ provides reference-counted pointers.
            </p>
            <CodeBlock>{`let data = rc_new("shared string");
let copy = rc_clone(data);      // increment ref count

let val = rc_get(data);         // access the value
rc_set(data, "updated");        // update the value

rc_release(copy);               // decrement ref count
rc_release(data);               // ref count hits 0, memory freed`}</CodeBlock>

            <Table
              headers={["Function", "Description"]}
              rows={[
                ["rc_new(val)", "Create reference-counted value"],
                ["rc_clone(rc)", "Clone (increment count)"],
                ["rc_get(rc)", "Read the inner value"],
                ["rc_set(rc, val)", "Update the inner value"],
                ["rc_release(rc)", "Decrement count, free if zero"],
              ]}
            />

            <Sub title="Slices" />
            <p className="text-text-secondary text-sm mb-3">
              Slices are views into contiguous memory, defined by a pointer and length.
            </p>
            <CodeBlock>{`let arr = [10, 20, 30, 40, 50];
let s = arr[1..4];  // slice: [20, 30, 40]

for val in s {
    print(to_string(val));
}`}</CodeBlock>

            <Note type="warning">
              Manual memory management requires discipline. Always pair <InlineCode>alloc</InlineCode> with <InlineCode>free</InlineCode> &mdash; preferably via <InlineCode>defer</InlineCode>. Use reference counting for shared ownership.
            </Note>
          </Section>

          {/* ================================================================
              SECTION 19: Defer
              ================================================================ */}
          <Section id="defer" title="Defer">
            <p className="text-text-secondary text-sm mb-3">
              <InlineCode>defer</InlineCode> schedules a statement to execute when the current scope exits, regardless of how it exits (return, error, etc.). Multiple defers execute in LIFO (last-in, first-out) order.
            </p>

            <Sub title="Basic Usage" />
            <CodeBlock>{`fn process_file(path: string) {
    let f = open(path);
    defer close(f);

    let data = read(f);
    // ... process data ...
    // close(f) runs automatically here
}`}</CodeBlock>

            <Sub title="LIFO Order" />
            <CodeBlock>{`fn example() {
    defer print("first");
    defer print("second");
    defer print("third");
    print("running");
}
// Output:
//   running
//   third
//   second
//   first`}</CodeBlock>

            <Sub title="Cleanup Guarantees" />
            <p className="text-text-secondary text-sm mb-3">
              <InlineCode>defer</InlineCode> is ideal for cleanup tasks: closing files, freeing memory, releasing locks, restoring state.
            </p>
            <CodeBlock>{`fn with_lock(mutex: ptr) {
    lock(mutex);
    defer unlock(mutex);

    // critical section — unlock runs even if we return early
    if !ready() {
        return;  // unlock still runs
    }
    do_work();
    // unlock runs here too
}`}</CodeBlock>

            <Note type="tip">
              Place <InlineCode>defer</InlineCode> immediately after acquiring a resource. This makes the acquire/release pair visually adjacent and hard to forget.
            </Note>
          </Section>

          {/* ================================================================
              SECTION 20: Standard Library
              ================================================================ */}
          <Section id="stdlib" title="Standard Library">
            <p className="text-text-secondary text-sm mb-3">
              M++ ships with a growing standard library. Import modules as needed.
            </p>

            <Table
              headers={["Module", "Description", "Key Functions"]}
              rows={[
                ["strings", "String manipulation utilities", "len, substr, split, contains, trim, replace"],
                ["json", "JSON parsing and serialization", "json_parse, json_stringify, json_get"],
                ["io", "File and stream I/O", "open, read, write, close, read_line"],
                ["math", "Math functions and constants", "sqrt, abs, pow, sin, cos, floor, ceil, PI"],
                ["args", "Command-line argument parsing", "get_args, parse_flags"],
                ["env", "Environment variables", "env_get, env_set, env_has"],
                ["hash", "Hashing utilities", "hash_sha256, hash_md5, hash_crc32"],
                ["csv", "CSV parsing and writing", "csv_parse, csv_write, csv_row"],
                ["datetime", "Date and time", "now, format_time, parse_time, timestamp"],
                ["log", "Structured logging", "log_info, log_warn, log_error, log_debug"],
                ["net", "Networking (TCP/UDP/HTTP)", "tcp_connect, tcp_listen, http_get, http_post"],
                ["path", "File path manipulation", "path_join, path_ext, path_dir, path_base"],
                ["process", "Process management", "exec, spawn, wait, exit"],
                ["thread", "Threading primitives", "spawn_thread, join, sleep"],
                ["sync", "Synchronization", "mutex_new, mutex_lock, mutex_unlock, channel"],
                ["testing", "Test framework", "assert, assert_eq, test, run_tests"],
              ]}
            />

            <Sub title="Example: JSON" />
            <CodeBlock>{`import "json";

let data = json_parse("{\"name\":\"Alice\",\"age\":30}");
let name = json_get(data, "name");
print(name);  // "Alice"

let obj = { "status": "ok", "code": 200 };
let s = json_stringify(obj);
print(s);  // {"status":"ok","code":200}`}</CodeBlock>

            <Sub title="Example: File I/O" />
            <CodeBlock>{`import "io";

let content = read("config.txt");
print(content);

write("output.txt", "Hello from M++!");`}</CodeBlock>

            <Sub title="Example: Testing" />
            <CodeBlock>{`import "testing";

test "addition works" {
    assert_eq(add(2, 3), 5);
    assert_eq(add(-1, 1), 0);
}

test "string length" {
    assert(len("hello") == 5);
}`}</CodeBlock>
          </Section>

          {/* ================================================================
              SECTION 21: Compilation
              ================================================================ */}
          <Section id="compilation" title="Compilation">
            <Sub title="CLI Commands" />
            <Table
              headers={["Command", "Description"]}
              rows={[
                ["mpp build", "Build project from mpp.toml"],
                ["mpp build --run", "Build and run immediately"],
                ["mpp build --release", "Build with optimizations"],
                ["mpp <file>.mpp", "Compile single file"],
                ["mpp test", "Run all tests"],
              ]}
            />

            <Sub title="mpp.toml" />
            <p className="text-text-secondary text-sm mb-3">
              The project manifest configures build settings, dependencies, and linking.
            </p>
            <CodeBlock label="mpp.toml">{`name = "my-project"
version = "1.0.0"
main = "src/main.mpp"
link = ["-luser32", "-lgdi32"]
opt = "2"

[dependencies]
r2nd-ui = "0.4.0"`}</CodeBlock>

            <Table
              headers={["Field", "Description"]}
              rows={[
                ["name", "Project name (used for output binary)"],
                ["version", "Semantic version string"],
                ["main", "Entry point source file"],
                ["link", "Linker flags (array of strings)"],
                ["opt", 'Optimization level: 0, 1, 2, 3, or s'],
                ["[dependencies]", "External package dependencies"],
              ]}
            />

            <Sub title="Compilation Pipeline" />
            <p className="text-text-secondary text-sm mb-3">
              M++ compiles through LLVM for native performance:
            </p>
            <div className="rounded-lg border border-border bg-surface px-4 py-3 mb-4 text-sm text-text-secondary font-mono">
              .mpp source &rarr; M++ frontend (parse + type check) &rarr; LLVM IR &rarr; LLVM optimizer &rarr; native binary
            </div>
            <CodeBlock>{`# Debug build (fast compile, no optimization)
mpp build

# Release build (slower compile, full optimization)
mpp build --release

# View generated LLVM IR
mpp build --emit-ir`}</CodeBlock>

            <Sub title="Cross-Compilation" />
            <p className="text-text-secondary text-sm mb-3">
              Target different platforms via the <InlineCode>--target</InlineCode> flag:
            </p>
            <CodeBlock>{`mpp build --target x86_64-linux
mpp build --target aarch64-linux
mpp build --target x86_64-windows`}</CodeBlock>
          </Section>

        </div>
      </div>
    </div>
  );
}
