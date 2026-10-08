/* ==========================================================================
   MAIN APPLICATION SCRIPT (Theme, Language, Typing Effect, Modals, Nav)
   ========================================================================== */

let currentLang = localStorage.getItem('appLang') || 'id';
let currentTheme = localStorage.getItem('appTheme') || 'dark';
let currentAccent = localStorage.getItem('appAccent') || 'cyan';

// 1. Language Manager
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('appLang', lang);
  document.documentElement.setAttribute('lang', lang);

  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.innerHTML = lang === 'id' ? '🌐 ID' : '🌐 EN';
  }

  // Translate all data-i18n elements
  const t = portfolioData.translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Re-render dynamic components if needed
  renderProjects();
  renderTimeline();
}

function toggleLanguage() {
  const nextLang = currentLang === 'id' ? 'en' : 'id';
  setLanguage(nextLang);
  showToast(nextLang === 'id' ? 'Bahasa diganti ke Bahasa Indonesia' : 'Language switched to English', '🌐');
}

// 2. Theme & Accent Color Manager
function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('appTheme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
}

function toggleTheme() {
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
}

function setAccent(accent) {
  currentAccent = accent;
  localStorage.setItem('appAccent', accent);
  document.documentElement.setAttribute('data-accent', accent);
}

// 3. Dynamic Typing Effect
class TypingEffect {
  constructor(elementId, roles) {
    this.element = document.getElementById(elementId);
    if (!this.element) return;
    this.roles = roles;
    this.roleIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typeSpeed = 90;
    this.deleteSpeed = 50;
    this.pauseDuration = 2000;
    this.type();
  }

  type() {
    const currentRole = this.roles[this.roleIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentRole.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.charIndex === currentRole.length) {
      delay = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      delay = 500;
    }

    setTimeout(() => this.type(), delay);
  }
}

// 4. Render Tech Stack & Skills
function renderSkills(filter = 'all') {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const filtered = filter === 'all' 
    ? portfolioData.skills 
    : portfolioData.skills.filter(s => s.category === filter);

  grid.innerHTML = filtered.map(skill => `
    <div class="glass-card skill-card">
      <div class="skill-header">
        <div class="skill-title">
          <span class="skill-icon">${skill.icon}</span>
          <strong>${skill.name}</strong>
        </div>
        <span style="color: var(--accent-cyan); font-weight: 700; font-family: var(--font-mono);">${skill.level}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress" style="width: ${skill.level}%;"></div>
      </div>
    </div>
  `).join('');
}

// 5. Render Featured Projects
function renderProjects(categoryFilter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = categoryFilter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === categoryFilter);

  grid.innerHTML = filtered.map(proj => `
    <div class="glass-card project-card">
      <div class="project-header-logo" style="background: ${proj.logoGradient};">
        <div class="code-logo-badge" style="border-color: ${proj.accentColor}55; box-shadow: 0 10px 30px ${proj.accentColor}25;">
          <span class="code-logo-icon">${proj.logoIcon}</span>
          <div class="code-logo-text-group">
            <span class="code-logo-main" style="color: ${proj.accentColor};">${proj.logoBadgeText}</span>
            <span class="code-logo-sub">${proj.logoSubtext}</span>
          </div>
        </div>
      </div>
      <div class="project-content">
        <div class="project-tags">
          ${proj.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.desc[currentLang] || proj.desc.id}</p>
      </div>
    </div>
  `).join('');
}

// 6. Render Timeline
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = portfolioData.timeline.map(item => `
    <div class="timeline-item">
      <div class="timeline-node"></div>
      <div class="glass-card timeline-card clickable-cert-card" onclick="openCertModal('${item.id}')" title="Klik untuk melihat dokumen sertifikat">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap;">
          <span class="timeline-date">${item.period}</span>
          ${item.badge ? `<span class="tag-pill" style="font-size: 0.75rem; border-color: var(--accent-cyan); color: var(--accent-cyan); margin-bottom: 0;">${item.badge}</span>` : ''}
        </div>
        <h3 class="timeline-role">${item.role}</h3>
        <div class="timeline-company">${item.company}</div>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 8px; line-height: 1.5;">${item.desc[currentLang] || item.desc.id}</p>
        <div class="cert-click-hint">
          <span>📜 Klik untuk lihat Sertifikat 🔍</span>
        </div>
      </div>
    </div>
  `).join('');
}

