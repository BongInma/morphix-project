import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BentoGrid } from "@/components/dashboard/BentoGrid";

type GridStatus = "offline" | "verifying" | "live" | "decommissioning";

export default function Home() {
  const [status, setStatus] = useState<GridStatus>("offline");
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
  const [liveStatsSnapshot, setLiveStatsSnapshot] = useState({
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
  const [pendingToggleTimeouts, setPendingToggleTimeouts] = useState<number[]>([]);

  React.useEffect(() => {
    if (status !== "live") return;
    const interval = window.setInterval(() => {
      setSessionEarnings((current) => (Number(current) + 0.0001).toFixed(4));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [status]);

  const clearPendingToggleTimeouts = () => {
    pendingToggleTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    setPendingToggleTimeouts([]);
  };

  const handleToggle = () => {
    if (status === "verifying") return;
    clearPendingToggleTimeouts();
    if (status === "live") {
      setStatus("decommissioning");
      setActivityLogs((current) => [
        ...current,
        "[SYSTEM] Draining active workloads... Instant Eviction protocol initiated for all tenants.",
      ]);
      const shutdownTimeout = window.setTimeout(() => {
        setStatus("offline");
        setStats((current) => ({
          ...current,
          vramPercent: 0,
          vramUsedGb: 0,
        }));
      }, 2000);
      setPendingToggleTimeouts([shutdownTimeout]);
      return;
    }
    if (status !== "offline") return;
    setStatus("verifying");
    const firstTimeout = window.setTimeout(() => {
      setStats((current) => ({
        ...current,
        security: current.security,
      }));
    }, 1500);
    const secondTimeout = window.setTimeout(() => {
      setStats((current) => ({
        ...current,
        security: current.security,
      }));
    }, 2500);
    const finalTimeout = window.setTimeout(() => {
      setStatus("live");
      setLiveCredits("142.50");
      setStats(liveStatsSnapshot);
    }, 3000);
    setPendingToggleTimeouts([firstTimeout, secondTimeout, finalTimeout]);
  };

  const startHandshake = () => {
    handleToggle();
  };

  const handleResilienceTest = () => {
    if (stressState === "critical") return;
    setStressState("critical");
    setStats((current) => ({ ...current, vramPercent: 100 }));
    setActivityLogs((current) => [
      ...current,
      "[CRITICAL] Host Signal Lost... Initiating Instant Eviction.",
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
      <main className={`flex-1 ml-[260px] flex flex-col min-h-screen overflow-x-hidden ${status === "decommissioning" ? "shadow-[inset_0_0_120px_rgba(251,146,60,0.18)]" : status === "live" ? "shadow-[inset_0_0_120px_rgba(34,197,94,0.16)]" : ""}`}>
        <Header status={status === "decommissioning" ? "verifying" : status} onToggle={handleToggle} />
        <div className="flex-1 overflow-auto">
          <BentoGrid
            stats={{ ...stats, yield: liveCredits }}
            status={status === "decommissioning" ? "verifying" : status}
            sessionEarnings={sessionEarnings}
            stressState={stressState}
            activityLogs={activityLogs}
            onResilienceTest={handleResilienceTest}
            onStartHandshake={startHandshake}
          />
        </div>
      </main>
    </div>
  );
}
