import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.scdn.co",
      "is1-ssl.mzstatic.com",
      "lastfm.freetls.fastly.net",
      "cdn-images.dzcdn.net",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
