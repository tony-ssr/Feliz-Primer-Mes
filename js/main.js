/* ====================================================================
   PÁGINA WEB ROMÁNTICA - PRIMER MES CON MARÍA ALEJANDRA
   JavaScript - Funcionalidades Interactivas
   Autor: Antony
   
   ÍNDICE:
   1. Variables Globales y Configuración
   2. Contador Completo (Días, Horas, Minutos, Segundos)
   3. Scroll Animations (Intersection Observer)
   4. Carrusel Automático
   5. Animación de Apertura de Carta
   6. Modal de Imágenes
   7. Reproductor de Música
   8. Inicialización
   ==================================================================== */

/* ====================================================================
   1. VARIABLES GLOBALES Y CONFIGURACIÓN
   ==================================================================== */

// Fecha de inicio de la relación (6 de diciembre de 2025)
const FECHA_INICIO = new Date('2025-12-06T00:00:00');

// Índice de la slide actual del carrusel
let currentSlide = 0;

// Intervalo del carrusel automático
let carouselInterval = null;

// Playlist de canciones
const playlist = [
    {
        title: 'Eres Tú',
        artist: 'M2H',
        file: 'assets/song/Eres Tú - M2H.mp3',
        cover: 'assets/song/Eres Tú  - M2H.png'
    },
    {
        title: 'Mi Bello Angel',
        artist: 'Natanael Cano',
        file: 'assets/song/Mi Bello Angel - Natanael Cano.mp3',
        cover: 'assets/song/Mi Bello Angel - Natanael Cano.png'
    },
    {
        title: 'Ninguna como ella',
        artist: 'Zona Ganjah',
        file: 'assets/song/Ninguna como ella - Zona Ganjah.mp3',
        cover: 'assets/song/Ninguna como ella - Zona Ganjah.png'
    },
    {
        title: 'Quiero',
        artist: 'Terrateniente',
        file: 'assets/song/Quiero - Terrateniente.mp3',
        cover: 'assets/song/Quiero - Terrateniente.png'
    }
];

// Índice de la canción actual
let currentSongIndex = 0;

// Estado de reproducción
let isPlaying = false;

/* ====================================================================
   2. CONTADOR COMPLETO (DÍAS, HORAS, MINUTOS, SEGUNDOS)
   Calcula y actualiza el tiempo transcurrido desde el inicio
   ==================================================================== */

function actualizarContador() {
    // Obtener la fecha y hora actual
    const ahora = new Date();

    // Calcular la diferencia en milisegundos
    const diferencia = ahora - FECHA_INICIO;

    // Convertir a diferentes unidades
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Actualizar los elementos en el DOM
    const daysEl = document.getElementById('daysCounter');
    const hoursEl = document.getElementById('hoursCounter');
    const minutesEl = document.getElementById('minutesCounter');
    const secondsEl = document.getElementById('secondsCounter');

    if (daysEl) daysEl.textContent = dias;
    if (hoursEl) hoursEl.textContent = horas;
    if (minutesEl) minutesEl.textContent = minutos;
    if (secondsEl) secondsEl.textContent = segundos;
}

/* ====================================================================
   3. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   Detecta cuando los elementos entran al viewport y aplica animaciones
   ==================================================================== */

function inicializarScrollAnimations() {
    // Configuración del observer
    const opciones = {
        threshold: 0.2, // El elemento debe estar al menos 20% visible
        rootMargin: '0px 0px -50px 0px' // Margen inferior para activación anticipada
    };

    // Callback que se ejecuta cuando un elemento intersecta
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento está visible
            if (entry.isIntersecting) {
                // Agregar la clase que activa la animación
                entry.target.style.opacity = '1';

                // Dejar de observar este elemento (animación solo una vez)
                observer.unobserve(entry.target);
            }
        });
    };

    // Crear el observer
    const observer = new IntersectionObserver(callback, opciones);

    // Seleccionar todos los elementos que tienen clases de animación
    const elementosAnimados = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right'
    );

    // Observar cada elemento
    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });
}

/* ====================================================================
   4. CARRUSEL AUTOMÁTICO
   Sistema completo de navegación de imágenes
   ==================================================================== */

// Función para cambiar a una slide específica
function cambiarSlide(index) {
    // Obtener todas las slides
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    // Validar que el índice esté dentro del rango
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    // Remover clase 'active' de todas las slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Agregar clase 'active' a la slide e indicador actuales
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Función para ir a la siguiente slide
function siguienteSlide() {
    cambiarSlide(currentSlide + 1);
}

// Función para ir a la slide anterior
function anteriorSlide() {
    cambiarSlide(currentSlide - 1);
}

// Función para iniciar el carrusel automático
function iniciarCarruselAutomatico() {
    // Cambiar de slide cada 4 segundos
    carouselInterval = setInterval(siguienteSlide, 4000);
}

// Función para detener el carrusel automático
function detenerCarruselAutomatico() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
}

