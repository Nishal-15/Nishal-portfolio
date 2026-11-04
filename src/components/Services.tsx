import { motion } from "framer-motion";
import { marqueeItems, services } from "../data/resume";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export const Services = () => (
  <section id="services" className="relative bg-flix-bg pt-12 pb-24 sm:pb-32">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-12">
      <SectionHeading eyebrow="02 · Skills">What I do</SectionHeading>

      <ul>
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.06}>
            <li className="group relative grid gap-4 border-t border-white/10 py-9 md:grid-cols-[1fr_1.4fr] md:gap-12">
              <motion.span
                aria-hidden
                className="absolute top-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-flix-red transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
              <div className="flex items-start gap-5">
                <span className="font-display text-3xl leading-none text-flix-gray transition-colors group-hover:text-flix-red">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">{service.title}</h3>
                  <p className="mt-1 text-sm text-flix-gray">{service.subtitle}</p>
                </div>
              </div>
              <div>
                <p className="text-lg leading-relaxed font-medium text-white/85 sm:text-2xl sm:leading-snug">
                  {service.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1 text-sm text-flix-light transition-colors group-hover:border-white/30"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>

    <div className="relative mt-16 -rotate-2 overflow-hidden bg-flix-red py-4" aria-hidden>
      <div className="flex w-max animate-marquee">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="flex items-center gap-8 px-4 font-display text-4xl text-white sm:text-5xl">
            {item}
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-black/40" />
          </span>
        ))}
      </div>
    </div>
  </section>
);
