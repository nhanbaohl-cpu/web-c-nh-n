/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import ExperienceDetail from './components/ExperienceDetail';
import AnimatedBackground from './components/AnimatedBackground';
import { ArrowUp, Linkedin, Facebook, Instagram, Phone, Mail } from 'lucide-react';
import { useLanguage } from './i18n/LanguageContext';

export default function App() {
  const { t } = useLanguage();
  
  useEffect(() => {
    document.title = t.app?.title || "Trần Đình Bảo Nhân | Portfolio";
    
    // Update SEO meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t.home?.subtitle || '');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', t.app?.title || '');
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', t.home?.subtitle || '');
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', t.app?.title || '');
    }

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', t.home?.subtitle || '');
    }
  }, [t]);

  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return false; 
    }
    return false;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let activeTab = 'home';
  if (currentPath === '/' || currentPath === '/home') {
    activeTab = 'home';
  } else if (currentPath.startsWith('/about') || currentPath.startsWith('/experience')) {
    activeTab = 'about';
  } else if (currentPath.startsWith('/skills')) {
    activeTab = 'skills';
  } else if (currentPath.startsWith('/portfolio')) {
    activeTab = 'portfolio';
  } else if (currentPath.startsWith('/contact')) {
    activeTab = 'contact';
  }

  const renderContent = () => {
    if (currentPath.startsWith('/experience/')) {
      const id = currentPath.split('/experience/')[1];
      return <ExperienceDetail experienceId={id} onBack={() => navigate('/about')} />;
    }
    
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={(tab) => navigate(`/${tab}`)} />;
      case 'about':
        return <About onSelectExperience={(id) => navigate(`/experience/${id}`)} />;
      case 'skills':
        return <Skills />;
      case 'portfolio':
        return <Portfolio />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActiveTab={(tab) => navigate(`/${tab}`)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-600">
      <AnimatedBackground />
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => navigate(`/${tab === 'home' ? '' : tab}`)}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="flex-grow pt-14 md:pt-16 flex flex-col items-stretch relative">
        <AnimatePresence mode="wait">
          {isInitialLoading ? (
            <motion.div
              key="loader"
              className="absolute inset-0 flex flex-col items-center justify-center z-50 h-screen"
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-10 h-10 border-2 border-slate-200 dark:border-slate-800 border-t-blue-600 rounded-full animate-spin mb-4" />
              <p className="text-[10px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase animate-pulse">
                {t.app.loading}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-grow flex flex-col w-full"
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full glass premium-shadow text-slate-700 dark:text-slate-300 hover:scale-110 transition-transform focus:outline-none cursor-pointer"
            title={t.app.scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="mt-auto py-10 lg:py-12 bg-[#0B0B0F] border-t border-white/5 text-slate-400 text-sm relative z-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
            {/* Left */}
            <div className="space-y-2 text-center md:text-left">
              <span className="block text-xl font-bold text-white tracking-tight">{t.about.fullName}</span>
              <span className="block text-sm text-slate-400">{t.app.footerRole}</span>
              <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
                <a href="https://www.linkedin.com/in/b%E1%BA%A3o-nh%C3%A2n-tr%E1%BA%A7n-%C4%91%C3%ACnh-0114943a4/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer text-slate-300">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://www.facebook.com/nhan.bao.7146557?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer text-slate-300">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="https://www.tiktok.com/@ndbao.1" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer text-slate-300">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a href="mailto:tdbnhanhl@gmail.com" className="p-2.5 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer text-slate-300">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Center */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-3 tracking-wide uppercase text-xs">Quick Navigation</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/')} className="hover:text-blue-500 transition-colors cursor-pointer text-slate-400 hover:translate-x-1 transform inline-block duration-300">Home</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-blue-500 transition-colors cursor-pointer text-slate-400 hover:translate-x-1 transform inline-block duration-300">About</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-blue-500 transition-colors cursor-pointer text-slate-400 hover:translate-x-1 transform inline-block duration-300">Experience</button></li>
                <li><button onClick={() => navigate('/portfolio')} className="hover:text-blue-500 transition-colors cursor-pointer text-slate-400 hover:translate-x-1 transform inline-block duration-300">Projects</button></li>
                <li><button onClick={() => navigate('/portfolio')} className="hover:text-blue-500 transition-colors cursor-pointer text-slate-400 hover:translate-x-1 transform inline-block duration-300">Portfolio</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-blue-500 transition-colors cursor-pointer text-slate-400 hover:translate-x-1 transform inline-block duration-300">Contact</button></li>
              </ul>
            </div>

            {/* Right */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-3 tracking-wide uppercase text-xs">Contact Information</h3>
              <ul className="space-y-2.5">
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <Phone className="h-4 w-4 text-blue-500" />
                  <a href="tel:+84944840757" className="hover:text-blue-500 transition-colors cursor-pointer text-slate-400">+84 944 840 757</a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <a href="mailto:tdbnhanhl@gmail.com" className="hover:text-blue-500 transition-colors cursor-pointer text-slate-400">tdbnhanhl@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-slate-400">
              &copy; 2026 Tran Dinh Bao Nhan. All Rights Reserved.
            </div>
            <div className="text-slate-500">
              Designed &amp; Developed by Tran Dinh Bao Nhan.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
