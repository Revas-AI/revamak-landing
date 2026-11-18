"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#how", label: "Product" },
    { href: "#modes", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="max-w-[1440px] xl:max-w-[1600px] mx-auto px-3 sm:px-6 xl:px-8">
        <nav
          className={`flex items-center justify-between rounded-full px-3 sm:px-4 py-2 transition-all duration-300 ${
            isScrolled
              ? "bg-paper/95 backdrop-blur-md shadow-sm"
              : "bg-paper/80 backdrop-blur-sm"
          }`}
        >
          {/* Logo */}
          <Link href="#top" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-wordmark font-semibold text-lg tracking-tight text-ink">
              REVAMAK
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 font-mono text-sm text-muted hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="#join"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper font-mono text-sm font-medium rounded-full hover:bg-ink/90 transition-colors"
            >
              Join the beta
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-paper/95 backdrop-blur-md rounded-2xl shadow-lg">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 font-mono text-sm text-muted hover:text-ink hover:bg-panel rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 px-4 py-3 bg-ink text-paper font-mono text-sm font-medium rounded-lg text-center"
              >
                Join the beta
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
