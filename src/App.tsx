import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { Sequencer, ComponentsDemo, About } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Sequencer />} />
        <Route path="components" element={<ComponentsDemo />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;