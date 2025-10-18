# Pages

Este directorio contiene las páginas principales de la aplicación Music Sequencer.

## Estructura de Páginas

### Home (`/`)
La página de inicio de la aplicación que presenta:
- Información general del proyecto
- Características principales
- Enlaces de navegación rápida
- Descripción de funcionalidades

### Sequencer (`/sequencer`)
La página principal del secuenciador que incluye:
- Controles de audio engine
- Botones para tocar notas aleatorias y secuencias
- Configuración de efectos y modo autoplay
- Interface de usuario interactiva

### Components Demo (`/components`)
Una demostración de todos los componentes UI disponibles:
- Botones con diferentes variantes y tamaños
- Checkboxes con etiquetas y descripciones
- Switches con múltiples configuraciones
- Ejemplos de uso y estados

### About (`/about`)
Información detallada sobre el proyecto:
- Descripción técnica
- Tecnologías utilizadas
- Características del proyecto
- Información de desarrollo

## Navegación

La aplicación utiliza React Router para navegación del lado del cliente con:
- Rutas anidadas usando un Layout común
- Navegación principal con componente Navigation
- URLs amigables y navegación por historial
- Indicadores visuales de página activa

## Componentes Compartidos

Todas las páginas utilizan:
- `Layout` - Estructura base con navegación
- `Navigation` - Barra de navegación principal
- Componentes UI personalizados (Button, Checkbox, Switch)
- Estilos consistentes con Tailwind CSS

## Uso

Las páginas se importan y configuran en `App.tsx`:

```tsx
import { Home, Sequencer, ComponentsDemo, About } from './pages';

// Configuración de rutas
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="sequencer" element={<Sequencer />} />
    <Route path="components" element={<ComponentsDemo />} />
    <Route path="about" element={<About />} />
  </Route>
</Routes>
```