/* ============================================================
   admin.js — จัดการ "รูปสถานที่" + "เสียงบทประพันธ์"
   2 โหมด เลือกอัตโนมัติจาก config.js:
   • โหมดออนไลน์ (Supabase) — อัปโหลดบนเว็บจริง หลายคนใช้ร่วมกัน
   • โหมดในเครื่อง (File System Access) — เซฟลงโฟลเดอร์ images/
   ============================================================ */
(function () {
  const C = window.CONFIG || {};
  const SUPA = {
    url: (C.SUPABASE_URL || "").trim().replace(/\/$/, ""),
    key: (C.SUPABASE_ANON_KEY || "").trim(),
    bucket: (C.SUPABASE_BUCKET || "places").trim()
  };
  const CLOUD = !!(SUPA.url && SUPA.key);
  const FS_OK = ("showDirectoryPicker" in window);

  const MAX_W = C.PHOTO_MAX_WIDTH || 1280;
  const JPEG_Q = C.PHOTO_JPEG_QUALITY || 0.82;
  const AUDIO_MAX_MB = 20;
  const PASSCODE = (C.ADMIN_PASSCODE || "").trim();
  const LS_MIRROR = "yolada_manifests_v2";

  // นิยามชนิดไฟล์ 3 แบบ
  const KINDS = {
    image: { manifestFile: "manifest.json",     listId: "adminList" },
    audio: { manifestFile: "audio.json",        listId: "adminAudioList" },
    char:  { manifestFile: "characters.json",   listId: "adminCharList" }
  };
  let manifests = { image: {}, audio: {}, char: {} };   // { kind: { key: {file,t} } }
  let unlocked = !PASSCODE;
  let curTab = "image";

  const pad = n => String(n).padStart(2, "0");
  const slug = k => String(k).replace(/\./g, "-");
  const imageName = id => `place-${pad(id)}.jpg`;
  const audioName = (key, ext) => `audio-${slug(key)}.${ext || "mp3"}`;
  const charName = key => `char-${slug(key)}.jpg`;

  /* ===================== backend (cloud / local) ===================== */
  let supa = null, dirHandle = null;

  function loadSupabaseLib() {
    return new Promise((res, rej) => {
      if (window.supabase) return res();
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      s.onload = res; s.onerror = () => rej(new Error("โหลดไลบรารี Supabase ไม่สำเร็จ"));
      document.head.appendChild(s);
    });
  }
  function publicUrl(file, t) {
    if (CLOUD) return `${SUPA.url}/storage/v1/object/public/${SUPA.bucket}/${file}?t=${t || 0}`;
    return `images/${file}?t=${t || 0}`;
  }

  // IndexedDB (โหมดในเครื่อง)
  function idb() { return new Promise((res, rej) => { const r = indexedDB.open("yolada-fs", 1); r.onupgradeneeded = () => r.result.createObjectStore("h"); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); }
  async function idbSet(k, v) { const db = await idb(); return new Promise((res, rej) => { const t = db.transaction("h", "readwrite"); t.objectStore("h").put(v, k); t.oncomplete = res; t.onerror = () => rej(t.error); }); }
  async function idbGet(k) { const db = await idb(); return new Promise((res, rej) => { const t = db.transaction("h", "readonly"); const rq = t.objectStore("h").get(k); rq.onsuccess = () => res(rq.result); rq.onerror = () => rej(rq.error); }); }
  async function ensurePerm(h) { const o = { mode: "readwrite" }; if ((await h.queryPermission(o)) === "granted") return true; return (await h.requestPermission(o)) === "granted"; }
  async function localWrite(name, blob) { const fh = await dirHandle.getFileHandle(name, { create: true }); const w = await fh.createWritable(); await w.write(blob); await w.close(); }

  async function backendSaveFile(name, blob, contentType) {
    if (CLOUD) {
      const { error } = await supa.storage.from(SUPA.bucket)
        .upload(name, blob, { upsert: true, contentType, cacheControl: "3600" });
      if (error) throw error;
    } else {
      if (!dirHandle && !(await connectLocalFolder())) throw new Error("ยังไม่ได้เชื่อมต่อโฟลเดอร์");
      await localWrite(name, blob);
    }
  }
  async function backendRemoveFile(name) {
    if (CLOUD) { await supa.storage.from(SUPA.bucket).remove([name]); }
    else if (dirHandle) { try { await dirHandle.removeEntry(name); } catch (_) {} }
  }
  async function backendSaveManifest(kind) {
    const json = JSON.stringify(manifests[kind], null, 2);
    const file = KINDS[kind].manifestFile;
    if (CLOUD) {
      const { error } = await supa.storage.from(SUPA.bucket)
        .upload(file, new Blob([json], { type: "application/json" }), { upsert: true, contentType: "application/json", cacheControl: "0" });
      if (error) throw error;
    } else if (dirHandle) {
      await localWrite(file, new Blob([json], { type: "application/json" }));
    }
    try { localStorage.setItem(LS_MIRROR, JSON.stringify(manifests)); } catch (e) {}
  }
  async function backendLoadManifest(kind) {
    const file = KINDS[kind].manifestFile;
    if (CLOUD) {
      try { const r = await fetch(publicUrl(file, Date.now()), { cache: "no-store" }); if (r.ok) manifests[kind] = (await r.json()) || {}; } catch (e) {}
    } else {
      let ok = false;
      try { const r = await fetch(`images/${file}?t=` + Date.now()); if (r.ok) { const m = await r.json(); if (m && Object.keys(m).length) { manifests[kind] = m; ok = true; } } } catch (e) {}
      if (!ok) { try { const all = JSON.parse(localStorage.getItem(LS_MIRROR) || "{}"); if (all[kind]) manifests[kind] = all[kind]; } catch (e) {} }
    }
  }

  /* ===================== ผูกค่าเข้ากับข้อมูล ===================== */
  function applyEntry(kind, key) {
    const e = manifests[kind][key];
    const url = (e && e.file) ? publicUrl(e.file, e.t) : null;
    if (kind === "image") {
      const p = PLACES.find(x => x.id === key); if (!p) return;
      p.image = url; p.photoUrl = null;
      if (typeof applyPhoto === "function") applyPhoto(p);
    } else if (kind === "audio") {
      const c = (typeof getComposition === "function") ? getComposition(key) : null; if (!c) return;
      c.audio = url;
      if (typeof applyAudio === "function") applyAudio(c);
    } else if (kind === "char") {
      const ch = (typeof getCharacter === "function") ? getCharacter(key) : null; if (!ch) return;
      ch.photo = url;
    }
  }
  function applyAll() {
    PLACES.forEach(p => applyEntry("image", p.id));
    if (typeof COMPOSITIONS !== "undefined") COMPOSITIONS.forEach(c => applyEntry("audio", c.id));
    if (typeof allCharacters === "function") { allCharacters().forEach(({ id }) => applyEntry("char", id)); if (typeof refreshMascots === "function") refreshMascots(); }
  }

  /* ===================== ย่อรูป ===================== */
  async function resizeToJpeg(file) {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, MAX_W / bmp.width);
    const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
    const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
    cv.getContext("2d").drawImage(bmp, 0, 0, w, h); bmp.close?.();
    return await new Promise(r => cv.toBlob(r, "image/jpeg", JPEG_Q));
  }

  /* ===================== เลือกไฟล์ ===================== */
  const fileInput = document.createElement("input");
  fileInput.type = "file"; fileInput.style.display = "none";
  document.body.appendChild(fileInput);
  function pickFile(accept) {
    return new Promise(res => { fileInput.accept = accept; fileInput.value = ""; fileInput.onchange = () => res(fileInput.files[0] || null); fileInput.click(); });
  }

  function checkPasscode() {
    if (unlocked) return true;
    if (prompt("ใส่รหัสผ่านสำหรับแก้ไข:") === PASSCODE) { unlocked = true; return true; }
    setMsg("รหัสผ่านไม่ถูกต้อง", true); return false;
  }

  /* ===================== อัปโหลด / ลบ ===================== */
  async function connectLocalFolder() {
    if (!FS_OK) { setMsg("เบราว์เซอร์นี้อัปลงเครื่องไม่ได้ — ใช้ Chrome/Edge หรือทำงานออนไลน์ (Supabase)", true); return false; }
    try {
      dirHandle = await window.showDirectoryPicker({ mode: "readwrite", id: "yolada-images" });
      if (!(await ensurePerm(dirHandle))) { dirHandle = null; setMsg("ไม่ได้รับสิทธิ์เขียนโฟลเดอร์", true); return false; }
      await idbSet("dir", dirHandle);
      await backendLoadManifest("image"); await backendLoadManifest("audio");
      applyAll(); renderRows("image"); renderRows("audio"); updateFolderUI();
      setMsg("เชื่อมต่อโฟลเดอร์เรียบร้อย ✓"); return true;
    } catch (e) { if (e.name !== "AbortError") { console.warn(e); setMsg("เชื่อมต่อโฟลเดอร์ไม่สำเร็จ", true); } return false; }
  }

  async function uploadFor(kind, key) {
    if (!checkPasscode()) return;
    const file = await pickFile(kind === "audio" ? "audio/*" : "image/*");
    if (!file) return;
    if (kind === "audio" && file.size > AUDIO_MAX_MB * 1024 * 1024) { setMsg(`ไฟล์เสียงใหญ่เกิน ${AUDIO_MAX_MB} MB`, true); return; }
    setMsg("กำลังบันทึก…");
    try {
      let name, blob, type;
      if (kind === "audio") {
        const ext = (file.name.split(".").pop() || "mp3").toLowerCase().replace(/[^a-z0-9]/g, "");
        blob = file; name = audioName(key, ext); type = file.type || "audio/mpeg";
      } else {
        blob = await resizeToJpeg(file); type = "image/jpeg";
        name = kind === "char" ? charName(key) : imageName(key);
      }
      await backendSaveFile(name, blob, type);
      manifests[kind][key] = { file: name, t: Date.now() };
      await backendSaveManifest(kind);
      applyEntry(kind, key); renderRows(kind);
      if (kind === "char" && typeof refreshMascots === "function") refreshMascots();
      setMsg("บันทึกเรียบร้อย ✓");
    } catch (e) { console.warn(e); setMsg("บันทึกไม่สำเร็จ: " + (e.message || e), true); }
  }

  async function removeFor(kind, key) {
    if (!checkPasscode()) return;
    const e = manifests[kind][key];
    setMsg("กำลังลบ…");
    try {
      if (e) await backendRemoveFile(e.file);
      delete manifests[kind][key];
      await backendSaveManifest(kind);
      applyEntry(kind, key); renderRows(kind);
      if (kind === "char" && typeof refreshMascots === "function") refreshMascots();
      setMsg("ลบแล้ว");
    } catch (err) { console.warn(err); setMsg("ลบไม่สำเร็จ: " + (err.message || err), true); }
  }

  /* ===================== UI ===================== */
  const modal = document.getElementById("admin");
  const msgEl = document.getElementById("adminMsg");
  const folderStateEl = document.getElementById("adminFolderState");
  const folderRow = document.querySelector(".admin-folder");
  const hintEl = document.querySelector(".admin-hint");

  function setMsg(t, warn) { if (!msgEl) return; msgEl.textContent = t; msgEl.classList.toggle("warn", !!warn); }
  function updateFolderUI() { if (CLOUD || !folderStateEl) return; folderStateEl.textContent = dirHandle ? "เชื่อมต่อแล้ว ✓" : "ยังไม่ได้เชื่อมต่อ"; folderStateEl.classList.toggle("ok", !!dirHandle); }

  function renderRows(kind) {
    const el = document.getElementById(KINDS[kind].listId); if (!el) return;
    if (kind === "image") {
      el.innerHTML = PLACES.map(p => {
        const has = !!(manifests.image[p.id] && manifests.image[p.id].file);
        return `<div class="admin-row">
          <span class="admin-thumb">${placeImage(p, "100%", "100%")}</span>
          <span class="admin-row-name">${p.id}. ${p.name}<small>${p.district}${has ? " · มีรูปแล้ว ✓" : ""}</small></span>
          <span class="admin-row-actions">
            <button class="admin-mini" data-act="up" data-kind="image" data-id="${p.id}">${has ? "เปลี่ยนรูป" : "อัปโหลดรูป"}</button>
            <button class="admin-mini danger" data-act="rm" data-kind="image" data-id="${p.id}" ${has ? "" : "disabled"}>ลบ</button>
          </span></div>`;
      }).join("");
    } else if (kind === "audio") {
      el.innerHTML = COMPOSITIONS.map(c => {
        const has = !!(manifests.audio[c.id] && manifests.audio[c.id].file);
        return `<div class="admin-row">
          <span class="admin-thumb audio" style="--c:${c.color}">🎵</span>
          <span class="admin-row-name">${c.id} ${c.title}<small>${c.districtName}${has ? " · มีเสียงแล้ว ✓" : ""}</small></span>
          <span class="admin-row-actions">
            <button class="admin-mini" data-act="up" data-kind="audio" data-id="${c.id}">${has ? "เปลี่ยนเสียง" : "อัปโหลดเสียง"}</button>
            <button class="admin-mini danger" data-act="rm" data-kind="audio" data-id="${c.id}" ${has ? "" : "disabled"}>ลบ</button>
          </span></div>`;
      }).join("");
    } else if (kind === "char") {
      const chars = (typeof allCharacters === "function") ? allCharacters() : [];
      el.innerHTML = chars.map(({ id, c }) => {
        const has = !!(manifests.char[id] && manifests.char[id].file);
        return `<div class="admin-row">
          <span class="admin-thumb">${(typeof mascotSVG === "function") ? mascotSVG(c, 56) : ""}</span>
          <span class="admin-row-name">${c.name}<small>${c.role || c.skill || ""}${has ? " · มีรูปแล้ว ✓" : ""}</small></span>
          <span class="admin-row-actions">
            <button class="admin-mini" data-act="up" data-kind="char" data-id="${id}">${has ? "เปลี่ยนรูป" : "อัปโหลดรูป"}</button>
            <button class="admin-mini danger" data-act="rm" data-kind="char" data-id="${id}" ${has ? "" : "disabled"}>ลบ</button>
          </span></div>`;
      }).join("");
    }
  }

  function switchTab(tab) {
    curTab = tab;
    document.querySelectorAll(".admin-tab").forEach(b => b.classList.toggle("active", b.dataset.atab === tab));
    Object.entries(KINDS).forEach(([k, info]) => { const el = document.getElementById(info.listId); if (el) el.classList.toggle("hidden", k !== tab); });
  }

  function openModal() { renderRows("image"); renderRows("audio"); renderRows("char"); updateFolderUI(); modal.classList.remove("hidden"); }
  function closeModal() { modal.classList.add("hidden"); }

  /* ===================== init ===================== */
  async function init() {
    if (CLOUD) {
      if (folderRow) folderRow.style.display = "none";
      if (hintEl) hintEl.innerHTML = '🌐 <strong>โหมดออนไลน์ (Supabase)</strong> — อัปโหลดรูป &amp; เสียงได้เลย หลายคนใช้ร่วมกัน ทุกคนเห็น/ฟังเหมือนกัน' + (PASSCODE ? ' · มีรหัสผ่านป้องกัน' : '');
      try { await loadSupabaseLib(); supa = window.supabase.createClient(SUPA.url, SUPA.key); } catch (e) { console.warn(e); }
    } else {
      try { const h = await idbGet("dir"); if (h) dirHandle = h; } catch (e) {}
    }
    await backendLoadManifest("image");
    await backendLoadManifest("audio");
    await backendLoadManifest("char");
    applyAll();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("adminBtn")?.addEventListener("click", openModal);
    document.getElementById("adminClose")?.addEventListener("click", closeModal);
    document.getElementById("adminScrim")?.addEventListener("click", closeModal);
    document.getElementById("adminConnect")?.addEventListener("click", connectLocalFolder);
    document.querySelectorAll(".admin-tab").forEach(b => b.addEventListener("click", () => switchTab(b.dataset.atab)));

    const onListClick = e => {
      const btn = e.target.closest("button[data-act]"); if (!btn) return;
      const kind = btn.dataset.kind, id = kind === "image" ? +btn.dataset.id : btn.dataset.id;
      if (btn.dataset.act === "up") uploadFor(kind, id);
      else if (btn.dataset.act === "rm") removeFor(kind, id);
    };
    document.getElementById("adminList")?.addEventListener("click", onListClick);
    document.getElementById("adminAudioList")?.addEventListener("click", onListClick);
    document.getElementById("adminCharList")?.addEventListener("click", onListClick);

    init();
  });
})();
