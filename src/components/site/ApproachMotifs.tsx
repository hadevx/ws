import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./primitives";

/**
 * One abstract motif per process stage. Each is keyed on the active stage so
 * it remounts and replays. Pure SVG — stroke/opacity/transform only.
 *
 * Each motif is built in two layers: a one-shot entrance that draws the shape,
 * and an ambient loop that keeps it alive for as long as the stage is pinned.
 * `still` drops every loop for reduced-motion users.
 *
 * Where a property needs both — grow in once, then breathe forever — the two
 * live on separate elements. A looping keyframe array starts at keyframes[0],
 * so putting the loop on the entrance would swallow it.
 */

const stroke = "hsl(var(--line))";
const signal = "hsl(var(--signal))";
const ink = "hsl(var(--foreground))";

/** Deterministic per-index jitter — stable across renders, unlike Math.random. */
const wobble = (i: number, seed: number) => Math.sin(i * 1.37 + seed) * 5;

/**
 * A short signal-coloured dash that travels the length of a path, forever.
 * pathLength/pathSpacing are normalised (0–1 spans the whole path), so the
 * geometry never has to be measured. Set `cycle` above 1 to leave a dark gap
 * between passes instead of a continuous stream.
 */
function Packet({
  d,
  delay = 0,
  duration = 2.4,
  cycle = 1,
  length = 0.14,
  width = 2,
  opacity = 1,
}: {
  d: string;
  delay?: number;
  duration?: number;
  cycle?: number;
  length?: number;
  width?: number;
  opacity?: number;
}) {
  return (
    <motion.path
      d={d}
      stroke={signal}
      strokeWidth={width}
      strokeLinecap="round"
      opacity={opacity}
      // The dash geometry has to travel as motion values, not static SVG attrs,
      // or framer's own pathLength handling overwrites the dasharray.
      style={{ pathLength: length, pathSpacing: cycle - length }}
      initial={{ pathOffset: 0 }}
      animate={{ pathOffset: cycle }}
      transition={{ duration, delay, ease: "linear", repeat: Infinity }}
    />
  );
}

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
          {/* Signal running inward — the "converging" half of the metaphor */}
          {!still && (
            <Packet
              d={`M${x} ${y} L160 160`}
              delay={1 + i * 0.28}
              duration={2.6}
              length={0.16}
              width={1.5}
              opacity={0.9}
            />
          )}
          <motion.circle
            cx={x}
            cy={y}
            r="3"
            fill={ink}
            initial={still ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={
              still
                ? { scale: 1, opacity: 1 }
                : {
                    scale: 1,
                    opacity: 1,
                    x: [0, wobble(i, 0), 0, -wobble(i, 0), 0],
                    y: [0, -wobble(i, 2.1), 0, wobble(i, 2.1), 0],
                  }
            }
            transition={{
              scale: { duration: 0.5, delay: i * 0.07, ease: EASE },
              opacity: { duration: 0.5, delay: i * 0.07, ease: EASE },
              x: { duration: 7 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 8 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </g>
      ))}

      {/* Node: the group pops it in, the circle inside keeps breathing */}
      <motion.g
        initial={still ? { scale: 1 } : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
      >
        <motion.circle
          cx="160"
          cy="160"
          r="9"
          fill={signal}
          animate={still ? { scale: 1 } : { scale: [1, 1.22, 1] }}
          transition={
            still
              ? { duration: 0 }
              : { duration: 2.6, delay: 1.5, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </motion.g>

      {/* Two ripples half a cycle apart so the node never sits quiet */}
      {[0, 1.5].map((offset) => (
        <motion.circle
          key={offset}
          cx="160"
          cy="160"
          r="30"
          stroke={signal}
          strokeWidth="1"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={still ? { scale: 1, opacity: 0.5 } : { scale: [0.4, 1.6], opacity: [0.7, 0] }}
          transition={
            still
              ? { duration: 0.4 }
              : { duration: 3, delay: 1 + offset, repeat: Infinity, ease: "easeOut" }
          }
        />
      ))}
    </Frame>
  );
}

/* 02 — Design: layout blocks assemble, then a focus walks the grid */
function Design({ still }: { still: boolean }) {
  const blocks = [
    { x: 48, y: 48, w: 224, h: 34, hot: false },
    { x: 48, y: 96, w: 132, h: 96, hot: true },
    { x: 192, y: 96, w: 80, h: 44, hot: false },
    { x: 192, y: 150, w: 80, h: 42, hot: false },
    { x: 48, y: 204, w: 104, h: 68, hot: false },
    { x: 164, y: 204, w: 108, h: 68, hot: false },
  ];
  // One block lights per beat; the sweep restarts once every block has had a turn.
  const beat = 0.85;
  const flash = 1.5;
  const cycle = blocks.length * beat;

  return (
    <Frame>
      {blocks.map((b, i) => (
        <g key={i}>
          <motion.rect
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
          {/* Focus pass — reads as attention moving through the layout */}
          {!still && (
            <motion.rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx="4"
              stroke={signal}
              strokeWidth="1.5"
              fill="hsl(var(--signal) / 0.08)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{
                duration: flash,
                delay: 1 + i * beat,
                repeat: Infinity,
                repeatDelay: cycle - flash,
                ease: "easeInOut",
              }}
            />
          )}
        </g>
      ))}

      {/* Plotter sweep */}
      {!still && (
        <motion.line
          x1="40"
          y1="48"
          x2="280"
          y2="48"
          stroke={signal}
          strokeWidth="1"
          opacity="0.3"
          initial={{ y: 0 }}
          animate={{ y: [0, 224, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Measurement line */}
      <motion.g
        initial={still ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <line x1="48" y1="286" x2="272" y2="286" stroke={signal} strokeWidth="1" opacity="0.45" />
        <line x1="48" y1="281" x2="48" y2="291" stroke={signal} strokeWidth="1" />
        <line x1="272" y1="281" x2="272" y2="291" stroke={signal} strokeWidth="1" />
        {!still && (
          <Packet
            d="M48 286 L272 286"
            delay={1.2}
            duration={3.4}
            cycle={1.7}
            length={0.2}
            width={2}
          />
        )}
      </motion.g>
    </Frame>
  );
}

/* 03 — Build: code lines stack up, a cursor runs them, the bar keeps shipping */
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
  const beat = 0.42;
  const wipe = 1.4;
  const cycle = rows.length * beat + wipe;

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
            fill={ink}
            opacity="0.28"
            style={{ originX: 0 }}
            initial={still ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
          />
          {/* The cursor: a signal wash that runs the stack, line by line */}
          {!still && (
            <motion.rect
              x={x}
              y={64 + i * 26}
              width={w}
              height="8"
              rx="4"
              fill={signal}
              style={{ originX: 0 }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scaleX: [0, 1, 1, 1] }}
              transition={{
                duration: wipe,
                delay: 0.9 + i * beat,
                repeat: Infinity,
                repeatDelay: cycle - wipe,
                ease: EASE,
              }}
            />
          )}
          {/* Gutter light: group fades it in, circle inside blinks */}
          <motion.g
            initial={still ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <motion.circle
              cx={x - 16}
              cy={68 + i * 26}
              r="2"
              fill={stroke}
              animate={still ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }}
              transition={
                still
                  ? { duration: 0 }
                  : { duration: 2.4, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }
              }
            />
          </motion.g>
        </g>
      ))}

      {/* Stability bar — refills every pass, like a pipeline going green */}
      <rect x="56" y="264" width="208" height="2" rx="1" fill={stroke} opacity="0.5" />
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
        transition={
          still
            ? { duration: 1.1, delay: 0.6, ease: EASE }
            : { duration: cycle - 1, delay: 0.6, repeat: Infinity, repeatDelay: 1, ease: EASE }
        }
      />
    </Frame>
  );
}

