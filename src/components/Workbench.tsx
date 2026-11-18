"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Profile",
    description: "Memory, FLOPs and roofline for every checkpoint.",
    caption: "8B model at fp16: about 16 GB of weights, plus KV cache and activations",
  },
  {
    number: "02",
    title: "Sweep",
    description: "Quantization, decoding, batching and hardware, benchmarked side by side.",
    caption: "Cheapest passing: fp8 + speculative decoding on L40S",
  },
  {
    number: "03",
    title: "Gate",
    description: "Every speed gain re-runs your quality evals before it can ship.",
    caption: "1 of 3 candidates passed the 1% quality gate",
  },
  {
    number: "04",
    title: "Deploy",
    description: "Promote the winning config to any pool, cloud or cluster.",
    caption: "Live · promoted to the L40S pool",
  },
];

export function Workbench() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [autoPlayed, setAutoPlayed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in header
      gsap.fromTo(
        ".workbench-label",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".workbench-label",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".workbench-headline",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".workbench-headline",
            start: "top 85%",
          },
        }
      );

      // Auto-play steps when in view
      ScrollTrigger.create({
        trigger: ".workbench-steps",
        start: "top 40%",
        onEnter: () => {
          if (autoPlayed) return;
          setAutoPlayed(true);
          let currentStep = 0;
          const interval = setInterval(() => {
            setActiveStep(currentStep);
            currentStep++;
            if (currentStep >= steps.length) {
              clearInterval(interval);
              setTimeout(() => setActiveStep(null), 3000);
            }
          }, 1200);
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [autoPlayed]);

  return (
    <section
      ref={sectionRef}
      id="how"
      className="bg-paper py-[clamp(80px,10vw,140px)]"
    >
      <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-[clamp(16px,4vw,64px)] flex flex-col gap-12 sm:gap-16 lg:gap-[72px]">
        {/* Header */}
        <div className="flex flex-wrap gap-6 sm:gap-8">
          {/* Label */}
          <div className="flex-[1_1_260px]">
            <p className="workbench-label inline-flex items-center gap-2.5 bg-panel rounded-lg px-3 py-2 font-mono text-[13px] tracking-wider uppercase">
              <span className="w-[9px] h-[9px] bg-ember rounded-sm" />
              The workbench
            </p>
          </div>

          {/* Headline and description */}
          <div className="flex-[999_1_560px] flex flex-col gap-8 min-w-0">
            <h2 className="workbench-headline font-heading font-medium text-[clamp(36px,4.8vw,68px)] leading-[1.05] tracking-tight">
              Raw models in.
              <br />
              Production systems out.
              <br />
              <span className="text-ember-text">Every step on the record.</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted max-w-[640px]">
              Quantization, batching and KV-cache choices are made by trial and error
              and live in a few engineers' scripts and Slack threads. Revamak turns
              them into versioned, comparable runs the team can audit and repeat.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div
          className="workbench-steps grid gap-3 sm:gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))" }}
        >
          {steps.map((step, index) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
              className={`group flex flex-col items-center gap-2 sm:gap-3 text-center p-3 sm:p-2 rounded-[16px] sm:rounded-[20px] transition-all duration-300 cursor-pointer ${
                activeStep === index
                  ? "bg-panel"
                  : "bg-transparent hover:bg-panel/50"
              }`}
              aria-pressed={activeStep === index}
              aria-label={`${step.title}: ${step.description}`}
            >
              {/* SVG Illustration */}
              <div className="w-[180px] sm:w-[220px] h-[140px] sm:h-[170px]">
                <StepIllustration step={index} isActive={activeStep === index} />
              </div>

              {/* Step number */}
              <p className="font-mono text-[11px] sm:text-xs text-[#7A6B5F]">{step.number}</p>

              {/* Title */}
              <h3 className="font-heading font-medium text-xl sm:text-2xl text-ink">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-muted max-w-[240px]">
                {step.description}
              </p>

              {/* Caption (shows when active) */}
              <p
                className={`font-mono text-[11px] sm:text-xs leading-relaxed text-ember-text max-w-[240px] min-h-[32px] sm:min-h-[36px] transition-opacity duration-300 ${
                  activeStep === index ? "opacity-100" : "opacity-0"
                }`}
                aria-live="polite"
              >
                {activeStep === index ? step.caption : ""}
              </p>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-line pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
          <p className="text-muted">
            Production metrics feed back into the next sweep. The cycle tightens with
            every deploy.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[15px] text-ink">
              Running open-weight models in production?
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Book a sweep CTA with ember arrow */}
              <div className="flex gap-1.5">
                <Link
                  href="#join"
                  className="inline-flex items-center px-5 py-4 bg-ink text-on-night font-mono text-[13px] tracking-wider uppercase rounded-[10px] hover:bg-ink/90 transition-colors"
                >
                  Book a sweep
                </Link>
                <Link
                  href="#join"
                  aria-label="Book a sweep"
                  className="inline-flex items-center justify-center w-12 rounded-[10px] bg-ember hover:bg-ember/90 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M2 8h11M9 4l4 4-4 4"
                      stroke="#17171A"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
              {/* See the three modes link */}
              <Link
                href="#modes"
                className="inline-flex items-center gap-3 px-5 py-3.5 border border-ink text-ink text-[15px] rounded-[10px] hover:bg-panel transition-colors"
              >
                See the three modes
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path
                    d="M3 11L11 3M5 3h6v6"
                    stroke="#17171A"
                    strokeWidth="1.6"
                    fill="none"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Step Illustrations
function StepIllustration({ step, isActive }: { step: number; isActive: boolean }) {
  switch (step) {
    case 0:
      return <ProfileIllustration isActive={isActive} />;
    case 1:
      return <SweepIllustration isActive={isActive} />;
    case 2:
      return <GateIllustration isActive={isActive} />;
    case 3:
      return <DeployIllustration isActive={isActive} />;
    default:
      return null;
  }
}

// Profile: 3 stacked diamond layers
function ProfileIllustration({ isActive }: { isActive: boolean }) {
  return (
    <svg width="220" height="170" viewBox="0 0 220 170" aria-hidden="true">
      {/* Bottom layer (activations) */}
      <g
        style={{
          transform: `translateY(${isActive ? "16px" : "0px"})`,
          transition: "transform 600ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <path
          d="M100 120l-60-28 60-28 60 28z"
          fill="#EBE9E2"
          stroke="#17171A"
          strokeWidth="2"
        />
      </g>
      {/* Middle layer (KV cache) */}
      <g>
        <path
          d="M100 98l-60-28 60-28 60 28z"
          fill="#F5F4EF"
          stroke="#17171A"
          strokeWidth="2"
        />
      </g>
      {/* Top layer (weights) */}
      <g
        style={{
          transform: `translateY(${isActive ? "-16px" : "0px"})`,
          transition: "transform 600ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <path
          d="M100 76l-60-28 60-28 60 28z"
          fill="#D2572B"
          stroke="#17171A"
          strokeWidth="2"
        />
      </g>
      {/* Labels */}
      <g
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 400ms 200ms",
        }}
        fontFamily="Inter, Arial, sans-serif"
        fontSize="11"
        fill="#57554F"
      >
        <text x="166" y="34">weights</text>
        <text x="166" y="74">KV cache</text>
        <text x="166" y="118">activations</text>
      </g>
      {/* Shadow */}
      <ellipse cx="100" cy="156" rx="56" ry="6" fill="#E3E0D7" />
      {/* Arrow */}
      <path
        className="rv-arrow"
        d="M178 86h34M204 80l8 6-8 6"
        stroke="#B9B5AB"
        strokeWidth="2"
        fill="none"
        style={{ opacity: isActive ? 0 : 1, transition: "opacity 300ms" }}
      />
    </svg>
  );
}

// Sweep: Grid of 12 dots
function SweepIllustration({ isActive }: { isActive: boolean }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (isActive) {
      setShown(0);
      let count = 0;
      const timer = setInterval(() => {
        count++;
        setShown(count);
        if (count >= 12) clearInterval(timer);
      }, 100);
      return () => clearInterval(timer);
    } else {
      setShown(0);
    }
  }, [isActive]);

  const dots = [
    { cx: 58, cy: 58 }, { cx: 86, cy: 58 }, { cx: 114, cy: 58 }, { cx: 142, cy: 58 },
    { cx: 58, cy: 86 }, { cx: 86, cy: 86 }, { cx: 114, cy: 86 }, { cx: 142, cy: 86 },
    { cx: 58, cy: 114 }, { cx: 86, cy: 114 }, { cx: 114, cy: 114 }, { cx: 142, cy: 114 },
  ];

  return (
    <svg width="220" height="170" viewBox="0 0 220 170" aria-hidden="true">
      <rect x="30" y="30" width="140" height="110" rx="14" fill="#F5F4EF" stroke="#17171A" strokeWidth="2" />
      {dots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={i < shown ? 8 : 6}
          fill={i < shown ? (i === 7 ? "#D2572B" : "#17171A") : "#D6D2C8"}
          style={{ transition: "fill 150ms, r 150ms" }}
        />
      ))}
      <ellipse cx="100" cy="156" rx="56" ry="6" fill="#E3E0D7" />
      <path
        className="rv-arrow"
        d="M178 86h34M204 80l8 6-8 6"
        stroke="#B9B5AB"
        strokeWidth="2"
        fill="none"
        style={{ opacity: isActive ? 0 : 1, transition: "opacity 300ms" }}
      />
    </svg>
  );
}

