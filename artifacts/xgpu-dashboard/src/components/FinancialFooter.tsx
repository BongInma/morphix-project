import { useState } from "react";

export default function FinancialFooter() {
  const metrics = [
    {
      number: "33%+",
      color: "text-electric",
      label: "Enterprise Workstation Idle Rate (Minimum)",
    },
    {
      number: "$48B",
      color: "text-emerald",
      label: "Estimated APAC Cloud Infrastructure Market (2025)",
    },
    {
      number: "65\u201380%",
      color: "text-amber",
      label: "Client Cost Reduction vs. Hyperscaler Baseline",
    },
    {
      number: "<50ms",
      color: "text-primary",
      label: "Guaranteed SLA for Workload Eviction / Priority Return",
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
  const API = `${BASE}/api`;

  const openModal = (title: string) => {
    setModalTitle(title);
    setModalOpen(true);
    setStatus("idle");
    setFullName("");
    setOrganization("");
    setEmail("");
    setMessage("");
  };

  const submitInquiry = async () => {
    if (!fullName || !email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const payload = {
        fullName,
        email,
        company: organization,
        message: `[${modalTitle}] ${message}`,
      };
      const r = await fetch(`${API}/leads/renter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (r.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const footerLinks = [
    {
      header: "OMNIDIFF NETWORK",
      links: [
        { label: "Network Status", href: "/omnidiff#network-ledger", onClick: undefined as (() => void) | undefined },
        { label: "GPU Renter Portal", href: "#", onClick: undefined },
        { label: "Provider Onboarding", href: "#", onClick: undefined },
        { label: "Pricing & SLA", href: "#", onClick: undefined },
      ],
    },
    {
      header: "MORPHIX SYSTEMS",
      links: [
        { label: "About & Leadership", href: "#", onClick: undefined },
        { label: "Investor Relations", href: "#", onClick: () => openModal("Institutional Investment Inquiry") },
        { label: "Corporate Governance", href: "#corporate-governance-section", onClick: undefined },
        { label: "Contact", href: "#", onClick: () => openModal("General Corporate Inquiry") },
      ],
    },
    {
      header: "LEGAL",
      links: [
        { label: "Privacy Policy", href: "#", onClick: undefined },
        { label: "Terms of Service", href: "#", onClick: undefined },
        { label: "SEC Filing Records", href: "#", onClick: undefined },
        { label: "Data Residency Framework", href: "#", onClick: undefined },
      ],
    },
  ];

  return (
    <>
      <footer>
        {/* MARKET METRICS BANNER */}
        <section className="border-t border-surface-border bg-obsidian py-20 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="font-[family-name:var(--font-dmmono)] text-xs font-medium uppercase tracking-[0.2em] text-electric">
              MARKET OPPORTUNITY
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold text-text-primary md:text-4xl">
              Disrupting a $48B APAC Cloud Market Distortion.
            </h2>
            <p className="mt-4 max-w-2xl font-[family-name:var(--font-inter)] text-sm text-text-muted">
              Regional enterprise workstations sit idle for an estimated 60\u201370% of every 24-hour cycle. OmniDiff&apos;s zero-CapEx orchestration model converts stranded compute capacity into institutional-grade cloud infrastructure \u2014 at a fraction of hyperscaler cost.
            </p>

            {/* Metric cards */}
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-surface-border bg-surface p-6 text-center"
                >
                  <span className={`font-[family-name:var(--font-syne)] text-4xl font-bold ${m.color}`}>
                    {m.number}
                  </span>
                  <p className="mt-2 font-[family-name:var(--font-dmmono)] text-xs text-text-muted">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div className="border-t border-surface-border bg-surface pt-16 pb-10 px-6">
          <div className="mx-auto max-w-6xl grid grid-cols-1 gap-10 md:grid-cols-4">
            {/* Column 1 \u2014 Brand */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-syne)] text-xl font-bold text-text-primary">
                  MORPHIX
                </span>
                <span className="font-[family-name:var(--font-dmmono)] text-xs text-text-muted">
                  SYSTEMS INC.
                </span>
              </div>
              <p className="mt-1 font-[family-name:var(--font-dmmono)] text-xs text-electric">
                OmniDiff Network
              </p>
              <p className="mt-3 font-[family-name:var(--font-inter)] text-xs text-text-muted">
                Zero-CapEx. Sovereign. Institutional.
              </p>
            </div>

            {/* Columns 2\u20134 \u2014 Links */}
            {footerLinks.map((col) => (
              <div key={col.header}>
                <p className="font-[family-name:var(--font-syne)] text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
                  {col.header}
                </p>
                <ul className="mt-4 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.onClick ? (
                        <button
                          onClick={link.onClick}
                          className="font-[family-name:var(--font-inter)] text-sm text-text-muted transition-colors hover:text-[#00beff] text-left"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className={`font-[family-name:var(--font-inter)] text-sm transition-colors hover:text-[#00beff] ${
                            link.label === "Corporate Governance" ? "text-[#00beff]" : "text-text-muted"
                          }`}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mx-auto mt-12 max-w-6xl border-t border-surface-border pt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="font-[family-name:var(--font-dmmono)] text-xs text-text-muted">
              \u00a9 2025 Morphix Systems Inc. All Rights Reserved. SEC-Registered Corporation, Philippines.
            </p>
            <div className="flex items-center gap-4 font-[family-name:var(--font-dmmono)] text-xs text-text-muted">
              <span>OmniDiff\u2122 is a trademark of Morphix Systems Inc.</span>
              <span className="hidden md:inline">|</span>
              <span>IPOPHL Provisional Patent Pending</span>
              <span className="hidden md:inline">|</span>
              <span>PDPA Compliant</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={() => setModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
          <div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-surface-border bg-surface p-8 shadow-[0_0_80px_rgba(0,0,0,0.65)]"
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
                [CORPORATE INQUIRY]
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary">
                {modalTitle}
              </h2>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-text-muted leading-relaxed">
                Submit your details and our institutional relations team will respond within 24 business hours.
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block font-[family-name:var(--font-dmmono)] text-xs uppercase tracking-wider text-text-muted">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-surface-border bg-obsidian px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-white placeholder-text-muted/50 focus:border-electric focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-[family-name:var(--font-dmmono)] text-xs uppercase tracking-wider text-text-muted">
                  Organization
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Organization / Company"
                  className="w-full rounded-lg border border-surface-border bg-obsidian px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-white placeholder-text-muted/50 focus:border-electric focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-[family-name:var(--font-dmmono)] text-xs uppercase tracking-wider text-text-muted">
                  Professional Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-surface-border bg-obsidian px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-white placeholder-text-muted/50 focus:border-electric focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-[family-name:var(--font-dmmono)] text-xs uppercase tracking-wider text-text-muted">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry..."
                  rows={4}
                  className="w-full rounded-lg border border-surface-border bg-obsidian px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-white placeholder-text-muted/50 focus:border-electric focus:outline-none transition-colors resize-none"
                />
              </div>
              {status === "error" && (
                <p className="font-[family-name:var(--font-dmmono)] text-xs text-red-400">
                  Please provide a valid name and email address.
                </p>
              )}
              <button
                onClick={submitInquiry}
                disabled={status === "submitting" || status === "success"}
                className="w-full rounded-md bg-electric py-3 font-[family-name:var(--font-inter)] font-semibold text-obsidian transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting"
                  ? "Submitting..."
                  : status === "success"
                  ? "Inquiry Sent"
                  : "Submit Inquiry"}
              </button>
              {status === "success" && (
                <p className="text-center font-[family-name:var(--font-dmmono)] text-xs text-emerald">
                  Your inquiry has been received. Our team will contact you shortly.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
