"use client";

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAP<T extends HTMLElement>(
  callback: (ctx: gsap.Context) => void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      callback(ctx);
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

export function useFadeInOnScroll<T extends HTMLElement>(
  options?: {
    y?: number;
    duration?: number;
    start?: string;
    stagger?: number;
  }
): RefObject<T | null> {
  const { y = 50, duration = 0.8, start = "top 85%", stagger = 0.1 } = options || {};

  return useGSAP<T>((ctx) => {
    const elements = ctx.selector?.("[data-animate]") || [];

    gsap.fromTo(
      elements,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctx.selector?.("") || undefined,
          start,
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

export { gsap, ScrollTrigger };
