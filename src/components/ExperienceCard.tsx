import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Experience } from '../data/experiences';
import { useLanguage } from '../i18n/LanguageContext';
import { getAssetUrl } from '../utils/asset';
import ImageWithFallback from './ImageWithFallback';

interface Props {
  key?: string | number;
  exp: Experience;
  idx: number;
  setActiveTab: (tab: string) => void;
}

export default function ExperienceCard({ exp, idx, setActiveTab }: Props) {
  const { t } = useLanguage();
  const coverImage = exp.mainImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="group glass-card rounded-[24px] overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-all duration-300 hover:shadow-xl dark:hover:shadow-blue-900/10"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <ImageWithFallback
          src={getAssetUrl(coverImage)}
          alt={exp.company}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          containerClassName="w-full h-full absolute inset-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
            {exp.period}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {exp.role}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-4">
          {exp.company}
        </p>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8 line-clamp-3">
          {exp.overview}
        </p>
        
        <button
          onClick={() => setActiveTab(`experience/${exp.id}`)}
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white group/btn cursor-pointer"
        >
          <span>{t.home.learnMore}</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
