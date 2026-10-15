import { createFileRoute } from "@tanstack/react-router";
import { TOPICS_BY_DOMAIN } from "@/lib/roadmap-data";
import { TopicCard } from "@/components/TopicCard";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Portfolio Projects — AI SWE Roadmap" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const topics = TOPICS_BY_DOMAIN["projects"] ?? [];
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="border-b border-border pb-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Portfolio</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Proyectos que demuestran nivel.</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Los proyectos concretos son la mejor prueba de que dominas un tema. Elige uno, publícalo con README serio y trázalo.
        </p>
      </header>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {topics.map((t) => <TopicCard key={t.id} topic={t} showDomain />)}
      </div>
    </main>
  );
}
