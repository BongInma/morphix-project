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
  res.json({ renterCounter: data.renterCounter, gpuCounter: data.gpuCounter });
});

router.post("/leads/renter", (req, res) => {
  const data = readLeads();
  data.renter_leads.push({ ...req.body, timestamp: new Date().toISOString() });
  data.renterCounter = (data.renterCounter ?? 438) + 1;
  writeLeads(data);
  res.json({ success: true, renterCounter: data.renterCounter, gpuCounter: data.gpuCounter });
});

router.post("/leads/provider", (req, res) => {
  const data = readLeads();
  data.provider_leads.push({ ...req.body, timestamp: new Date().toISOString() });
  const gpuRange: string = req.body.estimatedGpus ?? "20-50";
  const increment = gpuRange === "500+" ? 500 : parseInt(gpuRange.split("-")[0] ?? "20", 10) || 20;
  data.gpuCounter = (data.gpuCounter ?? 12450) + increment;
  writeLeads(data);
  res.json({ success: true, renterCounter: data.renterCounter, gpuCounter: data.gpuCounter });
});

export default router;
