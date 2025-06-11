/* aniamciones logo texto */
window.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo");
    const text = logo.textContent;
    logo.innerHTML = "";

    // Separar el texto en letras
    text.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        logo.appendChild(span);
    });

    const letters = logo.querySelectorAll("span");
    const menuItems = document.querySelectorAll(".menu-item");

    // Animación de logo: Impulso hacia arriba con expansión
    gsap.from(letters, {
        y: 30,
        opacity: 0,
        scale: 0.8,
        duration: 0.1,
        ease: "power3.out",
        stagger: 0.05,
        onComplete: () => {
            // Activar animación del menú solo cuando el logo termine
            gsap.to(menuItems, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power1.out",
                stagger: 0.1
            });
        }
    });

    // Animación al hacer hover sobre el logo
    logo.addEventListener("mouseenter", () => {
        gsap.to(letters, {
            y: -5,
            scale: 1.1,
            duration: 0.3,
            ease: "power1.out",
            stagger: 0.05
        });
    });

    logo.addEventListener("mouseleave", () => {
        gsap.to(letters, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power1.out",
            stagger: 0.05
        });
    });
});

/* heroLogo */
window.addEventListener("DOMContentLoaded", () => {
    gsap.from(".logo-img", {
        opacity: 0,
        y: -50,
        scale: 0.8,
        duration: 1.5,
        ease: "power2.out"
    });
});

// SplitType inicialización
const text = new SplitType('.hero-title', { types: "words, chars" });
const colores = ["#e87013", "#1f2780"]; // Naranja y azul
const colorFinal = "#f4f4f4"; // Blanco final

const colorAleatorio = () => colores[Math.floor(Math.random() * colores.length)];

// Desactivar hover inicialmente
let hoverHabilitado = false;

// Animación de las letras
text.chars.forEach((char, index) => {
    let charsTl = gsap.timeline();

    // Animación de entrada de las letras
    charsTl.from(char, {
        y: gsap.utils.random(-20, 20), // Movimientos más sutiles
        x: gsap.utils.random(-50, 50),
        rotate: gsap.utils.random(-15, 15), // Menos rotación
        scale: gsap.utils.random(0.9, 1.1),
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: index * 0.05, // Desfase entre cada letra
    });

    // Cambio de color
    charsTl.from(char, {
        color: colorAleatorio(),
        duration: 1,
    }, "-=.5");

    // Asegurarse que quede en blanco al final
    charsTl.to(char, {
        color: colorFinal,
        duration: 0.2,
        onComplete: () => {
            if (index === text.chars.length - 1) {
                hoverHabilitado = true; // Habilitar hover una vez que todas las letras hayan animado
            }
        }
    });

    // Efecto de hover
    function charsHover() {
        if (!hoverHabilitado) return; // Si la animación no terminó, no hacer nada

        gsap.timeline()
            .to(char, {
                y: gsap.utils.random(-5, 5),
                x: gsap.utils.random(-5, 5),
                rotate: gsap.utils.random(-5, 5),
                scale: gsap.utils.random(0.95, 1.05),
                duration: 0.4,
                ease: "power1.out",
                color: colorAleatorio(),
                onStart: () => {
                    char.removeEventListener("mouseenter", charsHover);
                }
            })
            .to(char, {
                y: 0,
                x: 0,
                rotate: 0,
                scale: 1,
                color: colorFinal, // Asegura que vuelva a blanco
                delay: 0.5,
                duration: 0.3,
                ease: "power1.out",
                onComplete: () => {
                    setTimeout(() => {
                        char.addEventListener("mouseenter", charsHover); // Rehabilitar hover
                    }, 200);
                }
            });
    }

    // Agregar el evento de hover
    char.addEventListener("mouseenter", charsHover);
});

// Animación del texto hero (subtítulo)
const heroText = new SplitType('.hero-text', { types: "words" });

gsap.from(heroText.words, {
    opacity: 0,
    y: 20,
    stagger: 0.05, // Efecto con poco retraso
    duration: 0.5,
    ease: "power2.out",
});

/* hero stats */
// Dividir números y textos
const statNumbers = new SplitType(".number", { types: "chars" });
const statTexts = new SplitType(".text", { types: "words" });

// Animar números (caracteres)
gsap.from(statNumbers.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.05,
    duration: 0.5,
    ease: "power2.out"
});

// Animar textos (palabras)
gsap.from(statTexts.words, {
    opacity: 0,
    y: 20,
    stagger: 0.08,
    duration: 0.5,
    ease: "power2.out"
});

/* hero stat hover */
const heroStats = document.querySelectorAll(".hero-stat");

