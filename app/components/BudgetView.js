'use client';

export default function BudgetView() {
  return (
    <>
      <div className="card" style={{marginBottom:20}}>
        <div className="card-header">
          <div className="card-title"><span className="dot"></span> יעדי תקציב שנתי 2026</div>
          <button className="btn btn-ghost" style={{fontSize:11,padding:'4px 10px'}}>עריכה</button>
        </div>
        <div className="card-body">
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20}}>
            <div>
              <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:12,textTransform:'uppercase',letterSpacing:'.5px'}}>יעדי הכנסות שנתיים</div>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5}}>
                    <span style={{color:'var(--text-secondary)'}}>יעד שנתי</span>
                    <span style={{color:'var(--gold)',fontWeight:700}}>₪3,600,000</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5}}>
                    <span style={{color:'var(--text-secondary)'}}>בוצע עד כה (Q1)</span>
                    <span style={{color:'var(--green)',fontWeight:700}}>₪842,300 (23.4%)</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width:'23.4%',background:'linear-gradient(90deg,var(--gold-dim),var(--gold))'}}></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:12,textTransform:'uppercase',letterSpacing:'.5px'}}>יעד רווח נקי שנתי</div>
              <div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5}}>
                  <span style={{color:'var(--text-secondary)'}}>יעד שנתי</span>
                  <span style={{color:'var(--gold)',fontWeight:700}}>₪900,000</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5}}>
                  <span style={{color:'var(--text-secondary)'}}>בוצע עד כה (Q1)</span>
                  <span style={{color:'var(--green)',fontWeight:700}}>₪198,740 (22.1%)</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width:'22.1%',background:'linear-gradient(90deg,var(--green),var(--green))'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title"><span className="dot"></span> תקציב לפי קטגוריה</div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>קטגוריה</th><th>תקציב חודשי</th><th>בפועל Q1</th><th>חריגה</th><th>סטטוס</th></tr>
            </thead>
            <tbody>
              <tr>
                <td className="name">שכר עובדים</td><td>₪105,000</td><td>₪104,000</td>
                <td style={{color:'var(--green)'}}>-₪1,000</td>
                <td><span className="status-badge recurring">תקין</span></td>
              </tr>
              <tr>
                <td className="name">חשמל ואנרגיה</td><td>₪27,000</td><td>₪29,200</td>
                <td style={{color:'var(--red)'}}>+₪2,200</td>
                <td><span className="status-badge dynamic">חריגה</span></td>
              </tr>
              <tr>
                <td className="name">שכירות</td><td>₪24,000</td><td>₪24,000</td>
                <td style={{color:'var(--green)'}}>₪0</td>
                <td><span className="status-badge fixed">תקין</span></td>
              </tr>
              <tr>
                <td className="name">תחזוקה</td><td>₪18,000</td><td>₪16,067</td>
                <td style={{color:'var(--green)'}}>-₪1,933</td>
                <td><span className="status-badge recurring">תקין</span></td>
              </tr>
              <tr>
                <td className="name">שיווק</td><td>₪12,000</td><td>₪9,467</td>
                <td style={{color:'var(--green)'}}>-₪2,533</td>
                <td><span className="status-badge recurring">תקין</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
