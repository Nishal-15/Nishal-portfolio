import { ArrowUp, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { navLinks, profile } from "../data/resume";
import { FlixButton } from "../ui/Buttons";
import { SocialButtons, socialLinks } from "../ui/SocialIcons";
import { Reveal } from "../ui/Reveal";

type SubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

export const Contact = () => {
  const [sent, setSent] = useState(false);

  // No backend: open the visitor's mail client with the message pre-filled.
  const handleSubmit: SubmitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent("Let's work together");
    const body = encodeURIComponent(`${message}\n\n— ${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(229,9,20,0.35),transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-flix-red to-transparent" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-12">
        <Reveal>
          <p className="mb-4 text-xs font-bold tracking-[0.3em] text-flix-red uppercase">07 · Contact</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-6xl">Work with me.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80 sm:text-2xl">
            Open to internships, freelance client work and AI-driven collaborations. Ready to start? Leave your email and a
            message.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-2xl flex-col gap-3">
            <textarea
              name="message"
              required
              rows={3}
              placeholder="Tell me about your project or role…"
              aria-label="Message"
              className="w-full resize-none rounded border border-white/40 bg-black/60 px-5 py-4 text-lg text-white placeholder-white/50 outline-none transition-colors focus:border-white focus:ring-2 focus:ring-white/30"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded border border-white/40 bg-black/60 px-5 py-4 text-lg text-white placeholder-white/50 outline-none transition-colors focus:border-white focus:ring-2 focus:ring-white/30"
              />
              <FlixButton type="submit" variant="red" className="!px-8 !py-4 !text-xl sm:!text-2xl">
                Send Message <ChevronRight aria-hidden className="h-6 w-6" />
              </FlixButton>
            </div>
            {sent && (
              <p role="status" className="text-sm text-flix-green">
                Your email app should open with the message ready to send.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-flix-light">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <Mail aria-hidden className="h-4 w-4 text-flix-red" /> {profile.email}
            </a>
            <a href={profile.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <Phone aria-hidden className="h-4 w-4 text-flix-red" /> {profile.phone}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden className="h-4 w-4 text-flix-red" /> {profile.location}
            </span>
          </div>
          <SocialButtons className="mt-8 justify-center" />
        </Reveal>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-black px-5 pt-12 pb-10 text-flix-gray sm:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8">
          Get in touch:{" "}
          <a href={`mailto:${profile.email}`} className="underline hover:text-white">
            {profile.email}
          </a>
        </p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
          {[...navLinks, { href: "#faq", label: "FAQ" }, { href: "#contact", label: "Contact" }].map((link) => (
            <li key={link.href}>
              <a href={link.href} className="underline-offset-2 hover:underline">
                {link.label}
              </a>
            </li>
          ))}
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm">
          <p>
            © {new Date().getFullYear()} {profile.name} · Built with React, Three.js &amp; Tailwind
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 rounded border border-white/20 px-3 py-1.5 transition-colors hover:border-white hover:text-white"
          >
            Back to top <ArrowUp aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
