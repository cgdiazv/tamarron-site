/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Por si acaso para el hosting de Behold
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'behold.pictures',
      },
      {
        protocol: 'https',
        hostname: '**.behold.pictures',
      },
      {
        protocol: 'https',
        hostname: '**.behold.so',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // 👈 NUEVA REGLA: Permite renderizar fotos desde tu repo de GitHub
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;