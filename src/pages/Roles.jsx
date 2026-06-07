import React, { useState } from 'react';
import { Plus, MoreHorizontal, X } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import { DndContext, useDraggable, useDroppable, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import toast from 'react-hot-toast';

// Draggable Task Card
const TaskCard = ({ task, member }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `task-${task.id}`,
    data: { task },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.8 : 1,
    boxShadow: isDragging ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
    cursor: isDragging ? 'grabbing' : 'grab',
  } : { cursor: 'grab' };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'var(--danger)';
      case 'medium': return 'var(--warning)';
      case 'low': return 'var(--success)';
      default: return 'var(--text-muted)';
    }
  };

  const getPriorityText = (priority) => {
    switch(priority) {
      case 'high': return '긴급';
      case 'medium': return '보통';
      case 'low': return '낮음';
      default: return '보통';
    }
  };

  return (
    <div 
      ref={setNodeRef} {...listeners} {...attributes}
      style={{ 
        background: 'var(--bg-surface)', padding: '1rem', borderRadius: '0.5rem', 
        border: '1px solid var(--border-color)', transition: 'box-shadow 0.2s', ...style
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {task.tags.map(tag => (
            <span key={tag} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.25rem', color: 'var(--text-secondary)' }}>
              {tag}
            </span>
          ))}
        </div>
        {task.priority === 'high' && (
          <span style={{ fontSize: '0.65rem', fontWeight: '600', color: getPriorityColor(task.priority), border: `1px solid ${getPriorityColor(task.priority)}`, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
            {getPriorityText(task.priority)}
          </span>
        )}
      </div>
      
      <h3 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{task.title}</h3>
      {task.description && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {task.description}
        </p>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: member?.color || 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'white' }}>
            {task.assignee[0]}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{task.assignee}</span>
        </div>
      </div>
    </div>
  );
};

// Droppable Column
const Column = ({ col, tasks, members }) => {
  const { setNodeRef, isOver } = useDroppable({ id: col.type });

  return (
    <div 
      ref={setNodeRef} 
      className="card" 
      style={{ 
        display: 'flex', flexDirection: 'column', 
        background: isOver ? 'rgba(59, 130, 246, 0.1)' : 'rgba(30, 41, 59, 0.4)', 
        padding: '1rem', border: isOver ? '1px dashed var(--primary)' : '1px solid transparent',
        transition: 'var(--transition)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600' }}>{col.title}</h2>
          <span style={{ background: 'var(--bg-base)', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tasks.length}</span>
        </div>
        <button style={{ color: 'var(--text-muted)' }}><MoreHorizontal size={18} /></button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.25rem', flex: 1 }}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} member={members.find(m => m.name === task.assignee)} />
        ))}
      </div>
    </div>
  );
};

const Roles = () => {
  const { tasks, addTask, updateTaskStatus, members } = useTeam();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignee: '', tags: '', priority: 'medium' });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const columns = [
    { title: '대기 중 (To Do)', type: 'todo' },
    { title: '진행 중 (In Progress)', type: 'progress' },
    { title: '완료 (Done)', type: 'done' }
  ];

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    
    const taskId = parseInt(active.id.split('-')[1]);
    const newCol = over.id;
    const task = tasks.find(t => t.id === taskId);
    
    if (task && task.col !== newCol) {
      updateTaskStatus(taskId, newCol);
      toast.success(`'${task.title}' 업무가 이동되었습니다.`, { style: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } });
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignee) return;
    
    addTask({
      title: newTask.title,
      description: newTask.description,
      assignee: newTask.assignee,
      col: 'todo',
      priority: newTask.priority,
      tags: newTask.tags ? newTask.tags.split(',').map(t => t.trim()) : []
    });
    setIsModalOpen(false);
    setNewTask({ title: '', description: '', assignee: '', tags: '', priority: 'medium' });
  };

  return (
    <div className="roles-page">
      <div className="title-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">업무 분담 현황</h1>
          <p className="page-subtitle">마우스로 카드를 드래그하여 상태를 변경하세요.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> 새 업무 할당
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', height: 'calc(100vh - 220px)' }}>
          {columns.map(col => (
            <Column key={col.type} col={col} tasks={tasks.filter(t => t.col === col.type)} members={members} />
          ))}
        </div>
      </DndContext>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">새 업무 할당</h2>
              <X className="modal-close" onClick={() => setIsModalOpen(false)} />
            </div>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label className="form-label">업무 제목</label>
                <input 
                  type="text" className="form-control" placeholder="예: 데이터베이스 스키마 설계"
                  value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} required
                />
              </div>
              <div className="form-group">
                <label className="form-label">세부 설명</label>
                <textarea 
                  className="form-control" rows="3" placeholder="업무에 대한 자세한 설명을 적어주세요."
                  value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                ></textarea>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">담당자</label>
                  <select 
                    className="form-control" value={newTask.assignee}
                    onChange={(e) => setNewTask({...newTask, assignee: e.target.value})} required
                  >
                    <option value="" disabled>팀원 선택</option>
                    {members.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">우선순위</label>
                  <select 
                    className="form-control" value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option value="low">낮음</option>
                    <option value="medium">보통</option>
                    <option value="high">긴급</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">태그 (쉼표로 구분)</label>
                <input 
                  type="text" className="form-control" placeholder="예: 백엔드, 필수"
                  value={newTask.tags} onChange={(e) => setNewTask({...newTask, tags: e.target.value})}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>취소</button>
                <button type="submit" className="btn btn-primary">업무 생성</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
