import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LegislativeTracker from './pages/LegislativeTracker';
import StakeholderNetwork from './pages/StakeholderNetwork';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register/*" element={<Register />} />
          
          {/* App Routes with Sidebar */}
          <Route path="/dashboard" element={
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 p-8 bg-workspace">
                <Dashboard />
              </main>
            </div>
          } />
          <Route path="/legislative" element={
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 p-8 bg-workspace">
                <LegislativeTracker />
              </main>
            </div>
          } />
          <Route path="/network" element={
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 p-8 bg-workspace">
                <StakeholderNetwork />
              </main>
            </div>
          } />
          
          {/* Default Route */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;