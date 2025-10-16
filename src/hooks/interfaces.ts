import type { Event } from '../model';

// Define the interface that all note players must implement
export interface INotePlayer {
  playNote: (event: Event) => void;
}