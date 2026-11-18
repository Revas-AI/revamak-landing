"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: "58.6%",
    label: "Inference share of AI infrastructure spend, 2025",
    isEmber: false,
  },
  {
    value: "71.7%",
    label: "Forecast share by 2030",
    isEmber: false,
  },
  {
    value: "$2.6B",
    label: "Inference optimization software, 2026 estimate",
    isEmber: false,
  },
  {
    value: "6",
    label: "Lifecycle stages in one workbench",
    isEmber: false,
  },
  {
    value: "3×",
    label: "Serving-cost cut we target in a one-week sweep",
    isEmber: true,
  },
  {
    value: "0",
    label: "Engines, clouds and GPUs you're locked into",
    isEmber: false,
  },
];

export function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-paper py-16 sm:py-24 lg:py-32">
      <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 sm:px-6 xl:px-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card p-4 sm:p-6 lg:p-8 bg-panel rounded-2xl sm:rounded-3xl"
            >
              <p
                className={`font-heading font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3 ${
                  stat.isEmber ? "text-ember" : "text-ink"
                }`}
              >
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-muted leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Sources */}
        <p className="text-center text-xs sm:text-sm text-muted px-4">
          Sources: Futurum Group (inference share), Technavio ($2.17B in 2025 at
          22.1% a year). The 3× is a target, not a measured result.
        </p>
      </div>
    </section>
  );
}
