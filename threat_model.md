# Threat Model

## Project Overview

This project is a pnpm monorepo with a public React/Vite dashboard (`artifacts/xgpu-dashboard`) and an Express 5 API (`artifacts/api-server`). In its current production shape, the dashboard renders mostly marketing and status pages and submits public renter/provider lead forms to the API, which persists lead data to a local JSON file rather than PostgreSQL. The database package (`lib/db`) and generated API client/schema packages are present but only lightly used today.

Production assumptions for this scan:
- `NODE_ENV` is `production` in deployed environments.
- Traffic is protected by platform-managed TLS.
- `artifacts/mockup-sandbox` is a development-only environment and should be ignored unless production reachability is demonstrated.

## Assets

- **Lead PII** — names, company/entity names, corporate email addresses, addresses, workload/use-case details, and hardware inventory details submitted through `/api/leads/*`. Exposure would leak prospective customer/provider information.
- **Lead/counter integrity** — the public counters and stored lead records drive user-facing credibility and internal business follow-up. Unauthorized or automated manipulation would corrupt business data and public metrics.
- **API availability** — the public API serves the dashboard and accepts lead submissions. Outage or severe latency would break the product’s core conversion path.
- **Application secrets and infrastructure access** — `DATABASE_URL` and any future auth tokens/keys used by shared packages or the API must remain server-side and out of logs.

## Trust Boundaries

- **Browser to API** — all dashboard submissions cross from an untrusted client into the Express server. The client cannot be trusted for validation, rate control, or business rules.
- **API to local filesystem** — `artifacts/api-server/src/routes/leads.ts` reads and writes `artifacts/api-server/leads.json`. Compromise or abuse of this boundary can affect stored PII, counter integrity, and service availability.
- **API to future database layer** — `lib/db` establishes a PostgreSQL trust boundary that is not yet part of the live lead flow, but remains relevant for future features.
- **Public to internal/business data** — health and lead endpoints are public; stored lead details are not intended to be public and must not be exposed through responses, logs, or frontend bundles.
- **Production to dev-only surfaces** — `artifacts/mockup-sandbox` and helper scripts are assumed dev-only and out of scope unless a production path proves otherwise.

## Scan Anchors

- **Production entry points:** `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`, `artifacts/api-server/src/routes/**`, `artifacts/xgpu-dashboard/src/main.tsx`, `artifacts/xgpu-dashboard/src/App.tsx`, `artifacts/xgpu-dashboard/src/pages/OmniDiff.tsx`
- **Highest-risk code areas:** public lead submission routes in `artifacts/api-server/src/routes/leads.ts`; shared request/auth handling in `lib/api-client-react/src/custom-fetch.ts`; any server-side logging or persistence logic under `artifacts/api-server/src/lib/**`
- **Public vs authenticated/admin surfaces:** currently the production app appears entirely public-facing; no active server-side auth or admin boundary is implemented in the Express API
- **Usually ignore as dev-only:** `artifacts/mockup-sandbox/**`, `scripts/**`, generated UI component boilerplate unless a production page directly makes it security-relevant

## Threat Categories

### Tampering

Because the production API accepts public lead submissions, the server must treat every field in `req.body` as attacker-controlled. Lead payloads, counters, and stored records must be validated and constrained server-side before they are persisted or used to influence user-visible metrics. Any business significance attached to submitted data must be enforced on the server, not implied by client-side form validation.

### Information Disclosure

Lead submissions contain contact and business information that is not meant for public access. The system must ensure this data is only stored server-side, never returned broadly to clients, never embedded into frontend bundles, and not leaked through logs or verbose error handling. Secrets such as `DATABASE_URL`, cookies, and authorization headers must remain redacted from logs.

### Denial of Service

Public endpoints are exposed to the internet and can be hit without authentication. The API must resist bulk automated submissions, avoid resource amplification from untrusted requests, and keep request size, write frequency, and per-request work bounded. Synchronous disk I/O or unbounded persistent writes on public routes are especially risky because they can block the event loop and degrade the whole service.

### Elevation of Privilege

The current production surface has no active privilege tiers, but classic server-side trust-boundary failures still apply: attacker-controlled input must not reach privileged filesystem, database, or code-execution sinks without strict validation and safe APIs. Future authenticated features should not assume the existing public-by-default routing is safe to extend without explicit authorization checks.
