import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePlayhead } from '@contexts';
import { useNotePlayer } from '@hooks';
import { PULSES_PER_QUARTER_NOTE } from '@utils';
import type { 
  SequencerState, 
  SequencerActions, 
  SequencerEvent, 
  TimedEvent, 
  PlaybackType, 
  GridResolution 
} from './useSequencer.types';

export function useSequencer(initialDuration = 4): [SequencerState, SequencerActions] {
  // Estado interno
  const [events, setEvents] = useState<Map<number, SequencerEvent[]>>(new Map());
  const [duration, setDurationState] = useState(initialDuration);
  const [playbackType, setPlaybackTypeState] = useState<PlaybackType>('forward');
  const [gridResolution, setGridResolutionState] = useState<GridResolution>(16);
  const [isSnapToGrid, setSnapToGridState] = useState(true);
  const [isActive, setActiveState] = useState(true);

  // Referencias para control interno
  const lastPlayedEventRef = useRef<number>(-1);
  const playbackCycleRef = useRef<number>(0);

  // Hooks de contexto
  const { pulseCount, isPlaying } = usePlayhead();
  const { playNote } = useNotePlayer();

  // Utilidades para cálculo de pulsos
  const pulsesPerQuarterNote = useMemo(() => PULSES_PER_QUARTER_NOTE, []);
  const totalPulses = useMemo(() => duration * pulsesPerQuarterNote, [duration, pulsesPerQuarterNote]);

  // Obtener eventos activos ordenados
  const activeEvents = useMemo(() => {
    const eventList: TimedEvent[] = [];
    events.forEach((eventArray, pulse) => {
      eventArray.forEach(event => {
        eventList.push({ pulse, event });
      });
    });
    return eventList.sort((a, b) => a.pulse - b.pulse);
  }, [events]);

  // Algoritmo de playback forward
  const getForwardEvent = useCallback((currentPulse: number): TimedEvent | null => {
    if (activeEvents.length === 0) return null;
    
    const sequencePulse = currentPulse % totalPulses;
    const event = activeEvents.find(e => e.pulse === sequencePulse);
    
    return event || null;
  }, [activeEvents, totalPulses]);

  // Algoritmo de playback backwards
  const getBackwardsEvent = useCallback((currentPulse: number): TimedEvent | null => {
    if (activeEvents.length === 0) return null;
    
    const sequencePulse = currentPulse % totalPulses;
    const invertedPulse = totalPulses - 1 - sequencePulse;
    const event = activeEvents.find(e => e.pulse === invertedPulse);
    
    return event || null;
  }, [activeEvents, totalPulses]);

  // Algoritmo de playback pingpong
  const getPingPongEvent = useCallback((currentPulse: number): TimedEvent | null => {
    if (activeEvents.length === 0) return null;
    
    const cycleNumber = Math.floor(currentPulse / totalPulses);
    const isForwardCycle = cycleNumber % 2 === 0;
    
    if (isForwardCycle) {
      return getForwardEvent(currentPulse);
    } else {
      return getBackwardsEvent(currentPulse);
    }
  }, [activeEvents, totalPulses, getForwardEvent, getBackwardsEvent]);

  // Selector de algoritmo según playback type
  const getCurrentEvent = useCallback((currentPulse: number): TimedEvent | null => {
    switch (playbackType) {
      case 'forward':
        return getForwardEvent(currentPulse);
      case 'backwards':
        return getBackwardsEvent(currentPulse);
      case 'pingpong':
        return getPingPongEvent(currentPulse);
      default:
        return getForwardEvent(currentPulse);
    }
  }, [playbackType, getForwardEvent, getBackwardsEvent, getPingPongEvent]);

  // Efecto para reproducción de eventos
  useEffect(() => {
    if (!isPlaying || !isActive) return;

    const event = getCurrentEvent(pulseCount);
    
    if (event && pulseCount !== lastPlayedEventRef.current) {
      playNote({
        event: {
          note: event.event.note,
          velocity: event.event.velocity,
          duration: event.event.duration,
          channel: event.event.channel
        },
        playerType: event.event.playerType
      });
      lastPlayedEventRef.current = pulseCount;
    }
  }, [pulseCount, isPlaying, isActive, getCurrentEvent, playNote]);

  // Acciones del hook
  const setEvent = useCallback((pulse: number, event: SequencerEvent) => {
    setEvents(prev => {
      const newEvents = new Map(prev);
      const existingEvents = newEvents.get(pulse) || [];
      newEvents.set(pulse, [...existingEvents, event]);
      return newEvents;
    });
  }, []);

  const removeEvent = useCallback((pulse: number, eventIndex?: number) => {
    setEvents(prev => {
      const newEvents = new Map(prev);
      const existingEvents = newEvents.get(pulse);
      
      if (!existingEvents) return newEvents;
      
      if (eventIndex !== undefined) {
        // Remover evento específico por índice
        const filteredEvents = existingEvents.filter((_, i) => i !== eventIndex);
        if (filteredEvents.length === 0) {
          newEvents.delete(pulse);
        } else {
          newEvents.set(pulse, filteredEvents);
        }
      } else {
        // Remover todos los eventos en ese pulse
        newEvents.delete(pulse);
      }
      
      return newEvents;
    });
  }, []);

  const clearEvents = useCallback(() => {
    setEvents(new Map());
  }, []);

  const setDuration = useCallback((newDuration: number) => {
    setDurationState(Math.max(1, newDuration));
  }, []);

  const setPlaybackType = useCallback((type: PlaybackType) => {
    setPlaybackTypeState(type);
    // Resetear referencias de control cuando cambia el modo
    lastPlayedEventRef.current = -1;
    playbackCycleRef.current = 0;
  }, []);

  const setGridResolution = useCallback((resolution: GridResolution) => {
    setGridResolutionState(resolution);
  }, []);

  const setSnapToGrid = useCallback((enabled: boolean) => {
    setSnapToGridState(enabled);
  }, []);

  const setActive = useCallback((active: boolean) => {
    setActiveState(active);
    if (!active) {
      lastPlayedEventRef.current = -1;
    }
  }, []);

  const loadSequence = useCallback((timedEvents: TimedEvent[]) => {
    const newEvents = new Map<number, SequencerEvent[]>();
    
    timedEvents.forEach(({ pulse, event }) => {
      const existingEvents = newEvents.get(pulse) || [];
      newEvents.set(pulse, [...existingEvents, event]);
    });
    
    setEvents(newEvents);
  }, []);

  // Estado y acciones
  const state: SequencerState = {
    events,
    duration,
    playbackType,
    gridResolution,
    isSnapToGrid,
    isActive
  };

  const actions: SequencerActions = {
    setEvent,
    removeEvent,
    clearEvents,
    setDuration,
    setPlaybackType,
    setGridResolution,
    setSnapToGrid,
    setActive,
    loadSequence
  };

  return [state, actions];
}