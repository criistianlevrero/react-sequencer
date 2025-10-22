import { useCallback } from 'react';
import type { Event } from '@model';
import type { INotePlayer } from './interfaces';

export const useNotePlayer = (): INotePlayer => {
  // Convert MIDI note number to frequency using the formula: f = 440 * 2^((n-69)/12)
  const midiToFrequency = useCallback((midiNote: number): number => {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
  }, []);

  // Create and play a sine wave tone
  const playNote = useCallback((event: Event) => {
    const { note, velocity, duration } = event.event;
    
    // Create audio context
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextClass();
    
    // Create oscillator for sine wave
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Set oscillator properties
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(midiToFrequency(note), audioContext.currentTime);
    
    // Set volume based on velocity (MIDI velocity is 0-127, convert to 0-1)
    const volume = (velocity / 127) * 0.3; // Max volume 0.3 to avoid being too loud
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    
    // Connect nodes: oscillator -> gain -> destination (speakers)
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Start the oscillator
    oscillator.start(audioContext.currentTime);
    
    // Stop the oscillator after the specified duration
    oscillator.stop(audioContext.currentTime + duration / 1000);
    
    // Clean up
    setTimeout(() => {
      audioContext.close();
    }, duration + 100);
  }, [midiToFrequency]);

  return {
    playNote
  };
};