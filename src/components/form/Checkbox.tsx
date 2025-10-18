import React from 'react';
import { Checkbox as HeadlessCheckbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className
}) => {
  return (
    <div className={clsx('flex items-start', className)}>
      <HeadlessCheckbox
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          'group relative flex h-5 w-5 items-center justify-center rounded border-2 transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800',
          checked 
            ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500' 
            : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <CheckIcon 
          className={clsx(
            'h-3 w-3 text-white transition-opacity duration-200',
            checked ? 'opacity-100' : 'opacity-0'
          )} 
        />
      </HeadlessCheckbox>
      
      {(label || description) && (
        <div className="ml-3">
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
    </div>
  );
};