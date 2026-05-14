import React from "react";
import { Link } from "wouter";

export default function Join() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitted || loading) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
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
          <section className="glass-panel p-6 space-y-4 flex flex-col">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Expression of Interest</p>
              <h1 className="mt-2 text-2xl font-semibold text-white">Join as a Resource Provider</h1>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted-foreground">
              Hardware Resource Pledge: I confirm access to enterprise-grade GPU resources, sustained uptime, and operational compliance for Morphix workload delivery.
            </div>
            <div className="rounded-2xl border border-primary/25 bg-white/[0.04] p-4 text-sm leading-6 text-white/90 shadow-[0_0_20px_rgba(0,255,255,0.08)]">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">The Morphix Vault: Total Provider Privacy</p>
              Your private files and your leased compute exist in two different worlds. Our Trusted Execution Environments (TEE) create a hardware-level sandbox. The Pipe only sees the encrypted task; it is physically impossible for a renter to access or see your local drives or personal data.
            </div>
            <form className="grid gap-3">
              <input className="rounded-xl border border-white/10 bg-background/60 px-4 py-3" placeholder="Name" />
              <input className="rounded-xl border border-white/10 bg-background/60 px-4 py-3" placeholder="Email" />
              <input className="rounded-xl border border-white/10 bg-background/60 px-4 py-3" placeholder="Organization" />
              <input className="rounded-xl border border-white/10 bg-background/60 px-4 py-3" placeholder="GPU Fleet Size" />
              <label className="flex items-center gap-3 text-sm text-muted-foreground">
                <input type="checkbox" />
                I Agree
              </label>
            </form>
          </section>
          <section className="glass-panel p-6 space-y-4 flex flex-col">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Expression of Interest</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Join as a Compute Renter</h2>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted-foreground">
              Access institutional-grade GPU clusters for 40% less than legacy cloud. Plus, our Permanent Zero Egress policy means moving your results is always free.
            </div>
            <form className="grid gap-3" onSubmit={handleSubmit}>
              <input className="rounded-xl border border-white/10 bg-background/60 px-4 py-3" placeholder="Name" />
              <input className="rounded-xl border border-white/10 bg-background/60 px-4 py-3" placeholder="Email" />
              <input className="rounded-xl border border-white/10 bg-background/60 px-4 py-3" placeholder="Organization" />
              <input className="rounded-xl border border-white/10 bg-background/60 px-4 py-3" placeholder="e.g., Accenture or Startup Name" />
              <label className="flex items-center gap-3 text-sm text-muted-foreground">
                <input type="checkbox" />
                I Agree
              </label>
              <button
                type="submit"
                disabled={submitted || loading}
                className="rounded-2xl border border-[#00f2fe]/30 bg-white/[0.04] px-5 py-4 text-left text-white transition duration-300 hover:border-[#00f2fe]/70 hover:shadow-[0_0_28px_rgba(0,242,254,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="block text-sm font-semibold tracking-[0.18em] uppercase">
                  {submitted ? "SUBMITTED" : loading ? "VALIDATING CREDENTIALS..." : "CONFIRM EXPRESSION OF INTEREST"}
                </span>
                <span className="mt-1 block text-[11px] text-muted-foreground">
                  Secure Enrollment into XGPU Early Access Pool
                </span>
              </button>
            </form>
          </section>
        </div>
        {submitted ? (
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