'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { url } from 'inspector';

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const badgeVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};
const titleLeftVariants = {
  hidden: { opacity: 0, x: -60, skewY: 6 },
  show: { opacity: 1, x: 0, skewY: 0 },
};
const titleRightVariants = {
  hidden: { opacity: 0, x: 60, skewY: -6 },
  show: { opacity: 1, x: 0, skewY: 0 },
};
const descVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};
const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  show: { opacity: 1, scale: 1, y: 0 },
};
const socialVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  show: { opacity: 1, scale: 1, y: 0 },
};

// Socials with brand colors
const socials = [
  { Icon: FaGithub, color: '#fff', url: "https://github.com/pavanbirlangi" }, // white for GitHub
  { Icon: FaLinkedin, color: '#0077b5' , url:"https://www.linkedin.com/in/pavanbirlangi/"}, // LinkedIn blue
  { Icon: FaEnvelope, color: '#ea4335', url: "mailto:pavan29vzm@gmail.com"}, // Gmail red
  { Icon: FaTwitter, color: '#1da1f2', url: "https://x.com/DevCapo_" }, // Twitter blue
];

export default function Hero() {
  const [isHoveredDesktop, setIsHoveredDesktop] = useState(false);
  const [isHoveredMobile, setIsHoveredMobile] = useState(false);

  return (
    <section className="min-h-screen flex flex-col justify-center text-white px-6 md:px-30 relative z-10 font-fira">
      {/* Badge */}
      <motion.div
        variants={badgeVariants}
        initial="hidden"
        animate="show"
        className="group rounded-full border border-white/10 bg-blur w-fit text-base text-white mb-9 transition-all ease-in hover:cursor-pointer hover:bg-blur-200 dark:border-white dark:bg-neutral-900 dark:hover:bg-neutral-800"
        transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.7 }}
      >
        <AnimatedShinyText className="inline-flex backdrop-blur-s items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Ready to Innovate</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-10"
      >
        {/* Row 1: Freelance + Projects (desktop) */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <motion.h1
            variants={titleLeftVariants}
            className="text-[3rem] md:text-[8.5rem] font-bold tracking-wide leading-none text-left"
            transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.7 }}
          >
            Freelance
          </motion.h1>

          {/* Desktop Button - Single Animated Button */}
          <div className="hidden md:flex w-full justify-end mt-4 min-h-[48px]">
            <motion.a
              href="#projects"
              className="relative flex items-center py-3 text-base text-white font-sans rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-sm hover:bg-white/20 overflow-hidden px-8"
              style={{
                minWidth: isHoveredDesktop ? 200 : 120,
                borderRadius: isHoveredDesktop ? 32 : 9999,
                transition: 'min-width 0.5s cubic-bezier(.6,.6,0,1), border-radius 0.5s cubic-bezier(.6,.6,0,1)'
              }}
              onMouseEnter={() => setIsHoveredDesktop(true)}
              onMouseLeave={() => setIsHoveredDesktop(false)}
              transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.7 }}
            >
              <motion.span
                animate={{ x: isHoveredDesktop ? 16 : 0 }}
                transition={{ type: 'spring', stiffness: 90, damping: 24, duration: 0.7 }}
                className="z-10"
              >
                Projects
              </motion.span>
              <motion.span
                animate={{
                  x: isHoveredDesktop ? 0 : 60,
                  opacity: 1,
                }}
                transition={{ type: 'spring', stiffness: 90, damping: 24, duration: 0.7 }}
                className="text-xl inline-block"
                style={{ marginLeft: isHoveredDesktop ? 24 : 40, marginRight: 0 }}
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </div>

        {/* Row 2: Developer + Description */}
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-10 md:gap-16">
          <motion.p
            variants={descVariants}
            className="text-gray-400 font-sans text-base md:text-lg text-left md:text-right md:max-w-[440px]"
            transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.7 }}
          >
           Web Developer and Shopify Expert <em>creating innovative, functional, and user-friendly</em> websites for Digital Solutions.
           </motion.p>
          <motion.h1
            variants={titleRightVariants}
            className="text-[3rem] md:text-[8.5rem] font-bold tracking-wide leading-none text-left md:text-right"
            transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.7 }}
          >
            Developer
          </motion.h1>
        </div>

        {/* Mobile Button - Single Animated Button */}
        <div className="block md:hidden w-full mt-4">
          <motion.a
            href="#projects"
            className="relative flex items-center py-3 text-sm text-white font-sans rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-sm hover:bg-white/20 overflow-hidden px-6"
            style={{
              minWidth: isHoveredMobile ? 160 : 100,
              borderRadius: isHoveredMobile ? 32 : 9999,
              transition: 'min-width 0.5s cubic-bezier(.6,.6,0,1), border-radius 0.5s cubic-bezier(.6,.6,0,1)'
            }}
            onMouseEnter={() => setIsHoveredMobile(true)}
            onMouseLeave={() => setIsHoveredMobile(false)}
            transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.7 }}
          >
            <motion.span
              animate={{ x: isHoveredMobile ? 12 : 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 24, duration: 0.7 }}
              className="z-10"
            >
              Projects
            </motion.span>
            <motion.span
              animate={{
                x: isHoveredMobile ? 0 : 48,
                opacity: 1,
              }}
              transition={{ type: 'spring', stiffness: 90, damping: 24, duration: 0.7 }}
              className="text-xl inline-block"
              style={{ marginLeft: isHoveredMobile ? 10 : 32, marginRight: 0 }}
            >
              →
            </motion.span>
          </motion.a>
        </div>
      </motion.div>

      {/* Social Icons */}
      <motion.div
        className="flex flex-wrap gap-8 mt-10 justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
      {socials.map(({ Icon, color,  url }, i) => (
        <motion.a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn transition-colors duration-200"
          style={{ color: 'white' }}
          onMouseEnter={(e) => e.currentTarget.style.color = color}
          onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
          variants={socialVariants}
          whileHover={{ scale: 1.18, filter: `drop-shadow(0 0 8px ${color})` }}
          transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        >
          <Icon className='text-4xl'/>
        </motion.a>
      ))}
      </motion.div>
    </section>
  );
}
