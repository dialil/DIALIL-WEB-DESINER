// Google Analytics 4 Configuration
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Configuration de base
gtag('config', 'G-XXXXXXXXXX', {
  // Configuration pour le Sénégal
  'country': 'SN',
  'region': 'Africa',
  'language': 'fr',
  
  // Paramètres de performance
  'send_page_view': true,
  'anonymize_ip': true,
  'allow_google_signals': true,
  'allow_ad_personalization_signals': false,
  
  // Personnalisation des événements
  'custom_map': {
    'custom_parameter_1': 'service_type',
    'custom_parameter_2': 'project_value'
  }
});

// Événements personnalisés pour le portfolio
function trackContactForm() {
  gtag('event', 'contact_form_submit', {
    'event_category': 'engagement',
    'event_label': 'contact_form',
    'value': 1
  });
}

function trackServiceClick(serviceName) {
  gtag('event', 'service_click', {
    'event_category': 'engagement',
    'event_label': serviceName,
    'value': 1
  });
}

function trackPortfolioView(projectName) {
  gtag('event', 'portfolio_view', {
    'event_category': 'engagement',
    'event_label': projectName,
    'value': 1
  });
}

function trackPricingView(packageName) {
  gtag('event', 'pricing_view', {
    'event_category': 'conversion',
    'event_label': packageName,
    'value': 1
  });
}

// Événements de scroll pour mesurer l'engagement
let scrollDepth = 0;
window.addEventListener('scroll', function() {
  const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  
  if (scrollPercent > scrollDepth && scrollPercent % 25 === 0) {
    gtag('event', 'scroll_depth', {
      'event_category': 'engagement',
      'event_label': scrollPercent + '%',
      'value': scrollPercent
    });
    scrollDepth = scrollPercent;
  }
});

// Mesure du temps sur la page
let startTime = Date.now();
window.addEventListener('beforeunload', function() {
  const timeOnPage = Math.round((Date.now() - startTime) / 1000);
  gtag('event', 'time_on_page', {
    'event_category': 'engagement',
    'event_label': 'seconds',
    'value': timeOnPage
  });
});