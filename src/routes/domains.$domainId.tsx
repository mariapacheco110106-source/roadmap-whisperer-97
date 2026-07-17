import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { DOMAIN_BY_ID, TOPICS_BY_DOMAIN, LEVEL_ORDER } from "@/lib/roadmap-data";
import type { Level, DomainId } from "@/lib/roadmap-data";
import { useProgress } from "@/hooks/use-progress";
import { domainProgress } from "@/lib/roadmap-utils";
import { ProgressBar } from "@/components/ProgressBar";
import { TopicCard } from "@/components/TopicCard";

export const Route = createFileRoute("/domains/$domainId")({
  loader: ({ params }) => {
    if (!DOMAIN_BY_ID[params.domainId as DomainId]) throw notFound();
    return { domainId: params.domainId as DomainId };
  },
  head: ({ loaderData }) => {
    const d = loaderData ? DOMAIN_BY_ID[loaderData.domainId] : null;
    return {
      meta: [
        { title: d ? `${d.title} — AI SWE Roadmap` : "Dominio" },
        { name: "description", content: d?.tagline ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h1 className="font-display text-4xl">Dominio no encontrado</h1>
      <Link to="/domains" className="mt-4 inline-block text-sm underline">Volver a dominios</Link>
    </main>
  ),
  component: DomainDetail,
});

const LEVELS: Level[] = ["Fundamentals", "Intermediate", "Advanced", "Expert"];

function DomainDetail() {
  const { domainId } = Route.useLoaderData() as { domainId: DomainId };
  const domain = DOMAIN_BY_ID[domainId];
  const p = useProgress();
  const [levelFilter, setLevelFilter] = useState<Level | "all">("all");
  const [showDone, setShowDone] = useState(true);

  const allTopics = TOPICS_BY_DOMAIN[domainId] ?? [];
  const filtered = allTopics
    .filter((t) => levelFilter === "all" || t.level === levelFilter)
    .filter((t) => showDone || !p.isDone(t.id))
    .sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);

  const prog = domainProgress(domainId, p.done);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Link to="/domains" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
        ← Dominios
      </Link>
      <header className="mt-4 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: domain.color }} />
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {String(domain.order).padStart(2, "0")} · {domain.short}
          </span>
        </div>
        <h1 className="mt-2 font-display text-5xl leading-tight tracking-tight">{domain.title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{domain.tagline}</p>
        <div className="mt-6 max-w-md">
          <ProgressBar value={prog.pct} color={domain.color} label={`${prog.done}/${prog.total}`} />
        </div>
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setLevelFilter("all")}
          className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide ${
            levelFilter === "all" ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Todos
        </button>
        {LEVELS.map((lv) => (
          <button
            key={lv}
            onClick={() => setLevelFilter(lv)}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide ${
              levelFilter === lv ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {lv}
          </button>
        ))}
        <label className="ml-auto flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
          Mostrar completados
        </label>
      </div>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((t) => (
          <TopicCard key={t.id} topic={t} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            Sin temas para este filtro.
          </p>
        )}
      </section>
    </main>
  );
}
