"use client";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function Logo({ className = "w-10 h-10", variant = "default" }: LogoProps) {
  const inkColor = variant === "light" ? "#EEECE6" : "#17171A";
  const emberColor = "#D2572B";

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Five dots converging into one ember dot */}
      {/* Top left */}
      <circle cx="8" cy="8" r="4" fill={inkColor} />
      {/* Top right */}
      <circle cx="32" cy="8" r="4" fill={inkColor} />
      {/* Middle left */}
      <circle cx="6" cy="24" r="4" fill={inkColor} />
      {/* Middle right */}
      <circle cx="34" cy="24" r="4" fill={inkColor} />
      {/* Bottom center - larger ember dot */}
      <circle cx="20" cy="34" r="6" fill={emberColor} />
    </svg>
  );
}

export function LogoMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="2.5" fill="#17171A" />
      <circle cx="20" cy="4" r="2.5" fill="#17171A" />
      <circle cx="3" cy="14" r="2.5" fill="#17171A" />
      <circle cx="21" cy="14" r="2.5" fill="#17171A" />
      <circle cx="12" cy="20" r="3.5" fill="#D2572B" />
    </svg>
  );
}
