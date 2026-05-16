import React, { useState, useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
const API = `${BASE}/api`;

type Counters = { renterCounter: number; gpuCounter: number };

const INPUT =
  "w-full bg-[#0f1117] border rounded-lg px-4 py-3 text-sm text-white placeholder-[#4B5563] font-mono focus:outline-none transition-all duration-200";
const INPUT_DEFAULT = "border-[#1F2937] focus:border-[#3B82F6]";
const INPUT_ERROR = "border-red-500 focus:border-red-500";
const INPUT_VALID = "border-[#10B981] focus:border-[#10B981]";

type FieldState = "idle" | "valid" | "error";

function fieldClass(s: FieldState) {
  if (s === "valid") return `${INPUT} ${INPUT_VALID}`;
  if (s === "error") return `${INPUT} ${INPUT_ERROR}`;
  return `${INPUT} ${INPUT_DEFAULT}`;
}

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function SectionHeader({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1F2937] bg-[#0B0C0E]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex flex-col leading-none">
          <span className="text-white font-bold text-lg tracking-tight">OmniDiff</span>
          <span className="text-[#4B5563] text-[10px] tracking-[0.15em] uppercase">
            powered by Morphix Systems Inc.
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-[0.1em] uppercase text-[#6B7280]">
          {["Enterprise Renter View", "Hardware Provider View", "Sovereign Compliance"].map((label) => (
            <button
              key={label}
              onClick={() =>
                scrollTo(
                  label.toLowerCase().includes("renter")
                    ? "renter"
                    : label.toLowerCase().includes("provider")
                    ? "provider"
                    : "compliance"
                )
              }
              className="hover:text-white transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => scrollTo("renter")}
          className="px-5 py-2.5 rounded-lg text-xs font-bold tracking-[0.12em] uppercase bg-[#10B981] text-black hover:bg-[#059669] transition-colors shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_32px_rgba(16,185,129,0.55)]"
        >
          Secure Early Access
        </button>
      </div>
    </header>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#1F2937] last:border-0">
      <span className="text-[#6B7280] text-xs uppercase tracking-[0.1em]">{label}</span>
      <span className="text-[#10B981] font-mono text-sm font-semibold">{value}</span>
    </div>
  );
}

function RenterForm({ onSuccess }: { onSuccess: (counters: Counters) => void }) {
  const [fields, setFields] = useState({ fullName: "", title: "", company: "", email: "", useCase: "", monthlyDemand: "" });
  const [fs, setFs] = useState<Record<string, FieldState>>({});
  const [loading, setLoading] = useState(false);

  const rules: Record<string, (v: string) => boolean> = {
    fullName: (v) => v.trim().length > 1,
    title: (v) => v.trim().length > 1,
    company: (v) => v.trim().length > 1,
    email: validateEmail,
    useCase: (v) => v !== "",
    monthlyDemand: (v) => v !== "",
  };

  const validate = (name: string, value: string): FieldState => {
    if (!value) return "idle";
    return rules[name]?.(value) ? "valid" : "error";
  };

  const onChange = (name: string, value: string) => {
    setFields((f) => ({ ...f, [name]: value }));
    setFs((s) => ({ ...s, [name]: validate(name, value) }));
  };

  const allValid = Object.keys(rules).every((k) => rules[k](fields[k as keyof typeof fields] ?? ""));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newFs: Record<string, FieldState> = {};
    Object.keys(rules).forEach((k) => { newFs[k] = rules[k](fields[k as keyof typeof fields] ?? "") ? "valid" : "error"; });
    setFs(newFs);
    if (!allValid) return;
    setLoading(true);
    try {
      const r = await fetch(`${API}/leads/renter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await r.json();
      onSuccess(data);
    } catch {
      setLoading(false);
    }
  };

  const fld = (name: keyof typeof fields, placeholder: string, type = "text") => (
    <div className="flex flex-col gap-1.5">
      <input
        type={type}
        value={fields[name]}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={fieldClass(fs[name] ?? "idle")}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      />
      {fs[name] === "error" && <p className="text-red-400 text-[11px] pl-1">Required / Invalid</p>}
    </div>
  );

  return (
    <form onSubmit={submit} className="grid gap-4">
      {fld("fullName", "Full Name")}
      {fld("title", "Corporate Title")}
      {fld("company", "Company Name")}
      {fld("email", "Corporate Email", "email")}
      <select
        value={fields.useCase}
        onChange={(e) => onChange("useCase", e.target.value)}
        className={fieldClass(fs.useCase ?? "idle")}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <option value="">Primary AI Use Case</option>
        {["LLM Inference", "Computer Vision", "Training Workloads", "RAG / Vector Search", "Genomics / BioML", "Other"].map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <select
        value={fields.monthlyDemand}
        onChange={(e) => onChange("monthlyDemand", e.target.value)}
        className={fieldClass(fs.monthlyDemand ?? "idle")}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <option value="">Estimated Monthly GPU Demand</option>
        {["< 500 GPU-hrs", "500 – 2,000 GPU-hrs", "2,000 – 10,000 GPU-hrs", "10,000+ GPU-hrs"].map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg text-sm font-bold tracking-[0.12em] uppercase bg-[#10B981] text-black hover:bg-[#059669] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_36px_rgba(16,185,129,0.55)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "CONFIRM EXPRESSION OF INTEREST"}
      </button>
    </form>
  );
}

function ProviderForm({ onSuccess }: { onSuccess: (counters: Counters) => void }) {
  const gpuModels = ["NVIDIA A100", "NVIDIA H100", "NVIDIA RTX 4090", "NVIDIA RTX 3090", "AMD MI300X", "Other"];
  const [fields, setFields] = useState({ entityName: "", address: "", contactName: "", email: "", estimatedGpus: "", idleWindow: "" });
  const [gpuModelsSelected, setGpuModelsSelected] = useState<string[]>([]);
  const [fs, setFs] = useState<Record<string, FieldState>>({});
  const [loading, setLoading] = useState(false);

  const rules: Record<string, (v: string) => boolean> = {
    entityName: (v) => v.trim().length > 1,
    address: (v) => v.trim().length > 5,
    contactName: (v) => v.trim().length > 1,
    email: validateEmail,
    estimatedGpus: (v) => v !== "",
    idleWindow: (v) => v !== "",
  };

  const validate = (name: string, value: string): FieldState => {
    if (!value) return "idle";
    return rules[name]?.(value) ? "valid" : "error";
  };

  const onChange = (name: string, value: string) => {
    setFields((f) => ({ ...f, [name]: value }));
    setFs((s) => ({ ...s, [name]: validate(name, value) }));
  };

  const toggleModel = (m: string) =>
    setGpuModelsSelected((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);

  const allValid = Object.keys(rules).every((k) => rules[k](fields[k as keyof typeof fields] ?? ""));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newFs: Record<string, FieldState> = {};
    Object.keys(rules).forEach((k) => { newFs[k] = rules[k](fields[k as keyof typeof fields] ?? "") ? "valid" : "error"; });
    setFs(newFs);
    if (!allValid) return;
    setLoading(true);
    try {
      const r = await fetch(`${API}/leads/provider`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, gpuModels: gpuModelsSelected }),
      });
      const data = await r.json();
      onSuccess(data);
    } catch {
      setLoading(false);
    }
  };

  const fld = (name: keyof typeof fields, placeholder: string, type = "text") => (
    <div className="flex flex-col gap-1.5">
      <input
        type={type}
        value={fields[name]}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={fieldClass(fs[name] ?? "idle")}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      />
      {fs[name] === "error" && <p className="text-red-400 text-[11px] pl-1">Required / Invalid</p>}
    </div>
  );

  return (
    <form onSubmit={submit} className="grid gap-4">
      {fld("entityName", "Company / Franchise Entity Name")}
      {fld("address", "Primary Infrastructure Address")}
      {fld("contactName", "Contact Person Name")}
      {fld("email", "Corporate Email", "email")}
      <select
        value={fields.estimatedGpus}
        onChange={(e) => onChange("estimatedGpus", e.target.value)}
        className={fieldClass(fs.estimatedGpus ?? "idle")}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <option value="">Estimated Total GPUs Available</option>
        {["20-50", "50-100", "100-500", "500+"].map((o) => (
          <option key={o} value={o}>{o} GPUs</option>
        ))}
      </select>
      <div className="border border-[#1F2937] rounded-lg p-4 flex flex-col gap-2">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#6B7280] mb-1">Primary GPU Models Owned</p>
        {gpuModels.map((m) => (
          <label key={m} className="flex items-center gap-3 cursor-pointer text-sm text-[#D1D5DB]">
            <input
              type="checkbox"
              checked={gpuModelsSelected.includes(m)}
              onChange={() => toggleModel(m)}
              className="accent-[#10B981] w-4 h-4"
            />
            {m}
          </label>
        ))}
      </div>
      <select
        value={fields.idleWindow}
        onChange={(e) => onChange("idleWindow", e.target.value)}
        className={fieldClass(fs.idleWindow ?? "idle")}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <option value="">Average Daily Idle Window</option>
        {["12 AM – 4 AM", "12 AM – 8 AM", "10 PM – 6 AM", "Custom Schedule"].map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg text-sm font-bold tracking-[0.12em] uppercase bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_36px_rgba(59,130,246,0.55)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "REGISTER HARDWARE CAPACITY"}
      </button>
    </form>
  );
}

function SuccessCard({ type, onClose }: { type: "renter" | "provider"; onClose: () => void }) {
  const isRenter = type === "renter";
  return (
    <div className="flex flex-col gap-5">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isRenter ? "bg-[#10B981]/20 border border-[#10B981]/40" : "bg-[#3B82F6]/20 border border-[#3B82F6]/40"}`}>
        ✓
      </div>
      <h3 className={`text-xl font-bold ${isRenter ? "text-[#10B981]" : "text-[#3B82F6]"}`}>
        Expression of Interest {isRenter ? "Successfully Registered" : "Registered"}
      </h3>
      <p className="text-sm text-[#9CA3AF] leading-6">
        {isRenter
          ? "Thank you. Morphix Systems has locked in your priority placement. Your organization has been allocated 500 Pending Compute Hours, reserved at the Institutional Founder rate, valid through the end of the Q3 infrastructure rollout window."
          : "Your hardware tier has been securely placed in our District Priority Queue. Morphix Systems engineering will reach out to your office shortly to provide our lightweight Node Daemon specifications, remote attestation protocols, and onboarding documentation."}
      </p>
      <button
        onClick={onClose}
        className={`mt-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-[0.12em] uppercase border transition-colors ${isRenter ? "border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10" : "border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10"}`}
      >
        Back to OmniDiff
      </button>
    </div>
  );
}

export default function OmniDiff() {
  const [counters, setCounters] = useState<Counters>({ renterCounter: 438, gpuCounter: 12450 });
  const [renterDone, setRenterDone] = useState(false);
  const [providerDone, setProviderDone] = useState(false);
  const renterRef = useRef<HTMLDivElement>(null);
  const providerRef = useRef<HTMLDivElement>(null);
  const complianceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API}/counters`)
      .then((r) => r.json())
      .then((d) => setCounters(d))
      .catch(() => {});
  }, []);

  const scrollTo = (id: string) => {
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      renter: renterRef,
      provider: providerRef,
      compliance: complianceRef,
    };
    map[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onRenterSuccess = (data: Counters) => {
    setCounters(data);
    setRenterDone(true);
  };

  const onProviderSuccess = (data: Counters) => {
    setCounters(data);
    setProviderDone(true);
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0B0C0E", fontFamily: "'Inter', sans-serif" }}>
      <SectionHeader scrollTo={scrollTo} />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1F2937] bg-[#10B981]/5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[#10B981] text-xs tracking-[0.2em] uppercase font-mono">Live Network Infrastructure</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Distributed AI Compute,{" "}
          <span style={{ color: "#10B981" }}>Redefined.</span>
        </h1>
        <p className="text-[#6B7280] text-lg max-w-2xl mx-auto leading-relaxed">
          OmniDiff bridges enterprise AI workloads with sovereign, localized GPU infrastructure.
          Zero latency. Zero lock-in. Powered by Morphix Systems Inc.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold font-mono text-[#10B981]">{counters.renterCounter.toLocaleString()}</span>
            <span className="text-[#4B5563] text-xs uppercase tracking-[0.15em] mt-1">Institutional Founders</span>
          </div>
          <div className="w-px bg-[#1F2937] hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold font-mono text-[#3B82F6]">{counters.gpuCounter.toLocaleString()}</span>
            <span className="text-[#4B5563] text-xs uppercase tracking-[0.15em] mt-1">Verified Regional GPUs</span>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Renter Card */}
          <div ref={renterRef} className="rounded-2xl border border-[#1F2937] bg-[#0f1117] p-8 flex flex-col gap-6 scroll-mt-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[#10B981] text-[10px] tracking-[0.2em] uppercase font-mono">Enterprise Renters</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Local AI Inference.<br />Zero Latency.</h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Bypass central power grid constraints and route your corporate workloads through localized,
                high-performance Grade A Nodes right in your neighborhood.
              </p>
            </div>
            <div className="rounded-xl border border-[#1F2937] p-4 bg-[#0B0C0E]">
              <ul className="space-y-3 text-sm leading-6 text-[#D1D5DB]">
                <li className="flex gap-3"><span className="text-[#10B981] font-bold">[✓]</span><span>40% to 60% lower inference fees than legacy centralized cloud providers.</span></li>
                <li className="flex gap-3"><span className="text-[#10B981] font-bold">[✓]</span><span>Standardized container architecture ensuring zero vendor lock-in and zero data-egress fees.</span></li>
                <li className="flex gap-3"><span className="text-[#10B981] font-bold">[✓]</span><span>On-demand deployment with no corporate procurement bureaucracy or restrictive multi-year contracts.</span></li>
                <li className="flex gap-3"><span className="text-[#10B981] font-bold">[✓]</span><span>Comprehensive SLA-backed insurance coverage protecting corporate data payloads against transmission failures or operational downtime.</span></li>
                <li className="flex gap-3"><span className="text-[#10B981] font-bold">[✓]</span><span>500 free pilot compute hours allocated instantly to your organization upon launch.</span></li>
              </ul>
            </div>
            {renterDone ? (
              <SuccessCard type="renter" onClose={() => setRenterDone(false)} />
            ) : (
              <RenterForm onSuccess={onRenterSuccess} />
            )}
          </div>

          {/* Provider Card */}
          <div ref={providerRef} className="rounded-2xl border border-[#1F2937] bg-[#0f1117] p-8 flex flex-col gap-6 scroll-mt-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                <span className="text-[#3B82F6] text-[10px] tracking-[0.2em] uppercase font-mono">Hardware Providers</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Monetize Your Idle GPUs.<br />Offset Meralco Spikes.</h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Convert your idle nighttime hardware capacity (12 AM – 8 AM) into high-yield PHP revenues
                while completely underwriting your future fleet replacement costs.
              </p>
            </div>
            <div className="rounded-xl border border-[#1F2937] p-4 bg-[#0B0C0E]">
              <ul className="space-y-3 text-sm leading-6 text-[#D1D5DB]">
                <li className="flex gap-3"><span className="text-[#3B82F6] font-bold">[✓]</span><span>Monetize idle 12 AM – 8 AM hardware into predictable, high-yield revenue streams.</span></li>
                <li className="flex gap-3"><span className="text-[#3B82F6] font-bold">[✓]</span><span>Offset high local utility costs (Meralco spikes) and completely underwrite future equipment replacements.</span></li>
                <li className="flex gap-3"><span className="text-[#3B82F6] font-bold">[✓]</span><span>Retain an industry-leading 80% payout split before regional capacity caps close.</span></li>
                <li className="flex gap-3"><span className="text-[#3B82F6] font-bold">[✓]</span><span>Enterprise-grade hardware liability coverage underwriting your physical clusters against any workload-induced operational risks.</span></li>
                <li className="flex gap-3"><span className="text-[#3B82F6] font-bold">[✓]</span><span>Turnkey deployment via our secure, lightweight background Node Daemon with zero daily IT maintenance.</span></li>
              </ul>
            </div>
            {providerDone ? (
              <SuccessCard type="provider" onClose={() => setProviderDone(false)} />
            ) : (
              <ProviderForm onSuccess={onProviderSuccess} />
            )}
          </div>
        </div>
      </section>

      {/* Compliance / Footer */}
      <section ref={complianceRef} className="border-t border-[#1F2937] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="rounded-2xl border border-[#1F2937] bg-[#0f1117] p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#10B981] text-[10px] tracking-[0.2em] uppercase font-mono">Sovereign Compliance</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Trusted Execution. Hardware-Level Privacy.</h3>
            <p className="text-[#6B7280] text-sm leading-relaxed max-w-2xl">
              OmniDiff operates within Trusted Execution Environments (TEE) that create a hardware-level sandbox.
              The network only sees encrypted task payloads — it is architecturally impossible for a renter
              to access a provider's local drives, personal data, or infrastructure configuration.
              All submissions are governed by Morphix Systems Inc. enterprise data handling protocols.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Data Encryption", value: "AES-256-GCM" },
                { label: "Attestation", value: "TEE Verified" },
                { label: "Egress Policy", value: "Zero Cost" },
                { label: "Uptime SLA", value: "99.95%" },
              ].map(({ label, value }) => (
                <div key={label} className="border border-[#1F2937] rounded-xl p-4 text-center">
                  <p className="text-[#10B981] font-mono font-bold text-sm">{value}</p>
                  <p className="text-[#4B5563] text-[10px] uppercase tracking-[0.1em] mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-[#374151] text-xs mt-8 font-mono">
            © 2026 Morphix Systems Inc. — OmniDiff Platform. All expressions of interest are non-binding EOIs.
          </p>
        </div>
      </section>
    </div>
  );
}
