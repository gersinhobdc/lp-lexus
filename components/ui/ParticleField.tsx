"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

/**
 * Rede de partículas animada estilo "circuitos / conexões inteligentes".
 * Canvas-based para performance. Respeita prefers-reduced-motion e pausa
 * quando a aba não está visível.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let running = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildParticles = () => {
      // Densidade adaptativa: menos partículas no mobile
      const area = width * height;
      const count = Math.min(Math.floor(area / 16000), width < 768 ? 34 : 80);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        size: Math.random() * 1.6 + 0.6,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const CONNECT_DIST = 130;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Atualiza posições
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // Linhas de conexão (efeito circuito)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.32;
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nós (partículas)
      for (const p of particles) {
        ctx.fillStyle = "rgba(34, 197, 94, 0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) rafId = requestAnimationFrame(draw);
    };

    resize();

    if (reduceMotion) {
      // Render estático único
      draw();
      running = false;
      cancelAnimationFrame(rafId);
    } else {
      draw();
    }

    const handleResize = () => resize();
    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!reduceMotion) {
        running = true;
        rafId = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
