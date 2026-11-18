"use client";

import { useEffect, useRef, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NeuralNetworkFallback } from "./NeuralNetwork3D";

gsap.registerPlugin(ScrollTrigger);

// Dynamic import for Three.js to avoid SSR issues
const NeuralNetwork3D = dynamic(
  () => import("./NeuralNetwork3D").then((mod) => mod.NeuralNetwork3D),
  {
    ssr: false,
    loading: () => <NeuralNetworkFallback />,
  }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebGLSupported(!!gl);
    } catch {
      setWebGLSupported(false);
    }

    const ctx = gsap.context(() => {
      // Animate hero content on load
      gsap.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-headline",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-body",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power3.out" }
      );

      // Wordmark slides up
      gsap.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen bg-night overflow-hidden"
    >
      {/* 3D Neural Network Model */}
      {webGLSupported ? (
        <Suspense fallback={<NeuralNetworkFallback />}>
          <NeuralNetwork3D />
        </Suspense>
      ) : (
        <NeuralNetworkFallback />
      )}

      {/* Gradient overlay for text legibility - stronger on mobile */}
      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 sm:via-night/70 to-night/50 sm:to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 sm:via-transparent to-night/50 sm:to-night/40 z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] xl:max-w-[1600px] mx-auto px-5 sm:px-6 lg:px-8 xl:px-12 pt-28 sm:pt-32 pb-16 sm:pb-20 min-h-[620px] sm:min-h-screen flex flex-col justify-center">
        <div ref={contentRef} className="max-w-3xl xl:max-w-4xl">
          {/* Eyebrow */}
          <p className="hero-eyebrow font-mono text-xs sm:text-sm text-ember-text tracking-wide uppercase mb-4 sm:mb-6">
            Inference engineering, made repeatable
          </p>

          {/* Headline */}
          <h1 className="hero-headline font-heading font-bold text-[clamp(32px,5vw,72px)] text-on-night leading-[1.1] mb-5 sm:mb-6 uppercase tracking-tight">
            The inference engineering workbench
          </h1>

          {/* Body */}
          <p className="hero-body text-base sm:text-lg lg:text-xl text-on-night-secondary max-w-2xl mb-8 sm:mb-10 leading-relaxed">
            Profile, benchmark, sweep and deploy open-weight models from a visual
            canvas or from code. Every decision is versioned, on any engine,
            cloud or GPU.
          </p>

          {/* CTA */}
          <div className="hero-cta flex flex-wrap items-center gap-2 sm:gap-1.5">
            <Link
              href="#join"
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 sm:py-4 bg-on-night text-ink font-mono text-[12px] sm:text-[13px] tracking-wider uppercase rounded-[10px] hover:bg-on-night/90 transition-colors"
            >
              Become a design partner
            </Link>
            <Link
              href="#join"
              className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-ember text-white rounded-[10px] hover:bg-ember/90 transition-colors"
              aria-label="Get started"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Giant Wordmark */}
      <div
        ref={wordmarkRef}
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none z-[2]"
      >
        <h2 className="font-wordmark font-semibold text-[15vw] sm:text-[12vw] text-on-night/[0.03] text-center whitespace-nowrap leading-none tracking-wider">
          REVAMAK
        </h2>
      </div>
    </section>
  );
}
