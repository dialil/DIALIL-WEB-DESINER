// =========================
// ANIMATIONS AVANCÉES
// =========================

// Animation de typing pour le titre
function initTypingAnimation() {
  const typingElements = document.querySelectorAll('.typing-text');
  
  typingElements.forEach((element, index) => {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid #f97316';
    
    setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
          // Garder le curseur clignotant
          element.classList.add('typing-cursor');
        }
      }, 100);
    }, index * 1000);
  });
}

// Animation de particules flottantes avancées
function createFloatingParticles() {
  const hero = document.querySelector('header');
  if (!hero) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle particle-connect';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: ${['#f97316', '#3b82f6', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 4)]};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.7 + 0.3};
      animation-delay: ${Math.random() * 5}s;
      animation-duration: ${Math.random() * 3 + 2}s;
    `;
    hero.appendChild(particle);
  }
}

// Animation de scroll reveal avancée
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Ajouter un délai progressif pour un effet cascade
        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }, observerOptions);
  
  // Observer tous les éléments avec data-aos
  document.querySelectorAll('[data-aos]').forEach(el => {
    // Ajouter la classe d'animation de base
    if (el.getAttribute('data-aos') === 'fade-up') {
      el.classList.add('fade-in-up');
    } else if (el.getAttribute('data-aos') === 'fade-right') {
      el.classList.add('slide-in-left');
    } else if (el.getAttribute('data-aos') === 'fade-left') {
      el.classList.add('slide-in-right');
    } else if (el.getAttribute('data-aos') === 'zoom-in') {
      el.classList.add('zoom-in');
    }
    
    observer.observe(el);
  });
}

// Animation de hover avancée pour les cartes
function initCardAnimations() {
  const cards = document.querySelectorAll('.card-hover, article');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
      card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '';
    });
  });
}

// Animation de parallax pour le hero
function initParallaxEffect() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('header');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const aboutSection = document.querySelector('#about');
    
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Masquer l'indicateur de scroll quand on arrive à la section à propos
    if (scrollIndicator && aboutSection) {
      const aboutTop = aboutSection.offsetTop;
      const heroHeight = hero.offsetHeight;
      
      if (scrolled > heroHeight * 0.8) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateY(20px)';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translateY(0)';
      }
    }
  });
}

// Animation de loading pour les images
function initImageLoading() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.classList.add('image-loaded');
    });
  });
}

// =========================
// FORMULAIRE AVEC ANIMATIONS
// =========================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Animation de chargement
    submitButton.innerHTML = '<div class="loading-spinner"></div> Envoi en cours...';
    submitButton.disabled = true;
    submitButton.classList.add('pulse-glow-advanced');

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Animation de succès
          submitButton.innerHTML = '✅ Envoyé !';
          submitButton.style.background = 'linear-gradient(45deg, #10b981, #059669)';

          // Confetti animation
          createConfetti();

          setTimeout(() => {
            form.reset();
            submitButton.textContent = originalText;
            submitButton.style.background = '';
          }, 2000);
        } else {
          throw new Error('Erreur lors de l\'envoi');
        }
      })
      .catch(error => {
        // Animation d'erreur
        submitButton.innerHTML = '❌ Erreur';
        submitButton.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';

        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.style.background = '';
        }, 2000);

        console.error('Erreur:', error);
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.classList.remove('pulse-glow-advanced');
      });
  });
}

// Animation de confetti
function createConfetti() {
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

// CSS pour l'animation de confetti
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
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
`;
document.head.appendChild(confettiStyle);


// Burger menu
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("hidden");
    burger.setAttribute("aria-expanded", String(!isOpen));
  });
  // Fermer le menu en cliquant sur un lien
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// Animation des statistiques
function animateCounter(elementId, targetValue, suffix = '') {
  const element = document.getElementById(elementId);
  if (!element) return;

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

// Observer pour déclencher les animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      if (target.id === 'projectsCount') {
        animateCounter('projectsCount', 50, '+');
      } else if (target.id === 'satisfactionRate') {
        animateCounter('satisfactionRate', 100, '%');
      } else if (target.id === 'deliveryTime') {
        animateCounter('deliveryTime', 5, 'j');
      } else if (target.id === 'performanceScore') {
        animateCounter('performanceScore', 95, '+');
      }
    }
  });
}, { threshold: 0.5 });

// =========================
// OPTIMISATIONS MOBILES
// =========================

// Détection du type d'appareil
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Détection de l'orientation
function handleOrientationChange() {
  if (window.innerHeight > window.innerWidth) {
    document.body.classList.add('portrait');
    document.body.classList.remove('landscape');
  } else {
    document.body.classList.add('landscape');
    document.body.classList.remove('portrait');
  }
}

