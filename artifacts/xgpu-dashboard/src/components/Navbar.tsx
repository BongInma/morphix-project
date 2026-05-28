import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-surface-border transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-obsidian/90" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-syne)] text-xl font-bold text-white">
            MORPHIX
          </span>
          <span className="font-[family-name:var(--font-dmmono)] text-[10px] text-text-muted">
            SYSTEMS INC.
          </span>
          <span className="mx-2 h-4 w-px bg-surface-border" />
          <span className="font-[family-name:var(--font-syne)] text-sm font-bold text-electric">
            OmniDiff
          </span>
        </div>

        {/* Center Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {[
            "OmniDiff Network",
            "Enterprise Providers",
            "Corporate Governance",
          ].map((label) => (
            <a
              key={label}
              href="#"
              className="font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-text-primary hover:underline hover:decoration-electric hover:underline-offset-4"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          <button className="rounded border border-surface-border px-4 py-2 font-[family-name:var(--font-inter)] text-sm font-medium text-text-muted transition-colors hover:text-text-primary">
            Sign In
          </button>
          <button className="rounded bg-electric px-4 py-2 font-[family-name:var(--font-inter)] text-sm font-semibold text-obsidian transition-colors hover:bg-electric/90">
            Request Access
          </button>
        </div>
      </div>
    </nav>
  );
}
