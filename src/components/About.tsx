"use client";

import { motion } from "framer-motion";
import { memo } from "react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};
const headingVariants = {
  hidden: { opacity: 0, y: 40, filter: 'drop-shadow(0 0 0 #8a2be2)' },
  show: { opacity: 1, y: 0, filter: 'drop-shadow(0 0 16px #8a2be2)' },
};
const leftVariants = {
  hidden: { opacity: 0, x: -40, filter: 'blur(8px)' },
  show: { opacity: 1, x: 0, filter: 'blur(0px)' },
};
const rightVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.96, filter: 'drop-shadow(0 0 0 #00bcd4)' },
  show: { opacity: 1, x: 0, scale: 1, filter: 'drop-shadow(0 0 24px #00bcd4)' },
};
const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      {/* Glassmorphism background effect */}
      <div className="absolute -inset-6 z-0 hidden sm:block pointer-events-none flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-white/20 border border-white/30 backdrop-blur-xl shadow-lg" />
      </div>

      <div className="relative z-10">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          {/* Remove all inner gradients for glassmorphism */}

          <img
            src="pro_photo.png"
            alt="Profile"
            className="w-full h-full object-cover rounded-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 group-hover:ring-4 group-hover:ring-white/40"
            loading="lazy"
          />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            {/* Optionally, keep a subtle border on hover for glassmorphism */}
            <div className="absolute inset-0 rounded-full border-8 border-white/20 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

export default function About() {
  return (
    <motion.section
      className="w-full px-6 md:px-16 bg-transparent text-white relative overflow-visible"
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
    >
      {/* Section-wide background gradients/overlays (if any) */}
      {/* Example: <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 z-0 pointer-events-none" /> */}

      <div className="relative z-10">
      <motion.h2
          variants={headingVariants}
          transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.8 }}
          className="text-3xl md:text-7xl font-bold font-mono text-center mb-12"
      >
        About Me
      </motion.h2>

        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24 pl-10 pr-10 overflow-visible">
        <motion.div
          className="flex-1 text-center md:text-left"
            variants={leftVariants}
            transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.8 }}
          >
            <motion.p className="text-lg md:text-xl text-gray-300 mb-2" variants={buttonVariants} transition={{ type: 'spring', stiffness: 120, damping: 16, duration: 0.5 }}>Hello, I'm</motion.p>
            <motion.h3 className="text-4xl md:text-6xl font-bold font-mono mb-4 pl-6" variants={buttonVariants} transition={{ type: 'spring', stiffness: 120, damping: 16, duration: 0.5 }}>Pavan</motion.h3>
            <motion.p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto md:mx-0 mb-8" variants={buttonVariants} transition={{ type: 'spring', stiffness: 120, damping: 16, duration: 0.5 }}>
              I'm a freelance web developer and Shopify expert, specializing in eCommerce and custom web solutions. From sleek Shopify stores to dynamic websites, I create seamless, high-converting user experiences.
            </motion.p>

            <motion.div className="flex justify-center md:justify-start gap-4 flex-wrap" variants={buttonVariants} transition={{ type: 'spring', stiffness: 120, damping: 16, duration: 0.5 }}>
            <motion.a
              href="/resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-sm md:text-base font-sans px-6 py-3 rounded-full hover:bg-white/20 transition-all shadow-sm"
            >
              View Resume
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="backdrop-blur-md bg-white/10 border border-white/20 text-white text-sm md:text-base font-sans px-6 py-3 rounded-full hover:bg-white/20 transition-all shadow-sm"
            >
              View Projects
            </motion.a>
            </motion.div>
        </motion.div>

        <motion.div
          className="flex-1"
            variants={rightVariants}
            transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.8 }}
        >
          <ProfileImage />
        </motion.div>
      </div>
      </div>
    </motion.section>
  );
}
