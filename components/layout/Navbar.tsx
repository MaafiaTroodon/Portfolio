"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Github, Linkedin, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Tooltip } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { href: "/#home", section: "home", label: "Home" },
  { href: "/#about", section: "about", label: "About" },
  { href: "/#work-experience", section: "work-experience", label: "Work Experience" },
  { href: "/#projects", section: "projects", label: "Projects" },
  { href: "/#resume", section: "resume", label: "Resume" },
  { href: "/#contact", section: "contact", label: "Contact" },
];

const caseStudyLinks = [
  {
    href: "/experience/portucana",
    label: "Systems & Data Analyst Co-op",
    description: "Portucana engineering case study",
  },
  {
    href: "/projects/bullishai",
    label: "BullishAI",
    description: "Independent engineering case study",
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "work-experience", "projects", "resume", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${section}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-lg shadow-black/5"
            : "bg-background/70 backdrop-blur-lg border-b border-border/30"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="group text-xl font-bold transition-all duration-300 ease-out"
            >
              <span style={{ color: '#f4e4c2' }}>
                Malhar
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-5">
              <div className="flex items-center gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.section)}
                    className="coolBeans"
                  >
                    {link.label}
                  </a>
                ))}
                <div
                  className="relative"
                  onMouseEnter={() => setCaseStudiesOpen(true)}
                  onMouseLeave={() => setCaseStudiesOpen(false)}
                  onFocusCapture={() => setCaseStudiesOpen(true)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setCaseStudiesOpen(false);
                  }}
                >
                  <button
                    type="button"
                    className="coolBeans inline-flex items-center gap-2"
                    aria-haspopup="menu"
                    aria-expanded={caseStudiesOpen}
                    onClick={() => setCaseStudiesOpen((open) => !open)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        setCaseStudiesOpen(false);
                        event.currentTarget.focus();
                      }
                    }}
                  >
                    Case Studies
                    <ChevronDown aria-hidden="true" className={cn("h-4 w-4 transition-transform", caseStudiesOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {caseStudiesOpen ? (
                      <motion.div
                        role="menu"
                        aria-label="Case Studies"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.16 }}
                        className="absolute right-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-violet-300/20 bg-slate-950/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl"
                      >
                        {caseStudyLinks.map((caseStudy) => (
                          <Link
                            key={caseStudy.href}
                            href={caseStudy.href}
                            role="menuitem"
                            onClick={() => setCaseStudiesOpen(false)}
                            className="block rounded-xl px-4 py-3 transition hover:bg-violet-400/10 focus-visible:bg-violet-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-300"
                          >
                            <span className="block text-sm font-semibold text-amber-100">{caseStudy.label}</span>
                            <span className="mt-1 block text-xs text-slate-400">{caseStudy.description}</span>
                          </Link>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-3 border-l pl-6 ml-2">
                <Tooltip content="GitHub">
                  <motion.a
                    href="https://github.com/MaafiaTroodon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-300 hover:bg-accent group"
                    aria-label="GitHub"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="h-5 w-5 transition-colors duration-300 group-hover:text-primary" />
                  </motion.a>
                </Tooltip>
                <Tooltip content="LinkedIn">
                  <motion.a
                    href="https://linkedin.com/in/malhar-mahajan-24a93214a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-300 hover:bg-accent group"
                    aria-label="LinkedIn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="h-5 w-5 transition-colors duration-300 group-hover:text-primary" />
                  </motion.a>
                </Tooltip>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-300 hover:bg-accent xl:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="h-6 w-6 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetClose onClick={() => setMobileMenuOpen(false)} />
              </SheetHeader>
              <div className="flex flex-col space-y-2 mt-8">
                {navLinks.map((link, index) => {
                  const isActive = pathname === "/" && activeSection === link.section;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(index * 0.04, 0.16), duration: 0.22 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.section)}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "hover:bg-accent active:scale-95"
                        )}
                      >
                        {link.label}
                      </a>
                    </motion.div>
                  );
                })}
                <div className="mt-4 border-t border-white/10 pt-5">
                  <p className="px-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">Case Studies</p>
                  <div className="mt-2 space-y-2">
                    {caseStudyLinks.map((caseStudy, index) => (
                      <motion.div key={caseStudy.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + index * 0.04, duration: 0.22 }}>
                        <Link
                          href={caseStudy.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg px-4 py-3 transition-all duration-300 hover:bg-accent active:scale-95"
                        >
                          <span className="block text-base font-medium">{caseStudy.label}</span>
                          <span className="mt-1 block text-xs text-muted-foreground">{caseStudy.description}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t mt-4 flex items-center justify-between">
                  <div className="flex gap-3">
                    <motion.a
                      href="https://github.com/MaafiaTroodon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg transition-all duration-300 hover:bg-accent"
                      aria-label="GitHub"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/malhar-mahajan-24a93214a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg transition-all duration-300 hover:bg-accent"
                      aria-label="LinkedIn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </AnimatePresence>
    </>
  );
}
