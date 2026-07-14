import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Maximize2, 
  Download, 
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getExperienceById } from '../data/experiences';
import { useLanguage } from '../i18n/LanguageContext';
import { getAssetUrl, downloadFile } from '../utils/asset';
import ImageWithFallback from './ImageWithFallback';
import ImagePlaceholder from './ImagePlaceholder';

interface ExperienceDetailProps {
  experienceId: string;
  onBack: () => void;
}

export default function ExperienceDetail({ experienceId, onBack }: ExperienceDetailProps) {
  const { t, language } = useLanguage();
  const experience = getExperienceById(experienceId, language);
  
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeImageCaption, setActiveImageCaption] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (activeImage === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, lightboxIndex]);

  if (!experience) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold">{t.experienceDetail.notFound}</h2>
        <button onClick={onBack} className="mt-4 text-blue-600 hover:underline">{t.experienceDetail.goBack}</button>
      </div>
    );
  }

  // Use dynamic images if available, otherwise fallback to hardcoded gallery
  let allGalleryImages = experience.gallery || [];
  const displayExperience = { ...experience };

  const handleOpenLightbox = (src: string, index: number, caption: string) => {
    setActiveImage(src);
    setLightboxIndex(index);
    setActiveImageCaption(caption);
    setScale(1.0);
  };

  const closeLightbox = () => {
    setActiveImage(null);
    setScale(1.0);
  };

  const nextImage = () => {
    if (allGalleryImages.length > 0) {
      const nextIdx = (lightboxIndex + 1) % allGalleryImages.length;
      handleOpenLightbox(getAssetUrl(allGalleryImages[nextIdx].src), nextIdx, allGalleryImages[nextIdx].caption);
    }
  };

  const prevImage = () => {
    if (allGalleryImages.length > 0) {
      const prevIdx = (lightboxIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
      handleOpenLightbox(getAssetUrl(allGalleryImages[prevIdx].src), prevIdx, allGalleryImages[prevIdx].caption);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-24 relative"
    >
      <div className="mx-auto max-w-4xl px-6 space-y-12">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to About
        </button>

        {/* Header Area */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
              <Calendar className="h-3.5 w-3.5" /> {experience.period}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
              <Briefcase className="h-3.5 w-3.5" /> {experience.company}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight text-balance">
            {experience.role}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            {experience.description}
          </p>
        </div>

        {/* Action Blocks */}
        {displayExperience.workflow && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">{t.experienceDetail.executionProcess}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayExperience.workflow.map((step, idx) => (
                <div key={idx} className="glass-card p-6 flex gap-4 hover:-translate-y-1 transition-transform">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{step.step}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                    {step.image !== undefined && (
                      <div 
                        className="mt-4 rounded-xl overflow-hidden cursor-zoom-in group/img"
                        onClick={() => step.image ? handleOpenLightbox(getAssetUrl(step.image), 0, step.step) : null}
                      >
                        {step.image ? (
                          <ImageWithFallback 
                            src={getAssetUrl(step.image)} 
                            alt={step.step}
                            className="w-full h-auto aspect-video object-cover transition-transform duration-500 group-hover/img:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <ImagePlaceholder title={step.step} aspectRatio="video" className="w-full border-none" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges & Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experience.challenges && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-amber-500" /> Challenges
              </h3>
              <ul className="space-y-4">
                {experience.challenges.map((challenge, idx) => (
                  <li key={idx} className="glass-card p-5 text-sm text-slate-600 dark:text-slate-400 flex items-start gap-3">
                    <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                    <span><span className="font-semibold">{challenge.problem}</span><br/><span className="text-slate-500 mt-1 block">{challenge.solution}</span></span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experience.results && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <Award className="h-6 w-6 text-emerald-500" /> Results
              </h3>
              <ul className="space-y-4">
                {experience.results.map((result, idx) => (
                  <li key={idx} className="glass-card p-5 text-sm text-slate-600 dark:text-slate-400 flex items-start gap-3">
                    <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Gallery */}
        {allGalleryImages.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">{t.experienceDetail.gallery}</h3>
            <div className="columns-1 md:columns-2 gap-4 space-y-4">
              {allGalleryImages.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={idx}
                  onClick={() => item.src ? handleOpenLightbox(getAssetUrl(item.src), idx, item.caption) : null}
                  className="group relative rounded-2xl overflow-hidden cursor-zoom-in bg-slate-100 dark:bg-slate-800 shadow-sm hover:shadow-md break-inside-avoid"
                >
                  {item.src ? (
                    <>
                      <ImageWithFallback 
                        src={getAssetUrl(item.src)} 
                        alt={item.caption} 
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </>
                  ) : (
                    <ImagePlaceholder title={item.caption} aspectRatio="video" className="w-full border-none" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Portal */}
      <AnimatePresence>
        {activeImage && typeof document !== 'undefined' && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            {/* Toolbar */}
            <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-start z-50 pointer-events-none">
              <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full pointer-events-auto max-w-[50%]">
                <p className="text-white/90 text-sm font-medium truncate">{activeImageCaption}</p>
                {allGalleryImages.length > 0 && (
                  <p className="text-white/50 text-xs mt-1">{lightboxIndex + 1} / {allGalleryImages.length}</p>
                )}
              </div>

              <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md p-2 rounded-full pointer-events-auto">
                <button onClick={() => setScale(s => Math.min(s + 0.5, 3))} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"><ZoomIn className="w-5 h-5" /></button>
                <button onClick={() => setScale(s => Math.max(s - 0.5, 0.5))} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"><ZoomOut className="w-5 h-5" /></button>
                <a 
                  href={activeImage} 
                  download 
                  onClick={(e) => {
                    e.preventDefault();
                    downloadFile(activeImage, activeImage.split('/').pop() || 'image.jpg');
                  }}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                </a>
                <div className="w-px h-6 bg-white/20 mx-1" />
                <button onClick={closeLightbox} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"><X className="w-6 h-6" /></button>
              </div>
            </div>

            {/* Navigation Arrows */}
            {allGalleryImages.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50 cursor-pointer">
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50 cursor-pointer">
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image Area */}
            <div className="flex-1 overflow-auto flex items-center justify-center p-4 md:p-12" onClick={closeLightbox}>
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: scale }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full h-full origin-center flex items-center justify-center"
              >
                <ImageWithFallback
                  src={activeImage}
                  alt={activeImageCaption}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()} // Prevent close on image click
                />
              </motion.div>
            </div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </motion.div>
  );
}
