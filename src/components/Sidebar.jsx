import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, FileText, PieChart, Settings } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { name: '대시보드', path: '/app/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: '일정 관리', path: '/app/schedule', icon: <Calendar size={20} /> },
    { name: '업무 분담', path: '/app/roles', icon: <Users size={20} /> },
    { name: '자료 공유', path: '/app/files', icon: <FileText size={20} /> },
    { name: '참여도 분석', path: '/app/analytics', icon: <PieChart size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <span className="logo-text">C</span>
        </div>
        <h1 className="logo-title">CollabHub</h1>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/app/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>프로젝트 설정</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
