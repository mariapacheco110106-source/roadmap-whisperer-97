import { createFileRoute, Link } from "@tanstack/react-router";
import { DOMAINS } from "@/lib/roadmap-data";
import { useProgress } from "@/hooks/use-progress";
import { domainProgress } from "@/lib/roadmap-utils";
import { ProgressBar } from "@/components/ProgressBar";

export const Route = createFileRoute("/domains")({
  head: () => ({
    meta: [
      { title: "Dominios — AI SWE Roadmap" },
      { name: "description", content: "Explora los 18 dominios del roadmap: fundamentos, CS, matemáticas, backend, ML, LLMs y más." },
    ],
  }),
  component: DomainsPage,
});

function DomainsPage() {
  const p = useProgress();
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="border-b border-border pb-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Dominios</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Todo el terreno.</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {DOMAINS.length} dominios organizados de fundamentos a especialización.
        </p>
      </header>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOMAINS.map((d) => {
          const prog = domainProgress(d.id, p.done);
          return (
            <Link
              key={d.id}
              to="/domains/$domainId"
              params={{ domainId: d.id }}
              className="rounded-lg border border-border bg-card p-5 transition hover:border-foreground/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {String(d.order).padStart(2, "0")} · {d.short}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{prog.total} temas</span>
              </div>
              <h2 className="mt-3 font-display text-2xl leading-tight">{d.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{d.tagline}</p>
              <div className="mt-4">
                <ProgressBar value={prog.pct} color={d.color} />
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                  {prog.done}/{prog.total} · {prog.pct}%
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
