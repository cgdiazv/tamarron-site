/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com', // Por si acaso para el hosting de Behold
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com', // 👈 ESTA ES LA REGLA QUE SOLUCIONA EL ERROR ACTUAL
      },
    ],
  },
};

export default nextConfig;