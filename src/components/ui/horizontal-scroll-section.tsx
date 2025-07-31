// /components/HorizontalScrollSection.jsx

'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- MOCK DATA ---
// Replace these with your actual blog/project image paths
const projectImages = [
  '/images/img_2.png',
  '/images/img_2.png',
  '/images/img_2.png',
  '/images/img_2.png',
  '/images/img_2.png',
  '/images/img_2.png',
];

const HorizontalScrollSection = () => {
  const componentRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Check if we're on mobile - if so, disable horizontal scroll
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // For mobile, we'll just use regular scroll without pinning
      return;
    }

    // Set up GSAP and ScrollTrigger (no separate Lenis instance here)
    gsap.registerPlugin(ScrollTrigger);

    if (!sliderRef.current) return;
    const slider = sliderRef.current;

    // Wait a bit for everything to be rendered
    const timer = setTimeout(() => {
      // The scroll distance should allow the last image to be fully visible
      const totalWidth = slider.scrollWidth - window.innerWidth;

      let horizontalScroll = gsap.to(slider, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: slider,
          pin: true,
          scrub: 1,
          start: 'center center',
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      });

      return () => {
        horizontalScroll.kill();
      };
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === slider) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div className="relative bg-transparent text-white mt-10 md:mt-20">
      {/* SECTION HEADER */}
      <div className="container mx-auto px-4 md:px-6 pt-12 md:pt-24 pb-8 md:pb-12 lg:pt-32 lg:pb-16">
        <h2 className="mb-4 text-3xl md:text-5xl lg:text-7xl font-bold text-center md:text-left">We're Known For</h2>
        <p className="max-w-xl text-base md:text-lg text-neutral-300 text-center md:text-left mx-auto md:mx-0">
          Building high-performance websites that are specifically designed to
          showcase your unique style of work and boost client leads.
        </p>
      </div>

      {/* HORIZONTAL SCROLL CONTAINER - Desktop */}
      <div ref={componentRef} className="hidden md:block">
        <div ref={sliderRef} className="flex h-[90vh] w-max items-center space-x-12 px-8 md:space-x-20 md:px-20">
          {projectImages.map((src, index) => (
            <div
              key={index}
              className="scroll-card h-[70vh] w-[90vw] flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl md:h-[80vh] md:w-[60vw]"
            >
              <Image
                src={src}
                alt={`Project mockup ${index + 1}`}
                width={1600}
                height={1200}
                className="h-full w-full bg-neutral-800 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE GRID VIEW */}
      <div className="md:hidden px-4 pb-8">
        <div className="flex overflow-x-auto gap-4 pb-4 mobile-scroll" style={{ scrollSnapType: 'x mandatory' }}>
          {projectImages.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-[50vh] w-[85vw] overflow-hidden rounded-2xl shadow-2xl"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Image
                src={src}
                alt={`Project mockup ${index + 1}`}
                width={1600}
                height={1200}
                className="h-full w-full bg-neutral-800 object-cover"
              />
            </div>
          ))}
        </div>
        {/* Add scroll indicator */}
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-400">← Swipe to explore projects →</p>
        </div>
      </div>

      {/* Spacer to ensure the page continues scrolling after the pinned section */}
      <div className="h-[10vh] md:h-[20vh] bg-black"></div>
    </div>
  );
};

export default HorizontalScrollSection;