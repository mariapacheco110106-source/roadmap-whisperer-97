import { createFileRoute } from "@tanstack/react-router";
import { TOPICS_BY_DOMAIN } from "@/lib/roadmap-data";
import { TopicCard } from "@/components/TopicCard";

export const Route = createFileRoute("/career")({
  head: () => ({ meta: [{ title: "Career & Job Search — AI SWE Roadmap" }] }),
  component: CareerPage,
});

function CareerPage() {
  const topics = TOPICS_BY_DOMAIN["career"] ?? [];
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="border-b border-border pb-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Carrera</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Del skill al trabajo.</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Portfolio visible, aplicaciones dirigidas, negociación. Lo técnico es solo la mitad.
        </p>
      </header>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {topics.map((t) => <TopicCard key={t.id} topic={t} />)}
      </div>
    </main>
  );
}
