"use client";

import { useId } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/components/ui/carousel";

type Props = {
  title: string;
  description: string;
  images?: Image[];
  variations?: Record<string, string>;
};

type Image = {
  src: string;
  description: string;
  redirect: string | null;
};

export default function PriceCard({
  title,
  description,
  images = [],
  variations,
}: Props) {
  const uniqueId = useId();

  if (images.length === 0) {
    images = [
      {
        src: "https://placehold.co/400x200?text=No+Image",
        description: "Placeholder",
        redirect: null,
      },
    ];
  }

  return (
    <div className="card bg-base-100 w-full shadow-sm overflow-hidden">
      <div className="relative group">
        {/* shadcn Carousel */}
        <Carousel className="w-full h-56">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index}>
                <img
                  src={img.src}
                  alt={img.description}
                  className="w-full h-56 object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Hover buttons (shadcn) */}
          {images.length > 1 && (
            <>
              <CarouselPrevious
                className="
                  absolute left-3 top-1/2 -translate-y-1/2 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                  bg-base-200/70 hover:bg-base-200/90 border-none w-8 h-8
                "
              />
              <CarouselNext
                className="
                  absolute right-3 top-1/2 -translate-y-1/2 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                  bg-base-200/70 hover:bg-base-200/90 border-none w-8 h-8
                "
              />
            </>
          )}
        </Carousel>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <h2 className="card-title text-neutral">{title}</h2>
        <p className="text-sm text-neutral">{description}</p>

        <br />

        {/* Variations */}
        {variations && (
          <div className="flex flex-col gap-1 mt-2">
            {Object.entries(variations).map(([variant, cost]) => (
              <div
                key={variant}
                className="flex justify-between items-center border-b border-neutral pb-1 last:border-none"
              >
                <span className="text-sm text-neutral">{variant}</span>
                <div className="flex items-center gap-2">
                  <span className="opacity-30 text-neutral">|</span>
                  <span className="text-sm text-neutral">{cost}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="card-actions justify-end">
          <button className="btn btn-primary">Contact</button>
        </div>
      </div>
    </div>
  );
}
