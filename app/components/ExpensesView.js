'use client';

import { useState } from 'react';

export default function ExpensesView({ expenses, onDeleteExpense }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = expenses.filter(e => {
    const matchesSearch = !searchQuery || 
      e.desc.includes(searchQuery) || 
      e.vendor.includes(searchQuery) || 
      e.cat.includes(searchQuery);
    const matchesType = activeFilter === 'all' || 
      e.type === activeFilter || 
      e.freq === activeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <div className="filter-bar">
        <div className="search-box">
          <span style={{color:'var(--text-muted)',fontSize:14}}>🔍</span>
          <input 
            type="text" 
            placeholder="חפש הוצאה..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        {[
          { id: 'all', label: 'הכל' },
          { id: 'fixed', label: 'קבוע' },
          { id: 'dynamic', label: 'משתנה' },
          { id: 'recurring', label: 'חוזר' },
          { id: 'onetime', label: 'חד-פעמי' },
        ].map(f => (
          <button
            key={f.id}
            className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title"><span className="dot"></span> כל ההוצאות</div>
          <div style={{fontSize:12,color:'var(--text-muted)'}}>מציג {filtered.length} רשומות</div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>תיאור</th>
                <th>ספק</th>
                <th>קטגוריה</th>
                <th>סוג</th>
                <th>תדירות</th>
                <th>סכום</th>
                <th>תאריך</th>
                <th>קבלה</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.id}>
                  <td className="name">{e.desc}</td>
                  <td>{e.vendor}</td>
                  <td><span className={`status-badge ${e.type === 'fixed' ? 'fixed' : 'dynamic'}`}>{e.cat}</span></td>
                  <td><span className={`status-badge ${e.type === 'fixed' ? 'fixed' : 'dynamic'}`}>{e.type === 'fixed' ? 'קבוע' : 'משתנה'}</span></td>
                  <td><span className={`status-badge ${e.freq === 'recurring' ? 'recurring' : 'onetime'}`}>{e.freq === 'recurring' ? 'חוזר' : 'חד-פעמי'}</span></td>
                  <td className={e.amount > 0 ? 'amount-pos' : 'amount-neg'}>
                    {e.amount > 0 ? '+' : ''}₪{Math.abs(e.amount).toLocaleString()}
                  </td>
                  <td>{e.date}</td>
                  <td>
                    {e.receipt 
                      ? <span style={{color:'var(--green)',fontSize:16}}>✓</span>
                      : <span style={{color:'var(--text-muted)'}}>—</span>
                    }
                  </td>
                  <td>
                    <button className="cat-action" onClick={() => onDeleteExpense(e.id)} title="מחק">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
