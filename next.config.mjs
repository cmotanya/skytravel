/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "t4.ftcdn.net" },
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "images.pexels.com" },
        ],
    },
};

export default nextConfig;
