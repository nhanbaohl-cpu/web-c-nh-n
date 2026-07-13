import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, LineChart, Search, Sparkles, Wrench } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

import iconChatGPT from '@/assets/images/icon tool kỹ năng/selfhst--chatgpt-light.svg';
import iconClaude from '@/assets/images/icon tool kỹ năng/material-icon-theme--claude.svg';
import iconGemini from '@/assets/images/icon tool kỹ năng/Google_Gemini_icon_2025.svg.webp';
import iconCanva from '@/assets/images/icon tool kỹ năng/canva-3d-icon-free-png.webp';
import iconVsCode from '@/assets/images/icon tool kỹ năng/logos--visual-studio-code.svg';
import iconGitHub from '@/assets/images/icon tool kỹ năng/mdi--github.svg';
import iconCapCut from '@/assets/images/icon tool kỹ năng/selfhst--capcut.svg';
import iconPerplexity from '@/assets/images/icon tool kỹ năng/ri--perplexity-fill.svg';
import iconExcel from '@/assets/images/icon tool kỹ năng/selfhst--microsoft-excel.svg';
import iconWord from '@/assets/images/icon tool kỹ năng/selfhst--microsoft-word.svg';

const toolIcons = [
  { name: 'ChatGPT', src: iconChatGPT },
  { name: 'Claude', src: iconClaude },
  { name: 'Gemini', src: iconGemini },
  { name: 'Canva', src: iconCanva },
  { name: 'VS Code', src: iconVsCode },
  { name: 'GitHub', src: iconGitHub },
  { name: 'CapCut', src: iconCapCut },
  { name: 'Perplexity', src: iconPerplexity },
  { name: 'Microsoft Excel', src: iconExcel },
  { name: 'Microsoft Word', src: iconWord }
];

export default function Skills() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('ecommerce');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'ecommerce', label: t.skills.tabEcommerce, icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'data', label: t.skills.tabData, icon: <LineChart className="w-4 h-4" /> },
  ];

  const ecommerceSkills = t.skills.ecommerce;
  const dataSkills = t.skills.data;

  const activeSkills = activeTab === 'ecommerce' ? ecommerceSkills : dataSkills;

  const filteredSkills = activeSkills.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="py-24 relative overflow-hidden" id="skills-root">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-1/4 w-[50%] h-[50%] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[50%] h-[50%] bg-indigo-50/50 dark:bg-indigo-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/50 dark:border-white/5 pb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 max-w-2xl"
          >
            <h2 className="text-4xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {t.skills.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              {t.skills.subtitle}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full md:w-72"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder={t.skills.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-slate-900 dark:text-white transition-all"
            />
          </motion.div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col sm:flex-row gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="skills-tab-indicator"
                  className="absolute inset-0 bg-slate-900 dark:bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card p-6 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </h3>
                    <Sparkles className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {skill.desc}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {/* Skill level bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span>{t.skills.proficiency}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="h-full bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skill.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredSkills.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
              {t.skills.noSkills}
            </div>
          )}
        </motion.div>

        {/* Tools Eco-system */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-slate-200/50 dark:border-white/5"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">{t.skills.toolEcosystem}</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {toolIcons.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex flex-col items-center justify-center p-6 glass-card rounded-2xl group hover:-translate-y-2 hover:scale-[1.08] hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <img src={tool.src} alt={tool.name} className="w-full h-full object-contain drop-shadow-sm" />
                </div>
                <span className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 text-center">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
