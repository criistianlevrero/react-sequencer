import React from 'react';
import { Button } from '@components';

export interface SelectedEvent {
  pulse: number;
  note: number;
  velocity: number;
  duration: number;
}

export interface NoteConfigProps {
  selectedEvent: SelectedEvent;
  onBack: () => void;
  onEventUpdate: (updatedEvent: SelectedEvent) => void;
}

export const NoteConfig: React.FC<NoteConfigProps> = ({
  selectedEvent,
  onBack,
  onEventUpdate
}) => {
  const updateField = <K extends keyof SelectedEvent>(field: K, value: SelectedEvent[K]) => {
    const updatedEvent = { ...selectedEvent, [field]: value };
    onEventUpdate(updatedEvent);
  };

  // Convertir nota MIDI a nombre (simplificado)
  const getMidiNoteName = (midiNote: number): string => {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(midiNote / 12) - 1;
    const noteName = noteNames[midiNote % 12];
    return `${noteName}${octave}`;
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          onClick={onBack}
          size="sm"
        >
          ← Back to Sequence
        </Button>
      </div>

      {/* Note Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* MIDI Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            MIDI Note ({getMidiNoteName(selectedEvent.note)})
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="127"
              value={selectedEvent.note}
              onChange={(e) => updateField('note', Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded min-w-[50px] text-center">
              {selectedEvent.note}
            </span>
          </div>
        </div>

        {/* Velocity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Velocity
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="127"
              value={selectedEvent.velocity}
              onChange={(e) => updateField('velocity', Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded min-w-[50px] text-center">
              {selectedEvent.velocity}
            </span>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Duration (ms)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={selectedEvent.duration}
              onChange={(e) => updateField('duration', Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded min-w-[60px] text-center">
              {selectedEvent.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};