-- ── EXPENSES ──────────────────────────────────────────────
create table if not exists expenses (
  id      bigint generated always as identity primary key,
  desc    text            not null,
  vendor  text,
  cat     text,
  type    text,
  freq    text,
  amount  numeric         not null,
  date    text,
  receipt boolean         default false
);

-- ── CATEGORIES ────────────────────────────────────────────
create table if not exists categories (
  id      bigint generated always as identity primary key,
  name    text            not null,
  icon    text,
  type    text,
  freq    text,
  color   text,
  total   numeric         default 0,
  budget  numeric         default 0
);

-- ── RECEIPTS ──────────────────────────────────────────────
create table if not exists receipts (
  id      bigint generated always as identity primary key,
  name    text            not null,
  date    text,
  amount  text,
  status  text            default 'pending'
);

-- ── SEED: EXPENSES ────────────────────────────────────────
insert into expenses (desc, vendor, cat, type, freq, amount, date, receipt) values
  ('שכר עובדים — אפריל',  'שכר פנימי',     'שכר עובדים',       'fixed',   'recurring', -104000, '01/04/2026', true),
  ('חשמל — בריכות',       'חברת החשמל',    'חשמל ואנרגיה',      'fixed',   'recurring', -14200,  '10/04/2026', true),
  ('שכירות מתחם',         'נדל"ן מרכזי',   'שכירות',            'fixed',   'recurring', -24000,  '01/04/2026', true),
  ('כלור וכימיקלים',      'כימיקלים בע"מ', 'כימיקלים וחומרים', 'dynamic', 'recurring', -3850,   '08/04/2026', false),
  ('תחזוקת ציוד',         'טכנאי חיצוני',  'תחזוקה ותיקונים',  'dynamic', 'onetime',   -7300,   '28/03/2026', true),
  ('גוגל אדס — מרץ',      'Google',        'שיווק ופרסום',     'dynamic', 'recurring', -3200,   '31/03/2026', false),
  ('ביטוח מבנה',          'מגדל ביטוח',    'ביטוח',             'fixed',   'recurring', -8000,   '01/03/2026', true),
  ('מנויים — מרץ',        'לקוחות',        'הכנסות',            'fixed',   'recurring', 92400,   '01/03/2026', true);

-- ── SEED: CATEGORIES ──────────────────────────────────────
insert into categories (name, icon, type, freq, color, total, budget) values
  ('שכר עובדים',       '👥', 'fixed',   'recurring', '#3b82f6', 312000, 315000),
  ('חשמל ואנרגיה',    '⚡', 'fixed',   'recurring', '#fbbf24', 87600,  81000),
  ('שכירות',           '🏢', 'fixed',   'recurring', '#a78bfa', 72000,  72000),
  ('תחזוקה ותיקונים', '🔧', 'dynamic', 'recurring', '#2dd4bf', 48200,  54000),
  ('כימיקלים',         '🧪', 'dynamic', 'recurring', '#34d399', 34800,  36000),
  ('שיווק ופרסום',    '📢', 'dynamic', 'recurring', '#f472b6', 28400,  36000),
  ('ביטוח',            '🔐', 'fixed',   'recurring', '#c9a84c', 24000,  24000),
  ('ציוד חד-פעמי',   '🛒', 'dynamic', 'onetime',   '#fb923c', 11560,  20000);

-- ── SEED: RECEIPTS ────────────────────────────────────────
insert into receipts (name, date, amount, status) values
  ('חשמל_ינואר_2026.pdf',  '10/01/2026', '₪14,320', 'processed'),
  ('שכירות_Q1_2026.pdf',   '01/01/2026', '₪24,000', 'processed'),
  ('ביטוח_שנתי.pdf',       '15/01/2026', '₪32,000', 'processed'),
  ('כימיקלים_ינואר.pdf',   '12/01/2026', '₪3,200',  'processed'),
  ('תחזוקה_015.pdf',       '22/02/2026', '₪7,300',  'pending'),
  ('גוגל_אדס_פבר.pdf',     '28/02/2026', '₪3,200',  'pending'),
  ('חשמל_פבר_2026.pdf',    '10/02/2026', '₪13,850', 'processed'),
  ('ספק_כלים_2026.pdf',    '05/03/2026', '₪4,100',  'pending');
