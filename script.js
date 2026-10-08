// ===== Tus proyectos: edita textos, colores (ac) y orden aquí. Imágenes en /assets =====
// imgs: [archivo, pie de foto, true si es pequeña (icono)]
const P = [
  { id:"mixet", ar:2.095, t:"Mixet", s:"Identidad y piezas para sushi a domicilio", tags:["Branding","Cartelería"], ac:"#1fb5d4", cover:"mixet-01.png",
    d:"Logotipo de letras burbuja, sistema de color, folletos de platos, mupi de reparto, vasos, pegatina y rótulo circular.",
    imgs:[["mixet-01.png","Logotipo"],["mupi.jpg","Mupi de reparto"],
      ["mixet-03.png","Packaging classics: envoltorio"],["mixet-04.png","Packaging classics: caja desplegada"],["mixet-05.png","Packaging by mixet: envoltorio"],["mixet-06.png","Packaging by mixet: caja desplegada"],
      ["mixet-07.png","Packaging premium: envoltorio"],["mixet-08.png","Packaging premium: caja desplegada"],["mixet-09.png","Packaging spicy: envoltorio"],["mixet-10.png","Packaging spicy: caja desplegada"],
      ["mixet-11.png","Diseño de vasos"],["mixet-12.png","Folleto de platos: anverso"],["mixet-13.png","Folleto de platos: reverso"],["pegatina.jpg","Pegatina"],["rotulo.jpg","Rótulo circular"],
      ["destacada-13.jpg","Portadas de destacadas y foto de perfil",1],["destacada-14.jpg","",1],["destacada-15.jpg","",1],["destacada-16.jpg","",1],["mixet-perfil.jpg","",1]] },
  { id:"loscarmenes", ar:1.409, t:"Los Carmenes", s:"Carta de tapas, vitrina y brioches", tags:["Cartas"], ac:"#e08a2e", cover:"carmenes-2.jpg",
    d:"Portada y carta para un gastrobar, con la ilustración de la pita como fondo y una paleta cálida de color miel.",
    imgs:[["carmenes-1.jpg","Portada de la carta de bar"],["carmenes-2.jpg","Carta de bar: tapas, vitrina y brioches"],["carmenes-3.png","Carta de restaurante: portada desplegada"],["carmenes-4.png","Portada de la carta"],["carmenes-5.png","Contraportada con motivo de olas"],
      ["carmenes-6.png","De la huerta y entrantes"],["carmenes-7.png","Del mar, de la tierra y lo dulce"],["carmenes-8.png","Portada de la carta de vinos"],["carmenes-9.png","Contraportada de la carta de vinos"],["carmenes-10.png","Vinos: Riojas, Riberas y D.O. Almería"],["carmenes-11.png","Vinos blancos, rosados, cavas y champagne"]] },
  { id:"barberlopez", ar:1.98, t:"Barber López", s:"Logotipo, rótulo y vinilo", tags:["Branding","Cartelería"], ac:"#6b6f8f", cover:"barber-logo-2.jpg",
    d:"Logotipo con navaja barbera, con y sin descriptor, y el vinilo para el escaparate de la peluquería.",
    imgs:[["barber-logo-2.jpg","Logotipo con descriptor"],["barber-logo-1.jpg","Logotipo"],["vinilo.jpg","Vinilo de escaparate"]] },
  { id:"ginesperegrin", ar:1.504, t:"Ginés Peregrín", s:"Carta de restaurante de autor", tags:["Cartas"], ac:"#a87c2a", cover:"gines-01.jpg",
    d:"Carta con ilustraciones de ojo, nariz y boca que invitan a mirar, oler y degustar. Disponible en español, inglés y alemán.",
    imgs:[["gines-01.jpg","Portada y contraportada"],["gines-02.jpg","Guardas con frases del restaurante"],["gines-03.jpg","Menú degustación y entrantes"],["gines-04.jpg","Carnes, pescados y postres"],
      ["gines-05.jpg","Portada de la carta en inglés"],["gines-06.jpg","Guardas en inglés"],["gines-07.jpg","Tasting menu y starters"],["gines-08.jpg","Meat, fish y desserts"],
      ["gines-09.jpg","Portada de la carta en alemán"],["gines-10.jpg","Guardas en alemán"],["gines-11.jpg","Menu Degustation y Vorspeisen"],["gines-12.jpg","Fleisch, Fisch y Desserts"],["gines-13.jpg","Fleisch, Fisch y Desserts, versión alternativa"]] },
  { id:"civitas", ar:1.414, t:"Residencia Cívitas", s:"Folleto de bienvenida y precios", tags:["Editorial"], ac:"#e8501c", cover:"civitas-1.jpg",
    d:"Díptico con calendario académico, plano universitario, precios del curso y actividades de cada mes.",
    imgs:[["civitas-1.jpg","Cara exterior"],["civitas-2.jpg","Cara interior"]] },
  { id:"experimenta96", ar:0.866, t:"Experimenta 96", s:"Revista de cultura del diseño", tags:["Editorial"], ac:"#d0202e", cover:"experimenta-1.jpg",
    d:"Maquetación de un reportaje sobre René Magritte: portada, aperturas a doble página y tipografía con fuerte jerarquía.",
    imgs:[["experimenta-1.jpg","Portada"],["experimenta-2.jpg","René Magritte: apertura del reportaje"],["experimenta-3.jpg","Magritte, mucho más que surrealista"],["experimenta-4.jpg","Analizamos sus obras"],["experimenta-5.jpg","Los amantes y La condición humana"],["experimenta-6.jpg","Muerte, 1967"]] }
];

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia("(prefers-reduced-motion:reduce)").matches && !/motion=on/.test(location.search), FINE = matchMedia("(hover:hover) and (pointer:fine)").matches;
const A = f => "assets/" + encodeURI(f), lerp = (a, b, k) => a + (b - a) * k, clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const HOME = ["#3a2bff", "#ff3d8b"];
// Colores del fondo (propios, sin depender de three.js) y estado de hover por proyecto
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
const col = { a: rgb(HOME[0]), b: rgb(HOME[1]), ta: rgb(HOME[0]), tb: rgb(HOME[1]) }, hv = [];
const setTarget = (a, b) => { col.ta = rgb(a); col.tb = b ? rgb(b) : rgb(a).map(v => v + (1 - v) * .3); };
// Ajuste de texto: cada palabra siempre cabe en pantalla, sea cual sea el tamaño de ventana
const words = s => s.split(" ").map(w => `<span class="wd">${w}</span>`).join(" ");
function fitWords(el, base, aw) {
  if (!el) return; el.style.fontSize = "100px";
  const m = Math.max(0, ...$$(".wd", el).map(w => w.offsetWidth));
  el.style.fontSize = (m ? Math.max(22, Math.min(base, 100 * aw / m * .98)) : base) + "px";
}
function fitHero() {
  const h = $("#h1"); if (!h) return; h.style.fontSize = "100px";
  const w = Math.max(...$$(".ln", h).map(l => l.offsetWidth)); if (!w) return;
  const vw = innerWidth, byW = 100 * (vw - (vw < 820 ? 32 : 90)) / w, byH = innerHeight * .5 / 1.72;
  h.style.fontSize = Math.max(26, Math.min(byW * .97, byH, 360)) + "px";
}
function fitOv() {
  const o = $("#ov"), inn = $(".in", o); if (!inn) return; const vw = innerWidth, aw = inn.clientWidth;
  fitWords($("h2", o), Math.min(190, vw * .12), aw); $$(".nx>span", o).forEach(s => fitWords(s, Math.min(170, vw * .11), aw));
}
function fitAll() {
  const vw = innerWidth, pj = Math.min(1300, vw - (vw < 820 ? 32 : 48));
  fitHero();
  $$(".pj h2").forEach(h => fitWords(h, vw < 820 ? Math.min(96, vw * .135) : Math.min(200, vw * .115), pj * .97));
  fitWords($(".ft .big"), Math.min(200, vw * .12), vw * .9);
  const abw = ($(".ab") || {}).clientWidth || vw * .9; fitWords($("#abh"), Math.min(200, vw * .12), abw); fitWords($("#mail"), Math.min(120, vw * .075), abw);
  if (ovOpen) fitOv();
}
const mouse = { x: 0, y: 0, nx: .5, ny: .5 };
addEventListener("pointermove", e => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.nx = e.clientX / innerWidth; mouse.ny = 1 - e.clientY / innerHeight; });

