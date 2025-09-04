'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Use Lenis for smooth, acceleration-controlled scrolling
      const lenisInstance = (window as unknown as { __lenis_instance?: unknown }).__lenis_instance as
        | {
            scrollTo?: (
              target: number,
              options?: { duration?: number; easing?: (t: number) => number; immediate?: boolean }
            ) => void;
          }
        | undefined;
      
      if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
        // Get the element's position relative to the top of the page
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = scrollTop + rect.top - 80; // 80px offset for navbar height
        
        // Use Lenis smooth scrolling with optimized settings to prevent glitches
        lenisInstance.scrollTo(targetPosition, {
          duration: 1.5, // Shorter duration for smoother completion
          easing: (t: number) => {
            // Custom easing that slows down more gradually at the end
            const eased = Math.min(1, 1.001 - Math.pow(2, -8 * t));
            // Add extra smoothing at the end to prevent sudden stops
            return eased < 0.95 ? eased : eased + (1 - eased) * 0.3;
          },
          immediate: false, // Ensure smooth animation
        });
        
      } else {
        // Fallback to native smooth scrolling if Lenis is not available
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg"
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-20 border-b border-white/10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold"
          >
            <Link href="/" className="text-gradient font-fira">
              Pavan Birlangi
            </Link>
          </motion.div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          <motion.ul
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.2,
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-4"
          >
            {navItems.map((item) => (
              <motion.li
                key={item.name}
                variants={{
                  hidden: { y: -20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <button
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className="px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-md cursor-pointer"
                >
                  {item.name}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black/50 backdrop-blur-lg"
        >
          <ul className="flex flex-col items-center gap-4 py-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className="px-4 py-2 text-lg font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
