const http = require("http");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });

  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM students");
    client.release();

    let rows = "";

    result.rows.forEach((row, index) => {
      rows += `
      <tr style="animation-delay:${index * 0.08}s">
          <td class="id-col"><span class="bullet">◆</span> ${row.student_id}</td>
          <td class="name-col">${row.student_name}</td>
          <td class="status-col"><span class="badge">ACTIVE</span></td>
      </tr>`;
    });

    res.end(`
<!DOCTYPE html>
<html lang="th">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Student Information System</title>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Space Grotesk', 'Kanit', sans-serif;
}

body {
  background: #030712;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #f8fafc;
  padding: 20px 0;
}

/* ---------- Canvas พื้นหลังเส้น Interactive ---------- */
#particles-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: radial-gradient(circle at center, #0f172a 0%, #030712 100%);
}

/* ---------- Card / Main Container ---------- */
.container {
  width: 950px;
  max-width: 92%;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 16px;
  padding: 35px;
  box-shadow: 
    0 0 30px rgba(14, 165, 233, 0.15),
    inset 0 0 20px rgba(56, 189, 248, 0.05);
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.container:hover {
  box-shadow: 
    0 0 50px rgba(14, 165, 233, 0.35),
    inset 0 0 25px rgba(56, 189, 248, 0.1);
  border-color: rgba(56, 189, 248, 0.5);
  transform: translateY(-4px);
}

/* ---------- Header ---------- */
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(56, 189, 248, 0.15);
  padding-bottom: 18px;
  margin-bottom: 25px;
}

.title-group h1 {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 50%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
  filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.4));
}

.title-group p {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 4px;
}

.system-status {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(14, 165, 233, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  color: #38bdf8;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #38bdf8;
  border-radius: 50%;
  box-shadow: 0 0 8px #38bdf8;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.5; }
}

/* ---------- Table ---------- */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

th {
  background: rgba(30, 58, 138, 0.3);
  color: #38bdf8;
  padding: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  letter-spacing: 1px;
  border-top: 1px solid rgba(56, 189, 248, 0.2);
  border-bottom: 1px solid rgba(56, 189, 248, 0.2);
}

th:first-child { border-radius: 8px 0 0 8px; border-left: 1px solid rgba(56, 189, 248, 0.2); }
th:last-child { border-radius: 0 8px 8px 0; border-right: 1px solid rgba(56, 189, 248, 0.2); text-align: right; }

td {
  padding: 14px 16px;
  background: rgba(15, 23, 42, 0.6);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  font-size: 15px;
  transition: all 0.3s ease;
}

td:first-child { border-left: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px 0 0 8px; }
td:last-child { border-right: 1px solid rgba(255, 255, 255, 0.05); border-radius: 0 8px 8px 0; text-align: right; }

.id-col { font-weight: 600; color: #7dd3fc; }
.bullet { color: #3b82f6; margin-right: 6px; font-size: 10px; }

.badge {
  background: rgba(14, 165, 233, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #38bdf8;
  padding: 4px 10px;
  font-size: 11px;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

tr {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

tbody tr:hover td {
  background: rgba(30, 58, 138, 0.4);
  color: #ffffff;
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 0 15px rgba(14, 165, 233, 0.25);
  cursor: pointer;
}

/* ---------- Scrollbar ---------- */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #030712; }
::-webkit-scrollbar-thumb { background: #1e40af; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #3b82f6; }

.footer {
  margin-top: 25px;
  text-align: center;
  color: #64748b;
  font-size: 13px;
  letter-spacing: 0.5px;
}

</style>

</head>

<body>

<!-- Canvas สำหรับจุดและเส้นใยวิบวับตามเมาส์ -->
<canvas id="particles-canvas"></canvas>

<div class="container">

  <div class="header-bar">
    <div class="title-group">
      <h1>🎓 ฐานข้อมูลนักศึกษา</h1>
      <p>Student Records Management System</p>
    </div>
    <div class="system-status">
      <span class="status-dot"></span>
      ONLINE
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>รหัสนักศึกษา</th>
        <th>ชื่อ - นามสกุล</th>
        <th style="text-align: right;">สถานะ</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <div class="footer">
    Blue Neon Theme • PostgreSQL • Node.js
  </div>

</div>

<!-- Script คำนวณเส้นใยและเอฟเฟกต์ตามเมาส์ -->
<script>
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  // เก็บพิกัดเมาส์
  const mouse = {
    x: null,
    y: null,
    radius: 180 // ระยะที่เมาส์จะดึงดูดเส้น
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // สร้างจุด Particles
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 1.5 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
    }
  }

  let particles = [];
  function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 12000); // คำนวณจำนวนจุดตามขนาดจอ
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // วาดเส้นเชื่อมระหว่างจุดที่อยู่ใกล้กัน
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // วาดเส้นเชื่อมกับตำแหน่งเมาส์
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(14, 165, 233, ${0.5 * (1 - dist / mouse.radius)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
</script>

</body>
</html>
`);
  } catch (err) {
    console.error(err);

    res.end(`
    <body style="
    background:#030712;
    color:#f8fafc;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    font-family:sans-serif;
    ">
        <div style="
        background:#0f172a;
        padding:40px;
        border-radius:16px;
        border:1px solid #ef4444;
        box-shadow:0 0 30px rgba(239, 68, 68, 0.3);
        text-align:center;
        max-width:450px;
        ">
            <h1 style="color:#f87171; margin-bottom:12px; font-size:22px;">เกิดข้อผิดพลาดในการทำงาน</h1>
            <p style="color:#94a3b8; font-size:14px;">${err.message}</p>
        </div>
    </body>
    `);
  }
});

server.listen(port, () => {
  console.log("Server Running :", port);
});
