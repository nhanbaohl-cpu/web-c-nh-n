import React, { useRef, useState, useEffect, useCallback } from 'react';
import { User, Calendar, MapPin, Mail, Phone, ChevronRight, ChevronLeft, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { experiencesData } from '../data/experiences';
import { getAssetUrl } from '../utils/asset';
import { useLanguage } from '../i18n/LanguageContext';
import ImageWithFallback from './ImageWithFallback';
import ExperienceListItem from './ExperienceListItem';

export default function About({ onSelectExperience }: { onSelectExperience?: (id: string) => void }) {
  const { t, language } = useLanguage();
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const rafRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  const checkScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
      }
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    checkScroll();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [checkScroll]);

  // Smooth ease-out function
  const easeOut = (t: number) => {
    return 1 - Math.pow(1 - t, 4); // Quartic ease out
  };

  const scrollToWithAnimation = (container: HTMLElement, targetScrollLeft: number, duration: number) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    
    const startScrollLeft = container.scrollLeft;
    const distance = targetScrollLeft - startScrollLeft;
    const startTime = performance.now();
    
    // Temporarily disable scroll snap during programmatic animation
    container.style.scrollSnapType = 'none';

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOut(progress);
      
      container.scrollLeft = startScrollLeft + distance * easeProgress;
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Re-enable scroll snap after animation finishes
        container.style.scrollSnapType = '';
        animationRef.current = null;
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const scrollByCard = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const clientWidth = container.clientWidth;
      
      // Scroll by ~75% of the visible width
      const scrollAmount = clientWidth * 0.75;
      
      let targetScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      if (direction === 'left') {
        if (container.scrollLeft <= 0) {
          // Loop to end
          targetScrollLeft = container.scrollWidth;
        }
      } else {
        if (Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 1) {
          // Loop to start
          targetScrollLeft = 0;
        }
      }
      
      // Clamp target scroll
      targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, container.scrollWidth - clientWidth));
      
      scrollToWithAnimation(container, targetScrollLeft, 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByCard('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByCard('right');
    }
  };

  const velocityRef = useRef(0);
  const lastMouseXRef = useRef(0);
  const lastMouseTimeRef = useRef(0);
  const momentumRafRef = useRef<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
    
    scrollRef.current.style.scrollSnapType = 'none';
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    
    lastMouseXRef.current = e.pageX;
    lastMouseTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!scrollRef.current) return;
    
    const now = performance.now();
    // If the last mouse move was more than 100ms ago, they stopped before releasing
    if (now - lastMouseTimeRef.current > 100) {
      scrollRef.current.style.scrollSnapType = '';
      return;
    }
    
    // Apply momentum
    const amplitude = velocityRef.current * 100; // Multiplier for momentum distance
    
    const startScrollLeft = scrollRef.current.scrollLeft;
    const startTime = performance.now();
    const duration = Math.min(Math.max(Math.abs(velocityRef.current) * 300, 300), 800); // Dynamic duration

    const animateMomentum = (currentTime: number) => {
      if (!scrollRef.current) return;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out
      scrollRef.current.scrollLeft = startScrollLeft - (amplitude * easeProgress);
      
      if (progress < 1) {
        momentumRafRef.current = requestAnimationFrame(animateMomentum);
      } else {
        scrollRef.current.style.scrollSnapType = '';
        momentumRafRef.current = null;
      }
    };
    
    if (Math.abs(amplitude) > 20) {
      momentumRafRef.current = requestAnimationFrame(animateMomentum);
    } else {
      scrollRef.current.style.scrollSnapType = '';
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    } else if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = '';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; // Lighter feel for dragging
    scrollRef.current.scrollLeft = scrollLeft - walk;
    
    const now = performance.now();
    const dt = now - lastMouseTimeRef.current;
    if (dt > 0) {
      const dx = e.pageX - lastMouseXRef.current;
      // Smooth out velocity slightly by averaging
      velocityRef.current = (velocityRef.current * 0.2) + ((dx / dt) * 0.8);
    }
    lastMouseXRef.current = e.pageX;
    lastMouseTimeRef.current = now;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current && e.deltaY !== 0) {
      // Allow vertical scroll if we're not scrolling horizontally
      // But if user holds shift, it scrolls horizontally natively
      // Optional: translate vertical scroll to horizontal scroll if you want
      // but usually standard trackpad scrolling handles this.
      // We will just let the native behavior run unless we want to force horizontal wheel
    }
  };
  
  const info = {
    fullName: t.about.fullName,
    education: t.about.education,
    address: t.contact.locationValue,
    phone: '+84 944 840 757',
    email: 'tdbnhanhl@gmail.com',
  };

  const values = [
    { title: t.about.values.growthTitle, desc: t.about.values.growthDesc },
    { title: t.about.values.learningTitle, desc: t.about.values.learningDesc },
    { title: t.about.values.profTitle, desc: t.about.values.profDesc },
    { title: t.about.values.customerTitle, desc: t.about.values.customerDesc },
    { title: t.about.values.dataTitle, desc: t.about.values.dataDesc },
  ];

  return (
    <div className="py-24" id="about-root">
      <div className="mx-auto max-w-5xl px-6 space-y-24">
        
        {/* Profile Section */}
        <section className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-semibold text-slate-900 dark:text-white tracking-tight">{t.about.title}</h2>
            <div className="w-12 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-5 space-y-6"
            >
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{info.fullName}</h3>
                    <p className="text-sm text-slate-500">{info.education}</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-2 text-sm">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <MapPin className="h-4 w-4" /> <span>{info.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Mail className="h-4 w-4" /> <a href={`mailto:${info.email}`} className="hover:text-blue-600 transition-colors">{info.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Phone className="h-4 w-4" /> <a href={`tel:${info.phone}`} className="hover:text-blue-600 transition-colors">{info.phone}</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              <p className="text-lg" dangerouslySetInnerHTML={{ __html: t.about.intro1 }} />
              <p>{t.about.intro2}</p>
              <p>{t.about.intro3}</p>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="relative py-16 -mx-6 px-6 sm:-mx-8 sm:px-8 overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-800/40 dark:to-slate-900/40 border border-white/60 dark:border-white/5 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-indigo-400/5 dark:bg-indigo-500/10 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />
          
          <div className="relative z-10 space-y-14">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight inline-block relative">
                {t.about.coreValues}
                {/* Gradient underline effect */}
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full" />
                {/* Animated accent line */}
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "40%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                />
              </h3>
            </motion.div>

          <div className="relative -mx-6 px-6 sm:mx-0 sm:px-0 group/carousel">
            {/* Fade gradients */}
            <div className={`absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#F4F8FD] dark:from-[#1A233A] to-transparent pointer-events-none z-10 hidden sm:block transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#F8FAFC] dark:from-[#111A2E] to-transparent pointer-events-none z-10 hidden sm:block transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}></div>
            
            {/* Navigation Arrows */}
            <button
              onClick={() => scrollByCard('left')}
              className={`absolute left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full glass premium-shadow text-slate-700 dark:text-slate-300 transition-all duration-300 opacity-100 hover:scale-110 cursor-pointer`}
              aria-label="Previous card"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={() => scrollByCard('right')}
              className={`absolute right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full glass premium-shadow text-slate-700 dark:text-slate-300 transition-all duration-300 opacity-100 hover:scale-110 cursor-pointer`}
              aria-label="Next card"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div 
              ref={scrollRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onWheel={handleWheel}
              className={`flex overflow-x-auto snap-x snap-proximity gap-6 pb-8 pt-4 -mt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
              style={{ transform: 'translate3d(0,0,0)', willChange: 'scroll-position' }}
            >
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-none w-[320px] sm:w-[360px] snap-center sm:snap-start p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-[24px] shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-2xl dark:hover:shadow-blue-900/20 group hover:-translate-y-2 lg:hover:-translate-y-3 hover:scale-[1.02] hover:border-blue-200/50 dark:hover:border-blue-500/30 transition-all duration-500 ease-out h-full flex flex-col relative overflow-hidden"
                >
                  {/* Inner subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon Container */}
                    <div className="relative w-14 h-14 mb-6">
                      {/* Glow behind icon */}
                      <div className="absolute inset-0 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 border border-blue-200/50 dark:border-blue-700/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0">
                        <Target className="h-6 w-6" />
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{v.title}</h4>
                    <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed flex-grow font-medium">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">{t.about.experience}</h3>
          </motion.div>

          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 sm:ml-6 md:ml-8 space-y-12 pb-8">
            {experiencesData[language].map((exp, idx) => (
              <ExperienceListItem 
                key={exp.id} 
                exp={exp} 
                idx={idx} 
                onSelectExperience={onSelectExperience} 
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
