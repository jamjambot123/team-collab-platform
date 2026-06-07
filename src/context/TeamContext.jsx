import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const TeamContext = createContext();

const initialMembers = [
  { id: 'm1', name: '김동원', role: '조장 / 발표', color: 'var(--primary)', skills: { planning: 90, dev: 40, design: 60, comm: 95, research: 80 } },
  { id: 'm2', name: '이민수', role: '자료조사 / 기획', color: 'var(--secondary)', skills: { planning: 50, dev: 95, design: 40, comm: 70, research: 60 } },
  { id: 'm3', name: '박지원', role: 'PPT 제작 / 디자인', color: 'var(--success)', skills: { planning: 70, dev: 20, design: 95, comm: 85, research: 50 } },
  { id: 'm4', name: '최유나', role: '보고서 작성 / 서기', color: 'var(--warning)', skills: { planning: 60, dev: 10, design: 50, comm: 80, research: 95 } },
];

const initialTasks = [
  { id: 1, title: '프로젝트 요구사항 정의서 작성', description: '플랫폼 주요 기능 및 사용자 시나리오 구체화', assignee: '김동원', col: 'done', tags: ['기획'], priority: 'high' },
  { id: 2, title: 'ICT 1차 보고서 초안 작성', description: 'C팀 팀과제 1차 보고서 워드 파일 초안 완성', assignee: '김동원', col: 'progress', tags: ['문서작업'], priority: 'high' },
  { id: 3, title: '데이터베이스 스키마 설계', description: '사용자, 업무, 일정, 파일 테이블 구조 설계', assignee: '이민수', col: 'todo', tags: ['백엔드'], priority: 'high' },
  { id: 4, title: 'UI/UX 목업 디자인', description: 'Figma를 이용한 전체 화면 디자인', assignee: '박지원', col: 'todo', tags: ['디자인'], priority: 'medium' },
  { id: 5, title: '경쟁사 유사 서비스 분석', description: '노션, 구글 캘린더, 슬랙 장단점 분석', assignee: '최유나', col: 'done', tags: ['리서치'], priority: 'medium' },
];

const initialEvents = [
  { id: 1, title: '1차 보고서 마감일', date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), type: 'deadline' },
  { id: 2, title: '정기 주간 회의', date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), type: 'meeting' },
  { id: 3, title: '중간 발표', date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(), type: 'presentation' },
];

const initialFiles = [
  { id: 1, name: 'ICT_프로젝트_보고서_v1.docx', type: 'doc', size: '2.4 MB', owner: '김동원', date: new Date().toLocaleDateString(), category: 'document' },
  { id: 2, name: '경쟁사_분석_데이터.xlsx', type: 'sheet', size: '1.1 MB', owner: '최유나', date: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString(), category: 'data' },
  { id: 3, name: 'UI_메인화면_시안.png', type: 'img', size: '4.5 MB', owner: '박지원', date: new Date(new Date().setDate(new Date().getDate() - 2)).toLocaleDateString(), category: 'design' },
];

const initialChats = [
  { id: 1, user: '이민수', message: '동원님, DB 스키마 초안 확인 부탁드립니다!', time: '10:30 AM' },
  { id: 2, user: '김동원', message: '네, 지금 확인해볼게요.', time: '10:32 AM' },
];

export const TeamProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('team_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('team_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('team_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem('team_files');
    return saved ? JSON.parse(saved) : initialFiles;
  });

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('team_chats');
    return saved ? JSON.parse(saved) : initialChats;
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: '유나님이 새 파일을 업로드했습니다.', read: false },
    { id: 2, text: '내일 정기 회의가 예정되어 있습니다.', read: false }
  ]);

  const [members] = useState(initialMembers);

  useEffect(() => { localStorage.setItem('team_user', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('team_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('team_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('team_files', JSON.stringify(files)); }, [files]);
  useEffect(() => { localStorage.setItem('team_chats', JSON.stringify(chats)); }, [chats]);

  const login = (member) => {
    setCurrentUser(member);
    toast.success(`${member.name}님으로 로그인되었습니다.`, { style: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } });
  };
  
  const logout = () => {
    setCurrentUser(null);
    toast('로그아웃 되었습니다.', { icon: '👋', style: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } });
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    addNotification(`${task.assignee}님에게 새 업무가 할당되었습니다.`);
    toast.success('새 업무가 성공적으로 할당되었습니다.', { style: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } });
  };

  const updateTaskStatus = (id, newCol) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, col: newCol } : t));
    // toast.success('상태가 업데이트 되었습니다.'); // dnd-kit 사용 시 너무 자주 뜰 수 있으므로 생략
  };

  const reorderTasks = (newTasks) => {
    setTasks(newTasks);
  };

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now() }]);
    addNotification(`새로운 일정 '${event.title}' 이 추가되었습니다.`);
    toast.success('새 일정이 등록되었습니다.', { style: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } });
  };

  const updateProfile = (name, email) => {
    const updatedUser = { ...currentUser, name, email };
    setCurrentUser(updatedUser);
    toast.success('프로필이 업데이트되었습니다.', { style: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } });
  };

  const addFile = (file) => {
    setFiles([file, ...files]);
    addNotification(`새 파일 '${file.name}' 이 업로드되었습니다.`);
    toast.success('파일이 성공적으로 업로드되었습니다.', { style: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } });
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
    toast.success('파일이 삭제되었습니다.', { style: { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } });
  };

  const sendChatMessage = (message) => {
    setChats([...chats, { id: Date.now(), user: currentUser.name, message, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
  };

  const addNotification = (text) => {
    setNotifications([{ id: Date.now(), text, read: false }, ...notifications]);
  };

  const markNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <TeamContext.Provider value={{
      currentUser, login, logout, updateProfile,
      members,
      tasks, addTask, updateTaskStatus, reorderTasks,
      events, addEvent,
      files, addFile, removeFile,
      chats, sendChatMessage,
      notifications, markNotificationsRead
    }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
