import React, { useState, useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
const API = `${BASE}/api`;

type Counters = { renterCounter: number; gpuCounter: number };
type HardwareTier = "NVIDIA H100 Cluster" | "NVIDIA A100 Cluster" | "NVIDIA RTX 4090 Node";

const HARDWARE_RATES: Record<HardwareTier, number> = {
  "NVIDIA H100 Cluster": 4.76,
  "NVIDIA A100 Cluster": 2.21,
  "NVIDIA RTX 4090 Node": 0.9,
};

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

function formatMoney(value: number) {
  return Math.round(value).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const NETWORK_METRICS = [
  "Global Average Latency: 14.2ms",
  "Active Network Uptime: 99.998%",
  "Total Encrypted Data Scrambled (AES-256): 4.2 PB",
];

const NODE_LOGS = [
  "[ONLINE] Node #PK-7104 (Quezon City, PH) — AMD MI300X — Verification Passed",
  "[ONLINE] Node #US-2291 (Virginia, USA) — NVIDIA H100 — Verification Passed",
  "[ONLINE] Node #EU-8840 (Frankfurt, DE) — NVIDIA A100 — Verification Passed",
];

const LEDGER_LOGS = [
  "🔒 Task #84920: Financial Backtesting Model ... Completed (Saved 54% vs AWS)",
  "🔒 Task #84921: Risk Mitigation Simulation ... Processing on Local Cluster",
  "🔒 Task #84922: LLM Inference Patch ... Completed (Saved 61% vs Google Cloud)",
];

const VAULT_CARDS = [
  {
    title: "🔒 Cryptographic Payloads & AES-256 Isolation Protocol",
    subtitle: "Technical Whitepaper v1.2",
    action: "Preview Framework",
  },
  {
    title: "💼 Underwriting & SLA Liability Coverage Framework",
    subtitle: "Multi-Syndicate Placement Structure — Chubb, AIG, Lloyd's",
    action: "Request Institutional Access",
  },
  {
    title: "📊 DeRiskFi Sovereign Architecture Blueprint",
    subtitle: "Decentralized Risk & Compute Scoring Engine Overview",
    action: "Preview Framework",
  },
];

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
              onClick={() => scrollTo(label.toLowerCase().includes("renter") ? "renter" : label.toLowerCase().includes("provider") ? "provider" : "compliance")}
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
        {["Dedicated 24/7 Allocation", "Night Shift Only (12 AM - 8 AM)", "Flexible / Custom Schedule"].map((o) => (
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
          ? "Thank you. Morphix Systems has locked in your priority placement. Your organization has been allocated 500 free Pending Compute Hours, reserved at the Institutional Founder rate, valid through the end of the Q3 infrastructure rollout window."
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
  const [counters, setCounters] = useState<Counters>({ renterCounter: 435, gpuCounter: 12420 });
  const [renterDone, setRenterDone] = useState(false);
  const [providerDone, setProviderDone] = useState(false);
  const [hardwareTier, setHardwareTier] = useState<HardwareTier>("NVIDIA H100 Cluster");
  const [monthlyHours, setMonthlyHours] = useState(1200);
  const [nodeTick, setNodeTick] = useState(0);
  const [ledgerTick, setLedgerTick] = useState(0);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [vaultSuccess, setVaultSuccess] = useState<Record<number, boolean>>({});
  const renterRef = useRef<HTMLDivElement>(null);
  const providerRef = useRef<HTMLDivElement>(null);
  const complianceRef = useRef<HTMLDivElement>(null);

  const renterProgress = Math.min((counters.renterCounter / 500) * 100, 100);
  const gpuProgress = Math.min((counters.gpuCounter / 15000) * 100, 100);
  const legacyRate = HARDWARE_RATES[hardwareTier];
  const omnidiffRate = legacyRate * 0.5;
  const legacyMonthlyCost = legacyRate * monthlyHours;
  const omnidiffMonthlyCost = omnidiffRate * monthlyHours;
  const annualSavings = (legacyMonthlyCost - omnidiffMonthlyCost) * 12;

  const refreshCounters = async () => {
    try {
      const r = await fetch(`${API}/counters`);
      const d = await r.json();
      setCounters(d);
    } catch {}
  };

  useEffect(() => {
    refreshCounters();
  }, []);

  useEffect(() => {
    const nodeTimer = window.setInterval(() => setNodeTick((v) => (v + 1) % NODE_LOGS.length), 4000);
    const ledgerTimer = window.setInterval(() => setLedgerTick((v) => (v + 1) % LEDGER_LOGS.length), 3500);
    return () => {
      window.clearInterval(nodeTimer);
      window.clearInterval(ledgerTimer);
    };
  }, []);

  const scrollTo = (id: string) => {
    if (id === "compliance") {
      setVaultOpen((v) => !v);
      return;
    }
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      renter: renterRef,
      provider: providerRef,
      compliance: complianceRef,
    };
    map[id]?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onRenterSuccess = (data: Counters) => {
    setCounters(data);
    setRenterDone(true);
    void refreshCounters();
  };

  const onProviderSuccess = (data: Counters) => {
    setCounters(data);
    setProviderDone(true);
    void refreshCounters();
  };

  const handleVaultAction = (index: number) => {
    setVaultSuccess((current) => ({ ...current, [index]: true }));
  };

  return (
    <div className="min-h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory text-white" style={{ backgroundColor: "#0B0C0E", fontFamily: "'Inter', sans-serif", scrollPaddingTop: "4rem" }}>
      <SectionHeader scrollTo={scrollTo} />

      {/* Hero */}
      <section id="hero" className="w-full snap-start scroll-mt-24 min-h-[calc(100vh-4rem)] flex items-center justify-center px-8 py-20 box-border" style={{ marginBottom: "8rem" }}>
        <div className="w-full max-w-[1200px] flex flex-col justify-center items-center px-0">
          <div className="text-center w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1F2937] bg-[#10B981]/5 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#10B981] text-xs tracking-[0.2em] uppercase font-mono">Live Network Infrastructure</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-2">
              Distributed AI Compute,{" "}
              <span style={{ color: "#10B981" }}>Redefined.</span>
            </h1>
            <p className="text-[#6B7280] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              OmniDiff bridges enterprise AI workloads with sovereign, localized GPU infrastructure.
              Zero latency. Zero lock-in. Powered by Morphix Systems Inc.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
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
          </div>
        </div>
      </section>

      {/* Cards */}
      <section id="cards" className="w-full flex items-center justify-center px-8 py-0 box-border" style={{ minHeight: "auto" }}>
        <div className="w-full max-w-[1200px] py-0">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch self-center">
            <div ref={renterRef} className="h-full rounded-2xl border border-[#1F2937] bg-[#0f1117] p-6 flex flex-col scroll-mt-20">
              <div className="grid grid-rows-[auto_1fr_auto_auto] gap-4 md:gap-5 self-stretch">
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="text-[#10B981] text-[10px] tracking-[0.2em] uppercase font-mono">Enterprise Renters</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">On-Demand High-Performance Compute (HPC) & AI Infrastructure.</h2>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    Bypass central power grid constraints and route your corporate workloads through localized,
                    high-performance Grade A Nodes right in your neighborhood.
                  </p>
                </div>
                <div className="rounded-xl border border-[#1F2937] p-4 bg-[#0B0C0E]">
                  <ul className="space-y-3 text-sm leading-6 text-[#D1D5DB]">
                    <li className="flex gap-3"><span className="text-[#10B981] font-bold">[✓]</span><span>On-demand local GPU processing at a 40%–60% cost reduction compared to legacy AWS, Microsoft Azure, and Google Cloud pricing models.</span></li>
                    <li className="flex gap-3"><span className="text-[#10B981] font-bold">[✓]</span><span>Plug-and-play architecture optimized for AI Inference/Training, Financial Backtesting, Risk Simulations, and Heavy Data Pipelines.</span></li>
                    <li className="flex gap-3"><span className="text-[#10B981] font-bold">[✓]</span><span>On-demand deployment with no corporate procurement bureaucracy or restrictive multi-year contracts.</span></li>
                    <li className="flex gap-3"><span className="text-[#10B981] font-bold">[✓]</span><span>Up to $1M SLA-backed liability insurance underwritten by Chubb & AIG syndicates, protecting corporate data payloads against transmission failures or operational downtime.</span></li>
                    <li className="flex gap-3"><span className="text-[#10B981] font-bold">[✓]</span><span>500 free pilot compute hours allocated instantly to your organization upon launch.</span></li>
                  </ul>
                </div>
                <div className="rounded-xl border border-[#1F2937] p-4 bg-[#0B0C0E]">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-[#6B7280]">
                    <span>Institutional Founders Claimed</span>
                    <span className="font-mono text-[#10B981]">{counters.renterCounter.toLocaleString()} / 500</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-[#1F2937] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${renterProgress}%`, backgroundColor: "#10B981" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <p className="text-center text-[11px] font-mono text-[#10B981]/70">
                    ⚡ First 500 organizations lock in a Guaranteed 15% Lifetime Discount on baseline contract capacities.
                  </p>
                  {renterDone ? (
                    <SuccessCard type="renter" onClose={() => setRenterDone(false)} />
                  ) : (
                    <>
                      <RenterForm onSuccess={onRenterSuccess} />
                      <p className="text-center text-[11px] font-mono text-white/60">
                        🔒 Non-Binding / Zero Financial Commitment
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div ref={providerRef} className="h-full rounded-2xl border border-[#1F2937] bg-[#0f1117] p-6 flex flex-col scroll-mt-20">
              <div className="grid grid-rows-[auto_1fr_auto_auto] gap-4 md:gap-5 self-stretch">
                <div className="flex flex-col items-start">
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
                    <li className="flex gap-3"><span className="text-[#3B82F6] font-bold">[✓]</span><span>Complete flexibility: Monetize night-time idle windows (12 AM–8 AM) to offset local Meralco spikes, or dedicate clusters 24/7 for maximum revenue yield.</span></li>
                    <li className="flex gap-3"><span className="text-[#3B82F6] font-bold">[✓]</span><span>Lock in an elite 90% gross payout split for your first 12 months of deployment before resetting to our standard 80% tier.</span></li>
                    <li className="flex gap-3"><span className="text-[#3B82F6] font-bold">[✓]</span><span>Up to $1M enterprise-grade asset liability coverage placed through Lloyd's of London, underwriting your physical clusters against workload-induced operational risks.</span></li>
                    <li className="flex gap-3"><span className="text-[#3B82F6] font-bold">[✓]</span><span>Turnkey deployment via our secure, lightweight background Node Daemon with zero daily IT maintenance.</span></li>
                  </ul>
                </div>
                <div className="rounded-xl border border-[#1F2937] p-4 bg-[#0B0C0E]">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-[#6B7280]">
                    <span>Verified Regional GPUs Reserved</span>
                    <span className="font-mono text-[#3B82F6]">{counters.gpuCounter.toLocaleString()} / 15,000</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-[#1F2937] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${gpuProgress}%`, backgroundColor: "#3B82F6" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  {providerDone ? (
                    <SuccessCard type="provider" onClose={() => setProviderDone(false)} />
                  ) : (
                    <>
                      <ProviderForm onSuccess={onProviderSuccess} />
                      <p className="text-center text-[11px] font-mono text-white/60">
                        🔒 Non-Binding / Zero Hardware Allocation Commitment
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {vaultOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8" onClick={() => setVaultOpen(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />
          <div
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-[#1F2937] bg-[#0B0C0E]/95 shadow-[0_0_80px_rgba(0,0,0,0.65)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#1F2937] px-6 py-5">
              <div>
                <p className="text-[#10B981] text-[10px] tracking-[0.2em] uppercase font-mono">Institutional Due Diligence & Compliance Vault</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">Compliance Vault</h2>
              </div>
              <button
                onClick={() => setVaultOpen(false)}
                className="h-10 w-10 rounded-full border border-[#1F2937] text-[#D1D5DB] hover:text-white hover:border-[#10B981] transition-colors"
                aria-label="Close compliance vault"
              >
                ✕
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 p-6">
              {VAULT_CARDS.map((card, index) => (
                <div key={card.title} className="rounded-2xl border border-[#1F2937] bg-[#11131A] p-5 flex flex-col gap-4">
                  <div>
                    <h3 className="text-lg font-bold leading-snug">{card.title}</h3>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#6B7280] mt-2">{card.subtitle}</p>
                  </div>
                  <button
                    onClick={() => handleVaultAction(index)}
                    className="mt-auto rounded-lg border border-[#10B981] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#10B981] hover:bg-[#10B981]/10 transition-colors"
                  >
                    {card.action}
                  </button>
                  <p className={`text-[11px] font-mono text-[#10B981] transition-opacity duration-300 ${vaultSuccess[index] ? "opacity-100" : "opacity-0"}`}>
                    ✓ Secure Access Link Sent to Registered Corporate Email
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <section id="calculator" className="w-full snap-start scroll-mt-24 min-h-[calc(100vh-4rem)] flex items-center justify-center px-8 py-20 box-border">
        <div className="w-full max-w-[1200px] flex flex-col justify-center items-center px-0">
          <div className="w-full rounded-3xl border border-[#1F2937] bg-[#0f1117]/90 backdrop-blur-xl p-8 md:p-12">
            <div className="flex flex-col gap-2 mb-6 text-center">
              <p className="text-[#10B981] text-[10px] uppercase tracking-[0.2em] font-mono">Institutional Arbitrage Calculator</p>
              <h2 className="text-2xl md:text-3xl font-bold">Compute Arbitrage Calculator</h2>
            </div>

            <div className="flex justify-center w-full">
              <div className="w-full max-w-[1120px] grid lg:grid-cols-[1.1fr_1.4fr] gap-6 mx-auto">
                <div className="rounded-2xl border border-[#1F2937] bg-[#0B0C0E] p-5 md:p-6">
                  <div className="grid gap-5">
                    <div className="grid gap-2">
                      <label className="text-xs uppercase tracking-[0.12em] text-[#6B7280]">Hardware Tier</label>
                      <select
                        value={hardwareTier}
                        onChange={(e) => setHardwareTier(e.target.value as HardwareTier)}
                        className={fieldClass("idle")}
                      >
                        {Object.keys(HARDWARE_RATES).map((tier) => (
                          <option key={tier} value={tier}>
                            {tier}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid gap-3">
                      <div className="flex items-center justify-between gap-4">
                        <label className="text-xs uppercase tracking-[0.12em] text-[#6B7280]">Required Operational Hours per Month</label>
                        <span className="font-mono text-sm text-white">{monthlyHours.toLocaleString()} hrs</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={10000}
                        step={100}
                        value={monthlyHours}
                        onChange={(e) => setMonthlyHours(Number(e.target.value))}
                        className="w-full accent-[#10B981]"
                      />
                      <div className="flex justify-between text-[11px] text-[#4B5563] font-mono">
                        <span>100</span>
                        <span>10,000</span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-[#374151] bg-[#11131A] p-4">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-[#94A3B8] mb-2">Legacy Cloud Cost</p>
                        <p className="text-3xl md:text-4xl font-bold font-mono text-[#E5E7EB]">{formatMoney(legacyMonthlyCost)}</p>
                        <p className="text-xs text-[#6B7280] mt-2">AWS / Azure baseline monthly spend</p>
                      </div>
                      <div className="rounded-2xl border border-[#10B981]/40 bg-[#07130F] p-4">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-[#10B981] mb-2">OmniDiff Cost</p>
                        <p className="text-3xl md:text-4xl font-bold font-mono text-[#10B981]">{formatMoney(omnidiffMonthlyCost)}</p>
                        <p className="text-xs text-[#6B7280] mt-2">60% below legacy market rates</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#1F2937] bg-[#0B0C0E] p-5 md:p-6 flex flex-col justify-between gap-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-[#374151] bg-[#11131A] p-4">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-[#94A3B8] mb-2">Legacy Cloud Rate</p>
                      <p className="text-2xl font-bold font-mono text-white">{formatMoney(legacyRate)}/hr</p>
                    </div>
                    <div className="rounded-2xl border border-[#10B981]/40 bg-[#07130F] p-4">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-[#10B981] mb-2">OmniDiff Rate</p>
                      <p className="text-2xl font-bold font-mono text-[#10B981]">{formatMoney(omnidiffRate)}/hr</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#1F2937] bg-[#0F1117] p-4">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-[#6B7280] mb-3">
                      <span>Annual Capital Saved</span>
                      <span className="font-mono text-[#10B981]">Real-time</span>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#6B7280] mb-2">Estimated Annual Corporate Capital Saved</p>
                      <p className="text-4xl md:text-5xl font-bold font-mono text-[#10B981]">{formatMoney(annualSavings)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="telemetry" className="w-full snap-start scroll-mt-24 min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[1200px] flex flex-col justify-center items-center px-0">
          <div className="w-full rounded-3xl border border-[#1F2937] bg-[#0f1117]/90 backdrop-blur-xl p-8 md:p-12">
            <div className="flex flex-col gap-2 mb-6 text-center">
              <p className="text-[#10B981] text-[10px] uppercase tracking-[0.2em] font-mono">Live Network Telemetry</p>
              <h2 className="text-2xl md:text-3xl font-bold">Global Network Status & Activity Ledger</h2>
            </div>

            <div className="w-full grid lg:grid-cols-3 gap-6 items-stretch">
              <div className="rounded-2xl border border-[#1F2937] bg-[#0B0C0E] p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.12em] text-[#6B7280]">Live Performance Metrics</span>
                </div>
                <div className="space-y-4">
                  {NETWORK_METRICS.map((item) => (
                    <div key={item} className="rounded-xl border border-[#1F2937] bg-[#11131A] px-4 py-3">
                      <p className="text-sm md:text-base font-medium text-[#E5E7EB]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#0B0C0E] p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.12em] text-[#6B7280]">Regional Node Health Check</span>
                </div>
                <div className="h-auto overflow-hidden rounded-xl border border-[#1F2937] bg-[#08110D]">
                  <div className="h-auto animate-pulse-slow px-4 py-4 font-mono text-[12px] leading-7 text-[#A7F3D0]">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <p key={i} className={`${i === nodeTick ? "opacity-100" : "opacity-35"} transition-opacity duration-700`}>
                        {NODE_LOGS[i % NODE_LOGS.length]}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#1F2937] bg-[#0B0C0E] p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.12em] text-[#6B7280]">Secure Transaction Ledger</span>
                </div>
                <div className="space-y-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`rounded-xl border px-4 py-3 font-mono text-[12px] leading-6 transition-all duration-700 ${
                        i === ledgerTick
                          ? "border-[#10B981]/40 bg-[#07130F] text-[#D1FAE5]"
                          : "border-[#1F2937] bg-[#11131A] text-[#94A3B8] opacity-70"
                      }`}
                    >
                      {LEDGER_LOGS[i % LEDGER_LOGS.length]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance / Footer */}
      <section id="compliance" ref={complianceRef} className="border-t border-[#1F2937] snap-start scroll-mt-24 min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-12">
        <div className="max-w-7xl mx-auto w-full">
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
