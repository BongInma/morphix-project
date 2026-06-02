import OmniDiffLogo from "./OmniDiffLogo";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-24 md:pt-28 pb-12">
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
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div style={{ filter: "drop-shadow(0 0 24px rgba(0, 201, 167, 0.4))" }}>
            <OmniDiffLogo size="lg" />
          </div>
        </div>

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
        <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-text-primary leading-tight sm:text-5xl md:text-7xl">
          The World's First
          <br />
          <span className="text-electric">Zero-CapEx</span> Neocloud.
        </h1>

        {/* Sub-headline */}
        <p className="font-[family-name:var(--font-inter)] text-base text-text-muted max-w-2xl mx-auto mt-6 sm:text-lg md:text-xl">
          Morphix Systems Inc. orchestrates underutilized enterprise hardware into a secure, localized, high-performance computing network for global AI and rendering workloads. Cut cloud costs by 65%–80% without compromising data sovereignty.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/omnidiff#omnidiff-portal" className="w-full sm:w-auto rounded-md bg-electric px-6 py-3 text-center font-[family-name:var(--font-inter)] font-semibold text-obsidian transition hover:brightness-110">
            Rent Secure Compute
          </a>
          <a href="/omnidiff#omnidiff-portal" className="w-full sm:w-auto rounded-md border border-electric px-6 py-3 text-center font-[family-name:var(--font-inter)] font-semibold text-electric transition hover:bg-electric/10">
            Monetize Idle Workstations
          </a>
        </div>

        {/* Micro-stats */}
        <div className="mt-10 flex flex-col items-center justify-center gap-2 font-[family-name:var(--font-dmmono)] text-[10px] text-text-muted sm:flex-row sm:gap-3 sm:text-xs">
          <span>65–80% Cost Reduction</span>
          <span className="hidden h-3 w-px bg-surface-border sm:block" />
          <span>&lt;50ms Eviction SLA</span>
          <span className="hidden h-3 w-px bg-surface-border sm:block" />
          <span>APAC Data Residency Compliant</span>
        </div>
      </div>
    </section>
  );
}
