import Link from "@docusaurus/Link";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  sections?: FooterSection[];
  copyright?: string;
  className?: string;
}

const defaultSections: FooterSection[] = [
  {
    title: "Platform",
    links: [
      { label: "All Courses", href: "/docs/machine-learning/intro" },
      { label: "Engineering", href: "/docs/deep-learning/intro" },
      { label: "Non-Engineering", href: "/docs/ai-for-leaders/intro" },
      { label: "My Learning", href: "/docs/machine-learning/intro" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/docs/resources/intro" },
      { label: "FAQ", href: "/docs/resources/intro" },
      { label: "Contact Us", href: "mailto:learn@lexailabs.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund Policy", href: "/terms" },
    ],
  },
];

export function Footer({
  sections = defaultSections,
  copyright = `\u00A9 ${new Date().getFullYear()} Lex AI Labs. All rights reserved.`,
  className = "",
}: FooterProps) {
  return (
    <footer className={`border-t border-gray-200 bg-white ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Grid: brand + link sections */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-6 inline-block no-underline hover:no-underline">
              <div className="flex items-center gap-3">
                <img
                  src="/lexai-logo.png"
                  alt="Lex AI Labs"
                  width={48}
                  height={48}
                  className="size-12 rounded-xl"
                />
                <span className="text-xl font-bold text-gray-900">Lex AI</span>
              </div>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-500">
              Master AI skills with industry experts. Learn at your own pace
              with real-world courses designed for practical application.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/company/lexailabs",
                  icon: (
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  ),
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com/lexailabs",
                  icon: (
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  href: "https://youtube.com/@lexailabs",
                  icon: (
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com/lexailabs",
                  icon: (
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section, i) => (
            <div key={i}>
              <h4 className="mb-4 text-sm font-semibold text-gray-900">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    {link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="text-sm text-gray-500 no-underline transition-colors hover:text-gray-900"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-gray-500 no-underline transition-colors hover:text-gray-900"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 sm:flex-row">
          <p className="text-xs text-gray-400">
            {copyright}
          </p>
          <a
            href="mailto:learn@lexailabs.com"
            className="text-xs text-gray-400 no-underline hover:text-gray-600"
          >
            learn@lexailabs.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
