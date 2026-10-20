import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  blinkSpeed: number;
  blinkOffset: number;
  colorType: 'green' | 'gold' | 'mint';
}

export const FloatingParticles: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse interaction coordinates
    const mouse = { x: -1000, y: -1000, radius: 120 };
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // Initialize 60 organic floating particles
    const particleCount = 60;
    const particles: Particle[] = [];
    const colorTypes: ('green' | 'gold' | 'mint')[] = ['green', 'gold', 'mint'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.2 - Math.random() * 0.4, // Floating gently upwards
        radius: 1.5 + Math.random() * 3.5,
        baseAlpha: 0.25 + Math.random() * 0.55,
        alpha: 0.3,
        blinkSpeed: 0.015 + Math.random() * 0.03,
        blinkOffset: Math.random() * Math.PI * 2,
        colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)],
      });
    }

    let time = 0;
    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        // Move particle with gentle horizontal sway
        p.y += p.vy;
        p.x += p.vx + Math.sin(time + idx) * 0.25;

        // Wrap around boundaries
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Mouse avoidance / nudge
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 2.5;
          p.y += (dy / dist) * force * 2.5;
        }

        // Twinkle opacity
        p.alpha = p.baseAlpha + Math.sin(time * 2 + p.blinkOffset) * 0.25;
        const clampedAlpha = Math.max(0.1, Math.min(0.95, p.alpha));

        // Determine particle color palette based on theme & type
        let colorStr = '';
        let glowColor = '';
        if (isDark) {
          // Bioluminescent Fireflies / Glowing Spores for Dark Mode
          if (p.colorType === 'green') {
            colorStr = `rgba(139, 207, 139, ${clampedAlpha})`;
            glowColor = `rgba(77, 153, 84, ${clampedAlpha * 0.6})`;
          } else if (p.colorType === 'gold') {
            colorStr = `rgba(250, 204, 21, ${clampedAlpha * 0.9})`;
            glowColor = `rgba(234, 179, 8, ${clampedAlpha * 0.5})`;
          } else {
            colorStr = `rgba(74, 222, 128, ${clampedAlpha})`;
            glowColor = `rgba(34, 197, 94, ${clampedAlpha * 0.5})`;
          }
        } else {
          // Fresh Dew Drops / Sunlit Pollen for Light Mode
          if (p.colorType === 'green') {
            colorStr = `rgba(77, 153, 84, ${clampedAlpha * 0.75})`;
            glowColor = `rgba(139, 207, 139, ${clampedAlpha * 0.35})`;
          } else if (p.colorType === 'gold') {
            colorStr = `rgba(217, 119, 6, ${clampedAlpha * 0.7})`;
            glowColor = `rgba(245, 158, 11, ${clampedAlpha * 0.3})`;
          } else {
            colorStr = `rgba(139, 207, 139, ${clampedAlpha * 0.85})`;
            glowColor = `rgba(167, 243, 208, ${clampedAlpha * 0.4})`;
          }
        }

        // Draw soft glowing aura
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.8);
        gradient.addColorStop(0, colorStr);
        gradient.addColorStop(0.5, glowColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = colorStr;
        ctx.fill();
      });

      // Draw faint connections between very close particles (botanical mesh)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 55) {
            const lineAlpha = (1 - dist / 55) * 0.15;
            ctx.strokeStyle = isDark 
              ? `rgba(139, 207, 139, ${lineAlpha})` 
              : `rgba(77, 153, 84, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
};
