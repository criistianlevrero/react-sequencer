import { useCallback } from 'react';
import type { Event } from '@model';
import type { INotePlayer } from './interfaces';

// Parámetros de la envolvente ADSR (en segundos)
const ATTACK_TIME = 0.01;   // Tiempo de ataque - rápido para evitar clicks
const DECAY_TIME = 0.1;     // Tiempo de decaimiento 
const SUSTAIN_LEVEL = 0.7;  // Nivel de sustain (0-1)
const RELEASE_TIME = 0.3;   // Tiempo de release

export const useNotePlayer = (): INotePlayer => {
  // Convert MIDI note number to frequency using the formula: f = 440 * 2^((n-69)/12)
  const midiToFrequency = useCallback((midiNote: number): number => {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
  }, []);

  // Create and play a sine wave tone with ADSR envelope
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
    
    // Calculate envelope timing
    const currentTime = audioContext.currentTime;
    const noteDuration = duration / 1000; // Convert ms to seconds
    
    // Adjust sustain duration based on note duration
    const sustainDuration = Math.max(0, noteDuration - ATTACK_TIME - DECAY_TIME - RELEASE_TIME);
    
    // Set volume based on velocity (MIDI velocity is 0-127, convert to 0-1)
    const maxVolume = (velocity / 127) * 0.3; // Max volume 0.3 to avoid being too loud
    const sustainVolume = maxVolume * SUSTAIN_LEVEL;
    
    // Apply ADSR envelope
    gainNode.gain.setValueAtTime(0, currentTime); // Start at 0
    
    // Attack: 0 -> maxVolume
    gainNode.gain.linearRampToValueAtTime(maxVolume, currentTime + ATTACK_TIME);
    
    // Decay: maxVolume -> sustainVolume
    gainNode.gain.linearRampToValueAtTime(sustainVolume, currentTime + ATTACK_TIME + DECAY_TIME);
    
    // Sustain: mantener sustainVolume durante la duración
    if (sustainDuration > 0) {
      gainNode.gain.setValueAtTime(sustainVolume, currentTime + ATTACK_TIME + DECAY_TIME + sustainDuration);
    }
    
    // Release: sustainVolume -> 0
    const releaseStartTime = sustainDuration > 0 
      ? currentTime + ATTACK_TIME + DECAY_TIME + sustainDuration
      : currentTime + ATTACK_TIME + DECAY_TIME;
    gainNode.gain.linearRampToValueAtTime(0, releaseStartTime + RELEASE_TIME);
    
    // Connect nodes: oscillator -> gain -> destination (speakers)
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Start the oscillator
    oscillator.start(currentTime);
    
    // Stop the oscillator after the envelope completes
    const stopTime = releaseStartTime + RELEASE_TIME;
    oscillator.stop(stopTime);
    
    // Clean up
    setTimeout(() => {
      audioContext.close();
    }, (stopTime - currentTime) * 1000 + 100);
  }, [midiToFrequency]);

  return {
    playNote
  };
};