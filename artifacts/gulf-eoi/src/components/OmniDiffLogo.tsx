import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  market?: "ae" | "sa";
  className?: string;
  opacity?: number;
}

const SIZE_MAP: Record<string, number> = {
  sm: 32,
  md: 48,
  lg: 64,
};

const MARKET_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  ae: { bg: "bg-[#00C9A7]/10", text: "text-[#00C9A7]", label: "UAE" },
  sa: { bg: "bg-[#C9A84C]/10", text: "text-[#C9A84C]", label: "KSA" },
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
      {/* Logo image — always wrapped in dark pill for light backgrounds */}
      <div
        className="shrink-0 rounded-xl inline-flex items-center justify-center"
        style={{ backgroundColor: "#0A2540", padding: height * 0.15 }}
      >
        <img
          src={LOGO_SRC}
          alt="OmniDiff"
          height={height * 0.7}
          width={height * 0.7}
          className="object-contain"
          style={{ height: height * 0.7, width: height * 0.7 }}
        />
      </div>

      {/* Wordmark + optional market badge */}
      {showWordmark && (
        <div className="flex items-center gap-2">
          <span
            className="font-syne font-bold text-brand-primary"
            style={{ fontSize: Math.max(14, height * 0.45) }}
          >
            OmniDiff
          </span>
          {marketStyle && (
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 font-dmmono text-[10px] font-medium ${marketStyle.bg} border-current ${marketStyle.text}`}
            >
              {marketStyle.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
