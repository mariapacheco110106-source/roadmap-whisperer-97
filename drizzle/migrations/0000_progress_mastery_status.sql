ALTER TABLE public.progress ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'not_started';
ALTER TABLE public.progress ADD COLUMN IF NOT EXISTS checks jsonb NOT NULL DEFAULT '{}'::jsonb;
UPDATE public.progress SET status = 'practiced' WHERE done = true AND status = 'not_started';