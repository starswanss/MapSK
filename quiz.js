/* ============================================================
   quiz.js — เกมทดสอบความรู้ + ระบบจัดอันดับ
   • 12 หัวข้อ หัวข้อละ 3 ข้อ → สุ่มหัวข้อละ 1 ข้อ = 12 คำถาม/รอบ
   • เก็บคะแนน + เวลา (คะแนนเท่ากันตัดสินที่เวลาน้อยกว่า)
   • อันดับใส่แค่ชื่อ ไม่ต้องล็อกอิน
     - มี Supabase  → เก็บ leaderboard.json บนคลาวด์ (ทุกคนเห็นร่วมกัน)
     - ไม่มี        → เก็บใน localStorage (เฉพาะเครื่อง)
   ============================================================ */

const QUIZ = [
  { topic: "อนุสาวรีย์ท้าวสุรนารี", place: "อ.เมือง", questions: [
    { q: 'วรรคที่ว่า "กู้บ้านคู่พารา ที่ทุ่งสัมฤทธิ์พิชิตชัย" สื่อถึงวีรกรรมของบุคคลสำคัญท่านใด?',
      choices: ["ท้าวสุรนารี (ย่าโม)", "นางสาวบุญเหลือ", "พระยาปลัดเมือง", "เจ้าพระยานครราชสีมา"], answer: 0 },
    { q: 'ในวรรคสุดท้าย คำว่า "ชัชวาล" สื่อถึงสิ่งใดในเมืองโคราช?',
      choices: ["ความร่ำรวยเงินทอง", "ความรุ่งเรืองและสว่างไสว", "ความสามัคคีของคนในเมือง", "ความยิ่งใหญ่ของสิ่งก่อสร้าง"], answer: 1 },
    { q: 'ใจความสำคัญของกลอนบทสุดท้าย (ผัดหมี่/ผ้าไหม) ต้องการสื่อถึงเรื่องใด?',
      choices: ["การทำอาหาร", "การแต่งกาย", "ของดีเมืองโคราช", "การค้าขาย"], answer: 2 }
  ]},
  { topic: "พิพิธภัณฑ์โครงกระดูกซากช้างโบราณ", place: "อ.เฉลิมพระเกียรติ", questions: [
    { q: 'คำประพันธ์ในข้อใดมีการเลือกใช้ "สัมผัสสระ" ภายในวรรคเพื่อเพิ่มความไพเราะตามหลักการแต่งคำประพันธ์ไทย?',
      choices: ["เฉลิมพระเกียรติ", "แหล่งธรรมชาติ", "รากไทรย้อยระย้า", "ร่มเงาตระการ"], answer: 2 },
    { q: 'จากบทกลอนสี่ "ไทรงามท่าช้าง" มีอายุยาวนานสืบทอดคู่บ้านคู่เมืองมาประมาณกี่ปี?',
      choices: ["ร้อยกว่าปี", "สองร้อยกว่าปี", "สามร้อยกว่าปี", "ห้าร้อยกว่าปี"], answer: 1 },
    { q: 'วรรคที่ว่า "รากไทรย้อยระย้า พันผูกหนาแน่น" กวีต้องการสื่อถึงจินตภาพและความรู้สึกในเรื่องใดเด่นชัดที่สุด?',
      choices: ["ความสับสนวุ่นวายของคนในสังคม", "ความทรุดโทรมและการเวลาที่ผ่านไป", "ความผูกพัน ความสามัคคี และความมั่นคงแข็งแรง", "ความลึกลับน่ากลัวของผืนป่าโบราณ"], answer: 2 }
  ]},
  { topic: "ไทรงามท่าช้าง", place: "อ.เฉลิมพระเกียรติ", questions: [
    { q: 'ข้อใดคือจุดเด่นสำคัญของซากดึกดำบรรพ์ที่ถูกกล่าวถึงในบทประพันธ์?',
      choices: ["เป็นซากไดโนเสาร์สายพันธุ์ใหม่", "เป็นโครงกระดูกช้างสี่งาที่มีความสำคัญระดับโลก", "เป็นเครื่องปั้นดินเผาสมัยโบราณ", "เป็นภาพเขียนสีประวัติศาสตร์บนผนังถ้ำ"], answer: 1 },
    { q: 'คำว่า "อนันต์" ในวรรค "ซากฟอสซิลนั้น อนันต์ค่าเหลือ" มีความหมายตรงกับข้อใด?',
      choices: ["มีค่าน้อยมากจนหาไม่เจอ", "มีค่าคงที่ไม่มีวันเปลี่ยนแปลง", "มีค่ามากมายมหาศาลจนนับไม่ได้", "มีค่าเท่ากับทองคำ"], answer: 2 },
    { q: 'วัตถุประสงค์หลักของการจัดตั้ง "พิพิธภัณฑ์ยิ่งใหญ่" ตามที่ระบุในบทกลอนคืออะไร?',
      choices: ["เพื่อจัดแสดงและสืบสานเรื่องราวความหลากหลายของสายพันธุ์ช้างโบราณ", "เพื่อใช้เป็นสถานที่จัดกิจกรรมรื่นเริงของเมืองโคราช", "เพื่อจำหน่ายของที่ระลึกที่ทำจากฟอสซิล", "เพื่อใช้เป็นที่อยู่อาศัยของช้างในปัจจุบัน"], answer: 0 }
  ]},
  { topic: "พิพิธภัณฑ์ไม้กลายเป็นหิน", place: "อ.เมือง", questions: [
    { q: "'ฟอสซิลไม้กลายเป็นหิน' ที่พิพิธภัณฑ์แห่งนี้ยังมีการจัดแสดงฟอสซิลดึกดำบรรพ์เด่น ๆ อะไรอีกที่ค้นพบในโคราช?",
      choices: ["ฟอสซิลมนุษย์โบราณ", "ฟอสซิลใบไม้และแมลงโบราณ", "ฟอสซิลไดโนเสาร์และช้างดึกดำบรรพ์", "ฟอสซิลแอมโมไนต์ (หอยงวงช้างโบราณ)"], answer: 2 },
    { q: "ในทางฉันทลักษณ์ 'กาพย์ยานี 11' มีการกำหนดจำนวนคำในแต่ละบาท (บรรทัด) อย่างไร?",
      choices: ["วรรคหน้า 5 คำ วรรคหลัง 5 คำ", "วรรคหน้า 5 คำ วรรคหลัง 6 คำ", "วรรคหน้า 6 คำ วรรคหลัง 5 คำ", "วรรคหน้า 6 คำ วรรคหลัง 6 คำ"], answer: 1 },
    { q: 'คำว่า "ธานี" และ "กรุงไกร" มีความหมายตรงกับคำในข้อใดที่เข้าใจได้ง่ายที่สุด?',
      choices: ["ป่าไม้", "ภูเขา", "เมือง", "แม่น้ำ"], answer: 2 }
  ]},
  { topic: "เดิ่นเกลือ เกลือสินเธาว์", place: "อ.ขามทะเลสอ", questions: [
    { q: 'จากบทกลอน ผู้ประพันธ์เปรียบเทียบความแวววับของเกลือว่าเหมือนกับสิ่งใด?',
      choices: ["ประกายดาว", "แสงเทียน", "ระยับเพชร", "แก้วเจียระไน"], answer: 2 },
    { q: 'บทประพันธ์วรรคใดที่บอกถึง "ลักษณะภายนอก" ของแตงโมน้ำขามได้อย่างชัดเจนที่สุด?',
      choices: ["สุกะแดง แสงวิไล", "รสหวานฉ่ำล้ำ อัญมณีสีชาด", "ขามไทย และถิ่นไท", "ผิวเขียว เปลือกหนาแน่น"], answer: 3 },
    { q: 'คำว่า "ถิ่นขาม" ในบทประพันธ์นี้ หมายถึงพื้นที่ในอำเภอใดของจังหวัดโคราช?',
      choices: ["อำเภอเมือง", "อำเภอพิมาย", "อำเภอปากช่อง", "อำเภอขามทะเลสอ"], answer: 3 }
  ]},
  { topic: "วัดพระนอน 1,300 ปี", place: "อ.สูงเนิน", questions: [
    { q: 'พระนอนศิลาและธรรมจักร ณ วัดธรรมจักรเสมาราม มีความเก่าแก่สืบทอดมาแล้วประมาณกี่ศตวรรษ?',
      choices: ["3 ศตวรรษ", "10 ศตวรรษ", "13 ศตวรรษ", "30 ศตวรรษ"], answer: 2 },
    { q: 'วรรคใดมีการใช้ "สัมผัสอักษร (สัมผัสพยัญชนะ)" ภายในวรรคเพื่อเพิ่มความไพเราะโดดเด่นที่สุด?',
      choices: ["ศิลาไสยาสน์เลื่องลือ", "อำไพผางผายศรี", "เรื่องราวค่าไม่เลือนหาย", "ลมพัดผ่านตามคลอง"], answer: 1 },
    { q: 'คำว่า "กรุบกรอบทุกคำหา" สื่อถึงสิ่งใด?',
      choices: ["รสชาติเปรี้ยว", "กลิ่นหอม", "สีสันสวยงาม", "เนื้อสัมผัสของอาหาร"], answer: 3 }
  ]},
  { topic: "วัดหลวงพ่อโต", place: "อ.สีคิ้ว", questions: [
    { q: 'จากบทประพันธ์ คำศัพท์ในข้อใดมีความหมายสื่อถึง "เพื่อน หรือ กลุ่มเพื่อน" ครบทุกคำ?',
      choices: ["อาราม, มวลมิตร", "มวลมิตร, มิ่งมิตร, เกลอ", "มิ่งมิตร, อักโข, เกลอ", "สุขบทวี, มวลมิตร, เกลอ"], answer: 1 },
    { q: 'คำว่า "สืบสาน" ในบทประพันธ์มีความหมายว่าอะไร?',
      choices: ["ลืมเลือน", "ทำลาย", "รักษาและส่งต่อ", "เปลี่ยนแปลง"], answer: 2 },
    { q: 'คำว่า "กรุบกรอบทุกคำหา" สื่อถึงสิ่งใด?',
      choices: ["รสชาติเปรี้ยว", "กลิ่นหอม", "สีสันสวยงาม", "เนื้อสัมผัสของอาหาร"], answer: 3 }
  ]},
  { topic: "วัดป่าภูผาสูง", place: "อ.สูงเนิน", questions: [
    { q: 'จากบทกลอน มีการเลือกใช้คำในข้อใดที่มีความหมายแปลว่า "ป่า หรือ ป่าไม้" ครบทุกคำ?',
      choices: ["พฤกษ์, พนา", "พนา, ภูผา", "พฤกษ์, ภูผา", "สันติ, พนา"], answer: 0 },
    { q: 'วรรค "ครั้นถึงยอดภูผาที่สงบ ดุจได้พบสันติสิ้นความหยาบ" ใช้โวหารภาพพจน์ประเภทใด?',
      choices: ["อุปลักษณ์ (เปรียบเป็น)", "อุปมา (เปรียบเหมือน)", "สัทพจน์ (เลียนเสียงธรรมชาติ)", "บุคคลวัต (บุคคลสมมติ)"], answer: 1 },
    { q: 'จากวรรค "น้อมจิตกราบพระปฏิมา" คำว่า "พระปฏิมา" หมายถึงสิ่งใด?',
      choices: ["พระพุทธรูป", "พระสงฆ์ผู้ใหญ่", "รูปวาดธรรมชาติ", "เจดีย์สีขาว"], answer: 0 }
  ]},
  { topic: "เขื่อนลำตะคอง", place: "อ.สีคิ้ว", questions: [
    { q: 'จากบทประพันธ์ มีการใช้คำศัพท์ในข้อใดที่มีความหมายแปลว่า "น้ำ หรือ สายน้ำ" ครบทุกคำ?',
      choices: ["สายธาร, ลุ่มน้ำ, วารี", "ถิ่นฐาน, ลุ่มน้ำ, เขตคาม", "สายธาร, ชีวา, วารี", "ลำน้ำ, วารี, เขตคาม"], answer: 0 },
    { q: 'วรรค "ไหลผ่านหลายถิ่นฐาน ชุบชีวิตทุกชีวา" ใช้โวหารภาพพจน์เด่นชัดในลักษณะใด?',
      choices: ["อุปมา (เปรียบสิ่งหนึ่งเหมือนสิ่งหนึ่ง)", "อุปลักษณ์ (เปรียบสายน้ำเป็นผู้ให้ชีวิต)", "สัทพจน์ (เลียนเสียงธรรมชาติของน้ำ)", "อติพจน์ (กล่าวเกินจริง)"], answer: 1 },
    { q: 'คำว่า "ร่วมจิตไม่คิดทำลาย" ผู้แต่งต้องการปลูกฝังคุณธรรมข้อใด?',
      choices: ["ความซื่อสัตย์สุจริต", "ความเพียรพยายาม", "จิตสำนึกสาธารณะในการอนุรักษ์", "ความกตัญญูกตเวทิตา"], answer: 2 }
  ]},
  { topic: "กังหันลมเขายายเที่ยง", place: "อ.สีคิ้ว", questions: [
    { q: 'สิ่งใดบนเขายายเที่ยงที่บทประพันธ์ระบุว่าช่วย "ปั่นไฟ" และเป็นพลังงานสะอาด?',
      choices: ["เขื่อนวารี", "กังหันลมยักษ์ใหญ่", "แสงอาทิตย์บนภูผา", "สายลมพัดโบกโบย"], answer: 1 },
    { q: 'กิจกรรมใดที่บทประพันธ์กล่าวว่าทำให้ "สบายจิตชื่นอุรา" เมื่อมาเยือนสถานที่นี้?',
      choices: ["การเดินป่าชมวิว", "การเล่นน้ำในอ่างน้ำ", "การปั่นรถเที่ยวรับลมเย็น", "การนั่งชมกังหันลม"], answer: 2 },
    { q: 'คำว่า "ร่วมจิตไม่คิดทำลาย" ผู้แต่งต้องการปลูกฝังคุณธรรมข้อใด?',
      choices: ["ความซื่อสัตย์สุจริต", "ความเพียรพยายาม", "จิตสำนึกสาธารณะในการอนุรักษ์", "ความกตัญญูกตเวทิตา"], answer: 2 }
  ]},
  { topic: "ภาพเขียน 4,000 ปี", place: "อ.สีคิ้ว", questions: [
    { q: 'จากบทประพันธ์ "รอยสีชาดแต้มกาล" หมายถึงสิ่งใด?',
      choices: ["ศิลาจารึกโบราณ", "ภาพเขียนสีบนผนังหิน", "พระพุทธรูปสมัยทวารวดี", "เครื่องปั้นดินเผาโบราณ"], answer: 1 },
    { q: 'ภาพเขียนสีที่กล่าวถึงในบทประพันธ์สะท้อนวิถีชีวิตด้านใดของมนุษย์ยุคก่อนประวัติศาสตร์?',
      choices: ["การค้าขายแลกเปลี่ยนสินค้า", "การสร้างปราสาทหิน", "การล่าสัตว์และการดำรงชีวิต", "การเดินเรือข้ามทะเล"], answer: 2 },
    { q: 'ข้อความ "สื่อศรัทธาจินต์สร้างสรรค์ คู่เขตคันสีคิ้วเอย" สื่อคุณค่าด้านใดมากที่สุด?',
      choices: ["คุณค่าทางเศรษฐกิจ", "คุณค่าทางศิลปะและวัฒนธรรม", "คุณค่าทางการเมือง", "คุณค่าทางการทหาร"], answer: 1 }
  ]},
  { topic: "ปราสาทเมืองแขก โนนกู่ เมืองเก่า", place: "อ.สูงเนิน", questions: [
    { q: 'โบราณสถานทั้งสามแห่งที่กล่าวถึงในบทประพันธ์ตั้งอยู่ในอำเภอใด?',
      choices: ["ปากช่อง", "สีคิ้ว", "สูงเนิน", "ขามทะเลสอ"], answer: 2 },
    { q: 'บทประพันธ์ยกย่องสิ่งใดของผู้คนในอดีตที่สร้างปราสาทเหล่านี้ไว้?',
      choices: ["ความสามารถด้านการเกษตร", "ฝีมือช่างและศิลปกรรมโบราณ", "ความสามารถด้านการเดินเรือ", "ความสามารถด้านการค้า"], answer: 1 },
    { q: 'ข้อความ "ควรร่วมรักษาอย่าเลือนลาย" ผู้แต่งต้องการปลูกฝังคุณธรรมข้อใด?',
      choices: ["ความมีวินัย", "ความกตัญญู", "จิตสำนึกในการอนุรักษ์มรดกวัฒนธรรม", "ความเสียสละ"], answer: 2 }
  ]}
];

