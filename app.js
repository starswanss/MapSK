/* ============================================================
   ยลดาพาทัวร์ — ตรรกะแอป (แผนที่ + เกมเก็บดวงตรา)
   ============================================================ */

/* ---------- 1) สร้างตัวการ์ตูน (SVG mascot) ---------- */
// วาดตัวละครชิบิน่ารักแบบ parametric เปลี่ยนสีผม/ธีม/อุปกรณ์ได้
// *** อยากใช้รูปจริงของตัวเอง? เปลี่ยน mascotSVG() ให้คืน <img src="..."> ได้เลย ***
function accessorySVG(type, color) {
  switch (type) {
    case "flag": // ยลดา - ธงนำทาง
      return `<g transform="translate(64,18)"><rect x="0" y="0" width="2.4" height="22" rx="1.2" fill="#6b4f2a"/><path d="M2.4 1 H16 L12 6 L16 11 H2.4 Z" fill="${color}"/></g>`;
    case "book": // เมษยา - หนังสือ
      return `<g transform="translate(60,40)"><path d="M0 2 C5 -1 12 -1 16 2 L16 16 C12 13 5 13 0 16 Z" fill="${color}"/><path d="M16 2 C20 -1 27 -1 32 2 L32 16 C27 13 20 13 16 16 Z" fill="${color}" opacity=".82"/><line x1="16" y1="3" x2="16" y2="15" stroke="#fff" stroke-width="1.4"/></g>`;
    case "lens": // ปัญญา - แว่นขยาย
      return `<g transform="translate(62,40)"><circle cx="11" cy="11" r="9" fill="none" stroke="${color}" stroke-width="3.4"/><circle cx="11" cy="11" r="6" fill="#bfe9ff" opacity=".7"/><rect x="17" y="17" width="11" height="3.6" rx="1.8" transform="rotate(45 17 17)" fill="${color}"/></g>`;
    case "bulb": // ธัญชนก - หลอดไฟไอเดีย
      return `<g transform="translate(64,34)"><circle cx="9" cy="9" r="9" fill="${color}"/><circle cx="9" cy="9" r="9" fill="#fff" opacity=".25"/><rect x="5.5" y="17" width="7" height="4" rx="1.5" fill="#7a5a14"/><path d="M9 4 v5 M6 7 l3 2 l3-2" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    default: return "";
  }
}

function mascotSVG(c, size = 96) {
  const { color, hair, accessory } = c;
  return `
  <svg viewBox="0 0 96 96" width="${size}" height="${size}" class="mascot-svg" role="img" aria-label="ตัวละคร ${c.name}">
    <defs>
      <radialGradient id="ring-${c.name}" cx="50%" cy="35%" r="75%">
        <stop offset="0%" stop-color="${color}" stop-opacity=".95"/>
        <stop offset="100%" stop-color="${color}" stop-opacity=".55"/>
      </radialGradient>
    </defs>
    <circle cx="48" cy="48" r="46" fill="url(#ring-${c.name})"/>
    <circle cx="48" cy="48" r="46" fill="none" stroke="#fff" stroke-width="3" opacity=".85"/>
    <!-- ตัว -->
    <path d="M30 86 q18 -16 36 0 Z" fill="${color}"/>
    <rect x="33" y="68" width="30" height="20" rx="10" fill="#fff" opacity=".92"/>
    <!-- คอ -->
    <rect x="43" y="58" width="10" height="10" rx="4" fill="#ffd9b8"/>
    <!-- หน้า -->
    <circle cx="48" cy="46" r="20" fill="#ffe0c2"/>
    <!-- ผม -->
    <path d="M27 46 q-1 -26 21 -26 q22 0 21 26 q-6 -12 -21 -12 q-15 0 -21 12Z" fill="${hair}"/>
    <path d="M27 46 q3 -8 8 -10 q-2 8 -3 14 Z" fill="${hair}"/>
    <path d="M69 46 q-3 -8 -8 -10 q2 8 3 14 Z" fill="${hair}"/>
    <!-- ตา -->
    <circle cx="41" cy="46" r="3.1" fill="#2a2230"/><circle cx="42" cy="45" r="1" fill="#fff"/>
    <circle cx="55" cy="46" r="3.1" fill="#2a2230"/><circle cx="56" cy="45" r="1" fill="#fff"/>
    <!-- แก้ม -->
    <circle cx="37" cy="51" r="3" fill="#ff9aa2" opacity=".7"/>
    <circle cx="59" cy="51" r="3" fill="#ff9aa2" opacity=".7"/>
    <!-- ยิ้ม -->
    <path d="M43 53 q5 5 10 0" stroke="#a85b46" stroke-width="2" fill="none" stroke-linecap="round"/>
    ${accessorySVG(accessory, accessory === "flag" ? color : color)}
  </svg>`;
}

/* ---------- 2) ไอคอนสถานที่ (SVG) ---------- */
const ICON_PATHS = {
  monument:'M12 2l3 5h-2v4h3l2 11H6l2-11h3V7H9z',
  elephant:'M4 11a6 6 0 0 1 12 0v6h-3v-4a3 3 0 0 0-6 0v4H4zm12 1c2 0 3 1 3 3v2h-3z',
  tree:'M12 2a6 6 0 0 1 4 10v0a4 4 0 0 1-3 4v6h-2v-6a4 4 0 0 1-3-4A6 6 0 0 1 12 2',
  fossil:'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2m0 4c1 2 0 3-1 4s-1 3 1 4 3-1 4-2',
  salt:'M5 20l3-9h8l3 9zM9 9V6a3 3 0 0 1 6 0v3z',
  temple:'M12 2l9 5H3zM5 9h14v2H5zm0 4h14v7H5z',
  buddha:'M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4m-5 13h10l-2 7H9z',
  'mountain-temple':'M3 20l6-10 3 5 3-6 6 11zM10 6h4v2h-4z',
  dam:'M4 4h3v16H4zm13 0h3v16h-3zM7 9h10v3H7zm0 5h10v3H7z',
  windmill:'M11 11h2v11h-2zM12 2l3 7-3 1-3-1zM2 12l7-3 1 3-1 3zm20 0l-7 3-1-3 1-3z',
  painting:'M4 3h16v14H4zM6 19h12v2H6zM8 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m-2 7l3-4 3 3 2-2 3 3z',
  castle:'M3 21V8l3 2V6l3 2V6l3 2V6l3 2v2l3-2v13zM10 21v-4h4v4z'
};
function iconPath(type){ return ICON_PATHS[type] || ICON_PATHS.monument; }
function placeIcon(type) {
  return `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="currentColor" d="${iconPath(type)}"/></svg>`;
}

/* ---------- 2.5) ภาพประกอบสถานที่ (SVG scene) ----------
   สร้าง “ภาพประกอบ” สีสันต่อสถานที่ พร้อมรองรับรูปถ่ายจริง:
   ใส่ฟิลด์ image:"images/xxx.jpg" ใน data.js แล้วจะใช้รูปจริงแทนทันที  */
const SCENES = {
  monument:        {sky:["#FFB36B","#FF6FA5"], hill:["#C8487E","#8E2F63"], sun:"#FFE7A8", night:false},
  elephant:        {sky:["#FFE3A1","#9BD17D"], hill:["#6FAE59","#4E7D3E"], sun:"#FFF2C2", night:false},
  tree:            {sky:["#BDEBCB","#6FCF97"], hill:["#3F9D6B","#2C7350"], sun:"#FFF4C4", night:false},
  fossil:          {sky:["#E9D2A6","#C99A5B"], hill:["#9C6B36","#6E4A24"], sun:"#FFF0CF", night:false},
  salt:            {sky:["#CFEFFF","#9AD9F0"], hill:["#EAF6FB","#C9E6F2"], sun:"#FFFFFF", night:false},
  temple:          {sky:["#FFE2A0","#FFB35C"], hill:["#D98C3A","#A5631F"], sun:"#FFF6D0", night:false},
  buddha:          {sky:["#FFE9B0","#FFC76B"], hill:["#D9A23A","#9C6E1F"], sun:"#FFF7D6", night:false},
  "mountain-temple":{sky:["#CDE7E4","#8FC3BE"], hill:["#4F8C84","#33635D"], sun:"#FFF4D8", night:false},
  dam:             {sky:["#AEE0FF","#5FB6E8"], hill:["#2E86C1","#1B5E8A"], sun:"#FFF3C4", night:false},
  windmill:        {sky:["#BFE6FF","#7FC4F0"], hill:["#7FB85E","#558A3C"], sun:"#FFF6CC", night:false},
  painting:        {sky:["#F3C98B","#D98A55"], hill:["#A85C32","#7A3F22"], sun:"#FFE9C0", night:false},
  castle:          {sky:["#C9A6E6","#8A6FC4"], hill:["#5E4A8C","#3D2F66"], sun:"#FFE0B8", night:true}
};

function sceneSVG(place, w, h){
  const s = SCENES[place.emoji] || SCENES.monument;
  const id = place.id;
  const star = s.night
    ? `<g fill="#fff" opacity=".85"><circle cx="40" cy="30" r="1.6"/><circle cx="90" cy="22" r="1.2"/><circle cx="150" cy="38" r="1.5"/><circle cx="220" cy="26" r="1.2"/><circle cx="275" cy="44" r="1.6"/></g>`
    : "";
  return `
  <svg viewBox="0 0 320 180" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="ภาพประกอบ ${place.name}">
    <defs>
      <linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${s.sky[0]}"/><stop offset="1" stop-color="${s.sky[1]}"/>
      </linearGradient>
      <linearGradient id="hill${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${s.hill[0]}"/><stop offset="1" stop-color="${s.hill[1]}"/>
      </linearGradient>
    </defs>
    <rect width="320" height="180" fill="url(#sky${id})"/>
    ${star}
    <circle cx="248" cy="48" r="26" fill="${s.sun}" opacity=".92"/>
    <path d="M0 120 C60 96 110 128 170 110 C230 92 280 120 320 104 L320 180 L0 180 Z" fill="url(#hill${id})" opacity=".55"/>
    <path d="M0 142 C70 120 120 152 190 138 C250 126 290 150 320 138 L320 180 L0 180 Z" fill="url(#hill${id})"/>
    <g transform="translate(130 66) scale(2.5)" style="filter:drop-shadow(0 3px 5px rgba(0,0,0,.3))">
      <path fill="#ffffff" fill-opacity=".95" d="${iconPath(place.emoji)}"/>
    </g>
  </svg>`;
}

// คืนค่า markup รูปสถานที่
// ลำดับความสำคัญ: รูปจาก Google Places (photoUrl) > รูปที่ใส่เอง (image) > ภาพประกอบ SVG
function placeImage(place, w, h){
  const src = place.photoUrl || place.image;
  if (src){
    return `<img class="place-photo" src="${src}" alt="${place.name}" loading="lazy"
              onerror="photoFallback(this, ${place.id})"
              style="width:${w};height:${h};object-fit:cover"/>`;
  }
  return sceneSVG(place, w, h);
}

// ถ้ารูปจริงโหลดไม่สำเร็จ → ย้อนกลับไปใช้ภาพประกอบ SVG
window.photoFallback = function(img, id){
  const p = PLACES.find(x=>x.id===id);
  if (!p) return;
  p.photoUrl = null;
  img.insertAdjacentHTML("beforebegin", sceneSVG(p, "100%", "100%"));
  img.remove();
};

/* ---------- 3) สถานะเกม (localStorage) ---------- */
const STORE_KEY = "yolada_stamps_v1";
let visited = new Set(JSON.parse(localStorage.getItem(STORE_KEY) || "[]"));
function saveVisited(){ localStorage.setItem(STORE_KEY, JSON.stringify([...visited])); }

/* ---------- 4) เรนเดอร์ตัวละครทีม ---------- */
function renderCrew() {
  const y = CHARACTERS.yolada;
  document.getElementById("crewYolada").innerHTML = `
    <div class="crew-badge">ไกด์นำทาง ⭐</div>
    <div class="crew-avatar lead">${mascotSVG(y, 110)}</div>
    <div class="crew-info">
      <h3>${y.name}</h3>
      <p class="crew-role">${y.role}</p>
      <p class="crew-blurb">${y.blurb}</p>
    </div>`;

  const followers = ["mesaya","panya","thanchanok"].map(key=>{
    const c = CHARACTERS[key];
    return `<div class="crew-card crew-follower" style="--accent:${c.color}">
      <div class="crew-avatar">${mascotSVG(c, 72)}</div>
      <h4>${c.name}</h4>
      <p class="crew-skill">${c.skill}</p>
    </div>`;
  }).join("");
  document.getElementById("crewFollowers").innerHTML = followers;

  document.getElementById("splashMascot").innerHTML = mascotSVG(y, 150);
  document.getElementById("brandMascot").innerHTML = mascotSVG(y, 56);
  document.getElementById("yoladaBubbleMascot").innerHTML = mascotSVG(y, 60);
  document.getElementById("celebrateMascot").innerHTML = mascotSVG(y, 120);
}

/* ---------- 5) รายการสถานที่ ---------- */
function renderPlaceList() {
  const list = document.getElementById("placeList");
  list.innerHTML = PLACES.map(p=>`
    <li class="place-item ${visited.has(p.id)?'visited':''}" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.name}">
      <span class="place-thumb">${placeImage(p, "100%", "100%")}<span class="place-num">${p.id}</span></span>
      <span class="place-meta">
        <span class="place-name">${p.name}</span>
        <span class="place-dist">${p.district}</span>
      </span>
      <span class="place-check" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
      </span>
    </li>`).join("");

  list.querySelectorAll(".place-item").forEach(el=>{
    const id = +el.dataset.id;
    el.addEventListener("click", ()=>openDetail(id));
    el.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault();openDetail(id);} });
  });
}

/* ---------- 6) แผนที่ (Leaflet) ---------- */
let map, markers = {}, routeLine;
function initMap() {
  map = L.map("map", { scrollWheelZoom: true, zoomControl: true });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // เส้นทางจีโอพาร์ค (ลำดับเริ่มจากอนุสาวรีย์ท้าวสุรนารี)
  const coords = PLACES.map(p=>[p.lat,p.lng]);
  routeLine = L.polyline(coords, {
    color:"#FF3D8B", weight:4, opacity:.55, dashArray:"2 10", lineCap:"round"
  }).addTo(map);

  // หมุดแต่ละจุด
  PLACES.forEach((p, i)=>{
    const icon = L.divIcon({
      className:"",
      html:`<div class="map-pin ${visited.has(p.id)?'visited':''}" data-id="${p.id}">
              <span class="map-pin-num">${p.id}</span>
            </div>`,
      iconSize:[40,40], iconAnchor:[20,40], popupAnchor:[0,-38]
    });
    const m = L.marker([p.lat,p.lng], {icon, title:p.name}).addTo(map);
    m.on("click", ()=>openDetail(p.id));
    markers[p.id] = m;
    // ดรอปหมุดทีละตัว
    setTimeout(()=>{ const el=m.getElement()?.querySelector(".map-pin"); el&&el.classList.add("drop"); }, 120*i+200);
  });

  addDistrictZones();

  map.fitBounds(routeLine.getBounds().pad(0.18));
  document.getElementById("recenterBtn").onclick = ()=>{
    currentDistrictId = null;
    Object.values(districtZones).forEach(c=>c.setStyle({fillOpacity:.08, opacity:.5, weight:2}));
    document.querySelectorAll(".district-chip").forEach(b=>b.classList.remove("active"));
    map.fitBounds(routeLine.getBounds().pad(0.18));
  };
  setTimeout(()=>map.invalidateSize(), 250);
}

function refreshMarker(id) {
  const el = markers[id]?.getElement()?.querySelector(".map-pin");
  if (el) el.classList.toggle("visited", visited.has(id));
}

/* ---------- 7) แผงรายละเอียด ---------- */
const detail = document.getElementById("detail");
let currentId = null, currentTab = "geology";

function openDetail(id) {
  const p = PLACES.find(x=>x.id===id);
  currentId = id;
  document.getElementById("detailImage").innerHTML = placeImage(p, "100%", "100%");
  document.getElementById("detailDistrict").textContent = p.district;
  document.getElementById("detailTitle").textContent = `${p.id}. ${p.name}`;
  document.getElementById("yoladaQuote").textContent = p.yolada;

  // ลิงก์นำทาง Google Maps จริง
  document.getElementById("navBtn").href =
    `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;

  setTab("geology");
  updateCheckinBtn();

  detail.classList.add("open");
  detail.setAttribute("aria-hidden","false");
  // โฟกัสหมุดบนแผนที่
  if (map) map.panTo([p.lat,p.lng], {animate:true});
}

