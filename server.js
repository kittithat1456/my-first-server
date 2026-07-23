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
      <tr style="animation-delay:${index * 0.1}s">
          <td>${row.student_id}</td>
          <td>${row.student_name}</td>
      </tr>`;
    });

    res.end(`
<!DOCTYPE html>
<html lang="th">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Student Database</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Segoe UI',sans-serif;
}

body{
background:#030712;
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
color:white;
}

/* ---------- พื้นหลัง ---------- */

.background{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
overflow:hidden;
z-index:-2;
background:
radial-gradient(circle at top,#1e3a8a 0%,#030712 60%);
}

/* ดาว */

.star{
position:absolute;
width:2px;
height:120px;
background:linear-gradient(transparent,#38bdf8);
opacity:.5;
animation:fall linear infinite;
}

@keyframes fall{

0%{
transform:translateY(-150px);
}

100%{
transform:translateY(120vh);
}

}

/* วงกลมเรืองแสง */

.glow{
position:absolute;
border-radius:50%;
filter:blur(120px);
opacity:.3;
animation:move 12s infinite alternate;
}

.glow:nth-child(1){
width:300px;
height:300px;
background:#2563eb;
left:-100px;
top:100px;
}

.glow:nth-child(2){
width:250px;
height:250px;
background:#06b6d4;
right:-80px;
bottom:50px;
}

@keyframes move{
to{
transform:translateY(-80px) translateX(80px);
}
}

/* ---------- Card ---------- */

.container{

width:900px;
max-width:95%;

background:rgba(255,255,255,.06);
backdrop-filter:blur(15px);

border:1px solid rgba(255,255,255,.1);

border-radius:25px;

padding:40px;

box-shadow:
0 0 40px rgba(37,99,235,.35);

transition:.4s;

}

.container:hover{

transform:translateY(-8px);

box-shadow:
0 0 60px rgba(14,165,233,.7);

}

h1{

text-align:center;
margin-bottom:25px;
font-size:34px;
color:#7dd3fc;
text-shadow:
0 0 10px #38bdf8,
0 0 30px #2563eb;

}

/* ---------- Table ---------- */

table{

width:100%;
border-collapse:collapse;
overflow:hidden;
border-radius:18px;

}

th{

background:linear-gradient(90deg,#1d4ed8,#0ea5e9);

padding:18px;

font-size:18px;

}

td{

padding:16px;

text-align:center;

background:rgba(255,255,255,.04);

transition:.35s;

}

tr{

animation:fade .8s forwards;
opacity:0;

}

@keyframes fade{

from{

opacity:0;
transform:translateX(-30px);

}

to{

opacity:1;
transform:translateX(0);

}

}

tbody tr:hover td{

background:rgba(14,165,233,.2);

transform:scale(1.02);

color:#7dd3fc;

cursor:pointer;

}

/* ---------- Scroll ---------- */

::-webkit-scrollbar{
width:10px;
}

::-webkit-scrollbar-thumb{
background:#2563eb;
border-radius:20px;
}

.footer{

margin-top:20px;
text-align:center;
color:#94a3b8;

}

</style>

</head>

<body>

<div class="background">

<div class="glow"></div>
<div class="glow"></div>

${Array.from({length:80},(_,i)=>`
<div class="star"
style="
left:${Math.random()*100}%;
animation-duration:${5+Math.random()*8}s;
animation-delay:${Math.random()*5}s;
">
</div>
`).join("")}

</div>

<div class="container">

<h1>🎓 ฐานข้อมูลนักศึกษา</h1>

<table>

<thead>

<tr>

<th>รหัสนักศึกษา</th>
<th>ชื่อ - นามสกุล</th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>

<div class="footer">
Blue Theme • PostgreSQL • Node.js
</div>

</div>

</body>
</html>
`);
  } catch (err) {
    console.error(err);

    res.end(`
    <body style="
    background:#030712;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    font-family:sans-serif;
    ">
        <div style="
        background:#111827;
        padding:40px;
        border-radius:20px;
        border:1px solid #2563eb;
        box-shadow:0 0 40px #2563eb;
        text-align:center;
        ">
            <h1 style="color:#38bdf8;">เกิดข้อผิดพลาด</h1>
            <p>${err.message}</p>
        </div>
    </body>
    `);
  }
});

server.listen(port, () => {
  console.log("Server Running :", port);
});
