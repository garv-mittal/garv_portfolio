'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Time updating
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IND');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled && !isMenuOpen ? 'py-4 bg-background/90 backdrop-blur-md border-b border-border/30 shadow-sm' : 'py-8'} ${isMenuOpen ? 'bg-transparent' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center relative z-50">
          <div className="flex flex-col">
            <div className="font-display text-xl tracking-wide uppercase font-medium">
              Garv<span className="opacity-50 ml-1">M.</span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-muted mt-1 hidden md:block">
              {time} {'//'} Software Engineer
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 font-mono text-[10px] uppercase tracking-[0.2em] items-center">
            {['work', 'about', 'contact'].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className="relative group hover-target overflow-hidden pb-1"
              >
                <span className="relative z-10 text-muted group-hover:text-foreground transition-colors duration-300">{item}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              </a>
            ))}
            
            <a 
              href="https://drive.google.com/file/d/1YAtfOmVz-nwEmynJorcjdpivkoW6xemu/view?usp=sharing" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative group hover-target overflow-hidden pb-1 flex items-center gap-2"
            >
              <span className="relative z-10 text-muted group-hover:text-foreground transition-colors duration-300 flex items-center gap-1">
                RESUME
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            </a>

            <ThemeToggle />
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex md:hidden items-center gap-6">
            <ThemeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="font-mono text-[10px] uppercase tracking-widest text-foreground hover-target"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full Page Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col justify-center px-6"
          >
            <div className="flex flex-col gap-6 mt-8">
              {['work', 'about', 'contact'].map((item, i) => (
                <div key={item} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <a 
                      href={`#${item}`} 
                      onClick={() => setIsMenuOpen(false)}
                      className="font-display text-[15vw] leading-[0.85] uppercase tracking-tight text-foreground hover:italic transition-all duration-300 block w-fit hover-target"
                    >
                      {item}
                    </a>
                  </motion.div>
                </div>
              ))}
              
              <div className="overflow-hidden mt-8 md:mt-12">
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '110%' }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                >
                  <a 
                    href="https://drive.google.com/file/d/1YAtfOmVz-nwEmynJorcjdpivkoW6xemu/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm md:text-base uppercase tracking-widest text-foreground hover:text-muted transition-colors duration-300 flex items-center gap-2 w-fit hover-target border border-border px-6 py-3 rounded-full"
                  >
                    Download Resume
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </a>
                </motion.div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-12 font-mono text-[10px] uppercase tracking-widest text-muted"
            >
              {time} {'//'} LUCKNOW, IND
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