function closeDetail() {
  detail.classList.remove("open");
  detail.setAttribute("aria-hidden","true");
  currentId = null;
}

const TAB_INFO = {
  geology:{ key:"geology", char:"panya", label:"ธรณีวิทยา" },
  history:{ key:"history", char:"mesaya", label:"ประวัติและความเป็นมา" },
  tips:{ key:"tips", char:"thanchanok", label:"Tips การเที่ยว" }
};

function setTab(tab) {
  currentTab = tab;
  const p = PLACES.find(x=>x.id===currentId);
  const info = TAB_INFO[tab];
  const c = CHARACTERS[info.char];

  document.querySelectorAll(".tab").forEach(t=>{
    t.classList.toggle("active", t.dataset.tab===tab);
    t.setAttribute("aria-selected", t.dataset.tab===tab);
  });

  const body = document.getElementById("tabBody");
  body.style.setProperty("--accent", c.color);
  body.innerHTML = `
    <div class="tab-content" key="${tab}">
      <div class="tab-speaker">
        <div class="tab-speaker-av">${mascotSVG(c, 56)}</div>
        <div>
          <strong>${c.name}</strong>
          <span>${info.label}</span>
        </div>
      </div>
      <p class="tab-text">${p[info.key]}</p>
    </div>`;
}

