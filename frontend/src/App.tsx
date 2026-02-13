import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Analytics from './components/Analytics';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface Expense {
  _id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
}

interface Summary {
  month: string;
  total: number;
  transactionCount: number;
  byCategory: Record<string, number>;
}

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/api/expenses`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/analytics/summary`);
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleAddExpense = async (expense: Omit<Expense, '_id'>) => {
    try {
      const response = await axios.post(`${API_BASE}/api/expenses`, expense);
      setExpenses([response.data, ...expenses]);
      fetchSummary();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await axios.delete(`${API_BASE}/api/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
      fetchSummary();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Finance Dashboard</h1>
          <p className="text-slate-400">Track, analyze, and manage your finances</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-3 font-semibold transition border-b-2 ${
              activeTab === 'dashboard'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-4 py-3 font-semibold transition border-b-2 ${
              activeTab === 'expenses'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            Expenses
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && summary && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <p className="text-slate-400 text-sm mb-2">Total Spending</p>
                <p className="text-4xl font-bold text-green-400">
                  ${summary.total.toFixed(2)}
                </p>
                <p className="text-slate-400 text-xs mt-2">{summary.month}</p>
              </div>

              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <p className="text-slate-400 text-sm mb-2">Transactions</p>
                <p className="text-4xl font-bold text-blue-400">{summary.transactionCount}</p>
              </div>

              <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                <p className="text-slate-400 text-sm mb-2">Avg Transaction</p>
                <p className="text-4xl font-bold text-amber-400">
                  ${(summary.total / summary.transactionCount).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Analytics */}
            <Analytics expenses={expenses} summary={summary} />
          </>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <h2 className="text-xl font-bold mb-6">Add Expense</h2>
                  <ExpenseForm onSubmit={handleAddExpense} />
                </div>
              </div>

              <div className="lg:col-span-2">
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400">Loading expenses...</p>
                  </div>
                ) : (
                  <ExpenseList
                    expenses={expenses}
                    onDelete={handleDeleteExpense}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
