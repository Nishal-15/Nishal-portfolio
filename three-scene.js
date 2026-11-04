import * as THREE from "three";

const canvas = document.getElementById("hero-canvas");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
} catch (err) {
  console.warn("WebGL unavailable, skipping 3D scene.", err);
}

if (renderer) init();

function init() {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05060f, 0.045);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  /* ---------- Morphing core blob (custom shader) ---------- */
  const blobUniforms = {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color(0x8b5cf6) },
    uColorB: { value: new THREE.Color(0x22d3ee) },
    uMouse: { value: new THREE.Vector2() },
  };

  const noiseGLSL = /* glsl */ `
    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1.0/6.0,1.0/3.0);
      const vec4 D=vec4(0.0,0.5,1.0,2.0);
      vec3 i=floor(v+dot(v,C.yyy));
      vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);
      vec3 l=1.0-g;
      vec3 i1=min(g.xyz,l.zxy);
      vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;
      vec3 x2=x0-i2+C.yyy;
      vec3 x3=x0-D.yyy;
      i=mod289(i);
      vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
      float n_=0.142857142857;
      vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.0*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z);
      vec4 y_=floor(j-7.0*x_);
      vec4 x=x_*ns.x+ns.yyyy;
      vec4 y=y_*ns.x+ns.yyyy;
      vec4 h=1.0-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy);
      vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.0+1.0;
      vec4 s1=floor(b1)*2.0+1.0;
      vec4 sh=-step(h,vec4(0.0));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
      vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x);
      vec3 p1=vec3(a0.zw,h.y);
      vec3 p2=vec3(a1.xy,h.z);
      vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
      vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
      m=m*m;
      return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }`;

  const blobMat = new THREE.ShaderMaterial({
    uniforms: blobUniforms,
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec3 vNormal;
      varying vec3 vView;
      varying float vNoise;
      ${noiseGLSL}
      void main(){
        float n = snoise(normal * 1.4 + vec3(uTime * 0.35, uTime * 0.2, 0.0) + vec3(uMouse, 0.0) * 0.6);
        vNoise = n;
        vec3 pos = position + normal * n * 0.32;
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying vec3 vNormal;
      varying vec3 vView;
      varying float vNoise;
      void main(){
        float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
        vec3 col = mix(uColorA, uColorB, smoothstep(-0.6, 0.8, vNoise));
        col = col * (0.25 + fres * 1.4);
        gl_FragColor = vec4(col, 0.92);
      }`,
    transparent: true,
  });

  const group = new THREE.Group();
  scene.add(group);

  const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 48), blobMat);
  group.add(blob);

  /* ---------- Wireframe shell ---------- */
  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.5, 1),
    new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.18 })
  );
  group.add(shell);

  // Glowing vertices on shell
  const shellPts = new THREE.Points(
    new THREE.IcosahedronGeometry(2.5, 1),
    new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.07, transparent: true, opacity: 0.9 })
  );
  shell.add(shellPts);

  /* ---------- Orbit rings ---------- */
  const ringMat = (c, o) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.012, 16, 200), ringMat(0x22d3ee, 0.5));
  ring1.rotation.x = Math.PI / 2.4;
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.7, 0.008, 16, 200), ringMat(0x8b5cf6, 0.45));
  ring2.rotation.set(Math.PI / 1.7, 0.4, 0);
  group.add(ring1, ring2);

  // Satellites orbiting on the rings
  const satGeo = new THREE.SphereGeometry(0.07, 16, 16);
  const sat1 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0x22d3ee }));
  const sat2 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0xec4899 }));
  ring1.add(sat1);
  ring2.add(sat2);

  /* ---------- Floating geometric shapes ---------- */
  const floaters = [];
  const shapeGeos = [
    new THREE.OctahedronGeometry(0.28),
    new THREE.TetrahedronGeometry(0.3),
    new THREE.TorusGeometry(0.22, 0.07, 12, 32),
    new THREE.BoxGeometry(0.35, 0.35, 0.35),
  ];
  const palette = [0x8b5cf6, 0x22d3ee, 0xec4899];
  for (let i = 0; i < 14; i++) {
    const m = new THREE.Mesh(
      shapeGeos[i % shapeGeos.length],
      new THREE.MeshBasicMaterial({ color: palette[i % 3], wireframe: true, transparent: true, opacity: 0.55 })
    );
    const radius = 4.5 + Math.random() * 3.5;
    const theta = Math.random() * Math.PI * 2;
    m.position.set(Math.cos(theta) * radius, (Math.random() - 0.5) * 6, Math.sin(theta) * radius - 2);
    m.userData = { speed: 0.2 + Math.random() * 0.6, offset: Math.random() * 10, baseY: m.position.y };
    scene.add(m);
    floaters.push(m);
  }

  /* ---------- Starfield particles ---------- */
  const COUNT = window.innerWidth < 768 ? 1200 : 2600;
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const cA = new THREE.Color(0x8b5cf6), cB = new THREE.Color(0x22d3ee), tmp = new THREE.Color();
  for (let i = 0; i < COUNT; i++) {
    const r = 6 + Math.random() * 22;
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    pos.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p)], i * 3);
    tmp.copy(cA).lerp(cB, Math.random());
    col.set([tmp.r, tmp.g, tmp.b], i * 3);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  starGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 0.045, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false,
    blending: THREE.AdditiveBlending,
  }));
  scene.add(stars);

  /* ---------- Layout & resize ---------- */
  function layout() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Desktop: place object to the right of the text. Mobile: center, smaller, behind text.
    if (w > 900) { group.position.set(3.2, 0, 0); group.scale.setScalar(1); }
    else { group.position.set(0, 0.6, -2); group.scale.setScalar(0.75); }
  }
  window.addEventListener("resize", layout);
  layout();

  /* ---------- Interaction ---------- */
  const mouse = new THREE.Vector2(), target = new THREE.Vector2();
  window.addEventListener("pointermove", (e) => {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
  let scrollY = window.scrollY;
  window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

  // Pause rendering when hero is offscreen
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);

  /* ---------- Animate ---------- */
  const clock = new THREE.Clock();
  const speed = reduceMotion ? 0.15 : 1;

  function animate() {
    requestAnimationFrame(animate);
    if (!visible) return;
    const t = clock.getElapsedTime() * speed;

    mouse.lerp(target, 0.05);
    blobUniforms.uTime.value = t;
    blobUniforms.uMouse.value.copy(mouse);

    group.rotation.y = t * 0.15 + mouse.x * 0.5;
    group.rotation.x = mouse.y * 0.3;
    shell.rotation.set(t * 0.1, -t * 0.18, 0);
    ring1.rotation.z = t * 0.3;
    ring2.rotation.z = -t * 0.22;

    sat1.position.set(Math.cos(t * 0.9) * 3.2, Math.sin(t * 0.9) * 3.2, 0);
    sat2.position.set(Math.cos(-t * 0.7) * 3.7, Math.sin(-t * 0.7) * 3.7, 0);

    floaters.forEach((m) => {
      const { speed: s, offset, baseY } = m.userData;
      m.rotation.x += 0.004 * s * speed;
      m.rotation.y += 0.006 * s * speed;
      m.position.y = baseY + Math.sin(t * s + offset) * 0.4;
    });

    stars.rotation.y = t * 0.02;
    stars.rotation.x = t * 0.008;

    // Scroll parallax: camera moves back and object drifts up
    const sp = Math.min(scrollY / window.innerHeight, 1.2);
    camera.position.z = 8 + sp * 3;
    camera.position.y = -sp * 1.5;
    camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.05;
    camera.lookAt(0, camera.position.y * 0.5, 0);

    renderer.render(scene, camera);
  }
  animate();
}
