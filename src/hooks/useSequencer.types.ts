export interface SequencerEvent {
  note: number;
  velocity: number;
  duration: number;
  channel: number;
  playerType: import('@model').NotePlayerTypeUnion;
}

export interface TimedEvent {
  pulse: number;
  event: SequencerEvent;
}

export const PlaybackType = {
  FORWARD: 'forward',
  BACKWARDS: 'backwards',
  PINGPONG: 'pingpong'
} as const;

export type PlaybackType = typeof PlaybackType[keyof typeof PlaybackType];

export type GridResolution = 4 | 3 | 6 | 8 | 12 | 16 | 24 | 32;

export interface SequencerState {
  events: Map<number, SequencerEvent[]>; // pulse -> events[]
  duration: number; // duration in quarter notes
  playbackType: PlaybackType;
  gridResolution: GridResolution;
  isSnapToGrid: boolean;
  isActive: boolean;
}

export interface SequencerActions {
  setEvent: (pulse: number, event: SequencerEvent) => void;
  removeEvent: (pulse: number, eventIndex?: number) => void;
  clearEvents: () => void;
  setDuration: (duration: number) => void;
  setPlaybackType: (type: PlaybackType) => void;
  setGridResolution: (resolution: GridResolution) => void;
  setSnapToGrid: (enabled: boolean) => void;
  setActive: (active: boolean) => void;
  loadSequence: (events: TimedEvent[]) => void;
}