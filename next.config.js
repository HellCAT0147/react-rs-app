/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/page/1?query=&limit=20&offset=0',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
