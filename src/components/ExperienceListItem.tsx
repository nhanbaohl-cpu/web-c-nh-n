import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Experience } from '../data/experiences';
import { useLanguage } from '../i18n/LanguageContext';
import { getAssetUrl } from '../utils/asset';
import ImageWithFallback from './ImageWithFallback';
import ImagePlaceholder from './ImagePlaceholder';
import { useProjectImages } from '../utils/useProjectImages';

interface Props {
  key?: string | number;
  exp: Experience;
  idx: number;
  onSelectExperience?: (id: string) => void;
}

export default function ExperienceListItem({ exp, idx, onSelectExperience }: Props) {
  const { t } = useLanguage();
  const images = useProjectImages(exp.id);
  const coverImage = images.length > 0 ? images[0] : exp.mainImage;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="relative pl-8 sm:pl-12 group"
    >
      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-950 group-hover:scale-150 transition-transform duration-300" />
      
      <div 
        onClick={() => onSelectExperience?.(exp.id)}
        className="glass-card p-6 sm:p-8 cursor-pointer hover:shadow-lg transition-all group-hover:border-blue-200 dark:group-hover:border-blue-900/50"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {exp.period}
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h4>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">{exp.company}</p>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
              {exp.overview}
            </p>

            <div className="pt-4 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              {t.about.viewDetails} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="shrink-0 w-full md:w-48 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            {coverImage ? (
              <ImageWithFallback 
                src={getAssetUrl(coverImage)} 
                alt={exp.company}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <ImagePlaceholder title={exp.company} aspectRatio="auto" className="w-full h-full border-none !p-2" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