// ===== PDF: se dibujan con pdf.js (funciona igual en móvil y PC) =====
const isPdf = f => /\.pdf$/i.test(f);
let pdfP = null; const pdfDocs = {};
function pdfLib() {
  return pdfP || (pdfP = new Promise((ok, no) => {
    const s = document.createElement("script"), v = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
    s.src = v + "pdf.min.js"; s.onload = () => { pdfjsLib.GlobalWorkerOptions.workerSrc = v + "pdf.worker.min.js"; ok(pdfjsLib); }; s.onerror = no; document.head.append(s);
  }));
}
async function pdfDoc(f) { const l = await pdfLib(); return pdfDocs[f] || (pdfDocs[f] = l.getDocument(A(f)).promise); }
async function pdfCanvas(f, n, w) {
  const pg = await (await pdfDoc(f)).getPage(n), k = w / pg.getViewport({ scale: 1 }).width, v = pg.getViewport({ scale: k }), c = document.createElement("canvas");
  c.width = v.width; c.height = v.height; await pg.render({ canvasContext: c.getContext("2d"), viewport: v }).promise; return c;
}
async function coverSrc(p) { return isPdf(p.cover) ? (await pdfCanvas(p.cover, 1, 1400)).toDataURL("image/jpeg", .9) : A(p.cover); }

