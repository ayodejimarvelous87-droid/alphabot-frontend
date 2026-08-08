"use client";

import { useEffect, useRef, useState } from "react";

export default function SuccessCelebration({
  show,
  message = "Transaction Successful!",
}) {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame;
    let rockets = [];
    let particles = [];

    const startTime = Date.now();
    const duration = 2500;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.alpha = 1;
        this.color = color;
        this.size = Math.random() * 2.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        this.vy += 0.08;
        this.vx *= 0.98;
        this.vy *= 0.98;

        this.alpha -= 0.025;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    class Rocket {
      constructor() {
        this.x =
          Math.random() * canvas.width * 0.8 +
          canvas.width * 0.1;

        this.y = canvas.height + 20;
        this.vy = -(10 + Math.random() * 4);

        this.targetY =
          canvas.height * (0.18 + Math.random() * 0.35);

        this.color = `hsl(${Math.random() * 360}, 100%, 65%)`;
        this.exploded = false;
      }

      update() {
        this.y += this.vy;
        this.vy += 0.08;

        if (this.y <= this.targetY) {
          this.explode();
          this.exploded = true;
        }
      }

      explode() {
        for (let i = 0; i < 70; i++) {
          particles.push(
            new Particle(this.x, this.y, this.color)
          );
        }
      }

      draw() {
        ctx.save();

        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;

        ctx.fillRect(this.x - 1, this.y, 2, 14);

        ctx.restore();
      }
    }

    const animate = () => {
      const elapsed = Date.now() - startTime;

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      if (
        elapsed < 1800 &&
        Math.random() < 0.08
      ) {
        rockets.push(new Rocket());
      }

      rockets = rockets.filter((rocket) => {
        rocket.update();

        if (!rocket.exploded) {
          rocket.draw();
          return true;
        }

        return false;
      });

      particles = particles.filter((particle) => {
        particle.update();

        if (particle.alpha > 0) {
          particle.draw();
          return true;
        }

        return false;
      });

      if (elapsed >= duration) {
        setVisible(false);
        return;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center animate-[successText_0.5s_ease-out]">
          <div className="text-5xl mb-3">
            🎉
          </div>

          <h2 className="text-3xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            Congratulations!
          </h2>

          <p className="mt-2 text-lg font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
            {message}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes successText {
          0% {
            transform: scale(0.4);
            opacity: 0;
          }

          60% {
            transform: scale(1.1);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
