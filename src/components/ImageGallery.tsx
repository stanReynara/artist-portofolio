"use client";
import { useEffect, useRef, useState } from "react";
import { animate, createScope, spring } from "animejs";
import Image from "next/image";

type Props = {
  width?: number; // number of columns (1–6)
  children: React.ReactNode;
};

export default function ImageGallery({ width = 3, children }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const root = useRef<HTMLDivElement | null>(null);
  const scope = useRef<any>(null);

  const columnsClass = {
    1: "columns-1",
    2: "columns-2",
    3: "columns-3",
    4: "columns-4",
    5: "columns-5",
    6: "columns-6",
  }[Math.min(Math.max(width, 1), 6)];

  useEffect(() => {
    // Initialize Anime.js scope
    scope.current = createScope({ root }).add((self) => {
      // Define an opening animation for the modal
      // showModal
      self.add("showModal", () => {
        animate(".gallery-modal", {
          opacity: [0, 1], // fade in backdrop
          duration: 300,
          ease: "linear",
        });

        animate(".gallery-modal-content", {
          scale: [0.95, 1], // pop in content
          opacity: [0, 1],
          ease: spring({ bounce: 0.15, duration: 300 }),
        });
      });

      // hideModal
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

  // Handle showing animation when selectedImage changes
  useEffect(() => {
    if (selectedImage) {
      setTimeout(() => {
        scope.current?.methods.showModal();
      }, 10);
    }
  }, [selectedImage]);

  const handleClose = () => {
    if (!scope.current) return;

    // Call hideModal and only set the image to null after animation completes
    scope.current.methods.hideModal(() => {
      // This callback now only runs after the animation
      setSelectedImage(null);
    });
  };

  return (
    <div ref={root}>
      {/* Gallery Grid */}
      <div className={`${columnsClass} gap-4`}>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <div
                key={index}
                className="
                  break-inside-avoid mb-4 overflow-hidden rounded-lg
                  transition-transform duration-300 ease-out
                  hover:scale-105 hover:z-10 cursor-pointer
                  shadow-md hover:shadow-xl
                "
                onClick={() => {
                  if (
                    typeof child === "object" &&
                    "props" in child &&
                    child?.props?.src
                  ) {
                    setSelectedImage(child.props.src);
                  }
                }}
              >
                {child}
              </div>
            ))
          : children}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="
      gallery-modal fixed inset-0 z-50 flex items-center justify-center
      bg-black/70 backdrop-blur-sm
      opacity-0
    "
          onClick={handleClose}
        >
          <div className="gallery-modal-content relative max-w-5xl w-full p-4 transform-gpu">
            <Image
              src={selectedImage}
              alt="Selected image"
              width={1200}
              height={800}
              className="mx-auto rounded-lg shadow-2xl max-h-[80vh] object-contain cursor-zoom-out"
            />
            <button
              className="
          absolute top-4 right-6 text-white text-3xl font-bold
          hover:scale-110 transition
        "
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
