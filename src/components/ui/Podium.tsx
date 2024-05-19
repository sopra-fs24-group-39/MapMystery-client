import React, { useState, useEffect } from 'react';
import "../../styles/ui/Podium.scss";
import Title from "components/ui/Title";

interface Participant {
  name: string;
  points: number;
}

interface PodiumProps {
  first: Participant;
  second: Participant;
  third: Participant;
}

const Podium: React.FC<PodiumProps> = ({ first, second, third }) => {
  const [displayStage, setDisplayStage] = useState(0);

  useEffect(() => {
    const intervals = [2000, 3000, 3000, 3000, 2000];
    let totalTime = 0;
    const timeouts: NodeJS.Timeout[] = [];

    intervals.forEach((interval, index) => {
      totalTime += interval;
      const timeout = setTimeout(() => {
        setDisplayStage(index + 1);
      }, totalTime);
      timeouts.push(timeout);
    });

    const finalTimeout = setTimeout(() => {
      setDisplayStage(5);
    }, totalTime + 3000);
    timeouts.push(finalTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (displayStage < 3) return;

    const NUM_CONFETTI = 400;
    const COLORS = ['#0000e7', '#dbdb00', '#ed1c24', '#00ebeb'];

    let canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, w: number, h: number, confetti: Confetti[], xpos: number;
    const duration = 20000;
    let progress = 0;

    const resizeWindow = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const range = (a: number, b: number) => (b - a) * Math.random() + a;

    const drawCircle = (x: number, y: number, width: number, height: number, style: string, deg: number) => {
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
      style: string;
      deg: number;
      r: number;
      width: number;
      height: number;
      opacity: number;
      dop: number;
      x: number;
      y: number;
      xmax: number;
      ymax: number;
      vx: number;
      vy: number;

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
      confetti = new Array(NUM_CONFETTI).fill(null).map(() => new Confetti());
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

    canvas = document.getElementById('world') as HTMLCanvasElement;
    context = canvas.getContext('2d')!;
    resizeWindow();
    startConfetti();

    return () => {
      window.removeEventListener('resize', resizeWindow);
      document.removeEventListener('mousemove', () => { });
    };
  }, [displayStage]);

  return (
    <div className="podium-container">
      <Title text="" className="site-title" size={"md"} />
      {displayStage === 1 && <Title text={`Third place with ${third.points} points is ${third.name}!`} className="site-title" size={"md"} />}
      {displayStage === 2 && <Title text={`Second place with ${second.points} points is ${second.name}!`} className="site-title" size={"md"} />}
      {displayStage === 3 && <Title text={`And in first place with ${first.points} points is ${first.name}!`} className="site-title" size={"md"} />}
      {displayStage >= 4 && <Title text="Congratulations!" className="site-title" size={"md"} />}
      <div className="podium">
        <div className="second-container">
          <div className="second-name">{displayStage >= 3 ? second.name : "..."}</div>
          <div className="second-rectangle">
            <div className="details-two">
              <div>{displayStage >= 3 ? `${second.points} Pts.` : ""}</div>
            </div>
            <div className="rank-two">2</div>
          </div>
        </div>
        <div className="first-container">
          <div className="first-name">{displayStage >= 4 ? first.name : "..."}</div>
          <div className="first-rectangle">
            <div className="details-one">
              <div>{displayStage >= 4 ? `${first.points} Pts.` : ""}</div>
            </div>
            <div className="rank-one">1</div>
          </div>
        </div>
        <div className="third-container">
          <div className="third-name">{displayStage >= 2 ? third.name : "..."}</div>
          <div className="third-rectangle">
            <div className="details-three">
              <div>{displayStage >= 2 ? `${third.points} Pts.` : ""}</div>
            </div>
            <div className="rank-three">3</div>
          </div>
        </div>
      </div>
      <canvas id="world"></canvas>
    </div>
  );
};

export default Podium;
