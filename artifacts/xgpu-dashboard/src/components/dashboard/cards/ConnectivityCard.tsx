import React from "react";

export function ConnectivityCard({
  metrics,
}: {
  metrics: {
    latency: string;
    egress: string;
    discovery: string;
  };
}) {
  return (
    <div className="glass-panel w-full h-full p-5">
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase mb-4">
        Connectivity Intelligence
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          ["Latency", metrics.latency],
          ["Egress Status", metrics.egress],
          ["Peer Discovery", metrics.discovery],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
            <div className="mt-2 text-lg text-white">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}