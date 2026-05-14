import React from "react";

export function WorkloadsCard() {
  const workloads = [
    { id: "WL-9842", model: "Llama-3-70B-Instruct", gpu: "8x H100", runtime: "14h 22m", status: "TRAINING" },
    { id: "WL-9843", model: "SDXL-Turbo-Distill", gpu: "4x A100", runtime: "02h 45m", status: "INFERENCE" },
    { id: "WL-9844", model: "Mistral-8x7B-MoE", gpu: "8x H100", runtime: "45h 12m", status: "TRAINING" },
    { id: "WL-9845", model: "Whisper-v3-Large", gpu: "2x RTX 4090", runtime: "00h 18m", status: "IDLE" },
  ];

  return (
    <div className="glass-panel w-full h-full flex flex-col p-5">
      <h3 className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase mb-4">
        Active Workloads
      </h3>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-2 text-[9px] uppercase tracking-widest text-muted-foreground font-medium">Job ID</th>
              <th className="py-2 text-[9px] uppercase tracking-widest text-muted-foreground font-medium">Model / Task</th>
              <th className="py-2 text-[9px] uppercase tracking-widest text-muted-foreground font-medium">Allocation</th>
              <th className="py-2 text-[9px] uppercase tracking-widest text-muted-foreground font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {workloads.map((wl) => (
              <tr key={wl.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="py-3 text-xs font-mono text-muted-foreground">{wl.id}</td>
                <td className="py-3 text-xs font-medium text-white">{wl.model}</td>
                <td className="py-3 text-xs font-mono text-primary/80">{wl.gpu}</td>
                <td className="py-3 text-right">
                  <span className={`inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded-sm border
                    ${wl.status === 'TRAINING' ? 'bg-primary/20 text-primary border-primary/30' : 
                      wl.status === 'INFERENCE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                      'bg-slate-500/20 text-slate-400 border-slate-500/30'}
                  `}>
                    {wl.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
