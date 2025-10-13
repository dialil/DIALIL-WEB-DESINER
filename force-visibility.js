// FORCE VISIBILITÉ JAVASCRIPT
function forceWhiteText() {
  if (document.documentElement.classList.contains('dark')) {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      if (!el.classList.contains('text-orange-500') && 
          !el.classList.contains('text-blue-400')) {
        el.style.color = 'white';
      }
    });
  }
}

// Exécuter immédiatement et à chaque changement
forceWhiteText();
setInterval(forceWhiteText, 100);

// Observer les changements de classe
new MutationObserver(forceWhiteText).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
});