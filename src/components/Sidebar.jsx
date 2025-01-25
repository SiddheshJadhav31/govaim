import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Gavel, 
  Users, 
  Settings,
  BarChart2
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-primary">PolicyFlow</span>
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
          <BarChart2 size={20} />
          Data Visualization
        </NavLink>
        
        <NavLink to="/app/settings" className="nav-link">
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;