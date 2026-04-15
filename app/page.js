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
import { pageTitles } from './data/financialData';
import {
  getExpenses, addExpense, deleteExpense,
  getCategories, addCategory, deleteCategory,
  getReceipts, addReceipts,
} from '../lib/db';

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard');
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

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
        return <DashboardView onNavigate={handleNavigate} />;
      case 'pnl':
        return <PnlView />;
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
        return <BudgetView />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView onNavigate={handleNavigate} />;
    }
  };

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
            <button className="btn btn-primary" onClick={() => setExpenseModalOpen(true)}>+ הוצאה חדשה</button>
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
      />
    </div>
  );
}
