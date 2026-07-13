import { NextRequest, NextResponse } from "next/server";

/**
 * SITE-WIDE MAINTENANCE MODE
 * ---------------------------
 * When MAINTENANCE_MODE is "true", every visitor to every page
 * gets redirected to /maintenance instead of the real site.
 *
 * TO TURN IT ON:
 *   Set MAINTENANCE_MODE=true in your .env.local (local testing)
 *   or in your hosting provider's environment variables (e.g. Vercel).
 *
 * TO TURN IT OFF:
 *   Set MAINTENANCE_MODE=false (or remove the variable), then redeploy.
 *   Your normal landing page will show again immediately — no code
 *   changes needed.
 */

const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow these through, even during maintenance:
  const isMaintenancePage = pathname.startsWith("/maintenance");
  const isNextInternal = pathname.startsWith("/_next");
  const isApiRoute = pathname.startsWith("/api");
  const isStaticAsset = /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|txt|xml)$/.test(
    pathname
  );

  if (
    MAINTENANCE_MODE &&
    !isMaintenancePage &&
    !isNextInternal &&
    !isApiRoute &&
    !isStaticAsset
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next (Next.js internals)
     * - api routes
     * - static files (favicon, images, etc.)
     */
    "/((?!_next|api|favicon.ico).*)",
  ],
};