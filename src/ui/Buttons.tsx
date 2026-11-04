import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "play" | "info" | "red";
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  /** Open the link in a new tab. */
  external?: boolean;
};

const variants = {
  play: "bg-white text-black hover:bg-white/75",
  info: "bg-[rgba(109,109,110,0.7)] text-white hover:bg-[rgba(109,109,110,0.45)]",
  red: "bg-flix-red text-white hover:bg-flix-red-dark",
};

/** Netflix-style action button (white "Play", grey "More Info", or red CTA). */
export const FlixButton = ({
  href,
  children,
  variant = "play",
  type = "button",
  onClick,
  className = "",
  external = false,
}: ButtonProps) => {
  const classes = `inline-flex items-center justify-center gap-2.5 rounded-md px-6 py-3 text-base font-bold transition-[background-color,transform] duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-8 sm:text-lg ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export const PlayIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M5 2.69a1 1 0 0 1 1.5-.86l15.04 9.31a1 1 0 0 1 0 1.72L6.5 22.17A1 1 0 0 1 5 21.31V2.69Z" />
  </svg>
);

export const InfoIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 11v6M12 7.5v.01" strokeLinecap="round" />
  </svg>
);

/** Small red "NR" mark, used like a studio badge on posters. */
export const BrandMark = ({ className = "" }: { className?: string }) => (
  <span className={`rounded-sm bg-black/70 px-1 pt-0.5 font-display leading-none text-flix-red ${className}`}>NR</span>
);
