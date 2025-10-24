import React from 'react';
import { Card, Sequencer, PlayheadControls } from '@components';

export const SequencerPage: React.FC = () => {
  return (
    <div className="">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <Card>
          {/* Playhead Controls */}
          <div className="mb-8">
            <PlayheadControls />
          </div>

          {/* Sequencer Component */}
          <div className="border-t dark:border-gray-700 pt-8 mt-8">
            <Sequencer />
          </div>
        </Card>
      </div>
    </div>
  );
};