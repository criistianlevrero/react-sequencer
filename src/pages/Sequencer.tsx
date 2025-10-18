import React, { useState } from 'react';
import { useNoteDispatcher } from '../hooks';
import type { Event, Note, NotePlayerTypeUnion } from '../model';
import { NotePlayerType } from '../model';
import { Button, Checkbox, Switch } from '../components';

export const Sequencer: React.FC = () => {
  const [selectedPlayerType, setSelectedPlayerType] = useState<NotePlayerTypeUnion>(NotePlayerType.SINE_WAVE);
  const [enableEffects, setEnableEffects] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { dispatchNote, availablePlayerTypes } = useNoteDispatcher();

  const playRandomNote = () => {
    const randomNote = Math.floor(Math.random() * 128);
    
    const note: Note = {
      channel: 1,
      note: randomNote,
      velocity: 100,
      duration: 500
    };
    
    const event: Event = {
      event: note,
      playerType: selectedPlayerType
    };
    
    dispatchNote(event);
  };

  const playSequence = () => {
    setIsPlaying(true);
    const notes = [
      { note: 60, playerType: NotePlayerType.SINE_WAVE },
      { note: 64, playerType: NotePlayerType.SAMPLER },
      { note: 67, playerType: NotePlayerType.MIDI_OUTPUT },
      { note: 72, playerType: NotePlayerType.SINE_WAVE },
    ];

    notes.forEach((noteInfo, index) => {
      setTimeout(() => {
        const note: Note = {
          channel: 1,
          note: noteInfo.note,
          velocity: 100,
          duration: 400
        };

        const event: Event = {
          event: note,
          playerType: noteInfo.playerType
        };

        dispatchNote(event);
        
        if (index === notes.length - 1) {
          setTimeout(() => setIsPlaying(false), 400);
        }
      }, index * 500);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            Music Sequencer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors">
            Create and play musical sequences with our web-based sequencer
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors">Audio Engine Settings</h2>
            
            <div className="mb-6">
              <label htmlFor="player-select" className="block text-sm font-medium text-gray-700 mb-2">
                Audio Engine
              </label>
              <select 
                id="player-select"
                value={selectedPlayerType} 
                onChange={(e) => setSelectedPlayerType(e.target.value as NotePlayerTypeUnion)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {availablePlayerTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <Checkbox
                checked={enableEffects}
                onChange={setEnableEffects}
                label="Enable Audio Effects"
                description="Apply reverb and delay to played notes"
              />
              
              <Switch
                checked={autoplay}
                onChange={setAutoplay}
                label="Autoplay Mode"
                description="Automatically play sequences"
                size="md"
              />
            </div>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Controls</h3>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                onClick={playRandomNote}
                disabled={isPlaying}
              >
                🎵 Play Random Note
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={playSequence}
                disabled={isPlaying}
              >
                {isPlaying ? '⏸️ Playing...' : '🎼 Play Sequence'}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => {/* TODO: Stop all */}}
                disabled={!isPlaying}
              >
                ⏹️ Stop All
              </Button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Quick Tips:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use "Play Random Note" to test individual notes</li>
              <li>• "Play Sequence" demonstrates a C major chord progression</li>
              <li>• Enable effects for enhanced audio experience</li>
              <li>• Switch audio engines to hear different sound types</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};