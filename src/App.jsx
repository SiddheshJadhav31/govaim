import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LegislativeTracker from './pages/LegislativeTracker';
import StakeholderNetwork from './pages/StakeholderNetwork';
import Visualization from './pages/Visualization';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/app/*" element={<AppLayout />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
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
          <Route path="/visualization" element={<Visualization />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;