// =========================
// JAVASCRIPT OPTIMISÉ - DIALIL DEV
// =========================

// Configuration globale
const CONFIG = {
  animationDuration: 1000,
  scrollThreshold: 0.1,
  mobileBreakpoint: 768,
  debounceDelay: 16, // ~60fps
  stats: {
    projects: 50,
    satisfaction: 100,
    delivery: 5,
    performance: 95
  }
};

// =========================
// UTILITAIRES
// =========================

// Debounce function optimisée
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function pour les animations
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Détection d'appareil mobile
const isMobile = () => {
  return window.innerWidth < CONFIG.mobileBreakpoint || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Détection de l'orientation
const getOrientation = () => {
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};

// =========================
// GESTION DU MODE SOMBRE
// =========================

class DarkModeManager {
  constructor() {
    this.html = document.documentElement;
    this.toggleButtons = [
      document.getElementById('darkModeToggle'),
      document.getElementById('darkModeToggleMobile')
    ];
    this.modeText = document.getElementById('modeText');
    this.init();
  }

  init() {
    this.loadSavedMode();
    this.bindEvents();
    this.updateModeText();
  }

  loadSavedMode() {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'true' || (savedMode === null && prefersDark)) {
      this.html.classList.add('dark');
    } else {
      this.html.classList.remove('dark');
    }
  }

  toggle() {
    const isDark = this.html.classList.contains('dark');
    
    if (isDark) {
      this.html.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    } else {
      this.html.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    }
    
    this.updateModeText();
    this.animateTransition();
  }

  updateModeText() {
    if (this.modeText) {
      const isDark = this.html.classList.contains('dark');
      this.modeText.textContent = isDark ? 'Mode clair' : 'Mode sombre';
    }
  }

  animateTransition() {
    this.html.style.transition = 'all 0.5s ease-in-out';
    setTimeout(() => {
      this.html.style.transition = '';
    }, 500);
  }

  bindEvents() {
    this.toggleButtons.forEach(button => {
      if (button) {
        button.addEventListener('click', () => this.toggle());
      }
    });
  }
}

// =========================
// GESTION DES ANIMATIONS
// =========================

class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  init() {
    this.initScrollReveal();
    this.initTypingAnimation();
    this.initCounterAnimations();
    this.initCardAnimations();
  }

  initScrollReveal() {
    const observerOptions = {
      threshold: CONFIG.scrollThreshold,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
          setTimeout(() => {
            this.animateElement(entry.target);
          }, delay);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
      this.prepareElement(el);
      observer.observe(el);
    });
  }

  prepareElement(element) {
    const animationType = element.getAttribute('data-aos');
    const delay = element.getAttribute('data-aos-delay') || 0;
    
    element.style.transitionDelay = `${delay}ms`;
    
    switch (animationType) {
      case 'fade-up':
        element.classList.add('fade-in-up');
        break;
      case 'fade-right':
        element.classList.add('slide-in-left');
        break;
      case 'fade-left':
        element.classList.add('slide-in-right');
        break;
      case 'zoom-in':
        element.classList.add('zoom-in');
        break;
    }
  }

  animateElement(element) {
    element.classList.add('visible');
  }

  initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach((element, index) => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid #f97316';
      
      setTimeout(() => {
        this.typeText(element, text);
      }, index * 1000);
    });
  }

  typeText(element, text) {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        element.classList.add('typing-cursor');
      }
    }, 100);
  }

  initCounterAnimations() {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsElements = ['projectsCount', 'satisfactionRate', 'deliveryTime', 'performanceScore'];
    statsElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) statsObserver.observe(element);
    });
  }

  animateCounter(element) {
    const targetValue = CONFIG.stats[element.id.replace('Count', '').replace('Rate', '').replace('Time', '').replace('Score', '')];
    const suffix = element.id === 'satisfactionRate' ? '%' : 
                   element.id === 'deliveryTime' ? 'j' : 
                   element.id === 'projectsCount' ? '+' : '+';
    
    let currentValue = 0;
    const increment = targetValue / 100;
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      element.textContent = Math.floor(currentValue) + suffix;
    }, 20);
  }

  initCardAnimations() {
    const cards = document.querySelectorAll('.card-hover, article');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (!isMobile()) {
          card.style.transform = 'translateY(-10px) scale(1.02)';
          card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
      });
    });
  }
}

// =========================
// GESTION DU FORMULAIRE
// =========================