// Función para inicializar el carrusel
function inicializarCarrusel() {
    // Botón siguiente
    const btnNext = document.getElementById('nextBtn');
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            siguienteSlide();
            // Reiniciar el intervalo automático
            detenerCarruselAutomatico();
            iniciarCarruselAutomatico();
        });
    }

    // Botón anterior
    const btnPrev = document.getElementById('prevBtn');
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            anteriorSlide();
            // Reiniciar el intervalo automático
            detenerCarruselAutomatico();
            iniciarCarruselAutomatico();
        });
    }

    // Indicadores (dots)
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            cambiarSlide(index);
            // Reiniciar el intervalo automático
            detenerCarruselAutomatico();
            iniciarCarruselAutomatico();
        });
    });

    // Soporte para gestos táctiles en móviles
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            // Swipe hacia la izquierda (siguiente)
            if (touchStartX - touchEndX > 50) {
                siguienteSlide();
                detenerCarruselAutomatico();
                iniciarCarruselAutomatico();
            }
            // Swipe hacia la derecha (anterior)
            if (touchEndX - touchStartX > 50) {
                anteriorSlide();
                detenerCarruselAutomatico();
                iniciarCarruselAutomatico();
            }
        }
    }

    // Iniciar carrusel automático
    iniciarCarruselAutomatico();
}

/* ====================================================================
   5. ANIMACIÓN DE APERTURA DE CARTA
   Click en el sobre para expandir la carta completa
   ==================================================================== */

function inicializarCarta() {
    const envelope = document.getElementById('simpleEnvelope');
    const modal = document.getElementById('letterModal');
    const closeBtn = document.getElementById('letterCloseBtn');
    const closeOverlay = document.getElementById('letterCloseOverlay');

    if (envelope && modal) {
        // Abrir carta al hacer click en el sobre
        envelope.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        });

        // Cerrar carta con el botón
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Restaurar scroll
            });
        }

        // Cerrar carta al hacer click en el overlay
        if (closeOverlay) {
            closeOverlay.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Restaurar scroll
            });
        }

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Restaurar scroll
            }
        });
    }
}

/* ====================================================================
   6. MODAL DE IMÁGENES
   Sistema para ver imágenes en tamaño completo
   ==================================================================== */

function inicializarModalImagenes() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.getElementById('modalClose');

    if (!modal || !modalImg) return;

    // Agregar evento click a todas las imágenes clickeables
    const imagenesClickeables = document.querySelectorAll(
        '.carousel-slide img, .polaroid-image img, .masonry-item img, .floating-image img'
    );

    imagenesClickeables.forEach(img => {
        img.addEventListener('click', (e) => {
            // Mostrar modal
            modal.classList.add('active');

            // Establecer la imagen en el modal
            modalImg.src = e.target.src;

            // Priorizar data-message personalizado, sino usar alt o caption
            let caption = e.target.getAttribute('data-message') || e.target.alt || '';

            // Si no hay data-message, intentar obtener caption de polaroid
            if (!e.target.getAttribute('data-message')) {
                const polaroidParent = e.target.closest('.polaroid');
                if (polaroidParent) {
                    const captionEl = polaroidParent.querySelector('.polaroid-caption');
                    if (captionEl) {
                        caption = captionEl.textContent;
                    }
                }
            }

            modalCaption.textContent = caption;
        });
    });

    // Cerrar modal al hacer click en el botón de cerrar
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Cerrar modal al hacer click fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

/* ====================================================================
   7. REPRODUCTOR DE MÚSICA
   Sistema completo de audio con controles
   ==================================================================== */

// Elementos del DOM del reproductor
let audioPlayer = null;
let playPauseBtn = null;
let prevBtn = null;
let nextBtn = null;
let progressBar = null;
let progressFill = null;
let currentTimeEl = null;
let durationEl = null;
let volumeSlider = null;
let albumArt = null;
let songTitle = null;
let songArtist = null;
let playerToggle = null;
let musicPlayer = null;

// Función para cargar una canción
function cargarCancion(index) {
    const cancion = playlist[index];

    // Actualizar la fuente del audio
    audioPlayer.src = cancion.file;

    // Actualizar información visual
    albumArt.src = cancion.cover;
    songTitle.textContent = cancion.title;
    songArtist.textContent = cancion.artist;

    // Si estaba reproduciendo, continuar con la nueva canción
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Función para formatear tiempo (segundos a mm:ss)
function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segs = Math.floor(segundos % 60);
    return `${minutos}:${segs.toString().padStart(2, '0')}`;
}

// Función para reproducir/pausar
function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶';
        isPlaying = false;
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸';
        isPlaying = true;
    }
}

