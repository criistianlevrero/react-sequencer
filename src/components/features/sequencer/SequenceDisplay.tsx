import React, { useState, useRef, useCallback } from 'react';
import type { PlaybackType, GridResolution } from '@hooks';

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
  className?: string;
}

interface MouseState {
  isDown: boolean;
  isDragging: boolean;
  startX: number;
  startY: number;
  dragThreshold: number;
}

export const SequenceDisplay: React.FC<SequenceDisplayProps> = ({
  visualData,
  duration,
  gridResolution,
  playbackType,
  pulseCount,
  isPlaying,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseState, setMouseState] = useState<MouseState>({
    isDown: false,
    isDragging: false,
    startX: 0,
    startY: 0,
    dragThreshold: 5 // pixels
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
      startY: y
    }));

    if (eventAtPosition) {
      console.log('🎵 Note clicked:', {
        note: eventAtPosition.note,
        velocity: eventAtPosition.velocity,
        pulse: eventAtPosition.pulse,
        position: eventAtPosition.position,
        coordinates: { x, y }
      });
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
      console.log('🔄 Dragging:', {
        currentPosition: { x, y },
        percentage: percentage.toFixed(2),
        deltaFromStart: { deltaX, deltaY }
      });
    }
  }, [mouseState, getRelativePosition, getEventAtPosition]);

  const handleMouseUp = useCallback((event: React.MouseEvent) => {
    const { x, y } = getRelativePosition(event);

    if (mouseState.isDragging) {
      const eventAtStart = getEventAtPosition(mouseState.startX);
      const { percentage } = getRelativePosition(event);
      
      console.log('✅ Drag completed:', {
        startPosition: { x: mouseState.startX, y: mouseState.startY },
        endPosition: { x, y },
        endPercentage: percentage.toFixed(2),
        draggedNote: eventAtStart ? {
          note: eventAtStart.note,
          velocity: eventAtStart.velocity,
          pulse: eventAtStart.pulse
        } : null
      });
    }

    setMouseState(prev => ({
      ...prev,
      isDown: false,
      isDragging: false
    }));
  }, [mouseState, getRelativePosition, getEventAtPosition]);

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
        {visualData.eventPositions.map((event, index) => (
          <div
            key={index}
            className="absolute top-1/2 w-3 h-3 bg-blue-500 hover:bg-blue-600 transform -translate-x-1/2 -translate-y-1/2 rotate-45 z-20 cursor-pointer transition-colors"
            style={{ left: `${event.position}%` }}
            title={`Note: ${event.note}, Velocity: ${event.velocity}, Pulse: ${event.pulse}`}
          ></div>
        ))}
        
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