function updateCheckinBtn() {
  const btn = document.getElementById("checkinBtn");
  const done = visited.has(currentId);
  btn.classList.toggle("done", done);
  btn.innerHTML = done
    ? `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg> เก็บดวงตราแล้ว`
    : `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2 15 9 22 9.3 16.5 14 18.5 21 12 17 5.5 21 7.5 14 2 9.3 9 9z"/></svg> เช็คอิน เก็บดวงตรา`;
}

function checkin() {
  if (!currentId || visited.has(currentId)) return;
  visited.add(currentId);
  saveVisited();
  updateCheckinBtn();
  updatePassport();
  refreshMarker(currentId);
  document.querySelector(`.place-item[data-id="${currentId}"]`)?.classList.add("visited");
  stampBurst();
  if (visited.size === PLACES.length) setTimeout(celebrate, 600);
}

/* ---------- 8) พาสปอร์ต / progress ---------- */
function updatePassport() {
  const n = visited.size;
  document.getElementById("stampCount").textContent = n;
  document.getElementById("passportFill").style.width = (n/PLACES.length*100)+"%";
}

/* ---------- 9) เอฟเฟกต์: stamp + confetti ---------- */
function stampBurst() {
  const btn = document.getElementById("checkinBtn");
  const r = btn.getBoundingClientRect();
  fireConfetti(r.left + r.width/2, r.top, 40);
}

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let parts = [];
function sizeCanvas(){ canvas.width=innerWidth; canvas.height=innerHeight; }
sizeCanvas(); addEventListener("resize", sizeCanvas);

