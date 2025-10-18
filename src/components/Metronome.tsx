import React, { useEffect, useRef, useState } from 'react';
import { usePlayhead } from '../contexts';
import { Button } from './Button';

export interface MetronomeProps {
  onTick: () => void; // Función que se ejecuta en cada tick del metrónomo
  className?: string;
}

export const Metronome: React.FC<MetronomeProps> = ({ onTick, className = '' }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { pulseCount, isPlaying, getPulsesPerQuarterNote } = usePlayhead();
  const lastTickPulseRef = useRef<number>(0);
  
  const pulsesPerQuarterNote = getPulsesPerQuarterNote();

  useEffect(() => {
    if (!isEnabled || !isPlaying || pulseCount === 0) {
      return;
    }

    // Usar módulo para detectar cuándo cruzamos un múltiplo de pulsesPerQuarterNote
    const currentRemainder = pulseCount % pulsesPerQuarterNote;
    const lastRemainder = lastTickPulseRef.current % pulsesPerQuarterNote;

    // Si cruzamos de un valor mayor a uno menor, significa que pasó una negra
    // O si es el primer pulso exactamente en una negra (remainder === 0 y lastRemainder !== 0)
    const crossedQuarterNote = (currentRemainder < lastRemainder) || 
                              (currentRemainder === 0 && lastRemainder !== 0 && pulseCount > lastTickPulseRef.current);

    if (crossedQuarterNote) {
      onTick();
    }

    lastTickPulseRef.current = pulseCount;
  }, [pulseCount, isEnabled, isPlaying, onTick, pulsesPerQuarterNote]);

  // Resetear cuando se detiene el playhead
  useEffect(() => {
    if (!isPlaying) {
      lastTickPulseRef.current = 0;
    }
  }, [isPlaying]);

  const toggleMetronome = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      // Al activar, sincronizar con el pulso actual
      lastTickPulseRef.current = pulseCount;
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Button
        variant={isEnabled ? "primary" : "outline"}
        onClick={toggleMetronome}
        disabled={!isPlaying && !isEnabled}
      >
        {isEnabled ? '🔔 Metrónomo ON' : '🔕 Metrónomo OFF'}
      </Button>
      
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {isEnabled ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Activo
          </span>
        ) : (
          'Inactivo'
        )}
      </div>
    </div>
  );
};