"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FunnelStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [dotsOn, setDotsOn] = useState(false);

  useEffect(() => {
    // Use IntersectionObserver for dots (35% threshold like HTML)
    const grid = dotsRef.current;
    if (!grid) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDotsOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(grid);

    const ctx = gsap.context(() => {
      // Fade in text
      gsap.fromTo(
        ".funnel-text",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  // Generate funnel dot pattern (44 cols × 15 rows, converging left to right)
  // Using same hash function as HTML for consistent pseudo-random coloring
  const cols = 44;
  const rows = 15;
  const mid = 7;

  const dots: { color: string; delay: string }[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Calculate funnel shape - converges from left to right
      const half = 7.4 * Math.pow(1 - c / (cols - 1), 0.85);
      const inside = Math.abs(r - mid) <= half + 0.01;

      // Hash function matching HTML: ((c * 73856093) ^ (r * 19349663)) >>> 0
      const h = ((c * 73856093) ^ (r * 19349663)) >>> 0;

      let color = "#2A2A2F"; // Default dark (will animate from this)
      if (inside) {
        if (c >= cols - 7) {
          // Ember tip
          color = "#D2572B";
        } else if (h % 100 < 35 + c * 1.4) {
          // Light dots
          color = "#EEECE6";
        } else {
          // Gray dots
          color = "#4A4A51";
        }
      }

      dots.push({
        color: inside ? color : "transparent",
        delay: `${c * 35 + r * 6}ms`,
      });
    }
  }

  return (
    <section
      ref={sectionRef}
      className="bg-night py-[clamp(100px,14vw,200px)] overflow-hidden"
    >
      <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-[clamp(16px,4vw,64px)] flex flex-col items-center gap-12">
        {/* Dot grid funnel */}
        <div
          ref={dotsRef}
          className="grid gap-[clamp(3px,0.6vw,8px)] w-full max-w-[900px]"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          aria-hidden="true"
        >
          {dots.map((dot, index) => (
            <span
              key={index}
              className="block aspect-square rounded-full"
              style={{
                background: dot.color !== "transparent" ? dot.color : "transparent",
                animation: dot.color !== "transparent" ? "dotin 700ms ease-out both" : "none",
                animationDelay: dot.delay,
                animationPlayState: dotsOn ? "running" : "paused",
              }}
            />
          ))}
        </div>

        {/* Headline with large parentheses */}
        <div className="funnel-text flex items-center gap-[clamp(12px,3vw,40px)]">
          <span
            className="font-heading font-light text-[clamp(40px,10vw,160px)] leading-none text-[#6E6C67] select-none"
            aria-hidden="true"
          >
            (
          </span>
          <h2 className="font-heading font-bold text-[clamp(28px,4.2vw,60px)] leading-[1.02] tracking-tight uppercase text-on-night text-center max-w-[900px]">
            Inference is AI&apos;s biggest bill. We make it smaller.
          </h2>
          <span
            className="font-heading font-light text-[clamp(40px,10vw,160px)] leading-none text-[#6E6C67] select-none"
            aria-hidden="true"
          >
            )
          </span>
        </div>

        {/* Body text */}
        <p className="text-[17px] leading-[1.55] text-on-night-secondary text-center max-w-[620px]">
          Every token a model generates is paid for again. Revamak orchestrates
          the engines teams already trust—vLLM, SGLang and LoRAX—so the
          savings apply to every token after.
        </p>
      </div>
    </section>
  );
}
