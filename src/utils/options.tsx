import { NotePlayerType } from '@model';

export const playerTypeOptions = [
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

export const playbackTypeOptions = [
  { value: 'forward', label: 'Forward' },
  { value: 'backwards', label: 'Backwards' },
  { value: 'pingpong', label: 'Ping Pong' }
];

export const gridResolutionOptions = [
  { value: '4', label: '1/4 - Quarter Notes' },
  { value: '8', label: '1/8 - Eighth Notes' },
  { value: '16', label: '1/16 - Sixteenth Notes' },
  { value: '32', label: '1/32 - Thirty-second Notes' }
];