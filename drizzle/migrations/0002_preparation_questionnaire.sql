CREATE TABLE public.preparation_responses (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 exam text NOT NULL CHECK (exam IN ('UPSC','State PCS','UGC NET-JRF')),
 stage text NOT NULL CHECK (stage IN ('Starting out','Preparing regularly','Mains / advanced preparation')),
 daily_hours integer NOT NULL CHECK (daily_hours BETWEEN 1 AND 16),
 support text NOT NULL CHECK (support IN ('Mentorship','Notes','Answer writing','Daily classes')),
 challenge text NOT NULL DEFAULT '' CHECK (char_length(challenge) <= 1000),
 consent boolean NOT NULL CHECK (consent = true)
);
GRANT INSERT ON public.preparation_responses TO anon, authenticated;
GRANT SELECT, DELETE ON public.preparation_responses TO authenticated;
GRANT ALL ON public.preparation_responses TO service_role;
ALTER TABLE public.preparation_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors submit consented questionnaires" ON public.preparation_responses FOR INSERT TO anon, authenticated WITH CHECK (consent = true);
CREATE POLICY "Publishers read questionnaire responses" ON public.preparation_responses FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Publishers delete questionnaire responses" ON public.preparation_responses FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX preparation_responses_created_idx ON public.preparation_responses (created_at DESC);