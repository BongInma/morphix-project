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

  const footerLinks = [
    {
      header: "OMNIDIFF NETWORK",
      links: [
        { label: "Network Status", href: "#" },
        { label: "GPU Renter Portal", href: "#" },
        { label: "Provider Onboarding", href: "#" },
        { label: "Pricing & SLA", href: "#" },
      ],
    },
    {
      header: "MORPHIX SYSTEMS",
      links: [
        { label: "About & Leadership", href: "#" },
        { label: "Investor Relations", href: "mailto:admin@omnidiff.it.com?subject=OmniDiff Investor Relations Inquiry" },
        { label: "Corporate Governance", href: "#" },
        { label: "Contact", href: "mailto:admin@omnidiff.it.com?subject=OmniDiff General Contact Inquiry" },
      ],
    },
    {
      header: "LEGAL",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "SEC Filing Records", href: "#" },
        { label: "Data Residency Framework", href: "#" },
      ],
    },
  ];

  return (
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
            Regional enterprise workstations sit idle for an estimated 60–70% of every 24-hour cycle. OmniDiff's zero-CapEx orchestration model converts stranded compute capacity into institutional-grade cloud infrastructure — at a fraction of hyperscaler cost.
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
                    <a
                      href={link.href}
                      className="font-[family-name:var(--font-inter)] text-sm text-text-muted transition-colors hover:text-[#00beff]"
                    >
                      {link.label}
                    </a>
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
  );
}
