document.body.classList.add("loading");

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
    document.body.classList.remove("loading");
    // Reveal hero elements immediately
    document.querySelectorAll(".hero .reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 120 * i);
    });
  }, 700);
});

const isTouch = window.matchMedia("(hover: none)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Typing effect ---------- */
const roles = [
  "AI & ML Developer",
  "Full-Stack Web Developer",
  "Prompt Engineer",
  "RAG Solutions Enthusiast",
  "Hackathon Winner",
];
const typedEl = document.getElementById("typed");
let roleIdx = 0, charIdx = 0, deleting = false;
function typeLoop() {
  const word = roles[roleIdx];
  typedEl.textContent = word.slice(0, charIdx);
  if (!deleting && charIdx < word.length) charIdx++;
  else if (deleting && charIdx > 0) charIdx--;
  else if (!deleting) { deleting = true; return setTimeout(typeLoop, 1600); }
  else { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  setTimeout(typeLoop, deleting ? 40 : 85);
}
typeLoop();

/* ---------- Nav: scroll state, active link, mobile toggle ---------- */
const nav = document.getElementById("nav");
const progress = document.getElementById("scrollProgress");
const sections = [...document.querySelectorAll("section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a")];

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 40);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(y / max) * 100}%`;

  let current = "";
  sections.forEach((s) => { if (y >= s.offsetTop - 200) current = s.id; });
  navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  links.classList.toggle("open");
});
navAnchors.forEach((a) => a.addEventListener("click", () => {
  toggle.classList.remove("open");
  links.classList.remove("open");
}));

/* ---------- Scroll reveal (staggered) ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    const delay = Math.max(0, siblings.indexOf(el)) * 110;
    setTimeout(() => el.classList.add("visible"), delay);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
document.querySelectorAll(".reveal").forEach((el) => {
  if (!el.closest(".hero")) revealObserver.observe(el);
});

/* ---------- Animated counters ---------- */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const start = performance.now();
    const dur = 1400;
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(start);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

/* ---------- 3D tilt cards ---------- */
if (!isTouch && !reduceMotion) {
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transform = `rotateX(${(0.5 - y) * 14}deg) rotateY(${(x - 0.5) * 14}deg) translateZ(10px)`;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });

  /* Magnetic buttons */
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });

  /* Cursor glow */
  const glow = document.getElementById("cursorGlow");
  let gx = 0, gy = 0, tx = 0, ty = 0;
  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  (function follow() {
    gx += (tx - gx) * 0.12;
    gy += (ty - gy) * 0.12;
    glow.style.transform = `translate(${gx - 210}px, ${gy - 210}px)`;
    requestAnimationFrame(follow);
  })();
}

/* ---------- Interactive cube: drag to rotate ---------- */
const cube = document.getElementById("cube");
if (cube) {
  let dragging = false, lastX = 0, lastY = 0, rx = -20, ry = 0;
  const startDrag = (x, y) => {
    dragging = true; lastX = x; lastY = y;
    const m = new DOMMatrix(getComputedStyle(cube).transform);
    ry = Math.atan2(-m.m31, m.m11) * 180 / Math.PI;
    cube.style.animation = "none";
    cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const moveDrag = (x, y) => {
    if (!dragging) return;
    ry += (x - lastX) * 0.5;
    rx -= (y - lastY) * 0.5;
    lastX = x; lastY = y;
    cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  cube.parentElement.style.cursor = "grab";
  cube.parentElement.addEventListener("pointerdown", (e) => startDrag(e.clientX, e.clientY));
  window.addEventListener("pointermove", (e) => moveDrag(e.clientX, e.clientY));
  window.addEventListener("pointerup", () => { dragging = false; });
}

/* ---------- Contact form → opens email client ---------- */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("message").value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
  window.location.href = `mailto:nishalnihith@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
