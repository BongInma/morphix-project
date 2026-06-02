import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  market?: "ph" | "ae" | "sa";
  className?: string;
  opacity?: number;
}

const SIZE_MAP: Record<string, number> = {
  sm: 32,
  md: 48,
  lg: 64,
};

const MARKET_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  ph: { bg: "bg-electric/10", text: "text-electric", label: "PH" },
  ae: { bg: "bg-amber/10", text: "text-amber", label: "UAE" },
  sa: { bg: "bg-[#006C35]/10", text: "text-[#006C35]", label: "KSA" },
};

const LOGO_SRC = `${import.meta.env.BASE_URL?.replace(/\/$/, "") ?? ""}/assets/omnidiff-logo.png`;

export default function OmniDiffLogo({
  size = "md",
  showWordmark = false,
  market,
  className = "",
  opacity = 1,
}: LogoProps) {
  const height = SIZE_MAP[size] ?? 48;
  const marketStyle = market ? MARKET_STYLES[market] : null;

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      style={{ opacity }}
    >
      {/* Logo image */}
      <img
        src={LOGO_SRC}
        alt="OmniDiff"
        height={height}
        width={height}
        className="shrink-0 object-contain"
        style={{ height, width: height }}
      />

      {/* Wordmark + optional market badge */}
      {showWordmark && (
        <div className="flex items-center gap-2">
          <span
            className="font-[family-name:var(--font-syne)] font-bold text-white"
            style={{ fontSize: Math.max(14, height * 0.45) }}
          >
            OmniDiff
          </span>
          {marketStyle && (
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 font-[family-name:var(--font-dmmono)] text-[10px] font-medium ${marketStyle.bg} border-current ${marketStyle.text}`}
            >
              {marketStyle.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
