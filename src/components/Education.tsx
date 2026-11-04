import { education } from "../data/resume";
import { GraduationCap } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const thumbs = ["from-flix-red to-[#3d0003]", "from-zinc-600 to-zinc-900", "from-zinc-700 to-black"];

export const Education = () => (
  <section id="education" className="relative bg-flix-bg py-24 sm:py-32">
    <div className="mx-auto max-w-5xl px-5 sm:px-12">
      <SectionHeading
        eyebrow="04 · Education"
        aside={
          <span className="rounded border border-white/30 bg-flix-elevated px-4 py-2 text-sm font-semibold">
            2022 – Present
          </span>
        }
      >
        Academic background
      </SectionHeading>

      <ol className="overflow-hidden rounded-md border-b border-white/10">
        {education.map((edu, i) => (
          <Reveal key={edu.degree} delay={i * 0.08}>
            <li
              className={`group grid grid-cols-[auto_1fr] items-center gap-4 border-t border-white/10 p-4 transition-colors sm:grid-cols-[3rem_10rem_1fr] sm:gap-6 sm:p-7 ${
                i === 0 ? "bg-[#333]/60" : "hover:bg-white/5"
              }`}
            >
              <span className="hidden text-center font-display text-4xl text-flix-light sm:block">{edu.episode}</span>
              <div className={`relative aspect-video w-28 overflow-hidden rounded bg-gradient-to-br sm:w-40 ${thumbs[i % thumbs.length]}`}>
                <span className="absolute bottom-1.5 left-2 font-display text-2xl leading-none text-white/90 sm:text-3xl">
                  {edu.period.slice(0, 4)}
                </span>
                <GraduationCap
                  aria-hidden
                  strokeWidth={1.5}
                  className="absolute top-2 right-2 h-5 w-5 text-white/60 transition-colors group-hover:text-white"
                />
                {i === 0 && (
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-white/30">
                    <span className="block h-full w-[65%] bg-flix-red" />
                  </span>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold sm:text-xl">{edu.degree}</h3>
                  <span className="text-base font-semibold text-white">
                    {edu.score}
                    {edu.note && <span className="ml-1 text-xs font-normal text-flix-gray">({edu.note})</span>}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-flix-light">
                  {edu.institution} · {edu.period}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-flix-gray">{edu.description}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
