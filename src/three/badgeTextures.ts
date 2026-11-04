import * as THREE from "three";
import { profile } from "../data/resume";

const RED = "#E50914";
const DISPLAY = '"Bebas Neue", Impact, "Arial Narrow", sans-serif';
const SANS = 'Inter, system-ui, sans-serif';

export const CARD_W = 1.6;
export const CARD_H = 2.25;
const PX_W = 800;
const PX_H = Math.round((PX_W * CARD_H) / CARD_W);

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

const makeCanvas = (w: number, h: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return [canvas, canvas.getContext("2d")!] as const;
};

/** Card silhouette with rounded corners and the lanyard slot punched out. */
const clipCard = (ctx: CanvasRenderingContext2D) => {
  roundRect(ctx, 0, 0, PX_W, PX_H, 48);
  ctx.clip();
};
const punchSlot = (ctx: CanvasRenderingContext2D) => {
  ctx.globalCompositeOperation = "destination-out";
  roundRect(ctx, PX_W / 2 - 70, 34, 140, 26, 13);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
};

const drawBarcode = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
  ctx.fillStyle = "#fff";
  let cx = x;
  let seed = 7;
  while (cx < x + w) {
    seed = (seed * 9301 + 49297) % 233280;
    const bar = 2 + Math.floor((seed / 233280) * 7);
    ctx.fillRect(cx, y, bar, h);
    cx += bar + 2 + ((seed >> 3) % 5);
  }
};

const drawFront = (ctx: CanvasRenderingContext2D, photo?: HTMLImageElement) => {
  ctx.clearRect(0, 0, PX_W, PX_H);
  ctx.save();
  clipCard(ctx);

  const bg = ctx.createLinearGradient(0, 0, PX_W, PX_H);
  bg.addColorStop(0, "#1f1f1f");
  bg.addColorStop(0.55, "#0b0b0b");
  bg.addColorStop(1, "#000");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, PX_W, PX_H);

  // Soft red glow + diagonal sheen lines.
  const glow = ctx.createRadialGradient(PX_W * 0.85, PX_H * 0.1, 10, PX_W * 0.85, PX_H * 0.1, PX_W);
  glow.addColorStop(0, "rgba(229,9,20,0.45)");
  glow.addColorStop(1, "rgba(229,9,20,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, PX_W, PX_H);
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 2;
  for (let i = -PX_H; i < PX_W; i += 28) {
    ctx.beginPath();
    ctx.moveTo(i, PX_H);
    ctx.lineTo(i + PX_H, 0);
    ctx.stroke();
  }

  // Name.
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = RED;
  ctx.font = `200px ${DISPLAY}`;
  ctx.fillText(profile.firstName, 48, 270);
  // Outlined surname initial sits right after the first name, on the same baseline.
  const nameWidth = ctx.measureText(profile.firstName).width;
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = 4;
  ctx.strokeText("R.", 48 + nameWidth + 18, 270);

  // Photo frame.
  const fx = 300;
  const fy = 300;
  const fw = 440;
  const fh = 440;
  ctx.save();
  roundRect(ctx, fx, fy, fw, fh, 28);
  ctx.clip();
  if (photo) {
    const scale = Math.max(fw / photo.width, fh / photo.height);
    const iw = photo.width * scale;
    const ih = photo.height * scale;
    ctx.filter = "grayscale(1) contrast(1.1)";
    ctx.drawImage(photo, fx + (fw - iw) / 2, fy + (fh - ih) / 2, iw, ih);
    ctx.filter = "none";
  } else {
    const pg = ctx.createLinearGradient(fx, fy, fx + fw, fy + fh);
    pg.addColorStop(0, "#e50914");
    pg.addColorStop(1, "#3d0003");
    ctx.fillStyle = pg;
    ctx.fillRect(fx, fy, fw, fh);
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.font = `520px ${DISPLAY}`;
    ctx.textAlign = "center";
    ctx.fillText(profile.initials, fx + fw / 2 + 8, fy + fh + 70);
    ctx.fillStyle = "#fff";
    ctx.font = `300px ${DISPLAY}`;
    ctx.fillText(profile.initials, fx + fw / 2, fy + fh / 2 + 105);
    ctx.textAlign = "left";
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 2;
  roundRect(ctx, fx, fy, fw, fh, 28);
  ctx.stroke();

  // Role.
  ctx.fillStyle = "#fff";
  ctx.font = `800 34px ${SANS}`;
  ctx.fillText("AI & FULL-STACK", 48, 830);
  ctx.fillText("DEVELOPER", 48, 872);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = `500 24px ${SANS}`;
  ctx.fillText(`ID: 0001  ·  ${profile.location.split(",")[0]!.toUpperCase()}`, 48, 920);

  drawBarcode(ctx, 48, 960, 380, 120);
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = `700 26px ${SANS}`;
  ctx.textAlign = "right";
  ctx.fillText("AI / ML", PX_W - 48, 1040);
  ctx.fillText("DEPT.", PX_W - 48, 1074);
  ctx.textAlign = "left";

  // Red bottom strip.
  ctx.fillStyle = RED;
  ctx.fillRect(0, PX_H - 20, PX_W, 20);

  punchSlot(ctx);
  ctx.restore();
};

const drawBack = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, PX_W, PX_H);
  ctx.save();
  clipCard(ctx);
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, PX_W, PX_H);
  ctx.fillStyle = RED;
  ctx.textAlign = "center";
  ctx.font = `520px ${DISPLAY}`;
  ctx.fillText(profile.initials, PX_W / 2, PX_H / 2 + 180);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = `700 30px ${SANS}`;
  ctx.fillText("ACCESS · ALL AREAS", PX_W / 2, PX_H - 120);
  ctx.fillStyle = RED;
  ctx.fillRect(0, PX_H - 20, PX_W, 20);
  punchSlot(ctx);
  ctx.restore();
};

const drawStrap = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  ctx.fillStyle = RED;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, w, 6);
  ctx.fillRect(0, h - 6, w, 6);
  ctx.fillStyle = "#fff";
  ctx.font = `86px ${DISPLAY}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(profile.name.toUpperCase(), w / 2, h / 2 + 6);
};

const toTexture = (canvas: HTMLCanvasElement) => {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

/**
 * Builds the badge + strap textures. They are drawn immediately and redrawn once
 * the web fonts (and optional photo) have loaded.
 */
export const createBadgeTextures = () => {
  const [frontCanvas, front] = makeCanvas(PX_W, PX_H);
  const [backCanvas, back] = makeCanvas(PX_W, PX_H);
  const [strapCanvas, strap] = makeCanvas(512, 128);
  drawFront(front);
  drawBack(back);
  drawStrap(strap, 512, 128);

  const textures = {
    front: toTexture(frontCanvas),
    back: toTexture(backCanvas),
    strap: toTexture(strapCanvas),
  };
  textures.strap.wrapS = textures.strap.wrapT = THREE.RepeatWrapping;

  const ready = Promise.all([
    document.fonts.load(`100px ${DISPLAY}`),
    document.fonts.load(`800 30px ${SANS}`),
    document.fonts.load(`500 30px ${SANS}`),
  ]).catch(() => undefined);

  void ready.then(async () => {
    const photo = profile.photo ? await loadImage(profile.photo).catch(() => undefined) : undefined;
    drawFront(front, photo);
    drawBack(back);
    drawStrap(strap, 512, 128);
    Object.values(textures).forEach((t) => (t.needsUpdate = true));
  });

  return textures;
};
