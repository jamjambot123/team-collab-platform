import React from 'react';
import { Target, TrendingUp, Award } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const Analytics = () => {
  const { members, tasks } = useTeam();
  
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
      <div className="title-group">
        <h1 className="page-title">참여도 및 역량 분석</h1>
        <p className="page-subtitle">팀원들의 플랫폼 내 활동 데이터를 기반으로 한 객관적인 기여도 평가 및 역량 분석입니다.</p>
      </div>

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
