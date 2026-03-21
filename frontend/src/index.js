import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const categories = ['All', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Income', 'Health'];

const transactions = [
  { id: 1, name: 'Salary Deposit', amount: 4200.00, date: 'Mar 15', category: 'Income', type: 'income' },
  { id: 2, name: 'Rent Payment', amount: -1500.00, date: 'Mar 01', category: 'Utilities', type: 'expense' },
  { id: 3, name: 'Grocery Store', amount: -87.50, date: 'Mar 19', category: 'Food', type: 'expense' },
  { id: 4, name: 'Netflix', amount: -15.99, date: 'Mar 18', category: 'Entertainment', type: 'expense' },
  { id: 5, name: 'Coffee Shop', amount: -6.75, date: 'Mar 13', category: 'Food', type: 'expense' },
  { id: 6, name: 'Electricity Bill', amount: -92.30, date: 'Mar 14', category: 'Utilities', type: 'expense' },
  { id: 7, name: 'Freelance Project', amount: 850.00, date: 'Mar 10', category: 'Income', type: 'income' },
  { id: 8, name: 'Gym Membership', amount: -45.00, date: 'Mar 05', category: 'Health', type: 'expense' },
  { id: 9, name: 'Uber Ride', amount: -18.50, date: 'Mar 17', category: 'Transport', type: 'expense' },
  { id: 10, name: 'Doctor Visit', amount: -120.00, date: 'Mar 08', category: 'Health', type: 'expense' },
];

const s = {
  app: { fontFamily: "'Inter', -apple-system, sans-serif", minHeight: '100vh', background: '#f8fafc', color: '#1e293b' },
  header: { background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)', color: 'white', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { margin: 0, fontSize: '1.5rem', fontWeight: 700 },
  headerSub: { margin: '0.25rem 0 0', opacity: 0.85, fontSize: '0.875rem' },
  main: { maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' },
  card: { background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  metricLabel: { margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#64748b', fontWeight: 500 },
  metricValue: { margin: 0, fontSize: '1.875rem', fontWeight: 700 },
  filterRow: { display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' },
  txRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 0', borderBottom: '1px solid #f1f5f9' },
  badge: { fontSize: '0.75rem', padding: '0.25rem 0.625rem', borderRadius: '999px', background: '#f1f5f9', color: '#475569', fontWeight: 500 },
};

function App() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? transactions : transactions.filter(t => t.category === filter);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div style={s.app}>
      <header style={s.header}>
        <div>
          <h1 style={s.headerTitle}>Finance Dashboard</h1>
          <p style={s.headerSub}>Personal budget tracker &amp; expense analytics</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.75 }}>Net Balance</p>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>${balance.toFixed(2)}</p>
        </div>
      </header>
      <main style={s.main}>
        <div style={s.grid3}>
          <div style={s.card}>
            <p style={s.metricLabel}>Total Income</p>
            <p style={{ ...s.metricValue, color: '#16a34a' }}>${totalIncome.toLocaleString()}</p>
          </div>
          <div style={s.card}>
            <p style={s.metricLabel}>Total Expenses</p>
            <p style={{ ...s.metricValue, color: '#dc2626' }}>${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
          <div style={s.card}>
            <p style={s.metricLabel}>Savings Rate</p>
            <p style={{ ...s.metricValue, color: '#2563eb' }}>{((balance / totalIncome) * 100).toFixed(1)}%</p>
          </div>
        </div>
        <div style={s.card}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: 600 }}>Transactions</h2>
          <div style={s.filterRow}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{ ...s.badge, cursor: 'pointer', border: 'none', background: filter === cat ? '#1e40af' : '#f1f5f9', color: filter === cat ? 'white' : '#475569', padding: '0.375rem 0.875rem' }}>
                {cat}
              </button>
            ))}
          </div>
          {filtered.map((tx, i) => (
            <div key={tx.id} style={{ ...s.txRow, borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 500 }}>{tx.name}</p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: '#94a3b8' }}>{tx.date} &middot; <span style={s.badge}>{tx.category}</span></p>
              </div>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: tx.type === 'income' ? '#16a34a' : '#dc2626' }}>
                {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
