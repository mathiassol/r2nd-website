import Link from "next/link";

const footerLinks = {
  Projects: [
    { label: "M++ Language", href: "/projects/mpp" },
    { label: "R2ND UI", href: "/projects/ui" },
    { label: "R2ND Renderer", href: "/projects/renderer" },
    { label: "R2ND Desktop", href: "/projects/desktop" },
    { label: "R2ND Networking", href: "/projects/networking" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Philosophy", href: "/philosophy" },
    { label: "Download", href: "/download" },
  ],
  Community: [
    { label: "GitHub", href: "https://github.com/R2ND" },
    { label: "Contributing", href: "/docs" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center font-mono font-bold text-sm">
                R2
              </div>
              <span className="font-semibold text-lg tracking-tight">
                R2ND
              </span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-xs">
              Road to No Dependencies. An open ecosystem rebuilding the stack
              from scratch.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-text-primary mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-secondary hover:text-accent transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            R2ND &mdash; 100% open source. 100% free forever.
          </p>
          <p className="text-xs text-text-muted font-mono">
            Built from scratch. No dependencies.
          </p>
        </div>
      </div>
    </footer>
  );
}
