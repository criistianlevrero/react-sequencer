import type { Note } from './note';
import type { NotePlayerType } from './notePlayerTypes';

export interface Event {
  event: Note;
  playerType: NotePlayerType;
}