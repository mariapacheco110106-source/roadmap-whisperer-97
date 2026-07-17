import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import type { Topic } from "@/lib/roadmap-data";
import { DOMAIN_BY_ID } from "@/lib/roadmap-data";
import { useProgress } from "@/hooks/use-progress";

interface Props {
  topic: Topic;
  showDomain?: boolean;
}

export function TopicCard({ topic, showDomain = false }: Props) {
  const p = useProgress();
  const done = p.isDone(topic.id);
  const blocked = p.isBlocked(topic.id);
  const blockers = blocked ? p.blockersOf(topic.id) : [];
  const domain = DOMAIN_BY_ID[topic.domain];

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = p.toggle(topic.id);
    if (!res.ok) {
      const names = blockers.map((b) => `• ${b.title}`).join("\n");
      const ok = window.confirm(
        `Este tema requiere completar antes:\n\n${names}\n\n¿Marcar como hecho de todas formas?`,
      );
      if (ok) p.toggle(topic.id, { force: true });
    }
  };

  return (
    <div className="group relative rounded-lg border border-border bg-card p-4 transition hover:border-foreground/40">
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          aria-label={done ? "Marcar como no hecho" : "Marcar como hecho"}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
            done
              ? "border-accent bg-accent text-accent-foreground"
              : blocked
                ? "border-border bg-muted text-muted-foreground"
                : "border-border bg-background hover:border-foreground"
          }`}
        >
          {done ? "✓" : blocked ? <Lock className="h-3 w-3" /> : null}
        </button>
        <div className="min-w-0 flex-1">
          <Link
            to="/topic/$topicId"
            params={{ topicId: topic.id }}
            className="block"
          >
            <div className="flex items-center gap-2">
              {showDomain && (
                <span
                  className="rounded-sm px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide"
                  style={{ backgroundColor: `${domain.color}22`, color: domain.color }}
                >
                  {domain.short}
                </span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                {topic.level}
              </span>
            </div>
            <h3 className={`mt-1 font-display text-xl leading-tight ${done ? "text-muted-foreground line-through decoration-1" : "text-foreground"}`}>
              {topic.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{topic.summary}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
