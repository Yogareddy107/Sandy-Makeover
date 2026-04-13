import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "top-4 mx-auto max-w-[95%] md:max-w-6xl rounded-full bg-background/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-2"
          : "top-0 bg-transparent py-4 md:py-6"
      }`}
    >
      <div className={`container flex items-center justify-between transition-all duration-500`}>
        <Link to="/" className="font-heading text-xl md:text-2xl font-bold tracking-wide text-foreground group">
          Sandy <span className="text-primary transition-colors">makeovers</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm font-medium tracking-wide transition-all hover:text-primary relative group ${
                  location.pathname === l.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  location.pathname === l.to ? "w-full" : ""
                }`} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/919845227642?text=Hi%20Sandy!%20I%20want%20to%20book%20a%20makeover"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 active:scale-95 ${
              scrolled 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-background text-foreground border border-border hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            Book Now
          </a>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-2">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <ul className="flex flex-col py-6">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`block px-8 py-4 text-sm font-medium transition-colors ${
                      location.pathname === l.to ? "text-primary bg-primary/5" : "text-muted-foreground hover:bg-muted/5"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="px-8 pt-4">
                <a
                  href="https://wa.me/919845227642?text=Hi%20Sandy!%20I%20want%20to%20book%20a%20makeover"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm font-medium hover:opacity-90"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
