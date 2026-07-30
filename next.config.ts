import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "scontent.fpbc4-1.fna.fbcdn.net",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "stackpoint.netlify.app/",
            }
        ],
    },
  /* config options here */
};

export default nextConfig;
