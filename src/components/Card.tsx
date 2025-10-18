import React from 'react';
import { clsx } from 'clsx';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  gradient = false
}) => {
  return (
    <section 
      className={clsx(
        'rounded-2xl shadow-xl p-8 border transition-colors',
        gradient 
          ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-100 dark:border-blue-800/50'
          : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700',
        className
      )}
    >
      {children}
    </section>
  );
};