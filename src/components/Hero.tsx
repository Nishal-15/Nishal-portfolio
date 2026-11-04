import { motion, useScroll, useTransform } from "framer-motion";
import { Hand } from "lucide-react";
import { lazy, Suspense } from "react";
import { profile } from "../data/resume";
import { INTRO_SECONDS } from "./Intro";
import { BrandMark, FlixButton, InfoIcon, PlayIcon } from "../ui/Buttons";

const BadgeScene = lazy(() => import("../three/BadgeScene"));

const ease = [0.22, 1, 0.36, 1] as const;

export const Hero = () => {
  const { scrollY } = useScroll();
  const wordY = useTransform(scrollY, [0, 700], [0, 160]);
  const fade = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <section id="home" className="relative flex min-h-svh flex-col overflow-hidden bg-black">
      {/* Cinematic backdrop */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(229,9,20,0.35),transparent_70%)]" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(229,9,20,0.18),transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-flix-bg to-transparent" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Giant word behind the badge */}
      <motion.div
        style={{ y: wordY, opacity: fade }}
        className="pointer-events-none absolute inset-x-0 top-[58%] z-0 flex flex-col items-center sm:top-[54%]"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INTRO_SECONDS + 0.2, duration: 0.8, ease }}
          className="mb-1 flex items-center gap-3 text-xs font-bold tracking-[0.5em] text-white/70 uppercase sm:text-sm"
        >
          <BrandMark className="text-2xl tracking-normal" /> Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 1.15, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, scale: 1, letterSpacing: "0.01em" }}
          transition={{ delay: INTRO_SECONDS, duration: 1.2, ease }}
          className="font-display text-[23vw] leading-[0.82] text-white sm:text-[17vw] lg:text-[15rem]"
          style={{ textShadow: "0 10px 60px rgba(0,0,0,0.6)" }}
        >
          {profile.heroWord}
        </motion.h1>
        <span className="sr-only">
          {profile.name} — {profile.role}
        </span>
      </motion.div>

      {/* 3D lanyard badge */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={null}>
          <BadgeScene />
        </Suspense>
      </div>

      {/* Bottom details */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: INTRO_SECONDS + 0.5, duration: 0.8, ease }}
        className="pointer-events-none relative z-20 mx-auto mt-auto grid w-full max-w-[1400px] items-end gap-6 px-5 pb-10 sm:px-12 md:grid-cols-[1fr_auto_1fr]"
      >
        <div className="hidden max-w-xs text-lg leading-snug text-white/80 md:block">{profile.heroLeft}</div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-semibold sm:text-base">
            <span className="inline-flex items-center gap-1.5 text-flix-green">
              <span className="h-2 w-2 rounded-full bg-flix-green" /> Open to internships
            </span>
            <span className="text-white/40" aria-hidden>|</span>
            <span className="text-white/80">{profile.role}</span>
            <span className="text-white/40" aria-hidden>|</span>
            <span className="text-white/80">Coimbatore, India</span>
          </div>
          <div className="pointer-events-auto flex flex-wrap justify-center gap-3">
            <FlixButton href="#projects" variant="play">
              <PlayIcon /> View Projects
            </FlixButton>
            <FlixButton href="#about" variant="info">
              <InfoIcon /> About Me
            </FlixButton>
          </div>
          <p className="inline-flex items-center gap-1.5 text-xs text-white/40">
            <Hand aria-hidden className="h-3.5 w-3.5" /> Drag the badge to interact
          </p>
        </div>

        <div className="hidden max-w-xs justify-self-end text-right text-lg leading-snug text-white/80 md:block">
          {profile.heroRight}
        </div>
      </motion.div>
    </section>
  );
};
