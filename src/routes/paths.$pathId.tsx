import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CAREER_PATHS, DOMAINS, LEVEL_ORDER } from "@/lib/roadmap-data";
import type { CareerPath } from "@/lib/roadmap-data";
import { useProgress } from "@/hooks/use-progress";
import { pathTopics, pathProgress } from "@/lib/roadmap-utils";
import { ProgressBar } from "@/components/ProgressBar";
import { TopicCard } from "@/components/TopicCard";

export const Route = createFileRoute("/paths/$pathId")({
  loader: ({ params }) => {
    const cp = CAREER_PATHS.find((c) => c.id === params.pathId);
    if (!cp) throw notFound();
    return { pathId: cp.id };
  },
  head: ({ loaderData }) => {
    const cp = loaderData ? CAREER_PATHS.find((c) => c.id === loaderData.pathId) : null;
    return { meta: [{ title: cp ? `${cp.label} — AI SWE Roadmap` : "Ruta" }] };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h1 className="font-display text-4xl">Ruta no encontrada</h1>
      <Link to="/paths" className="mt-4 inline-block underline">Volver</Link>
    </main>
  ),
  component: PathDetail,
});

function PathDetail() {
  const { pathId } = Route.useLoaderData();
  const cp = CAREER_PATHS.find((c) => c.id === (pathId as CareerPath))!;
  const p = useProgress();
  const topics = pathTopics(cp.id).sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
  const prog = pathProgress(cp.id, p.done);

  const byDomain = DOMAINS.map((d) => ({ d, list: topics.filter((t) => t.domain === d.id) })).filter((g) => g.list.length > 0);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Link to="/paths" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
        ← Rutas
      </Link>
      <header className="mt-4 border-b border-border pb-6">
        <h1 className="font-display text-5xl tracking-tight">{cp.label}</h1>
        <p className="mt-2 text-muted-foreground">{cp.tagline}</p>
        <div className="mt-6 max-w-md">
          <ProgressBar value={prog.pct} label={`${prog.done}/${prog.total} temas`} />
        </div>
      </header>

      <section className="mt-8 space-y-10">
        {byDomain.map(({ d, list }) => (
          <div key={d.id}>
            <div className="flex items-baseline gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
              <h2 className="font-display text-2xl">{d.title}</h2>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {list.length} temas
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {list.map((t) => <TopicCard key={t.id} topic={t} />)}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
