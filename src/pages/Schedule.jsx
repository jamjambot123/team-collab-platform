import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Zap, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTeam } from '../context/TeamContext';

const Schedule = () => {
  const { events, addEvent } = useTeam();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'meeting' });
  const [currentDate, setCurrentDate] = useState(new Date());

  const openModalWithDate = (dateObj) => {
    const tzoffset = dateObj.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(dateObj - tzoffset)).toISOString().split('T')[0];
    
    setNewEvent({ title: '', date: localISOTime, type: 'meeting' });
    setIsModalOpen(true);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    
    addEvent({
      title: newEvent.title,
      date: new Date(newEvent.date).toISOString(),
      type: newEvent.type
    });
    setIsModalOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Generate calendar days
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Find the day of the week the month starts on (0=Sun, 1=Mon, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Find the number of days in the current month
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  
  // Create array for rendering (usually 35 or 42 cells)
  const totalCells = Math.ceil((firstDayOfMonth + daysInCurrentMonth) / 7) * 7;
  const daysInMonth = Array.from({ length: totalCells }).map((_, i) => {
    // i ranges from 0 to totalCells - 1
    // e.g. if firstDayOfMonth is 2 (Tuesday), i=0 means 2 days before the 1st
    const dayOffset = i - firstDayOfMonth + 1;
    const date = new Date(year, month, dayOffset);
    const isCurrentMonth = date.getMonth() === month;
    
    const dayEvents = events.filter(e => {
      const eDate = new Date(e.date);
      return eDate.getDate() === date.getDate() && eDate.getMonth() === date.getMonth() && eDate.getFullYear() === date.getFullYear();
    });

    return { date, isCurrentMonth, dayEvents };
  });

  return (
    <div className="schedule-page">
      <div className="title-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">팀 프로젝트 일정</h1>
          <p className="page-subtitle">마일스톤을 관리하고 AI가 추천하는 최적의 회의 시간을 확인하세요.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModalWithDate(new Date())}>
          <CalendarIcon size={18} /> 새 일정 추가
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
        <div className="card" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
              {currentDate.toLocaleString('ko-KR', { month: 'long', year: 'numeric' })}
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={handlePrevMonth}><ChevronLeft size={20}/></button>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={handleNextMonth}><ChevronRight size={20}/></button>
            </div>
          </div>
          <div style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', 
            background: 'var(--border-color)', border: '1px solid var(--border-color)',
            borderRadius: '0.5rem', overflow: 'hidden', flex: 1
          }}>
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} style={{ background: 'var(--bg-surface)', padding: '0.75rem', textAlign: 'center', fontWeight: '600', color: 'var(--text-secondary)' }}>{day}</div>
            ))}
            {daysInMonth.map((dayObj, i) => (
              <div 
                key={i} 
                onClick={() => openModalWithDate(dayObj.date)}
                style={{ 
                  background: dayObj.isCurrentMonth ? 'var(--bg-base)' : 'rgba(11, 17, 32, 0.5)', 
                  padding: '0.5rem', minHeight: '100px', cursor: 'pointer', transition: 'var(--transition)'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = dayObj.isCurrentMonth ? 'var(--bg-base)' : 'rgba(11, 17, 32, 0.5)'}
              >
                <span style={{ color: dayObj.isCurrentMonth ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '0.8rem' }}>{dayObj.date.getDate()}</span>
                {dayObj.dayEvents.map(e => (
                  <div key={e.id} style={{ 
                    background: e.type === 'deadline' ? 'rgba(239, 68, 68, 0.15)' : e.type === 'presentation' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)', 
                    borderLeft: `3px solid ${e.type === 'deadline' ? 'var(--danger)' : e.type === 'presentation' ? 'var(--primary)' : 'var(--success)'}`, 
                    padding: '0.25rem 0.5rem', borderRadius: '0.25rem', marginTop: '0.5rem', 
                    fontSize: '0.75rem', color: 'var(--text-primary)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                  }}>
                    {e.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'linear-gradient(180deg, var(--bg-surface) 0%, rgba(139, 92, 246, 0.05) 100%)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
              <Zap size={20} />
              <h2 style={{ fontSize: '1.1rem', fontWeight: '600' }}>AI 회의 시간 추천</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>팀원들의 공통 가능 시간을 분석한 결과입니다:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { time: '내일, 오후 2:00', match: '100% 매칭' },
                { time: '이번 주 금요일, 오후 4:00', match: '100% 매칭' },
                { time: '다음 주 월요일, 오전 10:00', match: '80% 매칭' },
              ].map((slot, i) => (
                <div key={i} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.85rem' }}>{slot.time}</span>
                  </div>
                  <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>{slot.match}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">새 일정 등록</h2>
              <X className="modal-close" onClick={() => setIsModalOpen(false)} />
            </div>
            <form onSubmit={handleAddEvent}>
              <div className="form-group">
                <label className="form-label">일정 제목</label>
                <input 
                  type="text" className="form-control" placeholder="예: 팀 회의"
                  value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} required
                />
              </div>
              <div className="form-group">
                <label className="form-label">날짜</label>
                <input 
                  type="date" className="form-control" 
                  value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} required
                />
              </div>
              <div className="form-group">
                <label className="form-label">일정 종류</label>
                <select 
                  className="form-control"
                  value={newEvent.type} onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                >
                  <option value="meeting">회의/미팅</option>
                  <option value="presentation">발표</option>
                  <option value="deadline">마감일</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>취소</button>
                <button type="submit" className="btn btn-primary">등록하기</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
