import { useEffect, useRef } from "react";

/**
 * Interactive "schema field": a dot lattice that bends toward the pointer.
 * 2D canvas, DPR-capped, paused when offscreen or hidden, and rendered as a
 * single static frame when the user prefers reduced motion.
 */
export default function HeroField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const SPACING = coarse ? 42 : 34;
    const RADIUS = coarse ? 150 : 220;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let time = 0;
    let raf = 0;
    let running = true;

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      return {
        base: styles.getPropertyValue("--text-tertiary").trim() || "240 5% 40%",
        signal: styles.getPropertyValue("--signal").trim() || "152 78% 48%",
      };
    };
    let colors = readColors();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
      offsetX = (width - (cols - 1) * SPACING) / 2;
      offsetY = (height - (rows - 1) * SPACING) / 2;
      colors = readColors();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Ease the pointer for a weighted, non-twitchy feel.
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = offsetX + c * SPACING;
          const by = offsetY + r * SPACING;

          // Slow ambient breathing so the field is never fully static.
          const wave = reduced ? 0 : Math.sin((bx + by) * 0.006 + time) * 1.6;

          const dx = bx - pointer.x;
          const dy = by - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let px = bx;
          let py = by + wave;
          let size = 1.15;
          let alpha = 0.4;
          let tint = colors.base;

          if (dist < RADIUS) {
            const force = 1 - dist / RADIUS;
            const pull = force * force * 26;
            const angle = Math.atan2(dy, dx);
            px = bx - Math.cos(angle) * pull;
            py = by + wave - Math.sin(angle) * pull;
            size = 1.15 + force * 2.4;
            alpha = 0.4 + force * 0.6;
            if (force > 0.42) tint = colors.signal;
          }

          ctx.beginPath();
          ctx.fillStyle = `hsl(${tint} / ${alpha})`;
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      if (!running) return;
      time += 0.008;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    resize();

    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);

    // Stop painting when the hero scrolls away or the tab is backgrounded.
    const io = new IntersectionObserver(
      ([entry]) => {
        const shouldRun = entry.isIntersecting && !document.hidden && !reduced;
        if (shouldRun && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!shouldRun) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Repaint palette when the theme class flips.
    const mo = new MutationObserver(() => {
      colors = readColors();
      if (reduced) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
