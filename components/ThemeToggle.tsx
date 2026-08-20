'use client';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const THEMES = [
  { id: 'theme-paper', label: 'LIGHT' },
  { id: 'theme-carbon', label: 'DARK' },
];

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState('theme-paper');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
      const savedTheme = localStorage.getItem('theme') || 'theme-paper';
      setCurrentTheme(savedTheme);
    });
  }, []);

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'theme-paper' ? 'theme-carbon' : 'theme-paper';
    
    document.documentElement.classList.remove('theme-carbon', 'theme-paper');
    document.documentElement.classList.add(nextTheme);
    
    localStorage.setItem('theme', nextTheme);
    setCurrentTheme(nextTheme);
  };

  if (!mounted) return <div className="w-[72px] h-6"></div>;

  return (
    <button 
      onClick={toggleTheme}
      className="group hover-target flex items-center gap-3 cursor-none"
      aria-label="Toggle theme"
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted group-hover:text-foreground transition-colors duration-500 w-[42px] text-right pt-[1px]">
        {currentTheme === 'theme-carbon' ? 'DARK' : 'LIGHT'}
      </span>
      
      {/* Geometric Eclipse Icon */}
      <motion.div 
        className="relative w-5 h-5 rounded-full border border-muted group-hover:border-foreground transition-colors duration-500 overflow-hidden flex items-center justify-center shrink-0"
        animate={{ rotate: currentTheme === 'theme-carbon' ? -90 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Background fill for Moon */}
        <motion.div
          className="absolute inset-0 bg-foreground rounded-full"
          initial={false}
          animate={{
            y: currentTheme === 'theme-carbon' ? 0 : '100%',
            opacity: currentTheme === 'theme-carbon' ? 1 : 0
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        
        {/* Cutout for Moon (creates the crescent by matching the document background) */}
        <motion.div
          className="absolute w-[130%] h-[130%] bg-background rounded-full"
          initial={false}
          animate={{
            x: currentTheme === 'theme-carbon' ? '25%' : '100%',
            y: currentTheme === 'theme-carbon' ? '-25%' : '-100%',
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        
        {/* Center dot for Sun */}
        <motion.div
          className="absolute w-1.5 h-1.5 bg-foreground rounded-full"
          initial={false}
          animate={{
            scale: currentTheme === 'theme-paper' ? 1 : 0,
            opacity: currentTheme === 'theme-paper' ? 1 : 0
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </motion.div>
    </button>
  );
}
