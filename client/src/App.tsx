import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Demo1Traditional } from './demos/Demo1Traditional';
import { Demo2Optimistic } from './demos/Demo2Optimistic';
import { Demo3ReactHook } from './demos/Demo3ReactHook';
import { Demo4CustomHook } from './demos/Demo4CustomHook';
import { DelayProvider } from './contexts/DelayContext';

function App() {
  return (
    <DelayProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/demo1" replace />} />
          <Route path="/demo1" element={<Demo1Traditional />} />
          <Route path="/demo2" element={<Demo2Optimistic />} />
          <Route path="/demo3" element={<Demo3ReactHook />} />
          <Route path="/demo4" element={<Demo4CustomHook />} />
        </Routes>
      </BrowserRouter>
    </DelayProvider>
  );
}

export default App;
