import React from "react";

type Props = {
  width?: number; // number of columns (1–6)
  children: React.ReactNode;
};

export default function ImageGallery({ width = 3, children }: Props) {
  const columnsClass = {
    1: "columns-1",
    2: "columns-2",
    3: "columns-3",
    4: "columns-4",
    5: "columns-5",
    6: "columns-6",
  }[Math.min(Math.max(width, 1), 6)]; // max of 6 columns

  return (
    <div className={`${columnsClass} gap-4`}>
      {React.Children.map(children, (child) => (
        <div
          className="
            break-inside-avoid 
            mb-4 
            overflow-hidden 
            rounded-lg 
            transition-transform 
            duration-300 
            ease-out 
            hover:scale-105
            hover:z-10
            cursor-pointer
            shadow-md hover:shadow-xl
          "
        >
          {child}
        </div>
      ))}
    </div>
  );
}
