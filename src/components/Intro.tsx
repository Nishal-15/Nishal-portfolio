import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data/resume";

/** Total intro length in seconds; other entrance animations start after this. */
export const INTRO_SECONDS = 2.0;

/** Cinematic opening: the name glows in red, then zooms past the camera. */
export const Intro = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = "";
    }, 1900);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-hidden
        >
          <motion.div
            className="flex font-display text-[22vw] leading-none text-flix-red sm:text-[14vw]"
            style={{ textShadow: "0 0 40px rgba(229,9,20,0.55)" }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.08, 14], opacity: [1, 1, 0] }}
            transition={{ duration: 1.9, times: [0, 0.6, 1], ease: [0.7, 0, 0.84, 0] }}
          >
            {profile.firstName.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, scaleY: 1.6 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
