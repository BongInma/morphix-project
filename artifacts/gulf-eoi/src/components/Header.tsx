import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import OmniDiffLogo from "./OmniDiffLogo";

interface HeaderProps {
  market: "ae" | "sa";
}

export function Header({ market }: HeaderProps) {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLocation(`/${market}`)}>
          <OmniDiffLogo size="sm" showWordmark={true} market={market} />
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-inter text-muted-foreground">
          <a href={`/${market}#providers`} className="hover:text-brand-accent transition">
            {t("nav.providers")}
          </a>
          <a href={`/${market}#renters`} className="hover:text-brand-accent transition">
            {t("nav.renters")}
          </a>
          <a href={`/${market}#contact`} className="hover:text-brand-accent transition">
            {t("nav.contact")}
          </a>
        </nav>
      </div>
    </header>
  );
}
