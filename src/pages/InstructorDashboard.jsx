import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle, CheckCircle, BarChart3, ChevronLeft, Search, GraduationCap } from 'lucide-react';
import { useTeam } from '../context/TeamContext';

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const { tasks } = useTeam();
  const [searchQuery, setSearchQuery] = useState('');

  // 1조 (우리 팀) 실데이터 연동
  const realTotalTasks = tasks.length || 1;
  const realCompleted = tasks.filter(t => t.col === 'done').length;
  const realProgress = Math.round((realCompleted / realTotalTasks) * 100);

  const mockTeams = [
    {
      id: 1,
      name: '1조 (CollabHub)',
      topic: '대학생 팀 프로젝트 일정·역할 관리 플랫폼 개발',
      members: 4,
      progress: realProgress,
      status: realProgress === 100 ? '완료' : (realProgress > 50 ? '순항 중' : '지연 예상'),
      lastActive: '방금 전',
      warnings: []
    },
    {
      id: 2,
      name: '2조 (에코빌리지)',
      topic: '캠퍼스 내 일회용품 줄이기 캠페인 기획 및 앱 개발',
      members: 5,
      progress: 85,
      status: '순항 중',
      lastActive: '2시간 전',
      warnings: []
    },
    {
      id: 3,
      name: '3조 (스터디매치)',
      topic: '전공/교양 과목 기반 스터디 매칭 서비스',
      members: 3,
      progress: 20,
      status: '위험',
      lastActive: '3일 전',
      warnings: ['참여도 불균형 (무임승차 의심)', '마감일 임박 업무 3건 방치']
    },
    {
      id: 4,
      name: '4조 (알바고)',
      topic: '대학가 주변 단기 알바 매칭 플랫폼',
      members: 4,
      progress: 60,
      status: '순항 중',
      lastActive: '어제',
      warnings: ['팀장 로그인 1주일 째 없음']
    },
    {
      id: 5,
      name: '5조 (미식캠퍼스)',
      topic: '학식 메뉴 리뷰 및 혼밥 메이트 찾기 앱',
      members: 4,
      progress: 45,
      status: '주의',
      lastActive: '어제',
      warnings: ['개발 일정 지연 중']
    },
    {
      id: 6,
      name: '6조 (오픈마켓)',
      topic: '교재 중고 거래 및 무료 나눔 커뮤니티',
      members: 5,
      progress: 95,
      status: '완료 임박',
      lastActive: '방금 전',
      warnings: []
    },
    {
      id: 7,
      name: '7조 (스페이스)',
      topic: '빈 강의실 및 교내 스터디룸 실시간 예약 시스템',
      members: 3,
      progress: 10,
      status: '위험',
      lastActive: '5일 전',
      warnings: ['업무 분담 미진행', '참여도 저조']
    },
  ];

  const filteredTeams = mockTeams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    team.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#050B14', color: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      {/* Instructor Header */}
      <header style={{ 
        height: '70px', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(11, 17, 32, 0.9)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(12px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ChevronLeft size={18} /> 메인으로
          </button>
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8B5CF6', fontWeight: '700', fontSize: '1.25rem' }}>
            <GraduationCap size={28} />
            CollabHub <span style={{ color: '#F8FAFC', fontWeight: '400', opacity: 0.8 }}>| 교수자 대시보드</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '99px', width: '250px' }}>
            <Search size={16} color="#64748B" style={{ marginRight: '0.5rem' }} />
            <input 
              type="text" 
              placeholder="팀명 또는 주제 검색..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%', fontSize: '0.85rem' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <div style={{ width: '32px', height: '32px', background: '#3B82F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>김</div>
            <div style={{ fontSize: '0.85rem' }}>
              <div style={{ fontWeight: '600' }}>김교수 님</div>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>소프트웨어 공학 개론</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '2rem 3rem', maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* Top Summary Widgets */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
              <Users size={24} />
            </div>
            <div>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>총 모니터링 팀</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{mockTeams.length}개 팀 <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: '400' }}>(27명)</span></h3>
            </div>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <CheckCircle size={24} />
            </div>
            <div>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>순항 중인 팀</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>3개 팀</h3>
            </div>
          </div>

          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '1rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <p style={{ color: '#EF4444', fontSize: '0.85rem', marginBottom: '0.25rem' }}>위험 감지 (무임승차/지연)</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#EF4444' }}>2개 팀</h3>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>팀별 상세 현황</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem' }}>전체 리포트 다운로드 (PDF)</button>
          </div>
        </div>

        {/* Teams Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {filteredTeams.map((team) => (
            <div key={team.id} style={{ 
              background: 'rgba(30, 41, 59, 0.4)', 
              border: team.status === '위험' ? '1px solid rgba(239, 68, 68, 0.5)' : (team.id === 1 ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)'),
              borderRadius: '1rem', 
              padding: '1.5rem',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {team.id === 1 && (
                <div style={{ position: 'absolute', top: '12px', right: '-30px', background: 'var(--primary)', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', padding: '4px 30px', transform: 'rotate(45deg)' }}>
                  LIVE
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {team.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {team.topic}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#64748B' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Users size={14} /> 팀원 {team.members}명</span>
                <span>•</span>
                <span>최근 활동: {team.lastActive}</span>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#94A3B8' }}>프로젝트 진행률</span>
                  <span style={{ fontWeight: '600', color: team.progress > 80 ? '#10B981' : (team.progress < 30 ? '#EF4444' : '#F8FAFC') }}>{team.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${team.progress}%`, height: '100%', background: team.progress > 80 ? '#10B981' : (team.progress < 30 ? '#EF4444' : '#3B82F6'), borderRadius: '3px' }}></div>
                </div>
              </div>

              {team.warnings.length > 0 ? (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', padding: '0.75rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>
                    <AlertTriangle size={14} /> AI 위험 감지
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#FCA5A5', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {team.warnings.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '8px', padding: '0.75rem', marginTop: '1rem', textAlign: 'center', color: '#34D399', fontSize: '0.85rem' }}>
                  안정적인 협업이 이루어지고 있습니다.
                </div>
              )}

              <button style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', marginTop: '1.5rem', fontSize: '0.9rem', transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}>
                해당 팀 상세 모니터링 (관리자 권한)
              </button>
            </div>
          ))}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          header { padding: 0 1rem !important; }
          header > div:last-child { display: none !important; }
          main { padding: 1.5rem 1rem !important; }
        }
      `}} />
    </div>
  );
};

export default InstructorDashboard;
