// =============================
// ข้อความตอบโต้ Ice Bear
// =============================
const messages = [
    "🐻 Ice Bear : สวัสดี กัน!",
    "❄️ วันนี้เขียนโค้ดแล้วหรือยัง?",
    "💻 Programmer ที่ดี เรียนรู้ทุกวัน",
    "🚀 เป้าหมายความรวย เริ่มจากความรู้",
    "🔥 Keep Coding Keep Growing",
    "🎯 ความสำเร็จเริ่มจากการลงมือทำ"
];

// =============================
// เมื่อกดปุ่ม
// =============================
function iceBearTalk() {
    const random = messages[Math.floor(Math.random() * messages.length)];

    document.getElementById("message").innerHTML = random;
}

// =============================
// สร้างหิมะ
// =============================
const snow = document.getElementById("snow");

for (let i = 0; i < 40; i++) {
    const s = document.createElement("span");

    s.style.left = Math.random() * 100 + "%";
    s.style.animationDuration = (Math.random() * 5 + 5) + "s";
    s.style.opacity = Math.random();

    snow.appendChild(s);
}
