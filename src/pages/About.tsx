import { motion } from "framer-motion";
import aboutImg from "@/assets/about-artist.jpg";
import SectionHeading from "@/components/SectionHeading";

const About = () => (
  <main className="pt-20 bg-black text-white min-h-screen">
    <section className="py-24 md:py-32">
      <div className="container">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <SectionHeading title="About Sandy" subtitle="Passion, precision, and a love for beauty" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] z-10 shadow-2xl">
              <img src={aboutImg} alt="Sandy - Makeup Artist" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/30 rounded-2xl z-0" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-widest font-bold mb-2">
                Certified Professional
              </div>
              <h3 className="font-heading text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Hello, I'm Sandy!</h3>
              <p className="text-gray-400 leading-relaxed text-lg italic">
                Certified from Sunshine Beauty Institute and Fashion Technology
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                A professional makeup artist based in Tirupati with over 5 years of experience in bridal, party, and fashion makeup. I believe every woman deserves to feel confident and beautiful, and my mission is to enhance your natural beauty for every special occasion.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                From traditional South Indian bridal looks to modern glamorous styles, I specialize in creating personalized makeovers that reflect your unique personality. I also offer home service for your convenience.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { num: "100+", label: "Happy Clients" },
                { num: "5+", label: "Years Experience" },
                { num: "4.9", label: "Rating" },
              ].map((s, i) => (
                <motion.div 
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                  className="text-center p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-primary/30 transition-all"
                >
                  <p className="font-heading text-3xl font-bold text-primary mb-1">{s.num}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </main>
);

export default About;
