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
import { chartData } from '../data/financialData';

ChartJS.register(
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
);

ChartJS.defaults.font.family = "'Heebo', sans-serif";
ChartJS.defaults.color = '#8a95b0';

export function RevenueChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();

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
        labels: chartData.revenueLabels,
        datasets: [
          {
            label: 'הכנסות',
            data: chartData.revenueData,
            borderColor: '#c9a84c',
            backgroundColor: gradRev,
            borderWidth: 2,
            pointBackgroundColor: '#c9a84c',
            pointRadius: 4,
            tension: 0.4,
            fill: true,
          },
          {
            label: 'הוצאות',
            data: chartData.expenseData,
            borderColor: '#f87171',
            backgroundColor: gradExp,
            borderWidth: 2,
            pointBackgroundColor: '#f87171',
            pointRadius: 4,
            tension: 0.4,
            fill: true,
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 10, padding: 14, font: { size: 11 } } } },
        scales: {
          x: { grid: { color: '#1c2130' }, ticks: { font: { size: 11 } } },
          y: { grid: { color: '#1c2130' }, ticks: { font: { size: 11 }, callback: v => '₪' + (v/1000).toFixed(0) + 'K' } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return <canvas ref={canvasRef} />;
}

export function CategoryChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new ChartJS(ctx, {
      type: 'doughnut',
      data: {
        labels: chartData.categoryLabels,
        datasets: [{
          data: chartData.categoryData,
          backgroundColor: chartData.categoryColors,
          borderWidth: 0,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 10, padding: 10, font: { size: 11 } } },
          tooltip: { callbacks: { label: ctx => ' ₪' + ctx.parsed.toLocaleString() } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return <canvas ref={canvasRef} />;
}

export function PnlChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();

    const ctx = canvasRef.current.getContext('2d');
    const profit = chartData.pnlRevenue.map((r, i) => r - chartData.pnlExpenses[i]);

    const gradP = ctx.createLinearGradient(0, 0, 0, 280);
    gradP.addColorStop(0, 'rgba(52,211,153,0.25)');
    gradP.addColorStop(1, 'rgba(52,211,153,0)');

    chartRef.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: chartData.pnlMonths,
        datasets: [
          { label:'הכנסות', data: chartData.pnlRevenue, backgroundColor:'rgba(201,168,76,0.6)', borderRadius:4, order:2 },
          { label:'הוצאות', data: chartData.pnlExpenses, backgroundColor:'rgba(248,113,113,0.5)', borderRadius:4, order:2 },
          {
            label:'רווח', data: profit,
            type:'line', borderColor:'#34d399', backgroundColor: gradP,
            borderWidth:2, pointRadius:3, tension:0.4, fill:true, order:1
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position:'top', align:'end', labels:{ boxWidth:10, padding:14, font:{size:11} } } },
        scales: {
          x: { grid:{ color:'#1c2130' }, ticks:{ font:{size:10} } },
          y: { grid:{ color:'#1c2130' }, ticks:{ font:{size:11}, callback: v=>'₪'+(v/1000).toFixed(0)+'K' } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return <canvas ref={canvasRef} />;
}
