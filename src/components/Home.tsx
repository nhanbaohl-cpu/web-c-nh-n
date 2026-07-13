import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Award, ShoppingBag } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { getAssetUrl } from '../utils/asset';
import { useLanguage } from '../i18n/LanguageContext';
import { experiencesData } from '../data/experiences';
import ExperienceCard from './ExperienceCard';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

const CountingNumber = ({ value }: { value: string }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(numericValue * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    requestAnimationFrame(animate);
  }, [numericValue]);

  return <span>{count}{suffix}</span>;
};

export default function Home({ setActiveTab }: HomeProps) {
  const { language, t } = useLanguage();
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 1000], [0, 200]);

  const profileImage = '/avatar.jpg';

  return (
    <div className="relative pt-32 pb-24 overflow-hidden" id="home-root">
      {/* Premium Apple-style background blur blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Typography Focus */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span className="uppercase tracking-widest">{t.home.available}</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-2xl sm:text-3xl font-medium text-slate-700 dark:text-slate-300 tracking-tight"
              >
                Trần Đình <span className="text-blue-600 dark:text-blue-400 font-semibold">Bảo Nhân</span>
              </motion.h2>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-slate-900 dark:text-white tracking-tight text-balance leading-[1.1]">
                {t.home.title1}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{t.home.title2}</span><br/> 
                {t.home.title3}
              </h1>
            </div>

            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
              {t.home.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setActiveTab('portfolio')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border border-transparent shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.98] active:shadow-[0_2px_8px_rgba(0,0,0,0.1)] cursor-pointer group"
              >
                <span>{t.home.viewPortfolio}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setActiveTab('contact')}
                className="group px-8 py-4 rounded-full glass font-semibold text-sm text-slate-700 dark:text-slate-300 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
              >
                {t.home.contactMe}
              </button>
            </div>
          </motion.div>

          {/* Right Column - Premium Profile Card */}
          <motion.div 
            className="lg:col-span-5 relative"
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden premium-shadow group bg-slate-100 dark:bg-slate-800">
              <img
                src={getAssetUrl(profileImage)}
                alt={t.about.fullName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Floating achievement glass card */}
            <motion.div 
              className="absolute -bottom-6 -left-6 sm:-left-12 glass-card p-5 pr-8 flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  <CountingNumber value="100M" />+
                </p>
                <p className="text-xs text-slate-500 font-medium">{t.home.revenue}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Highlights Section */}
        <motion.div 
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {[
            {
              icon: <Award className="w-6 h-6 text-indigo-500" />,
              title: t.home.highlight1Title,
              desc: t.home.highlight1Desc,
            },
            {
              icon: <ShoppingBag className="w-6 h-6 text-blue-500" />,
              title: t.home.highlight2Title,
              desc: t.home.highlight2Desc,
            },
            {
              icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
              title: t.home.highlight3Title,
              desc: t.home.highlight3Desc,
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="glass-card p-8 group hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 relative z-10">
        {/* Professional Experience Section */}
        <div className="mt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight"
            >
              {t.home.experienceTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed"
            >
              {t.home.experienceSubtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
            {experiencesData[language].slice(0, 3).map((exp, idx) => (
              <ExperienceCard 
                key={exp.id}
                exp={exp}
                idx={idx}
                setActiveTab={setActiveTab}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
