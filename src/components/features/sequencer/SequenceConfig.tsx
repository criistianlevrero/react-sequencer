import React from 'react';
import { Checkbox, Select, Button } from '@components';
import type { PlaybackType, GridResolution } from '@hooks';
import type { NotePlayerTypeUnion } from '@model';
import { playerTypeOptions, playbackTypeOptions, gridResolutionOptions } from '@utils';

export interface SequenceConfigProps {
  // State del sequencer
  selectedPlayerType: NotePlayerTypeUnion;
  onPlayerTypeChange: (value: NotePlayerTypeUnion) => void;
  playbackType: PlaybackType;
  onPlaybackTypeChange: (value: PlaybackType) => void;
  gridResolution: GridResolution;
  onGridResolutionChange: (value: GridResolution) => void;
  duration: number;
  onDurationChange: (value: number) => void;
  isSnapToGrid: boolean;
  onSnapToGridChange: (value: boolean) => void;
  
  // Actions
  onClearEvents: () => void;
  onLoadCMajor: () => void;
}

export const SequenceConfig: React.FC<SequenceConfigProps> = ({
  selectedPlayerType,
  onPlayerTypeChange,
  playbackType,
  onPlaybackTypeChange,
  gridResolution,
  onGridResolutionChange,
  duration,
  onDurationChange,
  isSnapToGrid,
  onSnapToGridChange,
  onClearEvents,
  onLoadCMajor
}) => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Player Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Player Type
          </label>
          <Select
            value={selectedPlayerType}
            onChange={(value) => onPlayerTypeChange(value as NotePlayerTypeUnion)}
            options={playerTypeOptions}
          />
        </div>

        {/* Playback Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Playback Mode
          </label>
          <Select
            value={playbackType}
            onChange={(value) => onPlaybackTypeChange(value as PlaybackType)}
            options={playbackTypeOptions}
          />
        </div>

        {/* Grid Resolution */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Grid Resolution
          </label>
          <Select
            value={gridResolution.toString()}
            onChange={(value) => onGridResolutionChange(Number(value) as GridResolution)}
            options={gridResolutionOptions}
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Duration (Quarter Notes)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="16"
              value={duration}
              onChange={(e) => onDurationChange(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded min-w-[40px] text-center">
              {duration}
            </span>
          </div>
        </div>
      </div>

      {/* Additional Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Checkbox
            checked={isSnapToGrid}
            onChange={onSnapToGridChange}
            label="Snap to Grid"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClearEvents}
            size="sm"
          >
            Clear All
          </Button>
          <Button
            variant="outline"
            onClick={onLoadCMajor}
            size="sm"
          >
            Load C Major
          </Button>
        </div>
      </div>
    </div>
  );
};