import { useState, type ChangeEvent } from "react";

/* =========================================================
   BACKEND INTEGRATION TRACEABILITY
   =========================================================
   Renter endpoint: POST /api/leads/renter
   Provider endpoint: POST /api/leads/provider

   Schema field mapping (confirmed from api-server/src/routes/leads.ts):
   Renter form:
     - fullName  -> fullName (or name, backend accepts both)
     - email     -> email (required, validated by backend z.string().email())
     - useCase   -> useCase (workload type)
     - monthlyDemand -> monthlyDemand (VRAM tier mapped here)
   Provider form:
     - entityName   -> entityName (corporate name)
     - contactName  -> contactName (contact person)
     - email        -> email (required)
     - gpuCount     -> gpuCount (number of nodes, int > 0)
     - gpuModels    -> gpuModels (GPU model selection)
   ========================================================= */

/* ─── UI helpers ─── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block font-[family-name:var(--font-dmmono)] text-xs font-medium uppercase tracking-wider text-text-muted">
      {children}
    </label>
  );
}

function ValidationError({ message }: { message: string }) {
  return (
    <p className="mt-1 font-[family-name:var(--font-dmmono)] text-xs text-red-400">
      {message}
    </p>
  );
}

function Disclaimer() {
  return (
    <p className="mt-4 text-center text-xs text-text-muted">
      Your data is handled under Morphix Systems Inc. Privacy Policy. No spam.
    </p>
  );
}

/* ─── Renter form ─── */
function RenterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    useCase: "",
    monthlyDemand: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      next.fullName = "Full name is required (min 2 chars).";
    }
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid company email.";
    }
    if (!form.useCase) {
      next.useCase = "Please select a target workload.";
    }
    if (!form.monthlyDemand) {
      next.monthlyDemand = "Please select a VRAM tier.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads/renter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          useCase: form.useCase,
          monthlyDemand: form.monthlyDemand,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Submission failed. Please try again or contact support@morphixsystems.com"
      );
    }
  };

  if (status === "success") {
    return (
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
          Thank you for your interest. An OmniDiff infrastructure specialist will contact you shortly to provision your secure environment.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ fullName: "", email: "", useCase: "", monthlyDemand: "" });
          }}
          className="mt-4 font-[family-name:var(--font-dmmono)] text-xs text-text-muted hover:text-text-primary"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <FieldLabel>Full Name</FieldLabel>
        <input
          value={form.fullName}
          onChange={handleChange("fullName")}
          placeholder="e.g. Dr. Sarah Chen"
          className="w-full rounded-md border border-surface-border bg-obsidian px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-text-primary placeholder:text-text-muted focus:border-electric focus:outline-none transition-colors"
        />
        {errors.fullName && <ValidationError message={errors.fullName} />}
      </div>
      <div>
        <FieldLabel>Company Email</FieldLabel>
        <input
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          placeholder="sarah@company.com"
          className="w-full rounded-md border border-surface-border bg-obsidian px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-text-primary placeholder:text-text-muted focus:border-electric focus:outline-none transition-colors"
        />
        {errors.email && <ValidationError message={errors.email} />}
      </div>
      <div>
        <FieldLabel>Target Workload</FieldLabel>
        <select
          value={form.useCase}
          onChange={handleChange("useCase")}
          className="w-full rounded-md border border-surface-border bg-obsidian px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-text-primary focus:border-electric focus:outline-none transition-colors"
        >
          <option value="" disabled>
            Select workload type
          </option>
          {["LLM Training", "Fine-Tuning", "VFX Rendering", "3D Animation", "Simulation/HPC"].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.useCase && <ValidationError message={errors.useCase} />}
      </div>
      <div>
        <FieldLabel>Required VRAM Tier</FieldLabel>
        <select
          value={form.monthlyDemand}
          onChange={handleChange("monthlyDemand")}
          className="w-full rounded-md border border-surface-border bg-obsidian px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-text-primary focus:border-electric focus:outline-none transition-colors"
        >
          <option value="" disabled>
            Select VRAM tier
          </option>
          {[
            "8\u201316GB (RTX 3080 class)",
            "20\u201324GB (RTX 4090/A5000)",
            "40\u201380GB (A100/H100)",
            "Flexible",
          ].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.monthlyDemand && <ValidationError message={errors.monthlyDemand} />}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center rounded-md bg-electric py-3 font-[family-name:var(--font-inter)] font-semibold text-obsidian transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin text-obsidian" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </>
        ) : (
          "Submit Compute Request"
        )}
      </button>
      {status === "error" && (
        <div className="rounded-md border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-400">
          {errorMsg}
        </div>
      )}
      <Disclaimer />
    </form>
  );
}

