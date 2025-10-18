import React from 'react';
import { usePlayhead } from '../contexts';
import { Button, Card } from '../components';

export const Sequencer: React.FC = () => {
  const playhead = usePlayhead();

  return (
    <div className="">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Music Sequencer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Professional audio sequencer with precise timing control
          </p>
        </div>

        <Card>
          {/* Playhead Controls */}
          <div className="mb-8">
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
        </Card>
      </div>
    </div>
  );
};