import React from "react";
import { motion } from "framer-motion";

export function OneClickToggle({
  status,
  onToggle,
}: {
  status: "offline" | "verifying" | "live";
  onToggle: () => void;
}) {
  const isOnline = status === "live";
  return (
    <div className="flex items-center gap-4">
      <span 
        className={`text-xs font-bold tracking-[0.2em] transition-colors duration-500 uppercase ${
          status === "offline" ? "text-muted-foreground" : "text-primary"
        }`}
      >
        {status === "verifying" ? "VERIFYING HARDWARE..." : isOnline ? "XGPU STATUS: LIVE" : "GRID STATUS: OFFLINE"}
      </span>
      {status === "offline" && (
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-300 animate-pulse">
          CLICK TO CONNECT
        </span>
      )}

      <button
        onClick={onToggle}
        className={`relative w-20 h-10 rounded-full border p-1 transition-all duration-500 flex items-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
          ${isOnline || status === "verifying"
            ? "border-primary/50 bg-primary/20 shadow-[0_0_20px_rgba(0,255,255,0.3)]" 
            : "border-white/20 bg-white/5 shadow-[0_0_10px_rgba(0,255,255,0.05)]"
          }
        `}
        aria-label="Toggle Grid Status"
      >
        <motion.div
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
            isOnline ? "bg-white" : "bg-slate-700"
          }`}
          layout
          initial={false}
          animate={{
            x: isOnline ? 40 : 0,
            scale: status === "verifying" ? [1, 1.05, 1] : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          <div 
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              isOnline ? "bg-primary shadow-[0_0_10px_rgba(0,255,255,1)]" : status === "verifying" ? "bg-primary/70 shadow-[0_0_12px_rgba(0,255,255,0.85)]" : "bg-red-500/50"
            }`}
          />
        </motion.div>
      </button>
    </div>
  );
}
