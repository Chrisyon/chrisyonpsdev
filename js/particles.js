/* ==========================================================================
   PARTICLE CANVAS BACKGROUND (Interactive Constellation Effect)
   ========================================================================== */

class ParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.particleCount = 70;
    this.maxDistance = 120;
    this.mouse = { x: null, y: null, radius: 160 };

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
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    if (window.innerWidth < 768) {
      this.particleCount = 35;
    } else {
      this.particleCount = 70;
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
    
    // Check Theme accent color for particle tint
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim() || '#00ff9d';
    
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = accentColor;
      this.ctx.globalAlpha = p.alpha;
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
          this.ctx.globalAlpha = (1 - dist / this.mouse.radius) * 0.4;
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
          this.ctx.globalAlpha = (1 - dist / this.maxDistance) * 0.15;
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
