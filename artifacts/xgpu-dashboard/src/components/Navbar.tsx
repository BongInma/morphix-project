import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"renter" | "provider">("renter");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
  const API = `${BASE}/api`;

  const submitLead = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const endpoint = role === "renter" ? `${API}/leads/renter` : `${API}/leads/provider`;
      const payload =
        role === "renter"
          ? { email, fullName: "Alpha Interest", message: "Submitted via Sign In modal — Private Alpha Access Request" }
          : { email, contactName: "Alpha Interest", message: "Submitted via Sign In modal — Private Alpha Access Request" };
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (r.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
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
              { label: "OmniDiff Network", href: "/omnidiff" },
              { label: "Enterprise Providers", href: "#eoi" },
              { label: "Corporate Governance", href: "#corporate-governance-section" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-text-primary hover:underline hover:decoration-electric hover:underline-offset-4"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setModalOpen(true);
                setStatus("idle");
                setEmail("");
              }}
              className="hidden rounded border border-surface-border px-4 py-2 font-[family-name:var(--font-inter)] text-sm font-medium text-text-muted transition-colors hover:text-text-primary sm:block"
            >
              Sign In
            </button>
            <a
              href="/omnidiff"
              className="hidden rounded bg-electric px-4 py-2 font-[family-name:var(--font-inter)] text-sm font-semibold text-obsidian transition-colors hover:bg-electric/90 sm:block"
            >
              Request Access
            </a>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col items-center justify-center gap-1.5 rounded p-2 sm:hidden"
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-6 rounded bg-text-muted transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 rounded bg-text-muted transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 rounded bg-text-muted transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-surface-border bg-obsidian/95 backdrop-blur-md px-4 py-4 sm:hidden">
            {[
              { label: "OmniDiff Network", href: "/omnidiff" },
              { label: "Enterprise Providers", href: "#eoi" },
              { label: "Corporate Governance", href: "#corporate-governance-section" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 font-[family-name:var(--font-inter)] text-sm font-medium uppercase tracking-[0.12em] text-text-muted transition-colors hover:text-text-primary"
              >
                {label}
              </a>
            ))}
            <div className="mt-4 flex gap-3 border-t border-surface-border pt-4">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setModalOpen(true);
                  setStatus("idle");
                  setEmail("");
                }}
                className="flex-1 rounded border border-surface-border px-4 py-2 font-[family-name:var(--font-inter)] text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
              >
                Sign In
              </button>
              <a
                href="/omnidiff"
                className="flex-1 rounded bg-electric px-4 py-2 text-center font-[family-name:var(--font-inter)] text-sm font-semibold text-obsidian transition-colors hover:bg-electric/90"
              >
                Request Access
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Alpha Access Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={() => setModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
          <div
            className="relative z-10 w-full max-w-md rounded-2xl border border-surface-border bg-surface p-8 shadow-[0_0_80px_rgba(0,0,0,0.65)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-surface-border text-text-muted transition-colors hover:text-white hover:border-electric"
            >
              &#10005;
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="inline-block rounded border border-electric/30 bg-electric/5 px-2 py-1 font-[family-name:var(--font-dmmono)] text-xs text-electric">
                [PRIVATE ALPHA]
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary">
                Sign In Closed
              </h2>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-text-muted leading-relaxed">
                Public access is restricted during our private alpha phase. Enter your email below to request an invitation for early access.
              </p>
            </div>

            {/* Role selector */}
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setRole("renter")}
                className={`flex-1 rounded-md border px-3 py-2 font-[family-name:var(--font-dmmono)] text-xs uppercase tracking-wider transition-colors ${
                  role === "renter"
                    ? "border-electric bg-electric/10 text-electric"
                    : "border-surface-border text-text-muted hover:text-text-primary"
                }`}
              >
                Renter
              </button>
              <button
                onClick={() => setRole("provider")}
                className={`flex-1 rounded-md border px-3 py-2 font-[family-name:var(--font-dmmono)] text-xs uppercase tracking-wider transition-colors ${
                  role === "provider"
                    ? "border-emerald bg-emerald/10 text-emerald"
                    : "border-surface-border text-text-muted hover:text-text-primary"
                }`}
              >
                Provider
              </button>
            </div>

            {/* Email input */}
            <div className="mb-4">
              <label className="mb-1.5 block font-[family-name:var(--font-dmmono)] text-xs uppercase tracking-wider text-text-muted">
                Corporate Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                onKeyDown={(e) => e.key === "Enter" && submitLead()}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-surface-border bg-obsidian px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-white placeholder-text-muted/50 focus:border-electric focus:outline-none transition-colors"
              />
              {status === "error" && (
                <p className="mt-1.5 font-[family-name:var(--font-dmmono)] text-xs text-red-400">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={submitLead}
              disabled={status === "submitting" || status === "success"}
              className="w-full rounded-md bg-electric py-3 font-[family-name:var(--font-inter)] font-semibold text-obsidian transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting"
                ? "Submitting..."
                : status === "success"
                ? "Request Received"
                : "Request Alpha Access"}
            </button>

            {status === "success" && (
              <p className="mt-3 text-center font-[family-name:var(--font-dmmono)] text-xs text-emerald">
                Your invitation request has been recorded. We will reach out shortly.
              </p>
            )}

            <p className="mt-4 text-center font-[family-name:var(--font-dmmono)] text-[10px] text-text-muted/60">
              All requests are subject to verification and capacity limits.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
