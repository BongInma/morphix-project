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
    <div className="glass-panel relative z-10 w-full min-h-full p-8 flex flex-col items-center justify-center text-center">
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase mb-4 relative z-10">
        Connectivity Intelligence
      </h3>
      <div className="flex flex-wrap gap-4 relative z-10 w-full justify-center">
        {[
          ["Latency", metrics.latency],
          ["Egress Status", metrics.egress],
          ["Peer Discovery", metrics.discovery],
        ].map(([label, value]) => (
          <div key={label} className="min-h-[92px] min-w-fit w-full flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 pr-4 backdrop-blur-md text-center">
            <div className="block mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
            <div className="text-[0.9rem] font-medium text-white/95 whitespace-normal break-words">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}