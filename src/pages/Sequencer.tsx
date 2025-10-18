import React, { useState } from 'react';
import { SpeakerWaveIcon, MusicalNoteIcon, SignalIcon } from '@heroicons/react/24/outline';
import { useNoteDispatcher } from '../hooks';
import { usePlayhead } from '../contexts';
import type { Event, Note, NotePlayerTypeUnion } from '../model';
import { NotePlayerType } from '../model';
import { Button, Card, Checkbox, Switch, Select, Metronome } from '../components';

export const Sequencer: React.FC = () => {
  const [selectedPlayerType, setSelectedPlayerType] = useState<NotePlayerTypeUnion>(NotePlayerType.SINE_WAVE);
  const [enableEffects, setEnableEffects] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { dispatchNote } = useNoteDispatcher();
  
  // Playhead context
  const playhead = usePlayhead();

  // Función para el tick del metrónomo
  const handleMetronomeTick = () => {
    const metronomeNote: Note = {
      channel: 1,
      note: 72, // C5 - nota aguda para el metrónomo
      velocity: 80,
      duration: 100 // Duración muy corta
    };

    const event: Event = {
      event: metronomeNote,
      playerType: NotePlayerType.SINE_WAVE // Usar onda senoidal para el metrónomo
    };

    dispatchNote(event);
  };

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
    <div className="">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Music Sequencer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Create and play musical sequences with our web-based sequencer
          </p>
        </div>

        <Card>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Audio Engine Settings</h2>
            
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

          <div className="border-t dark:border-gray-700 pt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Controls</h3>
            
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

          {/* Playhead Controls */}
          <div className="border-t dark:border-gray-700 pt-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Playhead Control</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    BPM (Negras por minuto)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="60"
                      max="200"
                      value={playhead.bpm}
                      onChange={(e) => playhead.setBpm(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded min-w-[60px] text-center">
                      {playhead.bpm}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant={playhead.isPlaying && !playhead.isPaused ? "secondary" : "primary"}
                    onClick={playhead.play}
                    disabled={playhead.isPlaying && !playhead.isPaused}
                  >
                    ▶️ Play
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={playhead.pause}
                    disabled={!playhead.isPlaying || playhead.isPaused}
                  >
                    ⏸️ Pause
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={playhead.stop}
                    disabled={!playhead.isPlaying && !playhead.isPaused}
                  >
                    ⏹️ Stop
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Status:</h4>
                <div className="space-y-1 text-sm font-mono">
                  <div>Estado: {playhead.isPlaying ? (playhead.isPaused ? 'Pausado' : 'Reproduciendo') : 'Detenido'}</div>
                  <div>BPM: {playhead.bpm}</div>
                  <div>Pulsos: {playhead.pulseCount.toLocaleString()}</div>
                  <div>Negras: {Math.floor(playhead.pulseCount / playhead.getPulsesPerQuarterNote())}</div>
                  <div>Progreso: {playhead.pulseCount % playhead.getPulsesPerQuarterNote()}/{playhead.getPulsesPerQuarterNote()} pulsos</div>
                  <div>Tiempo: {((playhead.pulseCount / playhead.getPulsesPerQuarterNote()) / (playhead.bpm / 60)).toFixed(2)}s</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Debug: {playhead.isPlaying ? '✅ Playing' : '❌ Stopped'} | 
                    Pulsos/seg: {((playhead.bpm / 60) * playhead.getPulsesPerQuarterNote()).toFixed(0)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metronome Section */}
          <div className="border-t dark:border-gray-700 pt-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Metrónomo</h3>
            <div className="mb-4">
              <Metronome 
                onTick={handleMetronomeTick}
                className="mb-4"
              />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                El metrónomo emite una nota corta en cada negra cuando el playhead está activo.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Quick Tips:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
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