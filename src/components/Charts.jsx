import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from 'recharts';
import useStore from '../store/useStore';
import { monthlyData, categories, getCategoryById } from '../data/mockData';

const glassCard = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  backdropFilter: 'blur(12px)',
  borderRadius: 16,
  padding: 20,
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '10px 14px',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: 11, color: p.color, marginBottom: 2 }}>
          {p.name}: ₹{(p.value / 1000).toFixed(1)}k
        </div>
      ))}
    </div>
  );
}

export default function Charts() {
  const transactions = useStore((s) => s.transactions);

  // Spending by category for pie chart
  const expenseByCategory = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + Math.abs(t.amount);
    });

  const pieData = Object.entries(expenseByCategory).map(([id, value]) => {
    const cat = getCategoryById(id);
    return { name: cat?.label || id, value, color: cat?.color || '#888', icon: cat?.icon };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}
      >
        Analytics
      </motion.h1>

      {/* Bar Chart - Monthly Income vs Expenses */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={glassCard}
      >
        <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
          Monthly Income vs Expenses
        </h2>
        <div
          style={{
            transform: 'perspective(800px) rotateX(3deg)',
            transformOrigin: 'bottom center',
          }}
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData} barGap={4}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#065f46" />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#881337" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="income" fill="url(#incomeGrad)" radius={[6, 6, 0, 0]} name="Income" />
              <Bar dataKey="expense" fill="url(#expenseGrad)" radius={[6, 6, 0, 0]} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* 3D shadow floor */}
        <div
          style={{
            height: 6,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
            borderRadius: '0 0 12px 12px',
            marginTop: -2,
          }}
        />
      </motion.div>

      {/* Two-column: Pie + Line */}
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}
        className="sm:!grid-cols-2"
      >
        {/* Pie Chart - Spending Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={glassCard}
        >
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
            Spending Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                animationBegin={300}
                animationDuration={900}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div
                      style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 10,
                        padding: '8px 12px',
                        fontSize: 12,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {d.icon} {d.name}: ₹{d.value.toLocaleString('en-IN')}
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Category labels */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {pieData.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--text-secondary)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Line Chart - Balance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={glassCard}
        >
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
            Balance Trend
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00b4d8" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="income"
                stroke="url(#lineGrad)"
                strokeWidth={2.5}
                dot={{ fill: '#00b4d8', stroke: '#00b4d8', r: 4 }}
                activeDot={{ r: 6,  fill: '#00b4d8' }}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#f43f5e"
                strokeWidth={2}
                strokeDasharray="4 2"
                dot={{ fill: '#f43f5e', stroke: '#f43f5e', r: 3 }}
                activeDot={{ r: 5, fill: '#f43f5e' }}
                name="Expense"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
