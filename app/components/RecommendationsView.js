'use client';

export default function RecommendationsView() {
  const recommendations = [
    {
      type: 'critical',
      icon: '⚡',
      title: 'חריגה בתקציב חשמל — נדרשת פעולה מיידית',
      body: 'צריכת החשמל חרגה ב-8% מהתקציב הרבעוני. בריכות שחייה הן צרכניות אנרגיה גדולות — שקול התקנת מערכת ניהול אנרגיה חכמה ומשאבות משתנות-מהירות. חיסכון פוטנציאלי: ₪18,000–₪24,000 לשנה.',
      tag: 'פעולה מיידית',
    },
    {
      type: 'warning',
      icon: '📊',
      title: 'ריכוז הכנסות — 49% ממנויים',
      body: 'תלות גבוהה בהכנסות מנויים יוצרת סיכון תזרימי בתקופת ביטולים (קיץ, חגים). מומלץ לגוון עם חבילות שיעורים, אירועי שחייה, ולחזק את מגזר השכרת המתקנים שמהווה רק 7.7%.',
      tag: 'אסטרטגי',
    },
    {
      type: 'warning',
      icon: '👥',
      title: 'עלות שכר גבוהה — 48.5% מסך ההוצאות',
      body: 'יחס שכר להכנסות עומד על 37%, גבוה מהממוצע בענף (30-33%). בחן אפשרות לגיוס עובדים חלקיים בשעות פחות עמוסות, ואוטומציה של תהליכי קופה ורישום.',
      tag: 'אופטימיזציה',
    },
    {
      type: 'positive',
      icon: '💹',
      title: 'מרווח תפעולי משתפר — 23.6% (עלייה של 1.8pp)',
      body: 'המרווח התפעולי ממשיך לעלות ברבעון שלישי ברציפות. זוהי מגמה חיובית המשקפת שיפור ביעילות. המשך מעקב ושמור על יעד 25% עד סוף 2026.',
      tag: 'מגמה חיובית',
    },
    {
      type: 'info',
      icon: '🏊',
      title: 'הזדמנות: קורסי שחייה לבוגרים',
      body: 'קורסים ושיעורים מייצרים 16% מההכנסות עם מרווח גבוה. שקול הרחבת קורסי בוגרים ו"שיעור טבילה" — שוק שחייה למבוגרים צומח ב-18% לשנה. פוטנציאל הכנסה נוספת: ₪40,000–₪60,000 לשנה.',
      tag: 'הזדמנות',
    },
    {
      type: 'info',
      icon: '📱',
      title: 'דיגיטציה — הפחתת עלויות תפעוליות',
      body: 'העלאת קבלות ידנית גוזלת זמן ניהולי. יישום OCR אוטומטי לקריאת קבלות PDF (כגון Klippa או Veryfi) יכול לקצר עיבוד קבלות מ-15 דק\' ל-30 שניות. עלות: ~₪500/חודש. חיסכון: ~10 שעות/חודש.',
      tag: 'שיפור תפעולי',
    },
    {
      type: 'warning',
      icon: '🔐',
      title: 'ביטוח — בדוק כיסוי אחריות מקצועית',
      body: 'עלות הביטוח (₪24,000 לרבעון) נראית סבירה, אך יש לוודא שקיים כיסוי לאחריות מקצועית בהוראת שחייה ולאירועים. השווה הצעות מחיר — חיסכון אפשרי של 10-15%.',
      tag: 'ניהול סיכונים',
    },
    {
      type: 'positive',
      icon: '📅',
      title: 'תחזית Q2 2026 — עונת שיא',
      body: 'Q2-Q3 הן עונות השיא לבריכות. הכן תוכנית גיוס מוקדמת, אשר רכישות ציוד לפני עלייה בביקוש, וקדם מבצעי מנויים קיציים עד 31 במרץ. תחזית הכנסות Q2: ₪1.1M–₪1.3M.',
      tag: 'תכנון קדימה',
    },
  ];

  return (
    <>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20,padding:'16px 20px',background:'var(--surface-1)',border:'1px solid var(--border)',borderRadius:12}}>
        <div style={{fontSize:32}}>🤖</div>
        <div>
          <div style={{fontSize:14,fontWeight:700,color:'var(--text-primary)',marginBottom:2}}>ניתוח CFO — Multipool Q1 2026</div>
          <div style={{fontSize:12,color:'var(--text-secondary)'}}>על בסיס נתוני הרבעון האחרון, זיהיתי 8 תובנות עסקיות חשובות לפעולה</div>
        </div>
        <div style={{marginRight:'auto',textAlign:'center'}}>
          <div style={{fontSize:24,fontWeight:900,color:'var(--green)'}}>B+</div>
          <div style={{fontSize:10,color:'var(--text-muted)'}}>ציון בריאות פיננסית</div>
        </div>
      </div>

      <div className="rec-list">
        {recommendations.map((rec, i) => (
          <div key={i} className={`rec-item ${rec.type}`}>
            <div className="rec-icon">{rec.icon}</div>
            <div className="rec-content">
              <div className="rec-title">{rec.title}</div>
              <div className="rec-body">{rec.body}</div>
              <span className={`rec-tag ${rec.type}`}>{rec.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
