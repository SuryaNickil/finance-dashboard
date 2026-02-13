import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar, Line, Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie as PieChart, Bar as BarChart, Line as LineChart } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

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

interface AnalyticsProps {
  expenses: Expense[];
  summary: Summary;
}

export default function Analytics({ expenses, summary }: AnalyticsProps) {
  const [trendData, setTrendData] = useState<any>(null);
  const [categoryData, setCategoryData] = useState<any>(null);

  useEffect(() => {
    fetchTrendData();
    prepareCategoryData();
  }, [expenses]);

  const fetchTrendData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/analytics/monthly-trend`);
      const data = response.data;
      
      setCategoryData({
        labels: data.map((d: any) => d.month),
        datasets: [{
          label: 'Monthly Spending',
          data: data.map((d: any) => d.amount),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        }],
      });
    } catch (error) {
      console.error('Error fetching trend:', error);
    }
  };

  const prepareCategoryData = () => {
    const categories = Object.keys(summary.byCategory);
    const amounts = Object.values(summary.byCategory);
    
    setTrendData({
      labels: categories,
      datasets: [{
        label: 'Spending by Category',
        data: amounts,
        backgroundColor: [
          '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'
        ],
      }],
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Category Breakdown */}
      {trendData && (
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h3 className="text-xl font-bold mb-6">Spending by Category</h3>
          <PieChart
            data={trendData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  labels: { color: '#e2e8f0', font: { size: 12 } },
                },
              },
            }}
          />
        </div>
      )}

      {/* Monthly Trend */}
      {categoryData && (
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h3 className="text-xl font-bold mb-6">Monthly Trend</h3>
          <LineChart
            data={categoryData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  labels: { color: '#e2e8f0', font: { size: 12 } },
                },
              },
              scales: {
                x: { ticks: { color: '#cbd5e1' }, grid: { color: '#475569' } },
                y: { ticks: { color: '#cbd5e1' }, grid: { color: '#475569' } },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
