// Connect App JavaScript
class ConnectApp {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'vi';
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.applyTheme();
    this.applyLanguage();
    this.hideLoadingScreen();
    this.animateElements();
    this.countUpStats();
  }

  // Setup all event listeners
  setupEventListeners() {
    // Language toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.changeLanguage(e.target.dataset.lang);
      });
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Prevent context menu on images
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('contextmenu', (e) => e.preventDefault());
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.contact-card, .action-btn').forEach(element => {
      element.addEventListener('click', (e) => this.createRipple(e, element));
    });
  }

  // Hide loading screen
  hideLoadingScreen() {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
      }
    }, 1000);
  }

  // Theme management
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    localStorage.setItem('theme', this.currentTheme);
    
    // Animate theme icon
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
      icon.style.transform = 'scale(0)';
      setTimeout(() => {
        icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        icon.style.transform = 'scale(1)';
      }, 150);
    }
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
      icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }

  // Language management
  changeLanguage(lang) {
    this.currentLang = lang;
    this.applyLanguage();
    localStorage.setItem('language', lang);
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  applyLanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[this.currentLang] && translations[this.currentLang][key]) {
        element.textContent = translations[this.currentLang][key];
      }
    });
  }

  // Animations
  animateElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.contact-card, .stat-card').forEach((element, index) => {
      element.style.opacity = '0';
      element.style.animationDelay = `${index * 0.1}s`;
      observer.observe(element);
    });
  }

  // Count up animation for stats
  countUpStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const increment = target / 50;
      let current = 0;
      
      const updateCount = () => {
        if (current < target) {
          current += increment;
          stat.textContent = Math.ceil(current);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };
      
      // Start animation when element is in view
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCount();
          observer.unobserve(stat);
        }
      });
      
      observer.observe(stat);
    });
  }

  // Create ripple effect
  createRipple(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
}

// Translation data
const translations = {
  vi: {
    'title': 'AI Engineer | Developer',
    'bio': 'Xin chào! Mình là Tùng, Hãy kết nối với mình nhé! 🚀',
    'location': 'Hà Nội, Việt Nam',
    'years-coding': 'Năm lập trình',
    'projects': 'Dự án',
    'technologies': 'Công nghệ',
    'connect-title': 'Kết Nối Với Mình',
    'scan-qr': 'Kết nối tới Zalo',
    'call-me': 'Gọi cho mình',
    'download-vcard': 'Tải danh thiếp',
    'share-profile': 'Chia sẻ trang',
    'zalo-qr-title': 'Quét mã để thêm Zalo',
    'qr-instruction': 'Mở Zalo → Quét mã QR để kết bạn. Hoặc:',
    'zalo-add-now': 'Gửi yêu cầu ngay',
    'footer-text': '© 2024 Phạm Thanh Tùng. Made with ❤️',
    'copied': 'Đã sao chép!',
    'profile-shared': 'Đã chia sẻ link!',
    'vcf-desc': 'Lưu vào danh bạ',
    'qr-desc': 'Ảnh mã QR liên hệ',
    'home-desc': 'Thêm vào màn hình chính',
    'txt-desc': 'File text thông tin',
    'saved': 'Đã lưu!',
    'downloading': 'Đang tải xuống...',
    'pwa-instructions': 'iOS: Nhấn nút Share > Add to Home Screen\nAndroid: Menu ⋮ > Add to Home Screen'
  },
  en: {
    'title': 'AI Engineer | Developer',
    'bio': 'Hello! I\'m Tung, let\'s connect! 🚀',
    'location': 'Hanoi, Vietnam',
    'years-coding': 'Years coding',
    'projects': 'Projects',
    'technologies': 'Technologies',
    'connect-title': 'Connect With Me',
    'scan-qr': 'Connect to Zalo',
    'call-me': 'Call me',
    'download-vcard': 'Download Contact',
    'share-profile': 'Share profile',
    'zalo-qr-title': 'Scan to add Zalo',
    'qr-instruction': 'Open Zalo → Scan QR code to connect. Or:',
    'zalo-add-now': 'Add friend now',
    'footer-text': '© 2024 Pham Thanh Tung. Made with ❤️',
    'copied': 'Copied!',
    'profile-shared': 'Profile link shared!',
    'vcf-desc': 'Save to contacts',
    'qr-desc': 'QR code image',
    'home-desc': 'Add to home screen',
    'txt-desc': 'Text file info',
    'saved': 'Saved!',
    'downloading': 'Downloading...',
    'pwa-instructions': 'iOS: Tap Share button > Add to Home Screen\nAndroid: Menu ⋮ > Add to Home Screen'
  }
};

// Utility functions
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Toggle Zalo QR modal
function toggleZaloQR() {
  const modal = document.getElementById('zaloModal');
  if (modal) {
    modal.classList.toggle('show');
    document.body.style.overflow = modal.classList.contains('show') ? 'hidden' : '';
  }
}

// Copy Discord username
function copyDiscord() {
  const discordUsername = 'username#0000'; // Replace with actual username
  navigator.clipboard.writeText(discordUsername).then(() => {
    showToast(app.currentLang === 'vi' ? 'Đã sao chép Discord!' : 'Discord copied!');
  });
}

