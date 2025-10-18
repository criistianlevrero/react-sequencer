import React, { createContext, useState, useRef, useCallback, useEffect } from 'react';
import type { PlayheadContextType } from './usePlayhead';

const PlayheadContext = createContext<PlayheadContextType | undefined>(undefined);

interface PlayheadProviderProps {
  children: React.ReactNode;
}

export const PlayheadProvider: React.FC<PlayheadProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [bpm, setBpmState] = useState(120); // 120 BPM por defecto
  const [pulseCount, setPulseCount] = useState(0);
  
  // Referencias para el control del timing
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedDurationRef = useRef<number>(0); // Tiempo total pausado acumulado
  const pauseStartTimeRef = useRef<number | null>(null);

  // Constantes
  const PULSES_PER_QUARTER_NOTE = 480; // 480 pulsos por negra

  // Función para limpiar el intervalo
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Función para reproducir
  const play = useCallback(() => {
    if (isPaused) {
      // Si estaba pausado, calcular tiempo pausado acumulado
      if (pauseStartTimeRef.current) {
        pausedDurationRef.current += Date.now() - pauseStartTimeRef.current;
        pauseStartTimeRef.current = null;
      }
      setIsPaused(false);
    } else {
      // Si es un nuevo inicio, resetear todo
      startTimeRef.current = Date.now();
      pausedDurationRef.current = 0;
      pauseStartTimeRef.current = null;
      setPulseCount(0);
    }
    
    setIsPlaying(true);
    
    // Iniciar el intervalo de actualización
    clearTimer();
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTimeRef.current - pausedDurationRef.current) / 1000; // en segundos
        
        // Calcular pulsos basado en BPM
        const quarterNotesPerSecond = bpm / 60;
        const pulsesPerSecond = quarterNotesPerSecond * PULSES_PER_QUARTER_NOTE;
        const newPulseCount = Math.floor(elapsedTime * pulsesPerSecond);
        
        setPulseCount(Math.max(0, newPulseCount));
      }
    }, 16); // ~60fps para suavidad
  }, [isPaused, bpm, clearTimer]);

  // Función para pausar
  const pause = useCallback(() => {
    if (!isPlaying) return;
    
    setIsPlaying(false);
    setIsPaused(true);
    pauseStartTimeRef.current = Date.now();
    clearTimer();
  }, [isPlaying, clearTimer]);

  // Función para detener
  const stop = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setPulseCount(0);
    startTimeRef.current = null;
    pausedDurationRef.current = 0;
    pauseStartTimeRef.current = null;
    clearTimer();
  }, [clearTimer]);

  // Función para cambiar BPM
  const setBpm = useCallback((newBpm: number) => {
    if (newBpm <= 0) return; // Validación básica
    setBpmState(newBpm);
  }, []);

  // Limpiar intervalo al desmontar el componente
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const contextValue: PlayheadContextType = {
    isPlaying,
    isPaused,
    bpm,
    pulseCount,
    play,
    pause,
    stop,
    setBpm,
  };

  return (
    <PlayheadContext.Provider value={contextValue}>
      {children}
    </PlayheadContext.Provider>
  );
};

// Exportar el contexto por si se necesita acceso directo
export { PlayheadContext };