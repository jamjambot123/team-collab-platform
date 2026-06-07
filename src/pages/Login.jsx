import React, { useState } from 'react';
import { useTeam } from '../context/TeamContext';

const Login = () => {
  const { members, login } = useTeam();
  const [selectedUser, setSelectedUser] = useState(members[0]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(selectedUser);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
      <div className="card" style={{ width: '400px', textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div className="logo-icon" style={{ margin: '0 auto 1rem auto', width: '64px', height: '64px', fontSize: '2rem' }}>
            <span className="logo-text">C</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>CollabHub 로그인</h1>
          <p style={{ color: 'var(--text-muted)' }}>팀 프로젝트 관리 플랫폼에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <label className="form-label">사용자 프로필 선택</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {members.map(m => (
                <div 
                  key={m.id}
                  onClick={() => setSelectedUser(m)}
                  style={{ 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: `1px solid ${selectedUser.id === m.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: selectedUser.id === m.id ? 'var(--primary-light)' : 'rgba(255,255,255,0.02)',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    cursor: 'pointer', transition: 'var(--transition)'
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                    {m.name[0]}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '600' }}>{m.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
            팀 워크스페이스 입장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
