document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS (Animate On Scroll)
    // This library is used for scroll animations
    AOS.init({
        duration: 800,
        once: true, 
        easing: 'ease-in-out', 
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a');

    const onScroll = () => {

        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; 
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', onScroll);
    
});

// ===== COOKIE BANNER =====
window.addEventListener('load', function() {
  var decision = localStorage.getItem('cookieDecision');
  if (!decision) {
    document.getElementById('cookieBanner').style.display = 'flex';
  }
});

function aceptarCookies() {
  localStorage.setItem('cookieDecision', 'aceptado');
  document.getElementById('cookieBanner').style.display = 'none';
}

function rechazarCookies() {
  localStorage.setItem('cookieDecision', 'rechazado');
  document.getElementById('cookieBanner').style.display = 'none';
}

