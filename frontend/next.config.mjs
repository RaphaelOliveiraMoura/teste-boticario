/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/produtos",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
