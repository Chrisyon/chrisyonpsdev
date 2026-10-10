/* ==========================================================================
   MAIN APPLICATION SCRIPT (Theme, Language, Typing Effect, Modals, Nav)
   ========================================================================== */

let currentLang = localStorage.getItem('appLang') || 'id';
let currentTheme = localStorage.getItem('appTheme') || 'dark';
let currentAccent = localStorage.getItem('appAccent') || 'emerald';

// 1. Language Manager
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('appLang', lang);
  document.documentElement.setAttribute('lang', lang);

  const langText = document.getElementById('lang-text');
  if (langText) {
    langText.textContent = lang.toUpperCase();
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
  showToast(nextLang === 'id' ? 'Bahasa diganti ke Bahasa Indonesia' : 'Language switched to English', '✓');
}

// 2. Theme & Accent Color Manager
function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('appTheme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.innerHTML = theme === 'dark' 
      ? `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
      : `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
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
// 5. Render Featured Projects
function renderProjects(categoryFilter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = categoryFilter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === categoryFilter);

  grid.innerHTML = filtered.map(proj => `
    <div class="glass-card project-card">
      <div class="project-header-logo" style="cursor: pointer;" onclick="openProjectModal('${proj.id}')">
        <div class="code-logo-badge" style="border-color: ${proj.accentColor || '#38bdf8'}33;">
          <span class="code-logo-icon" style="color: ${proj.accentColor || '#38bdf8'};">${proj.logoIcon}</span>
          <div class="code-logo-text-group">
            <span class="code-logo-main" style="color: ${proj.accentColor || '#38bdf8'};">${proj.logoBadgeText}</span>
            <span class="code-logo-sub">${proj.logoSubtext}</span>
          </div>
        </div>
      </div>
      <div class="project-content">
        <div class="project-tags">
          ${proj.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>
        <h3 class="project-title" style="cursor: pointer;" onclick="openProjectModal('${proj.id}')">${proj.title}</h3>
        <p class="project-desc">${proj.desc[currentLang] || proj.desc.id}</p>
        <div class="project-footer" style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 16px; margin-top: auto; flex-wrap: wrap; gap: 10px;">
          <button onclick="openProjectModal('${proj.id}')" class="btn btn-primary btn-sm" style="padding: 6px 14px; font-size: 0.82rem;">Detail Project & Spec</button>
          ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" class="project-link" style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent-cyan); text-decoration: none; display: flex; align-items: center; gap: 6px;">GitHub Source</a>` : ''}
        </div>
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
          <span>View Certificate File &rarr;</span>
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
        <p style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.9rem; font-weight: 600;">${item.company} • ${item.period}</p>
      </div>
    </div>

    <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid var(--card-border); border-radius: var(--radius-md); padding: 12px; text-align: center; margin-bottom: 20px; box-shadow: inset 0 0 20px rgba(0,0,0,0.5);">
      <a href="${encodedImg}" target="_blank" title="Klik untuk memperbesar sertifikat di tab baru">
        <img src="${encodedImg}" alt="${item.certTitle}" style="max-width: 100%; max-height: 60vh; border-radius: 8px; object-fit: contain; box-shadow: 0 10px 30px rgba(0,0,0,0.6); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
      </a>
      <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 10px; font-family: var(--font-mono);">Klik pada gambar sertifikat untuk membuka ukuran penuh</div>
    </div>

    <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; font-size: 0.95rem; background: rgba(255,255,255,0.03); padding: 14px; border-radius: 8px; border-left: 3px solid var(--accent-cyan);">${item.desc[currentLang] || item.desc.id}</p>

    <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">
      <a href="${encodedImg}" target="_blank" class="btn btn-primary btn-sm">Buka Gambar Full Resolution</a>
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
  if (!modal || !modalBody) return;

  const t = portfolioData.translations[currentLang];
  const featuresList = proj.details?.features ? (proj.details.features[currentLang] || proj.details.features.id) : null;

  let credentialsHtml = '';
  if (proj.details?.credentials) {
    credentialsHtml = `
      <div style="margin-top: 20px; margin-bottom: 20px;">
        <h4 style="font-size: 0.95rem; color: var(--accent-cyan); font-family: var(--font-mono); margin-bottom: 10px;">Demo Login Credentials:</h4>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left; background: rgba(0, 0, 0, 0.3); border-radius: 8px; overflow: hidden; border: 1px solid var(--card-border);">
            <thead>
              <tr style="background: rgba(56, 189, 248, 0.1); border-bottom: 1px solid var(--card-border);">
                <th style="padding: 8px 12px; color: var(--accent-cyan);">Role</th>
                <th style="padding: 8px 12px;">Username</th>
                <th style="padding: 8px 12px;">Password</th>
                <th style="padding: 8px 12px;">Hak Akses</th>
              </tr>
            </thead>
            <tbody>
              ${proj.details.credentials.map(c => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 8px 12px; font-weight: 700; color: var(--accent-cyan);">${c.role}</td>
                  <td style="padding: 8px 12px; font-family: var(--font-mono);">${c.user}</td>
                  <td style="padding: 8px 12px; font-family: var(--font-mono);">${c.pass}</td>
                  <td style="padding: 8px 12px; color: var(--text-secondary);">${c.access}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  modalBody.innerHTML = `
    <div class="project-header-logo" style="margin-bottom: 20px; border-radius: var(--radius-md); padding: 24px; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);">
      <div class="code-logo-badge" style="border-color: ${proj.accentColor || '#38bdf8'}33;">
        <span class="code-logo-icon" style="font-size: 1.4rem; font-weight: 800; font-family: var(--font-mono); color: ${proj.accentColor || '#38bdf8'};">${proj.logoIcon || 'PROJ'}</span>
        <div class="code-logo-text-group">
          <span class="code-logo-main" style="color: ${proj.accentColor || '#38bdf8'}; font-size: 1.4rem;">${proj.logoBadgeText || 'PROJECT'}</span>
          <span class="code-logo-sub">${proj.logoSubtext || ''}</span>
        </div>
      </div>
    </div>

    <div class="project-tags" style="margin-bottom: 14px;">
      ${proj.tags.map(tag => `<span class="tag-pill" style="border-color: var(--accent-cyan); color: var(--accent-cyan);">${tag}</span>`).join('')}
    </div>

    <h2 style="font-size: 1.6rem; margin-bottom: 12px; color: var(--text-primary); font-weight: 700;">${proj.title}</h2>

    <p style="color: var(--text-secondary); line-height: 1.65; margin-bottom: 20px; font-size: 0.95rem; background: rgba(255,255,255,0.03); padding: 14px; border-radius: 8px; border-left: 3px solid ${proj.accentColor || 'var(--accent-cyan)'};">
      ${proj.desc[currentLang] || proj.desc.id}
    </p>

    ${proj.details?.architecture ? `
      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.95rem; color: var(--accent-cyan); font-family: var(--font-mono); margin-bottom: 8px;">Arsitektur & Tech Stack:</h4>
        <p style="font-size: 0.9rem; color: var(--text-primary); font-family: var(--font-mono); background: rgba(0, 0, 0, 0.4); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--card-border);">
          ${proj.details.architecture}
        </p>
      </div>
    ` : ''}

    ${featuresList ? `
      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.95rem; color: var(--accent-cyan); font-family: var(--font-mono); margin-bottom: 10px;">Fitur Utama & Keunggulan Sistem:</h4>
        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px;">
          ${featuresList.map(f => `
            <li style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; padding-left: 8px;">
              • ${f}
            </li>
          `).join('')}
        </ul>
      </div>
    ` : ''}

    ${credentialsHtml}

    <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap; margin-top: 24px; border-top: 1px solid var(--card-border); padding-top: 16px;">
      ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" class="btn btn-primary btn-sm">GitHub Source Code</a>` : ''}
      ${proj.liveUrl && proj.liveUrl !== '#' ? `<a href="${proj.liveUrl}" target="_blank" class="btn btn-secondary btn-sm">${t.btnLiveDemo}</a>` : ''}
      <button onclick="closeModal()" class="btn btn-secondary btn-sm">Tutup ✕</button>
    </div>
  `;

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
}

// Dynamic Spotlight Mouse Follower (Brittany Chiang Signature)
function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim() || '#38bdf8';
    spotlight.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, ${accentColor}18, transparent 80%)`;
  });
}

