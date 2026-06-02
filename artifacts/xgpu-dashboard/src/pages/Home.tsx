import { useState, useEffect, useCallback } from "react";
import OmniDiffLogo from "@/components/OmniDiffLogo";

interface TelemetrySubscriber {
  id: number;
  full_name: string;
  company_name: string | null;
  professional_email: string;
  inquiry_type: string;
  submission_timestamp: string;
}

interface TelemetryAnalytics {
  success: boolean;
  timestamp: string;
  waitlist: {
    totalCount: number;
    recentSubscribers: TelemetrySubscriber[];
  };
  telemetry: {
    totalSessions: number;
    recentSessions: unknown[];
    aggregates: {
      averageEstimatedAnnualSavings: number | null;
      minEstimatedAnnualSavings: number | null;
      maxEstimatedAnnualSavings: number | null;
      totalLegacyCost: number | null;
      totalOmnidiffCost: number | null;
    };
  };
  errors?: string[];
}

function getInquiryTypeBadge(type: string) {
  const t = type.toLowerCase();
  if (t.includes("investor")) {
    return "bg-emerald/10 text-emerald border-emerald/30";
  }
  if (t.includes("rent")) {
    return "bg-electric/10 text-electric border-electric/30";
  }
  if (t.includes("provider")) {
    return "bg-amber/10 text-amber border-amber/30";
  }
  return "bg-text-muted/10 text-text-muted border-text-muted/30";
}

function getInquiryTypeLabel(type: string) {
  const t = type.toLowerCase();
  if (t.includes("investor")) return "Investor";
  if (t.includes("rent")) return "Renter";
  if (t.includes("provider")) return "Provider";
  return type;
}

