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
import { ExpenseModal, IncomeModal, CategoryModal, ImportModal } from './components/Modals';
import LoginView from './components/LoginView';
import { pageTitles } from './data/financialData';
import { supabase } from '../lib/supabase';
import {
  getExpenses, addExpense, deleteExpense,
  getCategories, addCategory, deleteCategory,
  getReceipts, addReceipts,
} from '../lib/db';

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

  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  const handleNavigate = (view) => {
    setActiveView(view);
  };

  const handleSaveExpense = async (expense) => {
    const saved = await addExpense(expense);
    setExpenses(prev => [saved, ...prev]);
  };

  const handleSaveIncome = async (income) => {
    const saved = await addExpense(income);
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
        return <DashboardView onNavigate={handleNavigate} expenses={expenses} categories={categories} />;
      case 'pnl':
        return <PnlView expenses={expenses} />;
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
            <select className="period-select" defaultValue="q1_2026">
              <option value="q1_2026">Q1 2026</option>
              <option value="q4_2025">Q4 2025</option>
              <option value="q3_2025">Q3 2025</option>
              <option value="2025">כל שנת 2025</option>
            </select>
            <button className="btn btn-ghost" onClick={() => setImportModalOpen(true)}>⬆ ייבוא</button>
            <button className="btn btn-ghost" style={{color:'var(--green)',borderColor:'var(--green)'}} onClick={() => setIncomeModalOpen(true)}>+ הכנסה חדשה</button>
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
      <IncomeModal
        isOpen={incomeModalOpen}
        onClose={() => setIncomeModalOpen(false)}
        onSave={handleSaveIncome}
      />
      <CategoryModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        onSave={handleSaveCategory}
      />
      <ImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
      />
    </div>
  );
}
