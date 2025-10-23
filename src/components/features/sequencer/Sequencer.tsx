import React, { useState, useMemo } from 'react';
import { useSequencer, type PlaybackType, type GridResolution } from '@hooks';
import { usePlayhead } from '@contexts';
import { Checkbox, Select, Button } from '@components';
import type { NotePlayerTypeUnion } from '@model';
import { NotePlayerType } from '@model';
import { PULSES_PER_QUARTER_NOTE } from '@utils';

export interface SequencerProps {
  className?: string;
}

export const Sequencer: React.FC<SequencerProps> = ({ className = '' }) => {
  const [selectedPlayerType, setSelectedPlayerType] = useState<NotePlayerTypeUnion>(NotePlayerType.SINE_WAVE);
  const [isExpanded, setIsExpanded] = useState(false);
  const [state, actions] = useSequencer(4); // 4 quarter notes duration by default
  const { pulseCount, isPlaying } = usePlayhead();
  const [hasInitialLoad, setHasInitialLoad] = React.useState(false);

  // Cargar secuencia inicial solo una vez
  React.useEffect(() => {
    if (!hasInitialLoad) {
      const cMajorScale = [60, 62, 64, 65, 67, 69, 71, 72]; // C4 to C5
      const totalPulses = state.duration * PULSES_PER_QUARTER_NOTE;
      
      const timedEvents = cMajorScale.map((note) => ({
        pulse: Math.floor(Math.random() * totalPulses), // Posición aleatoria dentro de la duración
        event: {
          note,
          velocity: 80,
          duration: 200,
          channel: 1,
          playerType: selectedPlayerType
        }
      }));
      
      actions.loadSequence(timedEvents);
      setHasInitialLoad(true);
    }
  }, [hasInitialLoad, selectedPlayerType, actions, state.duration]);

  const playerTypeOptions = [
    { 
      value: NotePlayerType.SINE_WAVE, 
      label: 'Sine Wave'
    },
    { 
      value: NotePlayerType.SAMPLER, 
      label: 'Sampler'
    },
    { 
      value: NotePlayerType.MIDI_OUTPUT, 
      label: 'MIDI Output'
    }
  ];

  const playbackTypeOptions = [
    { value: 'forward', label: 'Forward' },
    { value: 'backwards', label: 'Backwards' },
    { value: 'pingpong', label: 'Ping Pong' },
    { value: 'random', label: 'Random' }
  ];

  const gridResolutionOptions = [
    { value: '4', label: '1/4 - Quarter Notes' },
    { value: '8', label: '1/8 - Eighth Notes' },
    { value: '16', label: '1/16 - Sixteenth Notes' },
    { value: '32', label: '1/32 - Thirty-second Notes' }
  ];

  const activeEventsCount = useMemo(() => {
    return Array.from(state.events.values()).reduce((total, events) => total + events.length, 0);
  }, [state.events]);

  // Calcular posiciones de grilla y eventos para la representación gráfica
  const visualData = useMemo(() => {
    const totalPulses = state.duration * PULSES_PER_QUARTER_NOTE;
    const gridSteps = state.duration * (state.gridResolution / 4); // Total grid steps
    
    // Crear array de posiciones de grilla (líneas verticales)
    const gridLines = [];
    for (let i = 0; i <= gridSteps; i++) {
      const pulse = (i / gridSteps) * totalPulses;
      const position = (i / gridSteps) * 100; // Percentage position
      gridLines.push({ pulse, position });
    }
    
    // Obtener posiciones de eventos (rombos)
    const eventPositions: Array<{
      pulse: number;
      position: number;
      note: number;
      velocity: number;
    }> = [];
    state.events.forEach((eventArray, pulse) => {
      eventArray.forEach(event => {
        const position = (pulse / totalPulses) * 100;
        eventPositions.push({ 
          pulse, 
          position, 
          note: event.note,
          velocity: event.velocity 
        });
      });
    });

    // Calcular posición del playhead
    const sequencePulse = pulseCount % totalPulses;
    const playheadPosition = (sequencePulse / totalPulses) * 100;
    
    return { gridLines, eventPositions, playheadPosition };
  }, [state.events, state.duration, state.gridResolution, pulseCount]);

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 ${className}`}>
      {/* Zona Superior: Header con checkbox Active y chevron */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg 
              className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm font-medium">Sequencer</span>
          </button>
          
          <Checkbox
            checked={state.isActive}
            onChange={actions.setActive}
            label="Active"
          />
        </div>
        
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {activeEventsCount} events
        </span>
      </div>

      {/* Zona Intermedia: Configuración (colapsable) */}
      {isExpanded && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Player Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Player Type
              </label>
              <Select
                value={selectedPlayerType}
                onChange={(value) => setSelectedPlayerType(value as NotePlayerTypeUnion)}
                options={playerTypeOptions}
              />
            </div>

            {/* Playback Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Playback Mode
              </label>
              <Select
                value={state.playbackType}
                onChange={(value) => actions.setPlaybackType(value as PlaybackType)}
                options={playbackTypeOptions}
              />
            </div>

            {/* Grid Resolution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grid Resolution
              </label>
              <Select
                value={state.gridResolution.toString()}
                onChange={(value) => actions.setGridResolution(Number(value) as GridResolution)}
                options={gridResolutionOptions}
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration (Quarter Notes)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={state.duration}
                  onChange={(e) => actions.setDuration(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded min-w-[40px] text-center">
                  {state.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={state.isSnapToGrid}
                onChange={actions.setSnapToGrid}
                label="Snap to Grid"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={actions.clearEvents}
                size="sm"
              >
                Clear All
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const cMajorScale = [60, 62, 64, 65, 67, 69, 71, 72];
                  const totalPulses = state.duration * PULSES_PER_QUARTER_NOTE;
                  
                  const timedEvents = cMajorScale.map((note) => ({
                    pulse: Math.floor(Math.random() * totalPulses), // Posición aleatoria dentro de la duración
                    event: {
                      note,
                      velocity: 80,
                      duration: 200,
                      channel: 1,
                      playerType: selectedPlayerType
                    }
                  }));
                  actions.loadSequence(timedEvents);
                }}
                size="sm"
              >
                Load C Major
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Zona Inferior: Representación Gráfica */}
      <div className="p-4">
        <div className="relative w-full h-16 bg-gray-100 dark:bg-gray-800 rounded border">
          {/* Línea horizontal principal */}
          <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-gray-400 dark:bg-gray-600 transform -translate-y-1/2"></div>
          
          {/* Líneas verticales de grilla */}
          {visualData.gridLines.map((gridLine, index) => (
            <div
              key={index}
              className="absolute top-2 bottom-2 w-0.5 bg-gray-300 dark:bg-gray-700 z-5"
              style={{ left: `${gridLine.position}%` }}
            ></div>
          ))}
          
          {/* Rombos representando eventos */}
          {visualData.eventPositions.map((event, index) => (
            <div
              key={index}
              className="absolute top-1/2 w-3 h-3 bg-blue-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45 z-20"
              style={{ left: `${event.position}%` }}
              title={`Note: ${event.note}, Velocity: ${event.velocity}, Pulse: ${event.pulse}`}
            ></div>
          ))}
          
          {/* Marcadores de beats (negras) */}
          {Array.from({ length: state.duration + 1 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-0.5 bg-gray-600 dark:bg-gray-400 z-10"
              style={{ left: `${(i / state.duration) * 100}%` }}
            ></div>
          ))}
          
          {/* Línea del playhead */}
          {isPlaying && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 dark:bg-red-400 z-15 transition-all duration-75"
              style={{ left: `${visualData.playheadPosition}%` }}
              title={`Playhead: ${pulseCount} pulses`}
            ></div>
          )}
        </div>
        
        {/* Info de la representación */}
        <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Duration: {state.duration} beats</span>
          <span>Grid: 1/{state.gridResolution}</span>
          <span>Mode: {state.playbackType}</span>
          {isPlaying && (
            <span className="text-red-500 dark:text-red-400">
              ▶ Pulse: {pulseCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};