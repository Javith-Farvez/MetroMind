import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add active class to body for custom cursor hiding default
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target or parent is interactive
      const target = e.target;
      const interactiveEl = target.closest('button, a, input, [data-cursor]');
      
      if (interactiveEl) {
        setIsHovered(true);
        const cursorText = interactiveEl.getAttribute('data-cursor');
        setHoverText(cursorText || '');
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
      {/* Outer Glowing Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.4)] backdrop-blur-[1px]"
        animate={{
          x: mousePos.x - (isHovered ? 28 : 16),
          y: mousePos.y - (isHovered ? 28 : 16),
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          scale: isClicking ? 0.85 : 1,
          backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
          borderColor: isHovered ? 'rgba(34, 211, 238, 0.8)' : 'rgba(6, 182, 212, 0.5)',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 250,
          mass: 0.5,
        }}
      >
        {hoverText && (
          <div className="w-full h-full flex items-center justify-center text-[9px] font-extrabold uppercase tracking-wider text-cyan-300">
            {hoverText}
          </div>
        )}
      </motion.div>

      {/* Inner Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isClicking ? 1.8 : isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? '#38bdf8' : '#22d3ee',
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 400,
          mass: 0.1,
        }}
      />
    </div>
  );
}
