import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '..';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};