import React, { useState } from 'react';
import { CreditCard, Shield, Bell, User, Star, X } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { currentUser, updateProfile, isPremium, upgradeToPremium } = useTeam();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form State
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || 'user@example.com');

  // Upgrade Modal State
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Notifications State
  const [emailNoti, setEmailNoti] = useState(true);
  const [pushNoti, setPushNoti] = useState(true);

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(name, email);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    toast.success('비밀번호가 성공적으로 변경되었습니다.', { style: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } });
  };

  const handleUpgrade = () => {
    upgradeToPremium();
    setShowUpgradeModal(false);
    toast.success('결제가 완료되었습니다. 프리미엄 혜택이 적용됩니다!', { style: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } });
  };

  return (
    <div className="settings-page">
      <div className="title-group">
        <h1 className="page-title">프로젝트 및 계정 설정</h1>
        <p className="page-subtitle">계정 정보, 알림 수신 설정 및 구독 플랜을 관리합니다.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Settings Sidebar */}
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: 'var(--radius-md)', background: activeTab === 'profile' ? 'var(--primary-light)' : 'transparent', color: activeTab === 'profile' ? 'var(--primary)' : 'var(--text-secondary)', textAlign: 'left', fontWeight: '500', transition: 'var(--transition)' }}
          >
            <User size={20} /> 프로필 관리
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: 'var(--radius-md)', background: activeTab === 'billing' ? 'var(--primary-light)' : 'transparent', color: activeTab === 'billing' ? 'var(--primary)' : 'var(--text-secondary)', textAlign: 'left', fontWeight: '500', transition: 'var(--transition)' }}
          >
            <CreditCard size={20} /> 구독 및 결제
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: 'var(--radius-md)', background: activeTab === 'notifications' ? 'var(--primary-light)' : 'transparent', color: activeTab === 'notifications' ? 'var(--primary)' : 'var(--text-secondary)', textAlign: 'left', fontWeight: '500', transition: 'var(--transition)' }}
          >
            <Bell size={20} /> 알림 설정
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: 'var(--radius-md)', background: activeTab === 'security' ? 'var(--primary-light)' : 'transparent', color: activeTab === 'security' ? 'var(--primary)' : 'var(--text-secondary)', textAlign: 'left', fontWeight: '500', transition: 'var(--transition)' }}
          >
            <Shield size={20} /> 보안 및 로그인
          </button>
        </div>

        {/* Settings Content */}
        <div style={{ flex: 1 }}>
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="card animate-fade-in">
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>내 프로필</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: currentUser?.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>
                  {currentUser?.name[0]}
                </div>
                <div>
                  <button type="button" className="btn btn-outline" style={{ marginBottom: '0.5rem' }}>사진 변경</button>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>JPG, GIF, PNG 파일 지원 (최대 2MB)</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="form-group">
                  <label className="form-label">이름</label>
                  <input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">역할</label>
                  <input type="text" className="form-control" defaultValue={currentUser?.role} readOnly />
                </div>
                <div className="form-group">
                  <label className="form-label">이메일 주소</label>
                  <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">변경사항 저장</button>
            </form>
          )}

          {activeTab === 'billing' && (
            <div className="card animate-fade-in">
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>구독 관리</h2>
              
              <div style={{ background: isPremium ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)', border: isPremium ? '1px solid var(--primary)' : '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {isPremium && <Star size={20} color="var(--warning)" />}
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: isPremium ? 'var(--primary)' : 'var(--text-primary)' }}>
                      {isPremium ? 'Pro 플랜 이용 중' : 'Free 플랜 이용 중'}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {isPremium ? '다음 결제일은 2026년 11월 15일 입니다. (₩9,900)' : '팀원 수 및 일부 기능이 제한됩니다.'}
                  </p>
                </div>
                {!isPremium && <button className="btn btn-primary" onClick={() => setShowUpgradeModal(true)}>플랜 업그레이드</button>}
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>결제 수단</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <CreditCard size={24} color="var(--text-muted)" />
                  <div>
                    <p style={{ fontWeight: '500' }}>Visa ending in 4242</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>만료일 12/28</p>
                  </div>
                </div>
                <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>수정</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card animate-fade-in">
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>알림 설정</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '500' }}>이메일 알림</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>프로젝트 주간 리포트 및 중요 변경사항을 이메일로 받습니다.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={emailNoti} onChange={() => setEmailNoti(!emailNoti)} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '500' }}>앱 내 푸시 알림</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>새 업무 할당, 파일 업로드 시 즉시 알림을 받습니다.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={pushNoti} onChange={() => setPushNoti(!pushNoti)} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handlePasswordChange} className="card animate-fade-in">
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>보안 및 로그인</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
                <div className="form-group">
                  <label className="form-label">현재 비밀번호</label>
                  <input type="password" className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">새 비밀번호</label>
                  <input type="password" className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">새 비밀번호 확인</label>
                  <input type="password" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>비밀번호 변경</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {showUpgradeModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Enterprise 플랜으로 업그레이드</h2>
              <X className="modal-close" onClick={() => setShowUpgradeModal(false)} />
            </div>
            <div style={{ padding: '1rem 0 2rem 0', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>₩29,900<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400' }}> /월</span></div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>모든 한계를 해제하고 최고의 협업 환경을 구축하세요.</p>
              <ul style={{ textAlign: 'left', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}>✅ 무제한 프로젝트 및 워크스페이스</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>✅ 1TB 보안 클라우드 스토리지</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>✅ 24/7 전담 엔지니어 기술 지원</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }} onClick={handleUpgrade}>결제 진행하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
