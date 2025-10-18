import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Sequencer', icon: '🎵' },
    { path: '/components', label: 'Components', icon: '🎛️' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            🎼 Music Sequencer
          </Link>
          
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                  'hover:bg-gray-100 hover:text-gray-900',
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600'
                )}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};