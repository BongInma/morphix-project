// ================================================
// Morphix Systems Inc. — Core Database Module
// File: lib/db/src/supabase-client.ts
// Engine: Supabase (PostgreSQL, hosted)
// Deployment: Vercel / Netlify serverless
// Tables: waitlist_subscribers,
//         investor_data_room_access,
//         calculator_telemetry_logs
// IP Policy: Raw IPs never stored — SHA-256 only
// Schema: Run lib/db/schema.sql in Supabase once
// ================================================

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? "";

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

if (supabase) {
  console.log("[Morphix DB] Supabase client initialized.");
} else {
  console.warn("[Morphix DB] SUPABASE_URL or SUPABASE_ANON_KEY not set. Supabase helpers will fail at runtime.");
}

// Helper 1: Insert waitlist subscriber
async function insertWaitlistSubscriber(data: {
  full_name: string;
  company_name?: string;
  professional_email: string;
  inquiry_type?: string;
}) {
  if (!supabase) {
    return { success: false, reason: "NOT_CONFIGURED", detail: "Supabase client not initialized" };
  }
  const { full_name, company_name, professional_email, inquiry_type = "General" } = data;
  const { data: result, error } = await supabase
    .from("waitlist_subscribers")
    .insert([
      {
        full_name,
        company_name,
        professional_email,
        inquiry_type,
      },
    ])
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { success: false, reason: "EMAIL_EXISTS" };
    }
    console.error("[Morphix DB] insertWaitlistSubscriber:", error.message);
    return { success: false, reason: "DB_ERROR", detail: error.message };
  }
  return { success: true, id: result.id };
}

// Helper 2: Insert data room access request
async function insertDataRoomRequest(data: {
  investor_email: string;
  firm_name?: string;
  document_requested: string;
  access_token: string;
}) {
  if (!supabase) {
    return { success: false, reason: "NOT_CONFIGURED", detail: "Supabase client not initialized" };
  }
  const { investor_email, firm_name, document_requested, access_token } = data;
  const { data: result, error } = await supabase
    .from("investor_data_room_access")
    .insert([
      {
        investor_email,
        firm_name,
        document_requested,
        access_token,
      },
    ])
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { success: false, reason: "TOKEN_EXISTS" };
    }
    console.error("[Morphix DB] insertDataRoomRequest:", error.message);
    return { success: false, reason: "DB_ERROR", detail: error.message };
  }
  return { success: true, id: result.id };
}

// Helper 3: Log calculator telemetry (never throws)
async function logCalculatorEvent(data: {
  selected_hardware_tier: string;
  monthly_operational_hours: number;
  calculated_legacy_cost: number;
  calculated_omnidiff_cost: number;
  estimated_annual_savings: number;
  session_ip_hash?: string;
}) {
  if (!supabase) {
    return { success: false };
  }
  try {
    const { error } = await supabase.from("calculator_telemetry_logs").insert([
      {
        selected_hardware_tier: data.selected_hardware_tier,
        monthly_operational_hours: data.monthly_operational_hours,
        calculated_legacy_cost: data.calculated_legacy_cost,
        calculated_omnidiff_cost: data.calculated_omnidiff_cost,
        estimated_annual_savings: data.estimated_annual_savings,
        session_ip_hash: data.session_ip_hash ?? null,
      },
    ]);
    if (error) {
      console.error("[Morphix DB] logCalculatorEvent:", error.message);
      return { success: false };
    }
    return { success: true };
  } catch {
    return { success: false };
  }
}

// Helper 4: Get waitlist count
async function getWaitlistCount() {
  if (!supabase) {
    return { count: null, error: "NOT_CONFIGURED" };
  }
  const { count, error } = await supabase
    .from("waitlist_subscribers")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("[Morphix DB] getWaitlistCount:", error.message);
    return { count: null, error: error.message };
  }
  return { count };
}

export default supabase;
export {
  insertWaitlistSubscriber,
  insertDataRoomRequest,
  logCalculatorEvent,
  getWaitlistCount,
};
