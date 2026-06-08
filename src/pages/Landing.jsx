import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Users, BarChart3, X } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>C</div>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.5px' }}>CollabHub</span>
        </div>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#features" style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>기능 소개</a>
          <a href="#pricing" style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>요금제</a>
        </nav>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>로그인</button>
      </header>

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--secondary)', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              새로운 차원의 협업을 경험하세요 🚀
            </div>
            <h1 style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              완벽한 팀 프로젝트를 위한 <br/>
              <span style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>올인원 워크스페이스</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6' }}>
              흩어져 있는 도구들을 하나로 모았습니다. <br/>일정 관리, 업무 분담, 자료 공유, 참여도 분석까지 CollabHub에서 한 번에 해결하세요.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => navigate('/login')}>
                무료로 시작하기 <ArrowRight size={20} />
              </button>
              <button className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => setShowDemo(true)}>
                데모 영상 보기
              </button>
            </div>
            
            <button 
              className="btn btn-outline" 
              style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', borderColor: 'rgba(139, 92, 246, 0.3)', padding: '0.75rem 1.5rem', borderRadius: '99px', fontSize: '0.9rem' }}
              onClick={() => navigate('/instructor')}
            >
              👨‍🏫 B2B 교육기관용: 교수/조교 관전 모드 체험하기
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{ padding: '5rem 2rem', background: 'var(--bg-surface)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>왜 CollabHub인가요?</h2>
              <p style={{ color: 'var(--text-secondary)' }}>기존 협업 도구의 한계를 극복한 혁신적인 기능들</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
                <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Users size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>스마트 업무 분담</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>드래그 앤 드롭 지원 칸반 보드로 업무 상태를 직관적으로 관리하고 우선순위를 명확히 합니다.</p>
              </div>
              <div className="card" style={{ borderTop: '4px solid var(--success)' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <BarChart3 size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>객관적 참여도 분석</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>플랫폼 내 활동 데이터를 기반으로 개인별 기여도와 역량을 실시간 레이더 차트로 평가합니다.</p>
              </div>
              <div className="card" style={{ borderTop: '4px solid var(--secondary)' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--secondary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Zap size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>AI 일정 자동 추천</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>팀원들의 공통 가능 시간을 분석하여 가장 효율적인 미팅 시간을 AI가 자동으로 제안합니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" style={{ padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>합리적인 요금제</h2>
              <p style={{ color: 'var(--text-secondary)' }}>팀 규모와 프로젝트 성격에 맞는 플랜을 선택하세요.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Free Plan */}
              <div className="card" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>Starter (무료)</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>소규모 대학생 팀 프로젝트용</p>
                <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '2rem' }}>₩0<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400' }}> /월</span></div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem', flex: 1 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--success)" /> <span>최대 5명 팀원</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--success)" /> <span>기본 일정 및 업무 관리</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--success)" /> <span>500MB 자료 저장 공간</span></li>
                </ul>
                <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => navigate('/login')}>무료로 시작</button>
              </div>
              
              {/* Pro Plan */}
              <div className="card" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', border: '2px solid var(--primary)', transform: 'scale(1.05)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700' }}>가장 인기있는 플랜</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>Pro</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>전문적인 협업이 필요한 팀</p>
                <div style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '2rem' }}>₩9,900<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400' }}> /월</span></div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem', flex: 1 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--success)" /> <span>무제한 팀원 수</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--success)" /> <span>고급 AI 참여도 분석 리포트</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--success)" /> <span>100GB 저장 공간</span></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--success)" /> <span>실시간 화상 회의 지원</span></li>
                </ul>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/login')}>14일 무료 체험하기</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p>&copy; 2026 CollabHub Inc. All rights reserved.</p>
      </footer>

      {showDemo && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '800px', width: '90%' }}>
            <div className="modal-header">
              <h2 className="modal-title">CollabHub 소개 영상</h2>
              <X className="modal-close" onClick={() => setShowDemo(false)} />
            </div>
            <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(0,0,0,0.5)', borderRadius: '0.5rem', border: '1px dashed var(--border-color)', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: 'var(--text-muted)' }}>유튜브 동영상 임베드 또는 데모 비디오가 들어갈 자리입니다.<br/>(현재 데모 버전에서는 지원되지 않습니다.)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