function fireConfetti(x, y, count=120) {
  const colors = ["#FF3D8B","#7C4DFF","#F97316","#14B8A6","#FFD54A"];
  for (let i=0;i<count;i++){
    parts.push({
      x, y,
      vx:(Math.random()-.5)*9,
      vy:Math.random()*-9-3,
      g:.28, size:Math.random()*7+4,
      color:colors[i%colors.length],
      rot:Math.random()*6, vr:(Math.random()-.5)*.4, life:1
    });
  }
  if (!rafOn) loopConfetti();
}
let rafOn=false;
function loopConfetti(){
  rafOn=true;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  parts.forEach(p=>{
    p.vy+=p.g; p.x+=p.vx; p.y+=p.vy; p.rot+=p.vr; p.life-=.008;
    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.globalAlpha=Math.max(p.life,0);
    ctx.fillStyle=p.color; ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*.6); ctx.restore();
  });
  parts = parts.filter(p=>p.life>0 && p.y<canvas.height+40);
  if (parts.length) requestAnimationFrame(loopConfetti); else { rafOn=false; ctx.clearRect(0,0,canvas.width,canvas.height); }
}

function celebrate() {
  document.getElementById("celebrate").classList.remove("hidden");
  let bursts=0;
  const iv=setInterval(()=>{
    fireConfetti(Math.random()*innerWidth, innerHeight*0.2, 80);
    if(++bursts>5) clearInterval(iv);
  }, 350);
}

