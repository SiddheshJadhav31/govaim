import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Gavel, Network, Settings, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-primary text-white transition-all ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 border-b border-nav-hover flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold text-white">GovAim</h1>}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-2 hover:bg-nav-hover rounded-lg transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={20} className="text-white" />
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

      <div className="absolute bottom-0 w-full p-4 border-t border-nav-hover">
        <button className="nav-link w-full justify-center">
          <LogOut size={20} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;