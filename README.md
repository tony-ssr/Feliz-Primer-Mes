# 💛 Feliz Primer Mes - Página Web Romántica

<div align="center">

![Romantic Badge](https://img.shields.io/badge/Made%20with-Love-ff69b4?style=for-the-badge&logo=heart)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

**Una experiencia web interactiva y romántica para celebrar el amor** 💕

[🌟 Demo](#características) • [🚀 Inicio Rápido](#inicio-rápido) • [📖 Documentación](#documentación) • [🎨 Personalización](#personalización)

</div>

---

## 📝 Descripción

Página web romántica altamente personalizable creada para celebrar el primer mes de relación. Diseñada con una estética kawaii inspirada en **Pompompurin**, combina animaciones suaves, diseño responsive y múltiples secciones interactivas para crear una experiencia memorable.

### ✨ Perfecta Para:
- 💑 Aniversarios de relación
- 🎂 Cumpleaños románticos
- 💝 Regalos digitales especiales
- 📅 Celebraciones de hitos

---

## 🌟 Características

### 🎯 Secciones Principales

- **⏱️ Contador en Tiempo Real**: Muestra días, horas, minutos y segundos desde el inicio de la relación
- **📸 Galería de Momentos Especiales**: 
  - Carrusel automático con transiciones suaves
  - Tarjetas Polaroid con rotación 3D
  - Grid masonry para fotos de eventos
  - Collage flotante con animaciones
- **💭 Por Qué Tú**: 6 razones románticas con iconos animados
- **🎵 Playlist de Spotify**: Reproductor embebido de canciones especiales
- **💌 Carta Romántica**: Sobre interactivo que se abre en modal
- **🎶 Reproductor de Música**: Widget flotante minimizable con playlist personalizada

### 🎨 Diseño y UX

- 🌈 **Paleta Pompompurin**: Tonos pastel (amarillo, rosa, crema, marrón)
- 🎭 **Animaciones Suaves**: Scroll reveal, hover effects, transiciones elegantes
- 📱 **Totalmente Responsive**: Optimizado para móviles, tablets y escritorio
- ✨ **Fondo Animado**: Corazones y estrellas flotantes
- 🎨 **Degradados Únicos**: Cada sección tiene su identidad visual
- 🖼️ **Modal de Imágenes**: Mensajes personalizados por cada foto

### 🚀 Tecnologías

- **HTML5**: Estructura semántica y accesible
- **CSS3**: 
  - Variables CSS para fácil personalización
  - Flexbox y Grid Layout
  - Animaciones y transiciones
  - Diseño mobile-first
- **JavaScript Vanilla**: 
  - Sin dependencias externas
  - Intersection Observer para animaciones
  - Reproductores de audio personalizados
  - Sistema de carrusel automático

---

## 🚀 Inicio Rápido

### Prerequisitos

Ninguno! Solo necesitas un navegador web moderno. 🎉

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tony-ssr/Feliz-Primer-Mes.git
   cd Feliz-Primer-Mes
   ```

2. **Abre el proyecto**
   - Simplemente abre `index.html` en tu navegador favorito
   - O usa un servidor local:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (http-server)
   npx http-server
   ```

3. **¡Listo!** 🎉
   - Navega a `http://localhost:8000` si usas servidor local
   - O simplemente haz doble clic en `index.html`

---

## 📖 Documentación

### 📁 Estructura del Proyecto

```
Feliz-Primer-Mes/
│
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos completos con comentarios
├── js/
│   └── main.js            # Lógica y funcionalidades
├── assets/
│   ├── images/            # Galería de fotos
│   │   ├── nuestra primera cita/
│   │   ├── ramito y navidad/
│   │   ├── carnaval en pasto/
│   │   └── pompompurin y fotitos/
│   └── song/              # Música y portadas
│       ├── *.mp3
│       └── *.png
│
├── README.md              # Este archivo
├── LICENSE                # Licencia MIT
└── .gitignore            # Archivos ignorados por Git
```

### 🎨 Personalización

#### 1️⃣ Cambiar Fechas y Nombres

Edita `index.html`:
```html
<!-- Línea ~90: Nombres -->
<h1 class="hero-title">
    <span class="name">TuNombre</span>
    <span class="heart">💛</span>
    <span class="name">SuNombre</span>
</h1>
```

Edita `js/main.js`:
```javascript
// Línea 22: Fecha de inicio
const FECHA_INICIO = new Date('2025-12-06T00:00:00');
```

#### 2️⃣ Personalizar Colores

Edita `css/style.css`:
```css
:root {
    --color-crema: #FFF9E3;
    --color-amarillo: #FBDD5D;
    --color-marron: #5D3A1A;
    --color-rosa: #FFB6C1;
    --color-rojo: #FF6B6B;
}
```

#### 3️⃣ Agregar Tus Fotos

1. Crea las carpetas en `assets/images/`
2. Agrega tus imágenes
3. Actualiza las rutas en `index.html`
4. Agrega mensajes personalizados con `data-message`

#### 4️⃣ Playlist de Spotify

Reemplaza el iframe en `index.html` (línea ~385):
```html
<iframe 
    src="TU_URL_DE_SPOTIFY_EMBED"
    width="100%" 
    height="380">
</iframe>
```

#### 5️⃣ Música del Reproductor

Edita `js/main.js` (línea ~31):
```javascript
const playlist = [
    {
        title: 'Tu Canción',
        artist: 'Tu Artista',
        file: 'assets/song/tu-cancion.mp3',
        cover: 'assets/song/tu-portada.png'
    },
    // Más canciones...
];
```

---

## 🎯 Características Técnicas

### Optimizaciones

- ✅ Lazy loading de imágenes
- ✅ Animaciones GPU-aceleradas
- ✅ CSS minificado y organizado
- ✅ JavaScript modular y comentado
- ✅ SEO-friendly con meta tags
- ✅ Accesibilidad con ARIA labels

### Compatibilidad

| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome    | 90+            |
| Firefox   | 88+            |
| Safari    | 14+            |
| Edge      | 90+            |
| Opera     | 76+            |

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar este proyecto:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Antony Salcedo** ([@tony-ssr](https://github.com/tony-ssr))

💌 Creado con amor para María Alejandra

---

## 🙏 Agradecimientos

- 🎨 Inspiración de diseño: Pompompurin (Sanrio)
- 💛 Fonts: Google Fonts (Quicksand, Fredoka One)
- 🎵 Música: Artistas mencionados en la playlist
- 💖 Y especialmente a ti, por hacer que cada día sea especial

---

<div align="center">

### 💝 Hecho con amor y dedicación

Si este proyecto te inspiró o ayudó, ¡dale una ⭐!

**¿Tienes preguntas?** Abre un [Issue](https://github.com/tony-ssr/Feliz-Primer-Mes/issues)

---

*"El amor es la poesía de los sentidos."* - Honoré de Balzac

</div>
