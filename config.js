/* ============================================================
   ตั้งค่า ยลดาพาทัวร์
   ============================================================ */

window.CONFIG = {

  /* ----------------------------------------------------------
     [A] รูปสถานที่แบบออนไลน์ (Supabase) — แนะนำสำหรับ Netlify
     ----------------------------------------------------------
     ทำให้ "ใครก็อัปโหลดรูปบนเว็บจริงได้ และทุกคนเห็นรูปเดียวกัน"
     ฟรี ไม่ต้องใช้บัตรเครดิต ไม่ต้องรันเซิร์ฟเวอร์เอง

     วิธีตั้งค่า (ทำครั้งเดียว ~5 นาที):
     1) สมัคร/เข้า https://supabase.com  →  New project (ตั้งรหัสผ่าน DB อะไรก็ได้)
     2) เมนู Storage → New bucket → ตั้งชื่อ "places" → ติ๊ก "Public bucket" → Create
     3) เมนู Storage → Policies → ที่ bucket "places" กด New policy → เลือกแบบ
        "For full customization" แล้วอนุญาต INSERT, UPDATE, DELETE, SELECT
        ให้ role = anon (public)   *ดูตัวอย่าง SQL ใน README หัวข้อ Supabase*
     4) เมนู Project Settings → API → คัดลอก
          • Project URL          → วางในช่อง SUPABASE_URL
          • anon public key      → วางในช่อง SUPABASE_ANON_KEY
        (anon key เปิดเผยในโค้ดฝั่งเว็บได้ตามปกติ ปลอดภัยถ้าตั้ง Policy ถูก)
     5) บันทึกไฟล์นี้ แล้ว push ขึ้น GitHub → Netlify จะอัปเดตเอง
     ---------------------------------------------------------- */
  SUPABASE_URL: "https://ixqqupwnzbceuovatvnr.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_815LkP4UUh-4GrvTVaklLg_GvtEWqSa",
  SUPABASE_BUCKET: "Places",

  // (ตัวเลือก) ใส่รหัสผ่านง่าย ๆ กันคนสุ่มแก้รูป — เว้นว่าง = ใครก็อัปได้
  ADMIN_PASSCODE: "1111",

  // ขนาด/คุณภาพรูปที่บันทึก
  PHOTO_MAX_WIDTH: 1280,
  PHOTO_JPEG_QUALITY: 0.82,

  /* ----------------------------------------------------------
     [B] (ตัวเลือกเสริม) ดึงรูปอัตโนมัติจาก Google Places
     ต้องมี API key + เปิด billing — เว้นว่างไว้ถ้าไม่ใช้
     ดูขั้นตอนใน README หัวข้อ Google Places
     ---------------------------------------------------------- */
  GOOGLE_MAPS_API_KEY: "",
  PHOTO_CACHE_DAYS: 14
};
