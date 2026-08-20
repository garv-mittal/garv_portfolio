'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';

const PROJECTS = [
  {
    id: '01',
    name: 'MindSpace 3',
    year: '2025',
    category: 'AI Application',
    description:
      "Fully functional AI therapist agent providing customized sessions based on the user's mood with dynamic and peaceful UI.",
    role: 'Full-Stack Developer',
    tech: 'Next.js, Gemini API, MongoDB, Tailwind',
    image: '/mindspace.png',
    link: 'https://mind-space-3-0-frontend.vercel.app/',
  },
  {
    id: '02',
    name: 'LU-CONNECT',
    year: '2026',
    category: 'Placement Platform',
    description:
      'Comprehensive placement platform for students to apply to their desired opening as well as a Resume analyser along with HR Prep module',
    role: 'Full Stack Engineer',
    tech: 'Next.js, Tailwind, Three.js, Framer',
    image: '/luconnect.png',
    link: 'https://lu-connect.avsingh.tech/',
  },
  {
    id: '03',
    name: 'Vid-Tube',
    year: '2025',
    category: 'Backend System',
    description:
      'Scalable backend for a YouTube-like platform managing user authentication, video management, and user interactions.',
    role: 'Backend Developer',
    tech: 'Node.js, Express, MongoDB, JWT',
    image: '/vidtube.png',
    link: 'https://github.com/garv-mittal/Vid_Tube_Backend',
  },
  {
    id: '04',
    name: 'ConceptLensAI',
    year: '2025',
    category: 'EdTech Platform',
    description:
      'Learning gap diagnosis system utilizing fundamental concept-based questioning and revision assistance for interview prep.',
    role: 'Full-Stack Developer',
    tech: 'React, TypeScript, Gemini, Node.js',
    image: '/conceptlens.png',
    link: 'https://concept-lens-ai.vercel.app/',
  },
];

type Project = (typeof PROJECTS)[number];

