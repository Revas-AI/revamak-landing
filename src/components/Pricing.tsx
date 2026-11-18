"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Get started on your own GPUs",
    features: [
      "One engineer",
      "Own GPUs only",
      "30 days of benchmark history",
    ],
    highlighted: false,
  },
  {
    name: "Team",
    price: "$99",
    period: "/ engineer / month",
    description: "For teams optimizing together",
    features: [
      "Unlimited history",
      "Unlimited sweeps and gates",
      "Shared workspace",
      "From 3 seats",
    ],
    highlighted: true,
  },
  {
    name: "Forward deployed",
    price: "$299",
    period: "/mo + $49 per client",
    description: "Deploy across many clients",
    features: [
      "Everything in Team",
      "Templates and cloning",
      "Client isolation",
      "Per-client cost reports",
    ],
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale deployments",
    features: [
      "Everything in Forward deployed",
      "SSO and audit logs",
      "Own cloud or cluster",
      "Dedicated support",
      "Annual contracts",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="bg-panel rounded-b-[32px] sm:rounded-b-[40px] lg:rounded-b-[60px] py-16 sm:py-24 lg:py-32"
    >
      <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 sm:px-6 xl:px-8">
        {/* Header */}
        <div className="pricing-header text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <p className="font-mono text-xs sm:text-sm text-ember-text tracking-wide uppercase mb-3 sm:mb-4">
            Pricing
          </p>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-ink mb-3 sm:mb-4">
            Planned pricing for launch
          </h2>
          <p className="text-sm sm:text-base text-muted">
            Design partners get early access and help set it.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="pricing-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl ${
                plan.highlighted
                  ? "bg-ink text-on-night"
                  : "bg-card border border-line"
              }`}
            >
              <h3
                className={`font-heading font-semibold text-base sm:text-lg mb-2 ${
                  plan.highlighted ? "text-on-night" : "text-ink"
                }`}
              >
                {plan.name}
              </h3>
              <div className="mb-3 sm:mb-4">
                <span
                  className={`font-heading font-bold text-2xl sm:text-3xl ${
                    plan.highlighted ? "text-on-night" : "text-ink"
                  }`}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={`text-xs sm:text-sm ${
                      plan.highlighted ? "text-on-night-secondary" : "text-muted"
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>
              <p
                className={`text-xs sm:text-sm mb-4 sm:mb-6 ${
                  plan.highlighted ? "text-on-night-secondary" : "text-muted"
                }`}
              >
                {plan.description}
              </p>
              <ul className="space-y-2 sm:space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? "text-ember" : "text-ember-text"
                      }`}
                    />
                    <span
                      className={`text-xs sm:text-sm ${
                        plan.highlighted ? "text-on-night" : "text-ink"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
