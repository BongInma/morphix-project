import React from "react";

export function VramGaugeCard({
  usedGb,
  totalGb,
  percent,
}: {
  usedGb: number;
  totalGb: number;
  percent: number;
}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="glass-panel w-full min-h-full p-8 pt-6 flex flex-col items-center justify-between text-center min-w-[125%]">
      <div className="flex flex-col items-center justify-start gap-4 w-full">
        <div className="w-full">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase text-center w-full">
            VRAM Allocation
          </h3>
          <p className="mt-2 text-[11px] leading-[1.4] text-muted-foreground whitespace-normal break-words">
            GDDR6 Managed - High Efficiency Mode
          </p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-mono text-white">{usedGb}GB</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            of {totalGb}GB
          </div>
        </div>
      </div>

      <div className="relative mx-auto my-4">
        <svg viewBox="0 0 120 120" className="w-44 h-44 -rotate-90">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="url(#vram-gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
          <defs>
            <linearGradient id="vram-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-4xl font-mono text-white">{percent}%</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">
            Allocation
          </div>
        </div>
      </div>
    </div>
  );
}