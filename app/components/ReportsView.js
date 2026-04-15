'use client';

export default function ReportsView() {
  const reports = [
    { icon: '📊', title: 'דוח רווח והפסד', sub: 'ייצוא PDF / Excel' },
    { icon: '💸', title: 'דוח הוצאות מפורט', sub: 'לפי קטגוריה ותקופה' },
    { icon: '📅', title: 'דוח תזרים מזומנים', sub: 'חודשי / רבעוני' },
    { icon: '🧾', title: 'דוח לרואה חשבון', sub: 'פורמט מוכן להגשה' },
    { icon: '📈', title: 'דוח מול תקציב', sub: 'ביצוע vs. תכנון' },
    { icon: '🎯', title: 'דוח KPI ביצועים', sub: 'מדדי מפתח עסקיים' },
  ];

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
      {reports.map((r, i) => (
        <div key={i} className="card" style={{cursor:'pointer'}} onClick={() => alert('מייצא דוח...')}>
          <div className="card-body" style={{textAlign:'center',padding:'28px 20px'}}>
            <div style={{fontSize:36,marginBottom:10}}>{r.icon}</div>
            <div style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',marginBottom:4}}>{r.title}</div>
            <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:12}}>{r.sub}</div>
            <button className="btn btn-ghost" style={{width:'100%',justifyContent:'center'}}>הורד דוח</button>
          </div>
        </div>
      ))}
    </div>
  );
}
