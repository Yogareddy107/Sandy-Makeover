import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin, Mail, Briefcase } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80 py-12">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-background mb-3">
            Sandy <span className="text-primary">makeovers</span>
          </h3>
          <p className="text-sm leading-relaxed opacity-70">
            Beauty is power.. a smile is its sword
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-background mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["/", "/about", "/services", "/gallery", "/contact"].map((to, i) => (
              <li key={to}>
                <Link to={to} className="hover:text-primary transition-colors">
                  {["Home", "About", "Services", "Gallery", "Contact"][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-background mb-3">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 text-left leading-relaxed"><MapPin size={16} className="shrink-0" /> 504 yalmavathi homes, KV nagar, Yogimallavaram, Tirupati</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +91 9845227642</li>
            <li className="flex items-center gap-2">
              <a href="mailto:sandymakeovers768@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
                <Mail size={16} /> <span className="text-sm">sandymakeovers768@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/_sandy_makeovers/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Instagram size={16} /> @_sandy_makeovers_
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 mt-8 pt-6 text-center text-xs opacity-50 flex flex-col md:flex-row items-center justify-center gap-4">
        <span>© {new Date().getFullYear()} Sandy makeovers. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <span>Built by <a href="https://intraspherelabs.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">Intrasphere Labs</a></span>
          <Link to="/admin" className="hover:text-primary transition-colors" title="Admin Panel">
            <Briefcase size={16} />
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
