'use client';

import { useState, useEffect } from 'react';

import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import PnlView from './components/PnlView';
import ExpensesView from './components/ExpensesView';
import CategoriesView from './components/CategoriesView';
import OnedriveView from './components/OnedriveView';
import RecommendationsView from './components/RecommendationsView';
import BudgetView from './components/BudgetView';
import ReportsView from './components/ReportsView';
import { ExpenseModal, CategoryModal, ImportModal } from './components/Modals';
import LoginView from './components/LoginView';
import { pageTitles } from './data/financialData';
import { supabase } from '../lib/supabase';
import {
  getExpenses, addExpense, deleteExpense,
  getCategories, addCategory, deleteCategory,
  getReceipts, addReceipts,
} from '../lib/db';

function getCurrentQuarterInfo() {
  const now = new Date();
  const month = now.getMonth() + 1;
  return { quarter: Math.ceil(month / 3), year: now.getFullYear() };
}

function buildPeriodOptions() {
  const { quarter, year } = getCurrentQuarterInfo();
  const options = [];
  let q = quarter, y = year;
  for (let i = 0; i < 6; i++) {
    options.push({ value: `q${q}_${y}`, label: `Q${q} ${y}` });
    q--;
    if (q === 0) { q = 4; y--; }
  }
  options.push({ value: `year_${year - 1}`, label: `כל שנת ${year - 1}` });
  return options;
}

function filterByPeriod(expenses, period) {
  if (!period) return expenses;
  const qm = period.match(/^q(\d)_(\d{4})$/);
  if (qm) {
    const q = parseInt(qm[1]), yr = parseInt(qm[2]);
    const startM = (q - 1) * 3 + 1, endM = startM + 2;
    return expenses.filter(e => {
      if (!e.date) return false;
      const p = e.date.split('/');
      if (p.length < 3) return false;
      const m = parseInt(p[1], 10), y = parseInt(p[2], 10);
      return y === yr && m >= startM && m <= endM;
    });
  }
  const ym = period.match(/^year_(\d{4})$/);
  if (ym) {
    const yr = parseInt(ym[1]);
    return expenses.filter(e => {
      if (!e.date) return false;
      const p = e.date.split('/');
      return p.length >= 3 && parseInt(p[2], 10) === yr;
    });
  }
  return expenses;
}

export default function Home() {
  const [session, setSession] = useState(undefined); // undefined = checking, null = logged out
  const [activeView, setActiveView] = useState('dashboard');
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auth: check session on mount and listen for changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) { setExpenses([]); setCategories([]); setPdfs([]); setLoading(true); }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Data: load only when authenticated
  useEffect(() => {
    if (!session) return;
    async function loadData() {
      try {
        const [exp, cats, recs] = await Promise.all([
          getExpenses(),
          getCategories(),
          getReceipts(),
        ]);
        setExpenses(exp);
        setCategories(cats);
        setPdfs(recs);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [session]);

  const periodOptions = buildPeriodOptions();
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0].value);

  // Only keep periods that contain at least one expense; always keep current quarter (index 0)
  const availableOptions = loading
    ? periodOptions
    : periodOptions.filter((opt, idx) => idx === 0 || filterByPeriod(expenses, opt.value).length > 0);

  // After data loads, reset to current quarter if the selection has no data
  useEffect(() => {
    if (!loading && !availableOptions.find(o => o.value === selectedPeriod)) {
      setSelectedPeriod(availableOptions[0].value);
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredExpenses = filterByPeriod(expenses, selectedPeriod);

  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  const handleNavigate = (view) => {
    setActiveView(view);
  };

  const handleSaveExpense = async (expense) => {
    const saved = await addExpense(expense);
    setExpenses(prev => [saved, ...prev]);
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const handleSaveCategory = async (category) => {
    const saved = await addCategory(category);
    setCategories(prev => [...prev, saved]);
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const handleAddPdfs = async (newPdfs) => {
    const saved = await addReceipts(newPdfs);
    setPdfs(prev => [...saved, ...prev]);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onNavigate={handleNavigate} expenses={filteredExpenses} categories={categories} />;
      case 'pnl':
        return <PnlView expenses={filteredExpenses} />;
      case 'expenses':
        return <ExpensesView expenses={expenses} onDeleteExpense={handleDeleteExpense} />;
      case 'categories':
        return (
          <CategoriesView
            categories={categories}
            onDeleteCategory={handleDeleteCategory}
            onOpenCategoryModal={() => setCategoryModalOpen(true)}
          />
        );
      case 'onedrive':
        return <OnedriveView pdfs={pdfs} onAddPdfs={handleAddPdfs} />;
      case 'recommendations':
        return <RecommendationsView />;
      case 'budget':
        return <BudgetView categories={categories} expenses={expenses} />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView onNavigate={handleNavigate} />;
    }
  };

  // Still determining auth state
  if (session === undefined) return null;

  // Not logged in — show login screen
  if (!session) return <LoginView />;

  return (
    <div className="app">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />

      <div className="main">
        {/* TOPBAR */}
        <div className="topbar">
          <div className="page-title">{pageTitles[activeView] || activeView}</div>
          <div className="topbar-actions">
            <select
              className="period-select"
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value)}
            >
              {availableOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button className="btn btn-ghost" onClick={() => setImportModalOpen(true)}>⬆ הכנסות חודשיות</button>
            <button className="btn btn-primary" onClick={() => setExpenseModalOpen(true)}>+ הוצאה חדשה</button>
            <button className="btn btn-ghost" onClick={() => supabase.auth.signOut()} style={{ color: 'var(--text-muted)' }} title={session?.user?.email}>יציאה</button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          <div className={`view active`}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: 14 }}>
                טוען נתונים...
              </div>
            ) : renderView()}
          </div>
        </div>
      </div>

      {/* MODALS */}
      <ExpenseModal
        isOpen={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        onSave={handleSaveExpense}
      />
      <CategoryModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        onSave={handleSaveCategory}
      />
      <ImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImport={async (rows) => {
          const saved = await Promise.all(rows.map(r => addExpense(r)));
          setExpenses(prev => [...saved, ...prev]);
        }}
      />
    </div>
  );
}
