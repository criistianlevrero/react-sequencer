import { Routes, Route } from 'react-router-dom';
import { BaseLayout, SequencerLayout } from '@components';
import { SequencerPage, SequencerDemoPage, ComponentsDemoPage, AboutPage } from '@pages';

function App() {
  return (
    <Routes>
      {/* Sequencer page with its own layout */}
      <Route path="/" element={<SequencerLayout />}>
        <Route index element={<SequencerPage />} />
      </Route>
      
      {/* Sequencer demo with its own layout */}
      <Route path="/sequencerDemo" element={<SequencerLayout />}>
        <Route index element={<SequencerDemoPage />} />
      </Route>
      
      {/* Other pages with base layout */}
      <Route path="/" element={<BaseLayout />}>
        <Route path="components" element={<ComponentsDemoPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;