export type Project = {
  rank: number;
  title: string;
  shortTitle: string;
  category: string;
  period: string;
  year: string;
  description: string;
  tags: string[];
  genres: string[];
  /** Tailwind gradient classes used for the poster artwork. */
  poster: string;
  posterIcon: "scale" | "bag" | "globe";
  status: "live" | "ongoing" | "personal";
  /** Public URL of the live site, if it can be visited. */
  link?: string;
};

export type Education = {
  episode: number;
  period: string;
  degree: string;
  institution: string;
  score: string;
  note?: string;
  description: string;
};

export type Achievement = {
  icon: "trophy" | "rocket" | "satellite" | "lightbulb";
  tag: "Winner" | "Finalist" | "Participant";
  title: string;
  description: string;
};

export const profile = {
  name: "Nishal R",
  firstName: "NISHAL",
  initials: "NR",
  role: "AI & Full-Stack Developer",
  heroWord: "DEVELOPER",
  heroLeft: "Building production-focused web apps and AI-powered tools.",
  heroRight: "Specializing in full-stack development, RAG and AI-assisted engineering.",
  tagline:
    "BSc AI & ML student building production-focused web apps, AI-powered tools and RAG-based solutions — from idea to live deployment.",
  location: "Coimbatore, Tamil Nadu, India",
  email: "nishalnihith@gmail.com",
  phone: "+91 63743 16870",
  phoneHref: "tel:+916374316870",
  /** Path to a photo in /public (e.g. "/photo.jpg"). Empty = initials monogram. */
  photo: "",
  // Add your profile URLs here — empty values are hidden on the site.
  github: "https://github.com/Nishal-15",
  linkedin: "https://www.linkedin.com/in/nishal-r-3a0594342/",
};

export const about =
  "I'm a motivated developer with strong fundamentals in Java, Python, web development and AI-powered applications. I've built real-world, production-focused applications and databases, delivered live client projects, and I'm especially passionate about AI-driven software engineering and RAG-based solutions.";

export const stats = [
  { value: "3+", label: "Projects Shipped" },
  { value: "2", label: "Live Client Sites" },
  { value: "4", label: "Hackathons" },
  { value: "#1", label: "Hackathon Win" },
];

export const services = [
  {
    title: "Full-Stack Web Development",
    subtitle: "React · Node.js · Express",
    description:
      "Responsive, production-focused web applications from interface to API — built, hosted and deployed live for real clients.",
    tags: ["HTML", "CSS", "React", "Node.js", "Express.js"],
  },
  {
    title: "AI-Powered Applications",
    subtitle: "Python · Machine Learning · RAG",
    description:
      "AI chatbots and retrieval-augmented (RAG) solutions that turn domain knowledge into instant, intelligent answers.",
    tags: ["Python", "Machine Learning", "RAG"],
  },
  {
    title: "AI-Assisted Development",
    subtitle: "Cursor · Antigravity · Copilot",
    description:
      "Hands-on prompt engineering, code verification, debugging and deployment with modern AI development tools.",
    tags: ["Prompt Engineering", "Cursor", "Antigravity", "GitHub Copilot"],
  },
  {
    title: "Databases & Core Languages",
    subtitle: "Java · Python · MySQL · MongoDB",
    description:
      "Strong programming fundamentals and data modelling for applications that need reliable, well-structured storage.",
    tags: ["Java", "Python", "MySQL", "MongoDB", "Git", "GitHub"],
  },
];

export const softSkills = ["Logical Thinking", "Problem Solving", "Decision Making", "Communication"];

export const marqueeItems = [
  "Java", "Python", "React", "Node.js", "Express", "MongoDB", "MySQL", "Machine Learning", "RAG", "Prompt Engineering",
];

