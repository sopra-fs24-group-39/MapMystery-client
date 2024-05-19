const NUM_CONFETTI = 350;
const COLORS = ['#0000e7', '#dbdb00', '#ed1c24', '#00ebeb'];

let canvas, context, w, h, confetti, xpos;
const duration = 2000;
let progress = 0;

const resizeWindow = () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
};

const range = (a, b) => (b - a) * Math.random() + a;

const drawCircle = (x, y, width, height, style, deg) => {
  const rotDeg = deg * Math.PI / 180;
  context.beginPath();
  context.save();
  context.translate(x + width, y + height);
  context.rotate(rotDeg);
  context.fillStyle = style;
  context.fillRect(-width, -height, width, height);
  context.restore();
};

class Confetti {
  constructor() {
    this.style = COLORS[~~range(0, 4)];
    this.deg = range(10, 120);
    this.r = ~~range(4, 10);
    this.width = 2 * this.r;
    this.height = this.r / 2;
    this.replace();
  }

  replace() {
    this.opacity = 0;
    this.dop = 1;
    this.x = range(0, w - this.width);
    this.y = range(-(h - this.width), -this.width);
    this.xmax = w - this.r;
    this.ymax = h - this.r;
    this.vx = 0;
    this.vy = 1.1 * this.r + range(-1, 1);
  }

  draw() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y > this.ymax) {
      this.replace();
    }
    if (!(0 < this.x < this.xmax)) {
      this.x = (this.x + this.xmax) % this.xmax;
    }
    drawCircle(~~this.x, ~~this.y, this.width, this.height, this.style, this.deg);
  }
}

const startConfetti = () => {
  confetti = new Array(NUM_CONFETTI).fill().map(() => new Confetti());
  step();
};

const step = () => {
  requestAnimationFrame(step);
  context.clearRect(0, 0, w, h);
  confetti.forEach(c => c.draw());
  progress += 20;
};

document.addEventListener('mousemove', (e) => {
  xpos = e.pageX / w;
});

window.addEventListener('resize', resizeWindow, false);

window.onload = () => {
  canvas = document.getElementById('world');
  context = canvas.getContext('2d');
  resizeWindow();
  startConfetti();
};
