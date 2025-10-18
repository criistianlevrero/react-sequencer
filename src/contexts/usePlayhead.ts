import { useContext } from 'react';
import { PlayheadContext } from './PlayheadContext';

export interface PlayheadContextType {
  // State
  isPlaying: boolean;
  isPaused: boolean;
  bpm: number; // Negras por minuto
  pulseCount: number; // Contador de pulsos actual
  
  // Actions
  play: () => void;
  pause: () => void;
  stop: () => void;
  setBpm: (newBpm: number) => void;
}

// Hook personalizado para usar el contexto
export const usePlayhead = (): PlayheadContextType => {
  const context = useContext(PlayheadContext);
  if (context === undefined) {
    throw new Error('usePlayhead must be used within a PlayheadProvider');
  }
  return context;
};