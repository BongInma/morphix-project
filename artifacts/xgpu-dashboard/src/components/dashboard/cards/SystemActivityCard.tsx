import React from "react";

export function SystemActivityCard({ logs }: { logs: string[] }) {
  return (
    <div className="glass-panel w-full h-full p-5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none" />
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase mb-4">
        Network Activity Log
      </h3>
      <div className="font-mono text-xs space-y-2 max-h-40 overflow-y-auto pr-2">
        {logs.map((entry) => (
          <div key={entry} className="text-white/80">
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}