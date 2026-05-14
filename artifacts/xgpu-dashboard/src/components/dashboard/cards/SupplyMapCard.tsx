import React from "react";
import { motion } from "framer-motion";

export function SupplyMapCard({ status }: { status: "offline" | "verifying" | "live" }) {
  const nodes = [
    { x: "25%", y: "40%" },
    { x: "20%", y: "45%" },
    { x: "48%", y: "30%" },
    { x: "51%", y: "25%" },
    { x: "78%", y: "42%" },
    { x: "82%", y: "50%" },
    { x: "32%", y: "70%" },
  ];

  return (
    <div className="glass-panel w-full h-full flex flex-col">
      <div className="p-5 border-b border-white/10 flex items-center justify-between z-10 relative">
        <h3 className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
          Global XGPU Supply Map
        </h3>
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Active Nodes</span>
            <span className="text-sm font-mono text-white">12,847</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Total VRAM</span>
            <span className="text-sm font-mono text-primary">4.2 PB</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Regions</span>
            <span className="text-sm font-mono text-white">38</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden bg-background/50">
        {status === "verifying" && <div className="absolute inset-0 bg-primary/10 animate-pulse" />}
        {status !== "live" && (
          <button
            type="button"
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold tracking-[0.2em] text-white backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.16)]"
          >
            INITIALIZE XGPU NODE
          </button>
        )}
        {/* Simple inline SVG world map outline */}
        <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="xMidYMid slice">
          <path d="M150,150 Q180,120 220,130 T280,180 T260,250 T200,280 T140,220 Z" fill="currentColor" className="text-primary"/>
          <path d="M400,100 Q450,80 500,120 T550,200 T480,280 T420,240 T380,180 Z" fill="currentColor" className="text-primary"/>
          <path d="M700,180 Q750,150 820,190 T850,280 T780,350 T720,290 T680,230 Z" fill="currentColor" className="text-primary"/>
          <path d="M250,320 Q280,300 320,330 T340,400 T290,450 T240,410 T220,360 Z" fill="currentColor" className="text-primary"/>
          <path d="M520,300 Q560,280 600,320 T620,420 T560,450 T500,400 T480,340 Z" fill="currentColor" className="text-primary"/>
        </svg>

        {/* Glowing Nodes */}
        {nodes.map((node, i) => (
          <div key={i} className="absolute" style={{ left: node.x, top: node.y }}>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(0,255,255,1)]"
            />
          </div>
        ))}

        {/* Network Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <path d="M 25% 40% L 48% 30% L 78% 42%" stroke="url(#glow-line)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <path d="M 48% 30% L 51% 25% L 82% 50%" stroke="url(#glow-line)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <path d="M 25% 40% L 32% 70%" stroke="url(#glow-line)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          
          <defs>
            <linearGradient id="glow-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
        {status === "live" && <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-xl shadow-[0_0_50px_rgba(74,222,128,0.55)]" />}
      </div>
    </div>
  );
}
