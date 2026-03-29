import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "blog.dookinternational.com",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media-cdn.tripadvisor.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "indotoursadventures.com",
        pathname: "/public/storage/**",
      },
      {
        protocol: "https",
        hostname: "rangandatta.wordpress.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gujarattourism.com",
        pathname: "/content/dam/**",
      },
      {
        protocol: "https",
        hostname: "www.templewalks.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "s7ap1.scene7.com",
        pathname: "/is/image/**",
      },
      {
        protocol: "https",
        hostname: "dineout-media-assets.swiggy.com",
        pathname: "/swiggy/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "b.zmtcdn.com",
        pathname: "/data/**",
      },
      {
        protocol: "https",
        hostname: "media.tacdn.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "static.toiimg.com",
        pathname: "/thumb/**",
      },
      {
        protocol: "https",
        hostname: "delhitourism.travel",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "imgnew.outlookindia.com",
        pathname: "/public/uploads/**",
      },
      {
        protocol: "https",
        hostname: "media.insider.in",
        pathname: "/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "formulakarting.in",
        pathname: "/blog/storage/**",
      },
      {
        protocol: "https",
        hostname: "images.newsarenaindia.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.daryaganj.com",
        pathname: "/daryaganj-assets/**",
      },
      {
        protocol: "https",
        hostname: "www.cookwithmanali.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/dms/image/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/places/**",
      },
      {
        protocol: "https",
        hostname: "www.thelabmagofficial.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
