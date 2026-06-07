import React, { useState } from 'react';
import { useTeam } from '../context/TeamContext';
import { X, Send } from 'lucide-react';

const ChatPanel = ({ isOpen, onClose }) => {
  const { chats, sendChatMessage, currentUser } = useTeam();
  const [msg, setMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    sendChatMessage(msg);
    setMsg('');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, right: 0,
      width: '320px', height: '100vh',
      background: 'var(--bg-surface)',
      borderLeft: '1px solid var(--border-color)',
      boxShadow: '-5px 0 20px rgba(0,0,0,0.2)',
      transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 50,
      display: 'flex', flexDirection: 'column',
      backdropFilter: 'blur(12px)'
    }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '600' }}>팀 채팅</h2>
        <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {chats.map(chat => {
          const isMe = chat.user === currentUser.name;
          return (
            <div key={chat.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{chat.user} • {chat.time}</span>
              <div style={{ 
                background: isMe ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: isMe ? 'white' : 'var(--text-primary)',
                padding: '0.75rem 1rem',
                borderRadius: isMe ? '1rem 0 1rem 1rem' : '0 1rem 1rem 1rem',
                maxWidth: '85%',
                fontSize: '0.9rem'
              }}>
                {chat.message}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder="메시지 입력..." 
            className="form-control"
            value={msg} onChange={(e) => setMsg(e.target.value)}
            style={{ flex: 1, padding: '0.5rem 1rem', borderRadius: '999px' }}
          />
          <button type="submit" className="icon-btn" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
