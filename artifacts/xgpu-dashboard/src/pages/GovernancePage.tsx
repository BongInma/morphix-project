export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-obsidian text-text-primary">
      {/* SECTION A: Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-surface-border bg-obsidian/95 backdrop-blur-md py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div>
              <span className="font-[family-name:var(--font-syne)] font-bold text-xl text-text-primary">
                MORPHIX
              </span>
              <span className="font-[family-name:var(--font-dmmono)] text-xs text-text-muted block">
                SYSTEMS INC.
              </span>
            </div>
            <span className="mx-2 h-4 w-px bg-surface-border" />
            <span className="font-[family-name:var(--font-dmmono)] text-sm text-electric">
              OmniDiff
            </span>
          </div>
          <a
            href="/"
            className="rounded-md border border-surface-border px-4 py-2 font-[family-name:var(--font-dmmono)] text-xs text-text-muted uppercase tracking-widest transition hover:text-text-primary hover:border-electric"
          >
            &larr; Return to Network Hub
          </a>
        </div>
      </header>

      {/* SECTION B: Institutional Hero Band */}
      <section className="border-b border-surface-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface px-4 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            <span className="font-[family-name:var(--font-dmmono)] text-xs text-text-mono">
              MORPHIX SYSTEMS INC. | REGULATORY &amp; COMPLIANCE FRAMEWORK
            </span>
          </div>

          {/* Page title */}
          <h1 className="font-[family-name:var(--font-syne)] font-bold text-4xl md:text-5xl text-text-primary mt-8">
            Corporate Governance &amp;
            <br />
            Transparency Portal
          </h1>

          {/* Corporate statement */}
          <p className="font-[family-name:var(--font-inter)] text-base text-text-muted max-w-3xl mt-6 leading-relaxed">
            OmniDiff is engineered with a risk-first paradigm. All operational vectors, data sovereignty boundaries, and intellectual property arrays are legally structured and maintained under Morphix Systems Inc. for enterprise-grade deployment and institutional venture scaling.
          </p>

          {/* Trust indicators */}
          <div className="mt-8 flex gap-8 flex-wrap">
            <div className="font-[family-name:var(--font-dmmono)] text-xs text-text-muted flex items-center gap-2">
              <span className="inline-block rounded border border-electric/30 bg-electric/5 px-2 py-1 text-electric">
                [SEC]
              </span>
              SEC-Registered Corporation — Philippines
            </div>
            <div className="font-[family-name:var(--font-dmmono)] text-xs text-text-muted flex items-center gap-2">
              <span className="inline-block rounded border border-amber/30 bg-amber/5 px-2 py-1 text-amber">
                [IPOPHL]
              </span>
              Provisional Patent Filed &amp; Tracked
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: Three Compliance Pillars */}
      <section className="border-b border-surface-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-[family-name:var(--font-dmmono)] text-xs uppercase tracking-widest text-electric">
            STRUCTURAL DE-RISKING FRAMEWORK
          </p>
          <h2 className="font-[family-name:var(--font-syne)] text-3xl text-text-primary mt-2">
            Three Core Pillars of Institutional Compliance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Card 1 — Corporate Structure */}
            <div className="bg-surface border border-surface-border rounded-xl p-8 border-t-2 border-t-electric">
              <span className="font-[family-name:var(--font-dmmono)] text-xs text-electric border border-electric/30 bg-electric/5 rounded px-2 py-1">
                [CORP]
              </span>
              <h3 className="font-[family-name:var(--font-syne)] text-xl text-text-primary mt-4">
                Corporate Structure &amp; Securities Compliance
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-sm text-text-muted leading-relaxed mt-3">
                OmniDiff is a wholly owned infrastructure platform developed and operated by Morphix Systems Inc., a fully compliant corporate entity registered under the Securities and Exchange Commission (SEC) of the Philippines, domiciled in Quezon City. All early investment rounds are structured in compliance with SEC private placement regulations under SRC Section 10.1(k), ensuring full legal accountability for institutional venture participation.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["SEC REGISTERED", "SRC 10.1(k)", "QC, PHILIPPINES"].map((tag) => (
                  <span
                    key={tag}
                    className="font-[family-name:var(--font-dmmono)] text-xs border border-surface-border rounded-full px-3 py-1 text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2 — Intellectual Property */}
            <div className="bg-surface border border-surface-border rounded-xl p-8 border-t-2 border-t-amber">
              <span className="font-[family-name:var(--font-dmmono)] text-xs text-amber border border-amber/30 bg-amber/5 rounded px-2 py-1">
                [IP]
              </span>
              <h3 className="font-[family-name:var(--font-syne)] text-xl text-text-primary mt-4">
                Intellectual Property &amp; Defensive Enclaves
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-sm text-text-muted leading-relaxed mt-3">
                Proprietary core technology — including the automated compute-orchestration engine, hardware-level isolation protocols, and sub-50ms instant eviction algorithms — is protected under a provisional patent strategy actively tracked with the Intellectual Property Office of the Philippines (IPOPHL). All frameworks are documented and timestamped against third-party prior-art claims.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["IPOPHL FILED", "PROVISIONAL PATENT", "IP TRACKED"].map((tag) => (
                  <span
                    key={tag}
                    className="font-[family-name:var(--font-dmmono)] text-xs border border-surface-border rounded-full px-3 py-1 text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3 — Operational Integrity */}
            <div className="bg-surface border border-surface-border rounded-xl p-8 border-t-2 border-t-emerald">
              <span className="font-[family-name:var(--font-dmmono)] text-xs text-emerald border border-emerald/30 bg-emerald/5 rounded px-2 py-1">
                [FMEA]
              </span>
              <h3 className="font-[family-name:var(--font-syne)] text-xl text-text-primary mt-4">
                Operational Integrity &amp; Risk Mitigation
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-sm text-text-muted leading-relaxed mt-3">
                All system operations conform natively to a strict Failure Mode and Effects Analysis (FMEA) baseline, covering hardware failure cascades, network partition events, and SLA breach scenarios. Technical telemetry, bilateral netting protocols, and network isolation rules are codified across the 15-Module Master System Operations Manual (SOM), maintained in the secure institutional Data Room.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["FMEA BASELINE", "15-MODULE SOM", "DATA ROOM"].map((tag) => (
                  <span
                    key={tag}
                    className="font-[family-name:var(--font-dmmono)] text-xs border border-surface-border rounded-full px-3 py-1 text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: VC Data Room Access Panel */}
      <section className="border-b border-surface-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative">
            {/* Subtle radial gradient glow behind */}
            <div
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(0, 194, 255, 0.03) 0%, transparent 70%)",
              }}
            />
            <div className="bg-surface border border-surface-border rounded-xl p-10 md:p-16">
              <p className="font-[family-name:var(--font-dmmono)] text-xs uppercase tracking-widest text-electric">
                INSTITUTIONAL ACCESS
              </p>
              <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl text-text-primary mt-3">
                Due Diligence &amp; Data Room Access
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-base text-text-muted max-w-2xl mt-4 leading-relaxed">
                Verified institutional venture funds, legal counsel, and enterprise BPO partners may request access to our complete corporate records — including subscriber agreements, BIR tax tracking documentation, SEC filing records, and the full 15-Module System Operations Manual.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-10">
                {[
                  "SEC Filing Records",
                  "15-Module SOM",
                  "Subscriber Agreements",
                  "BIR Tax Documentation",
                ].map((item) => (
                  <div key={item} className="text-center">
                    <p className="font-[family-name:var(--font-dmmono)] text-xs text-electric mb-1">
                      INCLUDES
                    </p>
                    <p className="font-[family-name:var(--font-dmmono)] text-xs text-text-muted">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="mailto:compliance@morphixsystems.com?subject=Data%20Room%20Access%20Request&body=Organization%3A%0ARole%3A%0AJurisdiction%3A"
                className="inline-block bg-electric text-obsidian font-semibold px-8 py-4 rounded-md hover:brightness-110 active:scale-[0.98] transition-all duration-150 font-[family-name:var(--font-syne)] text-sm"
              >
                Request Data Room Credentials &rarr;
              </a>
              <p className="font-[family-name:var(--font-dmmono)] text-xs text-text-muted mt-4">
                NDA execution required prior to full document release. Response within 2 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: Regulatory Footer */}
      <footer className="bg-surface border-t border-surface-border py-12 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Row 1 — compliance badges */}
          <div className="flex flex-wrap gap-6 justify-center mb-10">
            {/* Badge 1 — BIR */}
            <div className="bg-obsidian border border-surface-border rounded-lg px-6 py-4 text-center max-w-xs">
              <p className="font-[family-name:var(--font-dmmono)] text-xs text-amber">
                [BIR]
              </p>
              <p className="font-[family-name:var(--font-inter)] font-semibold text-text-primary text-sm mt-2">
                BIR Tax Compliance
              </p>
              <p className="font-[family-name:var(--font-inter)] text-xs text-text-muted mt-1">
                Equity allocation and revenue recognition tracked under Philippine Bureau of Internal Revenue protocols.
              </p>
            </div>

            {/* Badge 2 — DPA 2012 */}
            <div className="bg-obsidian border border-surface-border rounded-lg px-6 py-4 text-center max-w-xs">
              <p className="font-[family-name:var(--font-dmmono)] text-xs text-electric">
                [DPA 2012]
              </p>
              <p className="font-[family-name:var(--font-inter)] font-semibold text-text-primary text-sm mt-2">
                Data Privacy Act Alignment
              </p>
              <p className="font-[family-name:var(--font-inter)] text-xs text-text-muted mt-1">
                All geofencing and data residency operations align with the Philippine Data Privacy Act of 2012 (R.A. 10173) and relevant APAC data localization frameworks.
              </p>
            </div>

            {/* Badge 3 — SEC */}
            <div className="bg-obsidian border border-surface-border rounded-lg px-6 py-4 text-center max-w-xs">
              <p className="font-[family-name:var(--font-dmmono)] text-xs text-emerald">
                [SEC]
              </p>
              <p className="font-[family-name:var(--font-inter)] font-semibold text-text-primary text-sm mt-2">
                SEC Disclosure Obligations
              </p>
              <p className="font-[family-name:var(--font-inter)] text-xs text-text-muted mt-1">
                Corporate disclosures, investor communications, and placement memoranda are maintained under SEC oversight and available upon verified request.
              </p>
            </div>
          </div>

          {/* Row 2 — legal bottom bar */}
          <div className="border-t border-surface-border pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="font-[family-name:var(--font-dmmono)] text-xs text-text-muted">
              &copy; 2025 Morphix Systems Inc. All Rights Reserved. SEC-Registered Corporation, Quezon City, Philippines.
            </p>
            <p className="font-[family-name:var(--font-dmmono)] text-xs text-text-muted flex flex-wrap gap-4 justify-center">
              OmniDiff&trade; Trademark &mdash; Morphix Systems Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
