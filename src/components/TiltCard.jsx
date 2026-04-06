import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration]);
  return value;
}

export default function TiltCard({ title, amount, subtitle, icon, gradient, glowColor, delay = 0 }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 25 });

  const displayAmount = useCountUp(Math.abs(amount));

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mx = e.clientX - centerX;
    const my = e.clientY - centerY;
    rotateX.set((my / (rect.height / 2)) * -12);
    rotateY.set((mx / (rect.width / 2)) * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  const sparklineData = [40, 65, 35, 80, 55, 90, 70];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          background: gradient,
          borderRadius: 20,
          padding: '24px 20px',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: hovered
            ? `0 20px 60px ${glowColor}55, 0 0 40px ${glowColor}33`
            : `0 8px 32px rgba(0,0,0,0.3)`,
          transition: 'box-shadow 0.3s ease',
          minHeight: 170,
        }}
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Floating orb */}
        <div
          style={{
            position: 'absolute',
            right: -16,
            top: -16,
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
            filter: 'blur(20px)',
            opacity: 0.2,
            pointerEvents: 'none',
          }}
        />

        {/* Shine sweep on hover */}
        {hovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        )}

        {/* Icon badge */}
        <motion.div
          animate={hovered ? { rotate: 15, scale: 1.2 } : { rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            zIndex: 3,
          }}
        >
          {icon}
        </motion.div>

        {/* Label */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 8,
          }}
        >
          {title}
        </div>

        {/* Amount */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 4,
          }}
        >
          ₹{displayAmount.toLocaleString('en-IN')}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          {subtitle}
        </div>

        {/* Mini sparkline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 3,
            marginTop: 16,
            height: 28,
          }}
        >
          {sparklineData.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: delay + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
              style={{
                flex: 1,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.25)',
                minHeight: 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
