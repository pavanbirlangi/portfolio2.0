"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import ScrollReveal from "@/components/blocks/scroll-text-reveal";

const simpleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const rightVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.96, filter: 'drop-shadow(0 0 0 #00bcd4)' },
  show: { opacity: 1, x: 0, scale: 1, filter: 'drop-shadow(0 0 24px #00bcd4)' },
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
    <section
      className="w-full px-6 md:px-16 bg-transparent text-white relative overflow-visible"
      id="about"
    >
      <div className="relative z-10">
        <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
          containerClassName="mb-12 text-center"
          textClassName="text-white font-fira font-bold text-3xl md:text-7xl"
        >
          About Me
        </ScrollReveal>

        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24 pl-10 pr-10 overflow-visible">
          <div className="flex-1 text-center md:text-left">
            <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
              containerClassName="mb-2 text-left"
              textClassName="text-gray-300 text-lg md:text-xl"
            >
              Hello, I'm
            </ScrollReveal>
            
            <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
              containerClassName="mb-4 pl-6 text-left"
              textClassName="text-white font-fira font-bold text-4xl md:text-6xl"
            >
              Pavan
            </ScrollReveal>
            
            <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
              containerClassName="max-w-xl mx-auto md:mx-0 mb-8 text-left"
              textClassName="font-sans text-gray-400 text-lg md:text-xl"
            >
              I'm a freelance web developer and Shopify expert, specializing in eCommerce and custom web solutions. From sleek Shopify stores to dynamic websites, I create seamless, high-converting user experiences.
            </ScrollReveal>

            <motion.div 
              className="flex justify-center md:justify-start gap-4 flex-wrap"
              variants={simpleVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
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
          </div>

          <motion.div
            className="flex-1"
            variants={rightVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.8 }}
          >
            <ProfileImage />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
