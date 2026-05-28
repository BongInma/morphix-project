# Morphix Systems Inc. — Database Setup

## One-Time Supabase Configuration

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Create new project: "morphix-core"
3. Choose region: Southeast Asia (Singapore) — closest to PH, satisfies APAC latency

### Step 2: Run the Schema
1. Open Supabase Dashboard
2. Go to SQL Editor → New Query
3. Paste the full contents of `lib/db/schema.sql`
4. Click Run
5. Confirm all three tables appear in Table Editor

### Step 3: Get Your API Keys
1. Go to Settings → API
2. Copy "Project URL" → `SUPABASE_URL`
3. Copy "anon public" key → `SUPABASE_ANON_KEY`
   (NOT the service_role key — that stays server-side only and is not needed yet)

### Step 4: Set Environment Variables

Local development (.env file):
  SUPABASE_URL=https://your-project.supabase.co
  SUPABASE_ANON_KEY=eyJhbGc...

Vercel deployment:
  Dashboard → Project → Settings → Environment Variables → Add both keys

Netlify deployment:
  Site → Site Settings → Environment Variables → Add both keys

Cloudflare DNS (no env vars needed here — DNS only, not compute):
  Point your domain to Vercel/Netlify as normal.
  Supabase connection is outbound from your functions — Cloudflare does not intercept it.

### Step 5: Verify Connection
After deploying, your server logs should show:
  [Morphix DB] Supabase client initialized.

If you see the FATAL error, check that both environment variables are set in the deployment dashboard and that the project is not paused (Supabase pauses free-tier projects after 7 days of inactivity).

## Supabase Free Tier Limits (at launch)
- Storage: 500MB (sufficient for ~2M rows)
- Bandwidth: 5GB/month
- Edge Functions: 500K invocations/month
- Projects pause after 7 days inactivity (upgrade to Pro at $25/mo to disable)
