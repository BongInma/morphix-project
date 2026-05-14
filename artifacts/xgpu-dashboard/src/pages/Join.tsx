import React from "react";
import { Link } from "wouter";

export default function Join() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-8 py-10">
        <Link href="/" className="inline-flex items-center text-sm tracking-[0.2em] uppercase text-white font-semibold">
          MORPHIX SYSTEMS INC.
        </Link>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="glass-panel p-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Expression of Interest</p>
              <h1 className="mt-2 text-2xl font-semibold text-white">Join as a Resource Provider</h1>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted-foreground">
              Hardware Resource Pledge: I confirm access to enterprise-grade GPU resources, sustained uptime, and operational compliance for Morphix workload delivery.
            </div>
            <form className="grid gap-4">
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
          <section className="glass-panel p-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Expression of Interest</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Join as a Compute Renter</h2>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted-foreground">
              Early Access & Savings Commitment: I’m seeking early access to Morphix compute with transparent savings over traditional cloud procurement.
            </div>
            <form className="grid gap-4">
              <input className="rounded-xl border border-white/10 bg-background/60 px-4 py-3" placeholder="Name" />
              <input className="rounded-xl border border-white/10 bg-background/60 px-4 py-3" placeholder="Email" />
              <input className="rounded-xl border border-white/10 bg-background/60 px-4 py-3" placeholder="Monthly Spend" />
              <label className="flex items-center gap-3 text-sm text-muted-foreground">
                <input type="checkbox" />
                I Agree
              </label>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}