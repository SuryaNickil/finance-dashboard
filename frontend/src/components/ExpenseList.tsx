import React from 'react';

interface Expense {
  _id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Food: 'bg-green-900 text-green-100',
  Transport: 'bg-blue-900 text-blue-100',
  Entertainment: 'bg-purple-900 text-purple-100',
  Utilities: 'bg-yellow-900 text-yellow-100',
  Healthcare: 'bg-red-900 text-red-100',
  Shopping: 'bg-pink-900 text-pink-100',
  Other: 'bg-slate-900 text-slate-100',
};

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 text-center">
        <p className="text-slate-400 text-lg">No expenses yet. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700 border-b border-slate-600">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {expenses.map(expense => (
              <tr key={expense._id} className="hover:bg-slate-700 transition">
                <td className="px-6 py-4">
                  <p className="font-medium">{expense.description}</p>
                  {expense.notes && <p className="text-sm text-slate-400">{expense.notes}</p>}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[expense.category] || categoryColors.Other}`}>
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="font-semibold">${expense.amount.toFixed(2)}</p>
                </td>
                <td className="px-6 py-4 text-slate-300">
                  {formatDate(expense.date)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onDelete(expense._id)}
                    className="text-red-400 hover:text-red-300 transition text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
