import React from "react";
import { SupplyMapCard } from "./cards/SupplyMapCard";
import { ThroughputCard } from "./cards/ThroughputCard";
import { EarningsCard } from "./cards/EarningsCard";
import { WorkloadsCard } from "./cards/WorkloadsCard";
import { InventoryCard } from "./cards/InventoryCard";
import { EventsCard } from "./cards/EventsCard";
import { LatencyCard } from "./cards/LatencyCard";
import { VramGaugeCard } from "./cards/VramGaugeCard";
import { SecurityStatusCard } from "./cards/SecurityStatusCard";
import { ConnectivityCard } from "./cards/ConnectivityCard";
import { YieldCalculatorCard } from "./cards/YieldCalculatorCard";

export function BentoGrid({
  stats,
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
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
      <div className="md:col-span-3 h-[400px]">
        <SupplyMapCard />
      </div>
      <div className="md:col-span-1 flex flex-col gap-6 h-[400px]">
        <div className="flex-1">
          <EarningsCard />
        </div>
        <div className="flex-1">
          <ThroughputCard />
        </div>
      </div>

      <div className="md:col-span-2 min-h-[300px]">
        <WorkloadsCard />
      </div>
      <div className="md:col-span-1 min-h-[300px]">
        <VramGaugeCard
          usedGb={stats.vramUsedGb}
          totalGb={stats.vramTotalGb}
          percent={stats.vramPercent}
        />
      </div>
      <div className="md:col-span-1 min-h-[300px]">
        <SecurityStatusCard items={stats.security} />
      </div>

      <div className="md:col-span-2 min-h-[250px]">
        <ConnectivityCard metrics={stats.connectivity} />
      </div>
      <div className="md:col-span-2 min-h-[250px]">
        <YieldCalculatorCard amount={stats.yield} />
      </div>

      <div className="md:col-span-2 min-h-[300px]">
        <InventoryCard />
      </div>
      <div className="md:col-span-2 min-h-[300px]">
        <LatencyCard />
      </div>

      <div className="md:col-span-4 min-h-[250px]">
        <EventsCard />
      </div>
    </div>
  );
}