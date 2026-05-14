import React from "react";
import { Cpu, Activity, Waypoints, Settings, Sparkles } from "lucide-react";
import { Link, useLocation } from "wouter";

export function Sidebar({ live }: { live: boolean }) {
  const [location] = useLocation();

  const navItems = [
    { label: "XGPU Dashboard", icon: Cpu, href: "/", active: true },
    { label: "Join Alpha Registry", icon: Sparkles, href: "/join", glow: true },
    { label: "Grid Health", icon: Activity, href: "/grid-health" },
    { label: "AptaFet Sync", icon: Waypoints, href: "/sync", badge: "BETA" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="w-[260px] h-screen fixed left-0 top-0 flex flex-col border-r border-white/20 bg-background/50 backdrop-blur-2xl z-10">
      {/* Logo */}
      <div className="p-8 pb-10">
        <Link href="/" className="block">
          <h1 className="text-xl font-bold tracking-[0.2em] uppercase text-white">
            MORPHIX
          </h1>
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mt-1 uppercase font-medium">
            Systems Inc.
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href || item.active;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group overflow-hidden
                ${item.glow ? "border border-primary/30 bg-primary/10 shadow-[0_0_24px_rgba(0,255,255,0.14)]" : ""}
                ${isActive ? 'bg-white/10 text-white' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_12px_rgba(0,255,255,0.8)]" />
              )}
              <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'group-hover:text-white transition-colors'} ${live && item.label === "XGPU Dashboard" ? "animate-pulse" : ""}`} strokeWidth={1.5} />
              <span className="text-sm font-medium tracking-wide uppercase">{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary tracking-widest border border-primary/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile Chip */}
      <div className="p-6 mt-auto">
        <div className="glass-panel p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-white/10 text-xs font-bold text-white tracking-wider">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold text-white tracking-wide">J. DOE</p>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">Network Operator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
