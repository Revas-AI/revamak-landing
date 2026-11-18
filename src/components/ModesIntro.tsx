"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const modeButtons = [
  { id: "mode-0", label: "Optimize" },
  { id: "mode-1", label: "Deploy for clients" },
  { id: "mode-2", label: "Operate" },
] as const;

export function ModesIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale up headline as it comes into view
      gsap.fromTo(
        headlineRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // Stagger in buttons
      gsap.fromTo(
        ".mode-btn",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".mode-buttons",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="modes"
      className="bg-night py-[clamp(80px,12vw,140px)]"
    >
      <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-[clamp(16px,4vw,64px)] text-center">
        {/* Headline */}
        <div ref={headlineRef} className="mb-10">
          <h2 className="font-heading font-bold text-[clamp(36px,5vw,72px)] text-on-night leading-[1.1] tracking-tight">
            One workbench
            <br />
            <span className="text-ember">Three modes</span>
          </h2>
        </div>

        {/* Mode buttons */}
        <div className="mode-buttons flex flex-wrap justify-center gap-3">
          {modeButtons.map((mode) => (
            <Link
              key={mode.id}
              href={`#${mode.id}`}
              className="mode-btn px-6 py-3.5 bg-ink/40 hover:bg-ink/60 text-on-night font-mono text-[13px] tracking-wider uppercase rounded-full border border-on-night/15 transition-all hover:border-ember/60 min-h-[44px]"
            >
              {mode.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
