import { Router } from "express";
import { writeFile } from "fs/promises";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { z } from "zod";
import { logger } from "../lib/logger";

const WORKSPACE_ROOT = join(fileURLToPath(new URL("../../..", import.meta.url)), "");
const LEADS_PATH = join(WORKSPACE_ROOT, "leads.json");

const router = Router();

interface LeadStore {
  renter_leads: object[];
  provider_leads: object[];
  renterCounter: number;
  gpuCounter: number;
}

const INITIAL_STORE: LeadStore = {
  renter_leads: [],
  provider_leads: [],
  renterCounter: 438,
  gpuCounter: 12450,
};

const RenterLeadSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(254),
  company: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
});

const ProviderLeadSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(254),
  gpuModel: z.string().max(200).optional(),
  gpuCount: z.number().int().min(1).max(100000).optional(),
  message: z.string().max(2000).optional(),
});

let cache: LeadStore | null = null;
let writePending = false;

function initStore(): LeadStore {
  if (!existsSync(LEADS_PATH)) {
    writeFileSync(LEADS_PATH, JSON.stringify(INITIAL_STORE, null, 2));
    return { ...INITIAL_STORE, renter_leads: [], provider_leads: [] };
  }
  try {
    const raw = readFileSync(LEADS_PATH, "utf8");
    return JSON.parse(raw) as LeadStore;
  } catch {
    return { ...INITIAL_STORE, renter_leads: [], provider_leads: [] };
  }
}

function getStore(): LeadStore {
  if (!cache) {
    cache = initStore();
  }
  return cache;
}

function scheduleWrite(): void {
  if (writePending) return;
  writePending = true;
  setImmediate(() => {
    writePending = false;
    const snapshot = JSON.stringify(cache, null, 2);
    writeFile(LEADS_PATH, snapshot, "utf8").catch((err: unknown) => {
      logger.error({ err, path: LEADS_PATH }, "Failed to persist lead store to disk");
    });
  });
}

router.get("/counters", (_req, res) => {
  const data = getStore();
  res.json({
    renterCounter: 435 + data.renter_leads.length,
    gpuCounter: 12420 + data.provider_leads.length,
  });
});

router.post("/leads/renter", (req, res) => {
  const result = RenterLeadSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ success: false, error: "Invalid submission" });
    return;
  }
  const data = getStore();
  data.renter_leads.push({ ...result.data, timestamp: new Date().toISOString() });
  scheduleWrite();
  res.json({
    success: true,
    renterCounter: 435 + data.renter_leads.length,
    gpuCounter: 12420 + data.provider_leads.length,
  });
});

router.post("/leads/provider", (req, res) => {
  const result = ProviderLeadSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ success: false, error: "Invalid submission" });
    return;
  }
  const data = getStore();
  data.provider_leads.push({ ...result.data, timestamp: new Date().toISOString() });
  scheduleWrite();
  res.json({
    success: true,
    renterCounter: 435 + data.renter_leads.length,
    gpuCounter: 12420 + data.provider_leads.length,
  });
});

export default router;
