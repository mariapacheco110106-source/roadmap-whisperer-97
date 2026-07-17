import { createFileRoute } from "@tanstack/react-router";
import { TOPICS_BY_DOMAIN, TOPICS, DOMAIN_BY_ID } from "@/lib/roadmap-data";
import { TopicCard } from "@/components/TopicCard";

export const Route = createFileRoute("/interview")({
  head: () => ({ meta: [{ title: "Interview Prep — AI SWE Roadmap" }] }),
  component: InterviewPage,
});

function InterviewPage() {
  const topics = TOPICS_BY_DOMAIN["interview"] ?? [];
  const bank = TOPICS.filter((t) => t.interviewQuestions && t.interviewQuestions.length > 0);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="border-b border-border pb-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Interview</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Preparación técnica.</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Coding, system design, ML design y behavioral. Practica los cuatro con estructura.
        </p>
      </header>

      <section className="mt-8">
        <h2 className="font-display text-2xl">Áreas</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {topics.map((t) => <TopicCard key={t.id} topic={t} />)}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Banco de preguntas por tema</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Preguntas reales agrupadas por concepto. Practica en voz alta.
        </p>
        <div className="mt-4 space-y-4">
          {bank.map((t) => {
            const d = DOMAIN_BY_ID[t.domain];
            return (
              <div key={t.id} className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span style={{ color: d.color }}>●</span>
                  <span>{d.short}</span>
                </div>
                <h3 className="mt-1 font-display text-xl">{t.title}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {t.interviewQuestions!.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
