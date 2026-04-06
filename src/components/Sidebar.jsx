import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import { Home, BarChart2, CreditCard, Lightbulb, Sparkles, Gem, ShieldCheck, Eye, Moon, Sun } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: <Sparkles size={18} /> },
  { id: 'overview', label: 'Overview', icon: <Home size={18} /> },
  { id: 'charts', label: 'Analytics', icon: <BarChart2 size={18} /> },
  { id: 'transactions', label: 'Transactions', icon: <CreditCard size={18} /> },
  { id: 'insights', label: 'Insights', icon: <Lightbulb size={18} /> },
];

export default function Sidebar({ open, onClose }) {
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const role = useStore((s) => s.role);
  const setRole = useStore((s) => s.setRole);
  const darkMode = useStore((s) => s.darkMode);
  const setDarkMode = useStore((s) => s.setDarkMode);

  const sidebarContent = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '24px 16px',
        gap: 8,
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: 32, 
            height: 32, 
            background: 'linear-gradient(135deg, #0077a8, #00e5ff)', 
            borderRadius: 8, 
            color: '#fff' 
          }}>
            <Gem size={20} />
          </span>
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #0077a8, #00b4d8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SpendWise
          </span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', paddingLeft: 42 }}>
          Smart Money Dashboard
        </div>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (onClose) onClose();
              }}
              whileHover={{ x: 4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 12,
                border: isActive ? (darkMode ? '1px solid rgba(0,180,216,0.3)' : '1px solid rgba(0,180,216,0.12)') : '1px solid transparent',
                background: isActive ? (darkMode ? 'rgba(0,180,216,0.15)' : 'rgba(0,180,216,0.12)') : 'transparent',
                color: isActive ? (darkMode ? '#00e5ff' : '#0077a8') : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: 'left',
                position: 'relative',
                outline: 'none',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', color: 'inherit', strokeWidth: 1.8 }}>{item.icon}</span>
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="sidebarDot"
                  style={{
                    position: 'absolute',
                    right: 12,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#00e5ff',
                    boxShadow: '0 0 8px rgba(0,229,255,0.6)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Role Switcher */}
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 14,
          padding: 14,
          marginBottom: 8,
          border: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          Role
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { id: 'admin', icon: <ShieldCheck size={14} />, label: 'Admin' },
            { id: 'viewer', icon: <Eye size={14} />, label: 'Viewer' },
          ].map((r) => (
            <motion.button
              key={r.id}
              onClick={() => setRole(r.id)}
              whileTap={{ scale: 0.95 }}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                border: role === r.id ? (darkMode ? '1px solid rgba(0,180,216,0.4)' : '1px solid rgba(0,180,216,0.2)') : '1px solid var(--border)',
                background: role === r.id ? (darkMode ? 'rgba(0,180,216,0.2)' : 'rgba(0,180,216,0.1)') : 'var(--surface)',
                color: role === r.id ? (darkMode ? '#00e5ff' : '#0077a8') : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                outline: 'none',
              }}
            >
              {r.icon} {r.label}
            </motion.button>
          ))}
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 8, lineHeight: 1.4 }}>
          {role === 'admin'
            ? 'Full access — add, edit, and delete transactions'
            : 'Read-only — view transactions and analytics'}
        </div>
      </div>

      {/* Dark mode toggle */}
      <motion.button
        onClick={() => setDarkMode(!darkMode)}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '10px 0',
          borderRadius: 12,
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          outline: 'none',
        }}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />} {darkMode ? 'Light Mode' : 'Dark Mode'}
      </motion.button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className="hidden lg:block"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 224,
          height: '100vh',
          background: darkMode ? 'rgba(4,13,26,0.85)' : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(24px)',
          borderRight: darkMode ? '1px solid rgba(0,180,216,0.1)' : '1px solid rgba(109,40,217,0.15)',
          zIndex: 30,
          overflowY: 'auto',
        }}
      >
        {sidebarContent}
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 40,
              }}
            />
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: 240,
                height: '100vh',
                background: 'rgba(15,5,30,0.98)',
                backdropFilter: 'blur(20px)',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                zIndex: 50,
                overflowY: 'auto',
              }}
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
