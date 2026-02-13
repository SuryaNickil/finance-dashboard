# Personal Finance Dashboard

A full-stack budget and expense tracking application with real-time analytics and insights.

## Features

- **Expense Tracking**: Add, categorize, and track all expenses
- **Budget Management**: Set monthly budgets per category
- **Analytics**: Real-time charts and visualizations
- **Category Breakdown**: Pie charts showing spending by category
- **Monthly Trends**: Line charts tracking expenses over time
- **Financial Goals**: Set and track savings goals
- **Reports**: Generate spending reports and insights

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS for styling
- Chart.js for analytics
- Axios for API calls
- Deployed on Vercel

**Backend:**
- Node.js + Express.js
- MongoDB for data storage
- Mongoose for data modeling
- Deployed on Render/Railway

## Project Structure

```
finance-dashboard/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API calls
│   │   └── App.tsx
│   └── package.json
├── backend/                  # Express.js API
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

## Getting Started

### Backend Setup

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

App runs on `http://localhost:3000`

## API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses?category=Food` - Filter by category

### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create budget
- `PUT /api/budgets/:id` - Update budget

### Analytics
- `GET /api/analytics/summary` - Summary stats
- `GET /api/analytics/by-category` - Category breakdown
- `GET /api/analytics/monthly-trend` - Monthly trends

## Key Achievements

- Built a complete full-stack finance application
- Implemented real-time expense tracking and analytics
- Created responsive design with Tailwind CSS
- Designed RESTful API with Express.js
- Integrated MongoDB for persistent data storage
- Deployed both frontend and backend to production

## Live Demo

- **Frontend**: [finance-dashboard.vercel.app](https://finance-dashboard.vercel.app)
- **Backend API**: [finance-api.render.com](https://finance-api.render.com)

## Key Features in Action

### Dashboard
- Total spending vs budget
- Category breakdown pie chart
- Monthly trend visualization
- Quick action buttons

### Expense Management
- Add expenses with categories and dates
- Edit/delete expenses
- Filter by category or date
- Search functionality

### Analytics
- Spending patterns
- Category insights
- Budget vs actual comparison
- Monthly trends

## Future Enhancements

- Recurring expense automation
- Receipt image upload and OCR
- Bill splitting feature
- Investment tracking
- Tax estimation

## Author

Surya Vanukuri - [GitHub](https://github.com/SuryaNickil) | [LinkedIn](https://linkedin.com/in/surya-vanukuri)

## License

MIT