function formatCurrency(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(ts: string): string {
  if (!ts) return "—";
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Home() {
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<TelemetryAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState("");

  const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

  const fetchAnalytics = useCallback(
    async (authToken: string) => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${BASE}/api/internal/telemetry-analytics?token=${encodeURIComponent(authToken)}`,
        );
        const json = await res.json();
        if (res.status === 401) {
          setIsAuthenticated(false);
          setError("Invalid administrative token. Access denied.");
          return;
        }
        if (res.status === 503) {
          setError("Telemetry endpoint is not configured.");
          return;
        }
        if (!res.ok) {
          setError(json.error || "Failed to load telemetry data.");
          return;
        }
        setData(json);
        setIsAuthenticated(true);
      } catch {
        setError("Network error. Could not reach telemetry server.");
      } finally {
        setLoading(false);
      }
    },
    [BASE],
  );

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) {
      setToken(saved);
      fetchAnalytics(saved);
    }
  }, [fetchAnalytics]);

  const handleLogin = () => {
    if (!inputValue.trim()) return;
    sessionStorage.setItem("admin_token", inputValue.trim());
    setToken(inputValue.trim());
    fetchAnalytics(inputValue.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken("");
    setInputValue("");
    setIsAuthenticated(false);
    setData(null);
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="w-full bg-obsidian text-text-primary min-h-screen">
      {/* SECURE AUTHORIZATION GATEWAY */}
      {!isAuthenticated && (
        <div className="w-full flex items-start justify-center px-6 py-20">
          <div className="w-full max-w-md rounded-2xl border border-surface-border bg-surface p-8 shadow-[0_0_60px_rgba(0,0,0,0.6)]">
            <div className="mb-6 text-center">
              <span className="inline-block rounded border border-electric/30 bg-electric/5 px-2 py-1 font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-[0.2em] text-electric">
                [ADMIN PORTAL]
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary">
                Telemetry Dashboard
              </h2>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-text-muted leading-relaxed">
                Secure access to Morphix internal analytics. Enter your administrative token to proceed.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-[0.15em] text-text-muted">
                  Enter Administrative Telemetry Token
                </label>
                <input
                  type="password"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Your secure access phrase..."
                  className="w-full rounded-lg border border-surface-border bg-obsidian px-4 py-3 font-[family-name:var(--font-dmmono)] text-sm text-text-primary outline-none transition-all focus:border-electric focus:shadow-[0_0_12px_rgba(0,194,255,0.25)]"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={loading || !inputValue.trim()}
                className="w-full rounded-lg bg-electric px-6 py-3 font-[family-name:var(--font-dmmono)] text-sm font-bold text-obsidian transition-all hover:bg-electric/90 hover:shadow-[0_0_20px_rgba(0,194,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Authenticating..." : "Access Telemetry"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD CONTENT */}
      {isAuthenticated && data && (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Bar */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <OmniDiffLogo size="sm" showWordmark={true} />
                <span className="inline-block rounded border border-emerald/30 bg-emerald/5 px-2 py-1 font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-[0.2em] text-emerald">
                  [LIVE ANALYTICS]
                </span>
              </div>
              <h1 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-text-primary">
                OmniDiff Telemetry Pipeline
              </h1>
              <p className="mt-1 font-[family-name:var(--font-dmmono)] text-xs text-text-muted">
                Last synced: {data.timestamp ? formatDate(data.timestamp) : "—"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-surface-border px-4 py-2 font-[family-name:var(--font-dmmono)] text-xs text-text-muted transition-all hover:border-red-500/50 hover:text-red-400"
            >
              Secure Logout
            </button>
          </div>

          {/* LOGISTICAL METRIC CARDS — TOP ROW */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Card 1: Total Registered Leads */}
            <div className="rounded-xl border border-surface-border bg-surface p-6">
              <div className="mb-2 font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-[0.15em] text-text-muted">
                Total Registered Leads
              </div>
              <div className="font-[family-name:var(--font-syne)] text-3xl font-bold text-text-primary">
                {data.waitlist.totalCount}
              </div>
              <div className="mt-2 font-[family-name:var(--font-inter)] text-xs text-text-muted">
                Active waitlist subscribers
              </div>
            </div>

            {/* Card 2: Calculator Session Traffic */}
            <div className="rounded-xl border border-surface-border bg-surface p-6">
              <div className="mb-2 font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-[0.15em] text-text-muted">
                Calculator Session Traffic
              </div>
              <div className="font-[family-name:var(--font-syne)] text-3xl font-bold text-electric">
                {data.telemetry.totalSessions}
              </div>
              <div className="mt-2 font-[family-name:var(--font-inter)] text-xs text-text-muted">
                Total telemetry sessions logged
              </div>
            </div>

            {/* Card 3: Projected Annual Savings */}
            <div className="rounded-xl border border-surface-border bg-surface p-6">
              <div className="mb-2 font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-[0.15em] text-text-muted">
                Projected Annual Savings
              </div>
              <div className="font-[family-name:var(--font-syne)] text-3xl font-bold text-emerald">
                {formatCurrency(data.telemetry.aggregates.averageEstimatedAnnualSavings)}
              </div>
              <div className="mt-2 font-[family-name:var(--font-inter)] text-xs text-text-muted">
                Average per calculator session
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY DATA TABLE */}
          <div className="w-full rounded-xl border border-surface-border bg-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-[family-name:var(--font-syne)] text-lg font-bold text-text-primary">
                Recent Waitlist Subscribers
              </h3>
              <span className="rounded border border-surface-border bg-obsidian px-2 py-1 font-[family-name:var(--font-dmmono)] text-[10px] text-text-muted">
                {data.waitlist.recentSubscribers.length} / 20
              </span>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-surface-border">
                    <th className="px-4 py-3 text-left font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-[0.15em] text-text-muted">
                      Full Name
                    </th>
                    <th className="px-4 py-3 text-left font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-[0.15em] text-text-muted">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-[0.15em] text-text-muted">
                      Professional Email
                    </th>
                    <th className="px-4 py-3 text-left font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-[0.15em] text-text-muted">
                      Inquiry Type
                    </th>
                    <th className="px-4 py-3 text-right font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-[0.15em] text-text-muted">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.waitlist.recentSubscribers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center font-[family-name:var(--font-inter)] text-sm text-text-muted"
                      >
                        No subscriber records found.
                      </td>
                    </tr>
                  ) : (
                    data.waitlist.recentSubscribers.map((sub) => (
                      <tr
                        key={sub.id}
                        className="border-b border-surface-border/60 transition-colors hover:bg-obsidian/50"
                      >
                        <td className="px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-text-primary">
                          {sub.full_name}
                        </td>
                        <td className="px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-text-muted">
                          {sub.company_name || "—"}
                        </td>
                        <td className="px-4 py-3 font-[family-name:var(--font-dmmono)] text-sm text-text-mono">
                          {sub.professional_email}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded border px-2 py-0.5 font-[family-name:var(--font-dmmono)] text-[10px] uppercase tracking-wider ${getInquiryTypeBadge(sub.inquiry_type)}`}
                          >
                            {getInquiryTypeLabel(sub.inquiry_type)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-[family-name:var(--font-dmmono)] text-xs text-text-muted">
                          {formatDate(sub.submission_timestamp)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center font-[family-name:var(--font-dmmono)] text-[10px] text-text-muted/60">
            Data sourced from /api/internal/telemetry-analytics
            &nbsp;&middot;&nbsp;
            {data.errors && data.errors.length > 0
              ? `Warnings: ${data.errors.join(", ")}`
              : "All systems operational"}
          </div>
        </div>
      )}
    </div>
  );
}
