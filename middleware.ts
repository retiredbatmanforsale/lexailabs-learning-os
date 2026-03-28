import { NextRequest, NextResponse } from 'next/server';

const DOCUSAURUS_ORIGIN =
  process.env.DOCUSAURUS_URL || 'https://learn.lexailabs.com';

/**
 * Middleware that proxies /courses/* HTML pages from Docusaurus and injects
 * a custom navbar/footer matching the Next.js landing-page design.
 *
 * - Hides the Docusaurus navbar and footer via CSS.
 * - Injects a static navbar with the Lex AI logo and links.
 * - Injects a simplified footer.
 * - Forces logo / home-link clicks to do full-page navigation so the user
 *   lands on the Next.js homepage (not the Docusaurus SPA homepage).
 */
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Only intercept /courses/* requests
  if (!pathname.startsWith('/courses/') && pathname !== '/courses') {
    return NextResponse.next();
  }

  // Let static asset requests fall through to the rewrites
  if (/\.(js|css|json|png|jpe?g|gif|svg|ico|woff2?|ttf|eot|map)$/i.test(pathname)) {
    return NextResponse.next();
  }

  try {
    const docUrl = `${DOCUSAURUS_ORIGIN}${pathname}${search}`;
    const res = await fetch(docUrl, {
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': request.headers.get('user-agent') || '',
      },
      redirect: 'follow',
    });

    const contentType = res.headers.get('content-type') || '';

    // Only modify HTML responses; pass others through
    if (!contentType.includes('text/html')) {
      return new NextResponse(res.body, {
        status: res.status,
        headers: { 'content-type': contentType },
      });
    }

    let html = await res.text();

    // ── Inject custom styles ──────────────────────────────────────────
    const customStyles = `
<style data-lexai>
  /* Hide Docusaurus navbar & footer */
  nav.navbar, .navbar, .navbar-sidebar__backdrop, .navbar-sidebar { display: none !important; }
  footer.footer, footer.footer--dark { display: none !important; }

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

  .lexai-nav__right {
    display: flex; align-items: center; gap: 12px;
  }

  .lexai-nav__btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 24px; font-size: 14px; font-weight: 500;
    border-radius: 9999px; text-decoration: none; transition: opacity 0.15s;
    white-space: nowrap; cursor: pointer;
  }
  .lexai-nav__btn--outline {
    color: #171717; border: 1px solid #e5e5e5; background: transparent;
  }
  .lexai-nav__btn--primary {
    color: #fff; background: #171717; border: 1px solid #171717;
  }
  .lexai-nav__btn:hover { opacity: 0.8; }
  @media (max-width: 639px) {
    .lexai-nav__btn { padding: 6px 16px; font-size: 13px; }
  }

  /* ── Custom Lex AI Footer ── */
  .lexai-footer {
    border-top: 1px solid rgba(0,0,0,0.08);
    padding: 32px 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    box-sizing: border-box;
  }
  @media (min-width: 640px) { .lexai-footer { padding: 40px 32px; } }

  .lexai-footer__inner {
    max-width: 1280px; margin: 0 auto;
    display: flex; flex-direction: column; align-items: center; gap: 16px;
  }
  @media (min-width: 640px) {
    .lexai-footer__inner { flex-direction: row; justify-content: space-between; }
  }

  .lexai-footer__copy { font-size: 14px; color: #737373; margin: 0; }

  .lexai-footer__links { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; justify-content: center; }
  .lexai-footer__links a {
    font-size: 13px; color: #737373; text-decoration: none; transition: color 0.15s;
  }
  .lexai-footer__links a:hover { color: #171717; }

  .lexai-footer__tagline {
    display: flex; align-items: center; gap: 8px; font-size: 14px; color: #525252;
  }
  .lexai-footer__tagline span { color: #3b82f6; font-weight: 600; }
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
      <a href="/courses/deep-learning/intro" class="lexai-nav__cat">AI for Engineers</a>
    </div>
    <div class="lexai-nav__right">
      <a href="/login" class="lexai-nav__btn lexai-nav__btn--outline" data-lexai-nav>Sign In</a>
      <a href="/login?tab=register" class="lexai-nav__btn lexai-nav__btn--primary" data-lexai-nav>Get Started</a>
    </div>
  </div>
</div>`;

    // ── Custom footer HTML ──────────────────────────────────────────
    const customFooter = `
<div class="lexai-footer" data-lexai>
  <div class="lexai-footer__inner">
    <p class="lexai-footer__copy">&copy; ${new Date().getFullYear()} Lex AI Labs. All rights reserved.</p>
    <div class="lexai-footer__links">
      <a href="mailto:support@lexailabs.com">Support</a>
      <a href="https://www.lexailabs.com/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
      <a href="https://www.lexailabs.com/terms" target="_blank" rel="noopener noreferrer">Terms</a>
      <a href="https://www.lexailabs.com/refunds" target="_blank" rel="noopener noreferrer">Refund Policy</a>
    </div>
    <div class="lexai-footer__tagline">
      Build Intelligence. Build India.
      <span>#AISeekhegaIndia</span>
    </div>
  </div>
</div>`;

    // ── Script: force full-page navigation for home / Next.js links ──
    const customScript = `
<script data-lexai>
(function(){
  document.addEventListener('click', function(e) {
    // Our custom navbar links → full-page navigation
    var nav = e.target.closest('[data-lexai-nav]');
    if (nav) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = nav.getAttribute('href');
      return;
    }
    // Any Docusaurus link to "/" (home) → full-page navigation
    var home = e.target.closest('a[href="/"]');
    if (home) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = '/';
      return;
    }
  }, true);
})();
</script>`;

    // ── Inject into HTML ──────────────────────────────────────────
    html = html.replace('</head>', customStyles + '\n</head>');
    html = html.replace(/(<body[^>]*>)/, '$1\n' + customNavbar);
    html = html.replace('</body>', customFooter + '\n' + customScript + '\n</body>');

    return new NextResponse(html, {
      status: res.status,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': res.headers.get('cache-control') || 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch {
    // If Docusaurus is unreachable, fall through (Next.js will show its 404)
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/courses/:path*'],
};
