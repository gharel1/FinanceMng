'use client';
import Image from 'next/image';

function getCurrentPeriod() {
  const now = new Date();
  const q = Math.ceil((now.getMonth() + 1) / 3);
  const label = now.toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' });
  return { quarter: `Q${q} ${now.getFullYear()}`, updated: label };
}

export default function Sidebar({ activeView, onNavigate }) {
  const { quarter, updated } = getCurrentPeriod();
  const navItems = [
    { section: 'ניהול', items: [
      { id: 'dashboard', icon: '📊', label: 'לוח בקרה' },
      { id: 'pnl', icon: '📈', label: 'דוח רווח והפסד' },
      { id: 'expenses', icon: '💸', label: 'הוצאות', badge: '3' },
      { id: 'categories', icon: '🗂️', label: 'קטגוריות' },
    ]},
    { section: 'כלים', items: [
      { id: 'onedrive', icon: '☁️', label: 'OneDrive / קבלות' },
      { id: 'recommendations', icon: '💡', label: 'המלצות CFO', notif: true },
      { id: 'budget', icon: '🎯', label: 'תקציב ויעדים' },
      { id: 'reports', icon: '📄', label: 'דוחות' },
    ]},
  ];

  return (
    <nav className="sidebar">
      <div className="logo" style={{ padding: '16px 20px 12px' }}>
        <Image
          src="/Multipool Logo.png"
          alt="מולטיפול"
          width={200}
          height={200}
          style={{ objectFit: 'contain', width: '100%', height: 'auto', borderRadius: 8, background: '#fff' }}
          priority
        />
        <div className="logo-sub" style={{ paddingRight: 0, marginTop: 6 }}>CFO DASHBOARD</div>
      </div>

      <div className="nav">
        {navItems.map(section => (
          <div className="nav-section" key={section.section}>
            <div className="nav-section-label">{section.section}</div>
            {section.items.map(item => (
              <div
                key={item.id}
                className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
                {item.notif && (
                  <div style={{
                    position:'relative',top:'auto',left:'auto',
                    display:'inline-block',width:7,height:7,
                    background:'var(--amber)',borderRadius:'50%',marginRight:'auto'
                  }}></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="fiscal-period">רבעון נוכחי</div>
        <div className="fiscal-value">{quarter}</div>
        <div style={{marginTop:8,fontSize:11,color:'var(--text-muted)'}}>עודכן: {updated}</div>
      </div>
    </nav>
  );
}
