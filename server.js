const http = require("http");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    res.end(`
<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Portfolio - กิตติทัต</title>

<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap" rel="stylesheet">

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Kanit',sans-serif;
}

body{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(135deg,#e3f2fd,#bbdefb,#90caf9);
    overflow:hidden;
}

.card{
    width:430px;
    background:rgba(255,255,255,.25);
    backdrop-filter:blur(15px);
    border-radius:30px;
    padding:30px;
    text-align:center;
    box-shadow:0 10px 30px rgba(0,0,0,.15);
    z-index:2;
}

.profile{
    width:160px;
    height:160px;
    border-radius:50%;
    object-fit:cover;
    border:5px solid white;
    animation:float 3s infinite ease-in-out;
}

@keyframes float{
    0%,100%{transform:translateY(0);}
    50%{transform:translateY(-10px);}
}

h1{
    color:#0d47a1;
    margin:15px 0;
}

.subtitle{
    color:#1565c0;
    margin-bottom:15px;
}

.info{
    text-align:left;
    margin-top:20px;
}

.info p{
    margin:10px 0;
}

.info span{
    color:#0d47a1;
    font-weight:bold;
}

.quote{
    margin-top:20px;
    padding:15px;
    background:white;
    border-radius:15px;
    color:#1565c0;
    font-style:italic;
}

button{
    margin-top:20px;
    padding:12px 25px;
    border:none;
    border-radius:30px;
    background:#1976d2;
    color:white;
    cursor:pointer;
    font-size:16px;
}

button:hover{
    background:#0d47a1;
}

#message{
    margin-top:15px;
    color:#0d47a1;
    font-weight:bold;
}

.snow{
    position:absolute;
    width:100%;
    height:100%;
    overflow:hidden;
}

.snow span{
    position:absolute;
    width:8px;
    height:8px;
    background:white;
    border-radius:50%;
    animation:snow 8s linear infinite;
}

@keyframes snow{
    from{
        transform:translateY(-10px);
    }
    to{
        transform:translateY(110vh);
    }
}

.footer{
    margin-top:20px;
    color:#666;
}

</style>

</head>

<body>

<div class="snow" id="snow"></div>

<div class="card">

<img class="profile"
src="https://ih1.redbubble.net/image.5213127363.2949/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg">

<h1>นาย กิตติทัต จานเขื่อง (กัน)</h1>

<div class="subtitle">
Ice Bear Portfolio ❄️
</div>

<div class="info">
<p>🎓 <span>ระดับชั้น :</span> HIT.1/1 V (A)</p>
<p>💻 <span>สาขา :</span> เทคโนโลยีสารสนเทศ</p>
<p>📖 <span>คติประจำใจ :</span> เรียนรู้ทุกวัน พัฒนาทุกบรรทัดของชีวิต</p>
<p>🎯 <span>เป้าหมาย :</span> รวย และประสบความสำเร็จในสาย IT</p>
</div>

<div class="quote">
❄️ Ice Bear says<br>
"Keep Coding, Keep Growing."
</div>

<button onclick="talk()">
🐻 ทักทาย Ice Bear
</button>

<div id="message"></div>

<div class="footer">
Server Portfolio Version 1.0
</div>

</div>

<script>

const messages=[
"🐻 Ice Bear : สวัสดี กัน!",
"❄️ วันนี้เขียนโค้ดแล้วหรือยัง?",
"💻 Programmer ที่ดี เรียนรู้ทุกวัน",
"🚀 เป้าหมายความรวย เริ่มจากความรู้",
"🔥 Keep Coding Keep Growing",
"🎯 ความสำเร็จเริ่มจากการลงมือทำ"
];

function talk(){
    document.getElementById("message").innerHTML=
    messages[Math.floor(Math.random()*messages.length)];
}

const snow=document.getElementById("snow");

for(let i=0;i<40;i++){

    const s=document.createElement("span");

    s.style.left=Math.random()*100+"%";
    s.style.opacity=Math.random();
    s.style.animationDuration=(Math.random()*5+5)+"s";

    snow.appendChild(s);

}

</script>

</body>
</html>
`);
});

server.listen(port, () => {
    console.log(`Server Running : http://localhost:${port}`);
});
