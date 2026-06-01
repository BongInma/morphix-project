import React from "react";
import { Link } from "wouter";

// Formspree external form handler — no backend needed
const FORMSPREE_ID = "xaqkgeal";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Join() {
  const [provider, setProvider] = React.useState({
    fullName: "",
    email: "",
    organization: "",
    fleetSize: "",
    agreed: false,
  });
  const [renter, setRenter] = React.useState({
    fullName: "",
    email: "",
    organization: "",
    agreed: false,
  });
  const [providerState, setProviderState] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [renterState, setRenterState] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const submitProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    if (providerState === "loading") return;
    const email = provider.email.trim();
    if (!EMAIL_REGEX.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!provider.fullName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!provider.agreed) {
      alert("Please agree to the terms to proceed.");
      return;
    }
    setProviderState("loading");
    try {
      const fd = new FormData();
      fd.append("name", provider.fullName.trim());
      fd.append("email", email);
      fd.append("company", provider.organization.trim() || "N/A");
      fd.append("gpu_fleet_size", provider.fleetSize.trim() || "N/A");
      fd.append("inquiry_type", "Provider EOI");
      fd.append("_subject", "Morphix Provider EOI — Join Page");
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        setProviderState("success");
      } else {
        setProviderState("error");
      }
    } catch {
      setProviderState("error");
    }
  };

  const submitRenter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (renterState === "loading") return;
    const email = renter.email.trim();
    if (!EMAIL_REGEX.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!renter.fullName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!renter.agreed) {
      alert("Please agree to the terms to proceed.");
      return;
    }
    setRenterState("loading");
    try {
      const fd = new FormData();
      fd.append("name", renter.fullName.trim());
      fd.append("email", email);
      fd.append("company", renter.organization.trim() || "N/A");
      fd.append("inquiry_type", "Renter EOI");
      fd.append("_subject", "Morphix Renter EOI — Join Page");
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        setRenterState("success");
      } else {
        setRenterState("error");
      }
    } catch {
      setRenterState("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pl-[260px]">
      <div className="mx-auto max-w-6xl px-8 py-10">
        <Link href="/" className="inline-flex items-center text-sm tracking-[0.2em] uppercase text-primary font-semibold">
          ← Back to Dashboard
        </Link>
        <Link href="/" className="mt-6 inline-flex items-center text-sm tracking-[0.2em] uppercase text-white font-semibold">
          MORPHIX SYSTEMS INC.
        </Link>
        <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 px-5 py-4 text-sm font-medium text-white shadow-[0_0_28px_rgba(0,255,255,0.12)]">
          JOIN THE GENESIS QUEUE: Early GPU providers receive First-in-Line Priority and zero commission charges (Free! On us!) on their first 1,000 compute hours.
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {/* Provider Form */}
          <section className="glass-panel p-6 flex flex-col">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Expression of Interest</p>
              <h1 className="mt-2 text-2xl font-semibold text-white">Join as a Resource Provider</h1>
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted-foreground">
              Hardware Resource Pledge: I confirm access to enterprise-grade GPU resources, sustained uptime, and operational compliance for Morphix workload delivery.
            </div>
            <div className="mt-4 rounded-2xl border border-primary/25 bg-white/[0.04] p-4 text-sm leading-6 text-white/90 shadow-[0_0_20px_rgba(0,255,255,0.08)]">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">The Morphix Vault: Total Provider Privacy</p>
              Your private files and your leased compute exist in two different worlds. Our Trusted Execution Environments (TEE) create a hardware-level sandbox. The Pipe only sees the encrypted task; it is physically impossible for a renter to access or see your local drives or personal data.
            </div>
            {providerState === "success" ? (
              <div className="mt-6 rounded-xl border border-emerald/30 bg-emerald/10 p-4 text-sm text-emerald">
                <strong>Expression of Interest Received</strong>
                <p className="mt-1 text-emerald/80">You have been added to the Provider Early Access queue. A confirmation email will be sent shortly.</p>
              </div>
            ) : (
              <form className="mt-4 grid gap-3 flex-1" onSubmit={submitProvider}>
                <label className="grid gap-1.5 text-sm text-slate-400">
                  <span>Name</span>
                  <input
                    value={provider.fullName}
                    onChange={(e) => setProvider((p) => ({ ...p, fullName: e.target.value }))}
                    className="h-[42px] w-full overflow-hidden rounded-xl border border-white/10 bg-background/60 px-2 text-sm leading-normal"
                    placeholder="Name"
                    required
                  />
                </label>
                <label className="grid gap-1.5 text-sm text-slate-400">
                  <span>Email</span>
                  <input
                    value={provider.email}
                    onChange={(e) => setProvider((p) => ({ ...p, email: e.target.value }))}
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    className="h-[42px] w-full overflow-hidden rounded-xl border border-white/10 bg-background/60 px-2 text-sm leading-normal"
                    placeholder="Email"
                    required
                  />
                </label>
                <label className="grid gap-1.5 text-sm text-slate-400">
                  <span>Organization</span>
                  <input
                    value={provider.organization}
                    onChange={(e) => setProvider((p) => ({ ...p, organization: e.target.value }))}
                    className="h-[42px] w-full overflow-hidden rounded-xl border border-white/10 bg-background/60 px-2 text-sm leading-normal"
                    placeholder="Organization"
                  />
                </label>
                <label className="grid gap-1.5 text-sm text-slate-400">
                  <span>GPU Fleet Size</span>
                  <input
                    value={provider.fleetSize}
                    onChange={(e) => setProvider((p) => ({ ...p, fleetSize: e.target.value }))}
                    className="h-[42px] w-full overflow-hidden rounded-xl border border-white/10 bg-background/60 px-2 text-sm leading-normal"
                    placeholder="GPU Fleet Size"
                  />
                </label>
                <label className="flex items-center gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={provider.agreed}
                    onChange={(e) => setProvider((p) => ({ ...p, agreed: e.target.checked }))}
                    required
                  />
                  I Agree
                </label>
                {providerState === "error" && (
                  <p className="text-sm text-red-400">Submission failed. Please try again or contact us directly.</p>
                )}
                <button
                  type="submit"
                  disabled={providerState === "loading"}
                  className="mt-auto rounded-2xl border border-[#00f2fe]/30 bg-white/[0.04] px-5 py-4 text-left text-white transition duration-300 hover:border-[#00f2fe]/70 hover:shadow-[0_0_28px_rgba(0,242,254,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="block text-sm font-semibold tracking-[0.18em] uppercase">
                    {providerState === "loading" ? "SUBMITTING..." : "CONFIRM EXPRESSION OF INTEREST"}
                  </span>
                  <span className="mt-1 block text-[11px] text-muted-foreground">
                    Secure Enrollment into XGPU Early Access Pool
                  </span>
                </button>
              </form>
            )}
          </section>

          {/* Renter Form */}
          <section className="glass-panel p-6 flex flex-col">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Expression of Interest</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Join as a Compute Renter</h2>
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted-foreground">
              Access institutional-grade GPU clusters for 40% less than legacy cloud. Plus, our Permanent Zero Egress policy means moving your results is always free.
            </div>
            {renterState === "success" ? (
              <div className="mt-6 rounded-xl border border-emerald/30 bg-emerald/10 p-4 text-sm text-emerald">
                <strong>Expression of Interest Received</strong>
                <p className="mt-1 text-emerald/80">You have been added to the Renter Early Access queue. A confirmation email will be sent shortly.</p>
              </div>
            ) : (
              <form className="mt-4 grid gap-3 flex-1" onSubmit={submitRenter}>
                <label className="grid gap-1.5 text-sm text-slate-400">
                  <span>Name</span>
                  <input
                    value={renter.fullName}
                    onChange={(e) => setRenter((r) => ({ ...r, fullName: e.target.value }))}
                    className="h-[42px] w-full overflow-hidden rounded-xl border border-white/10 bg-background/60 px-2 text-sm leading-normal"
                    placeholder="Name"
                    required
                  />
                </label>
                <label className="grid gap-1.5 text-sm text-slate-400">
                  <span>Email</span>
                  <input
                    value={renter.email}
                    onChange={(e) => setRenter((r) => ({ ...r, email: e.target.value }))}
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    className="h-[42px] w-full overflow-hidden rounded-xl border border-white/10 bg-background/60 px-2 text-sm leading-normal"
                    placeholder="Email"
                    required
                  />
                </label>
                <label className="grid gap-1.5 text-sm text-slate-400">
                  <span>Organization</span>
                  <input
                    value={renter.organization}
                    onChange={(e) => setRenter((r) => ({ ...r, organization: e.target.value }))}
                    className="h-[42px] w-full overflow-hidden rounded-xl border border-white/10 bg-background/60 px-2 text-sm leading-normal"
                    placeholder="Organization"
                  />
                </label>
                <label className="flex items-center gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={renter.agreed}
                    onChange={(e) => setRenter((r) => ({ ...r, agreed: e.target.checked }))}
                    required
                  />
                  I Agree
                </label>
                {renterState === "error" && (
                  <p className="text-sm text-red-400">Submission failed. Please try again or contact us directly.</p>
                )}
                <button
                  type="submit"
                  disabled={renterState === "loading"}
                  className="rounded-2xl border border-[#00f2fe]/30 bg-white/[0.04] px-5 py-4 text-left text-white transition duration-300 hover:border-[#00f2fe]/70 hover:shadow-[0_0_28px_rgba(0,242,254,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="block text-sm font-semibold tracking-[0.18em] uppercase">
                    {renterState === "loading" ? "SUBMITTING..." : "CONFIRM EXPRESSION OF INTEREST"}
                  </span>
                  <span className="mt-1 block text-[11px] text-muted-foreground">
                    Secure Enrollment into XGPU Early Access Pool
                  </span>
                </button>
              </form>
            )}
          </section>
        </div>
        {(providerState === "success" || renterState === "success") ? (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-white shadow-[0_0_28px_rgba(0,242,254,0.12)] backdrop-blur-xl">
            <h3 className="text-2xl font-semibold">Welcome to the Morphix Ecosystem</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Your interest in the XGPU Network has been recorded. You are now positioned within our priority Early Access tier for the Q3 infrastructure rollout
            </p>
            <Link href="/">
              <button className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-semibold tracking-[0.16em] uppercase text-black">
                ENTER DASHBOARD
              </button>
            </Link>
          </div>
        ) : (
          <p className="mt-8 text-sm leading-6 text-muted-foreground">
            Early Access is a non-binding Expression of Interest (EOI). You are simply securing your spot in the queue. No hardware access or financial commitment is required today.
          </p>
        )}
      </div>
    </div>
  );
}
