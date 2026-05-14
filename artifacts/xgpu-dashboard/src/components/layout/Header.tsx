import React from "react";
import { OneClickToggle } from "../dashboard/OneClickToggle";

export function Header() {
  return (
    <header className="h-24 flex items-center justify-between px-8 border-b border-white/20 bg-background/30 backdrop-blur-md sticky top-0 z-20">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-white">
          XGPU Dashboard
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,255,0.8)] animate-pulse" />
          <p className="text-xs text-muted-foreground tracking-[0.15em] font-medium">
            REGION: GLOBAL &middot; v4.2.1
          </p>
        </div>
      </div>

      <div>
        <OneClickToggle />
      </div>
    </header>
  );
}
