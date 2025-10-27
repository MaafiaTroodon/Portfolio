"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Tooltip } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              href="/"
              className="group text-xl font-bold transition-all duration-300 ease-out"
            >
              <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary group-hover:via-pink-500 group-hover:to-primary">
                Malhar
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group",
                        isActive
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="navbar-indicator"
                          className="absolute inset-0 bg-primary/10 rounded-lg"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 origin-center",
                          isActive
                            ? "bg-primary scale-x-100"
                            : "bg-primary scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </Link>
                  );
                })}
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
                <div className="pl-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-accent"
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
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "hover:bg-accent active:scale-95"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
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
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </AnimatePresence>
    </>
  );
}
