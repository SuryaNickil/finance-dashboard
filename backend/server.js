const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/finance-dashboard';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error:', err));

// Expense Schema
const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  notes: String,
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

// Budget Schema
const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  limit: { type: Number, required: true },
  month: { type: String, default: () => new Date().toISOString().slice(0, 7) },
}, { timestamps: true });

const Budget = mongoose.model('Budget', budgetSchema);

// API Routes

// Expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Budgets
app.get('/api/budgets', async (req, res) => {
  try {
    const budgets = await Budget.find().sort({ category: 1 });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/budgets', async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/budgets/:id', async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!budget) return res.status(404).json({ error: 'Budget not found' });
    res.json(budget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Analytics
app.get('/api/analytics/summary', async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const expenses = await Expense.find({
      date: {
        $gte: new Date(`${currentMonth}-01`),
        $lt: new Date(new Date(`${currentMonth}-01`).setMonth(new Date(`${currentMonth}-01`).getMonth() + 1))
      }
    });
    
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const byCategory = {};
    
    expenses.forEach(exp => {
      byCategory[exp.category] = (byCategory[exp.category] || 0) + exp.amount;
    });
    
    res.json({
      month: currentMonth,
      total,
      transactionCount: expenses.length,
      byCategory
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/by-category', async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const expenses = await Expense.find({
      date: {
        $gte: new Date(`${currentMonth}-01`),
        $lt: new Date(new Date(`${currentMonth}-01`).setMonth(new Date(`${currentMonth}-01`).getMonth() + 1))
      }
    });
    
    const byCategory = {};
    expenses.forEach(exp => {
      byCategory[exp.category] = (byCategory[exp.category] || 0) + exp.amount;
    });
    
    const data = Object.entries(byCategory).map(([name, value]) => ({ name, value }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/monthly-trend', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: 1 });
    const trend = {};
    
    expenses.forEach(exp => {
      const month = exp.date.toISOString().slice(0, 7);
      trend[month] = (trend[month] || 0) + exp.amount;
    });
    
    const data = Object.entries(trend).map(([month, amount]) => ({ month, amount }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Finance Dashboard API', version: '1.0.0' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