// Función para ir a la canción anterior
function cancionAnterior() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1;
    }
    cargarCancion(currentSongIndex);
}

// Función para ir a la siguiente canción
function cancionSiguiente() {
    currentSongIndex++;
    if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
    }
    cargarCancion(currentSongIndex);
}

// Función para actualizar la barra de progreso
function actualizarProgreso() {
    const porcentaje = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = `${porcentaje}%`;
    currentTimeEl.textContent = formatearTiempo(audioPlayer.currentTime);
}

// Función para actualizar la duración total
function actualizarDuracion() {
    durationEl.textContent = formatearTiempo(audioPlayer.duration);
}

// Función para cambiar el progreso manualmente
function cambiarProgreso(e) {
    const ancho = progressBar.offsetWidth;
    const clickX = e.offsetX;
    const porcentaje = clickX / ancho;
    audioPlayer.currentTime = porcentaje * audioPlayer.duration;
}

// Función para cambiar el volumen
function cambiarVolumen(e) {
    const volumen = e.target.value / 100;
    audioPlayer.volume = volumen;
}

// Función para minimizar/maximizar el reproductor
function togglePlayer() {
    musicPlayer.classList.toggle('minimized');
}

// Función para inicializar el reproductor
function inicializarReproductor() {
    // Obtener referencias a los elementos
    audioPlayer = document.getElementById('audioPlayer');
    playPauseBtn = document.getElementById('playPause');
    prevBtn = document.getElementById('prevSong');
    nextBtn = document.getElementById('nextSong');
    progressBar = document.getElementById('progressBar');
    progressFill = document.getElementById('progressFill');
    currentTimeEl = document.getElementById('currentTime');
    durationEl = document.getElementById('duration');
    volumeSlider = document.getElementById('volumeSlider');
    albumArt = document.getElementById('albumArt');
    songTitle = document.getElementById('songTitle');
    songArtist = document.getElementById('songArtist');
    playerToggle = document.getElementById('playerToggle');
    musicPlayer = document.getElementById('musicPlayer');

    // Verificar que todos los elementos existen
    if (!audioPlayer || !playPauseBtn) {
        console.error('No se encontraron elementos del reproductor');
        return;
    }

    // Cargar la primera canción
    cargarCancion(currentSongIndex);

    // Establecer volumen inicial (70%)
    audioPlayer.volume = 0.7;

    // Event Listeners

    // Play/Pause
    playPauseBtn.addEventListener('click', togglePlayPause);

    // Canción anterior
    prevBtn.addEventListener('click', cancionAnterior);

    // Siguiente canción
    nextBtn.addEventListener('click', cancionSiguiente);

    // Actualizar progreso mientras se reproduce
    audioPlayer.addEventListener('timeupdate', actualizarProgreso);

    // Cuando se carga la metadata (duración disponible)
    audioPlayer.addEventListener('loadedmetadata', actualizarDuracion);

    // Cuando termina una canción, reproducir la siguiente
    audioPlayer.addEventListener('ended', () => {
        cancionSiguiente();
    });

    // Click en la barra de progreso
    progressBar.addEventListener('click', cambiarProgreso);

    // Slider de volumen
    volumeSlider.addEventListener('input', cambiarVolumen);

    // Botón minimizar/maximizar
    playerToggle.addEventListener('click', togglePlayer);
}

/* ====================================================================
   8. INICIALIZACIÓN
   Ejecutar todas las funciones cuando el DOM esté listo
   ==================================================================== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    console.log('🎉 Iniciando página romántica...');

    // 1. Iniciar contador y actualizarlo cada segundo
    actualizarContador();
    setInterval(actualizarContador, 1000);
    console.log('✅ Contador completo inicializado');

    // 2. Inicializar scroll animations
    inicializarScrollAnimations();
    console.log('✅ Scroll animations activadas');

    // 3. Inicializar carrusel
    inicializarCarrusel();
    console.log('✅ Carrusel automático configurado');

    // 4. Inicializar carta
    inicializarCarta();
    console.log('✅ Carta expandible lista');

    // 5. Inicializar modal de imágenes
    inicializarModalImagenes();
    console.log('✅ Modal de imágenes configurado');

    // 6. Inicializar reproductor de música
    inicializarReproductor();
    console.log('✅ Reproductor de música listo');

    console.log('💛 ¡Todo listo! Disfruta de la experiencia romántica 💛');

});

/* ====================================================================
   FUNCIONES ADICIONALES
   Mejoras de experiencia y optimizaciones
   ==================================================================== */

// Smooth scroll para enlaces internos (si los hay)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Prevenir zoom accidental en móviles al hacer doble tap en botones
document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

/* ====================================================================
   FIN DEL ARCHIVO
   ==================================================================== */
