import { useState } from "react";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block font-[family-name:var(--font-dmmono)] text-xs font-medium uppercase tracking-wider text-text-muted">
      {children}
    </label>
  );
}

function Input({ type = "text", placeholder }: { type?: string; placeholder: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-md border border-surface-border bg-obsidian px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-text-primary placeholder:text-text-muted focus:border-electric focus:outline-none transition-colors"
    />
  );
}

function Select({ options, placeholder }: { options: string[]; placeholder: string }) {
  return (
    <select defaultValue="" className="w-full rounded-md border border-surface-border bg-obsidian px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-text-primary focus:border-electric focus:outline-none transition-colors">
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function Disclaimer() {
  return (
    <p className="mt-4 text-center text-xs text-text-muted">
      Your data is handled under Morphix Systems Inc. Privacy Policy. No spam.
    </p>
  );
}

export default function EOIForms() {
  const [renterSubmitted, setRenterSubmitted] = useState(false);
  const [providerSubmitted, setProviderSubmitted] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      {/* Section label */}
      <p className="mb-4 font-[family-name:var(--font-dmmono)] text-xs font-medium uppercase tracking-[0.2em] text-electric">
        EXPRESSIONS OF INTEREST
      </p>

      {/* Section heading */}
      <h2 className="mb-12 font-[family-name:var(--font-syne)] text-3xl font-bold text-text-primary">
        Join the OmniDiff Network
      </h2>

      {/* Two cards grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Card 1 — Renter */}
        <div className="relative rounded-xl border border-surface-border bg-surface p-8">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-electric" />

          <p className="mb-6 font-[family-name:var(--font-dmmono)] text-xs font-medium text-electric">
            GPU RENTER / AI LAB / VFX STUDIO
          </p>

          {renterSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald/20">
                <svg className="h-6 w-6 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-[family-name:var(--font-syne)] text-lg font-bold text-text-primary">
                Request Received
              </p>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-text-muted">
                Our compute allocation team will contact you within 24 hours.
              </p>
              <button
                onClick={() => setRenterSubmitted(false)}
                className="mt-4 font-[family-name:var(--font-dmmono)] text-xs text-text-muted hover:text-text-primary"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRenterSubmitted(true);
              }}
              className="space-y-5"
            >
              <div>
                <FieldLabel>Full Name</FieldLabel>
                <Input placeholder="e.g. Dr. Sarah Chen" />
              </div>
              <div>
                <FieldLabel>Company Email</FieldLabel>
                <Input type="email" placeholder="sarah@company.com" />
              </div>
              <div>
                <FieldLabel>Target Workload</FieldLabel>
                <Select
                  options={["LLM Training", "Fine-Tuning", "VFX Rendering", "3D Animation", "Simulation/HPC"]}
                  placeholder="Select workload type"
                />
              </div>
              <div>
                <FieldLabel>Required VRAM Tier</FieldLabel>
                <Select
                  options={[
                    "8–16GB (RTX 3080 class)",
                    "20–24GB (RTX 4090/A5000)",
                    "40–80GB (A100/H100)",
                    "Flexible",
                  ]}
                  placeholder="Select VRAM tier"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-electric py-3 font-[family-name:var(--font-inter)] font-semibold text-obsidian transition hover:brightness-110"
              >
                Submit Compute Request
              </button>
              <Disclaimer />
            </form>
          )}
        </div>

        {/* Card 2 — Provider */}
        <div className="relative rounded-xl border border-surface-border bg-surface p-8">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-emerald" />

          <p className="mb-6 font-[family-name:var(--font-dmmono)] text-xs font-medium text-emerald">
            BPO / ENTERPRISE NETWORK OPERATOR
          </p>

          {providerSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald/20">
                <svg className="h-6 w-6 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-[family-name:var(--font-syne)] text-lg font-bold text-text-primary">
                Application Received
              </p>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-text-muted">
                Our infrastructure onboarding team will reach out within 48 hours.
              </p>
              <button
                onClick={() => setProviderSubmitted(false)}
                className="mt-4 font-[family-name:var(--font-dmmono)] text-xs text-text-muted hover:text-text-primary"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setProviderSubmitted(true);
              }}
              className="space-y-5"
            >
              <div>
                <FieldLabel>Corporate Name</FieldLabel>
                <Input placeholder="e.g. Apex Data Solutions, Inc." />
              </div>
              <div>
                <FieldLabel>Contact Person</FieldLabel>
                <Input placeholder="e.g. James Rodriguez" />
              </div>
              <div>
                <FieldLabel>Total Idle Workstations/Nodes</FieldLabel>
                <Input type="number" placeholder="e.g. 24" />
              </div>
              <div>
                <FieldLabel>Primary GPU Models</FieldLabel>
                <Select
                  options={[
                    "RTX 3080/3090",
                    "RTX 4080/4090",
                    "Quadro/RTX A-Series",
                    "NVIDIA T4/A10",
                    "Mixed Fleet",
                  ]}
                  placeholder="Select GPU models"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-emerald py-3 font-[family-name:var(--font-inter)] font-semibold text-obsidian transition hover:brightness-110"
              >
                Submit Provider Application
              </button>
              <Disclaimer />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
