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