import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = { eyebrow: string; children: ReactNode; aside?: ReactNode };

export const SectionHeading = ({ eyebrow, children, aside }: SectionHeadingProps) => (
  <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
    <div>
      <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-flix-red uppercase">
        <span className="inline-block h-3 w-1 bg-flix-red" />
        {eyebrow}
      </p>
      <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">{children}</h2>
    </div>
    {aside}
  </Reveal>
);
