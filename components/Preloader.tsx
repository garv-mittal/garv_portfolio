'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const GREETINGS = ['Hello', 'Hola', 'Bonjour', 'Namaste', 'नमस्ते'];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    // Cycle through greetings with an initial delay so "Hello" is readable
    let interval: NodeJS.Timeout;
    const initialDelay = setTimeout(() => {
      interval = setInterval(() => {
        setIndex((prev) => {
          if (prev >= GREETINGS.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 400); // fast cycle for remaining greetings
    }, 800); // 800ms pause for the first greeting
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, 3000);
    
    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timer);
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center text-foreground font-display text-3xl md:text-5xl tracking-[0.1em] uppercase"
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center gap-4 md:gap-6 overflow-hidden py-6 px-2">
            <motion.div 
              className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-foreground"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.span 
              className="block italic font-medium min-w-[200px] leading-relaxed"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              {GREETINGS[index]}
            </motion.span>
          </div>
          
          <div className="absolute bottom-12 overflow-hidden">
            <motion.div 
              className="w-32 sm:w-48 h-[1px] bg-muted/20 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="absolute top-0 left-0 h-full bg-foreground"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
