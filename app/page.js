'use client';

import { useState } from 'react';
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
import {
  initialExpenses,
  initialCategories,
  initialPdfs,
  pageTitles,
} from './data/financialData';

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard');
  const [expenses, setExpenses] = useState([...initialExpenses]);
  const [categories, setCategories] = useState([...initialCategories]);
  const [pdfs, setPdfs] = useState([...initialPdfs]);

  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  const handleNavigate = (view) => {
    setActiveView(view);
  };

  const handleSaveExpense = (expense) => {
    setExpenses(prev => [expense, ...prev]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const handleSaveCategory = (category) => {
    setCategories(prev => [...prev, category]);
  };

  const handleDeleteCategory = (index) => {
    setCategories(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddPdfs = (newPdfs) => {
    setPdfs(prev => [...newPdfs, ...prev]);
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
            {renderView()}
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
