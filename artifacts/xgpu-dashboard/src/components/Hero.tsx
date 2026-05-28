export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
      {/* Grid overlay background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(26, 37, 64, 0.5) 39px, rgba(26, 37, 64, 0.5) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(26, 37, 64, 0.5) 39px, rgba(26, 37, 64, 0.5) 40px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial glow behind headline */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "80%",
          height: "60%",
          top: "20%",
          left: "10%",
          background: "radial-gradient(circle, rgba(0, 194, 255, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface px-4 py-1 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
          </span>
          <span className="font-[family-name:var(--font-dmmono)] text-xs text-text-mono">
            NETWORK ONLINE — 847 NODES ACTIVE
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-[family-name:var(--font-syne)] text-5xl font-bold text-text-primary leading-tight md:text-7xl">
          The World's First
          <br />
          <span className="text-electric">Zero-CapEx</span> Neocloud.
        </h1>

        {/* Sub-headline */}
        <p className="font-[family-name:var(--font-inter)] text-lg text-text-muted max-w-2xl mx-auto mt-6 md:text-xl">
          Morphix Systems Inc. orchestrates underutilized enterprise hardware into a secure, localized, high-performance computing network for global AI and rendering workloads. Cut cloud costs by 65%–80% without ceding data sovereignty.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="/omnidiff#omnidiff-portal" className="rounded-md bg-electric px-6 py-3 font-[family-name:var(--font-inter)] font-semibold text-obsidian transition hover:brightness-110">
            Rent Secure Compute
          </a>
          <a href="/omnidiff#omnidiff-portal" className="rounded-md border border-electric px-6 py-3 font-[family-name:var(--font-inter)] font-semibold text-electric transition hover:bg-electric/10">
            Monetize Idle Workstations
          </a>
        </div>

        {/* Micro-stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 font-[family-name:var(--font-dmmono)] text-xs text-text-muted">
          <span>65–80% Cost Reduction</span>
          <span className="h-3 w-px bg-surface-border" />
          <span>&lt;50ms Eviction SLA</span>
          <span className="h-3 w-px bg-surface-border" />
          <span>APAC Data Residency Compliant</span>
        </div>
      </div>
    </section>
  );
}
