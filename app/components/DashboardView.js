'use client';

import { RevenueChart, CategoryChart } from './Charts';

export default function DashboardView({ onNavigate }) {
  return (
    <>
      {/* KPIs */}
      <div className="kpi-grid">
        <div className="kpi-card gold">
          <div className="kpi-label">הכנסות רבעוניות</div>
          <div className="kpi-value"><span className="currency">₪</span>842,300</div>
          <div className="kpi-delta up">▲ 12.4%</div>
          <div className="kpi-icon">💰</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-label">רווח נקי</div>
          <div className="kpi-value"><span className="currency">₪</span>198,740</div>
          <div className="kpi-delta up">▲ 8.1%</div>
          <div className="kpi-icon">📈</div>
        </div>
        <div className="kpi-card red">
          <div className="kpi-label">סך הוצאות</div>
          <div className="kpi-value"><span className="currency">₪</span>643,560</div>
          <div className="kpi-delta down">▲ 3.2%</div>
          <div className="kpi-icon">💸</div>
        </div>
        <div className="kpi-card blue">
          <div className="kpi-label">מרווח תפעולי</div>
          <div className="kpi-value">23.6<span className="currency">%</span></div>
          <div className="kpi-delta up">▲ 1.8pp</div>
          <div className="kpi-icon">🎯</div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="dot"></span> מגמת הכנסות והוצאות</div>
            <div style={{fontSize:11,color:'var(--text-muted)'}}>ינואר — מרץ 2026</div>
          </div>
          <div className="card-body">
            <div className="chart-wrap">
              <RevenueChart />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="dot"></span> הוצאות לפי קטגוריה</div>
          </div>
          <div className="card-body">
            <div className="chart-wrap">
              <CategoryChart />
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
            <table>
              <thead>
                <tr>
                  <th>תיאור</th>
                  <th>קטגוריה</th>
                  <th>סכום</th>
                  <th>תאריך</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="name">חשמל — בריכות</td>
                  <td><span className="status-badge fixed">קבוע</span></td>
                  <td className="amount-neg">-₪14,200</td>
                  <td>10 אפריל</td>
                </tr>
                <tr>
                  <td className="name">כלור וכימיקלים</td>
                  <td><span className="status-badge dynamic">משתנה</span></td>
                  <td className="amount-neg">-₪3,850</td>
                  <td>8 אפריל</td>
                </tr>
                <tr>
                  <td className="name">שכר עובדים</td>
                  <td><span className="status-badge fixed">קבוע</span></td>
                  <td className="amount-neg">-₪68,000</td>
                  <td>1 אפריל</td>
                </tr>
                <tr>
                  <td className="name">הכנסות מנויים</td>
                  <td><span className="status-badge recurring">חוזר</span></td>
                  <td className="amount-pos">+₪92,400</td>
                  <td>1 אפריל</td>
                </tr>
                <tr>
                  <td className="name">תחזוקת ציוד</td>
                  <td><span className="status-badge dynamic">משתנה</span></td>
                  <td className="amount-neg">-₪7,300</td>
                  <td>28 מרץ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="dot"></span> ביצוע מול תקציב</div>
          </div>
          <div className="card-body">
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {[
                { label: 'שכר עובדים', pct: 82, color: 'var(--green)', over: false },
                { label: 'חשמל ואנרגיה', pct: 108, color: 'var(--red)', over: true },
                { label: 'שיווק ופרסום', pct: 61, color: null, over: false },
                { label: 'תחזוקה', pct: 45, color: null, over: false },
                { label: 'כימיקלים וחומרים', pct: 73, color: null, over: false },
              ].map((item, i) => (
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
                        : item.color 
                          ? `linear-gradient(90deg,${item.color},${item.color})`
                          : undefined
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
