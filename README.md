<<<<<<< HEAD
# Proyecto: Chess Hub

Este es un proyecto de aplicación web de una sola página (SPA) con el objetivo de ser un punto de encuentro y utilidad para entusiastas del ajedrez.

**Hobbie Elegido:** Ajedrez

## 🚀 Enlace al Despliegue

Puedes ver la web funcionando aquí: **[Tu enlace de despliegue aquí]**

## 📋 Descripción y Propósito

Chess Hub es una aplicación web moderna diseñada para aficionados al ajedrez. Ofrece una variedad de herramientas y recursos para aprender, seguir el mundo del ajedrez profesional y practicar contra una IA.

**Características Principales:**

*   **Reglas del Ajedrez:** Una sección de referencia rápida para consultar las reglas del juego.
*   **Calendario de Torneos:** Muestra una lista de próximos torneos de ajedrez a nivel mundial.
*   **Perfiles de Jugadores:** Perfiles de jugadores de élite con sus estadísticas y enlaces a sus perfiles en plataformas de juego.
*   **Detalles de Campeonatos:** Información histórica sobre los campeonatos mundiales de ajedrez.
*   **Juega contra la IA:** Una interfaz simple para jugar contra un oponente de IA básico, movida por movida.
*   **Aprende con IA:** Una herramienta para generar explicaciones sobre términos de ajedrez, estrategias de apertura y partidas famosas.

## 🛠️ Tecnologías Utilizadas

*   **Framework:** Next.js (con React)
*   **Lenguaje:** TypeScript
*   **Estilo:** Tailwind CSS y shadcn/ui para componentes.
*   **Inteligencia Artificial:** Google's Gemini Pro a través de Firebase Genkit.
*   **Routing:** Next.js App Router para una navegación de SPA fluida.
*   **Componentes:** React Server Components (RSC) y Client Components.
*   **Formularios:** React Hook Form y Server Actions.

## 🔗 APIs y Servicios

*   **API Propia (Backend Lógico):** Se utilizan Server Actions de Next.js que se comunican con flujos de Genkit para la lógica de IA. Esto cumple la función de una API propia, procesando las solicitudes del cliente en el servidor.
    *   `getAiMove`: Recibe el movimiento de un usuario y el historial del juego, y devuelve el movimiento de la IA.
    *   `getAiExplanation`: Recibe un tema de ajedrez y genera una explicación detallada.
*   **API Externa:** Aunque no se consume una API REST externa de terceros para datos de ajedrez (debido a la falta de APIs gratuitas y estables para este fin), el proyecto demuestra la capacidad de interactuar con servicios externos a través de los flujos de Genkit, que se conectan a los modelos de Google.

## 🛡️ Seguridad

*   **Prevención de Cross-Site Scripting (XSS):** Todo el contenido dinámico y generado por el usuario se renderiza como texto a través de las capacidades de JSX de React, lo que previene la inyección de scripts maliciosos en el DOM.
*   **Validación de Entradas:** Los formularios del lado del cliente utilizan validación para asegurar que los datos enviados al servidor tengan un formato básico correcto. Las acciones del servidor también utilizan `zod` para una validación más robusta.

## ⚡ Rendimiento y Optimización

*   **Optimización de Imágenes:** Se utiliza el componente `next/image` para servir imágenes optimizadas, en formatos modernos (como WebP) y con el tamaño adecuado.
*   **Minificación de Código:** El proceso de build de Next.js (`next build`) minifica automáticamente los archivos JavaScript y CSS para producción.
*   **Carga Diferida (Lazy Loading):** El componente `next/image` implementa por defecto la carga diferida para las imágenes que no están en el viewport inicial. El propio sistema de routing de Next.js divide el código (code-splitting) por rutas, cargando solo el JavaScript necesario para la página actual.

## 💻 Instrucciones de Instalación y Ejecución Local

Sigue estos pasos para ejecutar el proyecto en tu máquina.

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd [NOMBRE_DEL_DIRECTORIO]
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar las variables de entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto y añade tu clave de API de Google AI Studio:
    ```
    GOOGLE_API_KEY=TU_API_KEY_DE_GOOGLE_AI
    ```
    Puedes obtener una clave en [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Ejecutar la aplicación:**
    El proyecto requiere dos procesos en paralelo: el servidor de desarrollo de Next.js y el inspector de flujos de Genkit.

    *   En una **Terminal 1**, inicia el servidor de desarrollo:
        ```bash
        npm run dev
        ```
        La aplicación estará disponible en `http://localhost:9002`.

    *   En una **Terminal 2**, inicia el inspector de Genkit (opcional, pero recomendado para depuración):
        ```bash
        npm run genkit:watch
        ```
        El inspector estará disponible en `http://localhost:4000`.

5.  ¡Listo! Ahora puedes abrir `http://localhost:9002` en tu navegador y explorar la aplicación.
=======
# Parcial
>>>>>>> 446ad7d5071e39ceff47b13adbb540127f4a40c3
