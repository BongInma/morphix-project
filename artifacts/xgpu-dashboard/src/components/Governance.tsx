export default function Governance() {
  const badges = [
    {
      icon: "SEC",
      iconColor: "text-electric",
      borderColor: "border-electric/30",
      bgColor: "bg-electric/5",
      title: "SEC-Registered Corporation",
      sub: "Morphix Systems Inc. is duly registered with the Philippine Securities and Exchange Commission. All operations, contracts, and financial disclosures are subject to SEC oversight.",
    },
    {
      icon: "IPOPHL",
      iconColor: "text-amber",
      borderColor: "border-amber/30",
      bgColor: "bg-amber/5",
      title: "Provisional Patent Protection",
      sub: "Core OmniDiff orchestration frameworks and eviction mechanics are documented under a provisional patent application filed with the Intellectual Property Office of the Philippines.",
    },
    {
      icon: "FMEA",
      iconColor: "text-emerald",
      borderColor: "border-emerald/30",
      bgColor: "bg-emerald/5",
      title: "FMEA-Baseline Operations",
      sub: "All operational procedures are engineered on a Failure Mode and Effects Analysis (FMEA) baseline, covering hardware failure cascades, network partition events, and SLA breach scenarios.",
    },
    {
      icon: "SOM",
      iconColor: "text-text-muted",
      borderColor: "border-surface-border",
      bgColor: "bg-surface",
      title: "15-Module System Operations Manual",
      sub: "A fully detailed Master SOM governs every operational, security, and compliance procedure across the OmniDiff infrastructure layer.",
    },
  ];

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:gap-16 sm:px-6 md:grid-cols-2">
        {/* LEFT COLUMN */}
        <div>
          <p className="font-[family-name:var(--font-dmmono)] text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            CORPORATE GOVERNANCE
          </p>

          <h2 className="mt-4 font-[family-name:var(--font-syne)] text-3xl font-bold text-text-primary">
            Institutional Infrastructure. Not a Protocol.
          </h2>

          <p className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-text-muted">
            OmniDiff is a wholly owned infrastructure ecosystem developed,
            legally operated, and maintained by Morphix Systems Inc., an
            SEC-registered corporation domiciled in Quezon City, Philippines.
            Unlike decentralized or token-governed compute networks, OmniDiff
            operates under full legal accountability, enforceable enterprise
            contracts, and institutional compliance obligations.
          </p>

          {/* Divider */}
          <div className="my-8 border-t border-surface-border" />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="font-[family-name:var(--font-syne)] text-5xl font-bold text-electric">
                15
              </span>
              <p className="mt-2 font-[family-name:var(--font-dmmono)] text-xs text-text-muted">
                MODULE SYSTEM OPERATIONS MANUAL
              </p>
            </div>
            <div>
              <span className="font-[family-name:var(--font-syne)] text-5xl font-bold text-electric">
                1
              </span>
              <p className="mt-2 font-[family-name:var(--font-dmmono)] text-xs text-text-muted">
                PROVISIONAL PATENT FILED — IPOPHL
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Badges */}
        <div className="grid grid-cols-1 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.icon}
              className="flex items-start gap-4 rounded-lg border border-surface-border bg-obsidian p-5"
            >
              <span
                className={`inline-block rounded px-2 py-1 font-[family-name:var(--font-dmmono)] text-xs ${badge.iconColor} ${badge.borderColor} ${badge.bgColor} border flex-shrink-0`}
              >
                [{badge.icon}]
              </span>
              <div>
                <p className="font-[family-name:var(--font-inter)] text-sm font-semibold text-text-primary">
                  {badge.title}
                </p>
                <p className="mt-1 font-[family-name:var(--font-inter)] text-xs text-text-muted">
                  {badge.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
