/** @type {import('next').NextConfig} */
const nextConfig = {
  // Verification builds must not share a build directory with a running
  // `next dev`. A production build wipes and rewrites .next underneath the
  // dev server, which then serves chunk IDs that no longer exist — surfacing
  // as 404s, `__webpack_modules__[moduleId] is not a function`, and garbled
  // parse errors. Set NEXT_DIST_DIR to build somewhere else.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactStrictMode: true,
  images: {
    // Sources top out at 1280px, so the larger deviceSizes would only ever
    // upscale. AVIF first, WebP as the fallback negotiation.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280],
    imageSizes: [96, 160, 256, 384],
  },
};

export default nextConfig;
