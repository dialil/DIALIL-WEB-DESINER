// Configuration des performances pour le portfolio Dialil Dev

const PerformanceConfig = {
  // Configuration des animations
  animations: {
    // Désactiver les animations sur mobile pour les performances
    disableOnMobile: true,
    // Désactiver les animations si l'utilisateur préfère les réduire
    respectReducedMotion: true,
    // Délai d'initialisation des animations
    initDelay: 100,
    // Durée maximale des animations
    maxDuration: 1000
  },
  
  // Configuration du lazy loading
  lazyLoading: {
    // Délai avant de charger les images
    threshold: 0.1,
    // Root margin pour le chargement anticipé
    rootMargin: '50px',
    // Délai de fallback pour les navigateurs anciens
    fallbackDelay: 2000
  },
  
  // Configuration des images
  images: {
    // Qualité des images (0-100)
    quality: 85,
    // Format préféré (webp, jpeg, png)
    preferredFormat: 'webp',
    // Taille maximale des images
    maxWidth: 1920,
    maxHeight: 1080
  },
  
  // Configuration du cache
  cache: {
    // Durée de cache pour les ressources statiques (en secondes)
    staticResources: 31536000, // 1 an
    // Durée de cache pour le HTML (en secondes)
    html: 3600, // 1 heure
    // Durée de cache pour les API (en secondes)
    api: 300 // 5 minutes
  },
  
  // Configuration des performances
  performance: {
    // Seuil de performance (en ms)
    performanceThreshold: 100,
    // Délai d'initialisation des scripts non critiques
    nonCriticalScriptsDelay: 2000,
    // Préchargement des ressources critiques
    preloadCriticalResources: true,
    // Compression des données
    enableCompression: true
  },
  
  // Configuration mobile
  mobile: {
    // Désactiver les animations coûteuses
    disableExpensiveAnimations: true,
    // Réduire la qualité des images
    reduceImageQuality: true,
    // Limiter le nombre de particules
    maxParticles: 5,
    // Désactiver le parallax
    disableParallax: true
  },
  
  // Configuration des analytics
  analytics: {
    // Délai d'initialisation des analytics
    initDelay: 3000,
    // Événements à tracker
    trackEvents: [
      'contact_form_submit',
      'service_click',
      'portfolio_view',
      'pricing_view',
      'scroll_depth',
      'time_on_page'
    ],
    // Seuil de scroll pour tracker l'engagement
    scrollThresholds: [25, 50, 75, 100]
  }
};

// Fonction pour appliquer la configuration
function applyPerformanceConfig() {
  // Appliquer les optimisations selon la configuration
  if (PerformanceConfig.animations.disableOnMobile && window.innerWidth < 768) {
    document.body.classList.add('no-animations');
  }
  
  if (PerformanceConfig.mobile.disableExpensiveAnimations && window.innerWidth < 768) {
    const expensiveElements = document.querySelectorAll('.floating-particle, .animate-gradient-x, .pulse-glow-advanced');
    expensiveElements.forEach(el => {
      el.style.display = 'none';
    });
  }
  
  // Appliquer les optimisations d'images
  if (PerformanceConfig.mobile.reduceImageQuality && window.innerWidth < 768) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.imageRendering = 'optimizeSpeed';
    });
  }
}

// Fonction pour mesurer les performances avec gestion d'erreurs
function measurePerformance() {
  try {
    if ('performance' in window && performance.getEntriesByType) {
      const perfData = performance.getEntriesByType('navigation')[0];
      
      if (perfData) {
        // Mesurer le temps de chargement avec validation
        const loadTime = perfData.loadEventEnd && perfData.loadEventStart ? 
          perfData.loadEventEnd - perfData.loadEventStart : 0;
        const domContentLoaded = perfData.domContentLoadedEventEnd && perfData.domContentLoadedEventStart ?
          perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart : 0;
        
        // Envoyer les données d'analytics si configuré et gtag disponible
        if (PerformanceConfig.analytics.trackEvents.includes('performance_metrics') && 
            typeof gtag === 'function' && loadTime > 0) {
          gtag('event', 'performance_metrics', {
            'event_category': 'performance',
            'event_label': 'page_load',
            'value': Math.round(loadTime)
          });
        }
        
        // Afficher un warning si les performances sont mauvaises
        if (loadTime > PerformanceConfig.performance.performanceThreshold * 10) {
          console.warn('Performance dégradée détectée');
        }
      }
    }
  } catch (error) {
    console.error('Erreur lors de la mesure des performances');
  }
}

// Fonction pour optimiser les ressources avec gestion d'erreurs
function optimizeResources() {
  try {
    // Précharger les ressources critiques
    if (PerformanceConfig.performance.preloadCriticalResources) {
      const criticalResources = [
        'assets/images/logo.jpg',
        'assets/images/photo-coding.jpg',
        'css/style.css',
        'js/script.js'
      ];
      
      const fragment = document.createDocumentFragment();
      
      criticalResources.forEach(resource => {
        try {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = resource;
          
          if (resource.endsWith('.css')) {
            link.as = 'style';
          } else if (resource.endsWith('.js')) {
            link.as = 'script';
          } else if (resource.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            link.as = 'image';
          }
          
          fragment.appendChild(link);
        } catch (error) {
          console.error('Erreur lors du préchargement de la ressource');
        }
      });
      
      if (document.head) {
        document.head.appendChild(fragment);
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'optimisation des ressources');
  }
}

// Initialisation des optimisations avec gestion d'erreurs
document.addEventListener('DOMContentLoaded', () => {
  try {
    applyPerformanceConfig();
    optimizeResources();
    
    // Mesurer les performances après le chargement
    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          measurePerformance();
        } catch (error) {
          console.error('Erreur lors de la mesure des performances');
        }
      }, 1000);
    });
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des optimisations');
  }
});

// Export pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceConfig;
}