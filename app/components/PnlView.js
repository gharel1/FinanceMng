'use client';

import { PnlChart } from './Charts';

function fmt(n) {
  return Math.abs(n).toLocaleString('he-IL');
}

export default function PnlView({ expenses = [] }) {
  // Use taxable (pre-VAT) amount for income rows when available
  const incomeNet = e => e.amount > 0 ? (e.taxable ?? e.amount) : 0;
  const income   = expenses.filter(e => e.amount > 0).reduce((s, e) => s + incomeNet(e), 0);
  const totalExp = expenses.filter(e => e.amount < 0).reduce((s, e) => s + Math.abs(e.amount), 0);
  const profit   = income - totalExp;
  const margin   = income > 0 ? ((profit / income) * 100).toFixed(1) : 0;
  const expPct   = income > 0 ? ((totalExp / income) * 100).toFixed(1) : 0;

  // Group income sources (pre-VAT)
  const incomeSources = expenses
    .filter(e => e.amount > 0)
    .reduce((acc, e) => {
      acc[e.cat] = (acc[e.cat] || 0) + incomeNet(e);
      return acc;
    }, {});

  // Group expense categories
  const expenseGroups = expenses
    .filter(e => e.amount < 0)
    .reduce((acc, e) => {
      acc[e.cat] = (acc[e.cat] || 0) + Math.abs(e.amount);
      return acc;
    }, {});

  const isEmpty = expenses.length === 0;

  return (
    <>
      <div className="pnl-summary">
        <div className="pnl-block">
          <div className="pnl-block-label">סך הכנסות</div>
          <div className="pnl-block-value neutral">₪{fmt(income)}</div>
          <div className="pnl-block-sub">סה&quot;כ תקופה</div>
        </div>
        <div className="pnl-block">
          <div className="pnl-block-label">סך הוצאות</div>
          <div className="pnl-block-value neg">₪{fmt(totalExp)}</div>
          <div className="pnl-block-sub">{expPct}% מהכנסות</div>
        </div>
        <div className="pnl-block">
          <div className="pnl-block-label">רווח נקי</div>
          <div className="pnl-block-value pos">₪{fmt(profit)}</div>
          <div className="pnl-block-sub">מרווח {margin}%</div>
        </div>
      </div>

      <div className="card" style={{marginBottom:20}}>
        <div className="card-header">
          <div className="card-title"><span className="dot"></span> גרף רווח והפסד</div>
        </div>
        <div className="card-body">
          <div className="chart-container-lg">
            {isEmpty
              ? <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'var(--text-muted)',fontSize:13}}>אין נתונים</div>
              : <PnlChart expenses={expenses} />}
          </div>
        </div>
      </div>

      <div className="pnl-breakdown">
        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="dot"></span> פירוט הכנסות</div>
          </div>
          <div className="table-wrap">
            {Object.keys(incomeSources).length === 0 ? (
              <div style={{padding:'24px',textAlign:'center',color:'var(--text-muted)',fontSize:13}}>אין הכנסות מוזנות</div>
            ) : (
              <table>
                <thead><tr><th>מקור</th><th>סכום</th><th>% מסך</th></tr></thead>
                <tbody>
                  {Object.entries(incomeSources)
                    .sort((a, b) => b[1] - a[1])
                    .map(([cat, amt]) => (
                      <tr key={cat}>
                        <td className="name">{cat}</td>
                        <td className="amount-pos">₪{fmt(amt)}</td>
                        <td>{income > 0 ? ((amt / income) * 100).toFixed(1) : 0}%</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="dot"></span> פירוט הוצאות עיקריות</div>
          </div>
          <div className="table-wrap">
            {Object.keys(expenseGroups).length === 0 ? (
              <div style={{padding:'24px',textAlign:'center',color:'var(--text-muted)',fontSize:13}}>אין הוצאות מוזנות</div>
            ) : (
              <table>
                <thead><tr><th>קטגוריה</th><th>סכום</th><th>% מסך</th></tr></thead>
                <tbody>
                  {Object.entries(expenseGroups)
                    .sort((a, b) => b[1] - a[1])
                    .map(([cat, amt]) => (
                      <tr key={cat}>
                        <td className="name">{cat}</td>
                        <td className="amount-neg">₪{fmt(amt)}</td>
                        <td>{totalExp > 0 ? ((amt / totalExp) * 100).toFixed(1) : 0}%</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
