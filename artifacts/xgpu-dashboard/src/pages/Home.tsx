import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BentoGrid } from "@/components/dashboard/BentoGrid";

export default function Home() {
  const [status, setStatus] = useState<"offline" | "verifying" | "live">("offline");
  const [liveCredits, setLiveCredits] = useState("0.00");
  const [sessionEarnings, setSessionEarnings] = useState("0.0000");
  const [stressState, setStressState] = useState<"stable" | "critical">("stable");
  const [activityLogs, setActivityLogs] = useState([
    "[09:00:21] XGPU Agent Handshake: SUCCESS",
    "[09:15:44] Workload ID #8821 assigned to Node-PH01",
    "[10:30:12] Heartbeat check: STABLE (14ms)",
  ]);
  const [stats, setStats] = useState({
    vramUsedGb: 0,
    vramTotalGb: 12,
    vramPercent: 0,
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
    yield: "0.00",
  });

  React.useEffect(() => {
    if (status !== "live") return;
    const interval = window.setInterval(() => {
      setSessionEarnings((current) => (Number(current) + 0.0001).toFixed(4));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [status]);

  const handleToggle = () => {
    if (status !== "offline") return;
    setStatus("verifying");
    setTimeout(() => {
      setStats((current) => ({
        ...current,
        security: current.security,
      }));
    }, 1500);
    setTimeout(() => {
      setStats((current) => ({
        ...current,
        security: current.security,
      }));
    }, 2500);
    setTimeout(() => {
      setStatus("live");
      setLiveCredits("142.50");
      setStats({
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
    }, 3000);
  };

  const handleResilienceTest = () => {
    if (stressState === "critical") return;
    setStressState("critical");
    setStats((current) => ({ ...current, vramPercent: 100 }));
    setActivityLogs((current) => [
      ...current,
      "[CRITICAL] HOST DISCONNECT",
    ]);
    setTimeout(() => {
      setActivityLogs((current) => [
        ...current,
        "[SYSTEM] Instant Eviction Triggered: Workload 8821 migrated to Standby-Node-SG04 in 450ms.",
      ]);
      setStressState("stable");
      setStats((current) => ({ ...current, vramPercent: status === "live" ? 70 : 0 }));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar live={status === "live"} />
      <main className="flex-1 ml-[260px] flex flex-col min-h-screen overflow-x-hidden">
        <Header status={status} onToggle={handleToggle} />
        <div className="flex-1 overflow-auto">
          <BentoGrid
            stats={{ ...stats, yield: liveCredits }}
            status={status}
            sessionEarnings={sessionEarnings}
            stressState={stressState}
            activityLogs={activityLogs}
            onResilienceTest={handleResilienceTest}
          />
        </div>
      </main>
    </div>
  );
}
