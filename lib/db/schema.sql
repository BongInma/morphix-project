-- ================================================
-- Morphix Systems Inc. — Supabase Schema
-- Run this ONCE in Supabase SQL Editor
-- Never run this from application code
-- ================================================

CREATE TABLE IF NOT EXISTS waitlist_subscribers (
  id                  BIGSERIAL PRIMARY KEY,
  full_name           TEXT NOT NULL,
  company_name        TEXT,
  professional_email  TEXT NOT NULL UNIQUE,
  inquiry_type        TEXT NOT NULL DEFAULT 'General'
                      CHECK (inquiry_type IN
                        ('General','Investor','Renter','Provider')),
  submission_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS investor_data_room_access (
  id                    BIGSERIAL PRIMARY KEY,
  investor_email        TEXT NOT NULL,
  firm_name             TEXT,
  document_requested    TEXT NOT NULL,
  access_token          TEXT NOT NULL UNIQUE,
  has_downloaded        BOOLEAN NOT NULL DEFAULT FALSE,
  last_active_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calculator_telemetry_logs (
  id                          BIGSERIAL PRIMARY KEY,
  selected_hardware_tier      TEXT NOT NULL,
  monthly_operational_hours   NUMERIC(10,2) NOT NULL,
  calculated_legacy_cost      NUMERIC(12,2) NOT NULL,
  calculated_omnidiff_cost    NUMERIC(12,2) NOT NULL,
  estimated_annual_savings    NUMERIC(12,2) NOT NULL,
  session_ip_hash             TEXT,
  calculation_timestamp       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security: enable but allow server-side service role full access.
-- Anon key gets INSERT only on waitlist and telemetry — no SELECT.
ALTER TABLE waitlist_subscribers
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_data_room_access
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_telemetry_logs
  ENABLE ROW LEVEL SECURITY;

-- Waitlist: allow anonymous inserts only
CREATE POLICY "anon_insert_waitlist"
  ON waitlist_subscribers FOR INSERT
  TO anon WITH CHECK (true);

-- Telemetry: allow anonymous inserts only
CREATE POLICY "anon_insert_telemetry"
  ON calculator_telemetry_logs FOR INSERT
  TO anon WITH CHECK (true);

-- Data room: no anon access at all
-- (handled server-side with service role key)

-- ================================================
-- After running this schema, copy your Project URL and
-- anon public key from:
--   Supabase Dashboard → Settings → API
-- Add them to your .env file as:
--   SUPABASE_URL=https://xxxx.supabase.co
--   SUPABASE_ANON_KEY=eyJ...
-- ================================================
