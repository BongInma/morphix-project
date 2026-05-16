import { Router } from "express";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LEADS_PATH = join(__dirname, "../../leads.json");

const router = Router();

function readLeads() {
  if (!existsSync(LEADS_PATH)) {
    const initial = { renter_leads: [], provider_leads: [], renterCounter: 438, gpuCounter: 12450 };
    writeFileSync(LEADS_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(readFileSync(LEADS_PATH, "utf8"));
}

function writeLeads(data: object) {
  writeFileSync(LEADS_PATH, JSON.stringify(data, null, 2));
}

router.get("/counters", (_req, res) => {
  const data = readLeads();
  res.json({
    renterCounter: 435 + (data.renter_leads?.length ?? 0),
    gpuCounter: 12420 + (data.provider_leads?.length ?? 0),
  });
});

router.post("/leads/renter", (req, res) => {
  const data = readLeads();
  data.renter_leads.push({ ...req.body, timestamp: new Date().toISOString() });
  writeLeads(data);
  res.json({
    success: true,
    renterCounter: 435 + data.renter_leads.length,
    gpuCounter: 12420 + data.provider_leads.length,
  });
});

router.post("/leads/provider", (req, res) => {
  const data = readLeads();
  data.provider_leads.push({ ...req.body, timestamp: new Date().toISOString() });
  writeLeads(data);
  res.json({
    success: true,
    renterCounter: 435 + data.renter_leads.length,
    gpuCounter: 12420 + data.provider_leads.length,
  });
});

export default router;
