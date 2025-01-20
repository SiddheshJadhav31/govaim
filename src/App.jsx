import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LegislativeTracker from './pages/LegislativeTracker';
import StakeholderNetwork from './pages/StakeholderNetwork';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app/*" element={<AppLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/legislative" element={<LegislativeTracker />} />
          <Route path="/network" element={<StakeholderNetwork />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;