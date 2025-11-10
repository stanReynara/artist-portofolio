"use client";
import { useId } from "react";

type Props = {
  title: string;
  description: string;
  price: string;
  images?: Image[];
};

type Image = {
  src: string;
  description: string;
  redirect: string | null;
};

export default function PriceCard({
  title,
  description,
  price,
  images = [],
}: Props) {
  const uniqueId = useId(); // 👈 ensures each card has a unique base ID

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
    <div className="card bg-base-100 w-96 shadow-sm overflow-hidden">
      <figure className="relative group">
        {/* DaisyUI carousel */}
        <div className="carousel w-full h-56">
          {images.map((img, index) => {
            const prev = index === 0 ? images.length - 1 : index - 1;
            const next = (index + 1) % images.length;

            return (
              <div
                key={index}
                id={`${uniqueId}-slide${index + 1}`}
                className="carousel-item relative w-full"
              >
                <img
                  src={img.src}
                  alt={img.description}
                  className="w-full h-full object-cover"
                  draggable={false}
                />

                {/* DaisyUI native navigation using href */}
                <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={`#${uniqueId}-slide${prev + 1}`}
                    className="btn btn-circle btn-sm bg-base-200/70 hover:bg-base-200/90 border-none"
                  >
                    ❮
                  </a>
                  <a
                    href={`#${uniqueId}-slide${next + 1}`}
                    className="btn btn-circle btn-sm bg-base-200/70 hover:bg-base-200/90 border-none"
                  >
                    ❯
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <a
                key={i}
                href={`#${uniqueId}-slide${i + 1}`}
                className="w-2 h-2 rounded-full bg-base-content/40 hover:bg-base-content/80 transition-all"
              />
            ))}
          </div>
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title text-neutral">{title}</h2>
        <p className="text-sm text-neutral">
          {description}
          <br />
          {price}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Contact</button>
        </div>
      </div>
    </div>
  );
}
