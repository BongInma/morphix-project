# Objective
Run a production-scope security scan across the monorepo, prioritizing exploitable issues in the public Express API and deployed dashboard.

# Relevant information
- Production surfaces are `artifacts/api-server/**` and `artifacts/xgpu-dashboard/**`.
- The API is public and currently appears unauthenticated.
- Lead submissions are written to `artifacts/api-server/leads.json` via synchronous filesystem operations.
- `artifacts/mockup-sandbox/**` is dev-only under the current threat model and should be ignored unless production reachability is found.
- Deterministic scans completed: SAST reported 5 medium findings that currently look like false positives in frontend/dev-only dynamic property access; HoundDog reported no findings.

# Tasks

### T001: API abuse and persistence review
- **Blocked By**: []
- **Details**:
  - Analyze `artifacts/api-server/src/app.ts`, `artifacts/api-server/src/routes/leads.ts`, `artifacts/api-server/src/routes/health.ts`, and `artifacts/api-server/src/lib/logger.ts`.
  - Check for broken access control, missing validation, injection, privacy leaks, rate-limit gaps, CORS issues, and denial-of-service conditions.
  - Pay special attention to public POST routes that persist attacker input and perform synchronous file I/O.
  - Acceptance: Confirm exploitable API-side findings or rule them out with concrete reasoning.

### T002: Frontend entry paths and client dataflow review
- **Blocked By**: []
- **Details**:
  - Analyze `artifacts/xgpu-dashboard/src/App.tsx`, `artifacts/xgpu-dashboard/src/pages/OmniDiff.tsx`, and any directly related components/pages.
  - Check whether the frontend exposes sensitive data, trusts client-only validation for security-relevant behavior, or expands the exploitability of API issues.
  - Distinguish false-positive SAST results from real vulnerabilities.
  - Acceptance: Identify any production-relevant client-side issues or confirm frontend findings are non-exploitable alone.

### T003: Shared libraries and future-boundary review
- **Blocked By**: []
- **Details**:
  - Analyze `lib/api-client-react/src/custom-fetch.ts`, `lib/db/src/index.ts`, `lib/api-spec/openapi.yaml`, and related generated code only as needed.
  - Check for token leakage, insecure default transport/auth handling, schema mismatches, or production-relevant issues in shared request/database boundaries.
  - Acceptance: Confirm whether shared libraries introduce production security risk today.

### T004: Synthesis and vulnerability reconciliation
- **Blocked By**: [T001, T002, T003]
- **Details**:
  - Deduplicate findings, verify severity, organize new findings into remediation groups, and update any relevant files in `.local/existing_vulnerabilities/`.
  - Update `threat_model.md` if synthesis changes scope or assumptions.
  - Acceptance: New findings are grouped correctly and ready for `report_scan_complete`.
