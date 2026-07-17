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

// ===== FORMULARIO DE CONTACTO =====
const formContact = document.getElementById('formContact');

if (formContact) {
    formContact.addEventListener('submit', async function(e) {
        //  Evita que el navegador redirija a Formspree
        e.preventDefault();

        //  Cambia el botón para indicar que está enviando
        const btnSubmit = document.getElementById('btn-submit');
        btnSubmit.textContent = 'Enviando...';
        btnSubmit.disabled = true;

        //  Recoge los datos del formulario
        const formData = new FormData(formContact);

        try {
            //  Envia los datos a Formspree en segundo plano
            const response = await fetch(formContact.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                //  Éxito: mostrar mensaje y limpiar formulario
                document.getElementById('form-success').style.display = 'block';
                document.getElementById('form-error').style.display = 'none';
                formContact.reset();
                btnSubmit.textContent = 'Mensaje Enviado ✅';


                setTimeout(function() {
                    btnSubmit.textContent = 'Enviar Mensaje';
                    btnSubmit.disabled = false;
                    document.getElementById('form-success').style.display = 'none';
                }, 3000);
            } else {
                //  Error del servidor
                throw new Error('Error del servidor');
            }
        } catch (error) {
            //  Error de red o servidor
            document.getElementById('form-error').style.display = 'block';
            document.getElementById('form-success').style.display = 'none';
            btnSubmit.textContent = 'Enviar Mensaje';
            btnSubmit.disabled = false;
        }
    });
}

