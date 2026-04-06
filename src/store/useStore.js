import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { transactions as mockTransactions, getCategoryById } from '../data/mockData';

const useStore = create(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: 'admin',
      darkMode: true,
      activeTab: 'home',
      transactionView: 'expense',
      searchQuery: '',
      filterCategory: 'all',
      sortBy: 'date',
      sortDir: 'desc',

      setRole: (role) => set({ role }),
      setDarkMode: (darkMode) => set({ darkMode }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setTransactionView: (transactionView) => set({ transactionView }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilterCategory: (filterCategory) => set({ filterCategory }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortDir: (sortDir) => set({ sortDir }),

      addTransaction: (txn) =>
        set((state) => ({
          transactions: [{ ...txn, id: Date.now() }, ...state.transactions],
        })),

      editTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      getFiltered: () => {
        const { transactions, searchQuery, filterCategory, sortBy, sortDir, transactionView } = get();
        let filtered = transactions.filter((t) => t.type === transactionView);

        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q)
          );
        }

        if (filterCategory !== 'all') {
          filtered = filtered.filter((t) => t.category === filterCategory);
        }

        filtered.sort((a, b) => {
          let cmp = 0;
          if (sortBy === 'date') {
            cmp = new Date(a.date) - new Date(b.date);
          } else {
            cmp = Math.abs(a.amount) - Math.abs(b.amount);
          }
          return sortDir === 'desc' ? -cmp : cmp;
        });

        return filtered;
      },
    }),
    {
      name: 'spendwise-dash',
    }
  )
);

export default useStore;