/* ─── Provider form ─── */
function ProviderForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    entityName: "",
    contactName: "",
    email: "",
    gpuCount: "",
    gpuModels: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.entityName.trim() || form.entityName.trim().length < 2) {
      next.entityName = "Corporate name is required (min 2 chars).";
    }
    if (!form.contactName.trim() || form.contactName.trim().length < 2) {
      next.contactName = "Contact person is required (min 2 chars).";
    }
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    if (!form.gpuCount.trim()) {
      next.gpuCount = "Number of nodes is required.";
    } else if (isNaN(Number(form.gpuCount)) || Number(form.gpuCount) <= 0) {
      next.gpuCount = "Must be a number greater than 0.";
    }
    if (!form.gpuModels) {
      next.gpuModels = "Please select a GPU model.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads/provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entityName: form.entityName.trim(),
          contactName: form.contactName.trim(),
          email: form.email.trim(),
          gpuCount: Number(form.gpuCount),
          gpuModels: form.gpuModels,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Submission failed. Please try again or contact support@morphixsystems.com"
      );
    }
  };

  if (status === "success") {
    return (
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
          Registration received. The Morphix Systems Inc. compliance team will reach out to schedule your node audit.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ entityName: "", contactName: "", email: "", gpuCount: "", gpuModels: "" });
          }}
          className="mt-4 font-[family-name:var(--font-dmmono)] text-xs text-text-muted hover:text-text-primary"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <FieldLabel>Corporate Name</FieldLabel>
        <input
          value={form.entityName}
          onChange={handleChange("entityName")}
          placeholder="e.g. Apex Data Solutions, Inc."
          className="w-full rounded-md border border-surface-border bg-obsidian px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-text-primary placeholder:text-text-muted focus:border-electric focus:outline-none transition-colors"
        />
        {errors.entityName && <ValidationError message={errors.entityName} />}
      </div>
      <div>
        <FieldLabel>Contact Person</FieldLabel>
        <input
          value={form.contactName}
          onChange={handleChange("contactName")}
          placeholder="e.g. James Rodriguez"
          className="w-full rounded-md border border-surface-border bg-obsidian px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-text-primary placeholder:text-text-muted focus:border-electric focus:outline-none transition-colors"
        />
        {errors.contactName && <ValidationError message={errors.contactName} />}
      </div>
      <div>
        <FieldLabel>Email</FieldLabel>
        <input
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          placeholder="james@company.com"
          className="w-full rounded-md border border-surface-border bg-obsidian px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-text-primary placeholder:text-text-muted focus:border-electric focus:outline-none transition-colors"
        />
        {errors.email && <ValidationError message={errors.email} />}
      </div>
      <div>
        <FieldLabel>Total Idle Workstations/Nodes</FieldLabel>
        <input
          type="number"
          value={form.gpuCount}
          onChange={handleChange("gpuCount")}
          placeholder="e.g. 24"
          className="w-full rounded-md border border-surface-border bg-obsidian px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-text-primary placeholder:text-text-muted focus:border-electric focus:outline-none transition-colors"
        />
        {errors.gpuCount && <ValidationError message={errors.gpuCount} />}
      </div>
      <div>
        <FieldLabel>Primary GPU Models</FieldLabel>
        <select
          value={form.gpuModels}
          onChange={handleChange("gpuModels")}
          className="w-full rounded-md border border-surface-border bg-obsidian px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-text-primary focus:border-electric focus:outline-none transition-colors"
        >
          <option value="" disabled>
            Select GPU models
          </option>
          {[
            "RTX 3080/3090",
            "RTX 4080/4090",
            "Quadro/RTX A-Series",
            "NVIDIA T4/A10",
            "Mixed Fleet",
          ].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.gpuModels && <ValidationError message={errors.gpuModels} />}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center rounded-md bg-emerald py-3 font-[family-name:var(--font-inter)] font-semibold text-obsidian transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin text-obsidian" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </>
        ) : (
          "Submit Provider Application"
        )}
      </button>
      {status === "error" && (
        <div className="rounded-md border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-400">
          {errorMsg}
        </div>
      )}
      <Disclaimer />
    </form>
  );
}

/* ─── Main export ─── */
export default function EOIForms() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-4 font-[family-name:var(--font-dmmono)] text-xs font-medium uppercase tracking-[0.2em] text-electric">
        EXPRESSIONS OF INTEREST
      </p>
      <h2 className="mb-12 font-[family-name:var(--font-syne)] text-3xl font-bold text-text-primary">
        Join the OmniDiff Network
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Renter card */}
        <div className="relative rounded-xl border border-surface-border bg-surface p-8">
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-electric" />
          <p className="mb-6 font-[family-name:var(--font-dmmono)] text-xs font-medium text-electric">
            GPU RENTER / AI LAB / VFX STUDIO
          </p>
          <RenterForm />
        </div>

        {/* Provider card */}
        <div className="relative rounded-xl border border-surface-border bg-surface p-8">
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-emerald" />
          <p className="mb-6 font-[family-name:var(--font-dmmono)] text-xs font-medium text-emerald">
            BPO / ENTERPRISE NETWORK OPERATOR
          </p>
          <ProviderForm />
        </div>
      </div>
    </section>
  );
}
