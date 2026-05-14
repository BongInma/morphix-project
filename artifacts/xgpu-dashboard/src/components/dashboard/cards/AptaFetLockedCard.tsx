import React from "react";
import { Lock } from "lucide-react";

export function AptaFetLockedCard() {
  return (
    <div className="glass-panel w-full h-full p-5 flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-white/50" />
        <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
          APTAFET METABOLIC SYNC
        </h3>
      </div>
      <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
        Module Locked - Pending Deployment Q4
      </p>
    </div>
  );
}