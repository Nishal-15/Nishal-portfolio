import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { projects, type Project } from "../data/resume";
import { BrandMark, FlixButton, InfoIcon } from "../ui/Buttons";
import { projectIcons } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const PosterArt = ({ project, large = false }: { project: Project; large?: boolean }) => {
  const Icon = projectIcons[project.posterIcon];
  return (
  <div className={`relative h-full w-full overflow-hidden bg-gradient-to-b ${project.poster}`}>
    <div aria-hidden className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(115deg,transparent_0_18px,rgba(255,255,255,0.05)_18px_19px)]" />
    <Icon
      aria-hidden
      strokeWidth={1.1}
      className={`absolute text-white/85 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] ${
        large ? "top-8 right-10 h-28 w-28" : "top-[22%] left-1/2 h-20 w-20 -translate-x-1/2"
      }`}
    />
    <BrandMark className={`absolute top-2 left-2.5 ${large ? "text-4xl" : "text-2xl"}`} />
    <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent ${large ? "p-8 pt-24" : "p-4 pt-16"}`}>
      <p className={`font-display leading-[0.85] text-white ${large ? "text-7xl sm:text-8xl" : "text-5xl"}`}>{project.shortTitle}</p>
      <p className={`mt-1 font-semibold tracking-wider text-white/75 uppercase ${large ? "text-sm" : "text-[11px]"}`}>
        {project.category}
      </p>
    </div>
  </div>
  );
};

/** Ongoing projects run "to Present" instead of showing an end date. */
const displayPeriod = (project: Project) =>
  project.status === "ongoing" ? `${project.period.split("–")[0]!.trim()} – Present` : project.period;

const StatusPill = ({ project }: { project: Project }) =>
  project.status === "personal" ? (
    <span className="inline-flex items-center gap-1.5 text-white">
      <span className="h-2 w-2 rounded-full bg-flix-red" /> Personal Project
    </span>
  ) : project.status === "live" ? (
    <span className="inline-flex items-center gap-1.5 text-flix-green">
      <span className="h-2 w-2 rounded-full bg-flix-green" /> Live
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-amber-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
      </span>
      Ongoing
    </span>
  );

/** "Visit site" link for live projects, an in-progress note for ongoing ones, nothing for personal ones. */
const ProjectAction = ({ project, large = false }: { project: Project; large?: boolean }) => {
  if (project.status === "personal") return null;
  if (project.link) {
    const label = project.link.replace(/^https?:\/\//, "");
    return large ? (
      <FlixButton href={project.link} external variant="play">
        Visit {label} <ArrowUpRight aria-hidden className="h-5 w-5" />
      </FlixButton>
    ) : (
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:text-flix-red hover:underline"
      >
        Visit {label} <ArrowUpRight aria-hidden className="h-4 w-4" />
      </a>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-2 rounded border border-amber-400/40 bg-amber-400/10 font-semibold text-amber-300 ${
        large ? "px-5 py-3 text-base" : "mt-3 px-2.5 py-1 text-xs"
      }`}
    >
      Ongoing live project
    </span>
  );
};

const MetaRow = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold">
    <StatusPill project={project} />
    <span className="text-white/80">{project.year}</span>
    <span className="border border-white/40 px-1.5 text-xs text-white/80">{displayPeriod(project)}</span>
  </div>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/75 px-3 py-10 backdrop-blur-sm sm:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        layoutId={`poster-${project.rank}`}
        className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-flix-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <PosterArt project={project} large />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-flix-card to-transparent" />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-flix-card text-white transition-colors hover:bg-white/20"
        >
          <X aria-hidden className="h-5 w-5" />
        </button>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-8 p-6 sm:grid-cols-[1.6fr_1fr] sm:p-10"
        >
          <div>
            <MetaRow project={project} />
            <h3 className="mt-5 text-3xl font-extrabold">{project.title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-white/85">{project.description}</p>
            <div className="mt-6">
              <ProjectAction project={project} large />
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-flix-gray">Tech stack: </span>
              {project.tags.join(", ")}
            </p>
            <p>
              <span className="text-flix-gray">Category: </span>
              {project.genres.join(", ")}
            </p>
            <p>
              <span className="text-flix-gray">Timeline: </span>
              {displayPeriod(project)}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const RankedPoster = ({ project, onOpen }: { project: Project; onOpen: () => void }) => (
  <button
    type="button"
    onClick={onOpen}
    className="group relative flex w-full items-end text-left focus-visible:outline-none"
    aria-label={`Open details for ${project.title}`}
  >
    <span
      aria-hidden
      className="text-outline -mr-6 font-display text-[11rem] leading-[0.75] tracking-tighter transition-colors duration-300 group-hover:[-webkit-text-stroke-color:#e50914] sm:-mr-8 sm:text-[15rem]"
    >
      {project.rank}
    </span>
    <motion.div
      layoutId={`poster-${project.rank}`}
      className="relative z-10 aspect-[2/3] w-[58%] overflow-hidden rounded-md shadow-xl shadow-black/60 ring-2 ring-transparent transition-[box-shadow] duration-300 group-hover:ring-white/80 group-focus-visible:ring-white"
      whileHover={{ scale: 1.06, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <PosterArt project={project} />
      <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
          <InfoIcon className="h-5 w-5" /> View details
        </span>
      </div>
    </motion.div>
  </button>
);

export const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative bg-black py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-flix-bg to-transparent" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-12">
        <SectionHeading
          eyebrow="03 · Projects"
          aside={<p className="max-w-xs text-flix-light">Selected work. Open a title for the full details.</p>}
        >
          Featured projects
        </SectionHeading>

        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.rank} delay={i * 0.1}>
              <RankedPoster project={project} onOpen={() => setSelected(project)} />
              <div className="mt-5 pl-2">
                <MetaRow project={project} />
                <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-flix-light">{project.description}</p>
                <ProjectAction project={project} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex justify-center">
          <FlixButton href="#contact" variant="info">
            Have a project in mind? Let&apos;s talk
          </FlixButton>
        </Reveal>
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
};
