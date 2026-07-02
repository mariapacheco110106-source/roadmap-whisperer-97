
CREATE TABLE public.progress (
  topic_id TEXT PRIMARY KEY,
  done BOOLEAN NOT NULL DEFAULT false,
  note TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.progress TO anon, authenticated;
GRANT ALL ON public.progress TO service_role;

ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read progress" ON public.progress FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert progress" ON public.progress FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public update progress" ON public.progress FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public delete progress" ON public.progress FOR DELETE TO anon, authenticated USING (true);
