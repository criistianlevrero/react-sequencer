# Components

Esta carpeta contiene los componentes UI personalizados basados en Headless UI y estilizados con Tailwind CSS.

## Componentes Disponibles

### Button
Un componente de botón completamente estilizado con múltiples variantes y tamaños.

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `disabled`: `boolean` (default: `false`)
- `onClick`: `() => void`
- `children`: `React.ReactNode`

**Ejemplo:**
```tsx
<Button variant="primary" size="md" onClick={() => console.log('clicked')}>
  Click me
</Button>
```

### Checkbox
Un componente de checkbox accesible con etiquetas y descripciones opcionales.

**Props:**
- `checked`: `boolean` (requerido)
- `onChange`: `(checked: boolean) => void` (requerido)
- `label`: `string` (opcional)
- `description`: `string` (opcional)
- `disabled`: `boolean` (default: `false`)

**Ejemplo:**
```tsx
<Checkbox
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
  description="Receive email updates"
/>
```

### Switch
Un componente de switch (toggle) con múltiples tamaños y etiquetas opcionales.

**Props:**
- `checked`: `boolean` (requerido)
- `onChange`: `(checked: boolean) => void` (requerido)
- `label`: `string` (opcional)
- `description`: `string` (opcional)
- `disabled`: `boolean` (default: `false`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)

**Ejemplo:**
```tsx
<Switch
  checked={darkMode}
  onChange={setDarkMode}
  label="Dark Mode"
  description="Toggle between light and dark themes"
  size="md"
/>
```

## Dependencias

Estos componentes requieren las siguientes dependencias:

- `@headlessui/react` - Para la funcionalidad accesible base
- `@heroicons/react` - Para iconos (usado en Checkbox)
- `clsx` - Para combinar clases CSS condicionales
- `tailwindcss` - Para los estilos

## Uso

Importa los componentes desde el índice:

```tsx
import { Button, Checkbox, Switch } from './components';
```

O importa componentes individuales:

```tsx
import { Button } from './components/Button';
```