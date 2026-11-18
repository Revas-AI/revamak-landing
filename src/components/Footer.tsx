"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Mail, ExternalLink } from "lucide-react";
import { Logo } from "./Logo";

gsap.registerPlugin(ScrollTrigger);

// Custom brand icons
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-cta",
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
        ".footer-wordmark",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: ".footer-wordmark",
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { href: "#how", label: "Product" },
    { href: "#modes", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
  ];

  const connectLinks = [
    { href: "https://github.com", label: "GitHub", icon: GitHubIcon },
    { href: "https://linkedin.com", label: "LinkedIn", icon: LinkedInIcon },
    { href: "mailto:hello@revamak.com", label: "Contact", icon: Mail },
  ];

  return (
    <footer ref={sectionRef} id="join" className="bg-night pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12">
      <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 sm:px-6 xl:px-8">
        {/* CTA Section */}
        <div className="footer-cta text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-on-night leading-tight mb-5 sm:mb-6 px-2">
            Make every token cheaper, and keep the know-how with your team.
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
            <Link
              href="#"
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 bg-paper text-ink font-mono text-xs sm:text-sm font-medium rounded-[10px] hover:bg-paper/90 transition-colors"
            >
              Become a design partner
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-ember text-white rounded-[10px] hover:bg-ember/90 transition-colors"
              aria-label="Get started"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-12 border-t border-on-night/10">
          {/* Logo */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo className="w-8 h-8" variant="light" />
              <span className="font-wordmark font-semibold text-lg text-on-night">
                REVAMAK
              </span>
            </div>
            <p className="text-sm text-on-night-secondary">
              The inference engineering workbench
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-mono text-xs text-on-night-secondary uppercase tracking-wide mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-on-night hover:text-ember transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-xs text-on-night-secondary uppercase tracking-wide mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-on-night hover:text-ember transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Beta */}
          <div>
            <h4 className="font-mono text-xs text-on-night-secondary uppercase tracking-wide mb-4">
              Early access
            </h4>
            <p className="text-sm text-on-night-secondary mb-4">
              Join as a design partner and help shape the product.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 bg-on-night/10 text-on-night font-mono text-xs font-medium rounded-lg hover:bg-on-night/20 transition-colors"
            >
              Join the beta
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-on-night/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
            <p className="text-sm text-on-night-secondary">
              © 2026 Revamak
            </p>
            <p className="text-sm text-on-night-secondary">
              Built in Accra, for teams everywhere
            </p>
          </div>

          {/* Giant wordmark */}
          <div className="footer-wordmark text-center overflow-hidden">
            <h2 className="font-wordmark font-semibold text-[15vw] sm:text-[12vw] text-on-night/5 leading-none">
              REVAMAK
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
