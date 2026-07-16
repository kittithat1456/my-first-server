const http = require("http");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

res.statusCode = 200;
res.setHeader("Content-Type","text/html; charset=utf-8");


res.end(`

<!DOCTYPE html>
<html lang="th">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Kittitatt Portfolio</title>

<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap" rel="stylesheet">


<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Kanit',sans-serif;
}


body{

height:100vh;

display:flex;
justify-content:center;
align-items:center;

overflow:hidden;

background:
radial-gradient(circle at top,#123c8c,#020617);

color:white;

}



/* ดาวพื้นหลัง */

.space{

position:absolute;

width:100%;
height:100%;

}


.star{

position:absolute;

width:4px;
height:4px;

background:#60a5fa;

border-radius:50%;

animation:move 8s linear infinite;

}


@keyframes move{

from{

transform:translateY(0);

opacity:1;

}

to{

transform:translateY(100vh);

opacity:0;

}

}



/* Card */


.card{

width:450px;

padding:35px;


background:

rgba(15,23,42,.75);


border:

1px solid rgba(96,165,250,.5);


border-radius:35px;


backdrop-filter:blur(20px);


text-align:center;


box-shadow:

0 0 30px #2563eb;


animation:

show .8s ease;

}



@keyframes show{


from{

opacity:0;

transform:translateY(50px);

}


to{

opacity:1;

transform:translateY(0);

}

}





/* Profile */


.profile-box{


width:180px;

height:180px;

margin:auto;


padding:5px;


border-radius:50%;


background:

linear-gradient(45deg,#38bdf8,#2563eb,#9333ea);


animation:

rotate 5s linear infinite;


}



.profile{


width:100%;

height:100%;

border-radius:50%;

object-fit:cover;

border:5px solid #020617;

}



@keyframes rotate{

100%{

transform:rotate(360deg);

}

}





h1{

margin-top:20px;

color:#60a5fa;

text-shadow:

0 0 15px #2563eb;

}



.subtitle{

color:#93c5fd;

margin:10px;

}





.info{

margin-top:20px;

text-align:left;

}



.info p{

margin:12px 0;

}



.info span{

color:#38bdf8;

font-weight:bold;

}





.quote{


margin-top:20px;


padding:15px;


background:

rgba(37,99,235,.2);


border-radius:20px;


color:#bfdbfe;


border:

1px solid #2563eb;

}





button{


margin-top:25px;


padding:13px 30px;


border:none;


border-radius:50px;


background:

linear-gradient(45deg,#2563eb,#06b6d4);


color:white;


font-size:16px;


cursor:pointer;


box-shadow:

0 0 20px #2563eb;


transition:.3s;


}



button:hover{


transform:scale(1.1);


box-shadow:

0 0 35px #38bdf8;


}





#message{


margin-top:15px;

color:#7dd3fc;

font-weight:bold;

}





.footer{


margin-top:20px;

color:#94a3b8;

font-size:13px;

}



</style>


</head>



<body>



<div class="space" id="space"></div>




<div class="card">



<div class="profile-box">

<img class="profile"

src="https://ih1.redbubble.net/image.5213127363.2949/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg">

</div>




<h1>

นาย กิตติทัต จานเขื่อง

</h1>


<div class="subtitle">

💻 Cyber Ice Bear Portfolio

</div>




<div class="info">


<p>
🎓 <span>ระดับชั้น :</span>
HIT.1/1 V (A)
</p>


<p>
💻 <span>สาขา :</span>
เทคโนโลยีสารสนเทศ
</p>


<p>
🚀 <span>Skill :</span>
HTML CSS JavaScript Python
</p>


<p>
🎯 <span>เป้าหมาย :</span>
Developer มืออาชีพ
</p>


</div>




<div class="quote">


❄️ Ice Bear Mode:


<br>


"Code Today, Create Tomorrow"


</div>



<button onclick="talk()">

⚡ Connect Ice Bear

</button>



<div id="message"></div>




<div class="footer">

Node.js Portfolio Server v2.0

</div>



</div>





<script>


const messages=[


"🐻 Ice Bear : Welcome Developer",

"⚡ Keep Learning Keep Coding",

"💻 JavaScript is Power",

"🚀 Future Full Stack Developer",

"🔥 Never Stop Improving"


];



function talk(){


document.getElementById("message").innerHTML=

messages[Math.floor(Math.random()*messages.length)];


}




// สร้างดาว


const space=document.getElementById("space");


for(let i=0;i<80;i++){


let star=document.createElement("span");


star.className="star";


star.style.left=Math.random()*100+"%";

star.style.top=Math.random()*100+"%";


star.style.animationDuration=

(Math.random()*5+5)+"s";


star.style.opacity=Math.random();


space.appendChild(star);


}



</script>



</body>

</html>

`);

});



server.listen(port,()=>{

console.log(

`Server Running : http://localhost:${port}`

);

});
