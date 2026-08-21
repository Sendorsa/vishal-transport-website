/** @type {import('next').NextConfig} */
const nextConfig = {
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
