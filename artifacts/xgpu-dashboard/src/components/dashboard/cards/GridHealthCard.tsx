import React from "react";

export function GridHealthCard({
  onResilienceTest,
  stressState,
}: {
  onResilienceTest: () => void;
  stressState: "stable" | "critical";
}) {
  return (
    <div className="glass-panel w-full h-full p-5 flex flex-col justify-between">
      <div>
        <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
          Grid Health
        </h3>
        <p className="mt-2 text-sm text-emerald-400 uppercase tracking-[0.2em]">
          {stressState === "critical" ? "CRITICAL" : "STABLE"}
        </p>
      </div>
      <button
        type="button"
        onClick={onResilienceTest}
        className="mt-4 w-fit rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/70"
      >
        TEST RESILIENCE
      </button>
    </div>
  );
}