class FormManager {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    try {
      this.setLoadingState(submitButton);
      
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        this.setSuccessState(submitButton);
        this.createConfetti();
        setTimeout(() => {
          this.form.reset();
          this.resetButton(submitButton, originalText);
        }, 2000);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      this.setErrorState(submitButton);
      setTimeout(() => {
        this.resetButton(submitButton, originalText);
      }, 2000);
      console.error('Erreur:', error);
    }
  }

  setLoadingState(button) {
    button.innerHTML = '<div class="loading-spinner"></div> Envoi en cours...';
    button.disabled = true;
    button.classList.add('pulse-glow');
  }

  setSuccessState(button) {
    button.innerHTML = '✅ Envoyé !';
    button.style.background = 'linear-gradient(45deg, #10b981, #059669)';
  }

  setErrorState(button) {
    button.innerHTML = '❌ Erreur';
    button.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
  }

  resetButton(button, originalText) {
    button.textContent = originalText;
    button.style.background = '';
    button.disabled = false;
    button.classList.remove('pulse-glow');
  }

  createConfetti() {
    const colors = ['#f97316', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 1000;
        animation: confetti-fall 3s linear forwards;
      `;
      
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }
}

// =========================
// GESTION DE LA NAVIGATION
// =========================

class NavigationManager {
  constructor() {
    this.burger = document.getElementById('burger');
    this.mobileMenu = document.getElementById('mobileMenu');
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    if (this.burger && this.mobileMenu) {
      this.burger.addEventListener('click', () => this.toggleMobileMenu());
      
      // Fermer le menu en cliquant sur un lien
      this.mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.closeMobileMenu());
      });
    }
  }

  toggleMobileMenu() {
    const isOpen = this.mobileMenu.classList.toggle('hidden');
    this.burger.setAttribute('aria-expanded', String(!isOpen));
  }

  closeMobileMenu() {
    this.mobileMenu.classList.add('hidden');
    this.burger.setAttribute('aria-expanded', 'false');
  }
}

// =========================
// GESTION DU SCROLL
// =========================

class ScrollManager {
  constructor() {
    this.init();
  }

  init() {
    this.initParallax();
    this.initScrollIndicator();
    this.optimizeScrollForMobile();
  }

  initParallax() {
    if (isMobile()) return; // Désactiver le parallax sur mobile
    
    const scrollHandler = throttle(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('header');
      
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, CONFIG.debounceDelay);
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
  }

  initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const aboutSection = document.querySelector('#about');
    
    if (!scrollIndicator || !aboutSection) return;
    
    const scrollHandler = throttle(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('header');
      const heroHeight = hero ? hero.offsetHeight : 0;
      
      if (scrolled > heroHeight * 0.8) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateY(20px)';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translateY(0)';
      }
    }, CONFIG.debounceDelay);
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
  }

  optimizeScrollForMobile() {
    if (isMobile()) {
      // Désactiver les animations coûteuses sur mobile
      const expensiveElements = document.querySelectorAll('.floating-particle, .animate-gradient-x, .pulse-glow');
      expensiveElements.forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
      });
    }
  }
}

// =========================
// GESTION DES PERFORMANCES
// =========================

class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    this.initLazyLoading();
    this.preloadCriticalResources();
    this.optimizeImages();
  }

  initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback pour les navigateurs plus anciens
      images.forEach(img => img.classList.add('loaded'));
    }
  }

  preloadCriticalResources() {
    const criticalImages = [
      'assets/images/logo.jpg',
      'assets/images/photo-coding.jpg'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('image-loaded');
      });
      
      img.addEventListener('error', () => {
        console.warn('Erreur de chargement de l\'image:', img.src);
      });
    });
  }
}

// =========================
// GESTION DES INTERACTIONS TACTILES
// =========================

class TouchManager {
  constructor() {
    this.init();
  }

  init() {
    if (isMobile()) {
      this.enhanceTouchInteractions();
      this.handleOrientationChange();
    }
  }

  enhanceTouchInteractions() {
    const buttons = document.querySelectorAll('button, a');
    
    buttons.forEach(button => {
      button.addEventListener('touchstart', () => {
        button.style.transform = 'scale(0.95)';
      });
      
      button.addEventListener('touchend', () => {
        button.style.transform = 'scale(1)';
      });
    });
  }

  handleOrientationChange() {
    const updateOrientation = () => {
      const orientation = getOrientation();
      document.body.classList.toggle('portrait', orientation === 'portrait');
      document.body.classList.toggle('landscape', orientation === 'landscape');
    };
    
    updateOrientation();
    window.addEventListener('orientationchange', () => {
      setTimeout(updateOrientation, 100);
    });
    window.addEventListener('resize', updateOrientation);
  }
}

// =========================
// INITIALISATION PRINCIPALE
// =========================

class App {
  constructor() {
    this.init();
  }

  init() {
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  initializeApp() {
    try {
      // Initialiser tous les gestionnaires
      this.darkModeManager = new DarkModeManager();
      this.animationManager = new AnimationManager();
      this.formManager = new FormManager();
      this.navigationManager = new NavigationManager();
      this.scrollManager = new ScrollManager();
      this.performanceManager = new PerformanceManager();
      this.touchManager = new TouchManager();
      
      // Ajouter les styles CSS pour les animations
      this.addAnimationStyles();
      
      console.log('✅ Application initialisée avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation:', error);
    }
  }

  addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
      
      .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #f97316;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
        margin-right: 8px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .typing-cursor::after {
        content: '|';
        animation: blink 1s infinite;
      }
      
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// =========================
// DÉMARRAGE DE L'APPLICATION
// =========================

// Démarrer l'application
new App();

// =========================
// EXPORT POUR LES TESTS (si nécessaire)
// =========================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DarkModeManager,
    AnimationManager,
    FormManager,
    NavigationManager,
    ScrollManager,
    PerformanceManager,
    TouchManager,
    App
  };
}