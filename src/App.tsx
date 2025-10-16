import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNoteDispatcher } from './hooks'
import type { Event, Note, NotePlayerTypeUnion } from './model'
import { NotePlayerType } from './model'

function App() {
  const [count, setCount] = useState(0)
  const [selectedPlayerType, setSelectedPlayerType] = useState<NotePlayerTypeUnion>(NotePlayerType.SINE_WAVE)
  const { dispatchNote, availablePlayerTypes } = useNoteDispatcher()

  const playRandomNote = () => {
    // Generate random note between 0-127
    const randomNote = Math.floor(Math.random() * 128)
    
    // Create a random note with fixed duration of 500ms
    const note: Note = {
      channel: 1,
      note: randomNote,
      velocity: 100, // Fixed velocity
      duration: 500  // 500ms duration as requested
    }
    
    // Create event and play it
    const event: Event = {
      event: note,
      playerType: selectedPlayerType // Use the selected player type
    }
    
    dispatchNote(event)
  }

  const playSequence = () => {
    // Play a sequence of notes with different player types
    const notes = [
      { note: 60, playerType: NotePlayerType.SINE_WAVE },    // C4 with sine wave
      { note: 64, playerType: NotePlayerType.SAMPLER },     // E4 with sampler (fallback to sine)
      { note: 67, playerType: NotePlayerType.MIDI_OUTPUT }, // G4 with MIDI output (fallback to sine)
      { note: 72, playerType: NotePlayerType.SINE_WAVE },   // C5 with sine wave
    ];

    notes.forEach((noteInfo, index) => {
      setTimeout(() => {
        const note: Note = {
          channel: 1,
          note: noteInfo.note,
          velocity: 100,
          duration: 400
        };

        const event: Event = {
          event: note,
          playerType: noteInfo.playerType
        };

        dispatchNote(event);
      }, index * 500); // 500ms between notes
    });
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Music Sequencer</h1>
      <div className="card">
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="player-select">Audio Engine: </label>
          <select 
            id="player-select"
            value={selectedPlayerType} 
            onChange={(e) => setSelectedPlayerType(e.target.value as NotePlayerTypeUnion)}
            style={{ marginLeft: '10px' }}
          >
            {availablePlayerTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={playRandomNote} style={{ marginLeft: '10px' }}>
          🎵 Play Random Note
        </button>
        <button onClick={playSequence} style={{ marginLeft: '10px' }}>
          🎼 Play Sequence
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
