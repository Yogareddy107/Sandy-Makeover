
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
ON public.reviews FOR SELECT TO public
USING (true);

CREATE POLICY "Allow insert for reviews"
ON public.reviews FOR INSERT TO public
WITH CHECK (true);

CREATE POLICY "Allow delete for reviews"
ON public.reviews FOR DELETE TO public
USING (true);
