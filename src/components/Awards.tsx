import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { achievements, certifications, type Achievement } from "../data/resume";
import { BrandMark } from "../ui/Buttons";
import { achievementIcons } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const tagColor: Record<Achievement["tag"], string> = {
  Winner: "bg-flix-red text-white",
  Finalist: "bg-white text-black",
  Participant: "bg-black/70 text-white ring-1 ring-white/30",
};

const AwardCard = ({ award }: { award: Achievement }) => {
  const Icon = achievementIcons[award.icon];
  const isWinner = award.tag === "Winner";
  return (
  <motion.article
    whileHover={{ scale: 1.05, zIndex: 10 }}
    transition={{ type: "spring", stiffness: 300, damping: 24 }}
    className="group relative h-full overflow-hidden rounded-md bg-flix-card shadow-lg shadow-black/50"
  >
    <div
      className={`relative aspect-video bg-gradient-to-br ${
        isWinner ? "from-flix-red/80 via-[#3d0003] to-black" : "from-zinc-700/70 via-zinc-900 to-black"
      }`}
    >
      <BrandMark className="absolute top-2 left-2.5 text-xl" />
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <span
          className={`flex h-20 w-20 items-center justify-center rounded-full ring-1 transition-transform duration-500 group-hover:scale-110 ${
            isWinner ? "bg-black/30 ring-white/40" : "bg-white/5 ring-white/20"
          }`}
        >
          <Icon strokeWidth={1.5} className="h-10 w-10 text-white" />
        </span>
      </span>
      <span className={`absolute bottom-2 left-2.5 rounded-sm px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase ${tagColor[award.tag]}`}>
        {award.tag}
      </span>
    </div>
    <div className="p-4">
      <h3 className="font-bold">{award.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-flix-light">{award.description}</p>
    </div>
  </motion.article>
  );
};

export const Awards = () => (
  <section id="awards" className="relative bg-flix-bg py-24 sm:py-32">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-12">
      <SectionHeading eyebrow="05 · Awards">Hackathons &amp; awards</SectionHeading>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((award, i) => (
          <Reveal key={award.title} delay={i * 0.07} className="h-full">
            <AwardCard award={award} />
          </Reveal>
        ))}
      </div>

      <h3 className="mt-16 mb-5 text-xl font-bold text-[#e5e5e5] sm:text-2xl">Certifications</h3>
      <div className="grid gap-5 md:grid-cols-2">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 0.07}>
            <div className="flex items-center gap-5 rounded-md bg-flix-card p-5 transition-colors hover:bg-flix-elevated">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-flix-red">
                <BadgeCheck aria-hidden strokeWidth={1.75} className="h-7 w-7 text-white" />
              </span>
              <div>
                <p className="font-bold">{cert.title}</p>
                <p className="text-sm text-flix-light">{cert.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
