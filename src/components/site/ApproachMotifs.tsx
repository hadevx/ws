import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./primitives";

/**
 * One abstract motif per process stage. Each is keyed on the active stage so
 * it remounts and replays. Pure SVG — stroke/opacity/transform only.
 */

const stroke = "hsl(var(--line))";
const signal = "hsl(var(--signal))";
const ink = "hsl(var(--foreground))";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" fill="none" aria-hidden>
      {/* Registration marks — a shared visual language across all four */}
      <g stroke={stroke} strokeWidth="1">
        <path d="M8 8h26M8 8v26" />
        <path d="M312 8h-26M312 8v26" />
        <path d="M8 312h26M8 312v-26" />
        <path d="M312 312h-26M312 312v-26" />
      </g>
      {children}
    </svg>
  );
}

/* 01 — Think: scattered points converge into a single node */
function Think({ still }: { still: boolean }) {
  const points = [
    [72, 84],
    [238, 66],
    [56, 214],
    [252, 226],
    [148, 44],
    [70, 150],
    [246, 148],
    [160, 268],
  ];
  return (
    <Frame>
      {points.map(([x, y], i) => (
        <g key={i}>
          <motion.line
            x1={x}
            y1={y}
            x2={160}
            y2={160}
            stroke={stroke}
            strokeWidth="1"
            initial={still ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease: EASE }}
          />
          <motion.circle
            cx={x}
            cy={y}
            r="3"
            fill={ink}
            initial={still ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
          />
        </g>
      ))}
      <motion.circle
        cx="160"
        cy="160"
        r="9"
        fill={signal}
        initial={still ? { scale: 1 } : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
      />
      <motion.circle
        cx="160"
        cy="160"
        r="30"
        stroke={signal}
        strokeWidth="1"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={still ? { scale: 1, opacity: 0.5 } : { scale: [0.4, 1.5], opacity: [0.7, 0] }}
        transition={still ? { duration: 0.4 } : { duration: 2, delay: 1, repeat: Infinity }}
      />
    </Frame>
  );
}

/* 02 — Design: layout blocks assemble, one highlighted */
function Design({ still }: { still: boolean }) {
  const blocks = [
    { x: 48, y: 48, w: 224, h: 34, hot: false },
    { x: 48, y: 96, w: 132, h: 96, hot: true },
    { x: 192, y: 96, w: 80, h: 44, hot: false },
    { x: 192, y: 150, w: 80, h: 42, hot: false },
    { x: 48, y: 204, w: 104, h: 68, hot: false },
    { x: 164, y: 204, w: 108, h: 68, hot: false },
  ];
  return (
    <Frame>
      {blocks.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="4"
          stroke={b.hot ? signal : stroke}
          strokeWidth="1"
          fill={b.hot ? "hsl(var(--signal) / 0.10)" : "transparent"}
          initial={still ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
        />
      ))}
      {/* Measurement line */}
      <motion.g
        initial={still ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <line x1="48" y1="286" x2="272" y2="286" stroke={signal} strokeWidth="1" />
        <line x1="48" y1="281" x2="48" y2="291" stroke={signal} strokeWidth="1" />
        <line x1="272" y1="281" x2="272" y2="291" stroke={signal} strokeWidth="1" />
      </motion.g>
    </Frame>
  );
}

/* 03 — Build: code lines stack up, then a stability bar fills */
function Build({ still }: { still: boolean }) {
  const rows = [
    [56, 120],
    [72, 168],
    [72, 96],
    [88, 140],
    [88, 76],
    [72, 152],
    [56, 108],
  ];
  return (
    <Frame>
      {rows.map(([x, w], i) => (
        <g key={i}>
          <motion.rect
            x={x}
            y={64 + i * 26}
            width={w}
            height="8"
            rx="4"
            fill={i === 3 ? signal : ink}
            opacity={i === 3 ? 1 : 0.28}
            initial={still ? { scaleX: 1, opacity: i === 3 ? 1 : 0.28 } : { scaleX: 0, opacity: 0 }}
            style={{ originX: 0 }}
            animate={{ scaleX: 1, opacity: i === 3 ? 1 : 0.28 }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
          />
          <motion.circle
            cx={x - 16}
            cy={68 + i * 26}
            r="2"
            fill={stroke}
            initial={still ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          />
        </g>
      ))}
      <motion.rect
        x="56"
        y="264"
        width="208"
        height="2"
        rx="1"
        fill={signal}
        style={{ originX: 0 }}
        initial={still ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
      />
    </Frame>
  );
}

/* 04 — Launch: a trajectory arc with a travelling marker */
function Launch({ still }: { still: boolean }) {
  const path = "M44 268 C 96 268, 150 232, 190 168 S 258 66, 282 46";
  return (
    <Frame>
      <motion.path
        d={path}
        stroke={stroke}
        strokeWidth="1"
        strokeDasharray="3 5"
        initial={still ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <motion.path
        d={path}
        stroke={signal}
        strokeWidth="2"
        initial={still ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
      />
      {/* Horizon */}
      <line x1="24" y1="268" x2="296" y2="268" stroke={stroke} strokeWidth="1" />
      <motion.circle
        cx="282"
        cy="46"
        r="6"
        fill={signal}
        initial={still ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5, ease: EASE }}
      />
      <motion.circle
        cx="282"
        cy="46"
        r="18"
        stroke={signal}
        strokeWidth="1"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={still ? { scale: 1, opacity: 0.4 } : { scale: [0.4, 1.8], opacity: [0.6, 0] }}
        transition={still ? { duration: 0.3 } : { duration: 2.2, delay: 1.7, repeat: Infinity }}
      />
    </Frame>
  );
}

const MOTIFS = { think: Think, design: Design, build: Build, launch: Launch } as const;

export default function ApproachMotif({ stage }: { stage: string }) {
  const reduced = useReducedMotion();
  const Motif = MOTIFS[stage as keyof typeof MOTIFS] ?? Think;
  return <Motif still={!!reduced} />;
}
