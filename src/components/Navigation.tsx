"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation({ siteName }: { siteName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-light tracking-[0.2em] uppercase text-neutral-900"
        >
          {siteName}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-xs tracking-[0.15em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Work
          </Link>
          <Link
            href="/archive"
            className="text-xs tracking-[0.15em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Archive
          </Link>
          <Link
            href="#contact"
            className="text-xs tracking-[0.15em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Contact
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-px bg-neutral-900 transition-all duration-300 ${open ? "rotate-45 translate-y-[3.5px]" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-neutral-900 transition-all duration-300 ${open ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-b border-neutral-100 px-6 pb-6 pt-2 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-sm tracking-[0.15em] uppercase text-neutral-500 hover:text-neutral-900"
          >
            Work
          </Link>
          <Link
            href="/archive"
            onClick={() => setOpen(false)}
            className="text-sm tracking-[0.15em] uppercase text-neutral-500 hover:text-neutral-900"
          >
            Archive
          </Link>
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="text-sm tracking-[0.15em] uppercase text-neutral-500 hover:text-neutral-900"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
