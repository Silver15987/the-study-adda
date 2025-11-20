import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import Home from './pages/Home';

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay noise-overlay"></div>

      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>

      <Home />
    </div>
  );
}

export default App;
