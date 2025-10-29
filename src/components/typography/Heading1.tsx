import React from "react";

type HeadingProps = {
  children: React.ReactNode;
  color?: string;
  className?: string; // optional extra classes
};

export default function Heading1({
  children,
  color = "text-primary-content",
  className = "",
}: HeadingProps) {
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