export const projects: Project[] = [
  {
    rank: 1,
    title: "Juris",
    shortTitle: "JURIS",
    category: "Personal · AI Legal Assistant",
    period: "05/2026 – 09/2026",
    year: "2026",
    description:
      "An AI-powered legal chatbot providing instant legal guidance, intelligent query handling and secure advocate consultation support through a web-based platform.",
    tags: ["Python", "React", "MongoDB", "Machine Learning"],
    genres: ["AI", "Legal Tech", "Chatbot"],
    poster: "from-red-700 via-red-950 to-black",
    posterIcon: "scale",
    status: "personal",
  },
  {
    rank: 2,
    title: "Ahankara Studios",
    shortTitle: "AHANKARA",
    category: "Client · E-Commerce",
    period: "09/2026 – 11/2026",
    year: "2026",
    description:
      "A responsive e-commerce website with intuitive navigation, modern UI design and a seamless online shopping experience across all devices.",
    tags: ["Responsive Design", "E-Commerce", "Modern UI"],
    genres: ["E-Commerce", "Client Work", "UI Design"],
    poster: "from-amber-600 via-orange-950 to-black",
    posterIcon: "bag",
    status: "ongoing",
  },
  {
    rank: 3,
    title: "DRKC Website",
    shortTitle: "DRKC",
    category: "Client · Live Production",
    period: "03/2026 – 05/2026",
    year: "2026",
    description:
      "Improved UI components, implemented requirement-based corrections, and managed website hosting and domain deployment on a live production website.",
    tags: ["UI Development", "Hosting", "Domain Deployment"],
    genres: ["Client Work", "Web", "Deployment"],
    poster: "from-sky-700 via-slate-900 to-black",
    posterIcon: "globe",
    status: "live",
    link: "https://drkc.org",
  },
];

export const education: Education[] = [
  {
    episode: 1,
    period: "2024 – Present",
    degree: "BSc Artificial Intelligence & Machine Learning",
    institution: "KPR College of Arts Science and Research, Coimbatore",
    score: "CGPA 7.0",
    note: "up to semester 4",
    description: "Studying machine learning, AI systems and software engineering while shipping real client and AI projects.",
  },
  {
    episode: 2,
    period: "2024",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "MDN Future CBSE Sr. Sec School, Coimbatore",
    score: "76.6%",
    description: "Completed higher secondary education under the CBSE curriculum.",
  },
  {
    episode: 3,
    period: "2022",
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "MDN Future CBSE Sr. Sec School, Coimbatore",
    score: "68.2%",
    description: "Completed secondary education under the CBSE curriculum.",
  },
];

export const achievements: Achievement[] = [
  {
    icon: "trophy",
    tag: "Winner",
    title: "Intra-College Hackathon",
    description: "Won first place for developing a Visitor Management System.",
  },
  {
    icon: "rocket",
    tag: "Finalist",
    title: "Odoo Hackathon 2026",
    description: "Reached the finals of the Odoo 2026 hackathon.",
  },
  {
    icon: "satellite",
    tag: "Participant",
    title: "Bharatiya Antariksh Hackathon 2025",
    description: "Took on space-tech problem statements at the national-level hackathon.",
  },
  {
    icon: "lightbulb",
    tag: "Participant",
    title: "Smart India Hackathon 2025",
    description: "Participated in SIH 2025, India's flagship innovation challenge.",
  },
];

export const certifications = [
  { title: "FreeCodeCamp — Front-End Development", detail: "Legacy Responsive Web Design V8 Certification" },
  { title: "FixIT — Intra-College Hackathon", detail: "Visitor Management System" },
];

export const faqs = [
  {
    q: "Are you available for internships?",
    a: "Yes — I'm currently open to internships and new opportunities, alongside my BSc in Artificial Intelligence & Machine Learning.",
  },
  {
    q: "What is your tech stack?",
    a: "Java and Python for programming; HTML, CSS, React, Node.js and Express.js for the web; MySQL and MongoDB for data; plus Git, GitHub and AI tools like Cursor, Antigravity and GitHub Copilot.",
  },
  {
    q: "Do you take on client projects?",
    a: "Yes. I've delivered live client work including the DRKC production website (UI fixes, hosting and domain deployment) and the Ahankara Studios e-commerce site.",
  },
  {
    q: "What kind of AI work do you do?",
    a: "I build AI-powered applications and RAG-based solutions — like Juris, an AI legal chatbot — and use AI-assisted development for prompt engineering, code verification and debugging.",
  },
  {
    q: "Where are you based?",
    a: "Coimbatore, Tamil Nadu, India.",
  },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#awards", label: "Awards" },
];
