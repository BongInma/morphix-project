import React from "react";
import { ShieldCheck } from "lucide-react";

export function SecurityStatusCard({ items }: { items: string[] }) {
  return (
    <div className="glass-panel w-full h-full p-5">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="h-4 w-4 text-emerald-400" />
        <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
          Security & Trust Status
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.9)]" />
            <span className="text-sm text-white/90">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}