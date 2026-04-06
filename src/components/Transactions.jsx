import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import JellyToggle from './JellyToggle';
import { categories, getCategoryById, getCategoryIcon } from '../data/mockData';
import { Pencil, Trash2, SearchX } from 'lucide-react';

export default function Transactions() {
  const role = useStore((s) => s.role);
  const transactionView = useStore((s) => s.transactionView);
  const setTransactionView = useStore((s) => s.setTransactionView);
  const searchQuery = useStore((s) => s.searchQuery);
  const setSearchQuery = useStore((s) => s.setSearchQuery);
  const filterCategory = useStore((s) => s.filterCategory);
  const setFilterCategory = useStore((s) => s.setFilterCategory);
  const sortBy = useStore((s) => s.sortBy);
  const setSortBy = useStore((s) => s.setSortBy);
  const sortDir = useStore((s) => s.sortDir);
  const setSortDir = useStore((s) => s.setSortDir);
  const getFiltered = useStore((s) => s.getFiltered);
  const addTransaction = useStore((s) => s.addTransaction);
  const editTransaction = useStore((s) => s.editTransaction);
  const deleteTransaction = useStore((s) => s.deleteTransaction);

  const filtered = getFiltered();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  const totalAmount = filtered.reduce((a, t) => a + Math.abs(t.amount), 0);

  const openAddModal = () => {
    setEditingTxn(null);
    setForm({
      description: '',
      amount: '',
      category: 'food',
      type: transactionView,
      date: new Date().toISOString().split('T')[0],
    });
    setModalOpen(true);
  };

  const openEditModal = (txn) => {
    setEditingTxn(txn);
    setForm({
      description: txn.description,
      amount: Math.abs(txn.amount).toString(),
      category: txn.category,
      type: txn.type,
      date: txn.date,
    });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    const amt = parseFloat(form.amount);
    if (!form.description || isNaN(amt)) return;
    const finalAmount = form.type === 'expense' ? -Math.abs(amt) : Math.abs(amt);

    if (editingTxn) {
      editTransaction(editingTxn.id, {
        description: form.description,
        amount: finalAmount,
        category: form.category,
        type: form.type,
        date: form.date,
      });
    } else {
      addTransaction({
        description: form.description,
        amount: finalAmount,
        category: form.category,
        type: form.type,
        date: form.date,
      });
    }
    setModalOpen(false);
  };

  // Close modal when switching to viewer
  if (role === 'viewer' && modalOpen) setModalOpen(false);

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid var(--border)',
    background: 'var(--surface-hover)',
    color: 'var(--text-primary)',
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>Transactions</h1>
        {role === 'admin' && (
          <motion.button
            onClick={openAddModal}
            whileTap={{ scale: 0.92, rotate: -5 }}
            whileHover={{ scale: 1.05 }}
            style={{
              padding: '10px 20px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #0077a8, #00b4d8)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,180,216,0.4)',
            }}
          >
            ＋ Add
          </motion.button>
        )}
      </motion.div>

      {/* Jelly Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <JellyToggle value={transactionView} onChange={setTransactionView} />
      </motion.div>

      {/* Search + Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 180,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 12,
              fontSize: 14,
              pointerEvents: 'none',
              opacity: 0.4,
            }}
          >
            <SearchX size={16} />
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions..."
            style={{
              ...inputStyle,
              paddingLeft: 36,
              background: 'var(--surface)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            ...inputStyle,
            width: 'auto',
            minWidth: 140,
            background: 'var(--surface)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {getCategoryIcon(c.id, 14)} {c.label}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Sort bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}
      >
        <span style={{ color: 'var(--text-secondary)' }}>Sort:</span>
        {['date', 'amount'].map((s) => (
          <button
            key={s}
            onClick={() => {
              if (sortBy === s) {
                setSortDir(sortDir === 'desc' ? 'asc' : 'desc');
              } else {
                setSortBy(s);
                setSortDir('desc');
              }
            }}
            style={{
              padding: '5px 12px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: sortBy === s ? 'rgba(0,180,216,0.4)' : 'var(--border)',
              background: sortBy === s ? 'rgba(0,180,216,0.15)' : 'var(--surface)',
              color: sortBy === s ? '#00e5ff' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 12,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)} {sortBy === s ? (sortDir === 'desc' ? '↓' : '↑') : ''}
          </button>
        ))}

        {/* Total */}
        <div
          style={{
            marginLeft: 'auto',
            fontSize: 13,
            fontWeight: 700,
            color: transactionView === 'income' ? '#10b981' : '#f43f5e',
          }}
        >
          Total: ₹{totalAmount.toLocaleString('en-IN')}
        </div>
      </motion.div>

      {/* Transaction list */}
      <div
        style={{
          maxHeight: 420,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          paddingRight: 4,
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                textAlign: 'center',
                padding: 40,
                color: 'rgba(255,255,255,0.35)',
                fontSize: 14,
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12, display: 'flex', justifyContent: 'center' }}><SearchX size={40} strokeWidth={1.5} /></div>
              <div>No transactions found</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Try adjusting your filters</div>
            </motion.div>
          ) : (
            filtered.map((txn, i) => (
              <TransactionRow
                key={txn.id}
                txn={txn}
                index={i}
                role={role}
                onEdit={() => openEditModal(txn)}
                onDelete={() => deleteTransaction(txn.id)}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              padding: 16,
            }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: 420,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: 24,
                backdropFilter: 'blur(20px)',
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>
                {editingTxn ? 'Edit Transaction' : 'Add Transaction'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>Description</label>
                  <input
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Enter description"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>Amount (₹)</label>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    placeholder="0"
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      style={inputStyle}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{getCategoryIcon(c.id, 14)} {c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      style={inputStyle}
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4, display: 'block' }}>Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 22, justifyContent: 'flex-end' }}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 10,
                    border: '1px solid var(--border)',
                    background: 'var(--surface-hover)',
                    color: 'var(--text-primary)',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  style={{
                    padding: '10px 24px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #0077a8, #00b4d8)',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: '0 4px 16px rgba(0,180,216,0.3)',
                  }}
                >
                  {editingTxn ? 'Update' : 'Add'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TransactionRow({ txn, index, role, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const cat = getCategoryById(txn.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 14px',
        borderRadius: 14,
        background: hovered ? 'var(--surface-hover)' : 'var(--surface)',
        border: '1px solid',
        borderColor: hovered ? 'var(--border-hover)' : 'var(--border)',
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      {/* Category icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: cat ? `${cat.color}21` : 'var(--surface-hover)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: cat ? cat.color : 'var(--text-secondary)',
          flexShrink: 0,
        }}
      >
        {getCategoryIcon(txn.category, 20)}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
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
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
          {cat?.label} · {txn.date}
        </div>
      </div>

      {/* Amount */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: txn.type === 'income' ? '#10b981' : '#f43f5e',
          }}
        >
          {txn.type === 'income' ? '+' : '-'}₹{Math.abs(txn.amount).toLocaleString('en-IN')}
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'capitalize' }}>
          {txn.type}
        </div>
      </div>

      {/* Admin actions */}
      {role === 'admin' && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'flex', gap: 4, flexShrink: 0 }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Edit"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: '1px solid rgba(244,63,94,0.2)',
                  background: 'rgba(244,63,94,0.1)',
                  cursor: 'pointer',
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
