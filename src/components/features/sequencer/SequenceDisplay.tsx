import React, { useState, useRef, useCallback } from 'react';
import type { PlaybackType, GridResolution } from '@hooks';
import { PULSES_PER_QUARTER_NOTE } from '@utils';

export interface VisualData {
  gridLines: Array<{ pulse: number; position: number }>;
  eventPositions: Array<{
    pulse: number;
    position: number;
    note: number;
    velocity: number;
  }>;
  playheadPosition: number;
}

export interface SequenceDisplayProps {
  visualData: VisualData;
  duration: number;
  gridResolution: GridResolution;
  playbackType: PlaybackType;
  pulseCount: number;
  isPlaying: boolean;
  isSnapToGrid: boolean;
  onEventClick?: (eventData: { pulse: number; note: number; velocity: number }) => void;
  onEventDrop?: (eventData: { 
    originalPulse: number; 
    newPulse: number; 
    note: number; 
    velocity: number; 
  }) => void;
  className?: string;
}

interface MouseState {
  isDown: boolean;
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  dragThreshold: number;
  startTime: number;
  draggedEvent: {
    pulse: number;
    note: number;
    velocity: number;
  } | null;
}

export const SequenceDisplay: React.FC<SequenceDisplayProps> = ({
  visualData,
  duration,
  gridResolution,
  playbackType,
  pulseCount,
  isPlaying,
  isSnapToGrid,
  onEventClick,
  onEventDrop,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseState, setMouseState] = useState<MouseState>({
    isDown: false,
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    dragThreshold: 5, // pixels
    startTime: 0,
    draggedEvent: null
  });

  // Obtener posición relativa del mouse dentro del contenedor
  const getRelativePosition = useCallback((event: React.MouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0, percentage: 0 };
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    return { x, y, percentage };
  }, []);

  // Convertir porcentaje a pulso respetando grid snapping
  const percentageToPulse = useCallback((percentage: number) => {
    const totalPulses = duration * PULSES_PER_QUARTER_NOTE;
    const exactPulse = (percentage / 100) * totalPulses;
    
    // Si snap to grid está desactivado, redondear al pulso entero más cercano
    if (!isSnapToGrid) {
      const roundedPulse = Math.round(exactPulse);
      return Math.max(0, Math.min(totalPulses - 1, roundedPulse));
    }
    
    // Si snap to grid está activado, aplicar snapping
    // Calcular el step size para snap to grid
    const quarterNotesPerStep = 4 / gridResolution; // ej: para 1/16, step = 4/16 = 0.25 quarter notes
    const pulsesPerStep = quarterNotesPerStep * PULSES_PER_QUARTER_NOTE;
    
    // Snap al grid más cercano
    const snappedPulse = Math.round(exactPulse / pulsesPerStep) * pulsesPerStep;
    
    // Asegurar que esté dentro de los límites y que sea entero
    return Math.max(0, Math.min(totalPulses - 1, Math.round(snappedPulse)));
  }, [duration, gridResolution, isSnapToGrid]);

  // Convertir pulso de vuelta a porcentaje (para mostrar nota fantasma)
  const pulseToPercentage = useCallback((pulse: number) => {
    const totalPulses = duration * PULSES_PER_QUARTER_NOTE;
    return (pulse / totalPulses) * 100;
  }, [duration]);

  // Detectar si el mouse está sobre una nota
  const getEventAtPosition = useCallback((x: number) => {
    if (!containerRef.current) return null;
    
    const rect = containerRef.current.getBoundingClientRect();
    const percentage = (x / rect.width) * 100;
    
    // Buscar eventos cerca de esta posición (tolerancia de ±2%)
    const tolerance = 2;
    const foundEvent = visualData.eventPositions.find(event => 
      Math.abs(event.position - percentage) <= tolerance
    );
    
    return foundEvent || null;
  }, [visualData.eventPositions]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    const { x, y, percentage } = getRelativePosition(event);
    const eventAtPosition = getEventAtPosition(x);
    
    setMouseState(prev => ({
      ...prev,
      isDown: true,
      isDragging: false,
      startX: x,
      startY: y,
      currentX: x,
      currentY: y,
      startTime: Date.now(),
      draggedEvent: eventAtPosition ? {
        pulse: eventAtPosition.pulse,
        note: eventAtPosition.note,
        velocity: eventAtPosition.velocity
      } : null
    }));

    if (eventAtPosition) {
      console.log('🎵 Note clicked:', {
        note: eventAtPosition.note,
        velocity: eventAtPosition.velocity,
        pulse: eventAtPosition.pulse,
        position: eventAtPosition.position,
        coordinates: { x, y }
      });
      
      // NO llamar onEventClick aquí, lo movemos a handleMouseUp
    } else {
      console.log('📍 Empty space clicked:', {
        percentage: percentage.toFixed(2),
        coordinates: { x, y }
      });
    }
  }, [getRelativePosition, getEventAtPosition]);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!mouseState.isDown) return;

    const { x, y } = getRelativePosition(event);
    const deltaX = Math.abs(x - mouseState.startX);
    const deltaY = Math.abs(y - mouseState.startY);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Actualizar posición actual siempre
    setMouseState(prev => ({ ...prev, currentX: x, currentY: y }));

    // Si el mouse se ha movido más allá del threshold, iniciar drag
    if (!mouseState.isDragging && distance > mouseState.dragThreshold) {
      setMouseState(prev => ({ ...prev, isDragging: true }));
      
      const eventAtStart = getEventAtPosition(mouseState.startX);
      if (eventAtStart) {
        console.log('🔄 Drag started on note:', {
          note: eventAtStart.note,
          velocity: eventAtStart.velocity,
          pulse: eventAtStart.pulse,
          startPosition: { x: mouseState.startX, y: mouseState.startY },
          currentPosition: { x, y }
        });
      }
    }

    // Si ya estamos en modo drag, reportar el movimiento
    if (mouseState.isDragging) {
      const { percentage } = getRelativePosition(event);
      const targetPulse = percentageToPulse(percentage);
      const targetPosition = pulseToPercentage(targetPulse);
      
      console.log('🔄 Dragging:', {
        currentPosition: { x, y },
        percentage: percentage.toFixed(2),
        targetPulse,
        targetPosition: targetPosition.toFixed(2),
        isSnapToGrid,
        deltaFromStart: { deltaX, deltaY }
      });
    }
  }, [mouseState, getRelativePosition, getEventAtPosition, percentageToPulse, pulseToPercentage, isSnapToGrid]);

  const handleMouseUp = useCallback((event: React.MouseEvent) => {
    const { x, y, percentage } = getRelativePosition(event);

    // Si se hizo drag and drop, procesar el drop
    if (mouseState.isDragging && mouseState.draggedEvent && onEventDrop) {
      // Calcular nueva posición en pulsos
      const newPulse = percentageToPulse(percentage);
      
      console.log('✅ Drag completed - Moving note:', {
        originalPulse: mouseState.draggedEvent.pulse,
        newPulse,
        note: mouseState.draggedEvent.note,
        velocity: mouseState.draggedEvent.velocity,
        gridResolution,
        isSnapToGrid,
        startPosition: { x: mouseState.startX, y: mouseState.startY },
        endPosition: { x, y },
        endPercentage: percentage.toFixed(2),
        finalPosition: pulseToPercentage(newPulse).toFixed(2)
      });

      // Solo llamar al callback si la posición cambió
      if (newPulse !== mouseState.draggedEvent.pulse) {
        onEventDrop({
          originalPulse: mouseState.draggedEvent.pulse,
          newPulse,
          note: mouseState.draggedEvent.note,
          velocity: mouseState.draggedEvent.velocity
        });
      }
    } 
    // Si NO se hizo drag, procesar como click simple
    else if (mouseState.isDown && !mouseState.isDragging) {
      const clickDuration = Date.now() - mouseState.startTime;
      const isValidClick = clickDuration < 500; // Máximo 500ms para ser considerado click
      
      // Buscar evento en la posición de inicio (no en la posición final)
      const eventAtStartPosition = getEventAtPosition(mouseState.startX);
      
      if (eventAtStartPosition && onEventClick && isValidClick) {
        console.log('🖱️ Note click released (no drag):', {
          note: eventAtStartPosition.note,
          velocity: eventAtStartPosition.velocity,
          pulse: eventAtStartPosition.pulse,
          clickDuration: `${clickDuration}ms`
        });
        
        onEventClick({
          pulse: eventAtStartPosition.pulse,
          note: eventAtStartPosition.note,
          velocity: eventAtStartPosition.velocity
        });
      } else if (!isValidClick) {
        console.log('⏱️ Click too long, ignoring:', { clickDuration: `${clickDuration}ms` });
      }
    }

    setMouseState(prev => ({
      ...prev,
      isDown: false,
      isDragging: false,
      currentX: 0,
      currentY: 0,
      draggedEvent: null
    }));
  }, [mouseState, getRelativePosition, percentageToPulse, onEventDrop, gridResolution, isSnapToGrid, pulseToPercentage, getEventAtPosition, onEventClick]);

  // Prevenir el comportamiento por defecto del drag para evitar interferencias
  const handleDragStart = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  return (
    <div className={`p-4 ${className}`}>
      <div 
        ref={containerRef}
        className="relative w-full h-16 bg-gray-100 dark:bg-gray-800 rounded border cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Tratar como mouse up si el mouse sale del área
        onDragStart={handleDragStart}
      >
        {/* Línea horizontal principal */}
        <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-gray-400 dark:bg-gray-600 transform -translate-y-1/2"></div>
        
        {/* Líneas verticales de grilla */}
        {visualData.gridLines.map((gridLine, index) => (
          <div
            key={index}
            className="absolute top-2 bottom-2 w-0.5 bg-gray-300 dark:bg-gray-700 z-5"
            style={{ left: `${gridLine.position}%` }}
          ></div>
        ))}
        
        {/* Rombos representando eventos */}
        {visualData.eventPositions.map((event, index) => {
          // Ocultar la nota original si se está arrastrando
          const isBeingDragged = mouseState.isDragging && 
            mouseState.draggedEvent &&
            mouseState.draggedEvent.pulse === event.pulse &&
            mouseState.draggedEvent.note === event.note &&
            mouseState.draggedEvent.velocity === event.velocity;

          return (
            <div
              key={index}
              className={`absolute top-1/2 w-3 h-3 transform -translate-x-1/2 -translate-y-1/2 rotate-45 z-20 cursor-pointer transition-all ${
                isBeingDragged 
                  ? 'opacity-30' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              style={{ left: `${event.position}%` }}
              title={`Note: ${event.note}, Velocity: ${event.velocity}, Pulse: ${event.pulse}`}
            ></div>
          );
        })}

        {/* Nota fantasma durante drag */}
        {mouseState.isDragging && mouseState.draggedEvent && (
          (() => {
            // Calcular posición con o sin snap to grid
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return null;
            
            const percentage = Math.max(0, Math.min(100, (mouseState.currentX / rect.width) * 100));
            const targetPulse = percentageToPulse(percentage);
            const targetPosition = pulseToPercentage(targetPulse);
            
            return (
              <>
                {/* Línea guía vertical - solo si snap to grid está activado */}
                {isSnapToGrid && (
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 z-25 pointer-events-none opacity-60"
                    style={{ left: `${targetPosition}%` }}
                  ></div>
                )}
                
                {/* Nota fantasma */}
                <div
                  className={`absolute top-1/2 w-3 h-3 transform -translate-x-1/2 -translate-y-1/2 rotate-45 z-30 pointer-events-none opacity-80 shadow-lg border ${
                    isSnapToGrid 
                      ? 'bg-yellow-500 border-yellow-600' 
                      : 'bg-orange-500 border-orange-600'
                  }`}
                  style={{ left: `${targetPosition}%` }}
                  title={isSnapToGrid ? "Ghost note (snapped to grid)" : "Ghost note (free position)"}
                ></div>
              </>
            );
          })()
        )}
        
        {/* Marcadores de beats (negras) */}
        {Array.from({ length: duration + 1 }, (_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-0.5 bg-gray-600 dark:bg-gray-400 z-10"
            style={{ left: `${(i / duration) * 100}%` }}
          ></div>
        ))}
        
        {/* Línea del playhead */}
        {isPlaying && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 dark:bg-red-400 z-15 transition-all duration-75 pointer-events-none"
            style={{ left: `${visualData.playheadPosition}%` }}
            title={`Playhead: ${pulseCount} pulses`}
          ></div>
        )}
      </div>
      
      {/* Info de la representación */}
      <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Duration: {duration} beats</span>
        <span>Grid: 1/{gridResolution}</span>
        <span>Mode: {playbackType}</span>
        {isPlaying && (
          <span className="text-red-500 dark:text-red-400">
            ▶ Pulse: {pulseCount}
          </span>
        )}
      </div>
    </div>
  );
};