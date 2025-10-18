import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Switch } from '../form/Switch';
import { useTheme } from '../../hooks';

export const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center space-x-2">
      <SunIcon className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-yellow-500'}`} />
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        size="sm"
        aria-label="Toggle dark mode"
      />
      <MoonIcon className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
    </div>
  );
};