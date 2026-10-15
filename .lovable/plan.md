# AI Software Engineering Roadmap — Plan de rediseño

Transformo la app actual (centrada en WizyBot) en una plataforma general de estudio para convertirse en **AI Software Engineer**, manteniendo tu progreso actual en BD y agregando WizyBot como *case study* secundario.

## 1. Modelo de datos (nuevo `roadmap-data.ts`)

Cada `Topic` pasa a tener esta forma enriquecida:

```ts
type Topic = {
  id: string;                    // estable — reutiliza IDs actuales cuando aplique
  title: string;
  domain: DomainId;              // "cs" | "math" | "backend" | "ml" | "llm" | ...
  level: "Fundamentals" | "Intermediate" | "Advanced" | "Expert";
  summary: string;               // 1 línea
  description: string;           // 2–4 párrafos conceptuales
  prerequisites: string[];       // IDs de temas requeridos (grafo)
  relatedTo: string[];           // IDs relacionados (no bloqueantes)
  implementation?: string;       // cómo se implementa en la práctica
  project?: { title: string; brief: string };
  interviewQuestions: string[];
  resources: { label: string; url: string; kind: "book"|"course"|"docs"|"video"|"article" }[];
  papers?: { title: string; url: string; year: number }[];
  realWorldUse: string;          // cómo se aplica en sistemas reales
  careerPaths: CareerPath[];     // rutas donde es relevante
  wizybotMapping?: string;       // opcional — para el Case Study
};

type Domain =
  | "cs" | "math" | "languages"
  | "backend" | "frontend" | "databases"
  | "distributed" | "cloud-devops" | "architecture"
  | "ml" | "deep-learning" | "llm-eng" | "ai-systems" | "mlops"
  | "projects" | "interview" | "career";

type CareerPath =
  | "backend" | "fullstack" | "ai-engineer"
  | "ml-engineer" | "research" | "founding";
```

**Grafo de dependencias:** derivado de `prerequisites`. Un tema no se puede marcar como *done* si tiene prerrequisitos sin completar → el checkbox queda bloqueado con tooltip mostrando qué falta. Override manual con confirmación (para gente que ya sabe el tema).

## 2. Contenido — 15 dominios

Estructura exacta pedida:

1. **Engineering Foundations** — SDLC, control de versiones, testing, clean code, code review, agile.
2. **Computer Science** — estructuras de datos, algoritmos, complejidad, teoría de la computación, compiladores básicos, SO, redes.
3. **Mathematics for AI** — álgebra lineal, cálculo multivariable, probabilidad, estadística, optimización, teoría de la información.
4. **Programming Languages** — TypeScript profundo, Python profundo (typing, async, perf).
5. **Backend Engineering** — APIs REST/GraphQL, auth, colas, caching, patrones de servicio.
6. **Frontend Engineering** — React, state, rendering, accesibilidad, performance web.
7. **Databases** — SQL, modelado, índices, transacciones, NoSQL, vector DBs.
8. **Distributed Systems** — CAP, consenso, replicación, event-driven, streaming.
9. **Cloud & DevOps** — Docker, K8s, CI/CD, IaC, observability, cost.
10. **Software Architecture & System Design** — DDD, hexagonal, microservicios vs monolito, patrones, casos clásicos (Uber, Netflix, etc.).
11. **Machine Learning** — regresión, clasificación, ensembles, feature eng, evaluación.
12. **Deep Learning** — MLP, CNN, RNN, transformers desde cero, training loops.
13. **LLM Engineering** — tokenización, fine-tuning, LoRA, quantization, inference optimization.
14. **AI Systems** — RAG (naive/advanced/graph), agents, MCP, evaluation, observability, memory, guardrails, prompt eng estructurado.
15. **MLOps** — model registry, serving, monitoring, drift, feature stores.

Más las tres transversales: **Portfolio Projects**, **Interview Preparation**, **Career & Job Search**.

Volumen objetivo: ~180–220 temas totales, cada uno con contenido real (no placeholders). El `roadmap-data.ts` será grande (~3–4k líneas) pero es un solo archivo estático.

## 3. Rutas profesionales (career paths)

Selector superior con 6 rutas: **Backend / Full Stack / AI Engineer / ML Engineer / Research Engineer / Founding Engineer**. Al elegir una ruta:
- Se resaltan los temas marcados como relevantes para ella.
- Aparece un panel con el % de progreso específico de esa ruta.
- Los temas no relevantes se atenúan (no se ocultan — pueden ampliarse manualmente).

