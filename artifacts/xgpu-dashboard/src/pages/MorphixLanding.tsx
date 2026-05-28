import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EOIForms from "@/components/EOIForms";
import SecurityProofs from "@/components/SecurityProofs";
import Governance from "@/components/Governance";
import FinancialFooter from "@/components/FinancialFooter";

export default function MorphixLanding() {
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar />
      <Hero />
      <div id="eoi">
        <EOIForms />
      </div>
      <div id="security">
        <SecurityProofs />
      </div>
      <div id="corporate-governance-section">
        <Governance />
      </div>
      <FinancialFooter />

      {/* REGULATORY COMPLIANCE DISCLAIMER ROW */}
      <div className="mt-8 pt-6 border-t border-gray-950 max-w-7xl mx-auto px-4 text-[10px] text-gray-600 leading-relaxed font-sans text-justify">
        <p className="mb-2">
          <span className="font-semibold text-gray-500">Disclaimer:</span> All pre-launch incentives, including early renter lifetime discounts and premium hardware provider revenue share allocations described herein, represent promotional expressions of interest frameworks only. Final terms, priority routing metrics, and yield percentages are strictly subject to execution of definitive corporate platform contracts, service level agreements (SLAs), and verified hardware enrollment compliance parameters. Void where prohibited.
        </p>
        <p>
          All expressions of interest (EOIs) collected via invitation requests are non-binding. Morphix Systems Inc. reserves the right to modify network onboarding thresholds, hardware compatibility mandates, and geofencing routing protocols in accordance with regional compliance updates and localized data infrastructure statutes.
        </p>
      </div>
    </div>
  );
}
