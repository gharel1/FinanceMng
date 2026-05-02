'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  ArcElement,
  DoughnutController,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, LineController,
  BarElement, BarController, ArcElement, DoughnutController, Filler, Tooltip, Legend
);

ChartJS.defaults.font.family = "'Heebo', sans-serif";
ChartJS.defaults.color = '#8a95b0';

// Parse DD/MM/YYYY → "MM/YYYY" label, returns null for invalid input
function monthKey(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('/');
  if (parts.length < 3) return null;
  const mm = parts[1], yyyy = parts[2];
  if (!mm || !yyyy || isNaN(parseInt(mm, 10)) || isNaN(parseInt(yyyy, 10))) return null;
  return `${mm}/${yyyy}`;
}

const CATEGORY_COLORS = [
  '#3b82f6','#fbbf24','#a78bfa','#2dd4bf',
  '#34d399','#f472b6','#c9a84c','#fb923c','#64748b',
];

export function RevenueChart({ expenses = [] }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();

    // Aggregate by month
    const months = {};
    expenses.forEach(e => {
      const k = monthKey(e.date);
      if (!k) return;
      if (!months[k]) months[k] = { revenue: 0, expenses: 0 };
      if (e.amount > 0) months[k].revenue  += (e.taxable ?? e.amount);
      else              months[k].expenses += Math.abs(e.amount);
    });

    const labels = Object.keys(months).sort((a, b) => {
      const [am, ay] = a.split('/');
      const [bm, by] = b.split('/');
      return (parseInt(ay, 10) * 12 + parseInt(am, 10)) - (parseInt(by, 10) * 12 + parseInt(bm, 10));
    });
    const ctx = canvasRef.current.getContext('2d');
    const gradRev = ctx.createLinearGradient(0, 0, 0, 220);
    gradRev.addColorStop(0, 'rgba(201,168,76,0.2)');
    gradRev.addColorStop(1, 'rgba(201,168,76,0)');
    const gradExp = ctx.createLinearGradient(0, 0, 0, 220);
    gradExp.addColorStop(0, 'rgba(248,113,113,0.15)');
    gradExp.addColorStop(1, 'rgba(248,113,113,0)');

    chartRef.current = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label:'הכנסות', data: labels.map(k => months[k].revenue),
            borderColor:'#c9a84c', backgroundColor: gradRev,
            borderWidth:2, pointBackgroundColor:'#c9a84c', pointRadius:4, tension:0.4, fill:true },
          { label:'הוצאות', data: labels.map(k => months[k].expenses),
            borderColor:'#f87171', backgroundColor: gradExp,
            borderWidth:2, pointBackgroundColor:'#f87171', pointRadius:4, tension:0.4, fill:true },
        ]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ position:'top', align:'end', labels:{ boxWidth:10, padding:14, font:{size:11} } } },
        scales:{
          x:{ grid:{color:'#1c2130'}, ticks:{font:{size:11}} },
          y:{ grid:{color:'#1c2130'}, ticks:{font:{size:11}, callback: v=>'₪'+(v/1000).toFixed(0)+'K'} }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [expenses]);

  return <canvas ref={canvasRef} />;
}

export function CategoryChart({ expenses = [] }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();

    const groups = {};
    expenses.filter(e => e.amount < 0).forEach(e => {
      groups[e.cat] = (groups[e.cat] || 0) + Math.abs(e.amount);
    });

    const labels = Object.keys(groups);
    const data   = labels.map(k => groups[k]);
    const colors = labels.map((_, i) => CATEGORY_COLORS[i % CATEGORY_COLORS.length]);

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new ChartJS(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data, backgroundColor: colors, borderWidth:0, hoverOffset:6 }]
      },
      options: {
        responsive:true, maintainAspectRatio:false, cutout:'70%',
        plugins:{
          legend:{ position:'right', labels:{ boxWidth:10, padding:10, font:{size:11} } },
          tooltip:{ callbacks:{ label: ctx=>' ₪'+ctx.parsed.toLocaleString() } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [expenses]);

  return <canvas ref={canvasRef} />;
}

export function PnlChart({ expenses = [] }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();

    const months = {};
    expenses.forEach(e => {
      const k = monthKey(e.date);
      if (!k) return;
      if (!months[k]) months[k] = { revenue: 0, expenses: 0 };
      if (e.amount > 0) months[k].revenue  += (e.taxable ?? e.amount);
      else              months[k].expenses += Math.abs(e.amount);
    });

    const labels = Object.keys(months).sort((a, b) => {
      const [am, ay] = a.split('/');
      const [bm, by] = b.split('/');
      return (parseInt(ay, 10) * 12 + parseInt(am, 10)) - (parseInt(by, 10) * 12 + parseInt(bm, 10));
    });
    const revenue = labels.map(k => months[k].revenue);
    const exps    = labels.map(k => months[k].expenses);
    const profit  = labels.map((_, i) => revenue[i] - exps[i]);

    const ctx = canvasRef.current.getContext('2d');
    const gradP = ctx.createLinearGradient(0, 0, 0, 280);
    gradP.addColorStop(0, 'rgba(52,211,153,0.25)');
    gradP.addColorStop(1, 'rgba(52,211,153,0)');

    chartRef.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label:'הכנסות', data: revenue, backgroundColor:'rgba(201,168,76,0.6)', borderRadius:4, order:2 },
          { label:'הוצאות', data: exps,    backgroundColor:'rgba(248,113,113,0.5)', borderRadius:4, order:2 },
          { label:'רווח',   data: profit,
            type:'line', borderColor:'#34d399', backgroundColor:gradP,
            borderWidth:2, pointRadius:3, tension:0.4, fill:true, order:1 },
        ]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ position:'top', align:'end', labels:{ boxWidth:10, padding:14, font:{size:11} } } },
        scales:{
          x:{ grid:{color:'#1c2130'}, ticks:{font:{size:10}} },
          y:{ grid:{color:'#1c2130'}, ticks:{font:{size:11}, callback: v=>'₪'+(v/1000).toFixed(0)+'K'} }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [expenses]);

  return <canvas ref={canvasRef} />;
}
