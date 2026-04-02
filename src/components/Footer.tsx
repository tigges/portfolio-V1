import { SiteConfig } from "@/lib/types";

export default function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="border-t border-neutral-100 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} {config.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {config.instagram && (
            <a
              href={`https://instagram.com/${config.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              IG
            </a>
          )}
          {config.linkedin && (
            <a
              href={`https://linkedin.com/in/${config.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              IN
            </a>
          )}
          <a
            href={`mailto:${config.email}`}
            className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
