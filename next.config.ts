/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'host',
            value: 'onboard.ayushnexa.com',
          },
        ],
        destination: '/onboard',
      },
    ];
  },
};

export default nextConfig;