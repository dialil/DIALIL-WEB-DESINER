// =========================
// CONFIGURATION PERFORMANCE
// =========================

// Configuration pour l'optimisation des performances
const PERFORMANCE_CONFIG = {
  // Lazy loading
  lazyLoading: {
    enabled: true,
    threshold: 0.1,
    rootMargin: '50px'
  },
  
  // Images
  images: {
    quality: 85,
    format: 'webp',
    fallback: 'jpg',
    sizes: {
      mobile: '480w',
      tablet: '768w',
      desktop: '1200w'
    }
  },
  
  // Animations
  animations: {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    mobileOptimized: window.innerWidth < 768,
    duration: 1000
  },
  
  // Cache
  cache: {
    version: '1.0.0',
    maxAge: 31536000, // 1 year
    strategies: {
      images: 'cache-first',
      css: 'cache-first',
      js: 'cache-first'
    }
  },
  
  // Preload
  preload: {
    critical: [
      'assets/images/logo.jpg',
      'assets/images/photo-coding.jpg',
      'css/style.css',
      'js/script.js'
    ],
    fonts: [],
    scripts: [
      'https://cdn.tailwindcss.com',
      'https://unpkg.com/aos@2.3.1/dist/aos.js'
    ]
  }
};

// Fonction pour optimiser les images
function optimizeImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Ajouter des attributs de performance
    img.setAttribute('decoding', 'async');
    img.setAttribute('loading', 'lazy');
    
    // Optimiser le format d'image si supporté
    if (supportsWebP()) {
      const src = img.src;
      if (src && src.includes('.jpg')) {
        img.src = src.replace('.jpg', '.webp');
        img.onerror = () => {
          img.src = src; // Fallback vers l'original
        };
      }
    }
  });
}

// Vérifier le support WebP
function supportsWebP() {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// Optimiser les polices
function optimizeFonts() {
  // Précharger les polices critiques
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
  fontLink.as = 'style';
  fontLink.onload = () => {
    fontLink.rel = 'stylesheet';
  };
  document.head.appendChild(fontLink);
}

// Optimiser les scripts
function optimizeScripts() {
  // Charger les scripts non critiques de manière asynchrone
  const nonCriticalScripts = [
    'https://unpkg.com/aos@2.3.1/dist/aos.js'
  ];
  
  nonCriticalScripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
}

// Optimiser les CSS
function optimizeCSS() {
  // Charger les CSS non critiques de manière asynchrone
  const nonCriticalCSS = [
    'https://unpkg.com/aos@2.3.1/dist/aos.css'
  ];
  
  nonCriticalCSS.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'style';
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  });
}

// Service Worker pour le cache
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker enregistré:', registration);
      })
      .catch(error => {
        console.log('Erreur Service Worker:', error);
      });
  }
}

// Initialiser les optimisations
function initPerformanceOptimizations() {
  // Optimiser les images
  optimizeImages();
  
  // Optimiser les polices
  optimizeFonts();
  
  // Optimiser les scripts
  optimizeScripts();
  
  // Optimiser les CSS
  optimizeCSS();
  
  // Enregistrer le Service Worker
  registerServiceWorker();
}

// Démarrer les optimisations quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
} else {
  initPerformanceOptimizations();
}

// Exporter pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PERFORMANCE_CONFIG,
    optimizeImages,
    optimizeFonts,
    optimizeScripts,
    optimizeCSS,
    registerServiceWorker,
    initPerformanceOptimizations
  };
}