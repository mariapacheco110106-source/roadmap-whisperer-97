import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "wizybot-roadmap-progress-v1";

interface ProgressState {
  done: Record<string, boolean>;
  notes: Record<string, string>;
}

const emptyState: ProgressState = { done: {}, notes: {} };

function read(): ProgressState {
  if (typeof window === "undefined") return emptyState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw);
    return { done: parsed.done ?? {}, notes: parsed.notes ?? {} };
  } catch {
    return emptyState;
  }
}

function write(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(read());
    setHydrated(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev, done: { ...prev.done, [id]: !prev.done[id] } };
      if (!next.done[id]) delete next.done[id];
      write(next);
      return next;
    });
  }, []);

  const setNote = useCallback((id: string, note: string) => {
    setState((prev) => {
      const next = { ...prev, notes: { ...prev.notes, [id]: note } };
      if (!note) delete next.notes[id];
      write(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    write(emptyState);
    setState(emptyState);
  }, []);

  const bulkSet = useCallback((ids: string[], value: boolean) => {
    setState((prev) => {
      const done = { ...prev.done };
      for (const id of ids) {
        if (value) done[id] = true;
        else delete done[id];
      }
      const next = { ...prev, done };
      write(next);
      return next;
    });
  }, []);

  return {
    done: state.done,
    notes: state.notes,
    hydrated,
    toggle,
    setNote,
    reset,
    bulkSet,
    isDone: (id: string) => Boolean(state.done[id]),
  };
}
