/* ==========================================================================
   PARTICLE CANVAS BACKGROUND (Interactive Constellation Effect)
   ========================================================================== */

class ParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.particleCount = 50;
    this.maxDistance = 100;
    this.mouse = { x: null, y: null, radius: 150 };
    this.time = 0;

    this.init();
    this.animate();
    this.bindEvents();
  }

  init() {
    this.resize();
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseRadius: Math.random() * 1.2 + 0.8,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.35 + 0.15
      });
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    if (window.innerWidth < 768) {
      this.particleCount = 25;
    } else {
      this.particleCount = 50;
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.time += 0.02;
    
    // Check Theme accent color for particle tint
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim() || '#38bdf8';
    
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];

      p.x += p.vx + Math.sin(this.time + p.phase) * 0.15;
      p.y += p.vy + Math.cos(this.time + p.phase) * 0.15;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Floating pulsing radius
      let pulseRadius = Math.max(0.5, p.baseRadius + Math.sin(this.time * 1.5 + p.phase) * 0.5);

      // Draw particle dot with soft glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, pulseRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = accentColor;
      this.ctx.globalAlpha = p.alpha + Math.sin(this.time + p.phase) * 0.08;
      this.ctx.fill();

      // Mouse interactivity line
      if (this.mouse.x !== null && this.mouse.y !== null) {
        let dx = this.mouse.x - p.x;
        let dy = this.mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = accentColor;
          this.ctx.globalAlpha = (1 - dist / this.mouse.radius) * 0.18;
          this.ctx.stroke();
        }
      }

      // Connect nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        let p2 = this.particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.maxDistance) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = accentColor;
          this.ctx.globalAlpha = (1 - dist / this.maxDistance) * 0.07;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ParticleNetwork('particle-canvas');
});
