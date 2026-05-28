import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EOIForms from "@/components/EOIForms";
import SecurityProofs from "@/components/SecurityProofs";
import Governance from "@/components/Governance";

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
      <div id="governance">
        <Governance />
      </div>
    </div>
  );
}
