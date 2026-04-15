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

export function IncomeModal({ isOpen, onClose, onSave }) {
  const [desc, setDesc]       = useState('');
  const [amount, setAmount]   = useState('');
  const [date, setDate]       = useState('');
  const [source, setSource]   = useState('');
  const [cat, setCat]         = useState('');
  const [freq, setFreq]       = useState('חוזר');
  const [notes, setNotes]     = useState('');

  const handleSave = () => {
    if (!desc || !amount) { alert('אנא מלא תיאור וסכום'); return; }
    onSave({
      id: Date.now(), desc,
      vendor: source,
      cat,
      type: 'fixed',
      freq: freq === 'חוזר' ? 'recurring' : 'onetime',
      amount: Math.abs(parseFloat(amount)),
      date: date || new Date().toLocaleDateString('he-IL'),
      receipt: false,
    });
    setDesc(''); setAmount(''); setDate(''); setSource(''); setCat(''); setNotes('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">הכנסה חדשה</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="field">
              <label>תיאור ההכנסה</label>
              <input type="text" placeholder="לדוג׳ מנויים חודשיים — אפריל" value={desc} onChange={e => setDesc(e.target.value)} />
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
                <label>מקור</label>
                <input type="text" placeholder="לדוג׳ לקוחות / מנויים" value={source} onChange={e => setSource(e.target.value)} />
              </div>
              <div className="field">
                <label>קטגוריית הכנסה</label>
                <select value={cat} onChange={e => setCat(e.target.value)}>
                  <option value="">-- בחר קטגוריה --</option>
                  <option>מנויים חודשיים</option>
                  <option>כניסות חד-פעמיות</option>
                  <option>קורסים ושיעורים</option>
                  <option>השכרת מתקנים</option>
                  <option>קפיטריה וחנות</option>
                  <option>הכנסות</option>
                  <option>אחר</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>תדירות</label>
              <div className="toggle-group">
                {['חוזר', 'חד-פעמי'].map(opt => (
                  <button key={opt} className={`toggle-option ${freq === opt ? 'selected' : ''}`} onClick={() => setFreq(opt)}>
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
          <button className="btn btn-primary" style={{flex:1,justifyContent:'center',background:'var(--green)',borderColor:'var(--green)'}} onClick={handleSave}>שמור הכנסה</button>
          <button className="btn btn-ghost" onClick={onClose}>ביטול</button>
        </div>
      </div>
    </div>
  );
}

export function ImportModal({ isOpen, onClose }) {
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">ייבוא נתונים</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              { icon: '☁️', title: 'סנכרן מ-OneDrive', sub: 'טען קבלות PDF חדשות מהתיקייה' },
              { icon: '📊', title: 'ייבוא מ-Excel / CSV', sub: 'הוצאות ממורכאות בטבלת אקסל' },
              { icon: '🏦', title: 'ייבוא מחשבון הבנק', sub: 'OFX / QIF פורמט בנקאי' },
            ].map((item, i) => (
              <div key={i} style={{
                background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:10,
                padding:16,cursor:'pointer',display:'flex',alignItems:'center',gap:12
              }} onClick={() => alert(`מחבר ל-${item.title}...`)}>
                <div style={{fontSize:28}}>{item.icon}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'var(--text-primary)'}}>{item.title}</div>
                  <div style={{fontSize:12,color:'var(--text-muted)'}}>{item.sub}</div>
                </div>
                <div style={{marginRight:'auto',color:'var(--text-muted)'}}>←</div>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" style={{flex:1,justifyContent:'center'}} onClick={onClose}>סגור</button>
        </div>
      </div>
    </div>
  );
}
