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
      {/* Four dots converging toward ember dot on the right */}
      {/* Top left */}
      <circle cx="8" cy="6" r="5" fill={inkColor} />
      {/* Center */}
      <circle cx="18" cy="20" r="5" fill={inkColor} />
      {/* Bottom left */}
      <circle cx="6" cy="34" r="5" fill={inkColor} />
      {/* Right - ember dot */}
      <circle cx="34" cy="20" r="5" fill={emberColor} />
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
      {/* Four dots converging toward ember dot on the right */}
      <circle cx="5" cy="4" r="3" fill="#17171A" />
      <circle cx="11" cy="12" r="3" fill="#17171A" />
      <circle cx="4" cy="20" r="3" fill="#17171A" />
      <circle cx="20" cy="12" r="3" fill="#D2572B" />
    </svg>
  );
}
