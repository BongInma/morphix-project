import { useState } from "react";
import LegalModal from "./LegalModal";

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

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "email_exists">("idle");

  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState("privacy");

  const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
  const API = `${BASE}/api`;

  const openContactModal = (title: string) => {
    setModalTitle(title);
    setContactModalOpen(true);
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
        full_name: fullName,
        professional_email: email,
        company_name: organization,
        inquiry_type: modalTitle.includes("Investor") ? "Investor" : "General",
      };
      const r = await fetch(`${API}/waitlist/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (r.ok) {
        setStatus("success");
      } else if (r.status === 409) {
        setStatus("email_exists");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const openLegalModal = (tab: string) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const footerLinks = [
    {
      header: "OMNIDIFF NETWORK",
      links: [
        { label: "Network Status", href: "/omnidiff#network-ledger", onClick: undefined as (() => void) | undefined },
        { label: "GPU Renter Portal", href: "#", onClick: undefined },
        { label: "Provider Onboarding", href: "#", onClick: undefined },
        { label: "Pricing & SLA", href: "#", onClick: () => openLegalModal("pricing") },
      ],
    },
    {
      header: "MORPHIX SYSTEMS",
      links: [
        { label: "About & Leadership", href: "#", onClick: () => openLegalModal("leadership") },
        { label: "Investor Relations", href: "#", onClick: () => openContactModal("Institutional Investment Inquiry") },
        { label: "Corporate Governance", href: "#corporate-governance-section", onClick: undefined },
        { label: "Contact", href: "#", onClick: () => openContactModal("General Corporate Inquiry") },
      ],
    },
    {
      header: "LEGAL",
      links: [
        { label: "Privacy Policy", href: "#", onClick: () => openLegalModal("privacy") },
        { label: "Terms of Service", href: "#", onClick: () => openLegalModal("terms") },
        { label: "SEC Filing Records", href: "#", onClick: () => openLegalModal("sec") },
        { label: "Data Residency Framework", href: "#", onClick: () => openLegalModal("residency") },
      ],
    },
  ];

  return (
    <>
      <footer>
        {/* MARKET METRICS BANNER */}
        <section className="border-t border-surface-border bg-obsidian py-12 px-4 sm:py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="font-[family-name:var(--font-dmmono)] text-xs font-medium uppercase tracking-[0.2em] text-electric">
              MARKET OPPORTUNITY
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
              Disrupting the $48 Billion APAC Market Inefficiency.
            </h2>
            <p className="mt-4 max-w-2xl font-[family-name:var(--font-inter)] text-sm text-text-muted">
              Regional enterprise workstations sit idle for a minimum of 33%+ of every 24-hour cycle. OmniDiff&apos;s zero-CapEx orchestration model converts this stranded compute capacity into institutional-grade cloud infrastructure&mdash;delivering a 65% to 80% cost reduction against legacy hyperscaler baselines.
            </p>

            {/* Metric cards */}
            <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-surface-border bg-surface p-4 sm:p-6 text-center"
                >
                  <span className={`font-[family-name:var(--font-syne)] text-2xl sm:text-4xl font-bold ${m.color}`}>
                    {m.number}
                  </span>
                  <p className="mt-2 font-[family-name:var(--font-dmmono)] text-[10px] sm:text-xs text-text-muted">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div className="border-t border-surface-border bg-surface pt-12 pb-8 px-4 sm:pt-16 sm:pb-10 sm:px-6">
          <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-4">
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
                          className="font-[family-name:var(--font-inter)] text-sm text-text-muted transition-colors hover:text-[#00beff] text-left cursor-pointer"
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

        </div>
      </footer>

      {/* INTEGRATED COMPLIANCE SUB-FOOTER */}
      <div className="mt-8 pt-6 border-t border-gray-900 max-w-7xl mx-auto px-4 font-[family-name:var(--font-dmmono)]">

        {/* ROW 1: BRANDING & PATENT METRICS (TIGHT SINGLE LINE) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] text-text-muted tracking-wide pb-4">
          <div>
            &copy; 2026 Morphix Systems Inc. All Rights Reserved. SEC-Registered Corporation, Philippines.
          </div>
          <div>
            OmniDiff&trade; is a trademark of Morphix Systems Inc.
          </div>
          <div className="flex items-center space-x-3">
            <span>IPOPHL Provisional Patent Pending</span>
            <span className="text-surface-border">|</span>
            <span>PDPA Compliant</span>
          </div>
        </div>

        {/* ROW 2: INTEGRATED REGULATORY DISCLAIMER (NO EXTRA GAP) */}
        <div className="pt-3 border-t border-surface-border text-[10px] text-text-muted leading-relaxed text-justify font-[family-name:var(--font-inter)] space-y-1.5">
          <p>
            <span className="font-semibold text-text-mono">Disclaimer:</span> All pre-launch incentives, including early renter lifetime discounts and premium hardware provider revenue share allocations described herein, represent promotional expressions of interest frameworks only. Final terms, priority routing metrics, and yield percentages are strictly subject to execution of definitive corporate platform contracts, service level agreements (SLAs), and verified hardware enrollment compliance parameters. Void where prohibited.
          </p>
          <p>
            All expressions of interest (EOIs) collected via invitation requests are non-binding. Morphix Systems Inc. reserves the right to modify network onboarding thresholds, hardware compatibility mandates, and geofencing routing protocols in accordance with regional compliance updates and localized data infrastructure statutes.
          </p>
        </div>

      </div>

      {/* Contact Modal */}
      {contactModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={() => setContactModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
          <div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-surface-border bg-surface p-8 shadow-[0_0_80px_rgba(0,0,0,0.65)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setContactModalOpen(false)}
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
              {status === "email_exists" && (
                <p className="font-[family-name:var(--font-dmmono)] text-xs text-amber-400">
                  This professional email is already registered on our early-access waitlist.
                </p>
              )}
              <button
                onClick={submitInquiry}
                disabled={status === "submitting" || status === "success" || status === "email_exists"}
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

      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
      />
    </>
  );
}
