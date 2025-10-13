// FORCE VISIBILITÉ JAVASCRIPT - FOCUS SOUS-TEXTES
function forceWhiteText() {
  if (document.documentElement.classList.contains('dark')) {
    // Cibler spécifiquement les sous-textes
    const selectors = [
      '.text-sm',
      '.text-xs', 
      '.text-gray-300',
      '.text-gray-400',
      '.text-gray-500',
      '.text-gray-600',
      'article p',
      '.card-hover p',
      'section p',
      'p.text-center',
      'span',
      'div'
    ];
    
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('text-orange-500') && 
            !el.classList.contains('text-blue-400')) {
          el.style.setProperty('color', 'white', 'important');
          el.style.setProperty('opacity', '1', 'important');
        }
      });
    });
  }
}

// Exécuter immédiatement
forceWhiteText();

// Exécuter après chargement complet
window.addEventListener('load', forceWhiteText);

// Exécuter en continu
setInterval(forceWhiteText, 50);

// Observer les changements
new MutationObserver(forceWhiteText).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class'],
  subtree: true,
  childList: true
});