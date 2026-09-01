import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "wizybot-roadmap-progress-v1";
const MIGRATED_FLAG = "wizybot-roadmap-migrated-v1";

interface ProgressState {
  done: Record<string, boolean>;
  notes: Record<string, string>;
}

const emptyState: ProgressState = { done: {}, notes: {} };

function readLocal(): ProgressState {
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

async function fetchAll(): Promise<ProgressState> {
  const { data, error } = await supabase.from("progress").select("*");
  if (error || !data) return emptyState;
  const state: ProgressState = { done: {}, notes: {} };
  for (const row of data) {
    if (row.done) state.done[row.topic_id] = true;
    if (row.note) state.notes[row.topic_id] = row.note;
  }
  return state;
}

async function upsertRow(topic_id: string, patch: { done?: boolean; note?: string }) {
  await supabase.from("progress").upsert(
    {
      topic_id,
      done: patch.done ?? false,
      note: patch.note ?? "",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "topic_id" },
  );
}

async function deleteRow(topic_id: string) {
  await supabase.from("progress").delete().eq("topic_id", topic_id);
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(emptyState);
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    (async () => {
      const local = readLocal();
      const alreadyMigrated =
        typeof window !== "undefined" && window.localStorage.getItem(MIGRATED_FLAG) === "1";
      const remote = await fetchAll();

      const hasLocal =
        Object.keys(local.done).length > 0 || Object.keys(local.notes).length > 0;

      if (hasLocal && !alreadyMigrated) {
        // Merge local into remote (local wins on conflict for first migration).
        const ids = new Set([
          ...Object.keys(local.done),
          ...Object.keys(local.notes),
        ]);
        const rows = Array.from(ids).map((id) => ({
          topic_id: id,
          done: Boolean(local.done[id] ?? remote.done[id]),
          note: local.notes[id] ?? remote.notes[id] ?? "",
          updated_at: new Date().toISOString(),
        }));
        if (rows.length > 0) {
          await supabase.from("progress").upsert(rows, { onConflict: "topic_id" });
        }
        window.localStorage.setItem(MIGRATED_FLAG, "1");
        const merged = await fetchAll();
        setState(merged);
      } else {
        if (!alreadyMigrated && typeof window !== "undefined") {
          window.localStorage.setItem(MIGRATED_FLAG, "1");
        }
        setState(remote);
      }
      setHydrated(true);
    })();
  }, []);

  const toggle = useCallback((id: string) => {
    const current = Boolean(stateRef.current.done[id]);
    const next = !current;
    setState((prev) => {
      const done = { ...prev.done };
      if (next) done[id] = true;
      else delete done[id];
      return { ...prev, done };
    });
    const note = stateRef.current.notes[id] ?? "";
    if (!next && !note) {
      void deleteRow(id);
    } else {
      void upsertRow(id, { done: next, note });
    }
  }, []);

  const setNote = useCallback((id: string, note: string) => {
    setState((prev) => {
      const notes = { ...prev.notes };
      if (note) notes[id] = note;
      else delete notes[id];
      return { ...prev, notes };
    });
    const done = Boolean(stateRef.current.done[id]);
    if (!note && !done) {
      void deleteRow(id);
    } else {
      void upsertRow(id, { done, note });
    }
  }, []);

  const reset = useCallback(() => {
    setState(emptyState);
    void supabase.from("progress").delete().neq("topic_id", "");
  }, []);

  const bulkSet = useCallback((ids: string[], value: boolean) => {
    setState((prev) => {
      const done = { ...prev.done };
      for (const id of ids) {
        if (value) done[id] = true;
        else delete done[id];
      }
      return { ...prev, done };
    });
    if (value) {
      const rows = ids.map((id) => ({
        topic_id: id,
        done: true,
        note: stateRef.current.notes[id] ?? "",
        updated_at: new Date().toISOString(),
      }));
      void supabase.from("progress").upsert(rows, { onConflict: "topic_id" });
    } else {
      // For unset, delete rows that have no note, otherwise update done=false
      const withNotes = ids.filter((id) => stateRef.current.notes[id]);
      const withoutNotes = ids.filter((id) => !stateRef.current.notes[id]);
      if (withoutNotes.length > 0) {
        void supabase.from("progress").delete().in("topic_id", withoutNotes);
      }
      if (withNotes.length > 0) {
        const rows = withNotes.map((id) => ({
          topic_id: id,
          done: false,
          note: stateRef.current.notes[id] ?? "",
          updated_at: new Date().toISOString(),
        }));
        void supabase.from("progress").upsert(rows, { onConflict: "topic_id" });
      }
    }
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
