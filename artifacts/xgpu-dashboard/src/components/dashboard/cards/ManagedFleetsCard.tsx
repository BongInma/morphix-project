import React from "react";

export function ManagedFleetsCard() {
  const pixels = Array.from({ length: 100 });

  return (
    <div className="glass-panel p-6 h-full flex flex-col gap-4">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/70">Managed Fleets</h3>
          <p className="mt-2 text-lg font-semibold text-white">Accenture Global</p>
          <p className="text-sm text-muted-foreground">Tier 1 Verified Provider</p>
        </div>
        <div className="grid grid-cols-10 gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-2">
          {pixels.map((_, index) => (
            <span key={index} className="h-2.5 w-2.5 rounded-[2px] bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.35)]" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Nodes</p>
          <p className="mt-2 text-xl font-semibold text-white">100/100 Active</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">VRAM Total</p>
          <p className="mt-2 text-xl font-semibold text-white">2.4 TB</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Accumulated Earnings</p>
          <p className="mt-2 text-xl font-semibold text-primary">$12,450.00</p>
        </div>
      </div>
    </div>
  );
}