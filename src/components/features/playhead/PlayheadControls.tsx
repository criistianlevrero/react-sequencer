import React from 'react';
import { usePlayhead } from '@contexts';
import { Button } from '@components';

export interface PlayheadControlsProps {
  className?: string;
}

export const PlayheadControls: React.FC<PlayheadControlsProps> = ({ className = '' }) => {
  const playhead = usePlayhead();

  return (
    <div className={`${className}`}>     
      {/* Primera línea: Controles principales */}
      <div className="flex items-center gap-4 mb-6">
        {/* Botones Play/Pause y Stop */}
        <div className="flex gap-2">
          <Button 
            variant={playhead.isPlaying && !playhead.isPaused ? "secondary" : "primary"}
            onClick={() => {
              if (playhead.isPlaying && !playhead.isPaused) {
                playhead.pause();
              } else {
                playhead.play();
              }
            }}
          >
            {playhead.isPlaying && !playhead.isPaused ? '⏸️' : '▶️'}
          </Button>
          
          <Button 
            variant="outline"
            onClick={playhead.stop}
            disabled={!playhead.isPlaying && !playhead.isPaused}
          >
            ⏹️
          </Button>
        </div>

        {/* Slider BPM */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            BPM
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
      </div>

      {/* Segunda línea: Información de estado */}
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-sm font-mono">
          <div>Estado: {playhead.isPlaying ? (playhead.isPaused ? 'Pausado' : 'Reproduciendo') : 'Detenido'}</div>
          <div>BPM: {playhead.bpm}</div>
          <div>Pulsos: {playhead.pulseCount.toLocaleString()}</div>
          <div>Negras: {Math.floor(playhead.pulseCount / playhead.getPulsesPerQuarterNote())}</div>
          <div>Progreso: {playhead.pulseCount % playhead.getPulsesPerQuarterNote()}/{playhead.getPulsesPerQuarterNote()} pulsos</div>
          <div>Tiempo: {((playhead.pulseCount / playhead.getPulsesPerQuarterNote()) / (playhead.bpm / 60)).toFixed(2)}s</div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 pt-2 border-t border-gray-300 dark:border-gray-600">
          Debug: {playhead.isPlaying ? '✅ Playing' : '❌ Stopped'} | 
          Pulsos/seg: {((playhead.bpm / 60) * playhead.getPulsesPerQuarterNote()).toFixed(0)}
        </div>
      </div>
    </div>
  );
};