// 7. Modal Pop-up Manager
function openCertModal(id) {
  const item = portfolioData.timeline.find(t => t.id === id);
  if (!item || !item.certImage) return;

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  if (!modal || !modalBody) return;

  const encodedImg = encodeURI(item.certImage);

  modalBody.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 16px; border-bottom: 1px solid var(--card-border); padding-bottom: 12px; flex-wrap: wrap;">
      <div>
        <span class="tag-pill" style="border-color: var(--accent-cyan); color: var(--accent-cyan); font-size: 0.8rem; margin-bottom: 8px; display: inline-block;">${item.badge || 'Sertifikat Resmi'}</span>
        <h2 style="font-size: 1.4rem; color: var(--text-primary); margin-bottom: 4px; font-weight: 700;">${item.role}</h2>
        <p style="color: var(--accent-emerald); font-family: var(--font-mono); font-size: 0.9rem; font-weight: 600;">🏢 ${item.company} • ${item.period}</p>
      </div>
    </div>

    <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid var(--card-border); border-radius: var(--radius-md); padding: 12px; text-align: center; margin-bottom: 20px; box-shadow: inset 0 0 20px rgba(0,0,0,0.5);">
      <a href="${encodedImg}" target="_blank" title="Klik untuk memperbesar sertifikat di tab baru">
        <img src="${encodedImg}" alt="${item.certTitle}" style="max-width: 100%; max-height: 60vh; border-radius: 8px; object-fit: contain; box-shadow: 0 10px 30px rgba(0,0,0,0.6); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
      </a>
      <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 10px; font-family: var(--font-mono);">💡 Klik pada gambar sertifikat di atas untuk membuka ukuran penuh</div>
    </div>

    <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; font-size: 0.95rem; background: rgba(255,255,255,0.03); padding: 14px; border-radius: 8px; border-left: 3px solid var(--accent-cyan);">${item.desc[currentLang] || item.desc.id}</p>

    <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">
      <a href="${encodedImg}" target="_blank" class="btn btn-primary btn-sm">Buka Gambar Resolusi Penuh 🔍</a>
      <button onclick="closeModal()" class="btn btn-secondary btn-sm">Tutup ✕</button>
    </div>
  `;

  modal.classList.add('active');
}

function openProjectModal(id) {
  const proj = portfolioData.projects.find(p => p.id === id);
  if (!proj) return;

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const t = portfolioData.translations[currentLang];

  modalBody.innerHTML = `
    <div class="project-header-logo" style="margin-bottom: 24px; border-radius: var(--radius-md); height: 160px; background: ${proj.logoGradient || 'var(--gradient-primary)'};">
      <div class="project-logo-badge" style="width: 80px; height: 80px; font-size: 2.5rem;">${proj.logoIcon || '🚀'}</div>
    </div>
    <div class="project-tags" style="margin-bottom: 14px;">
      ${proj.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
    </div>
    <h2 style="font-size: 1.8rem; margin-bottom: 12px;">${proj.title}</h2>
    <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">${proj.desc[currentLang] || proj.desc.id}</p>
    <div style="display: flex; gap: 14px; flex-wrap: wrap;">
      ${proj.liveUrl && proj.liveUrl !== '#' ? `<a href="${proj.liveUrl}" target="_blank" class="btn btn-primary btn-sm">${t.btnLiveDemo} 🚀</a>` : ''}
      <button onclick="closeModal()" class="btn btn-secondary btn-sm">Tutup Modal ✕</button>
    </div>
  `;

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
}

// 8. Navigation & Scroll Spy
function initNavigation() {
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
      backToTop?.classList.add('visible');
    } else {
      header?.classList.remove('scrolled');
      backToTop?.classList.remove('visible');
    }

    // Scroll spy active tab link
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
  }

  // Back to top click
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setTheme(currentTheme);
  setAccent(currentAccent);
  setLanguage(currentLang);
  
  new TypingEffect('typing-text', portfolioData.typingRoles);
  renderSkills();
  renderProjects();
  renderTimeline();
  initNavigation();

  // Skill filter listeners
  document.querySelectorAll('#skills-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#skills-filter .filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderSkills(e.target.getAttribute('data-filter'));
    });
  });

  // Project filter listeners
  document.querySelectorAll('#projects-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#projects-filter .filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProjects(e.target.getAttribute('data-filter'));
    });
  });

  // Project/Cert modal backdrop click close
  const modalOverlay = document.getElementById('project-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
});
