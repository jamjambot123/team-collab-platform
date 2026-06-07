import React from 'react';
import { Calendar, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { tasks, events, files, currentUser } = useTeam();
  const navigate = useNavigate();

  const myTasks = tasks.filter(t => t.assignee === currentUser?.name);
  const completedMyTasks = myTasks.filter(t => t.col === 'done').length;
  
  const totalTasks = tasks.length || 1;
  const completedTasks = tasks.filter(t => t.col === 'done').length;
  const teamProgress = Math.round((completedTasks / totalTasks) * 100);

  const upcomingEvents = [...events].sort((a,b) => new Date(a.date) - new Date(b.date)).filter(e => new Date(e.date) >= new Date(new Date().setHours(0,0,0,0)));

  const progressData = [
    { name: 'Completed', value: teamProgress },
    { name: 'Remaining', value: 100 - teamProgress },
  ];

  return (
    <div className="dashboard-page">
      <div className="title-group">
        <h1 className="page-title">환영합니다, {currentUser?.name}님! 👋</h1>
        <p className="page-subtitle">현재 팀 프로젝트 진행 상황을 한눈에 확인하세요.</p>
      </div>

      <div className="summary-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="icon-wrapper" style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '1rem', color: 'var(--primary)' }}>
            <Calendar size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>다음 일정</h3>
            <p style={{ fontSize: '1rem', fontWeight: '600' }}>
              {upcomingEvents.length > 0 ? upcomingEvents[0].title : '예정된 일정 없음'}
            </p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="icon-wrapper" style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '1rem', color: 'var(--success)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>나의 목표 달성률</h3>
            <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>{completedMyTasks} / {myTasks.length}</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="icon-wrapper" style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '1rem', color: 'var(--warning)' }}>
            <Clock size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>총 공유 파일</h3>
            <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>{files.length} 개</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
          <div style={{ width: '60px', height: '60px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={progressData} innerRadius={20} outerRadius={28} dataKey="value" stroke="none">
                  <Cell key="cell-0" fill="var(--secondary)" />
                  <Cell key="cell-1" fill="rgba(255,255,255,0.05)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>전체 팀 진척도</h3>
            <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>{teamProgress}%</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>나의 대기 중인 업무</h2>
            <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => navigate('/app/roles')}>
              전체 보기 <ArrowRight size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {myTasks.filter(t => t.col !== 'done').length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>모든 업무를 완료했습니다!</p>
            ) : (
              myTasks.filter(t => t.col !== 'done').map(task => (
                <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '20px', height: '20px', border: `2px solid ${task.col === 'progress' ? 'var(--primary)' : 'var(--text-muted)'}`, borderRadius: '50%' }}></div>
                    <span style={{ fontWeight: '500' }}>{task.title}</span>
                    {task.priority === 'high' && <span style={{ fontSize: '0.7rem', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>긴급</span>}
                  </div>
                  <span className={`badge ${task.col === 'progress' ? 'badge-primary' : 'badge-warning'}`}>
                    {task.col === 'progress' ? '진행 중' : '대기 중'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>다가오는 일정</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {upcomingEvents.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>예정된 일정이 없습니다.</p> : upcomingEvents.slice(0, 3).map(e => (
              <div key={e.id} style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: e.type === 'deadline' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)', color: e.type === 'deadline' ? 'var(--danger)' : 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {new Date(e.date).getDate()}
                </div>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)' }}>{e.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {new Date(e.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
