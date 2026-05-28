export default function SecurityProofs() {
  const cards = [
    {
      badge: "TEE",
      badgeColor: "text-electric",
      borderColor: "border-electric/30",
      bgColor: "bg-electric/5",
      title: "Trusted Execution Environments",
      body: "Guest workloads execute strictly inside encrypted hardware enclaves using NVIDIA Confidential Computing and AMD SEV-SNP. The host provider is cryptographically prevented from inspecting renter data. Renters have zero visibility into the host network topology.",
      tags: ["NVIDIA CC", "AMD SEV-SNP", "AES-256"],
    },
    {
      badge: "SLA",
      badgeColor: "text-amber",
      borderColor: "border-amber/30",
      bgColor: "bg-amber/5",
      title: "Priority Return Eviction",
      body: "Continuous edge telemetry monitors peripheral input events across all provider nodes. Upon detection of mouse movement or keyboard input from the local operator, the OmniDiff orchestration layer executes a sub-50 millisecond workload preemption \u2014 fully transparent to the end user and guaranteed by contractual SLA.",
      tags: ["<50ms P99", "PERIPHERAL TELEMETRY", "ZERO FRICTION"],
    },
    {
      badge: "GEO",
      badgeColor: "text-emerald",
      borderColor: "border-emerald/30",
      bgColor: "bg-emerald/5",
      title: "Geofenced Sovereignty & Zero-Egress",
      body: "All compute tasks are cryptographically tagged with their geographic assignment at ingestion. Workloads are strictly routed and executed within whitelisted national jurisdictions, ensuring full compliance with APAC data-residency frameworks, the Philippine Data Privacy Act, and any client-specific data localization mandates.",
      tags: ["APAC COMPLIANT", "PH-DPA", "ZERO EGRESS"],
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      {/* Section label */}
      <p className="mb-4 font-[family-name:var(--font-dmmono)] text-xs font-medium uppercase tracking-[0.2em] text-electric">
        INFRASTRUCTURE SECURITY ARCHITECTURE
      </p>

      {/* Heading */}
      <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-text-primary md:text-4xl">
        Built for Enterprise Paranoia.
      </h2>

      {/* Sub */}
      <p className="mt-4 max-w-2xl font-[family-name:var(--font-inter)] text-text-muted">
        Every design decision in OmniDiff prioritizes host data sovereignty and
        renter workload confidentiality simultaneously.
      </p>

      {/* Cards grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.badge}
            className="relative overflow-hidden rounded-xl border border-surface-border bg-surface p-8"
          >
            {/* Subtle radial gradient top-right */}
            <div
              className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-[0.04]"
              style={{
                background: `radial-gradient(circle, ${card.badgeColor === "text-electric" ? "#00C2FF" : card.badgeColor === "text-amber" ? "#F5A623" : "#00FF87"} 0%, transparent 70%)`,
              }}
            />

            {/* Badge */}
            <span
              className={`inline-block rounded px-2 py-1 font-[family-name:var(--font-dmmono)] text-xs ${card.badgeColor} ${card.borderColor} ${card.bgColor} border`}
            >
              [{card.badge}]
            </span>

            {/* Title */}
            <h3 className="mt-4 font-[family-name:var(--font-syne)] text-xl font-bold text-text-primary">
              {card.title}
            </h3>

            {/* Body */}
            <p className="mt-3 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-text-muted">
              {card.body}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-surface-border px-3 py-1 font-[family-name:var(--font-dmmono)] text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