// Optimisation du scroll pour mobile
function optimizeScrollForMobile() {
  if (isMobile()) {
    let ticking = false;
    
    function updateScroll() {
      // Désactiver le parallax sur mobile pour les performances
      const hero = document.querySelector('header');
      if (hero) {
        hero.style.transform = 'none';
      }
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    });
  }
}

// Amélioration des interactions tactiles
function enhanceTouchInteractions() {
  if (isMobile()) {
    // Améliorer les boutons pour le tactile
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
}

// Préchargement des images critiques
function preloadCriticalImages() {
  const criticalImages = ['assets/images/logo.jpg', 'assets/images/photo-coding.jpg'];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// =========================
// MODE SOMBRE/CLAIR
// =========================

// Fonction pour basculer le mode sombre/clair
function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  
  if (isDark) {
    html.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
    updateModeText('Mode sombre');
  } else {
    html.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
    updateModeText('Mode clair');
  }
  
  // Animation de transition
  html.style.transition = 'all 0.5s ease-in-out';
  setTimeout(() => {
    html.style.transition = '';
  }, 500);
}

// Fonction pour mettre à jour le texte du mode
function updateModeText(text) {
  const modeText = document.getElementById('modeText');
  if (modeText) {
    modeText.textContent = text;
  }
}

// Fonction pour initialiser le mode sombre
function initDarkMode() {
  const savedMode = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedMode === 'true' || (savedMode === null && prefersDark)) {
    document.documentElement.classList.add('dark');
    updateModeText('Mode clair');
  } else {
    document.documentElement.classList.remove('dark');
    updateModeText('Mode sombre');
  }
}

// =========================
// OPTIMISATIONS PERFORMANCES
// =========================

// Lazy loading des images
function initLazyLoading() {
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

// Optimisation des animations pour mobile
function optimizeAnimationsForMobile() {
  if (window.innerWidth < 768) {
    // Désactiver les animations coûteuses sur mobile
    const expensiveElements = document.querySelectorAll('.floating-particle, .animate-gradient-x, .pulse-glow-advanced');
    expensiveElements.forEach(el => {
      el.style.animation = 'none';
      el.style.transition = 'none';
    });
  }
}

// Debounce pour les événements de scroll
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimisation du scroll avec debounce
const optimizedScrollHandler = debounce(() => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('header');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const aboutSection = document.querySelector('#about');
  
  if (hero && window.innerWidth > 768) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
  
  if (scrollIndicator && aboutSection) {
    const aboutTop = aboutSection.offsetTop;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled > heroHeight * 0.8) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.transform = 'translateY(20px)';
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.transform = 'translateY(0)';
    }
  }
}, 16); // ~60fps

// Préchargement des ressources critiques
function preloadCriticalResources() {
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

// Optimisation des performances
function initPerformanceOptimizations() {
  // Utiliser requestAnimationFrame pour les animations
  let ticking = false;
  
  function updateAnimations() {
    // Mettre à jour les animations ici
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateAnimations);
      ticking = true;
    }
  }
  
  // Optimiser les événements de scroll
  window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
  
  // Optimiser les événements de resize
  window.addEventListener('resize', debounce(() => {
    optimizeAnimationsForMobile();
  }, 250));
}

// =========================
// INITIALISATION
// =========================

// Observer les éléments de statistiques
document.addEventListener('DOMContentLoaded', () => {
  // Initialiser le mode sombre
  initDarkMode();
  
  // Optimisations de performance
  initPerformanceOptimizations();
  initLazyLoading();
  preloadCriticalResources();
  optimizeAnimationsForMobile();
  
  // Initialiser toutes les animations
  initTypingAnimation();
  createFloatingParticles();
  initScrollReveal();
  initCardAnimations();
  initImageLoading();
  
  // Optimisations mobiles
  handleOrientationChange();
  optimizeScrollForMobile();
  enhanceTouchInteractions();
  preloadCriticalImages();
  
  // Observer les statistiques
  const statsElements = ['projectsCount', 'satisfactionRate', 'deliveryTime', 'performanceScore'];
  statsElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });
  
  // Gestion de l'orientation
  window.addEventListener('orientationchange', () => {
    setTimeout(handleOrientationChange, 100);
  });
  
  // Gestion du redimensionnement
  window.addEventListener('resize', () => {
    handleOrientationChange();
  });
  
  // Event listeners pour les boutons de mode sombre
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
  
  if (darkModeToggleMobile) {
    darkModeToggleMobile.addEventListener('click', toggleDarkMode);
  }
});
