// Formulaire avec Formspree
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  // Afficher l'état de chargement
  submitButton.textContent = "Envoi en cours...";
  submitButton.disabled = true;

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        alert("✅ Message envoyé avec succès ! Je vous répondrai rapidement.");
        form.reset();
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    })
    .catch(error => {
      alert("❌ Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement.");
      console.error('Erreur:', error);
    })
    .finally(() => {
      // Restaurer le bouton
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
});


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

// Observer les éléments de statistiques
document.addEventListener('DOMContentLoaded', () => {
  const statsElements = ['projectsCount', 'satisfactionRate', 'deliveryTime', 'performanceScore'];
  statsElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });
});
