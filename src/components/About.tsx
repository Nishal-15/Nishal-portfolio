import { motion } from "framer-motion";
import { CodeXml, GraduationCap, MapPin, Sparkles, Target, type LucideIcon } from "lucide-react";
import { about, education, profile, softSkills, stats } from "../data/resume";
import { BrandMark } from "../ui/Buttons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const details: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: CodeXml, label: "Core stack", value: "Java, Python, React, Node.js, MongoDB" },
  { icon: Target, label: "Focus areas", value: "Artificial Intelligence, Full-Stack, RAG, Client Work" },
  { icon: Sparkles, label: "Strengths", value: softSkills.join(", ") },
  { icon: GraduationCap, label: "Education", value: education[0]!.degree },
  { icon: MapPin, label: "Location", value: profile.location },
];

const Portrait = () => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 260, damping: 22 }}
    className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-md bg-gradient-to-br from-flix-red via-[#5c0006] to-black shadow-2xl shadow-flix-red/20"
  >
    {profile.photo ? (
      <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover grayscale" />
    ) : (
      <div className="flex h-full w-full items-center justify-center">
        <span className="font-display text-[11rem] leading-none text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {profile.initials}
        </span>
      </div>
    )}
    <BrandMark className="absolute top-3 left-3 text-3xl" />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5 pt-16">
      <p className="font-display text-4xl leading-none">{profile.name}</p>
      <p className="mt-1 text-sm text-white/70">{profile.role}</p>
    </div>
  </motion.div>
);

export const About = () => (
  <section id="about" className="relative bg-flix-bg py-24 sm:py-32">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-12">
      <SectionHeading eyebrow="01 · About">About me</SectionHeading>

      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
        <Reveal>
          <Portrait />
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <p className="text-2xl leading-snug font-semibold text-white sm:text-4xl sm:leading-tight">{about}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/5 ring-1 ring-white/10">
                    <Icon aria-hidden strokeWidth={1.75} className="h-5 w-5 text-flix-red" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold tracking-widest text-flix-gray uppercase">{label}</dt>
                    <dd className="mt-0.5 text-white">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-white/10 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.25 + i * 0.07} className="h-full">
                <div className="group h-full bg-flix-card p-6 transition-colors hover:bg-flix-elevated">
                  <p className="font-display text-6xl leading-none text-white transition-colors group-hover:text-flix-red">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold tracking-widest text-flix-light uppercase">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
