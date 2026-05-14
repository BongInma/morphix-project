import { Link } from "wouter";

export default function Settings() {
  const items = ["Dark Mode", "Email Notifications", "API Access Keys"];

  return (
    <div className="min-h-screen bg-background text-white pl-[260px]">
      <div className="mx-auto max-w-4xl px-8 py-10">
        <Link href="/" className="text-sm tracking-[0.2em] uppercase text-primary font-semibold">
          ← Back to Dashboard
        </Link>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl space-y-4">
          <h1 className="text-3xl font-semibold">Settings</h1>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span>{item}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Toggle</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}