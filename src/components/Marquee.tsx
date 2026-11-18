"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        x: "-50%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const text = "Make every token cheaper";
  const repeatCount = 8;

  return (
    <div
      ref={containerRef}
      className="bg-paper py-10 sm:py-12 xl:py-16 overflow-hidden border-y border-line"
    >
      <div ref={textRef} className="flex whitespace-nowrap">
        {Array.from({ length: repeatCount }).map((_, i) => (
          <span
            key={i}
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-ink/10 mx-6 sm:mx-8 xl:mx-10"
          >
            {text}
            <span className="text-ember/30 mx-6 sm:mx-8 xl:mx-10">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
