import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Turn Your Backyard Into More of Your Home | Tamarron Services',
  description:
    'Custom outdoor spaces designed for your home and lifestyle. From roof extensions and pergolas to concrete patios. Serving Katy, Texas and surrounding areas. Request a free estimate today.',
  openGraph: {
    title: 'Turn Your Backyard Into More of Your Home | Tamarron Services',
    description:
      'Custom outdoor spaces designed for your home and lifestyle. From roof extensions and pergolas to concrete patios in Katy, TX.',
    images: ['/landing/hero-bg.png'],
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
