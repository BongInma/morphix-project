import React from "react";

export function EventsCard() {
  const logs = [
    { time: "14:22:05", level: "info", msg: "Node cfg-eu-west-04 authenticated and joined mesh." },
    { time: "14:21:12", level: "warn", msg: "High latency detected on peer route [sg-sin-01] -> [jp-tyo-02] (245ms)." },
    { time: "14:18:40", level: "info", msg: "Workload WL-9842 checkpoint committed to persistent volume." },
    { time: "14:15:02", level: "error", msg: "PCIe bus error on H100 device 0000:82:00.0. Marked offline." },
    { time: "14:10:55", level: "info", msg: "Grid synchronization completed. 12,847 nodes active." },
  ];

  return (
    <div className="glass-panel w-full h-full flex flex-col p-5">
      <h3 className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase mb-4">
        Recent Events
      </h3>
      
      <div className="flex-1 bg-black/40 rounded-lg border border-white/5 p-4 overflow-hidden font-mono text-[10px]">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3 mb-2 last:mb-0 leading-relaxed">
            <span className="text-slate-500 shrink-0">{log.time}</span>
            <span className={`shrink-0 w-10 uppercase ${
              log.level === 'error' ? 'text-red-400' : 
              log.level === 'warn' ? 'text-amber-400' : 
              'text-primary'
            }`}>
              [{log.level}]
            </span>
            <span className="text-slate-300 break-all">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
