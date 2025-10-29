import React from "react";

type TitleProps = {
  children: React.ReactNode;
  className?: string; // optional extra classes
};

export default function Title({ children, className = "" }: TitleProps) {
  return (
    <h1
      className={`
        text-5xl md:text-6xl lg:text-7xl 
        font-bold 
        text-primary-content
        drop-shadow-lg 
        tracking-wide 
        ${className}
      `}
    >
      {children}
    </h1>
  );
}
