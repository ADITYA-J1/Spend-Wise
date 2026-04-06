import { motion } from 'framer-motion';
import useStore from '../store/useStore';
import TiltCard from './TiltCard';
import { getCategoryById, getCategoryIcon } from '../data/mockData';
import { Wallet, TrendingUp, TrendingDown, Receipt, Tag, CalendarDays, Target } from 'lucide-react';

export default function Overview() {
  const transactions = useStore((s) => s.transactions);

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter((t) => t.type === 'expense').reduce((a, t) => a + t.amount, 0));
  const totalBalance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;

  const recentTxns = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  const quickStats = [
    { icon: <Receipt size={24} />, value: transactions.length, label: 'Transactions' },
    { icon: <Tag size={24} />, value: 10, label: 'Categories' },
    { icon: <CalendarDays size={24} />, value: '₹19,950', label: 'This Month' },
    { icon: <Target size={24} />, value: `${savingsRate}%`, label: 'Savings Rate' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
          Good morning 👋
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Here's your financial overview for today
        </p>
      </motion.div>

      {/* Summary cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: 16,
        }}
        className="sm:!grid-cols-3"
      >
        <TiltCard
          title="Total Balance"
          amount={totalBalance}
          subtitle="Net across all accounts"
          icon={<Wallet size={22} strokeWidth={1.5} color="#fff" />}
          gradient="linear-gradient(135deg, #6d28d9, #7c3aed, #4f46e5)"
          glowColor="#7c3aed"
          delay={0}
        />
        <TiltCard
          title="Total Income"
          amount={totalIncome}
          subtitle="All income sources"
          icon={<TrendingUp size={22} strokeWidth={1.5} color="#fff" />}
          gradient="linear-gradient(135deg, #065f46, #059669, #10b981)"
          glowColor="#10b981"
          delay={0.1}
        />
        <TiltCard
          title="Total Expenses"
          amount={totalExpense}
          subtitle="All spending tracked"
          icon={<TrendingDown size={22} strokeWidth={1.5} color="#fff" />}
          gradient="linear-gradient(135deg, #881337, #e11d48, #f43f5e)"
          glowColor="#f43f5e"
          delay={0.2}
        />
      </div>

      {/* Quick stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
        }}
        className="sm:!grid-cols-4"
      >
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ scale: 1.04 }}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(12px)',
              borderRadius: 14,
              padding: '18px 14px',
              textAlign: 'center',
              cursor: 'default',
            }}
          >
            <div style={{ display: 'inline-flex', marginBottom: 6, color: 'var(--text-primary)' }}>{stat.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
          borderRadius: 16,
          padding: 20,
        }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
          Recent Activity
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {recentTxns.map((txn, i) => {
            const cat = getCategoryById(txn.category);
            return (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: i < recentTxns.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0.50, flex: 1 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: cat ? `${cat.color}21` : 'var(--surface-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: cat ? cat.color : 'inherit',
                        flexShrink: 0,
                      }}
                    >
                      {getCategoryIcon(txn.category, 18)}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {txn.description}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{txn.date}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: txn.type === 'income' ? '#10b981' : '#f43f5e',
                      flexShrink: 0,
                      marginLeft: 12,
                    }}
                  >
                    {txn.type === 'income' ? '+' : '-'}₹{Math.abs(txn.amount).toLocaleString('en-IN')}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
