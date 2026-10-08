/* ==========================================================================
   CONTACT FORM & TOAST NOTIFICATION HANDLER
   ========================================================================== */

function showToast(message, icon = '✓') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const currentLang = localStorage.getItem('appLang') || 'id';
    const msg = portfolioData.translations[currentLang].copiedToast || "Berhasil disalin!";
    showToast(msg, '📋');
  }).catch(err => {
    console.error('Gagal menyalin:', err);
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Simulate sending loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: rotateBorder 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2 a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Sending...</span>
    `;

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      const currentLang = localStorage.getItem('appLang') || 'id';
      const msg = portfolioData.translations[currentLang].formSuccessToast || "Pesan Anda berhasil terkirim!";
      showToast(msg, '🎉');
    }, 1200);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});
