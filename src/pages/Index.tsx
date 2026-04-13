import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { Sparkles, Scissors, Star, ArrowRight, Quote } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/hero-pink-black.png";
import SectionHeading from "@/components/SectionHeading";
import { supabase } from "@/integrations/supabase/client";

const services = [
  { icon: Sparkles, title: "Makeover", desc: "Flawless bridal & party makeup tailored to your style" },
  { icon: Scissors, title: "Hair Styling", desc: "Elegant updos, curls, and trending hairstyles" },
  { icon: Star, title: "Saree Draping", desc: "Perfect draping for every occasion and style" },
];

const defaultTestimonials = [
  { name: "Priya R.", text: "Sandy made me feel like a queen on my wedding day! Absolutely stunning work.", rating: 5 },
  { name: "Lakshmi K.", text: "Best makeup artist in Tirupati! My party look was perfect and lasted all night.", rating: 5 },
  { name: "Sneha M.", text: "Professional, punctual, and incredibly talented. Highly recommend Sandy makeovers!", rating: 5 },
];

const Index = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [featuredPhotos, setFeaturedPhotos] = useState<{ src: string; alt: string }[]>([]);
  const [emblaRef] = useEmblaCarousel({ 
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: true
  });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setTestimonials(data.map((r) => ({ name: r.name, text: r.text, rating: r.rating })));
      }
    };

    const fetchPhotos = async () => {
      const { data } = await supabase
        .from("gallery_photos")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);
      if (data) {
        setFeaturedPhotos(data.map((p) => ({ src: p.image_url, alt: p.title })));
      }
    };

    fetchReviews();
    fetchPhotos();
  }, []);

  return (
  <main className="overflow-hidden bg-black text-white">
    {/* Hero */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Pink & Black Stylish Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0"
        >
          <img 
            src={heroImg} 
            className="w-full h-full object-cover opacity-60" 
            alt="Hero Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        </motion.div>
        
        {/* Decorative Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[0%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/10 blur-[150px]" />
        </div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative container text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 space-y-2"
        >
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary font-medium">
            Tirupati's Premier Makeup Artist
          </p>
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-yellow-500 font-semibold">
            Certified Professional Makeover Artist
          </p>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tighter"
        >
          Sandy <span className="text-primary">makeovers</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-heading text-lg md:text-2xl italic text-gray-400 mb-6 max-w-2xl mx-auto"
        >
          "Beauty is power.. a smile is its sword"
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-10"
        >
          <span className="px-6 py-2 rounded-full border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-black text-xs md:text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(234,179,8,0.4)] animate-pulse">
            Masterclasses also available
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a
            href="https://wa.me/919845227642?text=Hi%20Sandy!%20I%20want%20to%20book%20a%20makeover"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-primary text-white px-10 py-4 rounded-full font-semibold overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(255,46,126,0.4)]"
          >
            <span className="relative z-10">Book on WhatsApp</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none opacity-10" />
          </a>
          <Link
            to="/services"
            className="group px-10 py-4 rounded-full font-semibold border border-white/20 hover:border-primary transition-all flex items-center justify-center gap-2"
          >
            Explore Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
      </motion.div>
    </section>

    {/* Services Preview */}
    <section className="py-32 relative bg-zinc-950">
      <div className="container">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <SectionHeading title="Signature Services" subtitle="Luxury beauty experiences designed for you" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-zinc-900 border border-white/5 rounded-2xl p-10 hover:border-primary/50 transition-all hover:translate-y-[-5px] shadow-2xl"
            >
              <div className="w-16 h-16 mb-8 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <s.icon size={28} className="text-primary group-hover:text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{s.desc}</p>
              <Link to="/services" className="text-primary inline-flex items-center gap-2 font-medium group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Gallery - Powered by Supabase */}
    <section className="py-32 bg-black">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionHeading title="Masterpieces" subtitle="A showcase of elegance and transformation" />
        </motion.div>
        
        {featuredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {featuredPhotos.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl aspect-[4/5] group cursor-pointer"
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-8 max-w-lg mx-auto italic">Explore our latest transformations and signature looks in the full gallery.</p>
        )}
        
        <div className="text-center">
          <Link to="/gallery" className="inline-flex items-center gap-2 text-primary border border-primary/20 hover:bg-primary hover:text-white px-8 py-3 rounded-full transition-all">
            View Gallery <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="container relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <SectionHeading title="Client Stories" subtitle="Join our community of beautiful transformations" />
        </motion.div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6 py-4">
            {testimonials.map((t, i) => (
              <motion.div 
                key={`${t.name}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-[0_0_85%] md:flex-[0_0_31%] bg-black border border-white/5 rounded-3xl p-8 hover:border-primary/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Quote size={80} className="text-primary" />
                </div>
                
                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                
                <p className="text-gray-300 italic mb-8 text-lg leading-relaxed relative z-10">"{t.text}"</p>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center font-bold text-primary text-xl">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white tracking-wide">{t.name}</p>
                    <p className="text-primary text-xs uppercase tracking-widest font-medium">Verified Client</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-12 gap-2">
           <div className="w-12 h-1 bg-primary/20 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-primary"
              />
           </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 z-1" />
      
      <div className="container relative z-10 text-center text-white">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-8">Let's create something<br/>extraordinary together</h2>
          <p className="opacity-90 mb-12 max-w-xl mx-auto text-lg">Book your session today and discover the most beautiful version of yourself.</p>
          <a
            href="https://wa.me/919845227642?text=Hi%20Sandy!%20I%20want%20to%20book%20a%20makeover"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-white text-primary px-12 py-5 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all shadow-2xl active:scale-95"
          >
            Book Appointment Now
          </a>
        </motion.div>
      </div>
    </section>
  </main>
  );
};

export default Index;
