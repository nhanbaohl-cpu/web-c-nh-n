import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200, mass: 1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200); 
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none transition-colors duration-700 ${
      isDark ? 'bg-[#0F172A]' : 'bg-[#FFFFFF]'
    }`}>
      
      {/* 1. Base Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-700 ${
        isDark 
          ? 'from-[#0F172A] via-[#1E293B] to-[#0F172A] opacity-50' 
          : 'from-slate-50 via-blue-50/20 to-slate-50 opacity-80'
      }`} />

      {/* 2. Interactive Spotlight */}
      {mounted && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className={`hidden md:block absolute w-[400px] h-[400px] rounded-full filter blur-[100px] pointer-events-none transition-opacity duration-700 ${
            isDark ? 'bg-blue-500/10' : 'bg-blue-400/10'
          }`}
        />
      )}

      {/* 3. Ultra-soft mesh blobs */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-0 left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full filter blur-[120px] opacity-40 transition-all duration-700 ${
          isDark ? 'bg-blue-900/30' : 'bg-blue-200/50'
        }`}
      />

      <motion.div
        animate={{
          x: [0, -60, 80, 0],
          y: [0, 80, -60, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full filter blur-[140px] opacity-30 transition-all duration-700 ${
          isDark ? 'bg-indigo-900/30' : 'bg-indigo-200/50'
        }`}
      />
      
      {/* 4. Elegant subtle noise texture (optional but gives a premium feel) */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
    </div>
  );
}
