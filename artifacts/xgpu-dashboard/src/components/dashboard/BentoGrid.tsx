import React from "react";
import { SupplyMapCard } from "./cards/SupplyMapCard";
import { VramGaugeCard } from "./cards/VramGaugeCard";
import { SecurityStatusCard } from "./cards/SecurityStatusCard";
import { ConnectivityCard } from "./cards/ConnectivityCard";
import { YieldCalculatorCard } from "./cards/YieldCalculatorCard";

export function BentoGrid({
  stats,
  sessionEarnings,
  status,
}: {
  stats: {
    vramUsedGb: number;
    vramTotalGb: number;
    vramPercent: number;
    security: string[];
    connectivity: {
      latency: string;
      egress: string;
      discovery: string;
    };
    yield: string;
  };
  sessionEarnings: string;
  status: "offline" | "verifying" | "live";
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
      <div className="md:col-span-3 h-[400px]">
        <SupplyMapCard status={status} />
      </div>
      <div className="md:col-span-1 flex flex-col gap-6 h-[400px]">
        <VramGaugeCard
          usedGb={stats.vramUsedGb}
          totalGb={stats.vramTotalGb}
          percent={stats.vramPercent}
        />
        <SecurityStatusCard items={stats.security} />
      </div>

      <div className="md:col-span-2 min-h-[250px]">
        <ConnectivityCard metrics={stats.connectivity} />
      </div>
      <div className="md:col-span-2 min-h-[250px]">
        <YieldCalculatorCard amount={stats.yield} />
      </div>
    </div>
  );
}