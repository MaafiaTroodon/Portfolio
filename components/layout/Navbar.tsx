"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHub, Linkedin, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Tooltip } from "@/components/ui/tooltip";

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
          "fixed top-0 left-0 right-0 z-40 transition-all",
          scrolled
            ? "glass border-b border-border/50 backdrop-blur-md"
            : "bg-background/80 backdrop-blur-sm border-b border-border/50"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Malhar
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                        isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 border-l pl-4">
                <Tooltip content="GitHub">
                  <a
                    href="https://github.com/MaafiaTroodon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                    aria-label="GitHub"
                  >
                    <GitHub className="h-5 w-5" />
                  </a>
                </Tooltip>
                <Tooltip content="LinkedIn">
                  <a
                    href="https://linkedin.com/in/malhar-mahajan-24a93214a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Tooltip>
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetClose onClick={() => setMobileMenuOpen(false)} />
          </SheetHeader>
          <div className="flex flex-col space-y-4 mt-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-md text-lg font-medium transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href="https://github.com/MaafiaTroodon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-accent rounded-md"
                  aria-label="GitHub"
                >
                  <GitHub className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/malhar-mahajan-24a93214a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-accent rounded-md"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

