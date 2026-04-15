// ═══════════════════════════════════
// FINANCIAL DATA
// ═══════════════════════════════════

export const initialExpenses = [
  { id:1, desc:'שכר עובדים — אפריל',  vendor:'שכר פנימי',    cat:'שכר עובדים',       type:'fixed',   freq:'recurring', amount:-104000, date:'01/04/2026', receipt:true  },
  { id:2, desc:'חשמל — בריכות',       vendor:'חברת החשמל',   cat:'חשמל ואנרגיה',      type:'fixed',   freq:'recurring', amount:-14200,  date:'10/04/2026', receipt:true  },
  { id:3, desc:'שכירות מתחם',         vendor:'נדל"ן מרכזי',  cat:'שכירות',            type:'fixed',   freq:'recurring', amount:-24000,  date:'01/04/2026', receipt:true  },
  { id:4, desc:'כלור וכימיקלים',      vendor:'כימיקלים בע"מ',cat:'כימיקלים וחומרים', type:'dynamic', freq:'recurring', amount:-3850,   date:'08/04/2026', receipt:false },
  { id:5, desc:'תחזוקת ציוד',         vendor:'טכנאי חיצוני', cat:'תחזוקה ותיקונים',  type:'dynamic', freq:'onetime',   amount:-7300,   date:'28/03/2026', receipt:true  },
  { id:6, desc:'גוגל אדס — מרץ',      vendor:'Google',       cat:'שיווק ופרסום',     type:'dynamic', freq:'recurring', amount:-3200,   date:'31/03/2026', receipt:false },
  { id:7, desc:'ביטוח מבנה',          vendor:'מגדל ביטוח',   cat:'ביטוח',             type:'fixed',   freq:'recurring', amount:-8000,   date:'01/03/2026', receipt:true  },
  { id:8, desc:'מנויים — מרץ',        vendor:'לקוחות',       cat:'הכנסות',            type:'fixed',   freq:'recurring', amount:+92400,  date:'01/03/2026', receipt:true  },
];

export const initialCategories = [
  { name:'שכר עובדים',       icon:'👥', type:'fixed',   freq:'recurring', color:'#3b82f6', total:312000, budget:315000 },
  { name:'חשמל ואנרגיה',    icon:'⚡', type:'fixed',   freq:'recurring', color:'#fbbf24', total:87600,  budget:81000  },
  { name:'שכירות',           icon:'🏢', type:'fixed',   freq:'recurring', color:'#a78bfa', total:72000,  budget:72000  },
  { name:'תחזוקה ותיקונים', icon:'🔧', type:'dynamic', freq:'recurring', color:'#2dd4bf', total:48200,  budget:54000  },
  { name:'כימיקלים',         icon:'🧪', type:'dynamic', freq:'recurring', color:'#34d399', total:34800,  budget:36000  },
  { name:'שיווק ופרסום',    icon:'📢', type:'dynamic', freq:'recurring', color:'#f472b6', total:28400,  budget:36000  },
  { name:'ביטוח',            icon:'🔐', type:'fixed',   freq:'recurring', color:'#c9a84c', total:24000,  budget:24000  },
  { name:'ציוד חד-פעמי',   icon:'🛒', type:'dynamic', freq:'onetime',   color:'#fb923c', total:11560,  budget:20000  },
];

export const initialPdfs = [
  { name:'חשמל_ינואר_2026.pdf',   date:'10/01/2026', amount:'₪14,320', status:'processed' },
  { name:'שכירות_Q1_2026.pdf',    date:'01/01/2026', amount:'₪24,000', status:'processed' },
  { name:'ביטוח_שנתי.pdf',        date:'15/01/2026', amount:'₪32,000', status:'processed' },
  { name:'כימיקלים_ינואר.pdf',    date:'12/01/2026', amount:'₪3,200',  status:'processed' },
  { name:'תחזוקה_015.pdf',        date:'22/02/2026', amount:'₪7,300',  status:'pending'   },
  { name:'גוגל_אדס_פבר.pdf',      date:'28/02/2026', amount:'₪3,200',  status:'pending'   },
  { name:'חשמל_פבר_2026.pdf',     date:'10/02/2026', amount:'₪13,850', status:'processed' },
  { name:'ספק_כלים_2026.pdf',     date:'05/03/2026', amount:'₪4,100',  status:'pending'   },
];

export const pageTitles = {
  dashboard:       'לוח בקרה',
  pnl:             'דוח רווח והפסד',
  expenses:        'ניהול הוצאות',
  categories:      'קטגוריות הוצאות',
  onedrive:        'OneDrive — קבלות',
  recommendations: 'המלצות CFO',
  budget:          'תקציב ויעדים',
  reports:         'דוחות',
};

export const chartData = {
  revenueLabels: ['ינואר', 'פברואר', 'מרץ'],
  revenueData: [265000, 287000, 290300],
  expenseData: [218000, 211000, 214560],
  
  categoryLabels: ['שכר', 'חשמל', 'שכירות', 'תחזוקה', 'כימיקלים', 'שיווק', 'אחר'],
  categoryData: [312000, 87600, 72000, 48200, 34800, 28400, 60560],
  categoryColors: ['#3b82f6','#fbbf24','#a78bfa','#2dd4bf','#34d399','#f472b6','#64748b'],

  pnlMonths: ['מאי 25','יוני 25','יולי 25','אוג 25','ספט 25','אוק 25','נוב 25','דצמ 25','ינו 26','פבר 26','מרץ 26','אפר 26'],
  pnlRevenue: [290,320,410,430,310,270,255,260,265,287,290,295].map(v=>v*1000),
  pnlExpenses: [230,255,320,340,248,210,205,210,218,211,214,220].map(v=>v*1000),
};