// Gate: Funnel with dots passing through
function GateIllustration({ isActive }: { isActive: boolean }) {
  return (
    <svg width="220" height="170" viewBox="0 0 220 170" aria-hidden="true">
      {/* Funnel shape */}
      <path
        d="M40 30h120l-44 56v40l-32 14V86z"
        fill="#F5F4EF"
        stroke="#17171A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Blocked dots */}
      <circle
        cx="70"
        cy="46"
        r="7"
        fill="#C9C5BB"
        style={{
          animation: isActive ? "gateblock 1000ms ease-in both" : "none",
        }}
      />
      <circle
        cx="130"
        cy="46"
        r="7"
        fill="#C9C5BB"
        style={{
          animation: isActive ? "gateblock 1000ms ease-in 200ms both" : "none",
        }}
      />
      {/* Passing dot */}
      <circle
        cx="100"
        cy="104"
        r="10"
        fill="#D2572B"
        style={{
          animation: isActive ? "gatepass 1400ms cubic-bezier(.4,0,.2,1) both" : "none",
        }}
      />
      <ellipse cx="100" cy="156" rx="56" ry="6" fill="#E3E0D7" />
      <path
        className="rv-arrow"
        d="M178 86h34M204 80l8 6-8 6"
        stroke="#B9B5AB"
        strokeWidth="2"
        fill="none"
        style={{ opacity: isActive ? 0 : 1, transition: "opacity 300ms" }}
      />
    </svg>
  );
}

