"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Mode {
  id: string;
  title: string;
  description: string;
  steps: { number: string; title: string; description: string }[];
  demo: React.ReactNode;
}

const modes: Mode[] = [
  {
    id: "mode-0",
    title: "Optimize mode",
    description:
      "When a model is headed for production, Revamak finds the cheapest configuration that still meets your latency and quality targets.",
    steps: [
      { number: "01", title: "Profile", description: "Understand your model's resource requirements" },
      {
        number: "02",
        title: "Sweep",
        description: "Declare the options in one file and benchmark every combination on real traffic",
      },
      {
        number: "03",
        title: "Promote",
        description: "Ship the winner on the cost–latency frontier, quality gate passed",
      },
    ],
    demo: <OptimizeDemo />,
  },
  {
    id: "mode-1",
    title: "Forward deployed mode",
    description:
      "For teams deploying AI across many clients: one proven pipeline, a workspace per client, and one bill each.",
    steps: [
      { number: "01", title: "Template", description: "Define your base configuration once" },
      { number: "02", title: "Clone", description: "Each client gets its own workspace" },
      { number: "03", title: "Share", description: "Adapters hot-swap on one base model" },
      { number: "04", title: "Rebill", description: "Track cost per client, ready for the invoice" },
    ],
    demo: <ForwardDeployedDemo />,
  },
  {
    id: "mode-2",
    title: "Operate mode",
    description:
      "Once a model is live, Revamak watches production against the benchmark that justified it, and helps you plan what comes next.",
    steps: [
      { number: "01", title: "Drift", description: "Watch for latency or cost moving away from the benchmark" },
      { number: "02", title: "Rollback", description: "Return to any benchmarked config with one command" },
      { number: "03", title: "Plan", description: "Model capacity changes and costs before you commit" },
    ],
    demo: <OperateDemo />,
  },
];

