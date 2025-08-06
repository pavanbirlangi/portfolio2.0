'use client';

import { useScroll, useTransform, motion, MotionValue } from 'motion/react';
import React, { useRef, forwardRef } from 'react';
import Image from 'next/image';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
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

      <div className="relative z-10 text-center px-8 max-w-6xl">
        <h1 className='text-6xl md:text-7xl 2xl:text-8xl font-extrabold text-center tracking-tight leading-[0.9] mb-6'>
          CRAFTING DIGITAL <br />
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            EXPERIENCES
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Where innovation meets execution. Building scalable solutions that transform ideas into reality.
        </p>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-sm text-white/60 uppercase tracking-wider">Continue Exploring</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const skills = [
    { name: "Frontend Development", tech: "React, Next.js, TypeScript" },
    { name: "Backend Architecture", tech: "Node.js, Python, Microservices" },
    { name: "Cloud & DevOps", tech: "AWS, Docker, Kubernetes" },
    { name: "Database Design", tech: "PostgreSQL, MongoDB, Redis" },
  ];

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 text-white overflow-hidden'
    >
      {/* Grid background */}
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      
      <motion.article style={{ y }} className='container mx-auto relative z-10 px-6 py-20 h-full flex flex-col justify-center'>
        <div className="mb-16">
          <h2 className='text-5xl md:text-6xl lg:text-7xl leading-[0.9] font-extrabold tracking-tight mb-6'>
            EXPERTISE THAT <br />
            <span className="text-pink-400">DELIVERS</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
            From concept to deployment, I build robust systems that scale with your vision.
          </p>
        </div>

        {/* Skills Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl'>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-pink-400/30 hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-pink-400 transition-colors duration-300">
                  {skill.name}
                </h3>
                <p className="text-white/60 text-sm">
                  {skill.tech}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Showcase */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-4 justify-center">
            {['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white/80 hover:bg-pink-400/20 hover:border-pink-400/40 hover:text-white transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.section>
  );
};

const Component = forwardRef<HTMLElement>((props, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      <main ref={container} className='relative h-[200vh] bg-black -mt-1'>
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
        <footer className='group bg-black relative overflow-hidden'>
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900 to-black" />
          
          {/* Large text */}
          <motion.h1 
            className='relative z-10 text-[12vw] md:text-[16vw] translate-y-8 md:translate-y-20 leading-[0.8] uppercase font-extrabold text-center bg-gradient-to-r from-white/20 via-white/60 to-white/20 bg-clip-text text-transparent transition-all ease-linear py-20'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            PORTFOLIO
          </motion.h1>
          
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