// Share profile
function shareProfile() {
  if (navigator.share) {
    navigator.share({
      title: 'Phạm Thanh Tùng - Connect With Me',
      text: 'Connect with Tung - AI Engineer & Developer',
      url: window.location.href
    }).then(() => {
      showToast(translations[app.currentLang]['profile-shared']);
    }).catch(() => {});
  } else {
    // Fallback - copy URL
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast(translations[app.currentLang]['copied']);
    });
  }
}

// Download vCard
function downloadVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Phạm Thanh Tùng
N:Phạm;Thanh Tùng;;;
EMAIL:tungpham010203@gmail.com
TEL:+84xxxxxxxxx
URL:https://github.com/phamthanhtung35NB
NOTE:AI Engineer | Developer
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pham-thanh-tung.vcf';
  a.click();
  window.URL.revokeObjectURL(url);
  
  showToast(translations[app.currentLang]['saved']);
  toggleDownloadMenu();
}

// Toggle download menu
function toggleDownloadMenu() {
  const dropdown = document.querySelector('.dropdown');
  const menu = document.getElementById('downloadMenu');
  
  if (dropdown && menu) {
    const isOpen = menu.classList.contains('show');
    
    if (isOpen) {
      menu.classList.remove('show');
      dropdown.classList.remove('active');
    } else {
      menu.classList.add('show');
      dropdown.classList.add('active');
    }
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    const menu = document.getElementById('downloadMenu');
    const dropdown = document.querySelector('.dropdown');
    if (menu && dropdown) {
      menu.classList.remove('show');
      dropdown.classList.remove('active');
    }
  }
});

// Download QR Code
function downloadQRCode() {
  showToast(translations[app.currentLang]['downloading']);
  
  // Load QR code library dynamically
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
  script.onload = () => {
    // Create temporary div for QR code
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);
    
    // Generate QR code with contact info
    const qrData = `BEGIN:VCARD
VERSION:3.0
FN:Phạm Thanh Tùng
TEL:+84xxxxxxxxx
EMAIL:tungpham010203@gmail.com
URL:${window.location.href}
END:VCARD`;
    
    const qrcode = new QRCode(tempDiv, {
      text: qrData,
      width: 512,
      height: 512,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    
    setTimeout(() => {
      const canvas = tempDiv.querySelector('canvas');
      if (canvas) {
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'pham-thanh-tung-qr.png';
          a.click();
          URL.revokeObjectURL(url);
          document.body.removeChild(tempDiv);
          
          showToast(translations[app.currentLang]['saved']);
        });
      }
    }, 500);
  };
  document.head.appendChild(script);
  
  toggleDownloadMenu();
}

// Save to Home Screen (PWA)
let deferredPrompt;

// Listen for install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('Install prompt saved');
});

function saveToHomeScreen() {
  toggleDownloadMenu();
  
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast(translations[app.currentLang]['saved']);
      }
      deferredPrompt = null;
    });
  } else if (window.matchMedia('(display-mode: standalone)').matches) {
    // Already installed
    showToast('App đã được cài đặt!');
  } else {
    // Show manual instructions
    const message = translations[app.currentLang]['pwa-instructions'];
    
    // Create a custom modal for instructions
    const modal = document.createElement('div');
    modal.className = 'install-modal';
    modal.innerHTML = `
      <div class="install-modal-content">
        <h3>${app.currentLang === 'vi' ? 'Hướng dẫn cài đặt' : 'Installation Guide'}</h3>
        <pre>${message}</pre>
        <button onclick="this.closest('.install-modal').remove()">
          ${app.currentLang === 'vi' ? 'Đóng' : 'Close'}
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

// Download all info as text file
function downloadAllInfo() {
  const info = `PHẠM THANH TÙNG
AI Engineer | Developer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Email: tungpham010203@gmail.com
📱 Phone: +84xxxxxxxxx
📍 Location: Hà Nội, Việt Nam
🎓 Education: VNU-UET
📅 Born: 2004

SOCIAL LINKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Facebook: facebook.com/phamthanhtung35nb
💼 LinkedIn: linkedin.com/in/phamthanhtung35nb
💻 GitHub: github.com/phamthanhtung35NB
📱 Zalo: (Scan QR Code)
📷 Instagram: @username
🎮 Discord: username#0000

ABOUT ME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${translations[app.currentLang]['bio']}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated on: ${new Date().toLocaleString('vi-VN')}
Profile: ${window.location.href}`;

  const blob = new Blob([info], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pham-thanh-tung-info.txt';
  a.click();
  window.URL.revokeObjectURL(url);
  
  showToast(translations[app.currentLang]['saved']);
  toggleDownloadMenu();
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .contact-card, .action-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  /* Install Modal */
  .install-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
    backdrop-filter: blur(5px);
  }
  
  .install-modal-content {
    background: var(--bg-card);
    padding: 2rem;
    border-radius: 16px;
    max-width: 400px;
    width: 100%;
    box-shadow: var(--shadow-xl);
    text-align: center;
  }
  
  .install-modal-content h3 {
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .install-modal-content pre {
    background: var(--bg-hover);
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    white-space: pre-wrap;
    text-align: left;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .install-modal-content button {
    background: var(--gradient-1);
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .install-modal-content button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;
document.head.appendChild(style);

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new ConnectApp();
  
  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  }
});

// Prevent image drag
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});