function ProjectItem({ project }: { project: Project }) {
  return (
    <div
      className="
        w-screen
        h-screen
        flex-shrink-0
        px-6
        md:px-12
        pt-[115px]
        md:pt-[130px]
        pb-[80px]
        md:pb-[95px]
        overflow-hidden
      "
    >
      <div
        className="
          max-w-[1600px]
          w-full
          mx-auto
          flex
          flex-col
        "
      >
        {/* PROJECT INFORMATION */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-between
            items-start
            md:items-end
            gap-5
            md:gap-6
            mb-5
            md:mb-6
            relative
            z-10
          "
        >
          <div className="max-w-3xl">
            {/* Metadata */}
            <div
              className="
                flex
                items-center
                gap-4
                mb-4
                md:mb-5
                text-[10px]
                uppercase
                tracking-[0.2em]
                font-mono
                text-muted
              "
            >
              <span className="text-foreground">
                {project.id}
              </span>

              <div className="w-8 h-[1px] bg-border" />

              <span>{project.year}</span>
              <span>/</span>
              <span>{project.category}</span>
            </div>

            {/* Title */}
            <h3
              className="
                font-display
                text-5xl
                md:text-7xl
                lg:text-[7rem]
                tracking-tight
                mb-4
                md:mb-5
                uppercase
                leading-[0.85]
                text-foreground
              "
            >
              {project.name}
            </h3>

            {/* Description */}
            <p
              className="
                text-xs
                md:text-sm
                leading-relaxed
                max-w-md
                text-foreground/70
                font-mono
                tracking-[0.05em]
                uppercase
              "
            >
              {project.description}
            </p>
          </div>

          {/* ROLE / TECH */}

          <div
            className="
              text-[10px]
              font-mono
              uppercase
              tracking-[0.2em]
              flex
              flex-col
              gap-2
              md:text-right
              text-muted
              shrink-0
              md:pb-1
            "
          >
            <p>
              <span className="text-foreground/40 mr-2">
                ROLE_
              </span>

              <span className="text-foreground">
                {project.role}
              </span>
            </p>

            <p>
              <span className="text-foreground/40 mr-2">
                TECH_
              </span>

              <span className="text-foreground">
                {project.tech}
              </span>
            </p>
          </div>
        </div>

        {/* PROJECT IMAGE */}

        <div
          className="
            relative
            w-full
            aspect-[12/5]
            max-h-[calc(100svh-400px)]
            mb-6
            md:mb-8
            shrink-0
            overflow-hidden
            group
            rounded-sm
            border
            border-border
          "
        >
          <a
            href={project.link}
            className="
              absolute
              inset-0
              z-20
              hover-target
            "
            aria-label={`View ${project.name}`}
          >
            <span className="sr-only">
              View {project.name}
            </span>
          </a>

          <Image
            src={project.image}
            alt={project.name}
            fill
            priority={project.id === '01'}
            className="
              object-cover
              transition-all
              duration-[1.5s]
              ease-[cubic-bezier(0.19,1,0.22,1)]
              group-hover:scale-105
              filter
              grayscale
              group-hover:grayscale-0
            "
            sizes="100vw"
          />

          {/* Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-background/20
              transition-opacity
              duration-700
              group-hover:bg-background/0
              pointer-events-none
              mix-blend-overlay
            "
          />

          {/* Technical grid */}
          <div
            className="
              absolute
              top-0
              bottom-0
              left-1/3
              w-[1px]
              bg-foreground/10
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              top-0
              bottom-0
              right-1/3
              w-[1px]
              bg-foreground/10
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              left-0
              right-0
              top-1/2
              h-[1px]
              bg-foreground/10
              pointer-events-none
            "
          />

          {/* Image reference */}
          <div
            className="
              absolute
              top-4
              left-4
              z-10
              text-[9px]
              font-mono
              tracking-[0.2em]
              uppercase
              text-white/60
              pointer-events-none
            "
          >
            IMG_REF_{project.id}
          </div>

          {/* Project indicator */}
          <div
            className="
              absolute
              bottom-4
              right-4
              z-10
              text-[9px]
              font-mono
              tracking-[0.2em]
              uppercase
              text-white/60
              pointer-events-none
            "
          >
            VIEW_PROJECT →
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(PROJECTS.length - 1) * 100}vw`]
  );

  return (
    <section
      id="work"
      ref={targetRef}
      className="relative"
      style={{
        height: `${PROJECTS.length * 100}vh`,
      }}
    >
      <div
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
          bg-background
        "
      >
        {/* SECTION LABEL */}

        <div
          className="
            absolute
            top-[76px]
            md:top-[84px]
            left-6
            md:left-12
            z-30
            pointer-events-none
          "
        >
          <div className="flex items-center gap-6">
            <span
              className="
                text-[10px]
                md:text-xs
                uppercase
                tracking-[0.3em]
                text-muted
                whitespace-nowrap
              "
            >
              ( 02 — Selected Works )
            </span>

            <div className="h-[1px] w-16 md:w-24 bg-border" />
          </div>
        </div>

        {/* HORIZONTAL PROJECT TRACK */}

        <motion.div
          style={{ x }}
          className="
            flex
            h-full
            will-change-transform
          "
        >
          {PROJECTS.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
            />
          ))}
        </motion.div>

        {/* SCROLL PROGRESS */}

        <div
          className="
            absolute
            bottom-6
            md:bottom-8
            left-6
            md:left-12
            right-6
            md:right-12
            z-30
            flex
            items-center
            gap-4
            max-w-[1600px]
            mx-auto
            pointer-events-none
          "
        >
          <div
            className="
              text-[10px]
              font-medium
              tracking-widest
              uppercase
              text-muted
            "
          >
            01
          </div>

          <div
            className="
              h-[1px]
              flex-1
              bg-border
              relative
              overflow-hidden
            "
          >
            <motion.div
              className="
                absolute
                top-0
                left-0
                bottom-0
                bg-foreground
                origin-left
              "
              style={{
                scaleX: scrollYProgress,
              }}
            />
          </div>

          <div
            className="
              text-[10px]
              font-medium
              tracking-widest
              uppercase
              text-muted
            "
          >
            0{PROJECTS.length}
          </div>
        </div>
      </div>
    </section>
  );
}