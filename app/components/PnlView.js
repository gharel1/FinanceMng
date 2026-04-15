'use client';

import { PnlChart } from './Charts';

export default function PnlView() {
  return (
    <>
      <div className="pnl-summary">
        <div className="pnl-block">
          <div className="pnl-block-label">סך הכנסות</div>
          <div className="pnl-block-value neutral">₪842,300</div>
          <div className="pnl-block-sub">Q1 2026</div>
        </div>
        <div className="pnl-block">
          <div className="pnl-block-label">סך הוצאות</div>
          <div className="pnl-block-value neg">₪643,560</div>
          <div className="pnl-block-sub">76.4% מהכנסות</div>
        </div>
        <div className="pnl-block">
          <div className="pnl-block-label">רווח נקי</div>
          <div className="pnl-block-value pos">₪198,740</div>
          <div className="pnl-block-sub">מרווח 23.6%</div>
        </div>
      </div>

      <div className="card" style={{marginBottom:20}}>
        <div className="card-header">
          <div className="card-title"><span className="dot"></span> גרף רווח והפסד — 12 חודשים אחרונים</div>
        </div>
        <div className="card-body">
          <div className="chart-container-lg">
            <PnlChart />
          </div>
        </div>
      </div>

      <div className="pnl-breakdown">
        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="dot"></span> פירוט הכנסות</div>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>מקור</th><th>סכום</th><th>% מסך</th></tr></thead>
              <tbody>
                <tr><td className="name">מנויים חודשיים</td><td className="amount-pos">₪412,000</td><td>48.9%</td></tr>
                <tr><td className="name">כניסות חד-פעמיות</td><td className="amount-pos">₪198,300</td><td>23.5%</td></tr>
                <tr><td className="name">קורסים ושיעורים</td><td className="amount-pos">₪134,500</td><td>16.0%</td></tr>
                <tr><td className="name">השכרת מתקנים</td><td className="amount-pos">₪65,200</td><td>7.7%</td></tr>
                <tr><td className="name">קפיטריה וחנות</td><td className="amount-pos">₪32,300</td><td>3.8%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title"><span className="dot"></span> פירוט הוצאות עיקריות</div>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>קטגוריה</th><th>סכום</th><th>% מסך</th></tr></thead>
              <tbody>
                <tr><td className="name">שכר עובדים</td><td className="amount-neg">₪312,000</td><td>48.5%</td></tr>
                <tr><td className="name">חשמל ואנרגיה</td><td className="amount-neg">₪87,600</td><td>13.6%</td></tr>
                <tr><td className="name">שכירות ונדל&quot;ן</td><td className="amount-neg">₪72,000</td><td>11.2%</td></tr>
                <tr><td className="name">תחזוקה ותיקונים</td><td className="amount-neg">₪48,200</td><td>7.5%</td></tr>
                <tr><td className="name">כימיקלים וחומרים</td><td className="amount-neg">₪34,800</td><td>5.4%</td></tr>
                <tr><td className="name">שיווק ופרסום</td><td className="amount-neg">₪28,400</td><td>4.4%</td></tr>
                <tr><td className="name">ביטוח</td><td className="amount-neg">₪24,000</td><td>3.7%</td></tr>
                <tr><td className="name">אחר</td><td className="amount-neg">₪36,560</td><td>5.7%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
