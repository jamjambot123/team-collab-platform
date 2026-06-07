import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatPanel from './ChatPanel';

const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header onOpenChat={() => setIsChatOpen(true)} />
        <main className="page-container animate-fade-in">
          <Outlet />
        </main>
      </div>
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Layout;
