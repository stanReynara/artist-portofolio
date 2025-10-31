"use client";
import { useEffect, useRef, useState } from "react";
import { animate, createScope, spring } from "animejs";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";

type Props = {
  src: string;
  description: string;
  width: number;
  height: number;
  redirect: string | null;
};

// TODO: Images are still unoptimized since they are large in size
export default function ImageWork({
  src,
  description,
  width = 400,
  height = 400,
  redirect = null,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const scope = useRef<any>(null);

  // Initialize Anime.js scope
  useEffect(() => {
    scope.current = createScope({ root }).add((self) => {
      if (!self) return;

      self.add("showModal", () => {
        animate(".gallery-modal", {
          opacity: [0, 1],
          duration: 300,
          ease: "linear",
        });
        animate(".gallery-modal-content", {
          scale: [0.95, 1],
          opacity: [0, 1],
          ease: spring({ bounce: 0.15, duration: 300 }),
        });
      });

      self.add("hideModal", (onFinish: () => void) => {
        animate(".gallery-modal-content", {
          scale: [1, 0.95],
          opacity: [1, 0],
          ease: spring({ bounce: 0.15, duration: 300 }),
        });
        animate(".gallery-modal", {
          opacity: [1, 0],
          duration: 300,
          ease: "linear",
          onComplete: onFinish,
        });
      });
    });

    return () => scope.current?.revert();
  }, []);

  // Show modal animation
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scope.current?.methods.showModal();
      }, 10);
    }
  }, [isOpen]);

  const handleOpen = () => {
    if (redirect) {
      window.open(redirect, "_blank");
    } else {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    scope.current?.methods.hideModal(() => {
      setIsOpen(false);
    });
  };

  return (
    <div ref={root} className="group relative break-inside-avoid mb-4">
      {/* Thumbnail */}
      <div
        className="
          relative overflow-hidden rounded-lg shadow-md
          transition-transform duration-300 ease-out
          hover:scale-105 hover:z-10 cursor-pointer hover:shadow-xl
        "
        onClick={handleOpen}
      >
        <Image
          src={src}
          alt={description}
          width={width}
          height={height}
          className="object-cover w-full h-auto"
          unoptimized
        />

        {/* Hover overlay */}
        <div
          className="
            absolute inset-0 flex items-center justify-center
            bg-black/0 group-hover:bg-black/60
            opacity-0 group-hover:opacity-100
            transition-all duration-300
          "
        >
          <span className="text-white text-lg font-semibold">
            {description}
          </span>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="
            gallery-modal fixed inset-0 z-50 flex items-center justify-center
            bg-black/70 backdrop-blur-sm opacity-0
          "
          onClick={handleClose}
        >
          <button
            className="
              absolute top-6 right-8 text-white text-4xl font-bold
              hover:scale-110 transition z-60 cursor-pointer
            "
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <IoCloseOutline />
          </button>

          <div className="gallery-modal-content relative max-w-5xl w-full p-4 transform-gpu">
            <Image
              src={src}
              alt={description}
              width={1200}
              height={800}
              className="mx-auto rounded-lg shadow-2xl max-h-[80vh] object-contain cursor-zoom-out"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}
