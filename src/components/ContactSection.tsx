"use client";

import { useState, FormEvent } from "react";
import { SiteConfig } from "@/lib/types";

export default function ContactSection({ config }: { config: SiteConfig }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(formData.message);
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section id="contact" className="bg-neutral-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-light tracking-tight text-neutral-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed mb-8 max-w-md">
              Interested in collaboration, commissions, or just want to say
              hello? I&apos;d love to hear from you.
            </p>
            <div className="space-y-3">
              <a
                href={`mailto:${config.email}`}
                className="block text-sm text-neutral-900 hover:text-neutral-500 transition-colors"
              >
                {config.email}
              </a>
              {config.instagram && (
                <a
                  href={`https://instagram.com/${config.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Instagram →
                </a>
              )}
              {config.linkedin && (
                <a
                  href={`https://linkedin.com/in/${config.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  LinkedIn →
                </a>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-neutral-400 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border-b border-neutral-300 py-3 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors placeholder:text-neutral-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-neutral-400 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent border-b border-neutral-300 py-3 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors placeholder:text-neutral-300"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-neutral-400 mb-2">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-transparent border-b border-neutral-300 py-3 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors resize-none placeholder:text-neutral-300"
                placeholder="Tell me about your project…"
              />
            </div>
            <button
              type="submit"
              className="text-xs tracking-[0.15em] uppercase bg-neutral-900 text-white px-8 py-3.5 hover:bg-neutral-700 transition-colors"
            >
              {submitted ? "Opening Email Client…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
