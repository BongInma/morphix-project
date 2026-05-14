import React from "react";

export function YieldCalculatorCard({ amount }: { amount: string }) {
  return (
    <div className="glass-panel w-full h-full p-5 flex flex-col justify-between">
      <div>
        <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
          Morphix Yield Calculator
        </h3>
        <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Projected Daily Credits
        </div>
        <div className="mt-2 text-5xl font-mono text-white">{amount}</div>
      </div>
      <button
        type="button"
        disabled
        className="mt-6 w-fit rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60 opacity-50"
      >
        Withdraw
      </button>
    </div>
  );
}