// ===== Contenido =====
const sc = $("#sc");
// Titular en letras con profundidad 3D
let ci = 0;
$("#h1").innerHTML = ["Diseño", "gráfico"].map(w => `<span class="ln" aria-hidden="true">${[...w].map(c => `<span class="ch" style="--i:${ci++};--z:${(ci % 5) - 2}">${c}</span>`).join("")}</span>`).join("");
// Bandas
const names = P.map(p => `<span>${p.t}</span>`).join("");
$("#m1").innerHTML = names + names; $("#m2").innerHTML = names + names;
// Trabajos
$("#trabajos").innerHTML = P.map((p, i) => `<article class="pj rv" data-i="${i}" tabindex="0" role="button" aria-label="Abrir ${p.t}">
  <div class="pl" style="--ar:${p.ar || 1.4}"><img src="${A(p.cover)}" alt="${p.t}: ${p.s}" loading="lazy"></div><h2 aria-hidden="true">${words(p.t)}</h2>
  <div class="info"><b>${p.s}</b><p>${p.tags.join(", ")}</p></div></article>`).join("");
$(".ft .big").setAttribute("aria-label", "Gracias por mirar"); $(".ft .big").innerHTML = words("Gracias por mirar");
// Frase
$("#say").innerHTML = "Del logotipo al vaso, de la carta a la fachada. Cada pieza se diseña como parte de un mismo sistema.".split(" ")
  .map((w, i) => `<span class="w"><i style="--i:${i}">${w}</i></span> `).join("");
$(".say").setAttribute("aria-label", "Del logotipo al vaso, de la carta a la fachada. Cada pieza se diseña como parte de un mismo sistema.");

