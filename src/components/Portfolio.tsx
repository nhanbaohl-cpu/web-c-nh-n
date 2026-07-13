import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Maximize, X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetUrl } from '../utils/asset';
import { useLanguage } from '../i18n/LanguageContext';

export default function Portfolio() {
  const { t } = useLanguage();
  const totalPages = 15;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxPage, setLightboxPage] = useState(0);
  const [scale, setScale] = useState(1);
  

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  const getPageSrc = (pageNum: number) => {
    return getAssetUrl(`/portfolio/Portfolio_Trần Đình Bảo Nhân-images-${pageNum}.jpg`);
  };

  const openLightbox = (pageNum: number) => {
    setLightboxPage(pageNum);
    setScale(1);
    setLightboxOpen(true);
  };

  const goToNextPage = () => {
    setLightboxPage((prev) => (prev + 1) % totalPages);
    setScale(1);
  };

  const goToPrevPage = () => {
    setLightboxPage((prev) => (prev - 1 + totalPages) % totalPages);
    setScale(1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') {
        setLightboxOpen(false);
        setScale(1);
      } else if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, totalPages]);

  return (
    <div className="relative min-h-screen py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/5 dark:bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {t.portfolio.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              {t.portfolio.subtitle}
            </p>
          </div>
          
          <a
            href={getAssetUrl("/Portfolio_Tran_Dinh_Bao_Nhan.pdf")}
            download="Portfolio_Tran_Dinh_Bao_Nhan.pdf"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border border-transparent shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.98] active:shadow-[0_2px_8px_rgba(0,0,0,0.1)] cursor-pointer shrink-0"
          >
            <Download className="w-[18px] h-[18px]" />
            <span>{t.contact.downloadPortfolio}</span>
          </a>
        </div>

        {/* Continuous Scrolling Document Area */}
        <div className="flex flex-col items-center gap-10 sm:gap-14 max-w-[1000px] w-full mx-auto">
          {pages.map((pageNum) => (
            <motion.div
              key={pageNum}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full rounded-2xl overflow-hidden bg-white shadow-md border border-slate-200/50 group flex justify-center"
            >
              
                <img
                  src={getPageSrc(pageNum)}
                  alt={`Portfolio Page ${pageNum + 1}`}
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                  }}
                />
              
              {/* Overlay Fullscreen Button */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => openLightbox(pageNum)}
                  className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                  title={t.portfolio.fullscreen}
                >
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-b from-black/50 to-transparent absolute top-0 left-0 right-0 z-30">
              <div className="text-white/70 font-medium">
                {t.portfolio.page} {lightboxPage + 1} {t.portfolio.of} {totalPages}
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setScale(s => Math.min(s + 0.5, 3))} className="text-white/70 hover:text-white cursor-pointer"><ZoomIn className="h-6 w-6" /></button>
                <button onClick={() => setScale(s => Math.max(s - 0.5, 0.5))} className="text-white/70 hover:text-white cursor-pointer"><ZoomOut className="h-6 w-6" /></button>
                <a href={getAssetUrl("/Portfolio_Tran_Dinh_Bao_Nhan.pdf")} download className="text-white/70 hover:text-white cursor-pointer"><Download className="h-6 w-6" /></a>
                <button onClick={() => { setLightboxOpen(false); setScale(1); }} className="text-white/70 hover:text-white cursor-pointer ml-4"><X className="h-8 w-8" /></button>
              </div>
            </div>

            {/* Navigation Buttons (Fixed outside scroll area) */}
            <button 
              onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all z-20 cursor-pointer pointer-events-auto"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all z-20 cursor-pointer pointer-events-auto"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Content */}
            <div 
              className="flex-1 overflow-auto flex items-center justify-center p-4 pt-24 w-full h-full z-10"
              onClick={() => { setLightboxOpen(false); setScale(1); }}
            >
              
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: scale }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  src={getPageSrc(lightboxPage)}
                  alt={`Portfolio Page ${lightboxPage + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl origin-center"
                  onClick={(e) => e.stopPropagation()}
                />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
