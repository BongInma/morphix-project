import React from "react";
import { Lock } from "lucide-react";

export function AptaFetLockedCard() {
  return (
    <div className="glass-panel w-full min-h-full p-8 flex flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center gap-2">
        <Lock className="h-4 w-4 text-white/50" />
        <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
          APTAFET METABOLIC SYNC
        </h3>
      </div>
      <p className="mt-4 text-xs text-muted-foreground uppercase tracking-[0.2em] text-center">
        Module Locked - Pending Deployment Q4
      </p>
    </div>
  );
}