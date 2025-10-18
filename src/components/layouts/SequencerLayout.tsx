import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '..';
import { PlayheadProvider } from '../../contexts';

export const SequencerLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen grid grid-cols-1 grid-rows-[auto_1fr] bg-gray-50 dark:bg-gray-900 transition-colors [&_*]:transition-colors">
      <Navigation />
      <main className="overflow-y-auto">
        <PlayheadProvider>
          <Outlet />
        </PlayheadProvider>
      </main>
    </div>
  );
};