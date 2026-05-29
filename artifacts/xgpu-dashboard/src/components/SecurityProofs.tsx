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
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Section label */}
      <p className="mb-4 font-[family-name:var(--font-dmmono)] text-xs font-medium uppercase tracking-[0.2em] text-electric">
        INFRASTRUCTURE SECURITY ARCHITECTURE
      </p>

      {/* Heading */}
      <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
        Built for Enterprise Paranoia.
      </h2>

      {/* Philosophy */}
      <div className="mx-auto max-w-4xl text-center my-8 sm:my-12 px-2 sm:px-4">
        <p className="font-[family-name:var(--font-inter)] text-base sm:text-lg md:text-xl text-text-muted font-medium leading-relaxed tracking-wide">
          Every design decision in <span className="text-text-primary font-semibold">OmniDiff</span>{" "}
          prioritizes host data sovereignty and renter workload confidentiality simultaneously
          — engineered natively for maximum execution speed, zero-trust security, and
          sub-50ms network latency.
        </p>
      </div>

      {/* Top Row: 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* Pillar 1: Security */}
        <div className="group bg-gradient-to-b from-gray-950 to-black border border-gray-800 p-6 rounded-xl hover:border-[#00beff]/40 transition-all duration-300 shadow-xl">
          <div className="w-20 h-8 rounded-lg bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center mb-4 text-[#00beff] font-bold text-xs uppercase tracking-wider">
            Pillar 1
          </div>
          <h3 className="text-base font-bold text-white tracking-wide uppercase font-[family-name:var(--font-syne)]">
            Ironclad Zero-Trust Security
          </h3>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed font-[family-name:var(--font-inter)]">
            Workloads and proprietary model weights are isolated strictly inside hardware-encrypted Trusted Execution Environments (TEEs) using NVIDIA Confidential Computing, guaranteeing total confidentiality from host infrastructure exposure.
          </p>
        </div>

        {/* Pillar 2: Resiliency & Wiping */}
        <div className="group bg-gradient-to-b from-gray-950 to-black border border-gray-800 p-6 rounded-xl hover:border-[#00beff]/40 transition-all duration-300 shadow-xl">
          <div className="w-20 h-8 rounded-lg bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center mb-4 text-[#00beff] font-bold text-xs uppercase tracking-wider">
            Pillar 2
          </div>
          <h3 className="text-base font-bold text-white tracking-wide uppercase font-[family-name:var(--font-syne)]">
            Triad Redundancy & Active Erase
          </h3>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed font-[family-name:var(--font-inter)]">
            Tasks execute across synchronized, parallel triple-node triads to prevent data loss during sudden power outages. Upon workload completion or eviction, an automated hardware sequence immediately wipes all residual data footprints from host RAM.
          </p>
        </div>

        {/* Pillar 3: Latency */}
        <div className="group bg-gradient-to-b from-gray-950 to-black border border-gray-800 p-6 rounded-xl hover:border-[#00beff]/40 transition-all duration-300 shadow-xl">
          <div className="w-20 h-8 rounded-lg bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center mb-4 text-[#00beff] font-bold text-xs uppercase tracking-wider">
            Pillar 3
          </div>
          <h3 className="text-base font-bold text-white tracking-wide uppercase font-[family-name:var(--font-syne)]">
            Ultra-Low Sub-50ms Latency
          </h3>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed font-[family-name:var(--font-inter)]">
            Localized regional Grade A node routing leverages proprietary delta-sync telemetry and differential data (diff) processing, transmitting only active workload variations to eliminate geographical transit legs.
          </p>
        </div>

      </div>

      {/* Bottom Row: 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

        {/* Pillar 4: Sovereignty */}
        <div className="group bg-gradient-to-b from-gray-950 to-black border border-gray-800 p-6 rounded-xl hover:border-[#00beff]/40 transition-all duration-300 shadow-xl">
          <div className="w-20 h-8 rounded-lg bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center mb-4 text-[#00beff] font-bold text-xs uppercase tracking-wider">
            Pillar 4
          </div>
          <h3 className="text-base font-bold text-white tracking-wide uppercase font-[family-name:var(--font-syne)]">
            Absolute Data Sovereignty
          </h3>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed font-[family-name:var(--font-inter)]">
            Rigid geographical geofencing restricts computational routing data to designated national borders, ensuring compliance with strict statutory frameworks like the Philippine Data Privacy Act (RA 10173).
          </p>
        </div>

        {/* Pillar 5: Efficiency */}
        <div className="group bg-gradient-to-b from-gray-950 to-black border border-gray-800 p-6 rounded-xl hover:border-[#00beff]/40 transition-all duration-300 shadow-xl">
          <div className="w-20 h-8 rounded-lg bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center mb-4 text-[#00beff] font-bold text-xs uppercase tracking-wider">
            Pillar 5
          </div>
          <h3 className="text-base font-bold text-white tracking-wide uppercase font-[family-name:var(--font-syne)]">
            Zero-CapEx Efficiency
          </h3>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed font-[family-name:var(--font-inter)]">
            Dynamic orchestration transforms unutilized off-shift enterprise workstation capacity into highly scalable cloud infrastructure, slashing standard processing overhead by 65% to 80% versus legacy hyperscalers.
          </p>
        </div>

      </div>
    </section>
  );
}
