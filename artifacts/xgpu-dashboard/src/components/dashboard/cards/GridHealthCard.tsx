import React from "react";

export function GridHealthCard({
  onResilienceTest,
  stressState,
}: {
  onResilienceTest: () => void;
  stressState: "stable" | "critical";
}) {
  return (
    <div className="glass-panel w-full min-h-full p-8 flex flex-col items-center justify-center text-center">
      <div className="w-full">
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