/* ---------- 9.5) รูปสถานที่จริงจาก Google Places ---------- */
const PHOTO_CACHE_KEY = "yolada_photos_v1";

function loadCachedPhotos(){
  try{
    const c = JSON.parse(localStorage.getItem(PHOTO_CACHE_KEY) || "{}");
    const maxAge = (CONFIG?.PHOTO_CACHE_DAYS ?? 14) * 864e5;
    if (c.t && Date.now()-c.t < maxAge && c.map){
      PLACES.forEach(p=>{ if(c.map[p.id]) p.photoUrl = c.map[p.id]; });
    }
  }catch(e){ /* ignore */ }
}
function saveCachedPhotos(){
  const map = {};
  PLACES.forEach(p=>{ if(p.photoUrl) map[p.id] = p.photoUrl; });
  try{ localStorage.setItem(PHOTO_CACHE_KEY, JSON.stringify({t:Date.now(), map})); }catch(e){}
}

// อัปเดตรูปในรายการ + แผงรายละเอียด (ถ้ากำลังเปิดจุดนั้นอยู่)
function applyPhoto(p){
  const thumb = document.querySelector(`.place-item[data-id="${p.id}"] .place-thumb`);
  if (thumb){
    thumb.innerHTML = placeImage(p, "100%", "100%") + `<span class="place-num">${p.id}</span>`;
  }
  if (currentId === p.id){
    document.getElementById("detailImage").innerHTML = placeImage(p, "100%", "100%");
  }
}

