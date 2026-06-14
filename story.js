/* ============================================================
   story.js — โหมดผจญภัย "ยลดาพาทัวร์"
   • เล่าเรื่องโดย "แม่หน่อย" (ตัวละครใหม่)
   • 12 ด่าน แต่ละด่านมีมินิเกมไม่ซ้ำกัน
   • เก็บกุญแจพลัง 12 ดอก · ปลดล็อกตามลำดับ · บันทึกความคืบหน้า
   ============================================================ */

// ตัวละครผู้เล่าเรื่อง (ใช้ mascotSVG ร่วมกับระบบเดิม)
const MAE_NOY = { name: "แม่หน่อย", role: "ครูผู้นำทาง", color: "#D6457F", hair: "#3A2230", accessory: "book" };

const STORY = [
  { n:1, placeId:1, title:"หัวใจชัยชนะ", key:{emoji:"🙏",name:"พลังแห่งศรัทธา",desc:"พรจากย่าโม คุ้มครองการเดินทาง"}, mg:"flower",
    lines:[
      {who:"n",t:"แม่หน่อยยืนสงบนิ่งหน้าอนุสาวรีย์ย่าโม เด็ก ๆ 6 คนวิ่งเข้ามาหา"},
      {who:"m",t:"จะไปดูโลกกว้าง ต้องมาขอพรแม่เมืองก่อนนะลูก"},
      {who:"m",t:"นี่คือกุญแจดอกแรก ‘พลังแห่งศรัทธา’ พวกเธอพร้อมออกเดินทางตามหาคำตอบของแผ่นดินหรือยัง?"}
    ], mission:"แตะพวงมาลัยที่ร่วงลงมา ถวายย่าโมให้ครบ" },

  { n:2, placeId:2, title:"รอยเท้าอสุรา", key:{emoji:"🦣",name:"พลังแห่งกาลเวลา",desc:"เรียนรู้ว่าโลกเปลี่ยนไปมากแค่ไหน"}, mg:"elephant",
    lines:[
      {who:"n",t:"เด็ก ๆ ตื่นตาตื่นใจกับโครงกระดูกช้างยักษ์ในพิพิธภัณฑ์"},
      {who:"m",t:"ช้างโบราณเคยเดินบนผืนดินโคราชนี้มาก่อน ยิ่งใหญ่มากเลยนะ"},
      {who:"m",t:"ลองตามหาช้างที่มี ‘4 งา’ ให้เจอสิ จะได้รู้ว่าโลกเราเปลี่ยนไปแค่ไหน"}
    ], mission:"หาช้างสี่งาท่ามกลางฝูงช้างให้เจอ" },

  { n:3, placeId:3, title:"ข่ายใยแห่งชีวิต", key:{emoji:"🌿",name:"พลังแห่งความผูกพัน",desc:"คนโคราชไม่เคยทิ้งกัน เหมือนรากไทร"}, mg:"maze",
    lines:[
      {who:"n",t:"ทุกคนเดินลอดอุโมงค์รากไทรที่พันเกี่ยวกันอย่างน่าอัศจรรย์"},
      {who:"m",t:"ดูรากไม้เหล่านี้สิ เหมือนคนโคราชที่ไม่เคยทิ้งกัน"},
      {who:"m",t:"ช่วยกันหาทางออกจากเขาวงกตรากไทรให้เร็วนะ!"}
    ], mission:"นำทางออกจากเขาวงกตรากไทร" },

  { n:4, placeId:4, title:"กาลเวลาที่แข็งแกร่ง", key:{emoji:"💎",name:"พลังแห่งความยั่งยืน",desc:"ไม้ที่กลายเป็นอัญมณีด้วยกาลเวลา"}, mg:"memory",
    lines:[
      {who:"n",t:"กลับมาที่พิพิธภัณฑ์ไม้กลายเป็นหิน ชมไม้ที่กลายเป็นอัญมณี"},
      {who:"m",t:"กาลเวลานับล้านปีเปลี่ยนไม้ให้เป็นหินได้ นี่แหละความยั่งยืน"},
      {who:"m",t:"จับคู่ฟอสซิลให้ครบ เพื่อรับพลังแห่งความยั่งยืนกัน"}
    ], mission:"จับคู่การ์ดฟอสซิลให้ครบทุกคู่" },

  { n:5, placeId:5, title:"รสชาติของแผ่นดิน", key:{emoji:"🧂",name:"พลังแห่งความบริสุทธิ์",desc:"ขุมทรัพย์ขาวบริสุทธิ์ของชาวขามทะเลสอ"}, mg:"salt",
    lines:[
      {who:"n",t:"ทุ่งเกลือสีขาวโพลนทอดยาวท่ามกลางแดดจ้า"},
      {who:"m",t:"ที่นี่คือขุมทรัพย์ขาวบริสุทธิ์ของชาวขามทะเลสอ"},
      {who:"m",t:"เก็บเม็ดเกลือบริสุทธิ์ หลบก้อนหินให้ได้นะ!"}
    ], mission:"แตะเก็บเม็ดเกลือ 💎 หลีกเลี่ยงก้อนหิน 🪨" },

  { n:6, placeId:8, title:"Unseen ผืนป่าลอยฟ้า", key:{emoji:"🍃",name:"พลังแห่งความสงบ",desc:"ความสงบจากผืนป่าบนหน้าผาสูง"}, mg:"breath",
    lines:[
      {who:"n",t:"ขึ้นสู่จุดชมวิวบนหน้าผาสูงชัน มองเห็นป่ากว้างสุดสายตา"},
      {who:"m",t:"หลับตา ฟังเสียงลม แล้วสูดหายใจช้า ๆ นะลูก"},
      {who:"m",t:"รับ ‘พลังแห่งความสงบ’ ก่อนลุยด่านต่อไป"}
    ], mission:"กดค้างหายใจเข้าจนเต็มวง ทำให้ครบ 3 ครั้ง" },

  { n:7, placeId:6, title:"อารยธรรมนิรันดร์", key:{emoji:"🛕",name:"พลังแห่งอารยธรรม",desc:"หลักฐานความเจริญของโคราชนับพันปี"}, mg:"scratch",
    lines:[
      {who:"n",t:"พบพระนอนหินทรายขนาดใหญ่ที่หลับใหลมานับพันปี ใต้ฝุ่นกาลเวลา"},
      {who:"m",t:"นี่คือหลักฐานว่าโคราชเรามีความเจริญมาอย่างยาวนาน"},
      {who:"m",t:"ค่อย ๆ ปัดฝุ่นออก เผยองค์พระนอนให้ทุกคนได้เห็นกัน"}
    ], mission:"ลากนิ้วปัดฝุ่นเผยองค์พระนอน" },

  { n:8, placeId:7, title:"มหาวิหารแห่งเมตตา", key:{emoji:"💗",name:"พลังแห่งความเมตตา",desc:"บารมีหลวงพ่อโตนำทางสู่ความสำเร็จ"}, mg:"bell",
    lines:[
      {who:"n",t:"แวะพักจิตใจที่มหาวิหารสมเด็จพระพุฒาจารย์ (โต พฺรหฺมรํสี) องค์ใหญ่ที่สุดในโลก"},
      {who:"m",t:"บารมีหลวงพ่อโตจะนำทางพวกเธอสู่ความสำเร็จ"},
      {who:"m",t:"ตีระฆังทำบุญให้ตรงจังหวะ รับพลังความเมตตากัน"}
    ], mission:"แตะตีระฆังตอนเครื่องหมายอยู่ในแถบเขียว 3 ครั้ง" },

  { n:9, placeId:9, title:"สายเลือดของโคราช", key:{emoji:"🌊",name:"พลังแห่งสายน้ำ",desc:"สายน้ำหล่อเลี้ยงคนทั้งจังหวัด"}, mg:"water",
    lines:[
      {who:"n",t:"ยืนมองผืนน้ำกว้างใหญ่ของเขื่อนลำตะคองที่เลี้ยงคนทั้งจังหวัด"},
      {who:"m",t:"น้ำคือสายเลือดของโคราช ทั้งทำนา ทำไฟฟ้าสะอาด"},
      {who:"m",t:"ปล่อยน้ำให้พอดีระดับ อย่ามากอย่าน้อยเกินไปนะ"}
    ], mission:"แตะหยุดระดับน้ำให้อยู่ในแถบสีเขียว 3 รอบ" },

  { n:10, placeId:10, title:"ลมหายใจแห่งอนาคต", key:{emoji:"💨",name:"พลังแห่งอนาคต",desc:"พลังงานสะอาดจากสายลม"}, mg:"wind",
    lines:[
      {who:"n",t:"ท่ามกลางกังหันลมสีขาวยักษ์ และวิวพระอาทิตย์ตกที่สวยที่สุด"},
      {who:"m",t:"โคราชมีทั้งอดีต ปัจจุบัน และอนาคต อยู่ในแผ่นดินเดียว"},
      {who:"m",t:"ช่วยกันปั่นกังหันให้ผลิตไฟฟ้าจนเต็มพลังกัน!"}
    ], mission:"แตะรัว ๆ ปั่นกังหันให้พลังงานเต็มก่อนหมดเวลา" },

  { n:11, placeId:11, title:"เสียงจากอดีตกาล", key:{emoji:"🎨",name:"พลังแห่งการเรียนรู้จากอดีต",desc:"ข้อความที่มนุษย์ยุคก่อนประวัติศาสตร์ฝากไว้"}, mg:"hidden",
    lines:[
      {who:"n",t:"จู่ ๆ กุญแจพลังทั้ง 10 ดอกเปล่งแสง เปิดประตูแห่งกาลเวลา!"},
      {who:"m",t:"ภารกิจยังไม่จบ ยังมีความลับที่เก่าแก่ยิ่งกว่าที่เคยเห็น"},
      {who:"n",t:"ทุกคนมาถึงหน้าผาเขาจันทร์งาม พบภาพเขียนสีแดงอายุกว่า 4,000 ปี"},
      {who:"m",t:"นี่คือเรื่องราวที่คนโบราณเล่าผ่านภาพ ค้นหาภาพคน สัตว์ และรอยมือให้ครบนะ"}
    ], mission:"ค้นหาภาพเขียนสีโบราณที่ซ่อนอยู่ให้ครบ" },

  { n:12, placeId:12, title:"มรดกแห่งอารยธรรม", key:{emoji:"🏛️",name:"พลังแห่งภูมิปัญญาบรรพชน",desc:"ภูมิปัญญาและศรัทธาของบรรพชน"}, mg:"simon",
    lines:[
      {who:"n",t:"ประตูแห่งกาลเวลาพาทุกคนมายังปราสาทเมืองแขก โนนกู่ และเมืองเก่า"},
      {who:"m",t:"ปราสาทเหล่านี้คือหลักฐานแห่งภูมิปัญญาและความศรัทธาของบรรพชน"},
      {who:"m",t:"จดจำลำดับสัญลักษณ์โบราณทั้งสามปราสาท แล้วกดตามให้ถูกนะ"}
    ], mission:"จดจำและกดตามลำดับสัญลักษณ์โบราณให้ถูก" }
];

