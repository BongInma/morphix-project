import { Router } from "express";
import { z } from "zod";
import { logCalculatorEvent } from "@workspace/db/supabase-client";
import { hashIp } from "../lib/hashIp";

const router = Router();

const TelemetrySchema = z.object({
  selected_hardware_tier: z.string().min(1).max(200),
  monthly_operational_hours: z.number().min(0).max(744),
  calculated_legacy_cost: z.number().min(0),
  calculated_omnidiff_cost: z.number().min(0),
  estimated_annual_savings: z.number().min(0),
});

router.post("/api/telemetry/log-calculator", async (req, res) => {
  const parsed = TelemetrySchema.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.flatten() }, "telemetry validation failed");
    res.status(400).json({ success: false, error: "Invalid telemetry payload" });
    return;
  }

  const ipHash = hashIp(req.headers["x-forwarded-for"] as string | undefined);

  const result = await logCalculatorEvent({
    selected_hardware_tier: parsed.data.selected_hardware_tier,
    monthly_operational_hours: parsed.data.monthly_operational_hours,
    calculated_legacy_cost: parsed.data.calculated_legacy_cost,
    calculated_omnidiff_cost: parsed.data.calculated_omnidiff_cost,
    estimated_annual_savings: parsed.data.estimated_annual_savings,
    session_ip_hash: ipHash,
  });

  if (!result.success) {
    req.log.warn({ reason: "telemetry insert failed" }, "calculator telemetry dropped");
    res.status(500).json({ success: false, error: "Telemetry logging failed." });
    return;
  }

  req.log.info({ ipHash }, "calculator telemetry logged");
  res.status(204).send();
});

export default router;
