import Navbar from "@/components/Navbar";

export default function MorphixLanding() {
  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold text-text-primary md:text-6xl">
            Morphix Systems Inc.
          </h1>
          <p className="mt-4 font-[family-name:var(--font-inter)] text-lg text-text-muted">
            Institutional-grade infrastructure for distributed AI compute.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="font-[family-name:var(--font-dmmono)] text-sm text-emerald">
              ● SYSTEM ONLINE
            </span>
            <span className="font-[family-name:var(--font-dmmono)] text-sm text-text-mono">
              v2.4.1-stable
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
