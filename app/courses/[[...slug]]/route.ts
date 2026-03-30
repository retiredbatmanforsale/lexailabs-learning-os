import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Serves Docusaurus course pages from the local build output.
 *
 * - Reads pre-built HTML from docusaurus/build/courses/
 * - Injects a custom navbar and footer matching the Next.js landing page
 * - Hides the Docusaurus native navbar and footer via CSS
 * - Forces full-page navigation (kills Docusaurus SPA behaviour)
 */

const DOCUSAURUS_BUILD = path.join(process.cwd(), 'docusaurus', 'build');

function findHtmlFile(slug: string[]): string | null {
  const coursePath = slug.join('/');

  // Try exact path with index.html (e.g., courses/ai-for-leaders/intro/index.html)
  const indexPath = path.join(DOCUSAURUS_BUILD, 'courses', coursePath, 'index.html');
  if (existsSync(indexPath)) return indexPath;

  // Try as a direct .html file (e.g., courses/ai-for-leaders/intro.html)
  const directPath = path.join(DOCUSAURUS_BUILD, 'courses', `${coursePath}.html`);
  if (existsSync(directPath)) return directPath;

  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug = [] } = await params;

  // If no slug, redirect to the first course
  if (slug.length === 0) {
    return NextResponse.redirect(new URL('/courses/ai-for-leaders/intro', request.url));
  }

  // Static assets within /courses/ path — serve from the build directory
  const lastSegment = slug[slug.length - 1];
  if (/\.(js|css|json|png|jpe?g|gif|svg|ico|woff2?|ttf|eot|map)$/i.test(lastSegment)) {
    const assetPath = path.join(DOCUSAURUS_BUILD, 'courses', slug.join('/'));
    if (existsSync(assetPath)) {
      const content = readFileSync(assetPath);
      const ext = path.extname(lastSegment).toLowerCase();
      const mimeTypes: Record<string, string> = {
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff2': 'font/woff2',
        '.woff': 'font/woff',
        '.ttf': 'font/ttf',
      };
      return new NextResponse(content, {
        headers: {
          'content-type': mimeTypes[ext] || 'application/octet-stream',
          'cache-control': 'public, max-age=31536000, immutable',
        },
      });
    }
    return new NextResponse('Not found', { status: 404 });
  }

  // Find the HTML file
  const htmlPath = findHtmlFile(slug);
  if (!htmlPath) {
    return NextResponse.redirect(new URL('/course-not-found', request.url));
  }

  let html = readFileSync(htmlPath, 'utf-8');

  // ── Inject custom styles ──────────────────────────────────────────
  const customStyles = `
<style data-lexai>
  /* Hide Docusaurus navbar & footer */
  nav.navbar, .navbar, .navbar-sidebar__backdrop, .navbar-sidebar { display: none !important; }
  footer.footer, footer.footer--dark, footer[class*="footer_"] { display: none !important; }

  /* Reset Docusaurus navbar-height offset */
  :root { --ifm-navbar-height: 0px !important; }
  .main-wrapper { padding-top: 0 !important; }

  /* ── Custom Lex AI Navbar ── */
  .lexai-nav {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    height: 64px; padding: 0 16px;
    background: rgba(255,255,255,0.92); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    box-sizing: border-box;
  }
  @media (min-width: 640px) { .lexai-nav { height: 80px; padding: 0 32px; } }
  @media (min-width: 1024px) { .lexai-nav { padding: 0 48px; } }

  .lexai-nav__inner {
    display: flex; align-items: center; justify-content: space-between;
    max-width: 1280px; width: 100%; margin: 0 auto;
  }

  .lexai-nav__logo {
    display: flex; align-items: center; gap: 8px;
    text-decoration: none; color: #171717; flex-shrink: 0;
  }
  .lexai-nav__logo img { width: 40px; height: 40px; padding: 4px; }
  @media (min-width: 640px) { .lexai-nav__logo img { width: 48px; height: 48px; padding: 8px; } }
  .lexai-nav__logo-text {
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic; font-size: 28px; letter-spacing: -0.025em; color: #171717;
  }
  @media (min-width: 640px) { .lexai-nav__logo-text { font-size: 32px; } }

  .lexai-nav__center {
    display: none; align-items: center; gap: 4px;
  }
  @media (min-width: 1024px) { .lexai-nav__center { display: flex; } }

  .lexai-nav__cat {
    padding: 8px 16px; font-size: 16px; font-weight: 500; color: #525252;
    text-decoration: none; border-radius: 8px; transition: color 0.15s;
  }
  .lexai-nav__cat:hover { color: #171717; }

  /* Theme toggle */
  .lexai-theme-toggle {
    width: 36px; height: 36px; border-radius: 9999px; border: 1px solid #e5e5e5;
    background: transparent; cursor: pointer; display: flex; align-items: center;
    justify-content: center; color: #525252; transition: all 0.2s; flex-shrink: 0;
    padding: 0;
  }
  .lexai-theme-toggle:hover { background: #f5f5f5; color: #171717; }
  .lexai-theme-toggle svg { width: 18px; height: 18px; }
  .lexai-theme-toggle .lexai-icon-sun { display: none; }
  .lexai-theme-toggle .lexai-icon-moon { display: block; }
  [data-theme="dark"] .lexai-theme-toggle .lexai-icon-sun { display: block; }
  [data-theme="dark"] .lexai-theme-toggle .lexai-icon-moon { display: none; }

  /* Dark-mode overrides for our custom navbar */
  [data-theme="dark"] .lexai-nav {
    background: rgba(30,30,30,0.92); border-bottom-color: rgba(255,255,255,0.08);
  }
  [data-theme="dark"] .lexai-nav__logo-text { color: #f5f5f5; }
  [data-theme="dark"] .lexai-nav__cat { color: #a3a3a3; }
  [data-theme="dark"] .lexai-nav__cat:hover { color: #f5f5f5; }
  [data-theme="dark"] .lexai-theme-toggle { border-color: #404040; color: #a3a3a3; }
  [data-theme="dark"] .lexai-theme-toggle:hover { background: #333; color: #f5f5f5; }

  /* ── Custom Lex AI Footer ── */
  .lexai-ft {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #171717; overflow: hidden; box-sizing: border-box;
  }
  .lexai-ft *, .lexai-ft *::before, .lexai-ft *::after { box-sizing: border-box; }
  .lexai-ft__wrap {
    max-width: 1280px; margin: 0 auto; padding: 64px 16px 40px;
  }
  @media (min-width: 640px) { .lexai-ft__wrap { padding: 80px 24px 40px; } }
  @media (min-width: 1024px) { .lexai-ft__wrap { padding: 80px 32px 40px; } }

  .lexai-ft__grid {
    display: grid; grid-template-columns: 1fr; gap: 40px;
  }
  @media (min-width: 768px) { .lexai-ft__grid { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 1024px) { .lexai-ft__grid { grid-template-columns: 1fr 1fr 1fr 1fr; gap: 24px; } }

  .lexai-ft__col { text-align: center; }
  @media (min-width: 1024px) { .lexai-ft__col { text-align: left; } }

  .lexai-ft__heading {
    font-weight: 600; font-size: 12px; text-transform: uppercase;
    letter-spacing: 0.05em; color: #171717; margin: 0 0 24px;
  }

  /* Social icons row */
  .lexai-ft__socials {
    display: flex; align-items: center; gap: 12px;
    justify-content: center;
  }
  @media (min-width: 1024px) { .lexai-ft__socials { justify-content: flex-start; } }
  .lexai-ft__social {
    width: 48px; height: 48px; border-radius: 9999px; background: #f5f5f5;
    display: flex; align-items: center; justify-content: center;
    color: #525252; text-decoration: none; transition: opacity 0.15s;
  }
  .lexai-ft__social:hover { opacity: 0.7; }
  .lexai-ft__social svg { width: 20px; height: 20px; }

  .lexai-ft__logo {
    width: 128px; height: 128px; padding: 8px;
    margin: 16px auto 0;
  }
  @media (min-width: 1024px) { .lexai-ft__logo { margin: 16px 0 0; } }

  /* Contact info */
  .lexai-ft__contact { list-style: none; padding: 0; margin: 0; }
  .lexai-ft__contact li { margin-bottom: 12px; }
  .lexai-ft__contact a {
    font-size: 14px; color: #525252; text-decoration: none; transition: color 0.15s;
  }
  .lexai-ft__contact a:hover { color: #3b82f6; }
  .lexai-ft__address {
    font-size: 14px; color: #737373; line-height: 1.6; padding-top: 4px; font-style: normal;
  }

  /* Link lists */
  .lexai-ft__links { list-style: none; padding: 0; margin: 0; }
  .lexai-ft__links li { margin-bottom: 12px; }
  .lexai-ft__links a {
    font-size: 14px; color: #525252; text-decoration: none; transition: color 0.15s; white-space: nowrap;
  }
  .lexai-ft__links a:hover { color: #3b82f6; }

  /* Bottom bar */
  .lexai-ft__bottom {
    padding-top: 24px; margin-top: 40px; border-top: 1px solid #e5e5e5;
    display: flex; flex-direction: column; align-items: center; gap: 24px;
  }
  @media (min-width: 768px) {
    .lexai-ft__bottom { flex-direction: row; justify-content: space-between; }
  }
  .lexai-ft__copy { font-size: 16px; color: #737373; margin: 0; }
  .lexai-ft__tagline {
    display: flex; align-items: center; gap: 8px; font-size: 16px; color: #525252;
  }
  .lexai-ft__tagline-highlight { color: #3b82f6; font-weight: 600; }
</style>`;

  // ── Custom navbar HTML ──────────────────────────────────────────
  const customNavbar = `
<div class="lexai-nav" data-lexai>
  <div class="lexai-nav__inner">
    <a href="/" class="lexai-nav__logo" data-lexai-nav>
      <img src="/assets/lexailogo.svg" alt="Lex AI Labs" />
      <span class="lexai-nav__logo-text">Lex AI</span>
    </a>
    <div class="lexai-nav__center">
      <a href="/courses/ai-for-leaders/intro" class="lexai-nav__cat">AI for Leaders</a>
      <a href="/courses/ai-for-engineering/foundations-of-regression/intro" class="lexai-nav__cat">AI for Engineers</a>
    </div>
    <button class="lexai-theme-toggle" id="lexaiThemeToggle" aria-label="Toggle theme" title="Toggle dark/light mode">
      <svg class="lexai-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      <svg class="lexai-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    </button>
  </div>
</div>`;

  // ── Custom footer HTML ──────────────────────────────────────────
  const year = new Date().getFullYear();
  const customFooter = `
<footer class="lexai-ft" data-lexai>
  <div class="lexai-ft__wrap">
    <div class="lexai-ft__grid">
      <!-- Connect -->
      <div class="lexai-ft__col">
        <h4 class="lexai-ft__heading">Connect</h4>
        <div class="lexai-ft__socials">
          <a href="https://www.linkedin.com/company/106448852/" class="lexai-ft__social" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://x.com/labs_ai80315" class="lexai-ft__social" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.instagram.com/lexailabs/" class="lexai-ft__social" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://www.youtube.com/@LexAILabs" class="lexai-ft__social" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://www.facebook.com/people/Lex-AI-Labs/61580454084785/" class="lexai-ft__social" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>
        <img src="/assets/lexailogo.svg" alt="Lex AI" class="lexai-ft__logo" />
      </div>

      <!-- Get in Touch -->
      <div class="lexai-ft__col">
        <h4 class="lexai-ft__heading">Get in Touch</h4>
        <ul class="lexai-ft__contact">
          <li><a href="mailto:support@lexailabs.com">support@lexailabs.com</a></li>
          <li><a href="tel:+919996692323">+91 99966 92323</a></li>
        </ul>
        <address class="lexai-ft__address">
          Level 18, ONE HORIZON CENTER<br/>
          Unit-59, Golf Course Rd<br/>
          DLF Phase 5, Sector 43<br/>
          Gurugram, Haryana 122002
        </address>
      </div>

      <!-- Courses -->
      <div class="lexai-ft__col">
        <h4 class="lexai-ft__heading">Courses</h4>
        <ul class="lexai-ft__links">
          <li><a href="/courses/ai-for-leaders/intro">AI for Leaders</a></li>
          <li><a href="/courses/ai-for-engineering/foundations-of-regression/intro">AI for Engineers</a></li>
          <li><a href="/courses/machine-learning/intro">Machine Learning</a></li>
          <li><a href="/courses/deep-learning/intro">Deep Learning</a></li>
          <li><a href="/courses/language-models/intro">Language Models</a></li>
        </ul>
      </div>

      <!-- Policies -->
      <div class="lexai-ft__col">
        <h4 class="lexai-ft__heading">Policies</h4>
        <ul class="lexai-ft__links">
          <li><a href="https://www.lexailabs.com/refunds" target="_blank" rel="noopener noreferrer">Refund Policy</a></li>
          <li><a href="https://www.lexailabs.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          <li><a href="https://www.lexailabs.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="lexai-ft__bottom">
      <p class="lexai-ft__copy">&copy; ${year} Lex AI Labs. All rights reserved.</p>
      <div class="lexai-ft__tagline">
        Build Intelligence. Build India.
        <span style="color:#3b82f6">&bull;</span>
        <span class="lexai-ft__tagline-highlight">#AISeekhegaIndia</span>
      </div>
    </div>
  </div>
</footer>`;

  // ── Script: theme toggle + force full-page navigation ──
  const customScript = `
<script data-lexai>
(function(){
  // ── Theme toggle ──
  var btn = document.getElementById('lexaiThemeToggle');
  if (btn) {
    btn.addEventListener('click', function() {
      var html = document.documentElement;
      var current = html.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch(e) {}
    });
  }

  // ── Kill Docusaurus SPA: force full-page navigation on ALL internal links ──
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href) return;

    // Skip external, anchor, mailto, tel, and javascript links
    if (/^(https?:|#|javascript:|mailto:|tel:)/.test(href)) return;

    // Every internal link does a full page reload so the route handler always runs
    e.preventDefault();
    e.stopPropagation();
    window.location.href = href;
  }, true);
})();
</script>`;

  // ── Inject into HTML ──────────────────────────────────────────
  html = html.replace('</head>', customStyles + '\n</head>');
  html = html.replace(/(<body[^>]*>)/, '$1\n' + customNavbar);
  html = html.replace('</body>', customFooter + '\n' + customScript + '\n</body>');

  return new NextResponse(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
