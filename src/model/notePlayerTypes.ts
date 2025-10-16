// Types for different note player types
export const NotePlayerType = {
  SINE_WAVE: 'sine_wave',
  SAMPLER: 'sampler',
  MIDI_OUTPUT: 'midi_output'
} as const;

export type NotePlayerType = typeof NotePlayerType[keyof typeof NotePlayerType];