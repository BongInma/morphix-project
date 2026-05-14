import React from "react";

export function ThroughputCard() {
  const points = [40, 45, 42, 50, 55, 48, 60, 65, 58, 70, 75, 80, 72, 85];
  const max = Math.max(...points);
  const min = Math.min(...points);
  
  const pathD = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 100;
    const y = 100 - ((p - min) / (max - min)) * 100;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(" ");

  return (
    <div className="glass-panel w-full h-full flex flex-col p-5">
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-2">
        Network Throughput
      </h3>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl font-mono text-white">1,204.5</span>
        <span className="text-xs text-primary font-bold tracking-widest">TFLOPS</span>
      </div>
      
      <div className="flex-1 relative w-full h-full min-h-[60px]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path 
            d={`${pathD} L 100 100 L 0 100 Z`} 
            fill="url(#chart-gradient)" 
          />
          <path 
            d={pathD} 
            fill="none" 
            stroke="var(--color-primary)" 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke"
            className="shadow-[0_0_10px_rgba(0,255,255,0.5)]"
          />
        </svg>
      </div>
    </div>
  );
}
