import React from "react";

type TypographyProps = {
  children: React.ReactNode;
  color?: string;
  className?: string;
};

// --- MAIN TITLE (Large, Hero Section) ---
export function Title({
  children,
  color = "text-primary-content",
  className = "",
}: TypographyProps) {
  return (
    <h1
      className={`
        text-5xl md:text-6xl lg:text-7xl 
        font-bold 
        ${color}
        drop-shadow-lg 
        tracking-wide 
        ${className}
      `}
    >
      {children}
    </h1>
  );
}

// --- HEADING 1 (Section Header) ---
export function Heading1({
  children,
  color = "text-primary-content",
  className = "",
}: TypographyProps) {
  return (
    <h1
      className={`
        text-2xl md:text-3xl lg:text-4xl 
        font-bold 
        ${color}
        drop-shadow-lg 
        tracking-wide 
        ${className}
      `}
    >
      {children}
    </h1>
  );
}

export function Heading2({
  children,
  color = "text-primary-content",
  className = "",
}: TypographyProps) {
  return (
    <h2
      className={`
        text-lg md:text-xl lg:text-2xl 
        font-bold 
        ${color}
        drop-shadow-lg 
        tracking-wide 
        ${className}
      `}
    >
      {children}
    </h2>
  );
}
