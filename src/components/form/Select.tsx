import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option...',
  disabled = false,
  className
}) => {
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={clsx('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
          {label}
        </label>
      )}
      
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button
            className={clsx(
              'relative w-full cursor-pointer rounded-md border py-1 pl-2 pr-8 text-left shadow-sm transition-colors duration-200 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700',
              'text-gray-900 dark:text-white',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <span className="flex items-center">
              {selectedOption?.icon && (
                <selectedOption.icon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              )}
              <span className="block truncate text-sm">
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
              <ChevronUpDownIcon
                className="h-4 w-4 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={clsx(
                'absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md shadow-lg',
                'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600',
                'py-1 text-sm focus:outline-none'
              )}
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active, selected }) =>
                    clsx(
                      'relative cursor-pointer select-none py-1.5 pl-2 pr-8 transition-colors duration-150',
                      active
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100'
                        : 'text-gray-900 dark:text-gray-100',
                      selected && 'font-medium'
                    )
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center">
                        {option.icon && (
                          <option.icon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                        )}
                        <span className={clsx('block truncate text-sm', selected ? 'font-medium' : 'font-normal')}>
                          {option.label}
                        </span>
                      </div>
                      {selected && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-blue-600 dark:text-blue-400">
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};