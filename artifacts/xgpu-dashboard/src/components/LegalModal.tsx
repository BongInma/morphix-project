// LegalModal.tsx — Morphix Systems Inc.
// Triggered by: FinancialFooter.tsx LEGAL column links
// Tabs: privacy | terms | sec | residency
// No router dependency — pure state-driven overlay

import { useEffect, useState } from "react";

interface LegalModalProps {
  isOpen: boolean;
  initialTab: string;
  onClose: () => void;
}

const TABS = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Service" },
  { id: "sec", label: "SEC Filing Records" },
  { id: "residency", label: "Data Residency" },
] as const;

const TAB_CONTENT: Record<string, {
  label: string;
  heading: string;
  body: string;
  tags: string[];
  cta?: { text: string; href: string };
}> = {
  privacy: {
    label: "DATA PROTECTION",
    heading: "Zero-Trust Data Privacy Architecture",
    body: "OmniDiff operates under a rigorous Zero-Trust isolation protocol. Client data, model weights, and prompt processing streams are handled strictly within hardware-encrypted Trusted Execution Environments (TEEs) using NVIDIA Confidential Computing. Neither Morphix Systems Inc., host BPO infrastructure operators, nor unauthorized external telemetry layers can intercept, view, or log any processing memory registers. Your computational IP remains entirely air-gapped from all external observation vectors.",
    tags: ["NVIDIA CC ENFORCED", "AMD SEV-SNP", "ZERO TELEMETRY LOGGING", "AES-256 AT REST", "PDPA R.A. 10173 ALIGNED"],
  },
  terms: {
    label: "SERVICE LEVEL AGREEMENT",
    heading: "Decentralized Compute SLA",
    body: "All computational leasing on the OmniDiff network is bound by our Sub-50ms Priority Return Eviction SLA. The platform guarantees that renting workloads are instantly evicted from host workstations the exact millisecond a local enterprise BPO operator activates any peripheral input device — mouse or keyboard — ensuring zero operational friction for primary business processes. Marketplace transaction fees, automated billing distributions, and off-peak scheduling windows are strictly governed by the terms of the executed provider or renter agreement.",
    tags: ["<50ms P99 SLA", "PERIPHERAL TELEMETRY ENFORCED", "OFF-PEAK WINDOW: 8HR", "SMART CONTRACT BILLING"],
  },
  sec: {
    label: "CORPORATE REGISTRATION",
    heading: "Corporate Registration & Transparency",
    body: "OmniDiff is a proprietary infrastructure ecosystem developed, legally owned, and operated under the corporate framework of Morphix Systems Inc., an SEC-registered entity domiciled in Quezon City, Philippines. All financial operational tracking, bilateral netting infrastructure models, and corporate registries are maintained transparently for institutional risk compliance under SEC oversight. True copies of active SEC compliance records are available upon request to verified venture capital partners via our secure Investor Relations channel. Early investment rounds are structured under SRC Section 10.1(k) private placement exemptions.",
    tags: ["SEC-REGISTERED PH", "SRC SECTION 10.1(k)", "QC DOMICILE", "VC DATA ROOM AVAILABLE"],
    cta: {
      text: "Request investor records → compliance@morphixsystems.com",
      href: "mailto:compliance@morphixsystems.com?subject=SEC%20Records%20Request",
    },
  },
  residency: {
    label: "SOVEREIGNTY & GEOFENCING",
    heading: "Sovereign Geofencing & APAC Compliance",
    body: "To resolve critical data sovereignty barriers across the Asia-Pacific corridor, OmniDiff enforces hardware-level geographical geofencing at the orchestration layer. Compute tasks are cryptographically tagged with their geographic assignment at ingestion and are strictly routed to verified provider nodes residing within your specified national jurisdiction.\n\nThis architecture directly satisfies the stringent cross-border data transfer and accountability mandates of the Philippine Data Privacy Act of 2012 (RA 10173), NPC statutory frameworks, and regional APAC privacy protocols. By ensuring data workloads never exit localized boundaries, public sector entities and regulated financial institutions can leverage optimized edge computing in full alignment with BSP outsourcing guidelines without regulatory exposure.",
    tags: ["APAC COMPLIANT", "PH-DPA ALIGNED", "ZERO CROSS-BORDER EGRESS", "HARDWARE GEOFENCING", "PUBLIC SECTOR READY"],
  },
};

export default function LegalModal({ isOpen, initialTab, onClose }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKey);
      return () => {
        window.removeEventListener("keydown", handleKey);
      };
    }
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = TAB_CONTENT[activeTab];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-surface border border-surface-border rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-obsidian flex-shrink-0">
          <div className="flex items-center">
            <span className="font-[family-name:var(--font-dmmono)] text-xs text-electric border border-electric/30 bg-electric/5 rounded px-2 py-1">
              [LEGAL]
            </span>
            <span className="ml-3 font-[family-name:var(--font-syne)] font-semibold text-sm text-text-primary">
              Legal & Compliance Documentation
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-surface-border rounded-md text-text-muted hover:text-text-primary hover:border-electric transition text-sm font-[family-name:var(--font-dmmono)]"
          >
            &#10005;
          </button>
        </div>

        {/* Mobile Tab Bar */}
        <div className="flex md:hidden overflow-x-auto border-b border-surface-border bg-obsidian px-4 py-2 gap-2 flex-shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-[family-name:var(--font-dmmono)] text-xs px-3 py-2 rounded-md whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-electric/10 text-electric border border-electric/20"
                  : "text-text-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="hidden md:flex w-48 flex-shrink-0 border-r border-surface-border bg-obsidian py-4 flex-col gap-1 px-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-3 rounded-md text-xs font-[family-name:var(--font-dmmono)] uppercase tracking-wider transition-all duration-150 ${
                  activeTab === tab.id
                    ? "bg-electric/10 text-electric border border-electric/20"
                    : "text-text-muted hover:text-text-primary hover:bg-surface"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="mt-auto border-t border-surface-border pt-4 px-3 pb-2">
              <p className="font-[family-name:var(--font-dmmono)] text-xs text-text-muted leading-relaxed">
                Morphix Systems Inc.<br />SEC-Registered Entity<br />Quezon City, PH
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 bg-surface">
            {content && (
              <div>
                <p className="font-[family-name:var(--font-dmmono)] text-xs uppercase tracking-widest text-electric mb-4">
                  {content.label}
                </p>
                <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary mb-6">
                  {content.heading}
                </h2>
                <div className="font-[family-name:var(--font-inter)] text-sm text-text-muted leading-relaxed max-w-prose space-y-4">
                  {content.body.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <div className="border-t border-surface-border my-8" />
                <div className="flex items-center gap-3 flex-wrap">
                  {content.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-[family-name:var(--font-dmmono)] text-xs border border-surface-border rounded-full px-3 py-1 text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {content.cta && (
                  <a
                    href={content.cta.href}
                    className="block mt-4 font-[family-name:var(--font-inter)] text-xs text-electric hover:underline"
                  >
                    {content.cta.text}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
