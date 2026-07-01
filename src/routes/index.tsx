import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { technologies, weeks, quickWins, totalTopics, type Topic } from "@/lib/roadmap-data";
import { useProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/")({
  component: RoadmapPage,
});

type View = "overview" | "tech" | "weeks" | "quickwins";

function RoadmapPage() {
  const progress = useProgress();
  const [view, setView] = useState<View>("overview");
  const [activeTech, setActiveTech] = useState<string>(technologies[0].id);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "done">("all");
  const [levelFilter, setLevelFilter] = useState<number | "all">("all");

  const doneCount = Object.keys(progress.done).length;
  const globalPct = Math.round((doneCount / totalTopics) * 100);

  const techStats = useMemo(
    () =>
      technologies.map((tech) => {
        const total = tech.topics.length;
        const done = tech.topics.filter((tp) => progress.isDone(tp.id)).length;
        return { id: tech.id, total, done, pct: total ? Math.round((done / total) * 100) : 0 };
      }),
    [progress.done],
  );

  const totalHours = useMemo(
    () =>
      technologies.reduce(
        (sum, tech) =>
          sum + tech.topics.reduce((s, tp) => s + (tp.hours ?? 0), 0),
        0,
      ),
    [],
  );
  const doneHours = useMemo(
    () =>
      technologies.reduce(
        (sum, tech) =>
          sum +
          tech.topics
            .filter((tp) => progress.isDone(tp.id))
            .reduce((s, tp) => s + (tp.hours ?? 0), 0),
        0,
      ),
    [progress.done],
  );

  const doneWeeks = weeks.filter((w) => progress.isDone(`week-${w.n}`)).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        globalPct={globalPct}
        doneCount={doneCount}
        totalTopics={totalTopics}
        onReset={() => {
          if (confirm("¿Reiniciar todo tu progreso? Esta acción no se puede deshacer.")) {
            progress.reset();
          }
        }}
      />

      <Nav view={view} setView={setView} />

      <main className="mx-auto max-w-6xl px-6 pb-32">
        {view === "overview" && (
          <Overview
            techStats={techStats}
            doneCount={doneCount}
            totalTopics={totalTopics}
            doneHours={doneHours}
            totalHours={totalHours}
            doneWeeks={doneWeeks}
            onJumpTech={(id) => {
              setActiveTech(id);
              setView("tech");
            }}
            progress={progress}
          />
        )}

        {view === "tech" && (
          <TechView
            activeTech={activeTech}
            setActiveTech={setActiveTech}
            techStats={techStats}
            query={query}
            setQuery={setQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            levelFilter={levelFilter}
            setLevelFilter={setLevelFilter}
            progress={progress}
          />
        )}

        {view === "weeks" && <WeeksView progress={progress} />}

        {view === "quickwins" && <QuickWinsView progress={progress} />}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-muted-foreground font-mono flex flex-wrap gap-4 justify-between">
          <span>WIZYBOT ROADMAP · v1</span>
          <span>Progreso guardado localmente en tu navegador</span>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header({
  globalPct,
  doneCount,
  totalTopics,
  onReset,
}: {
  globalPct: number;
  doneCount: number;
  totalTopics: number;
  onReset: () => void;
}) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-8">
        <div className="flex items-baseline justify-between gap-8 flex-wrap">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Plan de carrera · Backend / AI / Distribuido
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95]">
              WizyBot
              <span className="italic text-accent"> Roadmap</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm md:text-base text-muted-foreground">
              10 tecnologías, {totalTopics} temas, 26 semanas. Marca lo que dominas, filtra lo que
              falta. Tu progreso vive en este navegador.
            </p>
          </div>

          <div className="min-w-[260px]">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Progreso global
              </span>
              <span className="font-mono text-sm">
                {doneCount}/{totalTopics}
              </span>
            </div>
            <div className="h-2 bg-secondary relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-accent transition-all duration-500"
                style={{ width: `${globalPct}%` }}
              />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-display text-4xl leading-none">{globalPct}%</span>
              <button
                onClick={onReset}
                className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-accent transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Nav ---------------- */
function Nav({ view, setView }: { view: View; setView: (v: View) => void }) {
  const items: { id: View; label: string }[] = [
    { id: "overview", label: "Panorama" },
    { id: "tech", label: "Por tecnología" },
    { id: "weeks", label: "26 semanas" },
    { id: "quickwins", label: "Quick wins" },
  ];
  return (
    <nav className="sticky top-0 z-20 bg-background/85 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-6xl px-6 flex gap-6 overflow-x-auto">
        {items.map((item) => {
          const active = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`py-4 text-sm relative whitespace-nowrap transition ${
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {active && (
                <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ---------------- Overview ---------------- */
function Overview({
  techStats,
  doneCount,
  totalTopics,
  doneHours,
  totalHours,
  doneWeeks,
  onJumpTech,
  progress,
}: {
  techStats: { id: string; total: number; done: number; pct: number }[];
  doneCount: number;
  totalTopics: number;
  doneHours: number;
  totalHours: number;
  doneWeeks: number;
  onJumpTech: (id: string) => void;
  progress: ReturnType<typeof useProgress>;
}) {
  const nextTopics = useMemo(() => {
    const list: { tech: string; topic: Topic; techId: string }[] = [];
    for (const tech of technologies) {
      for (const tp of tech.topics) {
        if (!progress.isDone(tp.id)) {
          list.push({ tech: tech.name, topic: tp, techId: tech.id });
        }
      }
    }
    return list
      .sort((a, b) => {
        const pri = (p: string) => (p === "Alta" ? 0 : p === "Media" ? 1 : 2);
        if (pri(a.topic.priority) !== pri(b.topic.priority)) {
          return pri(a.topic.priority) - pri(b.topic.priority);
        }
        return a.topic.level - b.topic.level;
      })
      .slice(0, 6);
  }, [progress.done]);

  return (
    <div className="pt-12 space-y-16">
      {/* Métricas */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
        <Metric label="Temas completados" value={`${doneCount}`} sub={`de ${totalTopics}`} />
        <Metric
          label="Horas estimadas"
          value={`${doneHours}h`}
          sub={`de ${totalHours}h`}
        />
        <Metric label="Semanas hechas" value={`${doneWeeks}`} sub={`de 26`} />
        <Metric
          label="Tecnologías dominadas"
          value={`${techStats.filter((t) => t.pct === 100).length}`}
          sub={`de ${techStats.length}`}
        />
      </section>

      {/* Tecnologías con progreso */}
      <section>
        <SectionTitle
          eyebrow="01"
          title="Tu mapa de tecnologías"
          desc="Cada barra muestra qué tan cerca estás de dominar esa área. Click en una para ver todos los temas."
        />
        <div className="mt-8 space-y-1">
          {technologies.map((tech) => {
            const stats = techStats.find((s) => s.id === tech.id)!;
            return (
              <button
                key={tech.id}
                onClick={() => onJumpTech(tech.id)}
                className="w-full group text-left border border-border bg-card hover:border-accent transition p-5 grid grid-cols-12 gap-4 items-center"
              >
                <div className="col-span-12 md:col-span-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {tech.priority}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      Dif {tech.difficulty}/10
                    </span>
                  </div>
                  <div className="font-display text-2xl mt-1 group-hover:text-accent transition">
                    {tech.name}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{tech.summary}</p>
                </div>
                <div className="col-span-12 md:col-span-2">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-mono text-xs text-muted-foreground">
                      {stats.done}/{stats.total}
                    </span>
                    <span className="font-display text-2xl leading-none">{stats.pct}%</span>
                  </div>
                  <div className="h-[3px] bg-secondary">
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${stats.pct}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Siguiente movimiento */}
      <section>
        <SectionTitle
          eyebrow="02"
          title="Tu siguiente movimiento"
          desc="Temas prioritarios que aún no marcaste como completados. Ordenados por prioridad y nivel."
        />
        {nextTopics.length === 0 ? (
          <div className="mt-8 border border-border p-10 text-center">
            <div className="font-display text-3xl italic text-accent">Todo listo.</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Completaste el roadmap entero. Ahora toca construir.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid md:grid-cols-2 gap-px bg-border border border-border">
            {nextTopics.map(({ tech, topic, techId }) => (
              <div key={topic.id} className="bg-card p-5 flex gap-4">
                <button
                  onClick={() => progress.toggle(topic.id)}
                  className="mt-1 w-4 h-4 border border-foreground shrink-0 hover:bg-accent hover:border-accent transition"
                  aria-label="Marcar completado"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <span>{tech}</span>
                    <span>·</span>
                    <span>Nivel {topic.level}</span>
                    <span>·</span>
                    <span className={topic.priority === "Alta" ? "text-accent" : ""}>
                      {topic.priority}
                    </span>
                  </div>
                  <div className="mt-1 text-sm leading-snug">{topic.title}</div>
                  <button
                    onClick={() => onJumpTech(techId)}
                    className="mt-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-accent"
                  >
                    Ver contexto →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="border-b border-border pb-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-muted-foreground">{eyebrow}</span>
        <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
      </div>
      {desc && <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{desc}</p>}
    </div>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-card p-6">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-3 font-display text-4xl md:text-5xl leading-none">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground font-mono">{sub}</div>}
    </div>
  );
}

/* ---------------- Tech View ---------------- */
function TechView({
  activeTech,
  setActiveTech,
  techStats,
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
  levelFilter,
  setLevelFilter,
  progress,
}: {
  activeTech: string;
  setActiveTech: (id: string) => void;
  techStats: { id: string; total: number; done: number; pct: number }[];
  query: string;
  setQuery: (q: string) => void;
  statusFilter: "all" | "pending" | "done";
  setStatusFilter: (v: "all" | "pending" | "done") => void;
  levelFilter: number | "all";
  setLevelFilter: (v: number | "all") => void;
  progress: ReturnType<typeof useProgress>;
}) {
  const tech = technologies.find((t) => t.id === activeTech)!;
  const stats = techStats.find((s) => s.id === activeTech)!;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tech.topics.filter((tp) => {
      if (q && !tp.title.toLowerCase().includes(q)) return false;
      if (statusFilter === "done" && !progress.isDone(tp.id)) return false;
      if (statusFilter === "pending" && progress.isDone(tp.id)) return false;
      if (levelFilter !== "all" && tp.level !== levelFilter) return false;
      return true;
    });
  }, [tech, query, statusFilter, levelFilter, progress.done]);

  const byLevel = useMemo(() => {
    const map = new Map<number, Topic[]>();
    for (const t of filtered) {
      if (!map.has(t.level)) map.set(t.level, []);
      map.get(t.level)!.push(t);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a - b);
  }, [filtered]);

  return (
    <div className="pt-8 grid md:grid-cols-[220px_1fr] gap-10">
      {/* Sidebar */}
      <aside className="md:sticky md:top-16 md:self-start">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Tecnologías
        </div>
        <div className="space-y-px">
          {technologies.map((t) => {
            const s = techStats.find((x) => x.id === t.id)!;
            const active = t.id === activeTech;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTech(t.id)}
                className={`w-full text-left py-2 px-3 border-l-2 transition ${
                  active
                    ? "border-accent bg-secondary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <div className="text-sm leading-tight">{t.name}</div>
                <div className="mt-1 flex items-center gap-2 text-[10px] font-mono">
                  <span className="text-muted-foreground">
                    {s.done}/{s.total}
                  </span>
                  <div className="flex-1 h-[2px] bg-border">
                    <div className="h-full bg-accent" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Detail */}
      <section className="min-w-0">
        <div className="border-b border-border pb-6">
          <div className="flex items-baseline gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span>{tech.priority}</span>
            <span>·</span>
            <span>{tech.totalWeeks} semanas</span>
            <span>·</span>
            <span>Dificultad {tech.difficulty}/10</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl mt-2">{tech.name}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">{tech.summary}</p>

          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-display text-3xl">{stats.pct}%</span>
            <div className="flex-1 h-1 bg-secondary max-w-md">
              <div className="h-full bg-accent" style={{ width: `${stats.pct}%` }} />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {stats.done}/{stats.total}
            </span>
          </div>

          {tech.wizybotRefs.length > 0 && (
            <details className="mt-5 group">
              <summary className="cursor-pointer text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground">
                Referencias en el codebase ↓
              </summary>
              <ul className="mt-3 space-y-1 font-mono text-xs text-muted-foreground">
                {tech.wizybotRefs.map((r) => (
                  <li key={r} className="pl-4 border-l border-border">
                    {r}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar tema..."
            className="flex-1 min-w-[200px] bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent placeholder:text-muted-foreground"
          />
          <FilterChip
            options={[
              { v: "all", l: "Todos" },
              { v: "pending", l: "Pendientes" },
              { v: "done", l: "Hechos" },
            ]}
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as "all" | "pending" | "done")}
          />
          <FilterChip
            options={[
              { v: "all", l: "N. todos" },
              { v: 1, l: "N1" },
              { v: 2, l: "N2" },
              { v: 3, l: "N3" },
              { v: 4, l: "N4" },
              { v: 5, l: "N5" },
            ]}
            value={levelFilter}
            onChange={(v) => setLevelFilter(v as number | "all")}
          />
        </div>

        {/* Topics grouped by level */}
        <div className="mt-8 space-y-10">
          {byLevel.length === 0 && (
            <div className="text-sm text-muted-foreground italic py-8">
              No hay temas que coincidan con esos filtros.
            </div>
          )}
          {byLevel.map(([level, items]) => {
            const levelIds = items.map((i) => i.id);
            const allDone = items.every((i) => progress.isDone(i.id));
            return (
              <div key={level}>
                <div className="flex items-baseline justify-between border-b border-border pb-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Nivel {level}
                    </span>
                    <span className="font-display text-xl">{levelName(level)}</span>
                  </div>
                  <button
                    onClick={() => progress.bulkSet(levelIds, !allDone)}
                    className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-accent"
                  >
                    {allDone ? "Desmarcar todo" : "Marcar todo"}
                  </button>
                </div>
                <ul className="mt-3 divide-y divide-border">
                  {items.map((tp) => (
                    <TopicRow key={tp.id} topic={tp} progress={progress} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function FilterChip<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { v: T; l: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex border border-border">
      {options.map((o) => {
        const active = o.v === value;
        return (
          <button
            key={String(o.v)}
            onClick={() => onChange(o.v)}
            className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest transition border-l border-border first:border-l-0 ${
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.l}
          </button>
        );
      })}
    </div>
  );
}

function TopicRow({
  topic,
  progress,
}: {
  topic: Topic;
  progress: ReturnType<typeof useProgress>;
}) {
  const done = progress.isDone(topic.id);
  const [showNote, setShowNote] = useState(false);
  const note = progress.notes[topic.id] ?? "";

  return (
    <li className="py-3 group">
      <div className="flex items-start gap-4">
        <button
          onClick={() => progress.toggle(topic.id)}
          className={`mt-1 w-4 h-4 shrink-0 border border-foreground transition ${
            done ? "bg-accent border-accent" : "hover:bg-foreground/10"
          }`}
          aria-label={done ? "Desmarcar" : "Marcar completado"}
        />
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm leading-snug ${
              done ? "line-through text-muted-foreground" : ""
            }`}
          >
            {topic.title}
          </div>
          <div className="mt-1 flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className={topic.priority === "Alta" ? "text-accent" : ""}>
              {topic.priority}
            </span>
            <span>Dif {topic.difficulty}</span>
            {topic.hours && <span>{topic.hours}h</span>}
            <button
              onClick={() => setShowNote((s) => !s)}
              className="ml-auto hover:text-foreground"
            >
              {note ? "✎ nota" : "+ nota"}
            </button>
          </div>
          {showNote && (
            <textarea
              value={note}
              onChange={(e) => progress.setNote(topic.id, e.target.value)}
              placeholder="Tu nota, referencia o pregunta pendiente..."
              className="mt-2 w-full bg-secondary/50 border border-border p-2 text-xs font-mono focus:outline-none focus:border-accent min-h-[60px] resize-y"
            />
          )}
          {!showNote && note && (
            <div className="mt-1 text-xs text-muted-foreground italic truncate">— {note}</div>
          )}
        </div>
      </div>
    </li>
  );
}

function levelName(n: number) {
  return (
    ["", "Fundamentos", "Intermedio", "Avanzado", "Senior", "Staff / Expert"][n] || `Nivel ${n}`
  );
}

/* ---------------- Weeks View ---------------- */
function WeeksView({ progress }: { progress: ReturnType<typeof useProgress> }) {
  const byMonth = useMemo(() => {
    const map = new Map<number, typeof weeks>();
    for (const w of weeks) {
      if (!map.has(w.month)) map.set(w.month, []);
      map.get(w.month)!.push(w);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a - b);
  }, []);

  const doneCount = weeks.filter((w) => progress.isDone(`week-${w.n}`)).length;

  return (
    <div className="pt-12 space-y-12">
      <div className="border-b border-border pb-4 flex items-baseline justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Plan operativo
          </div>
          <h2 className="font-display text-4xl md:text-5xl">26 semanas, 6 meses</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Cada semana viene con actividades concretas y un output entregable. Marca la casilla
            cuando la termines.
          </p>
        </div>
        <div className="text-right">
          <div className="font-display text-4xl">{doneCount}/26</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            semanas cerradas
          </div>
        </div>
      </div>

      {byMonth.map(([month, list]) => {
        const monthTitle = list[0].monthTitle;
        const monthDone = list.filter((w) => progress.isDone(`week-${w.n}`)).length;
        return (
          <section key={month}>
            <div className="flex items-baseline justify-between border-b border-border pb-2">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-muted-foreground">
                  Mes {String(month).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl">{monthTitle}</h3>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {monthDone}/{list.length}
              </span>
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-px bg-border border border-border">
              {list.map((w) => {
                const id = `week-${w.n}`;
                const done = progress.isDone(id);
                const tech = technologies.find((t) => t.id === w.techId);
                return (
                  <div key={w.n} className="bg-card p-5">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => progress.toggle(id)}
                        className={`mt-1 w-4 h-4 shrink-0 border border-foreground transition ${
                          done ? "bg-accent border-accent" : "hover:bg-foreground/10"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                          <span>Semana {String(w.n).padStart(2, "0")}</span>
                          {tech && <span className="text-accent">{tech.name}</span>}
                        </div>
                        <div
                          className={`mt-1 font-display text-xl leading-tight ${
                            done ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {w.title}
                        </div>
                        <ul className="mt-3 space-y-1 text-xs text-muted-foreground list-disc pl-4">
                          {w.activities.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                        <div className="mt-3 pt-3 border-t border-border">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                            Output:{" "}
                          </span>
                          <span className="text-xs italic">{w.output}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ---------------- Quick Wins ---------------- */
function QuickWinsView({ progress }: { progress: ReturnType<typeof useProgress> }) {
  const [sortBy, setSortBy] = useState<"impact" | "days">("impact");
  const sorted = useMemo(() => {
    const list = [...quickWins];
    if (sortBy === "impact") list.sort((a, b) => b.impact - a.impact);
    else list.sort((a, b) => a.days - b.days);
    return list;
  }, [sortBy]);

  const doneCount = quickWins.filter((q) => progress.isDone(q.id)).length;

  return (
    <div className="pt-12 space-y-8">
      <div className="border-b border-border pb-4 flex items-baseline justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Alto impacto · poco tiempo
          </div>
          <h2 className="font-display text-4xl md:text-5xl">20 Quick Wins</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Temas que en pocos días te dan un salto real de comprensión del código de WizyBot.
          </p>
        </div>
        <div className="flex items-baseline gap-6">
          <div className="text-right">
            <div className="font-display text-4xl">{doneCount}/20</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              completados
            </div>
          </div>
          <FilterChip
            options={[
              { v: "impact", l: "Por impacto" },
              { v: "days", l: "Por tiempo" },
            ]}
            value={sortBy}
            onChange={(v) => setSortBy(v as "impact" | "days")}
          />
        </div>
      </div>

      <ul className="divide-y divide-border border border-border">
        {sorted.map((q) => {
          const done = progress.isDone(q.id);
          const tech = technologies.find((t) => t.id === q.techId);
          return (
            <li key={q.id} className="bg-card p-4 flex items-start gap-4">
              <button
                onClick={() => progress.toggle(q.id)}
                className={`mt-1 w-4 h-4 shrink-0 border border-foreground transition ${
                  done ? "bg-accent border-accent" : "hover:bg-foreground/10"
                }`}
              />
              <div className="flex-1 min-w-0 grid md:grid-cols-12 gap-3 items-baseline">
                <div className="md:col-span-6">
                  <div
                    className={`text-sm ${done ? "line-through text-muted-foreground" : ""}`}
                  >
                    {q.title}
                  </div>
                  <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {tech?.name} · {q.refs}
                  </div>
                </div>
                <div className="md:col-span-3 flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    Impacto
                  </span>
                  <div className="flex-1 h-1 bg-secondary max-w-[120px]">
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${q.impact * 10}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs">{q.impact}/10</span>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span className="font-display text-2xl">{q.days}</span>
                  <span className="ml-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {q.days === 1 ? "día" : "días"}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
