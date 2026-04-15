'use client';
import Image from 'next/image';

export default function Sidebar({ activeView, onNavigate }) {
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
      <div className="logo">
        <Image
          src="/Multipool Logo.png"
          alt="מולטיפול"
          width={180}
          height={72}
          style={{ objectFit: 'contain', borderRadius: 6, background: '#fff', padding: '6px 8px' }}
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
        <div className="fiscal-value">Q1 2026</div>
        <div style={{marginTop:8,fontSize:11,color:'var(--text-muted)'}}>עודכן: 14 באפריל 2026</div>
      </div>
    </nav>
  );
}
