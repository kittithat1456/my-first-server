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
          <td><span class="prefix">></span> ${row.student_id}</td>
          <td class="student-name">${row.student_name}</td>
          <td><span class="badge">ACCESS_GRANTED</span></td>
      </tr>`;
    });

    res.end(`
<!DOCTYPE html>
<html lang="th">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SYSTEM_OVERRIDE // STUDENT_DB</title>

<!-- ใช้ Google Font แบบ Hacker/Terminal -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600;700&family=Kanit:wght@300;400;600&display=swap" rel="stylesheet">

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Code', 'Kanit', monospace;
}

body {
  background: #030712;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #00ff66;
  padding: 20px 0;
}

/* ---------- CRT Scanline Effect ---------- */
body::before {
  content: " ";
  display: block;
  position: fixed;
  top: 0; left: 0; bottom: 0; right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
  z-index: 10;
  pointer-events: none;
  opacity: 0.6;
}

/* ---------- Canvas พื้นหลัง Matrix Rain ---------- */
#matrix-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.35;
}

/* ---------- Card / Terminal Window ---------- */
.container {
  width: 950px;
  max-width: 92%;
  background: rgba(5, 15, 10, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid #00ff66;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 
    0 0 20px rgba(0, 255, 102, 0.2),
    inset 0 0 15px rgba(0, 255, 102, 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.container:hover {
  box-shadow: 
    0 0 35px rgba(0, 255, 102, 0.4),
    inset 0 0 20px rgba(0, 255, 102, 0.15);
  border-color: #33ff88;
}

/* ---------- Header & Terminal Controls ---------- */
.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 255, 102, 0.3);
  padding-bottom: 15px;
  margin-bottom: 25px;
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot-red { background: #ff5f56; box-shadow: 0 0 8px #ff5f56; }
.dot-yellow { background: #ffbd2e; box-shadow: 0 0 8px #ffbd2e; }
.dot-green { background: #27c93f; box-shadow: 0 0 8px #27c93f; }

.status-tag {
  font-size: 12px;
  color: #00ff66;
  letter-spacing: 1px;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 28px;
  color: #00ff66;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 255, 102, 0.7);
}

/* ---------- System Status Bar ---------- */
.status-bar {
  display: flex;
  justify-content: space-between;
  background: rgba(0, 255, 102, 0.05);
  border: 1px dashed rgba(0, 255, 102, 0.3);
  padding: 10px 15px;
  font-size: 13px;
  margin-bottom: 20px;
  color: #a3ffcc;
}

/* ---------- Table ---------- */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
}

th {
  background: rgba(0, 255, 102, 0.15);
  color: #00ff66;
  padding: 14px;
  font-size: 15px;
  text-align: left;
  border-top: 1px solid #00ff66;
  border-bottom: 1px solid #00ff66;
  letter-spacing: 1px;
}

td {
  padding: 12px 14px;
  background: rgba(0, 30, 15, 0.6);
  border-top: 1px solid rgba(0, 255, 102, 0.1);
  border-bottom: 1px solid rgba(0, 255, 102, 0.1);
  color: #e0ffe8;
  font-size: 14px;
  transition: all 0.25s ease;
}

td:first-child { border-left: 1px solid rgba(0, 255, 102, 0.1); border-radius: 4px 0 0 4px; }
td:last-child { border-right: 1px solid rgba(0, 255, 102, 0.1); border-radius: 0 4px 4px 0; text-align: right; }

.prefix {
  color: #00ff66;
  font-weight: bold;
}

.badge {
  background: rgba(0, 255, 102, 0.1);
  border: 1px solid #00ff66;
  color: #00ff66;
  padding: 2px 8px;
  font-size: 10px;
  border-radius: 3px;
  letter-spacing: 1px;
}

tr {
  animation: scanIn 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes scanIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

tbody tr:hover td {
  background: rgba(0, 255, 102, 0.15);
  color: #ffffff;
  border-color: #00ff66;
  box-shadow: 0 0 10px rgba(0, 255, 102, 0.2);
  cursor: pointer;
}

/* ---------- Scrollbar ---------- */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #030712;
}

::-webkit-scrollbar-thumb {
  background: #00ff66;
  border-radius: 3px;
}

.footer {
  margin-top: 25px;
  text-align: center;
  color: #008833;
  font-size: 12px;
  letter-spacing: 1px;
}

</style>

</head>

<body>

<canvas id="matrix-canvas"></canvas>

<div class="container">

  <div class="terminal-header">
    <div class="terminal-buttons">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
    </div>
    <div class="status-tag">[ SECURE_CONNECTION // PORT: ${port} ]</div>
  </div>

  <h1>☠️ STUDENT_DATABASE // ROOT_ACCESS</h1>

  <div class="status-bar">
    <span>> TARGET: PostgreSQL_Cluster</span>
    <span>> FETCHED: ${result.rows.length} RECORDS</span>
    <span>> STATUS: OPERATIONAL</span>
  </div>

  <table>
    <thead>
      <tr>
        <th>ID_CODE</th>
        <th>NAME_IDENTIFIER</th>
        <th style="text-align: right;">STATUS</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <div class="footer">
    [ SYSTEM: NODE.JS ] • [ DB: POSTGRESQL ] • [ ENCRYPTION: AES-256 ]
  </div>

</div>

<!-- Matrix Rain Animation Effect Script -->
<script>
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  const alphabet = katakana + latin;

  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const rainDrop = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrop.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      ctx.fillText(text, i * fontSize, rainDrop[i] * fontSize);

      if (rainDrop[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrop[i] = 0;
      }
      rainDrop[i]++;
    }
  }

  setInterval(draw, 30);
</script>

</body>
</html>
`);
  } catch (err) {
    console.error(err);

    res.end(`
    <body style="
    background:#030712;
    color:#ff3333;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    font-family:'Courier New', monospace;
    ">
        <div style="
        background:rgba(20, 0, 0, 0.9);
        padding:40px;
        border-radius:8px;
        border:1px solid #ff3333;
        box-shadow:0 0 30px rgba(255, 51, 51, 0.4);
        text-align:center;
        max-width:500px;
        ">
            <h1 style="color:#ff3333; margin-bottom:15px;">[!] SYSTEM ERROR</h1>
            <p style="color:#ff8888; font-size:14px;">${err.message}</p>
        </div>
    </body>
    `);
  }
});

server.listen(port, () => {
  console.log("Server Running :", port);
});