// Deploy: 3D server with slots
function DeployIllustration({ isActive }: { isActive: boolean }) {
  return (
    <svg width="220" height="170" viewBox="0 0 220 170" aria-hidden="true">
      {/* Server cube */}
      <path
        d="M50 50l60-26 60 26v62l-60 26-60-26z"
        fill="#F5F4EF"
        stroke="#17171A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M50 50l60 26 60-26M110 76v62" stroke="#17171A" strokeWidth="2" fill="none" />
      {/* Slots */}
      <path
        d="M62 72l36 16"
        stroke={isActive ? "#D2572B" : "#B9B5AB"}
        strokeWidth="3"
        style={{ transition: "stroke 300ms 0ms" }}
      />
      <path
        d="M62 88l36 16"
        stroke={isActive ? "#D2572B" : "#B9B5AB"}
        strokeWidth="3"
        style={{ transition: "stroke 300ms 250ms" }}
      />
      <path
        d="M62 104l36 16"
        stroke={isActive ? "#D2572B" : "#B9B5AB"}
        strokeWidth="3"
        style={{ transition: "stroke 300ms 500ms" }}
      />
      {/* Status light */}
      <circle
        cx="140"
        cy="92"
        r="8"
        fill={isActive ? "#D2572B" : "#C9C5BB"}
        style={{
          transition: "fill 300ms 700ms",
          animation: isActive ? "blink 1.4s 1s infinite" : "none",
        }}
      />
      <path d="M124 116l28-12" stroke="#B9B5AB" strokeWidth="2" />
      <ellipse cx="110" cy="156" rx="60" ry="6" fill="#E3E0D7" />
    </svg>
  );
}
