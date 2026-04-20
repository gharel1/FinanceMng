'use client';

import { useState, useRef } from 'react';

export function ExpenseModal({ isOpen, onClose, onSave }) {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [vendor, setVendor] = useState('');
  const [cat, setCat] = useState('');
  const [expType, setExpType] = useState('קבוע');
  const [expFreq, setExpFreq] = useState('חוזר');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!desc || !amount) { alert('אנא מלא תיאור וסכום'); return; }
    onSave({
      id: Date.now(), desc, vendor, cat,
      type: expType === 'קבוע' ? 'fixed' : 'dynamic',
      freq: expFreq === 'חוזר' ? 'recurring' : 'onetime',
      amount: -Math.abs(parseFloat(amount)),
      date: date || new Date().toLocaleDateString('he-IL'),
      receipt: false,
    });
    setDesc(''); setAmount(''); setDate(''); setVendor(''); setCat(''); setNotes('');
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">הוצאה חדשה</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="field">
              <label>תיאור ההוצאה</label>
              <input type="text" placeholder="לדוג׳ חשמל — בריכה ראשית" value={desc} onChange={e => setDesc(e.target.value)} />
            </div>
            <div className="form-row">
              <div className="field">
                <label>סכום (₪)</label>
                <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <div className="field">
                <label>תאריך</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>ספק</label>
                <input type="text" placeholder="שם הספק" value={vendor} onChange={e => setVendor(e.target.value)} />
              </div>
              <div className="field">
                <label>קטגוריה</label>
                <select value={cat} onChange={e => setCat(e.target.value)}>
                  <option value="">-- בחר קטגוריה --</option>
                  <option>שכר עובדים</option>
                  <option>חשמל ואנרגיה</option>
                  <option>שכירות</option>
                  <option>תחזוקה ותיקונים</option>
                  <option>כימיקלים וחומרים</option>
                  <option>שיווק ופרסום</option>
                  <option>ביטוח</option>
                  <option>הוצאות משרד</option>
                  <option>אחר</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>סוג הוצאה</label>
              <div className="toggle-group">
                {['קבוע', 'משתנה'].map(opt => (
                  <button key={opt} className={`toggle-option ${expType === opt ? 'selected' : ''}`} onClick={() => setExpType(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>תדירות</label>
              <div className="toggle-group">
                {['חוזר', 'חד-פעמי'].map(opt => (
                  <button key={opt} className={`toggle-option ${expFreq === opt ? 'selected' : ''}`} onClick={() => setExpFreq(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>הערות</label>
              <textarea placeholder="הערות נוספות..." value={notes} onChange={e => setNotes(e.target.value)}></textarea>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" style={{flex:1,justifyContent:'center'}} onClick={handleSave}>שמור הוצאה</button>
          <button className="btn btn-ghost" onClick={onClose}>ביטול</button>
        </div>
      </div>
    </div>
  );
}

export function CategoryModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [budget, setBudget] = useState('');
  const [catType, setCatType] = useState('קבוע');
  const [catFreq, setCatFreq] = useState('חוזר חודשי');
  const [selectedColor, setSelectedColor] = useState('#c9a84c');

  const colors = ['#c9a84c','#3b82f6','#34d399','#f87171','#a78bfa','#2dd4bf','#fb923c'];

  const handleSave = () => {
    if (!name) { alert('אנא הזן שם קטגוריה'); return; }
    onSave({
      name,
      icon: icon || '📦',
      type: catType === 'קבוע' ? 'fixed' : 'dynamic',
      freq: catFreq.includes('חוזר') ? 'recurring' : 'onetime',
      color: selectedColor,
      total: 0,
      budget: parseFloat(budget) || 0,
    });
    setName(''); setIcon(''); setBudget('');
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">קטגוריה חדשה</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="field">
              <label>שם הקטגוריה</label>
              <input type="text" placeholder="לדוג׳ כימיקלים וחומרים" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-row">
              <div className="field">
                <label>אייקון</label>
                <input type="text" placeholder="🧪" maxLength={2} value={icon} onChange={e => setIcon(e.target.value)} />
              </div>
              <div className="field">
                <label>תקציב חודשי (₪)</label>
                <input type="number" placeholder="0" value={budget} onChange={e => setBudget(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label>סוג</label>
              <div className="toggle-group">
                {['קבוע', 'משתנה'].map(opt => (
                  <button key={opt} className={`toggle-option ${catType === opt ? 'selected' : ''}`} onClick={() => setCatType(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>תדירות</label>
              <div className="toggle-group">
                {['חוזר חודשי', 'חד-פעמי', 'עונתי'].map(opt => (
                  <button key={opt} className={`toggle-option ${catFreq === opt ? 'selected' : ''}`} onClick={() => setCatFreq(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>צבע</label>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {colors.map(c => (
                  <div
                    key={c}
                    style={{
                      width:28,height:28,borderRadius:6,background:c,cursor:'pointer',
                      border: selectedColor === c ? '2px solid white' : '2px solid transparent'
                    }}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" style={{flex:1,justifyContent:'center'}} onClick={handleSave}>צור קטגוריה</button>
          <button className="btn btn-ghost" onClick={onClose}>ביטול</button>
        </div>
      </div>
    </div>
  );
}


const INCOME_COLS = {
  date:   ['תאריך', 'date', 'Date', 'DATE'],
  desc:   ['תיאור', 'פירוט', 'description', 'Description', 'desc'],
  amount: ['סכום', 'הכנסה', 'amount', 'Amount', 'credit', 'Credit'],
  source: ['לקוח', 'מקור', 'source', 'vendor', 'Vendor'],
  cat:    ['קטגוריה', 'category', 'Category'],
};

function findCol(headers, keys) {
  for (const k of keys) {
    const idx = headers.findIndex(h => h?.toString().trim() === k);
    if (idx !== -1) return idx;
  }
  return -1;
}

export function ImportModal({ isOpen, onClose, onImport }) {
  const [step, setStep]       = useState('upload');   // upload | preview | done
  const [rows, setRows]       = useState([]);
  const [error, setError]     = useState('');
  const [saving, setSaving]   = useState(false);
  const fileRef               = useRef(null);

  const reset = () => { setStep('upload'); setRows([]); setError(''); setSaving(false); };
  const handleClose = () => { reset(); onClose(); };

  const parseFile = async (file) => {
    setError('');
    try {
      const XLSX = (await import('xlsx')).default;
      const buf  = await file.arrayBuffer();
      const wb   = XLSX.read(buf, { type: 'array', cellDates: true });
      const ws   = wb.Sheets[wb.SheetNames[0]];
      const raw  = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

      if (raw.length < 2) { setError('הקובץ ריק או לא מכיל נתונים'); return; }

      const headers = raw[0].map(h => h?.toString().trim());
      const dateIdx   = findCol(headers, INCOME_COLS.date);
      const descIdx   = findCol(headers, INCOME_COLS.desc);
      const amountIdx = findCol(headers, INCOME_COLS.amount);
      const sourceIdx = findCol(headers, INCOME_COLS.source);
      const catIdx    = findCol(headers, INCOME_COLS.cat);

      if (amountIdx === -1) { setError('לא נמצאה עמודת סכום. ודא שיש עמודה בשם: סכום / amount / credit'); return; }

      const parsed = raw.slice(1)
        .filter(r => r[amountIdx] !== '' && r[amountIdx] !== null)
        .map(r => {
          const rawAmt = parseFloat(r[amountIdx]?.toString().replace(/[₪,]/g, '')) || 0;
          if (rawAmt <= 0) return null;

          // Format date
          let dateStr = '';
          if (dateIdx !== -1 && r[dateIdx]) {
            const d = r[dateIdx];
            if (d instanceof Date) {
              dateStr = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
            } else {
              dateStr = d.toString().trim();
            }
          }

          return {
            desc:    descIdx   !== -1 ? r[descIdx]?.toString().trim()   : 'הכנסה מדוח',
            vendor:  sourceIdx !== -1 ? r[sourceIdx]?.toString().trim() : '',
            cat:     catIdx    !== -1 ? r[catIdx]?.toString().trim()    : 'הכנסות',
            amount:  rawAmt,
            date:    dateStr || new Date().toLocaleDateString('he-IL'),
            type:    'fixed',
            freq:    'recurring',
            receipt: false,
          };
        })
        .filter(Boolean);

      if (parsed.length === 0) { setError('לא נמצאו שורות הכנסה תקינות (סכום חיובי)'); return; }
      setRows(parsed);
      setStep('preview');
    } catch (e) {
      setError('שגיאה בקריאת הקובץ: ' + e.message);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onImport(rows);
      setStep('done');
    } catch(e) {
      setError('שגיאה בשמירה: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className="modal" style={{maxWidth: step === 'preview' ? 680 : 480}}>
        <div className="modal-header">
          <div className="modal-title">ייבוא דוח הכנסות חודשי</div>
          <button className="modal-close" onClick={handleClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* ── STEP: UPLOAD ── */}
          {step === 'upload' && (
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div style={{fontSize:13,color:'var(--text-secondary)',lineHeight:1.6}}>
                העלה קובץ Excel או CSV של הדוח החודשי. הקובץ צריך לכלול עמודות של:
                <strong style={{color:'var(--text-primary)'}}> תאריך, תיאור, סכום</strong> (ואופציונלית: מקור, קטגוריה).
              </div>

              <div
                style={{
                  border:'2px dashed var(--border-light)',borderRadius:12,padding:'32px 20px',
                  textAlign:'center',cursor:'pointer',color:'var(--text-muted)',fontSize:13,
                  transition:'border-color .15s'
                }}
                onClick={() => fileRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) parseFile(f); }}
              >
                <div style={{fontSize:36,marginBottom:8}}>📊</div>
                <div style={{color:'var(--text-secondary)',fontWeight:600}}>גרור קובץ לכאן או לחץ לבחירה</div>
                <div style={{marginTop:4}}>Excel (.xlsx, .xls) או CSV</div>
                <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" style={{display:'none'}}
                  onChange={e => { const f = e.target.files[0]; if (f) parseFile(f); }} />
              </div>

              {error && (
                <div style={{background:'var(--red-dim)',border:'1px solid var(--red)',borderRadius:8,padding:'10px 14px',fontSize:13,color:'var(--red)'}}>
                  {error}
                </div>
              )}
            </div>
          )}

          {/* ── STEP: PREVIEW ── */}
          {step === 'preview' && (
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              <div style={{fontSize:13,color:'var(--text-secondary)'}}>
                נמצאו <strong style={{color:'var(--green)'}}>{rows.length} שורות הכנסה</strong> — בדוק ואשר לפני שמירה:
              </div>
              <div style={{maxHeight:340,overflowY:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
                  <thead>
                    <tr style={{borderBottom:'1px solid var(--border)'}}>
                      {['תאריך','תיאור','מקור','קטגוריה','סכום'].map(h => (
                        <th key={h} style={{padding:'6px 10px',color:'var(--text-muted)',fontWeight:600,textAlign:'right'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                        <td style={{padding:'6px 10px',color:'var(--text-secondary)'}}>{r.date}</td>
                        <td style={{padding:'6px 10px',color:'var(--text-primary)'}}>{r.desc}</td>
                        <td style={{padding:'6px 10px',color:'var(--text-secondary)'}}>{r.vendor}</td>
                        <td style={{padding:'6px 10px',color:'var(--text-secondary)'}}>{r.cat}</td>
                        <td style={{padding:'6px 10px',color:'var(--green)',fontWeight:700}}>+₪{r.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {error && (
                <div style={{background:'var(--red-dim)',border:'1px solid var(--red)',borderRadius:8,padding:'10px 14px',fontSize:13,color:'var(--red)'}}>
                  {error}
                </div>
              )}
            </div>
          )}

          {/* ── STEP: DONE ── */}
          {step === 'done' && (
            <div style={{textAlign:'center',padding:'24px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
              <div style={{fontSize:40}}>✅</div>
              <div style={{fontSize:15,fontWeight:700,color:'var(--text-primary)'}}>הייבוא הושלם בהצלחה</div>
              <div style={{fontSize:13,color:'var(--text-muted)'}}>{rows.length} שורות הכנסה נשמרו</div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {step === 'upload' && (
            <button className="btn btn-ghost" style={{flex:1,justifyContent:'center'}} onClick={handleClose}>סגור</button>
          )}
          {step === 'preview' && (
            <>
              <button className="btn btn-primary" style={{flex:1,justifyContent:'center',opacity:saving?.6:1}} onClick={handleSave} disabled={saving}>
                {saving ? 'שומר...' : `שמור ${rows.length} שורות`}
              </button>
              <button className="btn btn-ghost" onClick={() => { setStep('upload'); setError(''); }}>חזרה</button>
            </>
          )}
          {step === 'done' && (
            <button className="btn btn-primary" style={{flex:1,justifyContent:'center'}} onClick={handleClose}>סגור</button>
          )}
        </div>
      </div>
    </div>
  );
}