// โหลด Google Maps JS (เฉพาะเมื่อมีคีย์) ด้วย bootstrap loader อย่างเป็นทางการ
let googleLoading = null;
function loadGoogleMaps(key){
  if (window.google?.maps?.importLibrary) return Promise.resolve();
  if (googleLoading) return googleLoading;
  googleLoading = new Promise((resolve, reject)=>{
    ((g)=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",
      m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,
      e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await(a=m.createElement("script"));
      e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);
      e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;
      d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));
      a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));
      d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
      ({key:key, v:"weekly"});
    google.maps.importLibrary("core").then(resolve).catch(reject);
  });
  return googleLoading;
}

// ดึงรูปของแต่ละสถานที่จาก Google Places (New)
async function fetchGooglePhotos(){
  const key = (window.CONFIG?.GOOGLE_MAPS_API_KEY || "").trim();
  if (!key){ return; } // ไม่มีคีย์ → ใช้ภาพประกอบ SVG ตามเดิม
  try{
    await loadGoogleMaps(key);
    const { Place } = await google.maps.importLibrary("places");
    const maxW = CONFIG?.PHOTO_MAX_WIDTH ?? 900;

    for (const p of PLACES){
      if (p.photoUrl) continue; // มีจาก cache แล้ว ข้าม
      try{
        const { places } = await Place.searchByText({
          textQuery: `${p.name} ${p.district} นครราชสีมา`,
          fields: ["photos"],
          locationBias: { center: { lat:p.lat, lng:p.lng }, radius: 4000 },
          maxResultCount: 1,
          language: "th",
          region: "th"
        });
        const photo = places?.[0]?.photos?.[0];
        if (photo){
          p.photoUrl = photo.getURI({ maxWidth: maxW });
          applyPhoto(p);
        }
      }catch(err){ console.warn("ดึงรูปไม่สำเร็จ จุดที่", p.id, err?.message||err); }
    }
    saveCachedPhotos();
  }catch(err){
    console.warn("โหลด Google Maps ไม่สำเร็จ — ใช้ภาพประกอบ SVG แทน:", err?.message||err);
  }
}