(function () {
  const PROG_KEY = "yolada_story_v1";
  let done = new Set(JSON.parse(localStorage.getItem(PROG_KEY) || "[]"));
  const saveProg = () => localStorage.setItem(PROG_KEY, JSON.stringify([...done]));
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  let cur = null, typeIv = null;

  function screen(name) {
    ["storyMap", "storyScene", "storyGame", "storyKey", "storyEnd"].forEach(s => $(s).classList.toggle("hidden", s !== name));
  }
  const unlocked = n => n === 1 || done.has(n - 1);

  /* ---------- หน้าเลือกด่าน ---------- */
  function renderMap() {
    const nodes = STORY.map(s => {
      const ok = unlocked(s.n), fin = done.has(s.n);
      return `<button class="story-node ${ok ? "" : "locked"} ${fin ? "fin" : ""}" data-n="${s.n}" ${ok ? "" : "disabled"}>
        <span class="story-node-key">${fin ? s.key.emoji : ok ? s.n : "🔒"}</span>
        <span class="story-node-title">ด่าน ${s.n}<small>${esc(s.title)}</small></span>
        ${fin ? '<span class="story-node-check">✓</span>' : ""}
      </button>`;
    }).join("");
    $("storyMap").innerHTML = `
      <div class="story-map-head">
        <div id="storyMapMascot" class="story-map-mascot"></div>
        <h2 class="story-h">⚔️ โหมดผจญภัย — ตามรอยจีโอพาร์ค</h2>
        <p class="story-sub">เก็บกุญแจพลังให้ครบ 12 ดอกกับแม่หน่อยและผองเพื่อน</p>
        <div class="story-keys">${STORY.map(s => `<span class="story-keychip ${done.has(s.n) ? "got" : ""}" title="${esc(s.key.name)}">${done.has(s.n) ? s.key.emoji : "·"}</span>`).join("")}</div>
        <div class="story-progress-text">${done.size}/12 กุญแจ</div>
      </div>
      <div class="story-nodes">${nodes}</div>`;
    if (typeof mascotSVG === "function") $("storyMapMascot").innerHTML = mascotSVG(MAE_NOY, 90);
    $("storyMap").querySelectorAll(".story-node:not(.locked)").forEach(b => b.onclick = () => playLevel(+b.dataset.n));
  }

  /* ---------- เล่นด่าน: บทสนทนา ---------- */
  function playLevel(n) {
    cur = STORY.find(s => s.n === n);
    cur._line = 0;
    const p = (typeof PLACES !== "undefined") && PLACES.find(x => x.id === cur.placeId);
    $("storyBg").innerHTML = (p && typeof placeImage === "function") ? placeImage(p, "100%", "100%") : "";
    if (typeof mascotSVG === "function") $("storyMascot").innerHTML = mascotSVG(MAE_NOY, 130);
    screen("storyScene");
    showLine();
  }

  function showLine() {
    const ln = cur.lines[cur._line];
    const isM = ln.who === "m";
    $("storyMascot").style.opacity = isM ? "1" : ".55";
    $("storyWho").textContent = isM ? "แม่หน่อย" : "";
    $("storyWho").style.display = isM ? "inline-block" : "none";
    typeText(ln.t);
    const last = cur._line >= cur.lines.length - 1;
    $("storyNext").innerHTML = last ? "เริ่มภารกิจ ⚑" : "ถัดไป ▶";
  }
  function typeText(text) {
    clearInterval(typeIv);
    const el = $("storyText"); el.textContent = ""; let i = 0;
    typeIv = setInterval(() => { el.textContent = text.slice(0, ++i); if (i >= text.length) clearInterval(typeIv); }, 22);
    el.dataset.full = text;
  }
  function nextLine() {
    const el = $("storyText");
    if (el.textContent.length < (el.dataset.full || "").length) { clearInterval(typeIv); el.textContent = el.dataset.full; return; }
    if (cur._line >= cur.lines.length - 1) { startMission(); return; }
    cur._line++; showLine();
  }

  /* ---------- ภารกิจ (มินิเกม) ---------- */
  const GAMES = { flower: mgFlower, elephant: mgElephant, maze: mgMaze, memory: mgMemory, salt: mgSalt, breath: mgBreath, scratch: mgScratch, bell: mgBell, water: mgWater, wind: mgWind, hidden: mgHidden, simon: mgSimon };
  function startMission() {
    screen("storyGame");
    const stage = $("mgStage"); stage.innerHTML = "";
    (GAMES[cur.mg] || mgFlower)(stage, winLevel);
  }
  function winLevel() {
    done.add(cur.n); saveProg();
    $("storyKeyIcon").textContent = cur.key.emoji;
    $("storyKeyName").textContent = "ได้รับ: " + cur.key.name;
    $("storyKeyDesc").textContent = cur.key.desc;
    screen("storyKey");
    if (typeof fireConfetti === "function") fireConfetti(innerWidth / 2, innerHeight / 2, 90);
  }
  function afterKey() {
    if (done.size >= 12) { showEnd(); return; }
    renderMap(); screen("storyMap");
  }

  function showEnd() {
    $("storyEnd").innerHTML = `
      <div class="story-emblem">
        <div class="story-keys-orbit">${STORY.map((s, i) => `<span class="story-keychip got" style="--a:${i * 30}deg">${s.key.emoji}</span>`).join("")}</div>
        <div class="story-emblem-core">🏞️</div>
      </div>
      <h2 class="story-h">บทสรุปสุดท้าย — ผู้พิทักษ์โคราชจีโอพาร์ค</h2>
      <p class="story-sub">เมื่อรวบรวมพลังทั้ง 12 ด่านครบ กุญแจทุกดอกลอยขึ้นสู่ท้องฟ้า รวมเป็นสัญลักษณ์โคราชจีโอพาร์คขนาดใหญ่</p>

      <div class="story-end-say">
        <div class="story-end-mascot" id="storyEndMascot"></div>
        <div class="story-end-bubble">
          <strong>แม่หน่อย</strong>
          <p>“พวกเธอได้เรียนรู้แล้วว่า โคราชไม่ได้มีเพียงธรรมชาติอันงดงาม แต่ยังมีเรื่องราวตั้งแต่โลกดึกดำบรรพ์ มนุษย์ยุคแรก อารยธรรมโบราณ จนถึงพลังงานแห่งอนาคต”</p>
        </div>
      </div>

      <p class="story-vow">เด็ก ๆ ทั้ง 6 คนกล่าวพร้อมกัน:<br/>“พวกเราจะเป็นผู้พิทักษ์โคราชจีโอพาร์ค ช่วยกันอนุรักษ์ธรรมชาติ ประวัติศาสตร์ และวัฒนธรรมให้คงอยู่ตลอดไป”</p>

      <div class="story-medal">
        <div class="story-medal-disc">🛡️<span class="story-medal-shine"></span></div>
        <div class="story-medal-label">เหรียญตรา<br/><b>KORAT GEOPARK GUARDIAN</b><br/><small>รางวัลแห่งความภาคภูมิใจของนักผจญภัยทุกคน</small></div>
      </div>

      <button id="storyEndClose" class="btn-start">รับเหรียญตรา · เยี่ยมเลย!</button>`;
    screen("storyEnd");
    if (typeof mascotSVG === "function") $("storyEndMascot").innerHTML = mascotSVG(MAE_NOY, 96);
    $("storyEndClose").onclick = closeStory;
    let b = 0; const iv = setInterval(() => { if (typeof fireConfetti === "function") fireConfetti(Math.random() * innerWidth, innerHeight * .25, 80); if (++b > 7) clearInterval(iv); }, 320);
  }

  function openStory() { $("story").classList.remove("hidden"); renderMap(); screen("storyMap"); }
  function closeStory() { clearInterval(typeIv); $("story").classList.add("hidden"); }

  document.addEventListener("DOMContentLoaded", () => {
    $("openStoryBtn")?.addEventListener("click", openStory);
    $("openStoryBtnApp")?.addEventListener("click", openStory);
    $("storyClose")?.addEventListener("click", closeStory);
    $("storyNext")?.addEventListener("click", nextLine);
    $("storyKeyNext")?.addEventListener("click", afterKey);
  });

  /* ============================================================
     มินิเกม 12 แบบ — แต่ละฟังก์ชันเรียก done() เมื่อสำเร็จ
     ============================================================ */
  function head(title, instr) { return `<div class="mg-head"><h3>${esc(title)}</h3><p>${esc(instr)}</p></div>`; }
  function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  // 1) รับดอกไม้ถวาย
  function mgFlower(stage, done) {
    const target = 8; let got = 0, alive = true;
    stage.innerHTML = head("ถวายพวงมาลัย", "แตะดอกไม้ที่ร่วงลงมาให้ครบ " + target + " ดอก") +
      `<div class="mg-fallarea" id="fa"></div><div class="mg-status">เก็บได้ <b id="g">0</b>/${target}</div>`;
    const fa = stage.querySelector("#fa");
    (function spawn() {
      if (!alive) return;
      const f = el("button", "mg-fall", ["🌼", "🌸", "💐", "🏵️"][Math.floor(Math.random() * 4)]);
      f.style.left = (8 + Math.random() * 84) + "%";
      f.style.animationDuration = (2.4 + Math.random() * 1.6) + "s";
      f.addEventListener("animationend", () => f.remove());
      f.addEventListener("pointerdown", () => { if (!alive) return; got++; stage.querySelector("#g").textContent = got; f.remove(); if (got >= target) { alive = false; done(); } });
      fa.appendChild(f);
      setTimeout(spawn, 560 + Math.random() * 480);
    })();
  }

  // 2) หาช้างสี่งา
  function mgElephant(stage, done) {
    let round = 0, rounds = 3;
    (function next() {
      round++;
      if (round > rounds) return done();
      const n = 9, sp = Math.floor(Math.random() * n);
      stage.innerHTML = head("ตามหาช้างสี่งา", `รอบ ${round}/${rounds} — แตะช้างที่มีป้าย “4 งา”`) +
        `<div class="mg-grid g3">${Array.from({ length: n }, (_, i) =>
          `<button class="mg-cell" data-sp="${i === sp}">🐘${i === sp ? '<span class="mg-badge">4 งา</span>' : ""}</button>`).join("")}</div>`;
      stage.querySelectorAll(".mg-cell").forEach(b => b.onclick = () => {
        if (b.dataset.sp === "true") next(); else { b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 400); }
      });
    })();
  }

  // 3) เขาวงกตรากไทร
  function mgMaze(stage, done) {
    const M = ["S....#", "####.#", "#....#", "#.####", "#....#", "####.E"];
    let pr, pc, er, ec;
    M.forEach((row, r) => row.split("").forEach((ch, c) => { if (ch === "S") { pr = r; pc = c; } if (ch === "E") { er = r; ec = c; } }));
    stage.innerHTML = head("ลอดรากไทร", "พา 🧒 ไปยังทางออก 🚪") +
      `<div class="mg-maze" id="mz"></div>
       <div class="mg-dpad">
         <button data-d="up">▲</button>
         <div><button data-d="left">◀</button><button data-d="down">▼</button><button data-d="right">▶</button></div>
       </div>`;
    const draw = () => {
      $("mz").innerHTML = M.map((row, r) => `<div class="mg-mrow">` + row.split("").map((ch, c) =>
        `<span class="mg-mcell ${ch === "#" ? "wall" : ""}">${r === pr && c === pc ? "🧒" : (r === er && c === ec ? "🚪" : "")}</span>`).join("") + `</div>`).join("");
    };
    const move = d => {
      let nr = pr + (d === "down") - (d === "up"), nc = pc + (d === "right") - (d === "left");
      if (nr < 0 || nc < 0 || nr >= M.length || nc >= M[0].length || M[nr][nc] === "#") return;
      pr = nr; pc = nc; draw();
      if (pr === er && pc === ec) setTimeout(done, 250);
    };
    draw();
    stage.querySelectorAll(".mg-dpad button").forEach(b => b.onclick = () => move(b.dataset.d));
    const kh = e => { const k = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" }[e.key]; if (k) { e.preventDefault(); move(k); } };
    document.addEventListener("keydown", kh);
    stage._cleanup = () => document.removeEventListener("keydown", kh);
  }

  // 4) จับคู่ฟอสซิล
  function mgMemory(stage, done) {
    const syms = ["🦣", "🌳", "🐚", "🦴", "🍃", "🐘"];
    let deck = syms.concat(syms).sort(() => Math.random() - .5);
    let open = [], matched = 0, lock = false;
    stage.innerHTML = head("จับคู่ฟอสซิล", "เปิดการ์ดให้เจอคู่เหมือนกันจนครบ") +
      `<div class="mg-cards">${deck.map((s, i) => `<button class="mg-card" data-i="${i}" data-s="${s}"><span class="mg-card-in"><span class="mg-card-f">?</span><span class="mg-card-b">${s}</span></span></button>`).join("")}</div>`;
    stage.querySelectorAll(".mg-card").forEach(c => c.onclick = () => {
      if (lock || c.classList.contains("flip") || c.classList.contains("done")) return;
      c.classList.add("flip"); open.push(c);
      if (open.length === 2) {
        lock = true;
        if (open[0].dataset.s === open[1].dataset.s) {
          open.forEach(x => x.classList.add("done")); matched++; open = []; lock = false;
          if (matched === syms.length) setTimeout(done, 400);
        } else setTimeout(() => { open.forEach(x => x.classList.remove("flip")); open = []; lock = false; }, 750);
      }
    });
  }

  // 5) เก็บเกลือ
  function mgSalt(stage, done) {
    const target = 10; let got = 0, alive = true;
    stage.innerHTML = head("เก็บเกลือสินเธาว์", "แตะ 💎 เก็บเกลือ · อย่าแตะ 🪨") +
      `<div class="mg-grid g3 holes" id="hh">${Array.from({ length: 9 }, () => `<button class="mg-hole"></button>`).join("")}</div>
       <div class="mg-status">เก็บได้ <b id="g">0</b>/${target}</div>`;
    const holes = [...stage.querySelectorAll(".mg-hole")];
    holes.forEach(h => h.onclick = () => {
      if (!alive || !h.dataset.k) return;
      if (h.dataset.k === "salt") { got++; stage.querySelector("#g").textContent = got; h.classList.add("pop"); setTimeout(() => h.classList.remove("pop"), 200); if (got >= target) { alive = false; done(); } }
      else { got = Math.max(0, got - 1); stage.querySelector("#g").textContent = got; h.classList.add("bad"); setTimeout(() => h.classList.remove("bad"), 200); }
      h.textContent = ""; delete h.dataset.k;
    });
    (function tick() {
      if (!alive) return;
      const h = holes[Math.floor(Math.random() * holes.length)];
      if (!h.dataset.k) { const salt = Math.random() < .7; h.dataset.k = salt ? "salt" : "rock"; h.textContent = salt ? "💎" : "🪨"; setTimeout(() => { if (h.dataset.k) { h.textContent = ""; delete h.dataset.k; } }, 900); }
      setTimeout(tick, 520);
    })();
  }

  // 6) หายใจ (กดค้าง)
  function mgBreath(stage, done) {
    const need = 3; let count = 0, holding = false, t0 = 0, raf;
    stage.innerHTML = head("ฟังเสียงลม สูดหายใจ", "กดค้างที่วงกลมจนเต็ม แล้วปล่อย · ทำ 3 ครั้ง") +
      `<div class="mg-breath"><button id="bc" class="mg-breath-circle"><span id="bt">กดค้าง</span></button></div>
       <div class="mg-status">หายใจ <b id="g">0</b>/${need}</div>`;
    const c = stage.querySelector("#bc"), HOLD = 2400;
    const loop = () => { const p = Math.min(1, (performance.now() - t0) / HOLD); c.style.setProperty("--p", p); if (p >= 1) { c.classList.add("full"); stage.querySelector("#bt").textContent = "ปล่อยได้"; } if (holding) raf = requestAnimationFrame(loop); };
    const start = e => { e.preventDefault(); holding = true; t0 = performance.now(); c.classList.remove("full"); stage.querySelector("#bt").textContent = "สูด..."; loop(); };
    const end = () => {
      if (!holding) return; holding = false; cancelAnimationFrame(raf);
      const full = c.classList.contains("full"); c.classList.remove("full"); c.style.setProperty("--p", 0);
      if (full) { count++; stage.querySelector("#g").textContent = count; stage.querySelector("#bt").textContent = "กดค้าง"; if (count >= need) return done(); }
      else stage.querySelector("#bt").textContent = "กดค้าง";
    };
    c.addEventListener("pointerdown", start); c.addEventListener("pointerup", end); c.addEventListener("pointerleave", end);
  }

  // 7) ปัดฝุ่นพบพระนอน (scratch)
  function mgScratch(stage, done) {
    const p = (typeof PLACES !== "undefined") && PLACES.find(x => x.id === 6);
    stage.innerHTML = head("ปัดฝุ่นเผยพระนอน", "ลากนิ้ว/เมาส์ ปัดฝุ่นออกให้เห็นองค์พระ") +
      `<div class="mg-scratch"><div class="mg-scratch-img">${(p && typeof placeImage === "function") ? placeImage(p, "100%", "100%") : ""}</div><canvas id="sc"></canvas></div>
       <div class="mg-status">ปัดออก <b id="g">0</b>%</div>`;
    const cv = stage.querySelector("#sc"), box = stage.querySelector(".mg-scratch");
    const W = box.clientWidth || 320, H = box.clientHeight || 200; cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d"); ctx.fillStyle = "#b9a98f"; ctx.fillRect(0, 0, W, H);
    ctx.font = "20px Mali"; ctx.fillStyle = "#7a6b53"; ctx.textAlign = "center"; ctx.fillText("ฝุ่นกาลเวลา 1,300 ปี", W / 2, H / 2);
    let drawing = false, finished = false;
    const pos = e => { const r = cv.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; return [t.clientX - r.left, t.clientY - r.top]; };
    const scratch = e => { if (!drawing) return; const [x, y] = pos(e); ctx.globalCompositeOperation = "destination-out"; ctx.beginPath(); ctx.arc(x, y, 22, 0, 7); ctx.fill(); check(); };
    let lastCheck = 0;
    const check = () => {
      const now = performance.now(); if (now - lastCheck < 180 || finished) return; lastCheck = now;
      const d = ctx.getImageData(0, 0, W, H).data; let clear = 0; for (let i = 3; i < d.length; i += 4 * 40) if (d[i] === 0) clear++;
      const pct = Math.round(clear / (d.length / (4 * 40)) * 100); stage.querySelector("#g").textContent = pct;
      if (pct >= 55) { finished = true; cv.style.transition = "opacity .5s"; cv.style.opacity = "0"; setTimeout(done, 500); }
    };
    cv.addEventListener("pointerdown", e => { drawing = true; scratch(e); });
    cv.addEventListener("pointermove", scratch);
    window.addEventListener("pointerup", () => drawing = false);
  }

  // 8) ตีระฆัง (timing zone แนวนอน)
  function mgBell(stage, done) {
    const need = 3; let hits = 0, x = 0, dir = 1, raf;
    stage.innerHTML = head("ตีระฆังทำบุญ", "แตะตอนเครื่องหมายอยู่ในแถบเขียว 3 ครั้ง") +
      `<div class="mg-track"><div class="mg-zone"></div><div class="mg-marker" id="mk"></div></div>
       <button id="hit" class="mg-hitbtn">🔔 ตี!</button><div class="mg-status">ตีโดน <b id="g">0</b>/${need}</div>`;
    const mk = stage.querySelector("#mk");
    (function loop() { x += dir * 1.6; if (x >= 100 || x <= 0) dir *= -1; mk.style.left = x + "%"; raf = requestAnimationFrame(loop); })();
    stage._cleanup = () => cancelAnimationFrame(raf);
    stage.querySelector("#hit").onclick = () => {
      if (x >= 40 && x <= 60) { hits++; stage.querySelector("#g").textContent = hits; flash(stage, true); if (hits >= need) { cancelAnimationFrame(raf); done(); } }
      else flash(stage, false);
    };
  }

  // 9) ปล่อยน้ำให้พอดี (stop bar in band)
  function mgWater(stage, done) {
    const need = 3; let rounds = 0, v = 0, dir = 1, raf;
    stage.innerHTML = head("ปล่อยน้ำให้พอดี", "แตะหยุดระดับน้ำให้อยู่ในแถบเขียว 3 รอบ") +
      `<div class="mg-tank"><div class="mg-band"></div><div class="mg-water" id="wt"></div></div>
       <button id="stop" class="mg-hitbtn">หยุด!</button><div class="mg-status">สำเร็จ <b id="g">0</b>/${need}</div>`;
    const wt = stage.querySelector("#wt");
    (function loop() { v += dir * 1.4; if (v >= 100 || v <= 0) dir *= -1; wt.style.height = v + "%"; raf = requestAnimationFrame(loop); })();
    stage._cleanup = () => cancelAnimationFrame(raf);
    stage.querySelector("#stop").onclick = () => {
      if (v >= 55 && v <= 75) { rounds++; stage.querySelector("#g").textContent = rounds; flash(stage, true); if (rounds >= need) { cancelAnimationFrame(raf); done(); } }
      else flash(stage, false);
    };
  }

  // 10) ปั่นกังหัน (tap-spam meter)
  function mgWind(stage, done) {
    let power = 0, time = 9, finished = false, raf, iv;
    stage.innerHTML = head("ปั่นกังหันลม", "แตะรัว ๆ ให้พลังงานเต็มก่อนหมดเวลา!") +
      `<div class="mg-wind"><div class="mg-fan" id="fan">✳️</div></div>
       <button id="spin" class="mg-hitbtn big">⚡ แตะปั่น!</button>
       <div class="mg-meter"><div id="pm" class="mg-meter-fill"></div></div>
       <div class="mg-status">เวลา <b id="tm">${time}</b> วิ</div>`;
    const fan = stage.querySelector("#fan"), pm = stage.querySelector("#pm");
    let spin = 0;
    (function loop() { spin += 4 + power / 4; fan.style.transform = `rotate(${spin}deg)`; raf = requestAnimationFrame(loop); })();
    stage._cleanup = () => { cancelAnimationFrame(raf); clearInterval(iv); };
    stage.querySelector("#spin").onclick = () => { if (finished) return; power = Math.min(100, power + 6); pm.style.width = power + "%"; if (power >= 100) { finished = true; stage._cleanup(); done(); } };
    iv = setInterval(() => { if (finished) return; power = Math.max(0, power - 3); pm.style.width = power + "%"; time = time <= 1 ? 9 : time - 1; stage.querySelector("#tm").textContent = time; }, 1000);
  }

  // 11) ค้นหาภาพเขียนที่ซ่อน
  function mgHidden(stage, done) {
    const spots = [[18, 30], [40, 65], [62, 22], [78, 55], [30, 78]], icons = ["🧍", "🦌", "✋", "🐗", "🏹"];
    let found = 0;
    const p = (typeof PLACES !== "undefined") && PLACES.find(x => x.id === 11);
    stage.innerHTML = head("ค้นหาภาพเขียน 4,000 ปี", "แตะหาภาพคน สัตว์ และรอยมือที่ซ่อนอยู่ให้ครบ") +
      `<div class="mg-hidden"><div class="mg-hidden-bg">${(p && typeof placeImage === "function") ? placeImage(p, "100%", "100%") : ""}</div>
       ${spots.map((s, i) => `<button class="mg-spot" style="left:${s[0]}%;top:${s[1]}%">${icons[i]}</button>`).join("")}</div>
       <div class="mg-status">พบแล้ว <b id="g">0</b>/${spots.length}</div>`;
    stage.querySelectorAll(".mg-spot").forEach(b => b.onclick = () => {
      if (b.classList.contains("got")) return; b.classList.add("got"); found++; stage.querySelector("#g").textContent = found;
      if (found >= spots.length) setTimeout(done, 350);
    });
  }

  // 12) จำลำดับสัญลักษณ์ (Simon)
  function mgSimon(stage, done) {
    const pads = ["▲", "●", "■", "◆"], colors = ["#EF4444", "#0EA5E9", "#16A34A", "#F59E0B"];
    const goal = 5; let seq = [], step = 0, playing = false;
    stage.innerHTML = head("รหัสสัญลักษณ์ปราสาท", "ดูลำดับที่กะพริบ แล้วกดตามให้ถูก (ยาวขึ้นเรื่อย ๆ)") +
      `<div class="mg-simon">${pads.map((p, i) => `<button class="mg-pad" data-i="${i}" style="--pc:${colors[i]}">${p}</button>`).join("")}</div>
       <div class="mg-status" id="ss">ลำดับยาว <b>0</b>/${goal}</div>`;
    const padEls = [...stage.querySelectorAll(".mg-pad")];
    const lit = i => { padEls[i].classList.add("lit"); setTimeout(() => padEls[i].classList.remove("lit"), 360); };
    const play = () => { playing = true; let k = 0; const iv = setInterval(() => { lit(seq[k]); if (++k >= seq.length) { clearInterval(iv); playing = false; } }, 620); };
    const grow = () => { seq.push(Math.floor(Math.random() * 4)); step = 0; stage.querySelector("#ss").innerHTML = `ลำดับยาว <b>${seq.length}</b>/${goal}`; setTimeout(play, 500); };
    padEls.forEach(b => b.onclick = () => {
      if (playing) return; const i = +b.dataset.i; lit(i);
      if (i === seq[step]) { step++; if (step >= seq.length) { if (seq.length >= goal) return done(); grow(); } }
      else { flash(stage, false); step = 0; setTimeout(play, 600); }
    });
    grow();
  }

  function flash(stage, ok) { stage.classList.add(ok ? "mg-ok" : "mg-no"); setTimeout(() => stage.classList.remove("mg-ok", "mg-no"), 220); }

  // cleanup เมื่อเปลี่ยนหน้าจอ (หยุด requestAnimationFrame ของบางเกม)
  const _screen = screen;
  screen = function (name) { const st = $("mgStage"); if (st && st._cleanup) { st._cleanup(); st._cleanup = null; } _screen(name); };
})();
