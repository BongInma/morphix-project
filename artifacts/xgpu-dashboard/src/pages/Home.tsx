import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BentoGrid } from "@/components/dashboard/BentoGrid";

export default function Home() {
  const [stats] = useState({
    vramUsedGb: 8.4,
    vramTotalGb: 12,
    vramPercent: 70,
    security: [
      "Isolated Sandbox (TEE Verified)",
      "AES-256 Memory Encryption: ACTIVE",
      "Hardware Attestation: PASSED",
    ],
    connectivity: {
      latency: "14ms",
      egress: "Neutral/Unrestricted",
      discovery: "Active",
    },
    yield: "142.50",
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <main className="flex-1 ml-[260px] flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <div className="flex-1 overflow-auto">
          <BentoGrid stats={stats} />
        </div>
      </main>
    </div>
  );
}