/* ---------- 11) อำเภอ + บทประพันธ์ + เครื่องเล่นเสียง ---------- */
let districtZones = {}, currentDistrictId = null;

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m])); }
const cssId = id => "comp-" + String(id).replace(/\./g, "-");

function renderDistrictChips(){
  const el = document.getElementById("districtChips");
  if (!el) return;
  el.innerHTML = DISTRICTS.map(d=>`
    <button class="district-chip" data-id="${d.id}" style="--c:${d.color}">
      <span class="district-chip-dot"></span>${d.name}
    </button>`).join("");
  el.querySelectorAll(".district-chip").forEach(b=>{
    b.addEventListener("click", ()=>selectDistrict(b.dataset.id));
  });
}

function addDistrictZones(){
  DISTRICTS.forEach(d=>{
    const c = L.circle(d.center, {
      radius: d.radius, color: d.color, weight: 2, opacity: .5,
      fillColor: d.color, fillOpacity: .08
    }).addTo(map);
    c.on("click", ()=>selectDistrict(d.id));
    districtZones[d.id] = c;
  });
}

function selectDistrict(id){
  currentDistrictId = id;
  const d = DISTRICTS.find(x=>x.id===id);
  // ไฮไลท์โซนที่เลือก หรี่โซนอื่น
  Object.entries(districtZones).forEach(([zid, c])=>{
    const on = zid === id;
    c.setStyle({ fillOpacity: on ? .28 : .05, opacity: on ? .95 : .35, weight: on ? 4 : 1.5 });
    if (on) c.bringToFront();
  });
  document.querySelectorAll(".district-chip").forEach(b=>b.classList.toggle("active", b.dataset.id===id));
  if (map) map.fitBounds(districtZones[id].getBounds().pad(0.15));
  openDistrict(d);
}

function openDistrict(d){
  const box = document.getElementById("district");
  document.getElementById("districtTitle").textContent = d.name;
  document.getElementById("districtTagline").textContent = d.tagline || "";
  document.getElementById("districtHero").style.background =
    `linear-gradient(140deg, ${d.color}, ${d.color}cc)`;
  document.getElementById("districtBody").innerHTML = renderDistrictBody(d);
  box.classList.add("open");
  box.setAttribute("aria-hidden","false");
}
function closeDistrict(){
  const box = document.getElementById("district");
  box.classList.remove("open");
  box.setAttribute("aria-hidden","true");
}

