/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'oeapi.onrender.com',
                port: '',
                pathname: '/uploads/**',
              },
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                pathname: '/f/**',
              },
        ],
    }
};

export default nextConfig;
