import React, { useState } from 'react';
import { Button, Checkbox, Switch } from '../components';

export const ComponentsDemo: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="p-8 space-y-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Component Demo</h1>
      
      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
        <div className="flex gap-4 flex-wrap">
          <Button size="sm" variant="primary">Small</Button>
          <Button size="md" variant="primary">Medium</Button>
          <Button size="lg" variant="primary">Large</Button>
        </div>
        <div className="flex gap-4 flex-wrap">
          <Button disabled>Disabled Button</Button>
        </div>
      </section>

      {/* Checkboxes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Checkboxes</h2>
        <div className="space-y-3">
          <Checkbox
            checked={checked}
            onChange={setChecked}
            label="Simple Checkbox"
          />
          <Checkbox
            checked={checked}
            onChange={setChecked}
            label="Checkbox with Description"
            description="This checkbox has additional descriptive text below the label"
          />
          <Checkbox
            checked={false}
            onChange={() => {}}
            label="Disabled Checkbox"
            disabled
          />
        </div>
      </section>

      {/* Switches */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Switches</h2>
        <div className="space-y-4">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            label="Enable Notifications"
            size="sm"
          />
          <Switch
            checked={enabled}
            onChange={setEnabled}
            label="Dark Mode"
            description="Toggle between light and dark themes"
            size="md"
          />
          <Switch
            checked={enabled}
            onChange={setEnabled}
            label="Large Switch"
            size="lg"
          />
          <Switch
            checked={false}
            onChange={() => {}}
            label="Disabled Switch"
            disabled
          />
        </div>
      </section>
    </div>
  );
};