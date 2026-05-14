import { Link } from "wouter";

export default function GridHealth() {
  return (
    <div className="min-h-screen bg-background text-white pl-[260px]">
      <div className="mx-auto max-w-4xl px-8 py-10">
        <Link href="/" className="text-sm tracking-[0.2em] uppercase text-primary font-semibold">
          ← Back to Dashboard
        </Link>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">Grid Health</h1>
          <p className="mt-3 text-sm text-muted-foreground">Coming Soon</p>
          <p className="mt-4 text-sm text-muted-foreground">Active nodes are being mapped into the live health stream.</p>
        </div>
      </div>
    </div>
  );
}