heroStats.forEach((stat) => {
    const bg = stat.querySelector(".hover-bg");

    stat.addEventListener("mouseenter", () => {
        gsap.to(bg, {
            scaleY: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    stat.addEventListener("mouseleave", () => {
        gsap.to(bg, {
            scaleY: 0,
            duration: 0.4,
            ease: "power2.in"
        });
    });
});

/* services items */
gsap.registerPlugin(ScrollTrigger);

// Inicializar las tarjetas con opacity 0 y scale reducido
gsap.utils.toArray(".hero-services-item").forEach((item) => {
    gsap.set(item, { opacity: 0, scale: 0.8, y: 60 }); // Visibilidad inicial

    // Crear timeline de ScrollTrigger para cada tarjeta
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 40%",
            scrub: true,
            onEnter: () => animateIn(item),
            onLeaveBack: () => animateOut(item),
            onLeave: () => animateOut(item),
            onEnterBack: () => animateIn(item),
        }
    });

    function animateIn(el) {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.out"
        });
    }

    function animateOut(el) {
        gsap.to(el, {
            opacity: 0,
            y: 30,
            scale: 0.6,
            duration: 0.8,
            ease: "power3.in"
        });
    }
});

// Forzar recalcular el ScrollTrigger tras la carga
gsap.delayedCall(0.1, () => ScrollTrigger.refresh());

// Animación de pop en hover services CTA
const button = document.querySelector('.btn-pop');

button.addEventListener('mouseenter', () => {
    gsap.to(button, {
        scale: 1.1,  // Un escalado más pequeño
        duration: 0.1, // Duración muy rápida
        ease: "ease.inOut", // Efecto suave
    });
});

// Vuelve al tamaño original al salir del hover
button.addEventListener('mouseleave', () => {
    gsap.to(button, {
        scale: 1,  // Vuelve al tamaño original
        duration: 0.1, // Duración rápida
        ease: "ease.inOut", // Efecto suave
    });
});

// Regresa al tamaño original al salir del hover
button.addEventListener('mouseleave', () => {
    gsap.to(button, {
        scale: 1, // Vuelve al tamaño original
        duration: 0.2,
        ease: "back.in(1.7)", // Retroceso suave
    });
});

// Scroll horizontal 
const scrollInner = document.querySelector(".scrollInner");
const totalScroll = scrollInner.scrollWidth - window.innerWidth;

gsap.to(scrollInner, {
    x: () => -totalScroll,
    ease: "none",
    scrollTrigger: {
        trigger: ".scrollSection",
        start: "top top",
        end: () => `+=${scrollInner.scrollWidth}`,
        scrub: 2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
    }
});

/* animacion paginas de servicios */

const images = document.querySelectorAll('.imageGroup img');

images.forEach((img) => {
    img.addEventListener('mouseenter', () => {
        // Imagen actual al frente + sin blur
        gsap.to(img, {
            scale: 1.1,
            zIndex: 10,
            filter: "blur(0px)",
            boxShadow: "0 0 25px 1px #e87013",
            duration: 0.2
        });

        // Otras imágenes con blur
        images.forEach((otherImg) => {
            if (otherImg !== img) {
                gsap.to(otherImg, {
                    filter: "blur(2px)",
                    duration: 0.2
                });
            }
        });
    });

    img.addEventListener('mouseleave', () => {
        // Volver a estado normal
        const index = [...img.parentElement.children].indexOf(img) + 1;

        gsap.to(img, {
            scale: 1,
            zIndex: index,
            boxShadow: "none",
            filter: "blur(0px)",
            duration: 0.2
        });

        // Quitar blur de todas
        images.forEach((otherImg, i) => {
            gsap.to(otherImg, {
                filter: "blur(0px)",
                zIndex: i + 1,
                duration: 0.2
            });
        });
    });
});


/* animaciones de video */
gsap.registerPlugin(ScrollTrigger);

const videoContainer = document.querySelector('.videoContainer');
const videoButtonsContainer = videoContainer.querySelector('.videoButtons');
const videoButtons = videoButtonsContainer.querySelectorAll('.mask-button');
const videoWrapper = videoContainer.querySelector('.videoWrapper');

// Inicialmente desplazamos los elementos fuera de pantalla
gsap.set(videoButtons, { x: -400, opacity: 0 });
gsap.set(videoWrapper, { x: 400, opacity: 0 });

ScrollTrigger.create({
  trigger: videoContainer,
  start: "top 70%",
  end: "bottom 50%",
  onEnter: () => {
    gsap.to(videoButtons, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "ease.inOut",
      stagger: 0.1 // ← Delay entre botones
    });

    gsap.to(videoWrapper, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "ease.inOut"
    });
  },
  onLeaveBack: () => {
    gsap.to(videoButtons, {
      x: -500,
      opacity: 0,
      duration: 1,
      ease: "ease.inOut",
      stagger: {
        each: 0.05,
        from: "end" // ← Para que salgan en orden inverso
      }
    });

    gsap.to(videoWrapper, {
      x: 500,
      opacity: 0,
      duration: 1,
      ease: "ease.inOut"
    });
  },
  onLeave: () => {
    gsap.to(videoButtons, {
      x: -500,
      opacity: 0,
      duration: 1,
      ease: "ease.inOut",
      stagger: {
        each: 0.05,
        from: "end"
      }
    });

    gsap.to(videoWrapper, {
      x: 500,
      opacity: 0,
      duration: 1,
      ease: "ease.inOut"
    });
  },
  onEnterBack: () => {
    gsap.to(videoButtons, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "ease.inOut",
      stagger: 0.1
    });

    gsap.to(videoWrapper, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "ease.inOut"
    });
  }
});
