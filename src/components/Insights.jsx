import { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import useStore from '../store/useStore';
import { getCategoryById, getCategoryIcon } from '../data/mockData';
import { HelpCircle, TrendingUp, TrendingDown, Banknote, Clock } from 'lucide-react';

export default function Insights() {
  const transactions = useStore((s) => s.transactions);
  
  // Calculate insights
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  
  // 1. Highest spending category
  const expenseByCategory = {};
  expenseTransactions.forEach(t => {
    expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + Math.abs(t.amount);
  });
  
  let highestExpenseCat = null;
  let highestExpenseAmount = 0;
  Object.entries(expenseByCategory).forEach(([catId, amount]) => {
    if (amount > highestExpenseAmount) {
      highestExpenseAmount = amount;
      highestExpenseCat = catId;
    }
  });
  const highestCatObj = highestExpenseCat ? getCategoryById(highestExpenseCat) : null;

  // 2. Month-over-month (mocked comparison since we have limited date range)
  // Let's pretend current month is Nov, last month is Oct based on our mock data
  const novExpenses = expenseTransactions.filter(t => t.date.startsWith('2024-11')).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const octExpenses = expenseTransactions.filter(t => t.date.startsWith('2024-10')).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  let momChange = 0;
  if (octExpenses > 0) {
    momChange = Math.round(((novExpenses - octExpenses) / octExpenses) * 100);
  }
  
  // 3. Net balance
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenseTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netBalance = totalIncome - totalExpense;
  
  // 4. Most frequent category
  const countByCategory = {};
  transactions.forEach(t => {
    countByCategory[t.category] = (countByCategory[t.category] || 0) + 1;
  });
  
  let mostFreqCat = null;
  let mostFreqCount = 0;
  Object.entries(countByCategory).forEach(([catId, count]) => {
    if (count > mostFreqCount) {
      mostFreqCount = count;
      mostFreqCat = catId;
    }
  });
  const mostFreqCatObj = mostFreqCat ? getCategoryById(mostFreqCat) : null;

  // Savings rate
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round((netBalance / totalIncome) * 100)) : 0;
  const targetSavingsRate = savingsRate / 100;

  const insightsData = [
    {
      title: 'Highest Spending',
      value: highestCatObj ? highestCatObj.label : 'None',
      subtitle: `₹${highestExpenseAmount.toLocaleString('en-IN')} total`,
      icon: highestCatObj ? getCategoryIcon(highestExpenseCat, 20) : <HelpCircle size={20} />,
      color: highestCatObj ? highestCatObj.color : '#888',
    },
    {
      title: 'MoM Expense Change',
      value: `${momChange > 0 ? '+' : ''}${momChange}%`,
      subtitle: `vs previous month`,
      icon: momChange > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />,
      color: momChange > 0 ? '#f43f5e' : '#10b981', // red if spend increased, green if decreased
    },
    {
      title: 'Net Period Balance',
      value: `₹${netBalance.toLocaleString('en-IN')}`,
      subtitle: `In: ₹${(totalIncome/1000).toFixed(1)}k | Out: ₹${(totalExpense/1000).toFixed(1)}k`,
      icon: <Banknote size={20} />,
      color: netBalance >= 0 ? '#10b981' : '#f43f5e',
    },
    {
      title: 'Most Frequent',
      value: mostFreqCatObj ? mostFreqCatObj.label : 'None',
      subtitle: `${mostFreqCount} transactions`,
      icon: mostFreqCatObj ? getCategoryIcon(mostFreqCat, 20) : <Clock size={20} />,
      color: mostFreqCatObj ? mostFreqCatObj.color : '#3b82f6',
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}
      >
        Financial Insights
      </motion.h1>
      
      {/* Cards Grid */}
      <div 
        style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 16 }}
        className="sm:!grid-cols-2 lg:!grid-cols-4"
      >
        {insightsData.map((data, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ scale: 1.02, x: 4 }}
            style={{
              background: 'var(--surface)',
              border: `1px solid var(--border)`,
              boxShadow: `0 0 20px ${data.color}11`,
              backdropFilter: 'blur(12px)',
              borderRadius: 16,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Left border glow */}
            <div style={{
              position: 'absolute',
              left: 0, top: 0, bottom: 0, width: 4,
              background: data.color,
              opacity: 0.8
            }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${data.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: data.color
              }}>
                {data.icon}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                {data.title}
              </div>
            </div>
            
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
              {data.value}
            </div>
            
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {data.subtitle}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Savings Gauge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
          borderRadius: 20,
          padding: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 16
        }}
        className="mx-auto w-full max-w-md"
      >
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24 }}>
          Savings Target Gauge
        </h2>
        
        <div style={{ position: 'relative', width: 240, height: 120, marginBottom: 16 }}>
          <svg viewBox="0 0 100 50" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00b4d8" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* Background arc */}
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Filled arc */}
            <motion.path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="url(#gaugeGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: targetSavingsRate }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
          </svg>
          
          <div style={{
            position: 'absolute',
            bottom: -10,
            left: 0,
            right: 0,
            textAlign: 'center'
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              style={{ fontSize: 36, fontWeight: 700, color: 'var(--text-primary)' }}
            >
              {savingsRate}%
            </motion.div>
          </div>
        </div>
        
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>
          of income saved this month
        </div>
      </motion.div>
      
    </div>
  );
}
