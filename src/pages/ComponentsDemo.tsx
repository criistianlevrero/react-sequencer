import React, { useState } from 'react';
import { Button, Checkbox, Switch } from '../components';

export const ComponentsDemo: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [secondChecked, setSecondChecked] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-6 transition-colors">
            <span className="text-2xl">🎛️</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Component Library</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors">
            Explore our custom UI components built with Headless UI and Tailwind CSS. 
            Each component is designed for accessibility, flexibility, and beautiful user experiences.
          </p>
        </div>

        {/* Component Sections Grid */}
        <div className="grid gap-8 lg:gap-12">
          {/* Buttons Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4 transition-colors">
                <span className="text-xl">🔘</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Buttons</h2>
                <p className="text-gray-600 dark:text-gray-300 transition-colors">Interactive button components with multiple variants and states</p>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Button Variants */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 transition-colors">Variants</h3>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sizes</h3>
                <div className="flex gap-4 flex-wrap items-center">
                  <Button size="sm" variant="primary">Small</Button>
                  <Button size="md" variant="primary">Medium</Button>
                  <Button size="lg" variant="primary">Large</Button>
                </div>
              </div>

              {/* Button States */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">States</h3>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="primary">Normal</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Checkboxes Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Checkboxes</h2>
                <p className="text-gray-600">Accessible checkbox components with labels and descriptions</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Basic Usage</h3>
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
                  <h3 className="text-lg font-semibold text-gray-800">States</h3>
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
          </section>

          {/* Switches Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-xl">🔄</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Switches</h2>
                <p className="text-gray-600">Toggle switches for binary choices and settings</p>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Switch Sizes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sizes</h3>
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
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
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
          </section>

          {/* Interactive Demo Section */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Interactive Demo</h2>
              <p className="text-gray-600">See how components work together in real scenarios</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">User Preferences Panel</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Notification Settings</h4>
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
                  <h4 className="font-medium text-gray-700">Actions</h4>
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
                    <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                      ⚠️ Please enable at least one notification option to save your preferences.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
