export default function EOIForms() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-4 font-[family-name:var(--font-dmmono)] text-xs font-medium uppercase tracking-[0.2em] text-electric">
        EXPRESSIONS OF INTEREST
      </p>
      <h2 className="mb-12 font-[family-name:var(--font-syne)] text-3xl font-bold text-text-primary">
        Join the OmniDiff Network
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Card 1 — Renter */}
        <div className="relative flex flex-col justify-between rounded-xl border border-surface-border bg-surface p-8">
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-electric" />
          <div>
            <p className="mb-4 font-[family-name:var(--font-dmmono)] text-xs font-medium text-electric">
              GPU RENTER / AI LAB / VFX STUDIO
            </p>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-text-primary">
              Rent Secure Compute
            </h3>
            <p className="mt-3 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-text-muted">
              Secure access to enterprise-grade GPU clusters for AI training, VFX rendering, and HPC workloads. Zero CapEx, APAC-compliant residency.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["LLM Training", "Fine-Tuning", "VFX Rendering", "3D Animation", "Simulation/HPC"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-surface-border px-3 py-1 font-[family-name:var(--font-dmmono)] text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <a
            href="/omnidiff"
            className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-electric py-3 font-[family-name:var(--font-inter)] font-semibold text-obsidian transition hover:brightness-110"
          >
            Rent Secure Compute
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Card 2 — Provider */}
        <div className="relative flex flex-col justify-between rounded-xl border border-surface-border bg-surface p-8">
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-emerald" />
          <div>
            <p className="mb-4 font-[family-name:var(--font-dmmono)] text-xs font-medium text-emerald">
              BPO / ENTERPRISE NETWORK OPERATOR
            </p>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold text-text-primary">
              Monetize Idle Workstations
            </h3>
            <p className="mt-3 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-text-muted">
              First 15K Nodes: 90% Payout Share in the first year then 85% lifetime share thereafter. Signups after the priority 15K nodes, get 80% Payout Share.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Zero-Day Install", "Peripheral Telemetry", "<50ms Eviction", "BIR-Compliant EIS Payouts"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-surface-border px-3 py-1 font-[family-name:var(--font-dmmono)] text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <a
            href="/omnidiff"
            className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-emerald py-3 font-[family-name:var(--font-inter)] font-semibold text-obsidian transition hover:brightness-110"
          >
            Monetize Idle Workstations
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
