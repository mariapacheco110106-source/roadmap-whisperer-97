import { createFileRoute, Link } from "@tanstack/react-router";
import { useProgress } from "@/hooks/use-progress";
import { DOMAINS, CAREER_PATHS } from "@/lib/roadmap-data";
import {
  domainProgress,
  globalProgress,
  nextRecommended,
  pathProgress,
} from "@/lib/roadmap-utils";
import { ProgressBar } from "@/components/ProgressBar";
import { TopicCard } from "@/components/TopicCard";

export const Route = createFileRoute("/")({
  component: OverviewPage,
});

function OverviewPage() {
  const p = useProgress();
  const g = globalProgress(p.done);
  const next = nextRecommended(p.done);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Hero */}
      <section className="border-b border-border pb-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {p.hydrated ? `${g.done} de ${g.total} temas · ${g.pct}%` : "Cargando…"}
        </p>
        <h1 className="mt-3 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          Ruta completa para convertirte en{" "}
          <span className="italic" style={{ color: "var(--color-accent)" }}>
            AI Software Engineer
          </span>
          .
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Desde fundamentos de ingeniería y matemáticas hasta LLMs en producción,
          agentes y MLOps. Marca lo que dominas, sigue prerrequisitos, elige tu ruta.
        </p>
        <div className="mt-6 max-w-md">
          <ProgressBar value={g.pct} size="lg" />
        </div>
      </section>

      {/* Siguiente movimiento */}
      {next && (
        <section className="mt-10">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Siguiente movimiento sugerido
          </h2>
          <div className="mt-3 max-w-2xl">
            <TopicCard topic={next} showDomain />
          </div>
        </section>
      )}

      {/* Progreso por dominio */}
      <section className="mt-14">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl">Progreso por dominio</h2>
          <Link to="/domains" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
            Ver todos →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((d) => {
            const prog = domainProgress(d.id, p.done);
            return (
              <Link
                key={d.id}
                to="/domains/$domainId"
                params={{ domainId: d.id }}
                className="group rounded-lg border border-border bg-card p-4 transition hover:border-foreground/40"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {d.short}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-xl leading-tight">{d.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{d.tagline}</p>
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
      </section>

      {/* Rutas profesionales */}
      <section className="mt-14">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-3xl">Rutas profesionales</h2>
          <Link to="/paths" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
            Explorar →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAREER_PATHS.map((cp) => {
            const prog = pathProgress(cp.id, p.done);
            return (
              <Link
                key={cp.id}
                to="/paths/$pathId"
                params={{ pathId: cp.id }}
                className="rounded-lg border border-border bg-card p-4 transition hover:border-foreground/40"
              >
                <h3 className="font-display text-xl leading-tight">{cp.label}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{cp.tagline}</p>
                <div className="mt-4">
                  <ProgressBar value={prog.pct} />
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                    {prog.done}/{prog.total} temas relevantes · {prog.pct}%
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
