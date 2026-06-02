import { useTranslation } from "react-i18next";
import { useLocale } from "@/lib/locale";
import { LocaleProvider } from "@/components/LocaleProvider";
import { Header } from "@/components/Header";
import { EOIForm } from "@/components/EOIForm";
import { Stats } from "@/components/Stats";
import OmniDiffLogo from "@/components/OmniDiffLogo";

export default function AEPage() {
  return (
    <LocaleProvider locale="en">
      <AEHome />
    </LocaleProvider>
  );
}

function AEHome() {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark">
      <Header market="ae" />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-transparent to-brand-gold/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <OmniDiffLogo size="lg" />
          </div>
          <span className="inline-block font-dmmono text-xs text-brand-accent border border-brand-accent/20 bg-brand-accent/5 rounded px-2 py-1 mb-4">
            [{t("hero.eoiOpen")}]
          </span>
          <h1 className="font-syne text-4xl md:text-6xl font-bold text-brand-primary tracking-tight">
            {t("hero.headlineAE")}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto font-inter text-base md:text-lg text-muted-foreground">
            {t("hero.subline")} {t("common.patent")}
          </p>
          <div className="mt-8 flex gap-3 justify-center">
            <a
              href="#providers"
              className="rounded-lg bg-brand-accent px-6 py-3 font-inter text-sm font-semibold text-white transition hover:brightness-110"
            >
              {t("forms.providerFormTitle")}
            </a>
            <a
              href="#renters"
              className="rounded-lg border border-brand-gold/30 bg-brand-gold/10 px-6 py-3 font-inter text-sm font-semibold text-brand-gold transition hover:bg-brand-gold/20"
            >
              {t("forms.renterFormTitle")}
            </a>
          </div>
        </div>
      </section>

      <Stats />

      {/* EOI Forms */}
      <section id="providers" className="py-16 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Provider Form */}
            <div className="glass-panel p-6 md:p-8">
              <div className="mb-6">
                <h2 className="font-syne text-2xl font-semibold text-brand-primary">
                  {t("forms.providerFormTitle")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("forms.providerFormSubtitle")}
                </p>
              </div>
              <EOIForm formType="provider" market="ae" />
            </div>

            {/* Renter Form */}
            <div id="renters" className="glass-panel p-6 md:p-8 scroll-mt-16">
              <div className="mb-6">
                <h2 className="font-syne text-2xl font-semibold text-brand-primary">
                  {t("forms.renterFormTitle")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("forms.renterFormSubtitle")}
                </p>
              </div>
              <EOIForm formType="renter" market="ae" />
            </div>
          </div>
        </div>
      </section>

      {/* Features / Trust */}
      <section className="py-16 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-syne text-2xl font-semibold text-brand-primary">
              Why Join OmniDiff?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-syne font-semibold text-brand-primary">Monetize Idle GPUs</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Turn unused workstation capacity into recurring revenue. Secure, managed, and hassle-free.
              </p>
            </div>
            <div className="glass-panel p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-syne font-semibold text-brand-primary">Instant Burst Compute</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Access high-performance GPUs on-demand for AI/ML training, inference, and simulation.
              </p>
            </div>
            <div className="glass-panel p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-syne font-semibold text-brand-primary">Enterprise-Grade Security</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                End-to-end encryption, data sovereignty, and compliance with UAE data regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <h2 className="font-syne text-2xl font-semibold text-brand-primary">Get in Touch</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Questions about the platform or partnership opportunities? Contact us at{" "}
            <a href="mailto:gulf@omnidiff.it.com" className="text-brand-accent hover:underline">
              gulf@omnidiff.it.com
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <OmniDiffLogo size="sm" showWordmark={true} market="ae" opacity={0.4} className="mb-3" />
          <p className="font-dmmono text-xs text-muted-foreground">
            {t("common.copyright")} — {t("common.patent")}
          </p>
        </div>
      </footer>
    </div>
  );
}
