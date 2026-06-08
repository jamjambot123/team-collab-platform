import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, LogOut, MessageCircle, CheckSquare, FileText, Menu, Crown } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onOpenChat, onToggleMenu }) => {
  const { currentUser, logout, notifications, markNotificationsRead, tasks, files, isPremium } = useTeam();
  const navigate = useNavigate();
  const [showNoti, setShowNoti] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  const searchRef = useRef(null);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotiClick = () => {
    setShowNoti(!showNoti);
    if (!showNoti) markNotificationsRead();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search logic
  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase())));
  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearchResultClick = (path) => {
    setShowSearch(false);
    setSearchQuery('');
    navigate(path);
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="mobile-menu-btn" onClick={onToggleMenu}>
          <Menu size={24} color="var(--text-primary)" />
        </button>
        <div className="search-bar" ref={searchRef} style={{ position: 'relative' }}>
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="업무, 파일 검색..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
            onFocus={() => setShowSearch(true)}
          />
          
          {showSearch && searchQuery && (
            <div style={{
              position: 'absolute', top: '45px', left: 0, width: '400px',
              background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)', padding: '1rem', boxShadow: 'var(--shadow-lg)',
              zIndex: 100, maxHeight: '400px', overflowY: 'auto'
            }}>
              {filteredTasks.length === 0 && filteredFiles.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>검색 결과가 없습니다.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredTasks.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>업무 (Tasks)</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {filteredTasks.map(t => (
                          <div key={t.id} onClick={() => handleSearchResultClick('/app/roles')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.03)'}>
                            <CheckSquare size={16} color="var(--primary)" />
                            <span style={{ fontSize: '0.85rem' }}>{t.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {filteredFiles.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>파일 (Files)</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {filteredFiles.map(f => (
                          <div key={f.id} onClick={() => handleSearchResultClick('/app/files')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.03)'}>
                            <FileText size={16} color="var(--success)" />
                            <span style={{ fontSize: '0.85rem' }}>{f.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="header-actions">
        <button className="icon-btn" onClick={onOpenChat} title="팀 채팅">
          <MessageCircle size={20} />
        </button>

        <div className="relative">
          <button className="icon-btn" onClick={handleNotiClick}>
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-dot"></span>}
          </button>
          
          {showNoti && (
            <div style={{
              position: 'absolute', top: '50px', right: '0', width: '300px',
              background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)', padding: '1rem', boxShadow: 'var(--shadow-lg)'
            }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>알림</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {notifications.length === 0 ? <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>알림이 없습니다.</p> : 
                  notifications.map(n => (
                    <div key={n.id} style={{ fontSize: '0.8rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      {n.text}
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>

        <div className="user-profile">
          <div className="avatar" style={{ background: currentUser?.color }}>
            {currentUser?.name[0]}
          </div>
          <div className="user-info">
            <span className="user-name" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {currentUser?.name}
              {isPremium && <Crown size={12} color="var(--warning)" style={{ fill: 'var(--warning)' }} title="Pro 회원" />}
            </span>
            <span className="user-role">{currentUser?.role}</span>
          </div>
        </div>

        <button className="icon-btn" onClick={logout} style={{ color: 'var(--danger)', marginLeft: '1rem' }} title="로그아웃">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
