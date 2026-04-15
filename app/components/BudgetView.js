'use client';

function fmt(n) {
  return Math.abs(n).toLocaleString('he-IL');
}

export default function BudgetView({ categories = [], expenses = [] }) {
  // Compute actual spend per category from expenses
  const actualByCategory = expenses
    .filter(e => e.amount < 0)
    .reduce((acc, e) => {
      acc[e.cat] = (acc[e.cat] || 0) + Math.abs(e.amount);
      return acc;
    }, {});

  const totalIncome = expenses.filter(e => e.amount > 0).reduce((s, e) => s + e.amount, 0);

  const categoriesWithActual = categories.map(c => ({
    ...c,
    actual: actualByCategory[c.name] || 0,
    deviation: (actualByCategory[c.name] || 0) - c.budget,
  }));

  const isEmpty = categories.length === 0;

  return (
    <>
      <div className="card" style={{marginBottom:20}}>
        <div className="card-header">
          <div className="card-title"><span className="dot"></span> סיכום תקציבי</div>
        </div>
        <div className="card-body">
          {isEmpty ? (
            <div style={{padding:'24px',textAlign:'center',color:'var(--text-muted)',fontSize:13}}>
              עדיין אין קטגוריות מוגדרות — הוסף קטגוריות בלשונית הקטגוריות
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20}}>
              <div>
                <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:12,textTransform:'uppercase',letterSpacing:'.5px'}}>סך תקציב מוגדר</div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}>
                    <span style={{color:'var(--text-secondary)'}}>תקציב הוצאות כולל</span>
                    <span style={{color:'var(--gold)',fontWeight:700}}>₪{fmt(categories.reduce((s,c)=>s+c.budget,0))}</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}>
                    <span style={{color:'var(--text-secondary)'}}>בפועל עד כה</span>
                    <span style={{color:'var(--green)',fontWeight:700}}>₪{fmt(Object.values(actualByCategory).reduce((s,v)=>s+v,0))}</span>
                  </div>
                </div>
              </div>
              <div>
                <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:12,textTransform:'uppercase',letterSpacing:'.5px'}}>הכנסות בפועל</div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}>
                  <span style={{color:'var(--text-secondary)'}}>סך הכנסות מוזנות</span>
                  <span style={{color:'var(--green)',fontWeight:700}}>₪{fmt(totalIncome)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title"><span className="dot"></span> תקציב לפי קטגוריה</div>
        </div>
        <div className="table-wrap">
          {isEmpty ? (
            <div style={{padding:'24px',textAlign:'center',color:'var(--text-muted)',fontSize:13}}>אין קטגוריות</div>
          ) : (
            <table>
              <thead>
                <tr><th>קטגוריה</th><th>תקציב</th><th>בפועל</th><th>חריגה</th><th>סטטוס</th></tr>
              </thead>
              <tbody>
                {categoriesWithActual.map((c, i) => (
                  <tr key={i}>
                    <td className="name">{c.icon} {c.name}</td>
                    <td>₪{fmt(c.budget)}</td>
                    <td>₪{fmt(c.actual)}</td>
                    <td style={{color: c.deviation > 0 ? 'var(--red)' : 'var(--green)'}}>
                      {c.deviation > 0 ? '+' : ''}₪{fmt(c.deviation)}
                    </td>
                    <td>
                      <span className={`status-badge ${c.deviation > 0 ? 'dynamic' : 'recurring'}`}>
                        {c.deviation > 0 ? 'חריגה' : 'תקין'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
