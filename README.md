# Music Sequencer

A modern web-based music sequencer built with React, TypeScript, and Web Audio API. This application demonstrates advanced web technologies including audio synthesis, component-driven UI architecture, and real-time interaction.

## 🎵 Features

- **Audio Engine**: Real-time audio synthesis using Web Audio API with MIDI note support
- **Sequencer**: Create and play musical sequences with note scheduling
- **Modern UI**: Custom components built with Headless UI and Tailwind CSS
- **Responsive Design**: Mobile-friendly interface with accessibility features
- **Multi-page Navigation**: React Router implementation with clean URLs

## 🚀 Tech Stack

### Frontend Framework
- **React 18** - Component-based UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible UI primitives
- **Heroicons** - Beautiful SVG icons
- **clsx** - Conditional CSS class management

### Routing & Architecture
- **React Router** - Client-side routing
- **Component-driven architecture** - Reusable UI components
- **Custom hooks** - Shared logic and state management

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx       # Custom button component
│   ├── Checkbox.tsx     # Custom checkbox component
│   ├── Switch.tsx       # Custom switch component
│   ├── Navigation.tsx   # Main navigation bar
│   └── Layout.tsx       # Page layout wrapper
├── pages/              # Application pages
│   ├── Home.tsx        # Landing page
│   ├── Sequencer.tsx   # Main sequencer interface
│   ├── ComponentsDemo.tsx # UI components demo
│   └── About.tsx       # Project information
├── hooks/              # Custom React hooks
│   ├── useNotePlayer.ts    # Audio playback logic
│   └── useNoteDispatcher.ts # Note scheduling system
├── model/              # TypeScript interfaces and types
└── assets/             # Static assets
```

## 🎛️ Components Library

### Button Component
- **Variants**: Primary, Secondary, Outline, Ghost
- **Sizes**: Small, Medium, Large
- **States**: Normal, Disabled
- **Full accessibility** support with focus management

### Checkbox Component
- **Labels and descriptions** support
- **Accessible** implementation using Headless UI
- **Custom styling** with Tailwind CSS
- **Disabled state** handling

### Switch Component
- **Multiple sizes** (SM, MD, LG)
- **Smooth animations** and transitions
- **Label and description** support
- **Accessible** toggle functionality

## 🎹 Audio Features

### MIDI Support
- **Note range**: 0-127 MIDI notes
- **Velocity control**: Dynamic volume based on velocity
- **Duration control**: Configurable note lengths

### Audio Engine Types
- **Sine Wave**: Pure sine wave generation
- **Sampler**: Sample-based playback (fallback to sine)
- **MIDI Output**: External MIDI device support (fallback to sine)

### Sequencing
- **Random note generation** for testing
- **Pre-programmed sequences** (C major chord progression)
- **Real-time playback** with accurate timing
- **Note scheduling** system

## 🚦 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sequencer
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 Navigation

The application includes the following routes:

- **`/`** - Home page with project overview
- **`/sequencer`** - Main sequencer interface
- **`/components`** - UI components demonstration
- **`/about`** - Project information and tech details

## 🎨 Customization

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- **Color system**: Custom color palette
- **Typography**: System font stack
- **Components**: Custom component styles
- **Responsive design**: Mobile-first approach

### Component Theming
All components support:
- **CSS classes**: Custom styling via className prop
- **Variant system**: Pre-defined style variants
- **Size system**: Multiple size options
- **State management**: Disabled and active states

## 🔧 Development

### Code Architecture
- **TypeScript**: Full type safety across the application
- **Component composition**: Reusable and composable UI components
- **Custom hooks**: Separation of concerns with reusable logic
- **Event-driven architecture**: Clean audio event handling

### Adding New Components
1. Create component file in `src/components/`
2. Export from `src/components/index.ts`
3. Add TypeScript interfaces
4. Include in components demo page

### Audio Development
The audio system uses Web Audio API with:
- **AudioContext**: Main audio processing graph
- **OscillatorNode**: Sine wave generation
- **GainNode**: Volume control
- **Scheduling**: Precise timing with `setTimeout`

### Styling Guidelines
- **Tailwind classes**: Use utility classes for styling
- **Component variants**: Define consistent design system
- **Responsive design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Headless UI** - For accessible UI primitives
- **Tailwind CSS** - For utility-first styling
- **Web Audio API** - For browser-based audio synthesis
- **Vite** - For fast development experience
- **React Router** - For client-side navigation

## 📞 Support

For questions or support:
- Create an issue in the GitHub repository
- Check the component documentation in `/src/components/README.md`
- Review the pages documentation in `/src/pages/README.md`

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
