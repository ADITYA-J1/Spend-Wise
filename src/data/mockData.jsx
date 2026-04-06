import { UtensilsCrossed, Car, ShoppingBag, Gamepad2, Pill, Zap, Briefcase, Monitor, TrendingUp, Smartphone, CreditCard } from 'lucide-react';

export const categories = [
  { id: 'food',          label: 'Food & Dining',  color: '#f97316' },
  { id: 'transport',     label: 'Transport',       color: '#3b82f6' },
  { id: 'shopping',      label: 'Shopping',        color: '#ec4899' },
  { id: 'entertainment', label: 'Entertainment',   color: '#8b5cf6' },
  { id: 'health',        label: 'Health',          color: '#10b981' },
  { id: 'utilities',     label: 'Utilities',       color: '#f59e0b' },
  { id: 'salary',        label: 'Salary',          color: '#06b6d4' },
  { id: 'freelance',     label: 'Freelance',       color: '#84cc16' },
  { id: 'investment',    label: 'Investment',      color: '#6366f1' },
  { id: 'recharge',      label: 'Recharge',        color: '#f43f5e' },
];

export const getCategoryIcon = (id, size = 18) => {
  const map = {
    food:          <UtensilsCrossed size={size} />,
    transport:     <Car size={size} />,
    shopping:      <ShoppingBag size={size} />,
    entertainment: <Gamepad2 size={size} />,
    health:        <Pill size={size} />,
    utilities:     <Zap size={size} />,
    salary:        <Briefcase size={size} />,
    freelance:     <Monitor size={size} />,
    investment:    <TrendingUp size={size} />,
    recharge:      <Smartphone size={size} />,
  };
  return map[id] || <CreditCard size={size} />;
};

export const getCategoryById = (id) => categories.find(c => c.id === id);

export const transactions = [
  { id: 1,  date: '2024-11-28', amount: -1250,  category: 'food',          description: 'Fine dining at Taj Palace',    type: 'expense' },
  { id: 2,  date: '2024-11-27', amount: -3500,  category: 'shopping',      description: 'Winter jacket from Zara',      type: 'expense' },
  { id: 3,  date: '2024-11-26', amount: 75000,  category: 'salary',        description: 'November salary credit',       type: 'income'  },
  { id: 4,  date: '2024-11-25', amount: -800,   category: 'transport',     description: 'Uber rides this week',         type: 'expense' },
  { id: 5,  date: '2024-11-24', amount: -2100,  category: 'entertainment', description: 'Concert tickets - Coldplay',   type: 'expense' },
  { id: 6,  date: '2024-11-22', amount: 15000,  category: 'freelance',     description: 'Logo design project',          type: 'income'  },
  { id: 7,  date: '2024-11-20', amount: -450,   category: 'health',        description: 'Monthly gym membership',       type: 'expense' },
  { id: 8,  date: '2024-11-18', amount: -1800,  category: 'utilities',     description: 'Electricity bill payment',     type: 'expense' },
  { id: 9,  date: '2024-11-15', amount: 25000,  category: 'investment',    description: 'Mutual fund returns',          type: 'income'  },
  { id: 10, date: '2024-11-12', amount: -499,   category: 'recharge',      description: 'Jio annual recharge plan',     type: 'expense' },
  { id: 11, date: '2024-11-10', amount: -650,   category: 'food',          description: 'Swiggy orders this week',      type: 'expense' },
  { id: 12, date: '2024-11-08', amount: -4200,  category: 'shopping',      description: 'Amazon electronics haul',      type: 'expense' },
  { id: 13, date: '2024-11-05', amount: 8000,   category: 'freelance',     description: 'UI/UX consultation fee',       type: 'income'  },
  { id: 14, date: '2024-10-30', amount: -1500,  category: 'entertainment', description: 'Netflix + Spotify annual',     type: 'expense' },
  { id: 15, date: '2024-10-28', amount: 72000,  category: 'salary',        description: 'October salary credit',        type: 'income'  },
  { id: 16, date: '2024-10-25', amount: -950,   category: 'transport',     description: 'Metro card recharge',          type: 'expense' },
  { id: 17, date: '2024-10-22', amount: -2800,  category: 'health',        description: 'Doctor visit + medicines',     type: 'expense' },
  { id: 18, date: '2024-10-20', amount: -1200,  category: 'utilities',     description: 'Water + gas bill',             type: 'expense' },
  { id: 19, date: '2024-10-18', amount: 12000,  category: 'investment',    description: 'Stock dividend payout',        type: 'income'  },
  { id: 20, date: '2024-10-15', amount: -350,   category: 'recharge',      description: 'Airtel broadband bill',        type: 'expense' },
  { id: 21, date: '2024-10-12', amount: -1800,  category: 'food',          description: 'Birthday dinner celebration',  type: 'expense' },
  { id: 22, date: '2024-10-08', amount: 5000,   category: 'freelance',     description: 'Blog writing payment',         type: 'income'  },
  { id: 23, date: '2024-10-05', amount: -6500,  category: 'shopping',      description: 'Furniture for home office',    type: 'expense' },
  { id: 24, date: '2024-10-03', amount: -299,   category: 'entertainment', description: 'Mobile game purchase',         type: 'expense' },
  { id: 25, date: '2024-10-01', amount: -1100,  category: 'transport',     description: 'Car fuel + servicing',         type: 'expense' },
];

export const monthlyData = [
  { month: 'Jun', income: 14200, expense: 8100 },
  { month: 'Jul', income: 15800, expense: 9200 },
  { month: 'Aug', income: 13500, expense: 7800 },
  { month: 'Sep', income: 16900, expense: 10200 },
  { month: 'Oct', income: 18200, expense: 11500 },
  { month: 'Nov', income: 19950, expense: 12404 },
];
