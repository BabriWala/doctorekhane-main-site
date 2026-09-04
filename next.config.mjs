/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || (process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : "http://127.0.0.1:4002/api");
    return [{ source: "/api/:path*", destination: `${backend.replace(/\/$/, "")}/:path*` }];
  },
};

export default nextConfig;
