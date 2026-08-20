'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'motion/react';

import Hero3D from './Hero3D';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

/* =========================================================
   SCRAMBLE TEXT
========================================================= */

function ScrambleText({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const [displayText, setDisplayText] = useState(
    text.replace(/[A-Z0-9]/gi, '-')
  );

  const [isAnimating, setIsAnimating] = useState(false);

  const triggerRef = useRef<() => void>(() => {});

  useEffect(() => {
    triggerRef.current = () => {
      if (isAnimating) return;

      setIsAnimating(true);

      let iteration = 0;

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((letter, index) => {
              if (letter === ' ') return ' ';

              if (index < iteration) {
                return text[index];
              }

              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsAnimating(false);
        }

        iteration += 1 / 3;
      }, 30);
    };
  }, [isAnimating, text]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      triggerRef.current();
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, text]);

  return (
    <span
      onMouseEnter={() => triggerRef.current()}
      className="inline-block hover:opacity-80 transition-opacity"
    >
      {displayText}
    </span>
  );
}

/* =========================================================
   MAGNETIC BUTTON
========================================================= */

function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const x = useSpring(0, {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  });

  const y = useSpring(0, {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="
        relative
        px-8
        py-4
        rounded-full
        border
        border-border
        bg-background/50
        backdrop-blur-md
        text-xs
        uppercase
        tracking-[0.2em]
        font-mono
        hover-target
        overflow-hidden
        group
        inline-block
        cursor-none
      "
    >
      <span
        className="
          relative
          z-10
          text-foreground
          group-hover:text-background
          transition-colors
          duration-500
          delay-100
          mix-blend-difference
        "
      >
        {children}
      </span>

      <div
        className="
          absolute
          inset-0
          bg-foreground
          translate-y-[100%]
          rounded-full
          group-hover:translate-y-0
          transition-transform
          duration-500
          ease-[cubic-bezier(0.19,1,0.22,1)]
        "
      />
    </motion.a>
  );
}

/* =========================================================
   NETWORK TYPES
========================================================= */

type NetworkInformation = {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  type?: string;
  saveData?: boolean;
  addEventListener?: (
    type: string,
    listener: EventListenerOrEventListenerObject
  ) => void;
  removeEventListener?: (
    type: string,
    listener: EventListenerOrEventListenerObject
  ) => void;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
};

type Metrics = {
  status: string;
  type: string;
  speed: string;
  rtt: string;
};

/* =========================================================
   LIVE NETWORK TELEMETRY
========================================================= */

function LiveMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    status: 'CONNECTING',
    type: '—',
    speed: '—',
    rtt: '—',
  });

  const [connected, setConnected] = useState(false);

  /* ---------------------------------------------
     Measure actual round-trip time to this server
  --------------------------------------------- */

  const measureServerRTT = async () => {
    const start = performance.now();

    try {
      await fetch('/api/ping', {
        method: 'HEAD',
        cache: 'no-store',
      });

      const elapsed = Math.round(performance.now() - start);

      setMetrics((previous) => ({
        ...previous,
        rtt: `${elapsed} MS`,
      }));
    } catch {
      setMetrics((previous) => ({
        ...previous,
        rtt: '—',
      }));
    }
  };

  /* ---------------------------------------------
     Read browser network information
  --------------------------------------------- */

  const updateConnectionInfo = () => {
    const nav = navigator as NavigatorWithConnection;

    const connection = nav.connection;

    const online = navigator.onLine;

    if (!online) {
      setConnected(false);

      setMetrics({
        status: 'OFFLINE',
        type: 'NO LINK',
        speed: '—',
        rtt: '—',
      });

      return;
    }

    setConnected(true);

    if (!connection) {
      setMetrics((previous) => ({
        ...previous,
        status: 'ONLINE',
        type: 'UNKNOWN',
        speed: '—',
      }));

      return;
    }

    /*
      Prefer the actual connection type when available.

      Examples:
      wifi
      cellular
      ethernet
      bluetooth
      none
      unknown
    */

    let connectionType =
      connection.type ||
      connection.effectiveType ||
      'unknown';

    connectionType = connectionType.toUpperCase();

    /*
      Browser downlink is reported in Mbps.
    */

    const speed =
      typeof connection.downlink === 'number'
        ? `${connection.downlink.toFixed(1)} MBPS`
        : '—';

    setMetrics((previous) => ({
      ...previous,
      status: 'ONLINE',
      type: connectionType,
      speed,
    }));
  };

  /* ---------------------------------------------
     Initialize + listen for connection changes
  --------------------------------------------- */

  useEffect(() => {
    updateConnectionInfo();
    measureServerRTT();

    const handleOnline = () => {
      updateConnectionInfo();
      measureServerRTT();
    };

    const handleOffline = () => {
      updateConnectionInfo();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection;

    const handleConnectionChange = () => {
      updateConnectionInfo();
      measureServerRTT();
    };

    connection?.addEventListener?.(
      'change',
      handleConnectionChange
    );

    /*
      Refresh actual server latency periodically.
      This means the value isn't just measured once.
    */

    const interval = setInterval(() => {
      if (navigator.onLine) {
        updateConnectionInfo();
        measureServerRTT();
      }
    }, 10000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      connection?.removeEventListener?.(
        'change',
        handleConnectionChange
      );

      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="
        absolute
        top-28
        right-6
        md:right-12
        font-mono
        text-[10px]
        text-muted
        tracking-widest
        hidden
        md:flex
        flex-col
        gap-2
        text-right
        z-20
      "
    >
      <p>
        NET.STAT /{' '}
        <span className="text-foreground">
          {metrics.status}
        </span>
      </p>

      <p>
        LINK.TYPE /{' '}
        <span className="text-foreground">
          {"Web"}
        </span>
      </p>

      {/* <p>
        DOWN.LINK /{' '}
        <span className="text-foreground">
          {metrics.speed}
        </span>
      </p> */}

      <p>
        SERVER.RTT /{' '}
        <span className="text-foreground">
          {metrics.rtt}
        </span>
      </p>

      {/* Connection status */}
      <div className="mt-2 flex items-center justify-end gap-2">
        <span
          className={`
            w-1.5
            h-1.5
            rounded-full
            ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}
          `}
        />

        <span className="text-[9px] tracking-[0.18em]">
          {connected
            ? 'VISITOR CONNECTION ESTABLISHED'
            : 'CONNECTION LOST'}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 150]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0]
  );

  return (
    <section
      ref={container}
      className="
        relative
        h-[100svh]
        flex
        flex-col
        items-center
        justify-center
        overflow-hidden
        w-full
      "
    >

      {/* =========================================
          3D WEBGL BACKGROUND
      ========================================= */}

      <Hero3D />

      

      <LiveMetrics />

      

      <motion.div
        style={{
          y: y1,
          opacity,
        }}
        className="
          relative
          z-10
          w-full
          px-6
          md:px-12
          max-w-[1600px]
          flex
          flex-col
          items-center
          justify-center
          pointer-events-none
          mt-16
          md:mt-0
        "
      >

        

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="
            pointer-events-auto
            flex
            items-center
            gap-3
            px-4
            py-2
            rounded-full
            border
            border-border
            bg-background/50
            backdrop-blur-md
            mb-8
          "
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

          <span
            className="
              text-[10px]
              md:text-xs
              font-mono
              uppercase
              tracking-[0.2em]
              text-foreground
            "
          >
            Available for new opportunities
          </span>
        </motion.div>

        

        <h1
          className="
            font-display
            text-[22vw]
            sm:text-[18vw]
            md:text-[14vw]
            leading-[0.8]
            tracking-[-0.04em]
            uppercase
            font-medium
            text-center
            mix-blend-difference
            text-foreground
          "
        >
          <div className="overflow-hidden">
            <motion.span
              className="block"
              initial={{
                y: '110%',
                rotate: 2,
              }}
              animate={{
                y: 0,
                rotate: 0,
              }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
            >
              GARV
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.span
              className="block italic pr-4 md:pr-12"
              initial={{
                y: '110%',
                rotate: -2,
              }}
              animate={{
                y: 0,
                rotate: 0,
              }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
            >
              MITTAL
            </motion.span>
          </div>
        </h1>

        {/* =========================================
            VALUE PROPOSITION
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 1.2,
          }}
          className="
            mt-12
            md:mt-16
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            w-full
            max-w-5xl
            gap-8
            pointer-events-auto
          "
        >
          <p
            className="
              text-[10px]
              md:text-xs
              font-mono
              text-foreground/70
              uppercase
              tracking-[0.15em]
              max-w-sm
              text-center
              md:text-left
              leading-relaxed
            "
          >
            Software Developer specializing in{' '}
            <span className="text-foreground font-bold">
              Full-Stack
            </span>{' '}
            &{' '}
            <span className="text-foreground font-bold">
              Backend Development
            </span>
            . Building scalable web & AI applications.
          </p>

          <div className="flex gap-4">
            <MagneticButton href="#work">
              Explore Work
            </MagneticButton>

            <MagneticButton href="#contact">
              Contact Me
            </MagneticButton>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}