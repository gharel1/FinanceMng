'use client';

import { RevenueChart, CategoryChart } from './Charts';

function fmt(n) {
  return Math.abs(n).toLocaleString('he-IL');
}

export default function DashboardView({ onNavigate, expenses = [], categories = [] }) {
  const income    = expenses.filter(e => e.amount > 0).reduce((s, e) => s + e.amount, 0);
  const totalExp  = expenses.filter(e => e.amount < 0).reduce((s, e) => s + Math.abs(e.amount), 0);
  const profit    = income - totalExp;
  const margin    = income > 0 ? ((profit / income) * 100).toFixed(1) : 0;

  const recent = [...expenses].slice(0, 5);

  // Budget progress: categories that have a budget set
  const budgetItems = categories
    .filter(c => c.budget > 0)
    .slice(0, 5)
    .map(c => ({
      label: c.name,
      pct: Math.round((c.total / c.budget) * 100),
      over: c.total > c.budget,
    }));

  const isEmpty = expenses.length === 0;

  return (
    <>
      {/* KPIs */}
      <div className="kpi-grid">
        <div className="kpi-card gold">
          <div className="kpi-label">הכנסות</div>
          <div className="kpi-value"><span className="currency">₪</span>{fmt(income)}</div>
          <div className="kpi-icon">💰</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-label">רווח נקי</div>
          <div className="kpi-value"><span className="currency">₪</span>{fmt(profit)}</div>
          <div className="kpi-icon">📈</div>
        </div>
        <div className="kpi-card red">
          <div className="kpi-label">סך הוצאות</div>
          <div className="kpi-value"><span className="currency">₪</span>{fmt(totalExp)}</div>
          <div className="kpi-icon">💸</div>
        </div>
        <div className="kpi-card blue">
          <div className="kpi-label">מרווח תפעולי</div>
          <div className="kpi-value">{margin}<span className="currency">%</span></div>
          <div className="kpi-icon">🎯</div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="dot"></span> מגמת הכנסות והוצאות</div>
          </div>
          <div className="card-body">
            <div className="chart-wrap">
              {isEmpty
                ? <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'var(--text-muted)',fontSize:13}}>אין נתונים</div>
                : <RevenueChart expenses={expenses} />}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="dot"></span> הוצאות לפי קטגוריה</div>
          </div>
          <div className="card-body">
            <div className="chart-wrap">
              {isEmpty
                ? <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'var(--text-muted)',fontSize:13}}>אין נתונים</div>
                : <CategoryChart expenses={expenses} />}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="bottom-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="dot"></span> הוצאות אחרונות</div>
            <button className="btn btn-ghost" style={{fontSize:11,padding:'4px 10px'}} onClick={() => onNavigate('expenses')}>הכל</button>
          </div>
          <div className="table-wrap">
            {isEmpty ? (
              <div style={{padding:'24px',textAlign:'center',color:'var(--text-muted)',fontSize:13}}>עדיין אין הוצאות מוזנות</div>
            ) : (
              <table>
                <thead>
                  <tr><th>תיאור</th><th>קטגוריה</th><th>סכום</th><th>תאריך</th></tr>
                </thead>
                <tbody>
                  {recent.map(e => (
                    <tr key={e.id}>
                      <td className="name">{e.desc}</td>
                      <td><span className="status-badge fixed">{e.cat}</span></td>
                      <td className={e.amount >= 0 ? 'amount-pos' : 'amount-neg'}>
                        {e.amount >= 0 ? '+' : '-'}₪{fmt(e.amount)}
                      </td>
                      <td>{e.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="dot"></span> ביצוע מול תקציב</div>
          </div>
          <div className="card-body">
            {budgetItems.length === 0 ? (
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'var(--text-muted)',fontSize:13}}>עדיין אין קטגוריות עם תקציב</div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:14}}>
                {budgetItems.map((item, i) => (
                  <div key={i}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:6}}>
                      <span style={{color:'var(--text-secondary)'}}>{item.label}</span>
                      <span style={{color: item.over ? 'var(--red)' : 'var(--text-primary)',fontWeight:700}}>
                        {item.pct}% <span style={{color:'var(--text-muted)',fontWeight:400}}>מהתקציב</span>
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{
                        width: `${Math.min(item.pct, 100)}%`,
                        background: item.over
                          ? 'linear-gradient(90deg,var(--amber),var(--red))'
                          : undefined
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