function renderDistrictBody(d){
  const hi = d.highlights.map(h=>`
    <div class="hl-item"><span class="hl-tag" style="--c:${d.color}">${h.tag}</span><span class="hl-text">${h.text}</span></div>`).join("");
  const comps = d.compositions.map(c=>compositionCard(c, d.color)).join("");
  return `
    <div class="district-section">
      <h3 class="district-h">✨ สิ่งน่าสนใจ</h3>
      <div class="hl-list">${hi}</div>
    </div>
    <div class="district-section">
      <h3 class="district-h">📜 บทประพันธ์ · ${d.compositions.length} บท</h3>
      <div class="comp-list">${comps}</div>
    </div>`;
}

function compositionCard(c, color){
  return `<article class="comp-card" id="${cssId(c.id)}" style="--c:${color}">
    <div class="comp-head">
      <span class="comp-no">${c.id}</span>
      <div class="comp-headtext">
        <h4 class="comp-title">${escapeHtml(c.title)}</h4>
        ${c.form ? `<span class="comp-form">${escapeHtml(c.form)}</span>` : ""}
      </div>
    </div>
    <div class="comp-body">${escapeHtml(c.body)}</div>
    <div class="comp-audio" data-comp="${c.id}">${audioPlayerHTML(c)}</div>
  </article>`;
}

function audioPlayerHTML(c){
  if (c.audio){
    return `<div class="comp-audio-row">
      <span class="comp-audio-label">🎧 ฟังบทประพันธ์</span>
      <audio controls preload="none" src="${c.audio}"></audio>
    </div>`;
  }
  return `<div class="comp-audio-empty">🔇 ยังไม่มีไฟล์เสียง — เพิ่มได้ที่ปุ่ม “จัดการอัพโหลด” › แท็บ “เสียงบทประพันธ์”</div>`;
}

// เรียกจาก admin.js หลังอัปโหลด/ลบไฟล์เสียง เพื่อรีเฟรชเครื่องเล่นที่เปิดอยู่
function applyAudio(comp){
  const el = document.querySelector(`.comp-audio[data-comp="${comp.id}"]`);
  if (el) el.innerHTML = audioPlayerHTML(comp);
}

/* ---------- 10) เริ่มต้นแอป ---------- */
function startApp() {
  document.getElementById("splash").classList.add("gone");
  document.getElementById("app").classList.remove("hidden");
  setTimeout(()=>{ document.getElementById("splash").style.display="none"; }, 600);
  if (!map) initMap();
  setTimeout(()=>map && map.invalidateSize(), 400);
}

document.addEventListener("DOMContentLoaded", ()=>{
  loadCachedPhotos();      // ใช้รูปที่เคยโหลดไว้ (ถ้ามี) ทันที
  renderCrew();
  renderPlaceList();
  renderDistrictChips();
  updatePassport();
  fetchGooglePhotos();     // ดึงรูปจริงจาก Google (ทำงานเฉพาะเมื่อมีคีย์ ไม่บล็อก UI)

  document.getElementById("districtClose")?.addEventListener("click", closeDistrict);
  document.getElementById("districtScrim")?.addEventListener("click", closeDistrict);

  document.getElementById("startBtn").onclick = startApp;
  document.getElementById("detailClose").onclick = closeDetail;
  document.getElementById("detailScrim").onclick = closeDetail;
  document.getElementById("checkinBtn").onclick = checkin;
  document.getElementById("celebrateClose").onclick = ()=>document.getElementById("celebrate").classList.add("hidden");

  document.querySelectorAll(".tab").forEach(t=>{
    t.onclick = ()=>setTab(t.dataset.tab);
  });

  document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ closeDetail(); closeDistrict(); } });
});
