import { Router } from "express";
import supabase, { getWaitlistCount } from "@workspace/db/supabase-client";

const router = Router();

const ADMIN_TOKEN = process.env.ADMIN_TELEMETRY_TOKEN ?? "";

function isAuthorized(req: import("express").Request): boolean {
  const header = req.headers.authorization ?? "";
  const bearerToken = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const queryToken = (req.query.token as string) ?? "";
  const token = bearerToken || queryToken;
  return !!token && token === ADMIN_TOKEN;
}

router.get("/internal/telemetry-analytics", async (req, res) => {
  if (!ADMIN_TOKEN) {
    req.log.warn("ADMIN_TELEMETRY_TOKEN not configured");
    res.status(503).json({
      success: false,
      error: "Admin telemetry endpoint is not configured on this server.",
    });
    return;
  }

  if (!isAuthorized(req)) {
    req.log.warn("unauthorized telemetry-analytics access attempt");
    res.status(401).json({
      success: false,
      error: "Unauthorized. Valid admin token required.",
    });
    return;
  }

  if (!supabase) {
    req.log.error("Supabase client not initialized");
    res.status(503).json({
      success: false,
      error: "Database connection unavailable.",
    });
    return;
  }

  const waitlistCountResult = await getWaitlistCount();
  const waitlistCount = waitlistCountResult.count ?? 0;
  const waitlistCountError = waitlistCountResult.error ?? null;

  const { data: recentSubscribers, error: recentError } = await supabase
    .from("waitlist_subscribers")
    .select("id, full_name, company_name, professional_email, inquiry_type, submission_timestamp")
    .order("submission_timestamp", { ascending: false })
    .limit(20);

  const { data: telemetryAgg, error: telemetryError } = await supabase
    .from("calculator_telemetry_logs")
    .select("id, selected_hardware_tier, monthly_operational_hours, calculated_legacy_cost, calculated_omnidiff_cost, estimated_annual_savings, session_ip_hash, calculation_timestamp")
    .order("calculation_timestamp", { ascending: false })
    .limit(20);

  const { count: totalTelemetrySessions, error: countError } = await supabase
    .from("calculator_telemetry_logs")
    .select("*", { count: "exact", head: true });

  let avgAnnualSavings: number | null = null;
  let minAnnualSavings: number | null = null;
  let maxAnnualSavings: number | null = null;
  let totalLegacyCost: number | null = null;
  let totalOmnidiffCost: number | null = null;

  if (!telemetryError && telemetryAgg && telemetryAgg.length > 0) {
    const savings = telemetryAgg.map((r) => Number(r.estimated_annual_savings) || 0);
    const legacy = telemetryAgg.map((r) => Number(r.calculated_legacy_cost) || 0);
    const omnidiff = telemetryAgg.map((r) => Number(r.calculated_omnidiff_cost) || 0);

    avgAnnualSavings = savings.reduce((a, b) => a + b, 0) / savings.length;
    minAnnualSavings = Math.min(...savings);
    maxAnnualSavings = Math.max(...savings);
    totalLegacyCost = legacy.reduce((a, b) => a + b, 0);
    totalOmnidiffCost = omnidiff.reduce((a, b) => a + b, 0);
  }

  const errors: string[] = [];
  if (waitlistCountError) errors.push(`waitlistCount: ${waitlistCountError}`);
  if (recentError) errors.push(`recentSubscribers: ${recentError.message}`);
  if (telemetryError) errors.push(`telemetryAgg: ${telemetryError.message}`);
  if (countError) errors.push(`telemetryCount: ${countError.message}`);

  res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    waitlist: {
      totalCount: waitlistCount,
      recentSubscribers: recentSubscribers ?? [],
    },
    telemetry: {
      totalSessions: totalTelemetrySessions ?? 0,
      recentSessions: telemetryAgg ?? [],
      aggregates: {
        averageEstimatedAnnualSavings: avgAnnualSavings,
        minEstimatedAnnualSavings: minAnnualSavings,
        maxEstimatedAnnualSavings: maxAnnualSavings,
        totalLegacyCost: totalLegacyCost,
        totalOmnidiffCost: totalOmnidiffCost,
      },
    },
    errors: errors.length > 0 ? errors : undefined,
  });
});

export default router;
