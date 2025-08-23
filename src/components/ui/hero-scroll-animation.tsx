'use client';

import { useScroll, useTransform, motion, MotionValue } from 'motion/react';
import React, { useRef, forwardRef, useEffect } from 'react';
import Image from 'next/image';
import SpotlightCard from '@/components/blocks/spotlight-card';
import { RevealText } from '@/components/blocks/video-text';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const spotlightData = [
    {
      title: "Performance First",
      description: "Optimized solutions that scale with your business needs and deliver exceptional user experiences.",
      icon: "🚀"
    },
    {
      title: "Modern Architecture",
      description: "Built with cutting-edge technologies and best practices for maintainable, robust applications.",
      icon: "💎"
    },
    {
      title: "User-Centric Design",
      description: "Intuitive interfaces that prioritize user experience and drive meaningful engagement.",
      icon: "✨"
    }
  ];
  
  return (
    <motion.section
      style={{ scale, rotate, opacity }}
      className='sticky font-semibold top-0 h-screen bg-gradient-to-b from-black via-zinc-900 to-black flex flex-col items-center justify-center text-white relative overflow-hidden'
    >
      {/* Subtle grid pattern overlay */}
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

      {/* Noise texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\"><circle cx=\"100\" cy=\"100\" r=\"0.5\" fill=\"rgba(255,255,255,0.02)\"/><circle cx=\"50\" cy=\"50\" r=\"0.5\" fill=\"rgba(255,255,255,0.02)\"/><circle cx=\"150\" cy=\"150\" r=\"0.5\" fill=\"rgba(255,255,255,0.02)\"/></svg>') repeat",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl h-full flex flex-col justify-center py-8 md:py-0">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center tracking-tight leading-[0.9] mb-4 md:mb-6'>
            <RevealText inline animateOnView viewportAmount={0.3} viewportOnce text="CRAFTING" textColor="text-white" overlayColor="text-gray-300" trackingClass="tracking-tight" />
            {" "}
            <RevealText inline animateOnView viewportAmount={0.3} viewportOnce text="DIGITAL" textColor="text-white" overlayColor="text-gray-300" trackingClass="tracking-tight" />
            <br />
            <span className="text-gray-300">
              <RevealText inline animateOnView viewportAmount={0.3} viewportOnce text="EXPERIENCES" textColor="text-gray-300" overlayColor="text-white" trackingClass="tracking-tight" />
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
            Building scalable solutions that transform ideas into reality.
          </p>
        </div>

        {/* Spotlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-4 md:px-0">
          {spotlightData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SpotlightCard 
                className="h-full"
                spotlightColor="rgba(156, 163, 175, 0.3)"
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 text-white overflow-hidden'
    >
      {/* Grid background */}
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      
      <motion.article style={{ y }} className='container mx-auto relative z-10 px-6 py-20 h-full flex flex-col justify-center items-center text-center'>
        {/* Call to Action Section */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
            className="mb-12"
          >
            <div className="overflow-hidden">
              <motion.h3 
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-[0.9]"
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                Have a vision?
              </motion.h3>
            </div>
            <div className="overflow-hidden">
              <motion.p 
                className="text-4xl md:text-5xl lg:text-6xl text-gray-300 font-light tracking-wide"
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                Let's make it real.
              </motion.p>
            </div>
          </motion.div>
          
          <button
            onClick={() => {
              console.log('Button clicked'); // Debug log
              try {
                // @ts-ignore
                if (typeof window !== 'undefined' && window.Cal) {
                  console.log('Cal found, opening modal'); // Debug log
                  // @ts-ignore
                  window.Cal('ui', {
                    "styles":{"branding":{"color":"#292929"}},
                    "hideEventTypeDetails":false,
                    "layout":"month_view"
                  });
                  // @ts-ignore
                  window.Cal('openModal', 'devcapo/15min');
                } else {
                  console.log('Cal not found, redirecting to Cal.com'); // Debug log
                  window.open('https://cal.com/devcapo/15min', '_blank');
                }
              } catch (error) {
                console.error('Cal.com error:', error);
                // Fallback to direct link
                window.open('https://cal.com/devcapo/15min', '_blank');
              }
            }}
            className="group relative px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full text-lg font-semibold text-white transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Let's Talk</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </motion.article>
    </motion.section>
  );
};

const Component = forwardRef<HTMLElement>((props, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Create a separate scroll trigger for the footer
  const { scrollYProgress: footerScrollProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  // Create a scroll-based trigger for the footer text
  const footerY = useTransform(footerScrollProgress, [0, 0.5], ["100%", "0%"]);

  useEffect(() => {
    const unsubscribe = footerScrollProgress.onChange((progress) => {
      console.log('Footer scroll progress:', progress);
    });
    return unsubscribe;
  }, [footerScrollProgress]);

  useEffect(() => {
    // Load Cal.com script
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('Cal.com script loaded successfully');
      try {
        // @ts-ignore
        if (typeof window !== 'undefined' && window.Cal) {
          // @ts-ignore
          window.Cal('init', {origin:"https://cal.com"});
          console.log('Cal.com initialized');
        }
      } catch (error) {
        console.error('Cal.com initialization error:', error);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Cal.com script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <main ref={container} className='relative h-[200vh] bg-black -mt-1'>
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
        <footer ref={footerRef} className='group bg-black relative overflow-hidden'>
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900 to-black" />
          
          {/* Large text */}
          <div className="overflow-hidden">
            <motion.h1 
              style={{ y: footerY }}
              className='relative z-10 text-[12vw] md:text-[10vw] translate-y-8 md:translate-y-20 leading-[0.8] uppercase font-extrabold text-center bg-gradient-to-r from-white/20 via-white/60 to-white/20 bg-clip-text text-transparent transition-all ease-linear py-20'
              onViewportEnter={() => console.log('Footer text in viewport')}
            >
              PAVAN BIRLANGI
            </motion.h1>
          </div>
          
          {/* Bottom section */}
          <div className='bg-black text-white h-32 md:h-40 relative z-10 grid place-content-center text-xl md:text-2xl rounded-tr-[3rem] rounded-tl-[3rem] border-t border-white/10'>
            <p className="text-white/60 text-center">
              Ready to build something amazing together?
            </p>
          </div>
        </footer>
      </main>
    </>
  );
});

Component.displayName = 'Component';

export default Component;