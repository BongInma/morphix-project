import React from "react";

export function LatencyCard() {
  const regions = [
    { name: "US-EAST", ping: 12 },
    { name: "EU-WEST", ping: 84 },
    { name: "AP-NORT", ping: 142 },
    { name: "SA-EAST", ping: 215 },
  ];

  return (
    <div className="glass-panel w-full h-full flex flex-col p-5">
      <h3 className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase mb-4">
        Peer Latency
      </h3>
      
      <div className="flex-1 flex items-center justify-center relative">
        {/* Concentric circles */}
        <div className="absolute w-40 h-40 rounded-full border border-white/5"></div>
        <div className="absolute w-24 h-24 rounded-full border border-white/10"></div>
        <div className="absolute w-8 h-8 rounded-full bg-primary/20 border border-primary/50 shadow-[0_0_15px_rgba(0,255,255,0.4)]"></div>
        
        {/* Nodes */}
        {regions.map((r, i) => {
          const angle = (i * (360 / regions.length)) * (Math.PI / 180);
          // Distance based on ping (mocked mapping)
          const radius = r.ping < 50 ? 24 : r.ping < 100 ? 48 : 80;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          const dotColor = r.ping < 50 ? 'bg-emerald-400' : r.ping < 150 ? 'bg-amber-400' : 'bg-red-400';

          return (
            <div 
              key={r.name} 
              className="absolute flex flex-col items-center gap-1"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <div className={`w-2 h-2 rounded-full ${dotColor} shadow-[0_0_8px_currentColor]`} />
              <div className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 text-[8px] font-mono text-white whitespace-nowrap">
                {r.name} <span className={r.ping < 50 ? 'text-emerald-400' : r.ping < 150 ? 'text-amber-400' : 'text-red-400'}>{r.ping}ms</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
