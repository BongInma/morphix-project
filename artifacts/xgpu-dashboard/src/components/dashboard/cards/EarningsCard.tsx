import React from "react";
import { ArrowUpRight } from "lucide-react";

export function EarningsCard() {
  const points = [20, 22, 28, 25, 30, 35, 32, 40, 45, 42];
  const max = Math.max(...points);
  const min = Math.min(...points);
  
  const pathD = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 100;
    const y = 100 - ((p - min) / (max - min)) * 100;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(" ");

  return (
    <div className="glass-panel w-full h-full flex flex-col p-5 bg-gradient-to-br from-primary/10 to-transparent">
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-1">
        Earnings (24H)
      </h3>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-3xl font-mono text-white tracking-tight">$4,280.50</span>
          <div className="flex items-center gap-1 text-emerald-400 mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span className="text-xs font-mono font-bold">+12.4%</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 relative w-full h-[40px]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
          <path 
            d={pathD} 
            fill="none" 
            stroke="currentColor" 
            className="text-emerald-400 opacity-60"
            strokeWidth="3" 
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
