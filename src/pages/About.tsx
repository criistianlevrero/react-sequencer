import React from 'react';
import { Card } from '../components';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            About Music Sequencer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">
            Learn more about this project and its technologies
          </p>
        </div>

        <Card className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors">Project Overview</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors">
            This Music Sequencer is a modern web application built to demonstrate advanced web technologies 
            in action. It combines audio synthesis, user interface design, and real-time interaction to 
            create an engaging musical experience.
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors">
            The project showcases the power of the Web Audio API for generating music directly in the browser, 
            without requiring any external plugins or downloads.
          </p>
        </Card>

        <Card className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors">Technologies Used</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 transition-colors">Frontend</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 transition-colors">
                <li>• <strong>React 18</strong> - Component-based UI framework</li>
                <li>• <strong>TypeScript</strong> - Type-safe development</li>
                <li>• <strong>Vite</strong> - Fast build tool and dev server</li>
                <li>• <strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
                <li>• <strong>React Router</strong> - Client-side routing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 transition-colors">UI Components</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 transition-colors">
                <li>• <strong>Headless UI</strong> - Accessible UI primitives</li>
                <li>• <strong>Heroicons</strong> - Beautiful SVG icons</li>
                <li>• <strong>clsx</strong> - Conditional CSS classes</li>
                <li>• <strong>Custom Components</strong> - Reusable UI elements</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 transition-colors">🎵 Audio Engine</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300 text-sm transition-colors">
                <li>• Real-time audio synthesis</li>
                <li>• MIDI note support (0-127)</li>
                <li>• Velocity control</li>
                <li>• Multiple audio engines</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 transition-colors">🎹 Sequencing</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300 text-sm transition-colors">
                <li>• Note scheduling</li>
                <li>• Sequence playback</li>
                <li>• Random note generation</li>
                <li>• Pattern creation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 transition-colors">🎛️ Interface</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300 text-sm transition-colors">
                <li>• Responsive design</li>
                <li>• Accessible components</li>
                <li>• Real-time controls</li>
                <li>• Modern UI/UX</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors">Development</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors">
            This project was developed as a demonstration of modern web development practices, 
            focusing on clean code, type safety, accessibility, and user experience.
          </p>
          <p className="text-gray-600 dark:text-gray-300 transition-colors">
            The codebase follows React best practices, uses TypeScript for type safety, 
            and implements a component-driven architecture for maintainability and reusability.
          </p>
        </Card>
      </div>
    </div>
  );
};