/* 04 — Launch: a trajectory arc with a travelling marker */
function Launch({ still }: { still: boolean }) {
  const path = "M44 268 C 96 268, 150 232, 190 168 S 258 66, 282 46";
  const sparks = [
    [96, 92],
    [214, 118],
    [138, 66],
    [258, 178],
    [64, 148],
  ];
  return (
    <Frame>
      {/* Sparks sit behind the arc so they never fight with it */}
      {!still &&
        sparks.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="1.5"
            fill={ink}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0] }}
            transition={{
              duration: 2.8 + i * 0.4,
              delay: 1.6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

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
      {/* The marker this stage is named for: a comet climbing the trajectory */}
      {!still && <Packet d={path} delay={1.7} duration={3.2} cycle={1.55} length={0.12} width={4} />}

      {/* Horizon */}
      <line x1="24" y1="268" x2="296" y2="268" stroke={stroke} strokeWidth="1" />

      <motion.g
        initial={still ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5, ease: EASE }}
      >
        <motion.circle
          cx="282"
          cy="46"
          r="6"
          fill={signal}
          animate={still ? { scale: 1 } : { scale: [1, 1.3, 1] }}
          transition={
            still
              ? { duration: 0 }
              : { duration: 2.4, delay: 2, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </motion.g>

      {[0, 1.1].map((offset) => (
        <motion.circle
          key={offset}
          cx="282"
          cy="46"
          r="18"
          stroke={signal}
          strokeWidth="1"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={still ? { scale: 1, opacity: 0.4 } : { scale: [0.4, 1.9], opacity: [0.6, 0] }}
          transition={
            still
              ? { duration: 0.3 }
              : { duration: 2.2, delay: 1.7 + offset, repeat: Infinity, ease: "easeOut" }
          }
        />
      ))}
    </Frame>
  );
}

const MOTIFS = { think: Think, design: Design, build: Build, launch: Launch } as const;

export default function ApproachMotif({ stage }: { stage: string }) {
  const reduced = useReducedMotion();
  const Motif = MOTIFS[stage as keyof typeof MOTIFS] ?? Think;
  return <Motif still={!!reduced} />;
}
