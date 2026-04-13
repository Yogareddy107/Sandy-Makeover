import { useState, useEffect } from "react";
import { X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { supabase } from "@/integrations/supabase/client";
const Gallery = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data } = await supabase
        .from("gallery_photos")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) {
        setUploadedPhotos(data.map((p) => ({ src: p.image_url, alt: p.title })));
      }
    };
    fetchPhotos();
  }, []);

  const allImages = uploadedPhotos;

  return (
    <main className="pt-20">
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionHeading title="Our Gallery" subtitle="Browse through our stunning makeover transformations" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            {allImages.map((img, i) => (
              <button
                key={`${img.alt}-${i}`}
                onClick={() => setLightbox(img.src)}
                className="overflow-hidden rounded-lg aspect-[3/4] focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img src={img.src} alt={img.alt} loading="lazy" width={800} height={1000} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[60] bg-foreground/90 flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-background hover:opacity-70">
            <X size={32} />
          </button>
          <img src={lightbox} alt="Enlarged view" className="max-w-full max-h-[85vh] rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </main>
  );
};

export default Gallery;
