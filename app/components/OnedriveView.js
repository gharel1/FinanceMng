'use client';

import { useRef } from 'react';

export default function OnedriveView({ pdfs, onAddPdfs }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPdfs = files.map(f => ({
      name: f.name,
      date: new Date().toLocaleDateString('he-IL'),
      amount: '—',
      status: 'pending',
    }));
    onAddPdfs(newPdfs);
    alert(`${files.length} קבצים הועלו בהצלחה ומחכים לעיבוד`);
  };

  return (
    <>
      <div className="onedrive-panel">
        <div className="onedrive-header">
          <div className="onedrive-logo">☁️</div>
          <div className="onedrive-info">
            <div className="onedrive-title">OneDrive — תיקיית קבלות</div>
            <div className="onedrive-status">מחובר · /Multipool/Receipts/2026</div>
          </div>
          <button className="btn btn-ghost">⚙ הגדרות חיבור</button>
          <button className="btn btn-primary">🔄 סנכרן עכשיו</button>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:16}}>
          <div style={{background:'var(--surface-2)',borderRadius:8,padding:12,textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:800,color:'var(--gold)'}}>47</div>
            <div style={{fontSize:11,color:'var(--text-muted)'}}>קבצי PDF</div>
          </div>
          <div style={{background:'var(--surface-2)',borderRadius:8,padding:12,textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:800,color:'var(--green)'}}>41</div>
            <div style={{fontSize:11,color:'var(--text-muted)'}}>עובדו בהצלחה</div>
          </div>
          <div style={{background:'var(--surface-2)',borderRadius:8,padding:12,textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:800,color:'var(--amber)'}}>6</div>
            <div style={{fontSize:11,color:'var(--text-muted)'}}>ממתינים לאישור</div>
          </div>
        </div>

        <div className="pdf-grid">
          {pdfs.map((p, i) => (
            <div key={i} className="pdf-item" onClick={() => alert(`פותח: ${p.name}`)}>
              <div className="pdf-icon">📄</div>
              <div className="pdf-name">{p.name}</div>
              <div className="pdf-date">{p.date}</div>
              <div className="pdf-amount">{p.amount}</div>
              <div style={{fontSize:10,marginTop:4,color: p.status === 'processed' ? 'var(--green)' : 'var(--amber)'}}>
                {p.status === 'processed' ? '✓ עובד' : '⏳ ממתין'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf"
          multiple
          style={{display:'none'}}
          onChange={handleFileUpload}
        />
        <div className="upload-icon">📤</div>
        <div className="upload-title">העלה קבלות ידנית</div>
        <div className="upload-sub">גרור קבצי PDF לכאן, או לחץ לבחירה</div>
      </div>
    </>
  );
}
