// Animação de corações caindo no fundo
const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');
let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.5
  };
}

function drawHeart(h) {
  ctx.globalAlpha = h.opacity;
  ctx.fillStyle = '#ff4d6d';
  ctx.beginPath();
  const topCurveHeight = h.size * 0.3;
  ctx.moveTo(h.x, h.y + topCurveHeight);
  ctx.bezierCurveTo(h.x, h.y, h.x - h.size / 2, h.y, h.x - h.size / 2, h.y + topCurveHeight);
  ctx.bezierCurveTo(h.x - h.size / 2, h.y + h.size / 1.5, h.x, h.y + h.size, h.x, h.y + h.size * 1.3);
  ctx.bezierCurveTo(h.x, h.y + h.size, h.x + h.size / 2, h.y + h.size / 1.5, h.x + h.size / 2, h.y + topCurveHeight);
  ctx.bezierCurveTo(h.x + h.size / 2, h.y, h.x, h.y, h.x, h.y + topCurveHeight);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function updateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.05) hearts.push(createHeart());
  hearts.forEach(h => {
    h.y += h.speed;
  });
  hearts = hearts.filter(h => h.y < canvas.height + h.size);
  hearts.forEach(drawHeart);
  requestAnimationFrame(updateHearts);
}

updateHearts();

// Efeito digitação para frase do header
const typedTextEl = document.querySelector('.typed-text');
const text = typedTextEl.textContent;
typedTextEl.textContent = '';

let charIndex = 0;
function typeEffect() {
  if (charIndex < text.length) {
    typedTextEl.textContent += text.charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 50);
  }
}
typeEffect();

// Controle do áudio com botão para tocar trecho específico em loop
const audio = document.getElementById('birthdaySong');
const playBtn = document.getElementById('playBtn');

playBtn.addEventListener('click', () => {
  audio.currentTime = 30; // começa do segundo 30
  audio.play().catch(() => {
    console.log('Erro ao tentar reproduzir o áudio.');
  });
  playBtn.style.display = 'none';
  document.getElementById('audio-control').innerHTML = '<p>🎶 Música tocando em loop, aproveite! 🎶</p>';
});

audio.addEventListener('timeupdate', () => {
  if (audio.currentTime >= 130) { // fim do trecho ajustado pra 2min10s
    audio.pause();
    setTimeout(() => {
      audio.currentTime = 30;
      audio.play();
    }, 50); // pausa 50ms antes de reiniciar para suavizar o loop
  }
});





