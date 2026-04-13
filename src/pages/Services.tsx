import { motion } from "framer-motion";
import { Sparkles, PartyPopper, Scissors, Star, Home } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { icon: Sparkles, title: "Bridal Makeup", desc: "Complete bridal makeover including HD/Airbrush makeup, hairstyling, and saree draping. Look like a dream on your special day.", price: "Starting ₹15,000" },
  { icon: PartyPopper, title: "Party Makeup", desc: "Glamorous looks for engagements, receptions, birthdays, and special events. Stand out at every celebration.", price: "Starting ₹3,000" },
  { icon: Scissors, title: "Hair Styling", desc: "Elegant updos, braids, curls, and trending hairstyles for every occasion. From traditional to modern looks.", price: "Starting ₹1,500" },
  { icon: Star, title: "Saree Draping", desc: "Professional saree draping in multiple styles — Nivi, Bengali, Gujarati, and more. Perfect pleats guaranteed.", price: "Starting ₹1,000" },
  { icon: Home, title: "Home Service", desc: "Get pampered in the comfort of your home. All services available at your doorstep across Tirupati.", price: "Additional ₹500" },
];

const Services = () => (
  <main className="pt-20 bg-black text-white min-h-screen">
    <section className="py-24 md:py-32 bg-zinc-950">
      <div className="container">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <SectionHeading title="Our Services" subtitle="Premium beauty services tailored for you" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <motion.div 
              key={s.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-black border border-white/5 rounded-2xl p-8 shadow-2xl hover:border-primary/50 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <s.icon className="text-primary group-hover:text-white" size={24} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm flex-1 mb-6 leading-relaxed">{s.desc}</p>
              <p className="text-primary font-bold text-lg">{s.price}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-20 bg-zinc-900 border border-white/5 rounded-3xl p-12 max-w-3xl mx-auto shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <h3 className="font-heading text-3xl font-bold mb-4">Ready to Book?</h3>
          <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">Contact us on WhatsApp to discuss your requirements and get a custom quote</p>
          <a
            href="https://wa.me/919845227642?text=Hi%20Sandy!%20I%20want%20to%20book%20a%20makeover"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(255,46,126,0.4)] transition-all active:scale-95"
          >
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  </main>
);

export default Services;
