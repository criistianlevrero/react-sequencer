import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { clsx } from 'clsx';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const switchSizes = {
  sm: {
    track: 'h-5 w-9',
    thumb: 'h-3 w-3',
    translate: 'translate-x-5'
  },
  md: {
    track: 'h-6 w-11',
    thumb: 'h-4 w-4',
    translate: 'translate-x-6'
  },
  lg: {
    track: 'h-7 w-14',
    thumb: 'h-5 w-5',
    translate: 'translate-x-8'
  }
};

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className
}) => {
  const sizeClasses = switchSizes[size];

  return (
    <div className={clsx('flex items-center justify-between', className)}>
      {(label || description) && (
        <div className="mr-4">
          {label && (
                          <label 
                className={clsx(
                  'text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors',
                  disabled && 'opacity-50'
                )}
              >
              {label}
            </label>
          )}
          {description && (
            <p className={clsx(
              'text-sm text-gray-600 dark:text-gray-300 transition-colors',
              disabled && 'opacity-50'
            )}>
              {description}
            </p>
          )}
        </div>
      )}
      
      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out items-center',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800',
          checked ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-600',
          disabled && 'opacity-50 cursor-not-allowed',
          sizeClasses.track
        )}
      >
        <span
          className={clsx(
            'pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            checked ? sizeClasses.translate : 'translate-x-0.5',
            sizeClasses.thumb
          )}
        />
      </HeadlessSwitch>
    </div>
  );
};