"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  alt: string;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  alt,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [loadedIndex, setLoadedIndex] = useState(-1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const isImageLoaded = loadedIndex === currentIndex;

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const prev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const next = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close, prev, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (delta > threshold) next();
    else if (delta < -threshold) prev();
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
        isVisible ? "bg-black/95" : "bg-black/0"
      }`}
      onClick={close}
    >
      {/* Close button */}
      <button
        onClick={close}
        className={`absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close lightbox"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="4" y1="4" x2="16" y2="16" />
          <line x1="16" y1="4" x2="4" y2="16" />
        </svg>
      </button>

      {/* Counter */}
      <div
        className={`absolute top-6 left-6 z-10 text-white/50 text-xs tracking-[0.15em] font-light transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className={`absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="15,4 7,12 15,20" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className={`absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="9,4 17,12 9,20" />
          </svg>
        </button>
      )}

      {/* Main image */}
      <div
        className={`relative w-full h-full max-w-[90vw] max-h-[85vh] mx-16 my-16 transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} — Image ${currentIndex + 1}`}
          fill
          className={`object-contain transition-opacity duration-500 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="90vw"
          priority
          unoptimized
          onLoad={() => setLoadedIndex(currentIndex)}
        />
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border border-white/20 border-t-white/70 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(i);
              }}
              className={`relative w-12 h-12 md:w-16 md:h-16 overflow-hidden transition-all duration-300 ${
                i === currentIndex
                  ? "ring-1 ring-white opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
