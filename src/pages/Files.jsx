import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, File, Image as ImageIcon, FileText, Download, MoreVertical, Trash2 } from 'lucide-react';
import { useTeam } from '../context/TeamContext';

const Files = () => {
  const { files, addFile, removeFile, currentUser } = useTeam();
  const fileInputRef = useRef(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const getIcon = (type) => {
    if (type.includes('image') || type === 'img') return <ImageIcon color="var(--warning)" size={24} />;
    if (type.includes('pdf')) return <FileText color="var(--danger)" size={24} />;
    if (type.includes('word') || type.includes('document') || type === 'doc') return <FileText color="var(--primary)" size={24} />;
    if (type.includes('sheet') || type === 'sheet') return <File color="var(--success)" size={24} />;
    return <File color="var(--text-muted)" size={24} />;
  };

  const getCategoryName = (cat) => {
    switch(cat) {
      case 'document': return '문서';
      case 'design': return '디자인';
      case 'data': return '데이터';
      default: return '기타';
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);
      
      let category = 'etc';
      if (selectedFile.type.includes('image')) category = 'design';
      else if (selectedFile.type.includes('sheet') || selectedFile.type.includes('csv')) category = 'data';
      else if (selectedFile.type.includes('document') || selectedFile.type.includes('pdf')) category = 'document';

      addFile({
        id: Date.now(),
        name: selectedFile.name,
        type: selectedFile.type,
        size: `${sizeMB} MB`,
        owner: currentUser?.name || '나',
        date: new Date().toLocaleDateString(),
        category
      });
    }
  };

  const handleDownload = (file) => {
    // 가상의 다운로드 동작 구현
    const blob = new Blob(['가상의 파일 내용입니다.'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="files-page">
      <div className="title-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">자료 통합 저장소</h1>
          <p className="page-subtitle">프로젝트와 관련된 모든 자료를 한곳에서 안전하게 관리하세요.</p>
        </div>
      </div>

      <div className="card" style={{ 
        border: '2px dashed var(--border-color)', background: 'rgba(255,255,255,0.02)', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '3rem', marginBottom: '2rem'
      }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--primary)' }}>
          <UploadCloud size={32} />
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>여기로 파일을 드래그 앤 드롭 하세요</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>또는 버튼을 클릭하여 PC에서 찾아볼 수 있습니다.</p>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileUpload} 
        />
        <button className="btn btn-primary" onClick={() => fileInputRef.current.click()}>파일 찾아보기</button>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem' }}>최근 업로드된 자료</h2>
        {files.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>아직 업로드된 파일이 없습니다.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem', fontWeight: '500', fontSize: '0.85rem' }}>파일명</th>
                <th style={{ padding: '1rem', fontWeight: '500', fontSize: '0.85rem' }}>카테고리</th>
                <th style={{ padding: '1rem', fontWeight: '500', fontSize: '0.85rem' }}>작성자</th>
                <th style={{ padding: '1rem', fontWeight: '500', fontSize: '0.85rem' }}>업로드 날짜</th>
                <th style={{ padding: '1rem', fontWeight: '500', fontSize: '0.85rem' }}>용량</th>
                <th style={{ padding: '1rem', fontWeight: '500', fontSize: '0.85rem', textAlign: 'right' }}>액션</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'var(--transition)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {getIcon(file.type || '')}
                      <span style={{ fontWeight: '500' }}>{file.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                      {getCategoryName(file.category)}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{file.owner}</td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{file.date}</td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{file.size}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', position: 'relative' }}>
                    <button onClick={() => handleDownload(file)} style={{ color: 'var(--text-muted)', padding: '0.25rem', marginRight: '0.5rem', cursor: 'pointer' }}><Download size={18} /></button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === file.id ? null : file.id); }} 
                      style={{ color: 'var(--text-muted)', padding: '0.25rem', cursor: 'pointer' }}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openMenuId === file.id && (
                      <div style={{
                        position: 'absolute', right: '1rem', top: '2.5rem',
                        background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                        borderRadius: '0.5rem', padding: '0.5rem', zIndex: 10, boxShadow: 'var(--shadow-md)'
                      }}>
                        <button onClick={() => removeFile(file.id)} style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', width: '100%', textAlign: 'left', borderRadius: '4px' }} onMouseOver={e=>e.currentTarget.style.background='rgba(239, 68, 68, 0.1)'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                          <Trash2 size={16} /> 삭제
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Files;
