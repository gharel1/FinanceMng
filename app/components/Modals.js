'use client';

import { useState } from 'react';

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


const MONTHS = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];

export function ImportModal({ isOpen, onClose, onImport }) {
  const now = new Date();
  const [month, setMonth]   = useState(now.getMonth());
  const [year, setYear]     = useState(now.getFullYear());
  const [total, setTotal]   = useState('');
  const [taxable, setTaxable] = useState('');
  const [vat, setVat]       = useState('');
  const [notes, setNotes]   = useState('');
  const [saving, setSaving] = useState(false);
  const [done, setDone]     = useState(false);

  const reset = () => { setTotal(''); setTaxable(''); setVat(''); setNotes(''); setSaving(false); setDone(false); };
  const handleClose = () => { reset(); onClose(); };

  const handleSave = async () => {
    if (!total) { alert('אנא הזן סכום הכנסות'); return; }
    setSaving(true);
    try {
      const m = parseInt(month);
      const y = parseInt(year);
      const lastDay = new Date(y, m + 1, 0).getDate();
      const dateStr = `${String(lastDay).padStart(2,'0')}/${String(m + 1).padStart(2,'0')}/${y}`;
      const row = {
        desc:    `הכנסות ${MONTHS[m]} ${y}`,
        vendor:  'מולטיפול ברקאי',
        cat:     'הכנסות חודשיות',
        type:    'fixed',
        freq:    'recurring',
        amount:  parseFloat(total.toString().replace(/[₪,]/g, '')),
        date:    dateStr,
        receipt: false,
        notes:   [
          taxable ? `חייב במע"מ: ₪${parseFloat(taxable).toLocaleString()}` : '',
          vat     ? `מע"מ: ₪${parseFloat(vat).toLocaleString()}` : '',
          notes,
        ].filter(Boolean).join(' | '),
      };
      await onImport([row]);
      setDone(true);
    } catch(e) {
      alert('שגיאה בשמירה: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className="modal" style={{maxWidth:460}}>
        <div className="modal-header">
          <div className="modal-title">הכנסות חודשיות</div>
          <button className="modal-close" onClick={handleClose}>✕</button>
        </div>

        <div className="modal-body">
          {done ? (
            <div style={{textAlign:'center',padding:'24px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
              <div style={{fontSize:40}}>✅</div>
              <div style={{fontSize:15,fontWeight:700,color:'var(--text-primary)'}}>ההכנסות נשמרו בהצלחה</div>
              <div style={{fontSize:13,color:'var(--text-muted)'}}>
                {MONTHS[month]} {year} — ₪{parseFloat(total).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="form-grid">
              <div className="form-row">
                <div className="field">
                  <label>חודש</label>
                  <select value={month} onChange={e => setMonth(e.target.value)}>
                    {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>שנה</label>
                  <select value={year} onChange={e => setYear(e.target.value)}>
                    {[2024,2025,2026,2027].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label>סה"כ הכנסות כולל מע"מ (₪)</label>
                <input type="number" placeholder="0.00" value={total} onChange={e => setTotal(e.target.value)} autoFocus />
              </div>
              <div className="form-row">
                <div className="field">
                  <label>הכנסות חייבות (ללא מע"מ)</label>
                  <input type="number" placeholder="אופציונלי" value={taxable} onChange={e => setTaxable(e.target.value)} />
                </div>
                <div className="field">
                  <label>מע"מ</label>
                  <input type="number" placeholder="אופציונלי" value={vat} onChange={e => setVat(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label>הערות</label>
                <textarea placeholder="הערות נוספות..." value={notes} onChange={e => setNotes(e.target.value)} />
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {done ? (
            <button className="btn btn-primary" style={{flex:1,justifyContent:'center'}} onClick={handleClose}>סגור</button>
          ) : (
            <>
              <button className="btn btn-primary" style={{flex:1,justifyContent:'center'}} onClick={handleSave} disabled={saving}>
                {saving ? 'שומר...' : 'שמור הכנסות'}
              </button>
              <button className="btn btn-ghost" onClick={handleClose}>ביטול</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
