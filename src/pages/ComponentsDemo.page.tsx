import React, { useState } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Button, Card, Checkbox, Switch, Select } from '@components';

export const ComponentsDemoPage: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [secondChecked, setSecondChecked] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
            <span className="text-2xl">🎛️</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Component Library</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our custom UI components built with Headless UI and Tailwind CSS. 
            Each component is designed for accessibility, flexibility, and beautiful user experiences.
          </p>
        </div>

        {/* Component Sections Grid */}
        <div className="grid gap-8 lg:gap-12">
          {/* Buttons Section */}
          <Card>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4">
                <span className="text-xl">🔘</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Buttons</h2>
                <p className="text-gray-600 dark:text-gray-300">Interactive button components with multiple variants and states</p>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Button Variants */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Variants</h3>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Sizes</h3>
                <div className="flex gap-4 flex-wrap items-center">
                  <Button size="sm" variant="primary">Small</Button>
                  <Button size="md" variant="primary">Medium</Button>
                  <Button size="lg" variant="primary">Large</Button>
                </div>
              </div>

              {/* Button States */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">States</h3>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="primary">Normal</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Checkboxes Section */}
          <Card>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mr-4">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Checkboxes</h2>
                <p className="text-gray-600 dark:text-gray-300">Accessible checkbox components with labels and descriptions</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Basic Usage</h3>
                  <Checkbox
                    checked={checked}
                    onChange={setChecked}
                    label="Simple Checkbox"
                  />
                  <Checkbox
                    checked={secondChecked}
                    onChange={setSecondChecked}
                    label="Checkbox with Description"
                    description="This checkbox includes additional descriptive text to help users understand its purpose"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">States</h3>
                  <Checkbox
                    checked={true}
                    onChange={() => {}}
                    label="Always Checked"
                    description="This checkbox is always checked"
                  />
                  <Checkbox
                    checked={false}
                    onChange={() => {}}
                    label="Disabled Checkbox"
                    description="This checkbox is disabled"
                    disabled
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Switches Section */}
          <Card>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mr-4">
                <span className="text-xl">🔄</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Switches</h2>
                <p className="text-gray-600 dark:text-gray-300">Toggle switches for binary choices and settings</p>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Switch Sizes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Sizes</h3>
                <div className="space-y-4">
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    label="Small Switch"
                    description="Compact size for tight layouts"
                    size="sm"
                  />
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    label="Medium Switch (Default)"
                    description="Standard size for most use cases"
                    size="md"
                  />
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    label="Large Switch"
                    description="Larger size for emphasis or accessibility"
                    size="lg"
                  />
                </div>
              </div>

              {/* Switch Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Switch
                      checked={notifications}
                      onChange={setNotifications}
                      label="Push Notifications"
                      description="Receive notifications about new messages"
                      size="md"
                    />
                    <Switch
                      checked={checked}
                      onChange={setChecked}
                      label="Dark Mode"
                      description="Switch between light and dark themes"
                      size="md"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Switch
                      checked={false}
                      onChange={() => {}}
                      label="Disabled Switch"
                      description="This switch is disabled and cannot be toggled"
                      disabled
                      size="md"
                    />
                    <Switch
                      checked={true}
                      onChange={() => {}}
                      label="Always On"
                      description="This feature is always enabled"
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Select Section */}
          <Card>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center mr-4">
                <span className="text-xl">📋</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Select Dropdown</h2>
                <p className="text-gray-600 dark:text-gray-300">Custom select components with dark mode support</p>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Basic Select */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Basic Usage</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Select
                      value={selectedOption}
                      onChange={setSelectedOption}
                      label="Choose an option"
                      options={[
                        { value: 'option1', label: 'First Option', icon: HeartIcon },
                        { value: 'option2', label: 'Second Option', icon: SunIcon },
                        { value: 'option3', label: 'Third Option', icon: MoonIcon },
                        { value: 'option4', label: 'Fourth Option', icon: ComputerDesktopIcon }
                      ]}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Select
                      value=""
                      onChange={() => {}}
                      label="Disabled Select"
                      placeholder="Select an option..."
                      disabled
                      options={[
                        { value: 'disabled1', label: 'Disabled Option 1' },
                        { value: 'disabled2', label: 'Disabled Option 2' }
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Select Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Select
                      value={selectedOption}
                      onChange={setSelectedOption}
                      label="Audio Engine Type"
                      options={[
                        { value: 'sine_wave', label: 'SINE WAVE', icon: SunIcon },
                        { value: 'sampler', label: 'SAMPLER', icon: HeartIcon },
                        { value: 'midi_output', label: 'MIDI OUTPUT', icon: ComputerDesktopIcon }
                      ]}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Perfect dark mode compatibility with smooth animations
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <Select
                      value="favorites"
                      onChange={() => {}}
                      label="Theme Preference"
                      options={[
                        { value: 'light', label: 'Light Theme', icon: SunIcon },
                        { value: 'dark', label: 'Dark Theme', icon: MoonIcon },
                        { value: 'auto', label: 'System Preference', icon: ComputerDesktopIcon },
                        { value: 'favorites', label: 'Custom Themes', icon: HeartIcon }
                      ]}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Accessible keyboard navigation and screen reader support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive Demo Section */}
          <Card
            gradient={true}
            className="text-center"
          >
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Interactive Demo</h2>
              <p className="text-gray-600 dark:text-gray-300">See how components work together in real scenarios</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">User Preferences Panel</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Notification Settings</h4>
                  <Switch
                    checked={notifications}
                    onChange={setNotifications}
                    label="Email Notifications"
                    description="Receive updates via email"
                    size="md"
                  />
                  <Checkbox
                    checked={checked}
                    onChange={setChecked}
                    label="Marketing Emails"
                    description="Receive promotional content and updates"
                  />
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Actions</h4>
                  <div className="space-y-3">
                    <Button 
                      variant="primary" 
                      disabled={!notifications && !checked}
                    >
                      Save Preferences
                    </Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                  {(!notifications && !checked) && (
                    <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                      ⚠️ Please enable at least one notification option to save your preferences.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
