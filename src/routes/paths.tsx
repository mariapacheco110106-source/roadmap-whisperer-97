import { createFileRoute, Link } from "@tanstack/react-router";
import { CAREER_PATHS } from "@/lib/roadmap-data";
import { useProgress } from "@/hooks/use-progress";
import { pathProgress } from "@/lib/roadmap-utils";
import { ProgressBar } from "@/components/ProgressBar";

export const Route = createFileRoute("/paths")({
  head: () => ({ meta: [{ title: "Rutas profesionales — AI SWE Roadmap" }] }),
  component: PathsIndex,
});

function PathsIndex() {
  const p = useProgress();
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="border-b border-border pb-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Rutas</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Elige tu especialización.</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Cada ruta selecciona los temas del roadmap relevantes para ese perfil. Puedes seguir varias.
        </p>
      </header>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CAREER_PATHS.map((cp) => {
          const prog = pathProgress(cp.id, p.done);
          return (
            <Link
              key={cp.id}
              to="/paths/$pathId"
              params={{ pathId: cp.id }}
              className="rounded-lg border border-border bg-card p-5 transition hover:border-foreground/40"
            >
              <h2 className="font-display text-2xl">{cp.label}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{cp.tagline}</p>
              <div className="mt-4">
                <ProgressBar value={prog.pct} />
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                  {prog.done}/{prog.total} temas · {prog.pct}%
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
