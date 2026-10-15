import { createFileRoute, Link } from "@tanstack/react-router";
import { TOPICS, TOPICS_BY_ID, DOMAIN_BY_ID } from "@/lib/roadmap-data";

export const Route = createFileRoute("/wizybot")({
  head: () => ({
    meta: [
      { title: "WizyBot — Case Study · AI SWE Roadmap" },
      { name: "description", content: "Cómo los conceptos del roadmap se aplican en el stack real de WizyBot." },
    ],
  }),
  component: WizyBotCase,
});

const COMPONENTS: { title: string; description: string; topicIds: string[] }[] = [
  {
    title: "Multi-tenancy en Postgres",
    description: "Todo dato está aislado por tenant_id vía RLS. Un mismo pool sirve a miles de cuentas sin fugas de datos.",
    topicIds: ["db-postgres", "arch-multitenancy", "db-transactions"],
  },
  {
    title: "Pipeline de ingesta de conocimiento",
    description: "El cliente sube documentos, se dividen en chunks contextuales, se generan embeddings y se indexan en pgvector, todo por cola.",
    topicIds: ["ai-rag-naive", "ai-rag-advanced", "db-vector", "backend-queues"],
  },
  {
    title: "Retrieval y generación",
    description: "Cada mensaje del usuario se reescribe, se busca en híbrido (vector + BM25), se rerankea y se pasa al LLM con un prompt orquestador estructurado.",
    topicIds: ["ai-rag-advanced", "llm-prompting", "llm-inference"],
  },
  {
    title: "Agentes y herramientas",
    description: "Cuando la conversación requiere acción (crear ticket, escalar), WizyBot invoca herramientas con function calling y controla el loop.",
    topicIds: ["ai-agents", "ai-guardrails"],
  },
  {
    title: "Memoria y personalización",
    description: "Memoria por usuario final (histórico + hechos extraídos) y por cuenta (base de conocimiento). Se resume incrementalmente para no explotar el contexto.",
    topicIds: ["ai-memory"],
  },
  {
    title: "Evals, observabilidad y coste",
    description: "Cada release pasa por eval set. Cada conversación se traza con tokens, latencia y coste, agrupado por tenant y feature.",
    topicIds: ["ai-evals", "ai-observability"],
  },
  {
    title: "Serving y escala",
    description: "Servidor de inferencia con continuous batching y KV cache; workers en cola para tareas pesadas; caching de queries frecuentes.",
    topicIds: ["llm-inference", "mlops-serving", "backend-caching"],
  },
  {
    title: "Seguridad",
    description: "Guardrails de tema, PII y jailbreaks. Auth con refresh tokens cortos. Rate limiting por tenant y por endpoint.",
    topicIds: ["ai-guardrails", "backend-auth", "backend-rate-limiting"],
  },
];

export function WizyBotCase() {
  // topics referenced across the case
  const referenced = new Set(COMPONENTS.flatMap((c) => c.topicIds));

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="border-b border-border pb-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Case Study</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">WizyBot en la práctica.</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          WizyBot es un asistente conversacional enterprise multi-tenant que combina RAG avanzado, agentes con herramientas
          y observabilidad estricta. Aquí se ve cómo cada pieza del roadmap se traduce en su arquitectura real.
        </p>
      </header>

      <section className="mt-8 space-y-6">
        {COMPONENTS.map((c) => (
          <div key={c.title} className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-display text-2xl">{c.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.topicIds.map((id) => {
                const t = TOPICS_BY_ID[id];
                if (!t) return null;
                const d = DOMAIN_BY_ID[t.domain];
                return (
                  <Link
                    key={id}
                    to="/topic/$topicId"
                    params={{ topicId: id }}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1 text-xs hover:border-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                    {t.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Todos los temas con mapping a WizyBot</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Temas del roadmap que tienen aplicación explícita en el producto.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {TOPICS.filter((t) => t.wizybotMapping || referenced.has(t.id)).map((t) => (
            <li key={t.id} className="rounded border border-border p-3">
              <Link to="/topic/$topicId" params={{ topicId: t.id }} className="font-display text-lg hover:text-accent">
                {t.title}
              </Link>
              {t.wizybotMapping && <p className="mt-1 text-muted-foreground">{t.wizybotMapping}</p>}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
