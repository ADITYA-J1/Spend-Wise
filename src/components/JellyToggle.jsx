import { motion } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import useStore from '../store/useStore';

export default function JellyToggle({ value, onChange }) {
  const isIncome = value === 'income';
  const darkMode = useStore((s) => s.darkMode);

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
        boxShadow: darkMode
          ? 'inset 0 2px 8px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)'
          : 'inset 0 2px 8px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(12px)',
        borderRadius: 16,
        padding: 6,
        width: 260,
        height: 52,
      }}
    >
      {/* Sliding blob */}
      <motion.div
        layout
        animate={{
          left: isIncome ? 6 : '50%',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.8 }}
        style={{
          position: 'absolute',
          top: 6,
          width: 'calc(50% - 6px)',
          height: 'calc(100% - 12px)',
          borderRadius: 12,
          background: isIncome
            ? 'linear-gradient(135deg, #10b981, #059669)'
            : 'linear-gradient(135deg, #f43f5e, #e11d48)',
          boxShadow: isIncome
            ? '0 4px 20px rgba(16,185,129,0.5), 0 0 40px rgba(16,185,129,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
            : '0 4px 20px rgba(244,63,94,0.5), 0 0 40px rgba(244,63,94,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
          zIndex: 0,
        }}
      />

      {/* Income button */}
      <JellyButton
        active={isIncome}
        onClick={() => onChange('income')}
        label="Income"
        icon={<ArrowUpCircle size={16} />}
        darkMode={darkMode}
      />

      {/* Expense button */}
      <JellyButton
        active={!isIncome}
        onClick={() => onChange('expense')}
        label="Expenses"
        icon={<ArrowDownCircle size={16} />}
        darkMode={darkMode}
      />
    </div>
  );
}

function JellyButton({ active, onClick, label, icon, darkMode }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.92, y: 2 }}
      style={{
        position: 'relative',
        zIndex: 1,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 12,
        color: active ? '#fff' : (darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'),
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        fontWeight: 600,
        textShadow: active ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
        outline: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Ripple pulse on active side */}
      {active && (
        <motion.div
          animate={{ opacity: [0.4, 0], scale: [0.8, 1.15] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.15)',
            pointerEvents: 'none',
          }}
        />
      )}
      <motion.span
        animate={{ scale: active ? 1.15 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        style={{ fontSize: 16 }}
      >
        {icon}
      </motion.span>
      {label}
    </motion.button>
  );
}