## 4. Navegación (rutas de la app)

```
/                      → Overview: KPIs globales, progreso por dominio, progreso por ruta, próximo tema recomendado
/domains               → Grid de los 15 dominios con % completado y nivel promedio
/domains/$domainId     → Detalle del dominio: lista de temas por nivel, filtros
/topic/$topicId        → Ficha completa del tema (todos los campos), grafo local de prereqs y relacionados
/paths/$careerPath     → Ruta profesional: temas destacados, checklist priorizado
/graph                 → Grafo global interactivo (react-flow) coloreado por dominio y estado
/projects              → Portfolio projects con criterios de done
/interview             → Banco de preguntas por dominio
/career                → Guía de búsqueda de empleo
/wizybot               → Case Study: mapeo de conceptos → stack real de WizyBot
```

## 5. Progreso y BD

- **La tabla `progress` se mantiene** — solo se agregan filas nuevas conforme aparezcan temas nuevos. Los IDs existentes que sigan siendo válidos conservan su estado.
- Nuevas métricas derivadas en cliente: `% por dominio`, `% por nivel`, `% por ruta profesional`, temas bloqueados por prereqs, próximo tema sugerido (primer *Fundamentals* incompleto en el dominio con más avance).
- El hook `use-progress` no cambia su API pública.

## 6. WizyBot Case Study

Deja de ser el eje. Vive en `/wizybot` como una página que:
- Explica qué es WizyBot y su stack real (chatbot enterprise, multi-tenant, integraciones).
- Para cada componente de su arquitectura, enlaza a los temas del roadmap que lo sustentan (RAG, vector DBs, LLM serving, event-driven, multi-tenancy en Postgres, etc.).
- Sirve como ejemplo aplicado — "así se ven estos conceptos en un producto real".

## 7. Diseño

Mantengo el lenguaje editorial actual (Instrument Serif + JetBrains Mono + Inter, paleta paper & ink con acento naranja quemado) porque ya te gustó. Añado:
- Chips de dominio con color propio (15 tonos derivados de la paleta base).
- Badges de nivel (Fundamentals → Expert) con degradado.
- Indicador visual de "bloqueado por prereq" (candado + lista al hover).
- Vista de grafo con `react-flow` (nueva dependencia).

## 8. SEO / metadata

Cambio título del sitio a **"AI Software Engineering Roadmap"**, descripción y OG acorde. WizyBot pasa a ser subpágina.

## 9. Entregables (orden de implementación)

1. Rediseño de `roadmap-data.ts` con el nuevo modelo y contenido completo de los 15 dominios (varios turnos si hace falta por tamaño).
2. Utilidades: cálculo de progreso por dominio/ruta, resolución del grafo de prereqs, detección de bloqueos.
3. Nuevo `__root.tsx` con nav global (Overview / Domains / Paths / Graph / Projects / Interview / Career / WizyBot) y metadata nueva.
4. Rutas: `index`, `domains`, `domains.$domainId`, `topic.$topicId`, `paths.$careerPath`, `graph`, `projects`, `interview`, `career`, `wizybot`.
5. Componentes reutilizables: `TopicCard`, `TopicDetail`, `DomainProgressBar`, `PathSelector`, `PrereqLock`, `DependencyGraph`.
6. Instalar `react-flow` (`@xyflow/react`).
7. Ajustes al hook `use-progress` para exponer helpers `isBlocked(id)` y `blockersOf(id)`.

## 10. Fuera de alcance (dejo fuera salvo que lo pidas)

- Login / multi-usuario (sigue siendo single-user en BD pública).
- Timers / pomodoros / seguimiento temporal (lo pediste explícitamente evitar antes).
- Contenido de tutorial paso a paso — solo referencias a recursos externos.
- Importación/exportación de progreso.

---

Detalle técnico (por si te interesa): el grafo se renderiza con `@xyflow/react` con layout `dagre` calculado en cliente. El bloqueo de checkbox se hace en el hook `useProgress.toggle`, devolviendo `{ ok: false, blockedBy: string[] }` cuando aplica, y el componente muestra un modal de override. El contenido educativo se escribe en español (consistente con tu tono actual).

¿Apruebas para empezar por el `roadmap-data.ts` nuevo y la nav?