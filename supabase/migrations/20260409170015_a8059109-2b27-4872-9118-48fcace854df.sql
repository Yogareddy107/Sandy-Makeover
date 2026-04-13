-- Create gallery_photos table
CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Everyone can view gallery photos
CREATE POLICY "Gallery photos are viewable by everyone"
ON public.gallery_photos FOR SELECT USING (true);

-- Anyone can insert (PIN protection is handled in the UI)
CREATE POLICY "Allow insert for gallery photos"
ON public.gallery_photos FOR INSERT WITH CHECK (true);

-- Anyone can delete (PIN protection is handled in the UI)
CREATE POLICY "Allow delete for gallery photos"
ON public.gallery_photos FOR DELETE USING (true);

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Public read access for gallery bucket
CREATE POLICY "Gallery images are publicly accessible"
ON storage.objects FOR SELECT USING (bucket_id = 'gallery');

-- Allow uploads to gallery bucket (PIN protection in UI)
CREATE POLICY "Allow gallery uploads"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery');

-- Allow deletes from gallery bucket
CREATE POLICY "Allow gallery deletes"
ON storage.objects FOR DELETE USING (bucket_id = 'gallery');