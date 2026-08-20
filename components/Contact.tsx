'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Contact3D from './Contact3D';

function HoverLink({ href, children }: { href: string, children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href={href}
      className="relative flex items-center gap-2 group hover-target overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span 
        className="font-mono text-[10px] tracking-widest uppercase text-muted"
        animate={{ width: isHovered ? 24 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="block h-[1px] bg-foreground w-full"></span>
      </motion.span>
      <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
        {children}
      </span>
    </a>
  );
}

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '0%']);
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(20% 0 0 0)', 'inset(0% 0 0 0)']);

  return (
    <section id="contact" ref={container} className="relative py-32 px-6 md:px-12 max-w-[1600px] mx-auto min-h-[90vh] flex flex-col justify-end overflow-hidden">
      
      <Contact3D />

      <motion.div style={{ y, clipPath }} className="w-full flex flex-col justify-end flex-1 relative z-10">
        
        <div className="flex items-center gap-6 mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted">SYS.TERMINATE // 03 — Contact</span>
          <div className="h-[1px] flex-1 bg-border max-w-xs"></div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-32 cursor-none relative z-10 pointer-events-none">
          <h2 className="font-display text-[14vw] md:text-[10vw] leading-[0.8] tracking-[-0.04em] uppercase text-foreground mix-blend-difference m-0 p-0">
            <span className="block hover:italic transition-all duration-500 pointer-events-auto">Let&apos;s</span>
            <span className="block text-muted md:pl-[8vw] hover:text-foreground hover:italic transition-all duration-500 pointer-events-auto">Talk.</span>
          </h2>
          
          <div className="mt-12 md:mt-0 font-mono text-[10px] md:text-xs tracking-[0.2em] text-foreground uppercase max-w-[280px] leading-relaxed text-left md:text-right mix-blend-difference">
            Always open to discussing new opportunities, innovative architectures, and creative visions.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-border pt-12 text-xs uppercase tracking-widest font-mono">
          <div className="flex flex-col gap-6">
            <span className="text-muted text-[9px] flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Accepting New Connections
            </span>
            <a href="mailto:mittal04garv@gmail.com" className="hover-target text-lg sm:text-2xl lowercase relative w-fit group text-foreground font-body font-medium tracking-tight">
              <span className="relative z-10">mittal04garv@gmail.com</span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-foreground transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full"></span>
            </a>
          </div>
          
          <div className="flex flex-col gap-6 md:items-end">
            <span className="text-muted text-[9px]">External Protocols</span>
            <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end text-muted">
              <HoverLink href="https://github.com/garv-mittal">Github</HoverLink>
              <HoverLink href="https://www.linkedin.com/in/garv-mittal-5243951bb/">LinkedIn</HoverLink>
              <HoverLink href="https://garv-web-portfolio.vercel.app/">Portfolio</HoverLink>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