// Revelado al entrar en pantalla (se comprueba en cada fotograma: funciona igual en móvil)
const revealEls = $$(".pj, .say, .sr");
function reveal(el) {
  el.classList.add("in"); const n = $("b[data-n]", el); if (!n) return;
  const to = +n.dataset.n, t1 = performance.now() + (parseFloat(getComputedStyle(el).getPropertyValue("--dl")) || 0);
  (function f(now) { const k = clamp((now - t1) / 1400, 0, 1); n.textContent = (n.dataset.p || "") + Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t1);
}

// ===== Scroll suave =====
const lvh = document.createElement("div"); lvh.style.cssText = "position:fixed;left:0;top:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none"; document.body.append(lvh);
const vhNow = () => Math.max(innerHeight, lvh.offsetHeight || 0);
let sy = 0, vel = 0, H = vhNow(), W = innerWidth, ovOpen = false;
const setH = () => document.body.style.height = sc.offsetHeight + "px";
new ResizeObserver(setH).observe(sc);
$$("[data-go]").forEach(a => a.addEventListener("click", e => {
  e.preventDefault(); const el = $("#" + a.dataset.go); scrollTo({ top: el.offsetTop, behavior: RM ? "auto" : "smooth" });
}));

// ===== WebGL =====
let gl = null, planes = [], bgU, cam, scene, bgScene, bgCam, renderer;
let pr = Math.min(devicePixelRatio, innerWidth < 820 ? 1.5 : 2);
function glOk() {
  try { const g = renderer.getContext(), ps = renderer.info.programs || []; return ps.length > 0 && ps.every(q => !q.program || g.getProgramParameter(q.program, g.LINK_STATUS)); }
  catch (e) { return false; }
}
function fallback() { document.body.classList.add("nogl"); renderer = null; $$(".pj").forEach(e => e.classList.remove("gl")); }
let loaded = 0;
const done = () => { if (++loaded === P.length) ready(); };

try {
  try { renderer = new THREE.WebGLRenderer({ canvas: $("#gl"), antialias: W > 820, alpha: false, powerPreference: "high-performance" }); }
  catch (e) { renderer = new THREE.WebGLRenderer({ canvas: $("#gl"), antialias: false, alpha: false }); }
  renderer.setPixelRatio(pr); renderer.autoClear = false;
  $("#gl").addEventListener("webglcontextlost", e => { e.preventDefault(); fallback(); });
  scene = new THREE.Scene(); bgScene = new THREE.Scene(); bgCam = new THREE.Camera();
  cam = new THREE.PerspectiveCamera(50, 1, 1, 3000);

  // Fondo líquido: ruido fractal deformado que fluye solo
  bgU = { uT: { value: 0 }, uR: { value: new THREE.Vector2() }, uM: { value: new THREE.Vector2(.5, .5) }, uS: { value: 0 }, uA: { value: new THREE.Color(HOME[0]) }, uB: { value: new THREE.Color(HOME[1]) } };
  bgScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ uniforms: bgU, depthTest: false,
    vertexShader: "void main(){gl_Position=vec4(position.xy,0.,1.);}",
    fragmentShader: `uniform float uT,uS;uniform vec2 uR,uM;uniform vec3 uA,uB;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+7.;a*=.5;}return v;}
void main(){vec2 uv=gl_FragCoord.xy/uR;vec2 p=uv*vec2(uR.x/uR.y,1.)*1.5+vec2(0.,uS*.0004);float t=uT*.09;
vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
vec2 r=vec2(fbm(p+3.*q+vec2(1.7,9.2)+t*1.4),fbm(p+3.*q+vec2(8.3,2.8)-t));
float f=fbm(p+3.*r);
vec3 c=mix(uA*.16,uA,smoothstep(.3,.85,f));
c=mix(c,uB,smoothstep(.45,1.,length(q))*smoothstep(.35,.8,r.x)*.8);
c+=uB*.35*exp(-7.*distance(uv,uM));
c*=1.-.35*distance(uv,vec2(.5));
c+=(h(gl_FragCoord.xy+uT)-.5)*.045;
gl_FragColor=vec4(c,1.);}` })));

  // Planos con las imágenes: se doblan con la velocidad del scroll y reaccionan al ratón
  const geo = new THREE.PlaneGeometry(1, 1, 40, 40), loader = new THREE.TextureLoader();
  $$(".pj").forEach((el, i) => {
    const u = { uTx: { value: null }, uS: { value: new THREE.Vector2(1, 1) }, uI: { value: new THREE.Vector2(1, 1) }, uV: { value: 0 }, uT: { value: 0 }, uH: { value: 0 }, uL: { value: 0 }, uM: { value: new THREE.Vector2(.5, .5) } };
    const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({ uniforms: u, transparent: true,
      vertexShader: `varying vec2 vUv;uniform float uV,uT,uH;
void main(){vUv=uv;vec3 p=position;float b=sin(uv.x*3.1416)*sin(uv.y*3.1416);
p.z+=b*uV*-1.6+sin(uv.y*7.+uT*1.6+uv.x*3.)*(3.+uH*12.);
p.y+=uV*.0016*b;
gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
      fragmentShader: `varying vec2 vUv;uniform sampler2D uTx;uniform vec2 uS,uI,uM;uniform float uV,uT,uH,uL;
void main(){float k=max(uS.x/uI.x,uS.y/uI.y);vec2 uv=(vUv-.5)*uS/(uI*k)*(1.-.1*uH)+.5;
uv+=vec2(sin(vUv.y*9.+uT*2.),cos(vUv.x*9.+uT*2.))*(.002+.006*uH);
float o=uV*.0006;
vec3 c=(texture2D(uTx,uv+vec2(0.,o)).rgb+texture2D(uTx,uv).rgb+texture2D(uTx,uv-vec2(0.,o)).rgb)/3.;
float d=distance(vUv,uM);
c+=uH*.13*exp(-8.*d*d);
c*=1.-uH*.22*smoothstep(.3,.85,distance(vUv,vec2(.5)));
c+=(fract(sin(dot(gl_FragCoord.xy+uT,vec2(12.9898,78.233)))*43758.5453)-.5)*.05*uH;
gl_FragColor=vec4(c,uL);}` }));
    m.visible = false; scene.add(m);
    planes.push({ el, m, u, i, h: 0, rx: 0, ry: 0, mx: .5, my: .5 });
    coverSrc(P[i]).then(src => loader.load(src, tx => { tx.minFilter = THREE.LinearFilter; u.uTx.value = tx; u.uI.value.set(tx.image.width, tx.image.height); el.firstElementChild.style.setProperty("--ar", (tx.image.width / tx.image.height).toFixed(3)); done(); }, undefined, () => { el.classList.add("fb"); done(); })).catch(() => { el.classList.add("fb"); done(); });
  });
} catch (err) { fallback(); setTimeout(() => ready(), 300); }
$$(".pj").forEach((el, i) => {
  hv[i] = 0;
  el.addEventListener("pointerenter", e => { if (e.pointerType === "touch") return; hv[i] = 1; setTarget(P[i].ac); if (FINE) cu(1); });
  el.addEventListener("pointerleave", () => { hv[i] = 0; setTarget(HOME[0], HOME[1]); cu(0); });
});

function resize() {
  W = innerWidth; H = vhNow(); fitAll();
  for (const e of [$("#gl"), $("#fb")]) { e.style.width = W + "px"; e.style.height = H + "px"; }
  if (!renderer) return;
  renderer.setPixelRatio(pr); renderer.setSize(W, H, false); bgU.uR.value.set(W * renderer.getPixelRatio(), H * renderer.getPixelRatio());
  cam.aspect = W / H; cam.position.z = 800; cam.fov = 2 * Math.atan(H / 2 / 800) * 180 / Math.PI; cam.updateProjectionMatrix();
}
let rw = innerWidth, rh = vhNow();
addEventListener("resize", () => { const nh = vhNow(); if (innerWidth !== rw || Math.abs(nh - rh) > 8) { rw = innerWidth; rh = nh; resize(); } }); resize();

// ===== Cursor =====
const cuEl = $("#cu"), cuT = $("span", cuEl); let cx = 0, cy = 0;
function cu(on) { cuEl.classList.toggle("big", !!on); cuT.textContent = "Ver"; }
$$("#hd a, .ft a").forEach(a => { a.addEventListener("pointerenter", () => cuEl.style.transform = "scale(2.4)"); a.addEventListener("pointerleave", () => cuEl.style.transform = ""); });

// ===== Bucle =====
const mq = [{ el: $("#m1"), x: 0, d: -1 }, { el: $("#m2"), x: 0, d: 1 }];
const hero = $("#h1"); let t0 = performance.now(), lastT = 0, ema = 16, lastAdj = 0; const fb = $("#fb"), glc = $("#gl");
function loop(now) {
  const t = (now - t0) / 1000, ty = scrollY;
  // Si el equipo va justo, baja la resolución del WebGL para mantener la fluidez
  const dt = now - lastT; lastT = now; ema = lerp(ema, Math.min(dt, 100), .05);
  if (renderer && ema > 38 && pr > .6 && now - lastAdj > 2500) { pr = Math.max(.6, pr * .8); lastAdj = now; ema = 16; resize(); }
  for (let k = 0; k < 3; k++) { col.a[k] = lerp(col.a[k], col.ta[k], .06); col.b[k] = lerp(col.b[k], col.tb[k], .06); }
  if (!renderer) { fb.style.setProperty("--ca", col.a.map(v => Math.round(v * 255)).join(" ")); fb.style.setProperty("--cb", col.b.map(v => Math.round(v * 255)).join(" ")); }
  const prev = sy; sy = lerp(sy, ty, RM ? .2 : (FINE ? .085 : .16)); vel = lerp(vel, clamp(sy - prev, -60, 60), .12);
  sc.style.transform = `translate3d(0,${-sy}px,0)`;
  for (let k = revealEls.length - 1; k >= 0; k--) { const r = revealEls[k].getBoundingClientRect(); if (r.top < H * .88 && r.bottom > 0) { reveal(revealEls[k]); revealEls.splice(k, 1); } }
  const ct = `translate3d(0,${sy}px,0)`; glc.style.transform = ct; fb.style.transform = ct; // el lienzo se queda fijo dentro de #sc para que el texto se mezcle con él
  // Titular 3D sigue al ratón
  const mx = FINE ? mouse.nx - .5 : Math.sin(t * .5) * .5, my = FINE ? mouse.ny - .5 : Math.cos(t * .4) * .35;
  hero.style.setProperty("--rx", my * 16 + "deg"); hero.style.setProperty("--ry", mx * 22 + "deg");
  // Bandas: avanzan solas y aceleran con el scroll
  mq.forEach(m => { const w = m.el.scrollWidth / 2; m.x += m.d * (1.1 + Math.abs(vel) * .7) + vel * .0; m.x = ((m.x % w) - w) % w; m.el.style.transform = `translate3d(${m.x}px,0,0) skewX(${RM ? 0 : -vel * .25}deg)`; });
  // Cursor
  cx = lerp(cx, mouse.x, .2); cy = lerp(cy, mouse.y, .2); if (FINE) cuEl.style.translate = `${cx}px ${cy}px`;
  if (renderer) try {
    bgU.uA.value.setRGB(col.a[0], col.a[1], col.a[2]); bgU.uB.value.setRGB(col.b[0], col.b[1], col.b[2]);
    bgU.uT.value = t * (RM ? .35 : 1); bgU.uS.value = sy; bgU.uM.value.set(lerp(bgU.uM.value.x, mouse.nx, .05), lerp(bgU.uM.value.y, mouse.ny, .05));
    planes.forEach(p => {
      const r = p.el.firstElementChild.getBoundingClientRect(), vis = r.bottom > -200 && r.top < H + 200 && p.u.uTx.value;
      p.m.visible = !!vis; if (!vis) return;
      p.h = lerp(p.h, hv[p.i] || 0, .08);
      const lx = clamp((mouse.x - (r.left + r.width / 2)) / r.width, -.5, .5), ly = clamp((mouse.y - (r.top + r.height / 2)) / r.height, -.5, .5);
      p.ry = lerp(p.ry, p.h * lx * .5, .08); p.rx = lerp(p.rx, p.h * ly * .5, .08);
      p.mx = lerp(p.mx, .5 + lx, .15); p.my = lerp(p.my, .5 - ly, .15); p.u.uM.value.set(p.mx, p.my);
      p.m.rotation.set(p.rx, p.ry, 0); p.m.scale.set(r.width * (1 + p.h * .04), r.height * (1 + p.h * .04), 1);
      p.m.position.set(r.left + r.width / 2 - W / 2, H / 2 - (r.top + r.height / 2), p.h * 60);
      const clip = r.top; p.u.uS.value.set(r.width, r.height); p.u.uV.value = vel; p.u.uT.value = t; p.u.uH.value = p.h;
      p.u.uL.value = lerp(p.u.uL.value, p.el.classList.contains("in") ? 1 : 0, .07);
      if (p.u.uL.value > .96 && !p.el.classList.contains("gl")) { if (glOk()) p.el.classList.add("gl"); else fallback(); }
    });
    renderer.clear(); renderer.render(bgScene, bgCam); renderer.clearDepth(); renderer.render(scene, cam);
  } catch (err) { fallback(); }
  requestAnimationFrame(loop);
}

// ===== Carga: lenta, con "Limoncito" en silueta que se rellena bajo el contador =====
let isReady = false; const ready = () => { isReady = true; };
const ldn = $("#ldn"), ld = $("#ld"), t00 = performance.now(), MIN = 5200; let shown = 0;
(function count(now) {
  const b = clamp(((now || performance.now()) - t00) / MIN, 0, 1), e = b * b * (3 - 2 * b);
  shown = Math.max(shown, isReady ? e * 100 : Math.min(e * 100, 92));
  ldn.textContent = Math.round(shown); ld.style.setProperty("--p", shown + "%");
  if (isReady && b >= 1) { ldn.textContent = 100; ld.style.setProperty("--p", "100%"); setTimeout(() => { ld.classList.add("off"); document.body.classList.add("go"); }, 450); setTimeout(() => ld.style.display = "none", 1800); return; }
  requestAnimationFrame(count);
})();
setTimeout(ready, 7000);
requestAnimationFrame(loop);

// ===== Proyecto abierto =====
const ov = $("#ov"), x = document.createElement("button"), pg = document.createElement("i");
x.id = "x"; x.textContent = "Cerrar"; pg.id = "pg"; document.body.append(x, pg);
const fo = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("on"); fo.unobserve(en.target); } }), { root: ov, threshold: .1 });
// Si una imagen no existe en /assets, se oculta en vez de mostrar un hueco roto
function miss(el) { const f = el.closest("figure"); if (f) return f.remove(); const w = el.parentNode; el.remove(); if (w && !w.children.length) w.remove(); }
let cur = 0;
function openPj(i, e) {
  cur = i; const p = P[i], nx = (i + 1) % P.length, big = p.imgs.filter(m => !m[2]), sm = p.imgs.filter(m => m[2]); let k = 0;
  ov.style.setProperty("--pc", p.ac); ov.style.setProperty("--ox", (e && e.clientX || W / 2) + "px"); ov.style.setProperty("--oy", (e && e.clientY || H / 2) + "px");
  const title = p.t.split(" ").map(w => `<span class="wd">${[...w].map(c => `<span class="c" style="--i:${k++}">${c}</span>`).join("")}</span>`).join(" ");
  ov.innerHTML = `<div class="in"><h2 aria-label="${p.t}">${title}</h2><p class="d">${p.d}</p><ul class="tg">${p.tags.map((t, n) => `<li style="--i:${n}">${t}</li>`).join("")}</ul>
    ${big.map(([f, c]) => isPdf(f) ? `<div class="pdfw" data-pdf="${f}"><p class="ph">Cargando PDF…</p></div>` : `<figure class="wait"><img src="${A(f)}" alt="${p.t}: ${c}" decoding="async" onload="this.closest('figure').classList.remove('wait')" onerror="miss(this)"><figcaption>${c}</figcaption></figure>`).join("")}
    ${sm.length ? `<div class="sm">${sm.map(([f, c], n) => `<img style="--i:${n}" src="${A(f)}" alt="${p.t}: ${c || sm[0][1]}" onerror="miss(this)">`).join("")}</div>` : ""}
    <a class="nx" href="#" data-n="${nx}"><small>Siguiente proyecto</small><span>${words(P[nx].t)}</span></a></div>`;
  ov.hidden = false; ov.scrollTop = 0; document.documentElement.style.overflow = "hidden"; ovOpen = true; document.body.classList.add("ovo");
  fitAll(); requestAnimationFrame(() => { ov.classList.add("open"); ovLoop(); });
  $$("figure, .sm", ov).forEach(f => fo.observe(f)); x.focus({ preventScroll: true });
  $(".nx", ov).addEventListener("click", ev => { ev.preventDefault(); ov.classList.remove("open"); setTimeout(() => openPj(nx, ev), 950); });
  // PDFs: cada página se dibuja como un lienzo
  $$("[data-pdf]", ov).forEach(async w => {
    const f = w.dataset.pdf;
    try {
      const d = await pdfDoc(f), cw = Math.min(ov.clientWidth - 32, 1000) * Math.min(devicePixelRatio, 2);
      for (let n = 1; n <= d.numPages; n++) {
        const c = await pdfCanvas(f, n, cw); if (cur !== i || !ovOpen) return;
        c.setAttribute("role", "img"); c.setAttribute("aria-label", `${p.t}: página ${n}`);
        const fg = document.createElement("figure"); fg.append(c); w.append(fg); if (n === 1) $(".ph", w)?.remove(); fo.observe(fg);
      }
      w.insertAdjacentHTML("beforeend", `<a class="pl2" href="${A(f)}" target="_blank" rel="noopener">Abrir el PDF completo</a>`);
    } catch (err) { w.innerHTML = `<a class="pl2" href="${A(f)}" target="_blank" rel="noopener">Abrir el PDF</a>`; }
  });
}
// Parallax 3D de las piezas y barra de progreso mientras el proyecto está abierto
function ovLoop() {
  if (!ovOpen) return;
  const h = ov.clientHeight, st = ov.scrollTop, mx = ov.scrollHeight - h;
  $$("figure:not(.on), .sm:not(.on)", ov).forEach(f => { if (f.offsetTop - st < h * .92) { f.classList.add("on"); fo.unobserve(f); } });
  $$("figure", ov).forEach(f => f.style.setProperty("--d", clamp((f.offsetTop + f.offsetHeight / 2 - st - h / 2) / h, -1, 1).toFixed(3)));
  const t = $("h2", ov); if (t) t.style.transform = `translateY(${Math.min(st * .08, 18)}px)`;
  pg.style.transform = `scaleX(${mx > 0 ? st / mx : 0})`; requestAnimationFrame(ovLoop);
}
function closePj() {
  ov.classList.remove("open"); document.body.classList.remove("ovo"); document.documentElement.style.overflow = ""; ovOpen = false;
  setTimeout(() => { if (!ovOpen) ov.hidden = true; }, 900);
}
$$(".pj").forEach(el => { const go = e => openPj(+el.dataset.i, e); el.addEventListener("click", go); el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }); });
x.addEventListener("click", closePj); addEventListener("keydown", e => { if (e.key === "Escape" && ovOpen) closePj(); });
// ===== Sobre mí =====
$$(".srv li").forEach(li => { li.addEventListener("pointerenter", e => { if (e.pointerType !== "touch") setTarget(li.dataset.ac); }); li.addEventListener("pointerleave", () => setTarget(HOME[0], HOME[1])); });
const EMAIL = "limoncitoamarillo68@gmail.com", cpBtn = $("#cp"), cpMsg = $("#cpm");
cpBtn.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(EMAIL); }
  catch (e) { const t = document.createElement("textarea"); t.value = EMAIL; t.style.cssText = "position:fixed;opacity:0"; document.body.append(t); t.select(); try { document.execCommand("copy"); } catch (e2) {} t.remove(); }
  cpMsg.textContent = "Correo copiado"; setTimeout(() => cpMsg.textContent = "", 2200);
});
fitAll(); if (document.fonts) document.fonts.ready.then(fitAll); addEventListener("load", fitAll);
