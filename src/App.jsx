import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from './store/useStore';
import ParticleBackground from './components/ParticleBackground';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Overview from './components/Overview';
import Transactions from './components/Transactions';
import Charts from './components/Charts';
import Insights from './components/Insights';
import { Home as HomeIcon, BarChart2, CreditCard, Lightbulb, Sparkles, Download, Loader, User, Menu } from 'lucide-react';

const pageTransitions = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, filter: 'blur(4px)' },
  transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
};

function App() {
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const darkMode = useStore((s) => s.darkMode);
  const transactions = useStore((s) => s.transactions);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Keyboard shortcut to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExportCSV = () => {
    setExporting(true);
    
    setTimeout(() => {
      // Generate CSV
      const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
      const rows = transactions.map(t => 
        [t.date, `"${t.description.replace(/"/g, '""')}"`, t.category, t.type, Math.abs(t.amount)]
      );
      
      const csvContent = [
        headers.join(','),
        ...rows.map(r => r.join(','))
      ].join('\n');
      
      // Download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'spendwise-export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setExporting(false);
    }, 600);
  };

  const currentTabName = {
    home: 'Home',
    overview: 'Overview',
    charts: 'Analytics',
    transactions: 'Transactions',
    insights: 'Insights',
  }[activeTab];

  const isHome = activeTab === 'home';

  return (
    <div
      className={darkMode ? 'dark' : 'light'}
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <ParticleBackground darkMode={darkMode} />
      
      <Sidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 10,
        }}
        className="lg:ml-[224px]"
      >
        {/* Top Header */}
        <header
          style={{
            position: isHome ? 'absolute' : 'relative',
            top: isHome ? 0 : undefined,
            left: isHome ? 0 : undefined,
            right: isHome ? 0 : undefined,
            zIndex: isHome ? 20 : undefined,
            flexShrink: isHome ? undefined : 0,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            background: isHome ? 'transparent' : (darkMode ? 'rgba(4,13,26,0.8)' : 'rgba(248,247,255,0.8)'),
            backdropFilter: isHome ? 'none' : 'blur(12px)',
            borderBottom: isHome ? 'none' : (darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)'),
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Hamburger (Mobile) */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                width: 40,
                height: 40,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              <Menu size={20} />
            </button>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: isHome ? (darkMode ? '#fff' : '#0f0a1e') : 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center' }}>
              {isHome ? 'SpendWise' : currentTabName}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleExportCSV}
              disabled={exporting}
              title="Export to CSV"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: exporting ? 'wait' : 'pointer',
              }}
            >
              {exporting ? <Loader size={16} className="animate-spin" /> : <Download size={16} />}
            </motion.button>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0077a8, #00b4d8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <User size={18} />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: 0,
          }}
        >
          {isHome ? (
            <Home />
          ) : (
            <div style={{ padding: '24px', maxWidth: 896, margin: '0 auto', width: '100%', paddingBottom: 100 }}>
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div key="overview" {...pageTransitions}>
                    <Overview />
                  </motion.div>
                )}
                {activeTab === 'charts' && (
                  <motion.div key="charts" {...pageTransitions}>
                    <Charts />
                  </motion.div>
                )}
                {activeTab === 'transactions' && (
                  <motion.div key="transactions" {...pageTransitions}>
                    <Transactions />
                  </motion.div>
                )}
                {activeTab === 'insights' && (
                  <motion.div key="insights" {...pageTransitions}>
                    <Insights />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </main>

        {/* Mobile Bottom Navigation */}
        <div
          className="lg:hidden"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: darkMode ? 'rgba(10,5,20,0.95)' : 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            borderTop: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,180,216,0.12)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '10px 8px 20px 8px', // Extra padding bottom for home indicator
            zIndex: 40,
          }}
        >
          {[
            { id: 'overview', icon: <HomeIcon size={20} />, label: 'Overview' },
            { id: 'charts', icon: <BarChart2 size={20} />, label: 'Charts' },
            { id: 'transactions', icon: <CreditCard size={20} />, label: 'Txns' },
            { id: 'insights', icon: <Lightbulb size={20} />, label: 'Insights' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: isActive ? (darkMode ? '#00e5ff' : '#0077a8') : 'var(--text-muted)',
                  position: 'relative',
                  padding: '8px 12px',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <motion.div
                    animate={{ scale: isActive ? 1.25 : 1, y: isActive ? -2 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    style={{ marginBottom: 4 }}
                  >
                    {item.icon}
                  </motion.div>
                </div>
                <span style={{ fontSize: 9, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileTab"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      width: 20,
                      height: 3,
                      background: '#00e5ff',
                      borderRadius: 2,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
