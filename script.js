

// ---------------- Typing Love Letter ----------------
const text = "From the moment you came into my life, everything became more beautiful. You are my happiness, my peace, and my favorite person ❤️";

let index = 0;
const letter = document.getElementById("loveLetter");

function typeLetter(){
    if(index < text.length){
        letter.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeLetter,50);
    }
}

typeLetter();

function checkPassword(){
    const password = document.getElementById("passwordInput").value;

   if(password === "241124"){
    document.getElementById("passwordScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    // Stop intro music (first screen)
    const intro = document.getElementById("introMusic");
    intro.pause();
    intro.currentTime = 0;

    // Play main background music
    const bg = document.getElementById("bgMusic");
    bg.volume = 0.3;
    bg.play();
}



    else{
        document.getElementById("wrongPass").innerHTML = "Wrong password 😢";
    }
}

// ---------------- Buttons ----------------
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const response = document.getElementById("response");

yesBtn.onclick = () => {

    // Hide buttons softly
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    response.innerHTML = "For you… ❤️";

    // Fireworks celebration
    for(let i=0;i<6;i++){
        setTimeout(createFirework, i * 400);
    }

    // Show handwritten letter
    setTimeout(()=>{
        document.getElementById("letterScreen").style.opacity = "1";
        document.getElementById("letterScreen").style.visibility = "visible";
    }, 3000);
}


  


noBtn.onmouseover = () => {
    const x = Math.random()*200 - 100;
    const y = Math.random()*200 - 100;
    noBtn.style.transform = `translate(${x}px,${y}px)`;
}

// ---------------- Fireworks ----------------

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 3;
        this.speedX = (Math.random()-0.5)*6;
        this.speedY = (Math.random()-0.5)*6;
        this.life = 100;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function createFirework(){
    const x = Math.random()*canvas.width;
    const y = Math.random()*canvas.height/2;

    const colors = ["red","pink","white","yellow"];

    for(let i=0;i<80;i++){
        particles.push(new Particle(x,y,colors[Math.floor(Math.random()*colors.length)]));
    }
}

function animateFireworks(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,index)=>{
        p.update();
        p.draw();

        if(p.life <= 0){
            particles.splice(index,1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

animateFireworks();

// -------- Spotlight Reveal --------

const spotlightImages = document.querySelectorAll(".spotlight-box");

spotlightImages.forEach(box => {

    box.addEventListener("mousemove",(e)=>{

        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        box.style.background =
        `radial-gradient(circle at ${x}px ${y}px,
        transparent 60px,
        rgba(0,0,0,0.7) 120px)`;

    });

    box.addEventListener("mouseleave",()=>{
        box.style.background = "rgba(0,0,0,0.5)";
    });

});

function playIntroMusic(){
    const intro = document.getElementById("introMusic");
    intro.volume = 0.3;
    intro.play();
}

function stopIntroMusic(){
    document.getElementById("introMusic").pause();
}

