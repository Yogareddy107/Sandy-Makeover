import { useState } from "react";
import { Phone, MessageCircle, Instagram, MapPin, Mail } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Sandy! I'm ${form.name}. Phone: ${form.phone}. ${form.message}`;
    window.open(`https://wa.me/919845227642?text=${encodeURIComponent(text)}`, "_blank");
    toast.success("Redirecting to WhatsApp!");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <main className="pt-20">
      <section className="py-16 md:py-20 bg-cream">
        <div className="container">
          <SectionHeading title="Get in Touch" subtitle="We'd love to hear from you" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-background rounded-xl p-6 shadow-sm space-y-5">
                <a href="tel:+919845227642" className="flex items-center gap-4 text-sm hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center"><Phone className="text-primary" size={18} /></div>
                  +91 9845227642
                </a>
                <a href="mailto:s845227642@gmail.com" className="flex items-center gap-4 text-sm hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center"><Mail className="text-primary" size={18} /></div>
                  s845227642@gmail.com
                </a>
                <a href="https://wa.me/919845227642" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center"><MessageCircle className="text-primary" size={18} /></div>
                  Chat on WhatsApp
                </a>
                <a href="https://www.instagram.com/_sandy_makeovers/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-sm hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center"><Instagram className="text-primary" size={18} /></div>
                  @_sandy_makeovers_
                </a>
                <div className="flex items-start gap-4 text-sm">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center shrink-0"><MapPin className="text-primary" size={18} /></div>
                  <span className="leading-relaxed">504 yalmavathi homes, KV nagar,<br/>Yogimallavaram, Tirupati</span>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-sm h-52">
                <iframe
                  title="Tirupati Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123892.39691711447!2d79.34550399999999!3d13.628778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b0f88620037%3A0x5c64b6e5c09e23fb!2sTirupati%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-background rounded-xl p-6 shadow-sm space-y-4 h-fit">
              <h3 className="font-heading text-lg font-semibold">Send a Message</h3>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-cream border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-cream border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-cream border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
              <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium text-sm hover:opacity-90 transition-opacity">
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
