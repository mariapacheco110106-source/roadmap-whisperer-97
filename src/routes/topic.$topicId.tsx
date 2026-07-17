import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TOPICS_BY_ID, DOMAIN_BY_ID, CAREER_PATHS } from "@/lib/roadmap-data";
import { useProgress } from "@/hooks/use-progress";
import { Lock, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/topic/$topicId")({
  loader: ({ params }) => {
    if (!TOPICS_BY_ID[params.topicId]) throw notFound();
    return { topicId: params.topicId };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? TOPICS_BY_ID[loaderData.topicId] : null;
    return {
      meta: [
        { title: t ? `${t.title} — AI SWE Roadmap` : "Tema" },
        { name: "description", content: t?.summary ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h1 className="font-display text-4xl">Tema no encontrado</h1>
      <Link to="/domains" className="mt-4 inline-block underline">Volver</Link>
    </main>
  ),
  component: TopicDetail,
});

function TopicDetail() {
  const { topicId } = Route.useLoaderData();
  const topic = TOPICS_BY_ID[topicId];
  const domain = DOMAIN_BY_ID[topic.domain];
  const p = useProgress();
  const done = p.isDone(topicId);
  const blockers = p.blockersOf(topicId);
  const [note, setNoteLocal] = useState("");
  useEffect(() => setNoteLocal(p.notes[topicId] ?? ""), [p.notes, topicId]);

  const relatedTopics = (topic.relatedTo ?? []).map((id) => TOPICS_BY_ID[id]).filter(Boolean);
  const prereqs = topic.prerequisites.map((id) => TOPICS_BY_ID[id]).filter(Boolean);

  const handleToggle = () => {
    const res = p.toggle(topicId);
    if (!res.ok) {
      const names = res.blockedBy.map((b) => `• ${b.title}`).join("\n");
      if (window.confirm(`Requiere completar antes:\n\n${names}\n\n¿Marcar de todas formas?`)) {
        p.toggle(topicId, { force: true });
      }
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <Link to="/domains/$domainId" params={{ domainId: topic.domain }} className="hover:text-foreground">
          <span style={{ color: domain.color }}>●</span> {domain.short}
        </Link>
        <span>/</span>
        <span>{topic.level}</span>
      </div>

      <header className="mt-4 border-b border-border pb-6">
        <h1 className="font-display text-5xl leading-tight tracking-tight">{topic.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{topic.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleToggle}
            className={`rounded-md px-4 py-2 font-mono text-xs uppercase tracking-wide transition ${
              done
                ? "bg-accent text-accent-foreground"
                : blockers.length > 0
                  ? "border border-border bg-muted text-muted-foreground"
                  : "bg-foreground text-background hover:opacity-90"
            }`}
          >
            {done ? "✓ Completado" : blockers.length > 0 ? (
              <span className="flex items-center gap-2"><Lock className="h-3 w-3" /> Bloqueado ({blockers.length})</span>
            ) : "Marcar como completado"}
          </button>
          <div className="flex flex-wrap gap-1">
            {topic.careerPaths.map((cp) => {
              const meta = CAREER_PATHS.find((c) => c.id === cp);
              return (
                <Link
                  key={cp}
                  to="/paths/$pathId"
                  params={{ pathId: cp }}
                  className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground hover:border-foreground hover:text-foreground"
                >
                  {meta?.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_260px]">
        <div className="space-y-8">
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Descripción</h2>
            <p className="mt-2 leading-relaxed">{topic.description}</p>
          </div>

          {topic.implementation && (
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Cómo se implementa</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{topic.implementation}</p>
            </div>
          )}

          {topic.realWorldUse && (
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Uso en sistemas reales</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{topic.realWorldUse}</p>
            </div>
          )}

          {topic.wizybotMapping && (
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <h2 className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
                Case study · WizyBot
              </h2>
              <p className="mt-2 text-sm leading-relaxed">{topic.wizybotMapping}</p>
            </div>
          )}

          {topic.project && (
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Proyecto sugerido</h2>
              <div className="mt-2 rounded-lg border border-border p-4">
                <h3 className="font-display text-xl">{topic.project.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{topic.project.brief}</p>
              </div>
            </div>
          )}

          {topic.interviewQuestions && topic.interviewQuestions.length > 0 && (
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Preguntas de interview</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {topic.interviewQuestions.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
          )}

          {topic.resources && topic.resources.length > 0 && (
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Recursos</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {topic.resources.map((r, i) => (
                  <li key={i}>
                    <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline hover:text-accent">
                      {r.label}
                      <span className="font-mono text-[10px] uppercase text-muted-foreground">· {r.kind}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topic.papers && topic.papers.length > 0 && (
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Papers</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {topic.papers.map((r, i) => (
                  <li key={i}>
                    <a href={r.url} target="_blank" rel="noreferrer" className="underline hover:text-accent">
                      {r.title} <span className="text-muted-foreground">({r.year})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Tu nota</h2>
            <textarea
              value={note}
              onChange={(e) => setNoteLocal(e.target.value)}
              onBlur={() => p.setNote(topicId, note)}
              placeholder="Ideas, dudas, código para revisar…"
              rows={4}
              className="mt-2 w-full rounded-md border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
        </div>

        <aside className="space-y-6 text-sm">
          {prereqs.length > 0 && (
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Requiere</h3>
              <ul className="mt-2 space-y-1">
                {prereqs.map((pt) => (
                  <li key={pt.id}>
                    <Link
                      to="/topic/$topicId"
                      params={{ topicId: pt.id }}
                      className={`flex items-center gap-2 hover:text-accent ${p.isDone(pt.id) ? "text-muted-foreground line-through" : ""}`}
                    >
                      <span>{p.isDone(pt.id) ? "✓" : "○"}</span>
                      {pt.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {relatedTopics.length > 0 && (
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Relacionados</h3>
              <ul className="mt-2 space-y-1">
                {relatedTopics.map((pt) => (
                  <li key={pt.id}>
                    <Link to="/topic/$topicId" params={{ topicId: pt.id }} className="hover:text-accent">
                      {pt.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
