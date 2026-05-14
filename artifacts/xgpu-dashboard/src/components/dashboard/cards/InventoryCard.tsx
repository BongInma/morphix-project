import React from "react";

export function InventoryCard() {
  const inventory = [
    { tier: "H100 SXM", count: 48, total: 64, color: "bg-primary" },
    { tier: "A100 80GB", count: 128, total: 128, color: "bg-emerald-400" },
    { tier: "RTX 4090", count: 256, total: 512, color: "bg-blue-400" },
    { tier: "RTX A6000", count: 42, total: 120, color: "bg-slate-400" },
  ];

  return (
    <div className="glass-panel w-full h-full flex flex-col p-5">
      <h3 className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase mb-4">
        GPU Inventory
      </h3>
      
      <div className="flex flex-col gap-4">
        {inventory.map((item) => {
          const pct = Math.round((item.count / item.total) * 100);
          return (
            <div key={item.tier} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-medium tracking-wide text-white uppercase">{item.tier}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{item.count} / {item.total}</span>
              </div>
              <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full ${item.color} shadow-[0_0_8px_currentColor]`} 
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
