import React, { useState, useMemo } from 'react';
import { useSequencer } from '@hooks';
import { usePlayhead } from '@contexts';
import { Checkbox } from '@components';
import { SequenceDisplay } from './SequenceDisplay';
import { SequenceConfig } from './SequenceConfig';
import { NoteConfig, type SelectedEvent } from './NoteConfig';
import type { NotePlayerTypeUnion } from '@model';
import { NotePlayerType } from '@model';
import type { SequencerEvent } from '@hooks/useSequencer.types';
import { PULSES_PER_QUARTER_NOTE } from '@utils';

export interface SequencerProps {
  className?: string;
}

export const Sequencer: React.FC<SequencerProps> = ({ className = '' }) => {
  const [selectedPlayerType, setSelectedPlayerType] = useState<NotePlayerTypeUnion>(NotePlayerType.SINE_WAVE);
  const [midiChannel, setMidiChannel] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);
  const [originalEvent, setOriginalEvent] = useState<SelectedEvent | null>(null);
  const [state, actions] = useSequencer(4); // 4 quarter notes duration by default
  const { pulseCount, isPlaying } = usePlayhead();
  const [hasInitialLoad, setHasInitialLoad] = React.useState(false);

  // Cargar secuencia inicial solo una vez
  React.useEffect(() => {
    if (!hasInitialLoad) {
      const cMajorScale = [60, 62, 64, 65, 67, 69, 71, 72]; // C4 to C5
      const totalPulses = state.duration * PULSES_PER_QUARTER_NOTE;
      
      const timedEvents = cMajorScale.map((note) => ({
        pulse: Math.floor(Math.random() * totalPulses), // Posición aleatoria dentro de la duración
        event: {
          note,
          velocity: 80,
          duration: 200,
          channel: midiChannel,
          playerType: selectedPlayerType
        }
      }));
      
      actions.loadSequence(timedEvents);
      setHasInitialLoad(true);
    }
  }, [hasInitialLoad, selectedPlayerType, midiChannel, actions, state.duration]);

  // Deseleccionar nota cuando el sequencer se contrae
  React.useEffect(() => {
    if (!isExpanded && selectedEvent) {
      setSelectedEvent(null);
      setOriginalEvent(null);
    }
  }, [isExpanded, selectedEvent]);

  const activeEventsCount = useMemo(() => {
    return Array.from(state.events.values()).reduce((total, events) => total + events.length, 0);
  }, [state.events]);

  // Función para agregar una nueva nota en un pulso específico
  const handleAddNote = (pulse: number) => {
    console.log('🎵 Adding new C4 note at pulse:', pulse);
    
    // Crear nueva nota C4 con configuración del sequencer
    const newEvent = {
      pulse,
      event: {
        note: 60, // C4
        velocity: 80, // Velocity por defecto
        duration: 200, // Duración por defecto
        channel: midiChannel,
        playerType: selectedPlayerType
      }
    };
    
    // Agregar la nota a la secuencia existente
    const events = state.events.get(pulse) || [];
    events.push(newEvent.event);
    
    const newEvents = new Map(state.events);
    newEvents.set(pulse, events);
    
    // Recrear toda la secuencia
    actions.clearEvents();
    const allEvents: Array<{ pulse: number; event: SequencerEvent }> = [];
    newEvents.forEach((eventArray, eventPulse) => {
      eventArray.forEach(event => {
        allEvents.push({ pulse: eventPulse, event });
      });
    });
    actions.loadSequence(allEvents);
  };

  // Función para cargar la escala de C Major
  const handleLoadCMajor = () => {
    const cMajorScale = [60, 62, 64, 65, 67, 69, 71, 72];
    const totalPulses = state.duration * PULSES_PER_QUARTER_NOTE;
    
    const timedEvents = cMajorScale.map((note) => ({
      pulse: Math.floor(Math.random() * totalPulses),
      event: {
        note,
        velocity: 80,
        duration: 200,
        channel: midiChannel,
        playerType: selectedPlayerType
      }
    }));
    actions.loadSequence(timedEvents);
  };

  // Función para manejar click en evento del SequenceDisplay
  const handleEventClick = (eventData: { pulse: number; note: number; velocity: number }) => {
    // Buscar el evento completo en el state
    const events = state.events.get(eventData.pulse);
    if (events) {
      const fullEvent = events.find(e => e.note === eventData.note);
      if (fullEvent) {
        const selectedEventData: SelectedEvent = {
          pulse: eventData.pulse,
          note: fullEvent.note,
          velocity: fullEvent.velocity,
          duration: fullEvent.duration
        };
        setSelectedEvent(selectedEventData);
        setOriginalEvent({ ...selectedEventData }); // Guardar copia del evento original
        
        // Si el secuenciador está contraído, expandirlo automáticamente
        if (!isExpanded) {
          setIsExpanded(true);
        }
      }
    }
  };

  // Función para volver a la configuración de secuencia
  const handleBackToSequence = () => {
    setSelectedEvent(null);
    setOriginalEvent(null);
  };

  // Función para actualizar un evento
  const handleEventUpdate = (updatedEvent: SelectedEvent) => {
    if (!originalEvent) return;
    
    // Actualizar el evento seleccionado para reflejar los cambios en la UI
    setSelectedEvent(updatedEvent);
    
    // Remover el evento original usando su referencia inicial
    const events = state.events.get(originalEvent.pulse);
    if (events) {
      const updatedEvents = events.filter(e => 
        !(e.note === originalEvent.note && 
          e.velocity === originalEvent.velocity && 
          e.duration === originalEvent.duration)
      );
      
      // Agregar el evento actualizado con playerType y channel del sequencer
      updatedEvents.push({
        note: updatedEvent.note,
        velocity: updatedEvent.velocity,
        duration: updatedEvent.duration,
        channel: midiChannel,
        playerType: selectedPlayerType
      });
      
      // Actualizar el state
      const newEvents = new Map(state.events);
      if (updatedEvents.length > 0) {
        newEvents.set(updatedEvent.pulse, updatedEvents);
      } else {
        newEvents.delete(updatedEvent.pulse);
      }
      
      // Recrear toda la secuencia
      actions.clearEvents();
      const allEvents: Array<{ pulse: number; event: SequencerEvent }> = [];
      newEvents.forEach((eventArray, pulse) => {
        eventArray.forEach(event => {
          allEvents.push({ pulse, event });
        });
      });
      actions.loadSequence(allEvents);
      
      // Actualizar el evento original con los nuevos valores para futuras ediciones
      setOriginalEvent({ ...updatedEvent });
    }
  };

  // Función para manejar el drag and drop de eventos
  const handleEventDrop = (dropData: { 
    originalPulse: number; 
    newPulse: number; 
    note: number; 
    velocity: number; 
  }) => {
    console.log('🎯 Sequencer received drop:', dropData);
    
    // Buscar el evento en la posición original
    const originalEvents = state.events.get(dropData.originalPulse);
    if (!originalEvents) return;
    
    const eventToMove = originalEvents.find(e => 
      e.note === dropData.note && e.velocity === dropData.velocity
    );
    if (!eventToMove) return;

    // Crear nueva configuración de eventos
    const newEvents = new Map(state.events);
    
    // Remover el evento de la posición original
    const updatedOriginalEvents = originalEvents.filter(e => 
      !(e.note === dropData.note && e.velocity === dropData.velocity)
    );
    
    if (updatedOriginalEvents.length > 0) {
      newEvents.set(dropData.originalPulse, updatedOriginalEvents);
    } else {
      newEvents.delete(dropData.originalPulse);
    }
    
    // Agregar el evento en la nueva posición
    const eventsAtNewPosition = newEvents.get(dropData.newPulse) || [];
    eventsAtNewPosition.push(eventToMove);
    newEvents.set(dropData.newPulse, eventsAtNewPosition);
    
    // Actualizar el state
    actions.clearEvents();
    const allEvents: Array<{ pulse: number; event: SequencerEvent }> = [];
    newEvents.forEach((eventArray, pulse) => {
      eventArray.forEach(event => {
        allEvents.push({ pulse, event });
      });
    });
    actions.loadSequence(allEvents);
    
    // Si el evento movido está seleccionado, actualizar la selección
    if (selectedEvent && 
        selectedEvent.pulse === dropData.originalPulse && 
        selectedEvent.note === dropData.note && 
        selectedEvent.velocity === dropData.velocity) {
      const updatedSelection = { ...selectedEvent, pulse: dropData.newPulse };
      setSelectedEvent(updatedSelection);
      setOriginalEvent(updatedSelection);
    }
  };

  // Calcular posiciones de grilla y eventos para la representación gráfica
  const visualData = useMemo(() => {
    const totalPulses = state.duration * PULSES_PER_QUARTER_NOTE;
    const gridSteps = state.duration * (state.gridResolution / 4); // Total grid steps
    
    // Crear array de posiciones de grilla (líneas verticales)
    const gridLines = [];
    for (let i = 0; i <= gridSteps; i++) {
      const pulse = (i / gridSteps) * totalPulses;
      const position = (i / gridSteps) * 100; // Percentage position
      gridLines.push({ pulse, position });
    }
    
    // Obtener posiciones de eventos (rombos)
    const eventPositions: Array<{
      pulse: number;
      position: number;
      note: number;
      velocity: number;
    }> = [];
    state.events.forEach((eventArray, pulse) => {
      eventArray.forEach(event => {
        const position = (pulse / totalPulses) * 100;
        eventPositions.push({ 
          pulse, 
          position, 
          note: event.note,
          velocity: event.velocity 
        });
      });
    });

    // Calcular posición del playhead según el modo de playback
    const sequencePulse = pulseCount % totalPulses;
    let visualPulse = sequencePulse;
    
    switch (state.playbackType) {
      case 'backwards':
        visualPulse = totalPulses - 1 - sequencePulse;
        break;
      case 'pingpong': {
        const cycleNumber = Math.floor(pulseCount / totalPulses);
        const isForwardCycle = cycleNumber % 2 === 0;
        if (!isForwardCycle) {
          visualPulse = totalPulses - 1 - sequencePulse;
        }
        break;
      }
      case 'forward':
      default:
        visualPulse = sequencePulse;
        break;
    }
    
    const playheadPosition = (visualPulse / totalPulses) * 100;
    
    return { gridLines, eventPositions, playheadPosition };
  }, [state.events, state.duration, state.gridResolution, state.playbackType, pulseCount]);

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 ${className}`}>
      {/* Zona Superior: Header con checkbox Active y chevron */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg 
              className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm font-medium">Sequencer</span>
          </button>
          
          <Checkbox
            checked={state.isActive}
            onChange={actions.setActive}
            label="Active"
          />
        </div>
        
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {activeEventsCount} events
        </span>
      </div>

      {/* Zona Intermedia: Configuración (colapsable) */}
      {isExpanded && (
        <>
          {selectedEvent ? (
            <NoteConfig
              selectedEvent={selectedEvent}
              onBack={handleBackToSequence}
              onEventUpdate={handleEventUpdate}
            />
          ) : (
            <SequenceConfig
              selectedPlayerType={selectedPlayerType}
              onPlayerTypeChange={setSelectedPlayerType}
              playbackType={state.playbackType}
              onPlaybackTypeChange={actions.setPlaybackType}
              gridResolution={state.gridResolution}
              onGridResolutionChange={actions.setGridResolution}
              duration={state.duration}
              onDurationChange={actions.setDuration}
              isSnapToGrid={state.isSnapToGrid}
              onSnapToGridChange={actions.setSnapToGrid}
              midiChannel={midiChannel}
              onMidiChannelChange={setMidiChannel}
              onClearEvents={actions.clearEvents}
              onLoadCMajor={handleLoadCMajor}
            />
          )}
        </>
      )}

      {/* Zona Inferior: Representación Gráfica */}
      <SequenceDisplay
        visualData={visualData}
        duration={state.duration}
        gridResolution={state.gridResolution}
        playbackType={state.playbackType}
        pulseCount={pulseCount}
        isPlaying={isPlaying}
        isSnapToGrid={state.isSnapToGrid}
        selectedEvent={selectedEvent}
        onEventClick={handleEventClick}
        onEventDrop={handleEventDrop}
        onAddNote={handleAddNote}
      />
    </div>
  );
};