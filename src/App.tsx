import { Routes, Route } from 'react-router-dom';
import { BaseLayout, SequencerLayout } from './components';
import { Sequencer, SequencerDemo, ComponentsDemo, About } from './pages';

function App() {
  return (
    <Routes>
      {/* Sequencer page with its own layout */}
      <Route path="/" element={<SequencerLayout />}>
        <Route index element={<Sequencer />} />
      </Route>
      
      {/* Sequencer demo with its own layout */}
      <Route path="/sequencerDemo" element={<SequencerLayout />}>
        <Route index element={<SequencerDemo />} />
      </Route>
      
      {/* Other pages with base layout */}
      <Route path="/" element={<BaseLayout />}>
        <Route path="components" element={<ComponentsDemo />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;