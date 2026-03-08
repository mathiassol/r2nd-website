"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const layers = [
  {
    name: "M++ Language",
    description: "Core compiled language powering everything in the ecosystem",
    color: "border-border bg-surface text-text-primary",
    href: "/projects/mpp",
    level: 0,
  },
  {
    name: "Core Libraries",
    description: "Standard library, data structures, algorithms, I/O",
    color: "border-border bg-surface text-text-primary",
    href: "/projects/tools",
    level: 1,
  },
  {
    name: "R2ND UI Engine",
    description: "Hardware-accelerated UI rendering and layout system",
    color: "border-border bg-surface text-text-primary",
    href: "/projects/ui",
    level: 2,
  },
  {
    name: "3D Renderer",
    description: "Custom graphics pipeline for 3D rendering",
    color: "border-border bg-surface text-text-primary",
    href: "/projects/renderer",
    level: 2,
  },
  {
    name: "Networking",
    description: "TCP/UDP, HTTP, WebSocket — the full stack",
    color: "border-border bg-surface text-text-primary",
    href: "/projects/networking",
    level: 2,
  },
  {
    name: "R2ND Desktop",
    description: "Window manager, compositor, shell, and native apps",
    color: "border-border bg-surface text-text-primary",
    href: "/projects/desktop",
    level: 3,
  },
  {
    name: "Applications",
    description: "File manager, terminal, editor, system tools, and more",
    color: "border-border bg-surface text-text-primary",
    href: "/projects/tools",
    level: 4,
  },
];

const connections = [
  { from: "M++ Language", to: "Core Libraries" },
  { from: "Core Libraries", to: "R2ND UI Engine" },
  { from: "Core Libraries", to: "3D Renderer" },
  { from: "Core Libraries", to: "Networking" },
  { from: "R2ND UI Engine", to: "R2ND Desktop" },
  { from: "3D Renderer", to: "R2ND Desktop" },
  { from: "Networking", to: "R2ND Desktop" },
  { from: "R2ND Desktop", to: "Applications" },
];

export default function EcosystemPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-mono text-accent tracking-wider uppercase font-medium">
            Ecosystem
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            How it all connects
          </h1>
          <p className="mt-6 text-text-secondary text-lg leading-relaxed">
            Every component in the R2ND ecosystem is built from scratch and
            designed to work seamlessly together. From the language to the
            desktop environment, each layer builds on the one below.
          </p>
        </motion.div>

        {/* Interactive Ecosystem Map */}
        <div className="mb-20">
          {/* Layer 0: Language */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href={layers[0].href} className="group block w-full max-w-md">
              <div className={`rounded-xl border ${layers[0].color} p-5 text-center transition-all hover:scale-[1.02] hover:border-accent/30 hover:shadow-sm`}>
                <div className="font-semibold text-lg">{layers[0].name}</div>
                <div className="text-sm opacity-70 mt-1">{layers[0].description}</div>
              </div>
            </Link>
          </motion.div>

          {/* Connector */}
          <div className="flex justify-center mb-6">
            <div className="w-px h-8 bg-border" />
          </div>

          {/* Layer 1: Core Libraries */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href={layers[1].href} className="group block w-full max-w-md">
              <div className={`rounded-xl border ${layers[1].color} p-5 text-center transition-all hover:scale-[1.02] hover:border-accent/30 hover:shadow-sm`}>
                <div className="font-semibold text-lg">{layers[1].name}</div>
                <div className="text-sm opacity-70 mt-1">{layers[1].description}</div>
              </div>
            </Link>
          </motion.div>

          {/* Branching connectors */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-2xl h-8">
              <div className="absolute left-1/2 top-0 w-px h-4 bg-border" />
              <div className="absolute left-[16.67%] right-[16.67%] top-4 h-px bg-border" />
              <div className="absolute left-[16.67%] top-4 w-px h-4 bg-border" />
              <div className="absolute left-1/2 top-4 w-px h-4 bg-border" />
              <div className="absolute right-[16.67%] top-4 w-px h-4 bg-border" />
            </div>
          </div>

          {/* Layer 2: Renderers + Networking */}
          <motion.div
            className="grid grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {layers.filter((l) => l.level === 2).map((layer) => (
              <Link key={layer.name} href={layer.href} className="group block">
                <div className={`rounded-xl border ${layer.color} p-4 text-center transition-all hover:scale-[1.02] h-full`}>
                  <div className="font-semibold text-sm">{layer.name}</div>
                  <div className="text-xs opacity-70 mt-1 hidden sm:block">{layer.description}</div>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Merging connectors */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-2xl h-8">
              <div className="absolute left-[16.67%] top-0 w-px h-4 bg-border" />
              <div className="absolute left-1/2 top-0 w-px h-4 bg-border" />
              <div className="absolute right-[16.67%] top-0 w-px h-4 bg-border" />
              <div className="absolute left-[16.67%] right-[16.67%] top-4 h-px bg-border" />
              <div className="absolute left-1/2 top-4 w-px h-4 bg-border" />
            </div>
          </div>

          {/* Layer 3: Desktop */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href={layers[5].href} className="group block w-full max-w-md">
              <div className={`rounded-xl border ${layers[5].color} p-5 text-center transition-all hover:scale-[1.02] hover:border-accent/30 hover:shadow-sm`}>
                <div className="font-semibold text-lg">{layers[5].name}</div>
                <div className="text-sm opacity-70 mt-1">{layers[5].description}</div>
              </div>
            </Link>
          </motion.div>

          {/* Connector */}
          <div className="flex justify-center mb-6">
            <div className="w-px h-8 bg-border" />
          </div>

          {/* Layer 4: Applications */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href={layers[6].href} className="group block w-full max-w-md">
              <div className={`rounded-xl border ${layers[6].color} p-5 text-center transition-all hover:scale-[1.02] hover:border-accent/30 hover:shadow-sm`}>
                <div className="font-semibold text-lg">{layers[6].name}</div>
                <div className="text-sm opacity-70 mt-1">{layers[6].description}</div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Key principle */}
        <motion.div
          className="rounded-2xl border border-border bg-surface p-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">The Principle</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Every layer knows about the layers below it. Nothing depends on
            external code. The entire stack is auditable, replaceable, and
            maintainable by a single team or community.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
