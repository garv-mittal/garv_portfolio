'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';

const EXPERIENCE = [
  { company: 'InsightCrew Technologies', role: 'ZOHO Developer Intern', date: 'JAN 2026—APR 2026' },
  { company: 'StuFit Approach Pvt Ltd', role: 'Software Developer Intern', date: 'JUL 2025—SEP 2025' },
  { company: 'HeadStarter.AI', role: 'Ai fellow', date: 'JUL 2024—SEP 2024' },
];

const CAPABILITIES = [
  'Full-Stack Architecture', 'Backend Development', 'React / Next.js', 'Node.js / Express', 'MongoDB / SQL', 'REST APIs', 'TypeScript / JavaScript', 'Python', 'Tailwind CSS'
];

export default function About() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const headingY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" ref={container} className="py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row gap-16 md:gap-24 relative">
        
        {/* Left Column - Image & Ethos */}
        <div className="md:w-5/12 flex flex-col gap-12">
          <div className="font-mono text-[10px] text-muted tracking-widest uppercase flex items-center justify-between border-b border-border pb-4">
            <span>01 // Identity</span>
            <span>SYS.STAT: ONLINE</span>
          </div>
          
          <div className="relative w-full aspect-[4/5] overflow-hidden group rounded-sm bg-border/20">
            <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <Image 
                src="https://picsum.photos/seed/garv123/800/1000" 
                fill 
                className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                alt="Garv Mittal"
                sizes="(max-width: 768px) 100vw, 40vw"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            {/* Tech overlays */}
            <div className="absolute inset-0 border border-border/50 z-10 pointer-events-none" />
            <div className="absolute top-4 left-4 font-mono text-[9px] bg-background/80 backdrop-blur-sm px-2 py-1 text-foreground uppercase z-10">IMG_REF_01</div>
            <div className="absolute bottom-4 right-4 font-mono text-[9px] text-background bg-foreground px-2 py-1 uppercase z-10 hidden group-hover:block transition-all">AUTHORIZED</div>
          </div>

          <div className="font-mono text-xs leading-relaxed uppercase text-muted tracking-widest text-justify">
            Based in India, I am a Full-Stack Software Developer currently pursuing my B.Tech in Computer Science at the University of Lucknow. My focus is on building scalable backend systems, developing AI-powered applications, and engineering robust web architectures that solve complex real-world problems.
          </div>
        </div>

        {/* Right Column - Typography & Experience */}
        <div className="md:w-7/12 flex flex-col">
          <motion.div style={{ y: headingY }}>
            <h2 className="font-display text-4xl sm:text-6xl md:text-[5rem] lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.9] tracking-[-0.02em] mb-24">
              I engineer <span className="italic text-muted">scalable systems</span> and build <span className="italic">AI applications.</span>
            </h2>
          </motion.div>

          <div className="w-full mt-auto">
            <div className="border-b border-border pb-4 mb-4 font-mono text-[10px] uppercase text-muted flex justify-between tracking-widest">
              <span>Selected Experience</span>
              <span>2024—2026</span>
            </div>
            
            <div className="flex flex-col">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="group flex flex-col lg:flex-row lg:items-center justify-between py-8 border-b border-border hover:border-foreground transition-colors duration-500 relative overflow-hidden cursor-none">
                  {/* Animated Background Fill */}
                  <div className="absolute inset-0 bg-foreground scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12 w-full group-hover:text-background transition-colors duration-500 delay-75">
                    <span className="font-display text-3xl sm:text-4xl min-w-[280px] group-hover:italic transition-all duration-500">{exp.company}</span>
                    <span className="font-mono text-xs uppercase tracking-widest opacity-70">{exp.role}</span>
                    <span className="font-mono text-[10px] lg:ml-auto opacity-50 tracking-widest">{exp.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="mt-24">
            <div className="border-b border-border pb-4 mb-8 font-mono text-[10px] uppercase text-muted tracking-widest">
              Core Capabilities
            </div>
            <div className="flex flex-wrap gap-3">
              {CAPABILITIES.map((cap, i) => (
                <div key={i} className="px-5 py-3 border border-border rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300">
                  {cap}
                </div>
              ))}
            </div>
          </div>

          {/* Education & Achievements */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="border-b border-border pb-4 mb-8 font-mono text-[10px] uppercase text-muted tracking-widest">
                Education
              </div>
              <h3 className="font-display text-2xl mb-2 uppercase tracking-tight">University of Lucknow</h3>
              <p className="font-mono text-xs text-muted mb-4 tracking-widest uppercase">B.Tech Computer Science</p>
              <p className="font-mono text-[10px] text-muted tracking-widest">NOV 2022 — PRESENT | SGPA: 8.60</p>
            </div>
            
            <div>
              <div className="border-b border-border pb-4 mb-8 font-mono text-[10px] uppercase text-muted tracking-widest">
                Achievements & Milestones
              </div>
              <ul className="font-mono text-[10px] text-muted tracking-widest uppercase flex flex-col gap-4">
                <li><span className="text-foreground mr-2">{"//"}</span> 100+ LeetCode Solutions</li>
                <li><span className="text-foreground mr-2">{"//"}</span> 150+ GFG DSA Questions (Top 30)</li>
                <li><span className="text-foreground mr-2">{"//"}</span> Samsung Innovation Campus: Big Data</li>
                <li><span className="text-foreground mr-2">{"//"}</span> GDSC WOW & PRISM 2024 Core Volunteer</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
