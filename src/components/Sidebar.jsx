import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Gavel, Users, BarChart } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="bg-white w-64 min-h-screen border-r border-gray-200 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">PolicyFlow</h1>
      </div>
      
      <nav className="space-y-2">
        <NavLink to="/app" end className="nav-link">
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        
        <NavLink to="/app/legislative" className="nav-link">
          <Gavel size={20} />
          Legislative Tracker
        </NavLink>
        
        <NavLink to="/app/network" className="nav-link">
          <Users size={20} />
          Stakeholder Network
        </NavLink>

        <NavLink to="/app/visualization" className="nav-link">
          <BarChart size={20} />
          Data Visualization
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;