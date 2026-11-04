import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, profile } from "../data/resume";
import { useActiveSection } from "../hooks/useActiveSection";
import { INTRO_SECONDS } from "./Intro";
import { socialLinks } from "../ui/SocialIcons";

const sectionIds = [...navLinks.map((l) => l.href.slice(1)), "contact"];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: INTRO_SECONDS - 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-flix-bg/95 shadow-lg shadow-black/40 backdrop-blur" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-10 px-5 sm:h-[68px] sm:px-12">
        <a href="#home" className="font-display text-4xl leading-none text-flix-red transition-transform hover:scale-105">
          {profile.firstName}
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`transition-colors ${isActive ? "font-bold text-white" : "text-[#e5e5e5] hover:text-flix-light"}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${profile.name} on ${label}`}
              className="hidden text-white/70 transition-colors hover:text-white md:block"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
          <a
            href="#contact"
            className="hidden rounded bg-flix-red px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-flix-red-dark sm:inline-block"
          >
            Hire Me
          </a>
          <span
            aria-hidden
            className="hidden h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-flix-red to-[#5c0006] font-display text-lg text-white sm:flex"
          >
            {profile.initials}
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-full border-t border-white/10 bg-black/95 px-5 py-6 backdrop-blur lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {[...navLinks, { href: "#contact", label: "Contact" }].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded px-3 py-3 text-lg ${
                      active === link.href.slice(1) ? "border-l-4 border-flix-red bg-white/5 font-bold" : "text-white/80"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
