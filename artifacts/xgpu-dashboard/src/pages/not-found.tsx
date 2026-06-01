import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-obsidian text-text-primary">
      <div className="text-center">
        <span className="font-[family-name:var(--font-dmmono)] text-xs text-electric border border-electric/30 bg-electric/5 rounded px-2 py-1">
          [404 ERROR]
        </span>
        <h1 className="mt-6 font-[family-name:var(--font-syne)] text-4xl font-bold text-white">
          Page Not Found
        </h1>
        <p className="mt-4 font-[family-name:var(--font-inter)] text-sm text-text-muted max-w-md mx-auto">
          The requested page does not exist or may have been moved. Please navigate back to the dashboard.
        </p>
        <button
          onClick={() => setLocation("/")}
          className="mt-8 rounded-lg bg-electric px-6 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-obsidian transition hover:brightness-110"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
