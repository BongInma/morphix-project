import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BentoGrid } from "@/components/dashboard/BentoGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <main className="flex-1 ml-[260px] flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <div className="flex-1 overflow-auto">
          <BentoGrid />
        </div>
      </main>
    </div>
  );
}
