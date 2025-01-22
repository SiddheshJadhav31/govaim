import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Gavel, Network, Settings, Menu } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-white border-r border-gray-200 transition-all ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold text-primary">GovAim</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu size={20} />
        </button>
      </div>
      
      <nav className="p-4 space-y-2">
        <NavLink to="/app" end className="nav-link">
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink to="/app/legislative" className="nav-link">
          <Gavel size={20} />
          {!collapsed && <span>Legislative Tracker</span>}
        </NavLink>
        <NavLink to="/app/network" className="nav-link">
          <Network size={20} />
          {!collapsed && <span>Stakeholder Network</span>}
        </NavLink>
        <NavLink to="/app/settings" className="nav-link">
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;