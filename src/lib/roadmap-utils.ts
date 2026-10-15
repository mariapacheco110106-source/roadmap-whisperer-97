import { TOPICS, TOPICS_BY_ID, TOPICS_BY_DOMAIN, DOMAINS, LEVEL_ORDER } from "./roadmap-data";
import type { CareerPath, DomainId, Topic } from "./roadmap-data";

export function blockersOf(topicId: string, doneMap: Record<string, boolean>): Topic[] {
  const t = TOPICS_BY_ID[topicId];
  if (!t) return [];
  return t.prerequisites.map((pid) => TOPICS_BY_ID[pid]).filter((p) => p && !doneMap[p.id]);
}

export function isBlocked(topicId: string, doneMap: Record<string, boolean>): boolean {
  return blockersOf(topicId, doneMap).length > 0;
}

export function domainProgress(domain: DomainId, doneMap: Record<string, boolean>) {
  const topics = TOPICS_BY_DOMAIN[domain] ?? [];
  const done = topics.filter((t) => doneMap[t.id]).length;
  return { done, total: topics.length, pct: topics.length ? Math.round((done / topics.length) * 100) : 0 };
}

export function pathTopics(path: CareerPath): Topic[] {
  return TOPICS.filter((t) => t.careerPaths.includes(path));
}

export function pathProgress(path: CareerPath, doneMap: Record<string, boolean>) {
  const topics = pathTopics(path);
  const done = topics.filter((t) => doneMap[t.id]).length;
  return { done, total: topics.length, pct: topics.length ? Math.round((done / topics.length) * 100) : 0 };
}

export function globalProgress(doneMap: Record<string, boolean>) {
  const total = TOPICS.length;
  const done = TOPICS.filter((t) => doneMap[t.id]).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function nextRecommended(doneMap: Record<string, boolean>, path?: CareerPath): Topic | null {
  const pool = path ? pathTopics(path) : TOPICS;
  const candidates = pool
    .filter((t) => !doneMap[t.id] && !isBlocked(t.id, doneMap))
    .sort((a, b) => {
      if (LEVEL_ORDER[a.level] !== LEVEL_ORDER[b.level]) return LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level];
      const da = domainProgress(a.domain, doneMap).pct;
      const db = domainProgress(b.domain, doneMap).pct;
      return db - da; // prioriza dominio con más avance para cerrarlo
    });
  return candidates[0] ?? null;
}

export function domainMeta(id: DomainId) {
  return DOMAINS.find((d) => d.id === id)!;
}
