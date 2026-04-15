'use client';

export default function CategoriesView({ categories, onDeleteCategory, onOpenCategoryModal }) {
  return (
    <>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <div style={{fontSize:13,color:'var(--text-secondary)'}}>ניהול קטגוריות הוצאות — הגדר קבועות ומשתנות, חוזרות וחד-פעמיות</div>
        <button className="btn btn-primary" onClick={onOpenCategoryModal}>+ קטגוריה חדשה</button>
      </div>

      <div style={{display:'flex',gap:12,marginBottom:16}}>
        <div style={{flex:1,background:'var(--surface-1)',border:'1px solid var(--border)',borderRadius:10,padding:'14px 18px',display:'flex',alignItems:'center',gap:12}}>
          <div style={{fontSize:24}}>🔒</div>
          <div>
            <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:2,textTransform:'uppercase',letterSpacing:'.5px'}}>קטגוריות קבועות</div>
            <div style={{fontSize:20,fontWeight:800,color:'var(--blue)'}}>6 קטגוריות</div>
            <div style={{fontSize:11,color:'var(--text-muted)',marginTop:2}}>₪493,600 / חודש</div>
          </div>
        </div>
        <div style={{flex:1,background:'var(--surface-1)',border:'1px solid var(--border)',borderRadius:10,padding:'14px 18px',display:'flex',alignItems:'center',gap:12}}>
          <div style={{fontSize:24}}>🔄</div>
          <div>
            <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:2,textTransform:'uppercase',letterSpacing:'.5px'}}>קטגוריות משתנות</div>
            <div style={{fontSize:20,fontWeight:800,color:'var(--gold)'}}>5 קטגוריות</div>
            <div style={{fontSize:11,color:'var(--text-muted)',marginTop:2}}>₪149,960 ממוצע / חודש</div>
          </div>
        </div>
      </div>

      <div className="cat-grid">
        {categories.map((c, i) => {
          const pct = Math.min(100, Math.round(c.total / c.budget * 100));
          const overBudget = c.total > c.budget;
          return (
            <div className="cat-card" key={i}>
              <div className="cat-card-head">
                <div className="cat-icon" style={{background:`${c.color}22`,color:c.color,fontSize:20}}>{c.icon}</div>
                <div className="cat-actions">
                  <div className="cat-action">✏️</div>
                  <div className="cat-action" onClick={() => onDeleteCategory(i)}>🗑</div>
                </div>
              </div>
              <div className="cat-name">{c.name}</div>
              <div className="cat-meta">
                <span className={`status-badge ${c.type === 'fixed' ? 'fixed' : 'dynamic'}`}>{c.type === 'fixed' ? 'קבוע' : 'משתנה'}</span>
                <span className={`status-badge ${c.freq === 'recurring' ? 'recurring' : 'onetime'}`}>{c.freq === 'recurring' ? 'חוזר' : 'חד-פעמי'}</span>
              </div>
              <div className="cat-total">₪{c.total.toLocaleString()} <span className="currency">/ תקציב ₪{c.budget.toLocaleString()}</span></div>
              <div className="cat-bar">
                <div className="cat-bar-fill" style={{width:`${pct}%`,background: overBudget ? 'var(--red)' : c.color}}></div>
              </div>
              <div style={{fontSize:11,color: overBudget ? 'var(--red)' : 'var(--text-muted)',marginTop:4}}>
                {pct}% מהתקציב{overBudget ? ' — חריגה!' : ''}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
