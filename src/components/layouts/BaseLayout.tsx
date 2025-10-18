import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '..';

export const BaseLayout: React.FC = () => {
  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};