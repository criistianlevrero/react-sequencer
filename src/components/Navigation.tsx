import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { ThemeSwitch } from './ThemeSwitch';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Sequencer', icon: '🎵' },
    { path: '/components', label: 'Components', icon: '🎛️' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            🎼 Music Sequencer
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                    'hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                    location.pathname === item.path
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300'
                  )}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="pl-4 border-l border-gray-200 dark:border-gray-600">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};