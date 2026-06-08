import React, { useState } from 'react';
import { Target, TrendingUp, Award, Crown, X, Lock } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const Analytics = () => {
  const { members, tasks, isPremium } = useTeam();
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);
  
  const totalCompletedTasks = tasks.filter(t => t.col === 'done').length;
  const totalTasks = tasks.length || 1;
  const teamEfficiency = Math.round((totalCompletedTasks / totalTasks) * 100);

  const stats = members.map(m => {
    const memberTasks = tasks.filter(t => t.assignee === m.name);
    const completed = memberTasks.filter(t => t.col === 'done').length;
    const contribution = totalCompletedTasks === 0 ? 0 : Math.round((completed / totalCompletedTasks) * 100);
    const qualityScore = completed > 0 ? (4.0 + (completed * 0.1)).toFixed(1) : 'N/A';

    return { ...m, completed, contribution, qualityScore };
  });

  const topContributor = [...stats].sort((a,b) => b.contribution - a.contribution)[0];

  // Radar chart data structure
  const radarData = [
    { subject: '기획력', A: members[0].skills.planning, B: members[1].skills.planning, C: members[2].skills.planning, D: members[3].skills.planning, fullMark: 100 },
    { subject: '개발/구현', A: members[0].skills.dev, B: members[1].skills.dev, C: members[2].skills.dev, D: members[3].skills.dev, fullMark: 100 },
    { subject: '디자인', A: members[0].skills.design, B: members[1].skills.design, C: members[2].skills.design, D: members[3].skills.design, fullMark: 100 },
    { subject: '자료조사', A: members[0].skills.research, B: members[1].skills.research, C: members[2].skills.research, D: members[3].skills.research, fullMark: 100 },
    { subject: '소통/협업', A: members[0].skills.comm, B: members[1].skills.comm, C: members[2].skills.comm, D: members[3].skills.comm, fullMark: 100 },
  ];

  return (
    <div className="analytics-page">
      <div className="title-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">참여도 및 역량 분석</h1>
          <p className="page-subtitle">팀원들의 플랫폼 내 활동 데이터를 기반으로 한 객관적인 기여도 평가 및 역량 분석입니다.</p>
        </div>
        <button 
          className="btn btn-primary" 
          style={{ background: 'linear-gradient(135deg, var(--warning), #fb923c)', color: '#fff', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)' }}
          onClick={() => setShowReportModal(true)}
        >
          <Crown size={18} style={{ fill: '#fff' }} /> AI 심층 분석 (Pro)
        </button>
      </div>

      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Crown size={24} color="var(--warning)" style={{ fill: 'var(--warning)' }} />
                AI 팀워크 심층 분석 리포트
              </h2>
              <X className="modal-close" onClick={() => setShowReportModal(false)} />
            </div>

            {isPremium ? (
              <div style={{ padding: '1rem 0' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                  <h3 style={{ color: 'var(--success)', marginBottom: '0.75rem', fontWeight: '600' }}>✨ AI 총평: 매우 우수한 협업 시너지</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    현재 팀은 전반적으로 업무 할당과 완료 비율이 뛰어난 균형을 이루고 있습니다. 특히 <strong>김동원</strong> 님은 높은 기획력을 바탕으로 팀의 방향성을 훌륭하게 제시하고 있으며, 이를 바탕으로 <strong>이민수</strong> 님과 <strong>박지원</strong> 님이 각각의 역할을 적절히 수행 중입니다. 다만, 특정 기간에 <strong>최유나</strong> 님의 업무 병목이 발생할 가능성이 있으므로 일정을 조금 더 세분화할 것을 권장합니다.
                  </p>
                </div>
                
                <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>개인별 AI 코멘트</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none' }}>
                  {members.map(m => (
                    <li key={m.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ fontWeight: '600', color: m.color }}>{m.name}</span> <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({m.role})</span>
                      <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {m.id === 'm1' && '탁월한 리더십을 보이고 있으나, 타 팀원의 일정 관리에 약간의 리소스 할당이 필요함.'}
                        {m.id === 'm2' && '자료조사 속도가 빠르며 기획 단계에서의 기여가 매우 큼. 소통 빈도를 조금 높이면 좋을 것 같습니다.'}
                        {m.id === 'm3' && '디자인 영역에서 독보적인 기여도를 보이며, 긍정적인 피드백으로 팀 분위기 메이커 역할을 톡톡히 하고 있습니다.'}
                        {m.id === 'm4' && '꼼꼼한 기록과 문서화에 강점이 있습니다. 회의 시 더 적극적인 의견 개진이 기대됩니다.'}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div style={{ position: 'relative', padding: '1rem 0 2rem 0' }}>
                <div style={{ filter: 'blur(6px)', opacity: '0.3', pointerEvents: 'none', userSelect: 'none' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                    <h3 style={{ marginBottom: '0.75rem' }}>✨ AI 총평: 이 부분은 유료 기능입니다 블라블라</h3>
                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>현재 팀은 매우 우수한 성과를 보이고 있으며 어쩌구 저쩌구... 블라블라블라 계속됩니다. 매우 유용한 정보들이 여기에 가득 차 있습니다.</p>
                  </div>
                  <ul>
                    <li style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', marginBottom: '1rem' }}>
                      <strong>홍길동</strong> 코멘트 영역 모자이크... 어쩌구 저쩌구...
                    </li>
                    <li style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem' }}>
                      <strong>김철수</strong> 코멘트 영역 모자이크... 매우 중요한 피드백...
                    </li>
                  </ul>
                </div>

                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', padding: '0 2rem' }}>
                  <Lock size={48} color="var(--warning)" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Pro 플랜 전용 기능입니다</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                    업그레이드하고 AI가 분석한 우리 팀의 숨겨진 인사이트와<br/>개인별 맞춤형 코멘트를 확인해 보세요!
                  </p>
                  <button 
                    className="btn btn-primary"
                    style={{ background: 'linear-gradient(135deg, var(--warning), #fb923c)', color: '#fff', border: 'none' }}
                    onClick={() => { setShowReportModal(false); navigate('/app/settings'); }}
                  >
                    플랜 업그레이드 하러 가기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)' }}>
            <Target size={24} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>전체 완료된 업무</h2>
          </div>
          <p style={{ fontSize: '2.5rem', fontWeight: '700' }}>{totalCompletedTasks}<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400' }}> / {totalTasks}</span></p>
          <div style={{ width: '100%', height: '8px', background: 'var(--bg-base)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${teamEfficiency}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))' }}></div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--success)' }}>
            <TrendingUp size={24} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>프로젝트 진척률</h2>
          </div>
          <p style={{ fontSize: '2.5rem', fontWeight: '700' }}>{teamEfficiency}<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400' }}> %</span></p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--warning)' }}>
            <Award size={24} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>우수 기여자</h2>
          </div>
          <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{topContributor?.name || '없음'}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>팀 전체 기여도 중 {topContributor?.contribution}% 차지</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>개인별 성과 지표</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {stats.map((member, i) => (
              <div key={member.id} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 100px 100px', alignItems: 'center', gap: '2rem', paddingBottom: '1.5rem', borderBottom: i !== stats.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                    {member.name[0]}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '500' }}>{member.name}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.role}</p>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>기여도 비율</span>
                    <span style={{ fontWeight: '600' }}>{member.contribution}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-base)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${member.contribution}%`, height: '100%', background: member.color }}></div>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>{member.completed}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>완료 업무</p>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--warning)' }}>{member.qualityScore}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>평가 점수</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>팀원 역량 맵</h2>
          <div style={{ flex: 1, minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                {members.map((m, i) => {
                  const dataKeys = ['A', 'B', 'C', 'D'];
                  return (
                    <Radar key={m.id} name={m.name} dataKey={dataKeys[i]} stroke={m.color} fill={m.color} fillOpacity={0.3} />
                  );
                })}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