export function ModesAccordion() {
  const [openMode, setOpenMode] = useState<string>("mode-0");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mode-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-paper py-[clamp(64px,8vw,120px)]">
      <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-[clamp(16px,4vw,64px)]">
        {modes.map((mode) => (
          <div
            key={mode.id}
            id={mode.id}
            className="mode-item border-t-2 border-ink scroll-mt-24"
          >
            {/* Accordion Header */}
            <button
              onClick={() => setOpenMode(openMode === mode.id ? "" : mode.id)}
              className="w-full py-6 flex items-center justify-between text-left min-h-[72px] group"
              aria-expanded={openMode === mode.id}
            >
              <span className="font-heading font-medium text-[clamp(24px,3vw,36px)] text-ink tracking-tight">
                {mode.title}
              </span>
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-ink transition-all duration-300 group-hover:bg-ink group-hover:text-on-night ${
                  openMode === mode.id ? "bg-ink text-on-night rotate-180" : "text-ink"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 7l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {/* Accordion Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openMode === mode.id ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pb-12 flex flex-wrap gap-10 lg:gap-14">
                {/* Left: Description and Steps */}
                <div className="flex-[999_1_420px] flex flex-col gap-6 min-w-0">
                  {/* Description */}
                  <p className="text-lg sm:text-xl text-ink leading-relaxed max-w-[600px]">
                    {mode.description}
                  </p>

                  {/* Progress dots */}
                  <div className="flex items-center gap-1.5">
                    {mode.steps.map((_, i) => (
                      <span
                        key={i}
                        className={`rounded-full transition-all ${
                          i === 0 ? "w-14 h-2 bg-ember" : "w-2 h-2 bg-line"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Steps Grid */}
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-6 gap-y-5">
                    {mode.steps.map((step) => (
                      <div key={step.number} className="flex flex-col gap-1">
                        <p className="font-mono text-xs text-ember-text tracking-wider font-medium">
                          {step.number} {step.title.toUpperCase()}
                        </p>
                        <p className="text-[15px] leading-relaxed text-muted">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Demo Card */}
                <div className="flex-[1_1_320px] w-full sm:max-w-[460px] min-w-0 border-2 border-ember rounded-[20px] sm:rounded-[24px] bg-card p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
                  {mode.demo}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="border-t-2 border-ink" />
      </div>
    </section>
  );
}

// ============ OPTIMIZE MODE DEMO ============
function OptimizeDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [shownCount, setShownCount] = useState(0);
  const [selectedConfig, setSelectedConfig] = useState<number | null>(null);
  const [promoted, setPromoted] = useState<string | null>(null);

  // Filter state for interactive chips
  const [activeQuant, setActiveQuant] = useState<string | null>(null);
  const [activeSpec, setActiveSpec] = useState<string | null>(null);
  const [activeGpu, setActiveGpu] = useState<string | null>(null);

  // Build 12 configs: 3 quant × 2 spec_decode × 2 gpu
  const quants = [
    { name: "fp16", mult: 1.0, drop: 0 },
    { name: "fp8", mult: 0.7, drop: 0.3 },
    { name: "awq", mult: 0.5, drop: 1.5 },
  ];
  const specs = [
    { name: "off", mult: 1.0 },
    { name: "on", mult: 0.65 },
  ];
  const gpus = [
    { name: "A100", lat: 1.0, cost: 1.0 },
    { name: "L40S", lat: 1.3, cost: 0.6 },
  ];

  // Pre-computed noise values for deterministic latency variance
  const noiseValues = [-15, 22, -8, 30, -25, 12, 5, -18, 28, -10, 15, -5];

  const configs = quants.flatMap((q, qi) =>
    specs.flatMap((s, si) =>
      gpus.map((g, gi) => {
        const idx = qi * 4 + si * 2 + gi;
        const baseLat = 320;
        const baseCost = 0.9;
        const lat = Math.round(baseLat * q.mult * s.mult * g.lat + noiseValues[idx]);
        const cost = +(baseCost * q.mult * s.mult * g.cost).toFixed(2);
        const pass = q.drop <= 1;
        const inSlo = lat <= 500;
        return {
          id: `${q.name}-${s.name}-${g.name}`,
          label: `${q.name} + spec ${s.name} on ${g.name}`,
          quant: q.name,
          spec: s.name,
          gpu: g.name,
          lat,
          cost,
          drop: q.drop,
          pass,
          inSlo,
        };
      })
    )
  );

  // Find best (cheapest passing within SLO)
  const bestIdx = configs.reduce((best, c, i) => {
    if (c.pass && c.inSlo) {
      if (best === -1 || c.cost < configs[best].cost) return i;
    }
    return best;
  }, -1);

  const sel = selectedConfig !== null ? configs[selectedConfig] : configs[bestIdx];

  const runSweep = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShownCount(0);
    setSelectedConfig(null);
    setPromoted(null);
    // Reset filters when running new sweep
    setActiveQuant(null);
    setActiveSpec(null);
    setActiveGpu(null);

    let count = 0;
    const timer = setInterval(() => {
      count++;
      setShownCount(count);
      if (count >= configs.length) {
        clearInterval(timer);
        setIsRunning(false);
      }
    }, 150);
  };

  // Count matching configs for current filter
  const matchingConfigs = configs.filter((c) => {
    const matchesQuant = activeQuant === null || c.quant === activeQuant;
    const matchesSpec = activeSpec === null || c.spec === activeSpec;
    const matchesGpu = activeGpu === null || c.gpu === activeGpu;
    return matchesQuant && matchesSpec && matchesGpu;
  });
  const hasActiveFilter = activeQuant !== null || activeSpec !== null || activeGpu !== null;

  const handlePromote = () => {
    if (sel.pass && sel.inSlo) {
      setPromoted(sel.label);
    }
  };

  // Calculate chart positions
  const costs = configs.map((c) => c.cost);
  const lats = configs.map((c) => c.lat);
  const minC = Math.min(...costs), maxC = Math.max(...costs);
  const minL = Math.min(...lats), maxL = Math.max(...lats);
  const px = (cost: number) => 6 + ((cost - minC) / (maxC - minC)) * 88;
  const py = (lat: number) => 92 - ((lat - minL) / (maxL - minL)) * 84;
  const sloY = py(500);

  // Compute Pareto frontier (optimal cost-latency tradeoffs for passing configs)
  const frontierPoints = configs
    .map((c, i) => ({ ...c, idx: i }))
    .filter((c) => c.pass && c.inSlo)
    .sort((a, b) => a.cost - b.cost)
    .reduce<typeof configs>((frontier, c) => {
      if (frontier.length === 0 || c.lat < frontier[frontier.length - 1].lat) {
        frontier.push(c);
      }
      return frontier;
    }, []);

  const frontierPath = frontierPoints.length > 1
    ? `M${frontierPoints.map((c) => `${px(c.cost)},${py(c.lat)}`).join("L")}`
    : "";

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center gap-3">
        <p className="font-mono text-xs tracking-wider text-muted uppercase">
          Sweep · support-classifier
        </p>
        <button
          onClick={runSweep}
          disabled={isRunning}
          className={`font-mono text-xs tracking-wider px-4 py-3 rounded-[10px] min-h-[44px] transition-colors ${
            isRunning
              ? "bg-panel text-muted cursor-not-allowed"
              : "bg-ink text-on-night hover:bg-ink/90"
          }`}
        >
          {isRunning ? `RUNNING ${shownCount}/${configs.length}` : "RUN SWEEP"}
        </button>
      </div>

      {/* Config chips (sweep.yaml) - Interactive */}
      <div className="flex flex-col gap-2 p-3 sm:p-3.5 bg-ink rounded-xl">
        {/* Quant options */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] text-on-night/50 w-16 sm:w-20">quant:</span>
          {["fp16", "fp8", "awq"].map((q) => (
            <button
              key={q}
              onClick={() => setActiveQuant(activeQuant === q ? null : q)}
              className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded text-[10px] sm:text-xs font-mono transition-all ${
                activeQuant === q
                  ? "bg-ember text-white"
                  : activeQuant === null
                  ? "bg-on-night/10 text-on-night hover:bg-on-night/20"
                  : "bg-on-night/5 text-on-night/40"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
        {/* Spec decode options */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] text-on-night/50 w-16 sm:w-20">spec_decode:</span>
          {["off", "on"].map((s) => (
            <button
              key={s}
              onClick={() => setActiveSpec(activeSpec === s ? null : s)}
              className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded text-[10px] sm:text-xs font-mono transition-all ${
                activeSpec === s
                  ? "bg-ember text-white"
                  : activeSpec === null
                  ? "bg-on-night/10 text-on-night hover:bg-on-night/20"
                  : "bg-on-night/5 text-on-night/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {/* GPU options */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] text-on-night/50 w-16 sm:w-20">gpu:</span>
          {["A100", "L40S"].map((g) => (
            <button
              key={g}
              onClick={() => setActiveGpu(activeGpu === g ? null : g)}
              className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded text-[10px] sm:text-xs font-mono transition-all ${
                activeGpu === g
                  ? "bg-ember text-white"
                  : activeGpu === null
                  ? "bg-on-night/10 text-on-night hover:bg-on-night/20"
                  : "bg-on-night/5 text-on-night/40"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Latency vs Cost Chart */}
      <div className="relative bg-panel/50 rounded-xl p-3 sm:p-4">
        {/* Chart container */}
        <div className="relative h-[140px] sm:h-[160px]">
          {/* Y-axis label */}
          <div className="absolute -left-1 top-0 bottom-0 flex items-center">
            <span className="font-mono text-[9px] text-muted -rotate-90 whitespace-nowrap">latency (ms)</span>
          </div>

          {/* Chart area */}
          <div className="ml-6 h-full relative">
            <svg
              viewBox="0 0 200 120"
              className="w-full h-full"
              style={{ overflow: 'visible' }}
            >
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#E3E0D7" strokeWidth="0.5" opacity="0.5"/>
                </pattern>
              </defs>
              <rect x="10" y="5" width="180" height="100" fill="url(#grid)" />

              {/* Axes */}
              <line x1="10" y1="105" x2="190" y2="105" stroke="#D6D2C8" strokeWidth="1.5" />
              <line x1="10" y1="5" x2="10" y2="105" stroke="#D6D2C8" strokeWidth="1.5" />

              {/* SLO line at 500ms */}
              <line
                x1="10"
                y1={10 + (1 - (500 - minL) / (maxL - minL)) * 90}
                x2="190"
                y2={10 + (1 - (500 - minL) / (maxL - minL)) * 90}
                stroke="#D2572B"
                strokeWidth="1.5"
                strokeDasharray="6 3"
                opacity="0.7"
              />
              <text
                x="192"
                y={10 + (1 - (500 - minL) / (maxL - minL)) * 90 + 3}
                className="font-mono"
                fontSize="8"
                fill="#AE431D"
              >
                SLO
              </text>

              {/* Pareto frontier line */}
              {shownCount >= configs.length && frontierPoints.length > 1 && (
                <path
                  d={`M${frontierPoints.map((c) => {
                    const x = 15 + ((c.cost - minC) / (maxC - minC)) * 170;
                    const y = 10 + (1 - (c.lat - minL) / (maxL - minL)) * 90;
                    return `${x},${y}`;
                  }).join("L")}`}
                  fill="none"
                  stroke="#D2572B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.4"
                />
              )}

              {/* Config points */}
              {configs.map((c, i) => {
                if (i >= shownCount) return null;

                const x = 15 + ((c.cost - minC) / (maxC - minC)) * 170;
                const y = 10 + (1 - (c.lat - minL) / (maxL - minL)) * 90;
                const isSelected = selectedConfig === i || (selectedConfig === null && i === bestIdx);
                const isOnFrontier = frontierPoints.some((f) => f.id === c.id);

                // Check if config matches active filters
                const matchesQuant = activeQuant === null || c.quant === activeQuant;
                const matchesSpec = activeSpec === null || c.spec === activeSpec;
                const matchesGpu = activeGpu === null || c.gpu === activeGpu;
                const matchesFilter = matchesQuant && matchesSpec && matchesGpu;

                // Determine color
                let fill = "#17171A"; // ink - default for passing
                if (!matchesFilter && hasActiveFilter) {
                  fill = "#D6D2C8"; // line - faded
                } else if (!c.pass) {
                  fill = "#D6D2C8"; // line - failed gate
                } else if (!c.inSlo) {
                  fill = "#AE431D"; // ember-text - over SLO
                } else if (isSelected || (matchesFilter && hasActiveFilter)) {
                  fill = "#D2572B"; // ember - selected/highlighted
                }

                const radius = isSelected ? 7 : (matchesFilter && hasActiveFilter) || isOnFrontier ? 5.5 : 4.5;
                const opacity = !matchesFilter && hasActiveFilter ? 0.25 : 1;

                return (
                  <g key={c.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedConfig(i)}>
                    {/* Outer ring for selected */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r={radius + 3}
                        fill="none"
                        stroke="#D2572B"
                        strokeWidth="1.5"
                        opacity="0.4"
                      />
                    )}
                    {/* Main point */}
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill={fill}
                      opacity={opacity}
                      className="transition-all duration-200"
                    />
                    {/* Inner highlight for passing configs */}
                    {c.pass && c.inSlo && !isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r={radius * 0.4}
                        fill="white"
                        opacity={opacity * 0.3}
                      />
                    )}
                  </g>
                );
              })}

              {/* Axis labels */}
              <text x="100" y="118" textAnchor="middle" className="font-mono" fontSize="9" fill="#57554F">
                cost per 1M tokens ($)
              </text>
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-2 pt-2 border-t border-line/50">
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted">
            <span className="w-2 h-2 rounded-full bg-ink" /> passing
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted">
            <span className="w-2 h-2 rounded-full bg-ember-text" /> over SLO
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted">
            <span className="w-2 h-2 rounded-full bg-line" /> fails gate
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-ember">
            <span className="w-2 h-2 rounded-full bg-ember" /> selected
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        <div className="bg-panel rounded-xl p-2.5 sm:p-3 text-center">
          <p className="font-mono text-[9px] sm:text-[10px] text-muted mb-0.5 uppercase">P95 Latency</p>
          <p className="font-heading font-semibold text-sm sm:text-base text-ink">{sel.lat}ms</p>
        </div>
        <div className="bg-panel rounded-xl p-2.5 sm:p-3 text-center">
          <p className="font-mono text-[9px] sm:text-[10px] text-muted mb-0.5 uppercase">Cost/1M</p>
          <p className="font-heading font-semibold text-sm sm:text-base text-ink">${sel.cost}</p>
        </div>
        <div className="bg-panel rounded-xl p-2.5 sm:p-3 text-center">
          <p className="font-mono text-[9px] sm:text-[10px] text-muted mb-0.5 uppercase">Quality</p>
          <p className="font-heading font-semibold text-sm sm:text-base text-ink">
            {sel.drop === 0 ? "0.0%" : `−${sel.drop.toFixed(1)}%`}
          </p>
        </div>
        <div className="bg-panel rounded-xl p-2.5 sm:p-3 text-center">
          <p className="font-mono text-[9px] sm:text-[10px] text-muted mb-0.5 uppercase">Gate</p>
          <p
            className={`font-heading font-semibold text-sm sm:text-base ${
              sel.pass && sel.inSlo ? "text-ink" : "text-ember-text"
            }`}
          >
            {!sel.pass ? "Fail" : sel.inSlo ? "Pass" : "SLO"}
          </p>
        </div>
      </div>

      {/* Promote button */}
      <button
        onClick={handlePromote}
        disabled={!sel.pass || !sel.inSlo}
        className={`w-full font-mono text-xs tracking-wider py-3.5 rounded-[10px] min-h-[44px] transition-colors ${
          sel.pass && sel.inSlo
            ? "bg-ember text-white hover:bg-ember/90"
            : "bg-line text-muted cursor-not-allowed"
        }`}
      >
        {sel.pass && sel.inSlo ? "PROMOTE TO STAGING" : "BLOCKED BY GATE OR SLO"}
      </button>

      {/* Note */}
      <p className="font-mono text-[11px] text-muted text-center leading-relaxed">
        {promoted
          ? `Promoted to staging. ${Math.round((1 - sel.cost / 0.9) * 100)}% cheaper than fp16 baseline.`
          : hasActiveFilter
          ? `${matchingConfigs.length} config${matchingConfigs.length !== 1 ? "s" : ""} match${matchingConfigs.length === 1 ? "es" : ""} your filter. Click to compare.`
          : sel.pass
          ? "Click chips to filter. Click points to compare."
          : "awq drops quality more than the 1% gate allows."}
      </p>
    </>
  );
}

// ============ FORWARD DEPLOYED MODE DEMO ============
function ForwardDeployedDemo() {
  const [clients, setClients] = useState([
    { name: "clinic-intake", adapter: "v3", w: 38 },
    { name: "retail-support", adapter: "v7", w: 34 },
    { name: "invoice-extract", adapter: "v2", w: 28 },
  ]);
  const [selectedClient, setSelectedClient] = useState(0);
  const [addedCount, setAddedCount] = useState(0);

  const totalWeight = clients.reduce((a, c) => a + c.w, 0);
  const poolCost = 2400;

  const addClient = () => {
    if (clients.length >= 6) return;
    const n = addedCount + 1;
    const newClient = { name: `new-client-${n}`, adapter: "v1", w: 18 };
    setClients([...clients, newClient]);
    setAddedCount(n);
    setSelectedClient(clients.length);
  };

  const colors = ["#D2572B", "#6B6965", "#8F8C85", "#A39F98", "#B9B5AB", "#7A7672"];

  return (
    <>
      {/* Header */}
      <p className="font-mono text-xs tracking-wider text-muted uppercase">
        Shared base · 8B model · 1 GPU pool
      </p>

      {/* Pool bar */}
      <div className="h-7 rounded-full overflow-hidden flex shadow-inner">
        {clients.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setSelectedClient(i)}
            className="transition-all duration-500 hover:brightness-110"
            style={{
              flex: `${c.w} 1 0px`,
              background: i === selectedClient ? "#D2572B" : colors[(i % 5) + 1],
            }}
            aria-label={`Select ${c.name}`}
          />
        ))}
      </div>

      {/* Selected client info */}
      <div className="flex items-center gap-2 text-[13px] text-muted px-1">
        <span className="w-2.5 h-2.5 rounded-full bg-ember flex-shrink-0" />
        <span className="font-mono truncate">
          {clients[selectedClient]?.name}
        </span>
        <span className="font-mono text-xs text-line">·</span>
        <span className="font-mono text-xs">
          {clients[selectedClient]?.adapter}
        </span>
        <span className="ml-auto font-mono text-xs">
          {Math.round((clients[selectedClient]?.w / totalWeight) * 100)}% of pool
        </span>
      </div>

      {/* Client list */}
      <div className="flex flex-col gap-1.5">
        {clients.map((c, i) => {
          const isSelected = i === selectedClient;
          const pct = Math.round((c.w / totalWeight) * 100);
          const cost = Math.round((poolCost * c.w) / totalWeight);
          return (
            <button
              key={c.name}
              onClick={() => setSelectedClient(i)}
              className={`flex justify-between items-center gap-2 sm:gap-3 w-full min-h-[44px] rounded-xl px-3 sm:px-4 py-2.5 text-sm text-left transition-all ${
                isSelected
                  ? "bg-panel ring-2 ring-ember/30"
                  : "bg-paper/50 hover:bg-panel/70"
              }`}
              aria-pressed={isSelected}
            >
              <span className="font-mono text-ink text-[12px] sm:text-[13px] truncate">{c.name}</span>
              <span className="flex items-center gap-2 sm:gap-3 text-muted flex-shrink-0">
                <span className="font-mono text-[10px] sm:text-[11px] bg-panel px-1.5 sm:px-2 py-0.5 rounded">{c.adapter}</span>
                <span className="font-mono text-[10px] sm:text-[11px] w-7 sm:w-8 text-right">{pct}%</span>
                <span className="font-mono text-[10px] sm:text-[11px] w-9 sm:w-10 text-right">${cost}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Add client button */}
      <button
        onClick={addClient}
        disabled={clients.length >= 6}
        className={`w-full py-3.5 rounded-xl border-2 border-dashed font-mono text-xs tracking-wider min-h-[44px] transition-all ${
          clients.length >= 6
            ? "border-line text-muted cursor-not-allowed"
            : "border-line text-muted hover:border-ember hover:text-ember hover:bg-ember/5"
        }`}
      >
        {clients.length >= 6
          ? "DEMO LIMIT: 6 WORKSPACES"
          : "CLONE INTO NEW CLIENT WORKSPACE"}
      </button>

      {/* Note */}
      <p className="font-mono text-[11px] text-muted text-center leading-relaxed">
        Each workspace tracks its own adapters, usage and costs.
      </p>
    </>
  );
}

// ============ OPERATE MODE DEMO ============
function OperateDemo() {
  const [hasDrift, setHasDrift] = useState(true);
  const [rolled, setRolled] = useState(false);
  const [rps, setRps] = useState(120);

  const replicas = Math.max(1, Math.ceil(rps / 45));
  const monthlyCost = replicas * 1200;

  const handleRollback = () => {
    setHasDrift(false);
    setRolled(true);
  };

  const simulateDrift = () => {
    setHasDrift(true);
    setRolled(false);
  };

  return (
    <>
      {/* Header */}
      <p className="font-mono text-xs tracking-wider text-muted uppercase">
        Production · support-classifier
      </p>

      {/* Chart */}
      <div className="bg-ink rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-mono text-[10px] text-on-night/60">p95 latency</span>
          <span className="font-mono text-[10px] text-on-night/60">benchmark</span>
        </div>
        <svg
          viewBox="0 0 360 120"
          className="w-full"
          role="img"
          aria-label={hasDrift ? "Production latency rising above the benchmark line" : "Production latency tracking the benchmark line"}
        >
          {/* Benchmark line (dashed) */}
          <path
            d="M10 70H350"
            stroke="#EEECE6"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.5"
          />
          <text x="354" y="74" fill="#EEECE6" fontSize="9" fontFamily="monospace" opacity="0.6">BM</text>
          {/* Latency line */}
          <path
            d={
              hasDrift
                ? "M10 72L60 69L110 73L160 70L210 68L250 56L290 42L330 34L350 30"
                : "M10 74L60 71L110 75L160 72L210 74L250 71L290 73L330 70L350 72"
            }
            stroke="#D2572B"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* End point */}
          <circle
            cx="350"
            cy={hasDrift ? 30 : 72}
            r="5"
            fill="#D2572B"
          />
          {hasDrift && (
            <circle
              cx="350"
              cy={30}
              r="8"
              fill="#D2572B"
              opacity="0.3"
              className="animate-ping"
            />
          )}
        </svg>
      </div>

      {/* Alert or OK message */}
      {hasDrift ? (
        <div className="bg-ink text-on-night rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-ember mt-1.5 flex-shrink-0 animate-pulse" />
            <p className="text-sm leading-relaxed">
              <span className="font-semibold">Drift alert.</span> p95 is 18% over its benchmark since deploy #42.
            </p>
          </div>
          <button
            onClick={handleRollback}
            className="self-start font-mono text-xs tracking-wider bg-on-night text-ink px-4 py-2.5 rounded-[10px] min-h-[44px] hover:bg-on-night/90 transition-colors"
          >
            ROLL BACK TO CONFIG #41
          </button>
        </div>
      ) : (
        <div className="bg-ink text-on-night rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
            <p className="text-sm leading-relaxed">
              {rolled
                ? "Rolled back to config #41. p95 is back within its benchmark."
                : "All systems nominal. p95 is tracking the benchmark."}
            </p>
          </div>
          <button
            onClick={simulateDrift}
            className="self-start font-mono text-xs tracking-wider bg-on-night/10 text-on-night px-4 py-2.5 rounded-[10px] min-h-[44px] hover:bg-on-night/20 transition-colors"
          >
            SIMULATE A BAD DEPLOY
          </button>
        </div>
      )}

      {/* Capacity planner */}
      <div className="bg-panel rounded-xl p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] text-muted uppercase tracking-wider">Capacity Planner</span>
          <span className="font-mono text-sm font-medium text-ink">{rps} req/sec</span>
        </div>
        <input
          type="range"
          min={20}
          max={600}
          value={rps}
          onChange={(e) => setRps(Number(e.target.value))}
          className="w-full accent-ember h-2 rounded-full appearance-none bg-line cursor-pointer"
        />
        <div className="flex justify-between text-xs font-mono text-muted">
          <span>{replicas} L40S replica{replicas > 1 ? "s" : ""}</span>
          <span className="font-medium text-ink">${monthlyCost.toLocaleString()}/mo</span>
        </div>
      </div>
    </>
  );
}
