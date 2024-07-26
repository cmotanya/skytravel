/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },

    images: {
        remotePatterns: [
            { protocol: "https", hostname: "t4.ftcdn.net" },
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "plus.unsplash.com" },
            { protocol: "https", hostname: "img.freepik.com" },
            { protocol: "https", hostname: "images.pexels.com" },
            { protocol: "https", hostname: "media.istockphoto.com" },
        ],
    },
};

export default nextConfig;
