import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { faqs } from "../data/resume";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-12">
        <SectionHeading eyebrow="06 · FAQ">Frequently asked questions</SectionHeading>
        <ul className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.05}>
                <li>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-center justify-between gap-4 bg-[#2d2d2d] px-6 py-5 text-left text-lg font-medium transition-colors hover:bg-[#414141] sm:text-2xl"
                    >
                      {faq.q}
                      <motion.svg
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        viewBox="0 0 24 24"
                        className="h-7 w-7 shrink-0 sm:h-9 sm:w-9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden
                      >
                        <path d="M12 3v18M3 12h18" />
                      </motion.svg>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden bg-[#2d2d2d]"
                      >
                        <p className="mt-px border-t border-black px-6 py-6 text-lg leading-relaxed sm:text-2xl sm:leading-snug">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
