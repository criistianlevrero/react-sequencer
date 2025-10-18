import { useContext } from 'react';
import { PlayheadContext } from './PlayheadContext';
import type { PlayheadContextType } from './types';

// Hook personalizado para usar el contexto
export const usePlayhead = (): PlayheadContextType => {
  const context = useContext(PlayheadContext);
  if (context === undefined) {
    throw new Error('usePlayhead must be used within a PlayheadProvider');
  }
  return context;
};