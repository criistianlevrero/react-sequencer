import React, { useState } from 'react';
import { SpeakerWaveIcon, MusicalNoteIcon, SignalIcon } from '@heroicons/react/24/outline';
import { useNoteDispatcher } from '../hooks';
import type { Event, Note, NotePlayerTypeUnion } from '../model';
import { NotePlayerType } from '../model';
import { Button, Card, Checkbox, Switch, Select } from '../components';

export const Sequencer: React.FC = () => {
  const [selectedPlayerType, setSelectedPlayerType] = useState<NotePlayerTypeUnion>(NotePlayerType.SINE_WAVE);
  const [enableEffects, setEnableEffects] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { dispatchNote } = useNoteDispatcher();

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

        <Card>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors">Audio Engine Settings</h2>
            
            <div className="mb-6">
              <Select
                value={selectedPlayerType}
                onChange={(value) => setSelectedPlayerType(value as NotePlayerTypeUnion)}
                label="Audio Engine"
                options={[
                  { 
                    value: NotePlayerType.SINE_WAVE, 
                    label: 'SINE WAVE',
                    icon: SignalIcon
                  },
                  { 
                    value: NotePlayerType.SAMPLER, 
                    label: 'SAMPLER',
                    icon: MusicalNoteIcon
                  },
                  { 
                    value: NotePlayerType.MIDI_OUTPUT, 
                    label: 'MIDI OUTPUT',
                    icon: SpeakerWaveIcon
                  }
                ]}
              />
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

          <div className="border-t dark:border-gray-700 pt-8 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors">Controls</h3>
            
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

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2 transition-colors">Quick Tips:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 transition-colors">
              <li>• Use "Play Random Note" to test individual notes</li>
              <li>• "Play Sequence" demonstrates a C major chord progression</li>
              <li>• Enable effects for enhanced audio experience</li>
              <li>• Switch audio engines to hear different sound types</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};