(function () {
  const C = window.CONFIG || {};
  const SUPA = {
    url: (C.SUPABASE_URL || "").trim().replace(/\/$/, ""),
    key: (C.SUPABASE_ANON_KEY || "").trim(),
    bucket: (C.SUPABASE_BUCKET || "places").trim()
  };
  const CLOUD = !!(SUPA.url && SUPA.key);
  const LB_FILE = "leaderboard.json";
  const LB_LS = "yolada_leaderboard_v1";

  let session = null, timerIv = null;

  const $ = id => document.getElementById(id);
  const fmtTime = ms => { const s = Math.floor(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };
  const esc = s => String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* ---------- leaderboard storage ---------- */
  let supaClient = null;
  function loadSupaLib() { return new Promise((res, rej) => { if (window.supabase) return res(); const s = document.createElement("script"); s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"; s.onload = res; s.onerror = () => rej(new Error("โหลด Supabase ไม่สำเร็จ")); document.head.appendChild(s); }); }
  async function getSupa() { if (supaClient) return supaClient; await loadSupaLib(); supaClient = window.supabase.createClient(SUPA.url, SUPA.key); return supaClient; }

  async function lbRead() {
    if (CLOUD) {
      try { const r = await fetch(`${SUPA.url}/storage/v1/object/public/${SUPA.bucket}/${LB_FILE}?t=` + Date.now(), { cache: "no-store" }); if (r.ok) return (await r.json()) || []; } catch (e) {}
      return [];
    }
    try { return JSON.parse(localStorage.getItem(LB_LS) || "[]"); } catch (e) { return []; }
  }
  async function lbWrite(list) {
    if (CLOUD) {
      const supa = await getSupa();
      const { error } = await supa.storage.from(SUPA.bucket)
        .upload(LB_FILE, new Blob([JSON.stringify(list)], { type: "application/json" }), { upsert: true, contentType: "application/json", cacheControl: "0" });
      if (error) throw error;
    } else { localStorage.setItem(LB_LS, JSON.stringify(list)); }
  }
  const cmpScore = (a, b) => (b.score - a.score) || (a.time - b.time) || (a.date - b.date);
  async function saveScore(entry) {
    const list = await lbRead();
    list.push(entry); list.sort(cmpScore);
    const top = list.slice(0, 100);
    await lbWrite(top);
    return top;
  }

  /* ---------- เริ่มเล่น ---------- */
  function buildSession() {
    // สุ่มหัวข้อละ 1 ข้อ แล้วสลับลำดับหัวข้อ
    const items = QUIZ.map(t => {
      const q = t.questions[Math.floor(Math.random() * t.questions.length)];
      return { topic: t.topic, place: t.place, q: q.q, choices: q.choices, answer: q.answer };
    });
    shuffle(items);
    return { items, idx: 0, score: 0, start: Date.now(), locked: false };
  }

  function showScreen(name) {
    ["quizIntro", "quizPlay", "quizResult", "quizLb"].forEach(s => $(s).classList.toggle("hidden", s !== name));
  }

  function startQuiz() {
    session = buildSession();
    showScreen("quizPlay");
    startTimer();
    renderQuestion();
  }

  function startTimer() {
    clearInterval(timerIv);
    timerIv = setInterval(() => { if (session) $("quizTimer").textContent = "⏱ " + fmtTime(Date.now() - session.start); }, 250);
  }

  function renderQuestion() {
    const it = session.items[session.idx];
    session.locked = false;
    const n = session.idx + 1, total = session.items.length;
    $("quizProgress").textContent = `ข้อ ${n}/${total}`;
    $("quizBar").style.width = (n / total * 100) + "%";
    $("quizTopic").innerHTML = `<span class="quiz-topic-no">${n}</span> ${esc(it.topic)} <small>${esc(it.place)}</small>`;
    $("quizQ").textContent = it.q;
    $("quizChoices").innerHTML = it.choices.map((c, i) =>
      `<button class="quiz-choice" data-i="${i}"><span class="quiz-choice-key">${["ก", "ข", "ค", "ง"][i]}</span>${esc(c)}</button>`).join("");
  }

  function answer(i) {
    if (session.locked) return;
    session.locked = true;
    const it = session.items[session.idx];
    const correct = it.answer;
    const btns = $("quizChoices").querySelectorAll(".quiz-choice");
    btns.forEach(b => {
      const bi = +b.dataset.i;
      if (bi === correct) b.classList.add("correct");
      else if (bi === i) b.classList.add("wrong");
      b.disabled = true;
    });
    if (i === correct) session.score++;
    setTimeout(() => {
      session.idx++;
      if (session.idx >= session.items.length) finish();
      else renderQuestion();
    }, 850);
  }

  function finish() {
    clearInterval(timerIv);
    session.duration = Date.now() - session.start;
    const total = session.items.length;
    showScreen("quizResult");
    const pct = session.score / total;
    const emo = pct === 1 ? "🏆" : pct >= 0.7 ? "🎉" : pct >= 0.5 ? "😊" : "💪";
    $("quizScoreText").textContent = `${emo} ได้ ${session.score}/${total} คะแนน`;
    $("quizTimeText").textContent = `ใช้เวลา ${fmtTime(session.duration)} นาที`;
    $("quizName").value = "";
    $("quizSaveMsg").textContent = "";
    $("quizSave").disabled = false;
  }

  async function doSave() {
    const name = ($("quizName").value || "").trim().slice(0, 24) || "ไม่ระบุชื่อ";
    const entry = { name, score: session.score, time: session.duration, total: session.items.length, date: Date.now() };
    $("quizSave").disabled = true;
    $("quizSaveMsg").textContent = "กำลังบันทึก…";
    try {
      const top = await saveScore(entry);
      $("quizSaveMsg").textContent = "บันทึกแล้ว ✓";
      renderLeaderboard(top, entry);
      showScreen("quizLb");
    } catch (e) {
      console.warn(e);
      $("quizSaveMsg").textContent = "บันทึกไม่สำเร็จ: " + (e.message || e);
      $("quizSave").disabled = false;
    }
  }

  async function openLeaderboard() {
    renderLeaderboard(await lbRead(), null);
    showScreen("quizLb");
  }

  function renderLeaderboard(list, mine) {
    const el = $("quizLbList");
    if (!list.length) { el.innerHTML = `<p class="quiz-lb-empty">ยังไม่มีคะแนน — เป็นคนแรกเลย!</p>`; return; }
    const medal = ["🥇", "🥈", "🥉"];
    el.innerHTML = list.map((e, i) => {
      const isMine = mine && e.date === mine.date && e.name === mine.name;
      return `<div class="quiz-lb-row${isMine ? " me" : ""}">
        <span class="quiz-lb-rank">${medal[i] || (i + 1)}</span>
        <span class="quiz-lb-name">${esc(e.name)}</span>
        <span class="quiz-lb-score">${e.score}/${e.total || 12}</span>
        <span class="quiz-lb-time">⏱ ${fmtTime(e.time)}</span>
      </div>`;
    }).join("");
  }

  function openQuiz() {
    $("quiz").classList.remove("hidden");
    showScreen("quizIntro");
    const mEl = $("quizMascot");
    if (mEl && typeof mascotSVG === "function" && typeof CHARACTERS !== "undefined") mEl.innerHTML = mascotSVG(CHARACTERS.yolada, 120);
    $("quizModeNote").textContent = CLOUD ? "🌐 อันดับออนไลน์ · ทุกคนเห็นร่วมกัน" : "💾 อันดับเก็บในเครื่องนี้";
  }
  function closeQuiz() { clearInterval(timerIv); $("quiz").classList.add("hidden"); }

  document.addEventListener("DOMContentLoaded", () => {
    $("openQuizBtn")?.addEventListener("click", openQuiz);
    $("openQuizBtnApp")?.addEventListener("click", openQuiz);
    $("quizClose")?.addEventListener("click", closeQuiz);
    $("quizStart")?.addEventListener("click", startQuiz);
    $("quizShowLb")?.addEventListener("click", openLeaderboard);
    $("quizRetry")?.addEventListener("click", startQuiz);
    $("quizSave")?.addEventListener("click", doSave);
    $("quizLbBack")?.addEventListener("click", startQuiz);
    $("quizLbClose")?.addEventListener("click", closeQuiz);
    $("quizChoices")?.addEventListener("click", e => { const b = e.target.closest(".quiz-choice"); if (b) answer(+b.dataset.i); });
  });
})();
