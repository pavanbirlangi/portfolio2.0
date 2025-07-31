import './globals.css';
import Navbar from '@/components/Navbar';
import Particles from '@/components/ParticleBackground';

export const metadata = {
  title: 'Pavan Birlangi – Developer',
  description: 'Portfolio of Pavan Birlangi - Freelance Web Developer and Shopify Expert',
  keywords: ['Pavan Birlangi', 'Web Developer', 'Shopify Expert', 'Freelancer', 'Portfolio'],
  authors: [{ name: 'Pavan Birlangi' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white overflow-x-hidden min-h-screen">
        {/* Background Particles */}
        <div className='fixed inset-0'>
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={150}
            particleSpread={8}
            speed={0.08}
            particleBaseSize={60}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <Navbar />
        {/* Ensure content sits below the navbar on mobile */}
        <div className="pt-20 md:pt-0 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}