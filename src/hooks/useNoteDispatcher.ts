import { useCallback } from 'react';
import type { Event } from '@model';
import { NotePlayerType } from '@model';
import { useNotePlayer } from './useNotePlayer';
import type { INotePlayer } from './interfaces';

export const useNoteDispatcher = () => {
  const sineWavePlayer = useNotePlayer();

  // Create different player instances based on type
  const getPlayer = useCallback((playerType: typeof NotePlayerType[keyof typeof NotePlayerType]): INotePlayer => {
    switch (playerType) {
      case NotePlayerType.SINE_WAVE:
        return sineWavePlayer;
      
      case NotePlayerType.SAMPLER:
        // TODO: Implement sampler player
        console.warn('Sampler player not implemented yet, falling back to sine wave');
        return sineWavePlayer;
      
      case NotePlayerType.MIDI_OUTPUT:
        // TODO: Implement MIDI output player
        console.warn('MIDI output player not implemented yet, falling back to sine wave');
        return sineWavePlayer;
      
      default:
        return sineWavePlayer;
    }
  }, [sineWavePlayer]);

  // Dispatch the note to the appropriate player
  const dispatchNote = useCallback((event: Event) => {
    const player = getPlayer(event.playerType);
    player.playNote(event);
  }, [getPlayer]);

  return {
    dispatchNote,
    availablePlayerTypes: Object.values(NotePlayerType)
  };
};