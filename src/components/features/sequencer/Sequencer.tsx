import React, { useEffect, useRef, useState, useMemo } from 'react';
import { usePlayhead } from '../../../contexts';
import { useNoteDispatcher } from '../../../hooks';
import { Checkbox, Select } from '../..';
import type { Event, Note, NotePlayerTypeUnion } from '../../../model';
import { NotePlayerType } from '../../../model';

export interface SequencerProps {
  className?: string;
}

export const Sequencer: React.FC<SequencerProps> = ({ className = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedPlayerType, setSelectedPlayerType] = useState<NotePlayerTypeUnion>(NotePlayerType.SINE_WAVE);
  const { pulseCount, isPlaying, getPulsesPerQuarterNote } = usePlayhead();
  const { dispatchNote } = useNoteDispatcher();
  const lastPlayedPulseRef = useRef<number>(0);
  const sequenceIndexRef = useRef<number>(0);

  // Secuencia de notas predefinida - C major scale
  const noteSequence = useMemo(() => [
    60, // C4
    62, // D4  
    64, // E4
    65, // F4
    67, // G4
    69, // A4
    71, // B4
    72, // C5
  ], []);

  const pulsesPerQuarterNote = getPulsesPerQuarterNote();

  useEffect(() => {
    if (!isActive || !isPlaying || pulseCount === 0) {
      return;
    }

    // Usar módulo para detectar cuándo cruzamos un múltiplo de pulsesPerQuarterNote
    const currentRemainder = pulseCount % pulsesPerQuarterNote;
    const lastRemainder = lastPlayedPulseRef.current % pulsesPerQuarterNote;

    // Si cruzamos de un valor mayor a uno menor, significa que pasó una negra
    const crossedQuarterNote = (currentRemainder < lastRemainder) || 
                              (currentRemainder === 0 && lastRemainder !== 0 && pulseCount > lastPlayedPulseRef.current);

    if (crossedQuarterNote) {
      // Obtener la siguiente nota en la secuencia
      const noteIndex = sequenceIndexRef.current % noteSequence.length;
      const noteValue = noteSequence[noteIndex];

      // Crear y disparar el evento de nota
      const note: Note = {
        channel: 1,
        note: noteValue,
        velocity: 80,
        duration: 200 // Duración de la nota
      };

      const event: Event = {
        event: note,
        playerType: selectedPlayerType
      };

      dispatchNote(event);

      // Avanzar al siguiente índice en la secuencia
      sequenceIndexRef.current = (sequenceIndexRef.current + 1) % noteSequence.length;
    }

    lastPlayedPulseRef.current = pulseCount;
  }, [pulseCount, isActive, isPlaying, selectedPlayerType, dispatchNote, pulsesPerQuarterNote, noteSequence]);

  // Resetear cuando se detiene el playhead o se desactiva
  useEffect(() => {
    if (!isPlaying || !isActive) {
      lastPlayedPulseRef.current = 0;
      sequenceIndexRef.current = 0;
    }
  }, [isPlaying, isActive]);

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

  return (
    <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Sequencer
        </h3>
        <div className="flex items-center gap-2">
          {isActive && isPlaying && (
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          )}
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {isActive ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <Checkbox
          checked={isActive}
          onChange={setIsActive}
          label="Activar Sequencer"
          description="Reproduce una secuencia de notas en cada negra del playhead"
        />

        <Select
          value={selectedPlayerType}
          onChange={(value) => setSelectedPlayerType(value as NotePlayerTypeUnion)}
          label="Salida de Audio"
          options={playerTypeOptions}
          disabled={!isActive}
        />

        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <div>Secuencia: Escala de C Mayor (8 notas)</div>
          <div>Nota actual: {isActive ? `${sequenceIndexRef.current + 1}/8` : '-'}</div>
          <div>Próxima nota: {isActive ? getNoteLabel(noteSequence[sequenceIndexRef.current]) : '-'}</div>
        </div>
      </div>
    </div>
  );
};

// Función helper para obtener el nombre de la nota
function getNoteLabel(midiNote: number): string {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(midiNote / 12) - 1;
  const noteIndex = midiNote % 12;
  return `${noteNames[noteIndex]}${octave}`;
}