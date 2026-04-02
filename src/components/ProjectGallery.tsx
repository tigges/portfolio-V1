"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <>
      {images.length === 1 ? (
        <SingleImage image={images[0]} title={title} onClick={() => openLightbox(0)} />
      ) : images.length === 2 ? (
        <TwoImageLayout images={images} title={title} onOpen={openLightbox} />
      ) : (
        <MasonryLayout images={images} title={title} onOpen={openLightbox} />
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          alt={title}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

function SingleImage({
  image,
  title,
  onClick,
}: {
  image: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden group cursor-zoom-in"
    >
      <Image
        src={image}
        alt={`${title} — Image 1`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        sizes="(max-width: 1280px) 100vw, 1280px"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      <ZoomIcon />
    </button>
  );
}

function TwoImageLayout({
  images,
  title,
  onOpen,
}: {
  images: string[];
  title: string;
  onOpen: (i: number) => void;
}) {
  return (
    <div className="space-y-3">
      <button
        onClick={() => onOpen(0)}
        className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden group cursor-zoom-in"
      >
        <Image
          src={images[0]}
          alt={`${title} — Image 1`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        <ZoomIcon />
      </button>
      <button
        onClick={() => onOpen(1)}
        className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden group cursor-zoom-in"
      >
        <Image
          src={images[1]}
          alt={`${title} — Image 2`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 1280px) 100vw, 1280px"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        <ZoomIcon />
      </button>
    </div>
  );
}

function MasonryLayout({
  images,
  title,
  onOpen,
}: {
  images: string[];
  title: string;
  onOpen: (i: number) => void;
}) {
  return (
    <div className="space-y-3">
      {/* Hero image (first image full width) */}
      <button
        onClick={() => onOpen(0)}
        className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden group cursor-zoom-in"
      >
        <Image
          src={images[0]}
          alt={`${title} — Image 1`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        <ZoomIcon />
      </button>

      {/* Remaining images in a 2-column grid */}
      <div className="grid grid-cols-2 gap-3">
        {images.slice(1).map((img, i) => (
          <button
            key={i + 1}
            onClick={() => onOpen(i + 1)}
            className="relative w-full aspect-square bg-neutral-100 overflow-hidden group cursor-zoom-in"
          >
            <Image
              src={img}
              alt={`${title} — Image ${i + 2}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, 640px"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            <ZoomIcon />
          </button>
        ))}
      </div>
    </div>
  );
}

function ZoomIcon() {
  return (
    <div className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-neutral-700"
      >
        <circle cx="5.5" cy="5.5" r="4.5" />
        <line x1="9" y1="9" x2="13" y2="13" />
        <line x1="3.5" y1="5.5" x2="7.5" y2="5.5" />
        <line x1="5.5" y1="3.5" x2="5.5" y2="7.5" />
      </svg>
    </div>
  );
}