// 8. Navigation & Scroll Spy
function initNavigation() {
  const backToTop = document.getElementById('back-to-top');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('section.content-section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }

    // Scroll spy active tab link
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        sidebarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Back to top click
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 9. Stat Counter Up Animation
function animateCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  statNumbers.forEach(el => {
    if (el.classList.contains('counted')) return;
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    el.classList.add('counted');

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 35);
  });
}

// 10. Interactive 3D Card Tilt Effect
function init3DTilt() {
  const cards = document.querySelectorAll('.project-card, .stat-card, .skill-card, .info-item');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

// Intersection Observer for Smooth Scroll Animations across all pages/sections
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    'section.content-section, .glass-card, .stat-card, .skill-card, .project-card, .timeline-item, .contact-card-link, .sticky-section-header'
  );

  revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        if (entry.target.classList.contains('stat-card') || entry.target.querySelector('.stat-number')) {
          animateCounters();
        }
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// 11. Laptop / Desktop Keyboard Section Navigation (ArrowUp & ArrowDown)
function initKeyboardNav() {
  const sections = Array.from(document.querySelectorAll('section.content-section[id]'));
  if (!sections.length) return;

  let isScrolling = false;

  window.addEventListener('keydown', (e) => {
    // Only activate on laptop/desktop screens (width >= 1024px)
    if (window.innerWidth < 1024) return;

    // Ignore if user is typing in form inputs, textareas, or modal is active
    const activeEl = document.activeElement;
    const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
    const modalActive = document.getElementById('project-modal')?.classList.contains('active');

    if (isInput || modalActive) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      navigateSection('down');
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      navigateSection('up');
    }
  });

  function navigateSection(direction) {
    if (isScrolling) return;

    const scrollY = window.pageYOffset + 120;
    let currentIndex = 0;

    sections.forEach((sec, idx) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollY >= top - 80 && scrollY < top + height) {
        currentIndex = idx;
      }
    });

    let targetIndex = currentIndex;
    if (direction === 'down') {
      targetIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else if (direction === 'up') {
      targetIndex = Math.max(currentIndex - 1, 0);
    }

    if (sections[targetIndex]) {
      isScrolling = true;
      const targetTop = sections[targetIndex].offsetTop - 20;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrolling = false;
      }, 500);
    }
  }
}

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setTheme(currentTheme);
  setAccent(currentAccent);
  setLanguage(currentLang);
  
  initSpotlight();
  renderSkills();
  renderProjects();
  renderTimeline();
  initNavigation();
  initKeyboardNav();

  // Initialize Typing Effect for Sidebar Role
  if (portfolioData.typingRoles) {
    new TypingEffect('sidebar-role-typing', portfolioData.typingRoles);
  }

  // Initialize Scroll Reveal Animations & 3D Tilt Effect
  setTimeout(() => {
    initScrollReveal();
    init3DTilt();
  }, 100);

  // Skill filter listeners
  document.querySelectorAll('#skills-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#skills-filter .filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderSkills(e.target.getAttribute('data-filter'));
      setTimeout(() => {
        initScrollReveal();
        init3DTilt();
      }, 50);
    });
  });

  // Project filter listeners
  document.querySelectorAll('#projects-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#projects-filter .filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProjects(e.target.getAttribute('data-filter'));
      setTimeout(() => {
        initScrollReveal();
        init3DTilt();
      }, 50);
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
