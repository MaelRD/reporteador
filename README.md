# Entrega de Turno - Soporte Odoo

Herramienta web progresiva (PWA) para la estandarización y generación de reportes de entrega de turno en el equipo de Soporte Técnico Odoo.

## Características Principales

- **Interfaz Moderna**: Diseño basado en Glassmorphism con tema oscuro.
- **Generación de PDF**: Convierte el reporte en un PDF profesional listo para guardar o imprimir.
- **Gestión Dinámica de Tickets**: Agrega, edita y elimina tickets del sistema de manera interactiva.
- **Campos Inteligentes**:
    - **Estado del Turno**: Clasifica la jornada (Tranquilo, Normal, Pesado, Caótico).
    - **Contexto y Eventos**: Campos descriptivos para resumir la actividad.
    - **Notas de Traspaso**: Sección dedicada para información complementaria que no requiere ticket.
- **Persistencia Local**: Guarda el último reporte generado en el navegador para facilitar el rellenado.


### Requisitos Previos
- Un navegador web moderno (Chrome, Edge, Firefox, Safari).

### Instalación
1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en tu navegador.

### Uso
1. Completa los datos del responsable del turno.
2. Describe el contexto y el estado general del día.
3. Agrega los tickets que se gestionaron durante tu turno.
4. Añade notas adicionales si es necesario.
5. Haz clic en **"Generar y Guardar PDF"**.

## Estructura del Proyecto

- `index.html`: Estructura principal y contenido de la aplicación.
- `style.css`: Estilos CSS, incluyendo variables de color y diseño Glassmorphism.
- `script.js`: Lógica de la aplicación, manejo de formularios, generación de tickets y exportación a PDF.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.