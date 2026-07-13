import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Linkedin, Github, Facebook, ArrowUpRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('Contact form error:', err);
      setError(err.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      id: 'phone',
      icon: <Phone className="h-5 w-5" />,
      label: t.contact.phone,
      value: '+84 944 840 757',
      link: 'tel:+84944840757'
    },
    {
      id: 'email',
      icon: <Mail className="h-5 w-5" />,
      label: t.contact.email,
      value: 'tdbnhanhl@gmail.com',
      link: 'mailto:tdbnhanhl@gmail.com'
    },
    {
      id: 'location',
      icon: <MapPin className="h-5 w-5" />,
      label: t.contact.location,
      value: t.contact.locationValue,
      link: 'https://maps.google.com/?q=Da+Nang,+Vietnam'
    }
  ];

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/b%E1%BA%A3o-nh%C3%A2n-tr%E1%BA%A7n-%C4%91%C3%ACnh-0114943a4/', label: 'LinkedIn' },
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/nhanbaohl-cpu', label: 'GitHub' },
    { icon: <Facebook className="w-5 h-5" />, href: 'https://www.facebook.com/nhan.bao.7146557?locale=vi_VN', label: 'Facebook' },
  ];

  return (
    <div className="py-24 relative overflow-hidden" id="contact-root">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/50 dark:bg-indigo-900/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 space-y-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight mb-4" dangerouslySetInnerHTML={{ __html: t.contact.title }} />
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            {t.contact.getInTouch}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-10 lg:col-span-5"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{t.contact.contactInfo}</h3>
              <div className="space-y-4">
                {contactInfo.map((info, idx) => (
                  <a 
                    key={idx}
                    href={info.id === 'location' ? info.link : '#'}
                    onClick={(e) => {
                      if (info.id !== 'location') {
                        e.preventDefault();
                        navigator.clipboard.writeText(info.value);
                        setCopiedId(info.id);
                        setTimeout(() => setCopiedId(null), 2000);
                      }
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all shadow-sm">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{info.label}</p>
                      <p className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{info.value}</p>
                    </div>
                    <AnimatePresence>
                      {copiedId === info.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium rounded-lg shadow-lg whitespace-nowrap z-10"
                        >
                          {info.id === 'phone' ? t.contact.copiedPhone : t.contact.copiedEmail}
                          {/* Arrow pointing down */}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </a>
                ))}
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-5 pb-0">
                <a 
                  href="/TranDinhBaoNhan_CV.pdf"
                  download="TranDinhBaoNhan_CV.pdf"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border border-transparent shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.98] active:shadow-[0_2px_8px_rgba(0,0,0,0.1)] cursor-pointer"
                >
                  <Download className="w-[18px] h-[18px]" />
                  {t.contact.downloadCV}
                </a>
                <a 
                  href="/Portfolio_Tran_Dinh_Bao_Nhan.pdf"
                  download="Portfolio_Tran_Dinh_Bao_Nhan.pdf"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border border-transparent shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.98] active:shadow-[0_2px_8px_rgba(0,0,0,0.1)] cursor-pointer"
                >
                  <Download className="w-[18px] h-[18px]" />
                  {t.contact.downloadPortfolio}
                </a>
              </div>
            </div>

            <div className="space-y-6 pt-5 border-t border-slate-100 dark:border-slate-800/60">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{t.contact.socialProfiles}</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#F5F5F7] dark:bg-[#1C1C1E] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:-translate-y-[2px] transition-all duration-300 ease-out cursor-pointer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 sm:p-12 lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500 mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">{t.contact.messageSent}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {t.contact.thankYou}
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline cursor-pointer"
                  >
                    {t.contact.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400 px-1">{t.contact.nameLabel}</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white transition-all text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400 px-1">{t.contact.emailLabel}</label>
                      <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white transition-all text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 px-1">{t.contact.subjectLabel}</label>
                    <input 
                      type="text" 
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState(p => ({ ...p, subject: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white transition-all text-sm"
                      placeholder={t.contact.subjectPlaceholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 px-1">{t.contact.messageLabel}</label>
                    <textarea 
                      required
                      rows={6}
                      value={formState.message}
                      onChange={(e) => setFormState(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white transition-all text-sm resize-none"
                      placeholder={t.contact.messagePlaceholder}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border border-transparent shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.98] active:shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:hover:scale-100 disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] disabled:hover:bg-slate-900 disabled:dark:hover:bg-white disabled:hover:text-white disabled:dark:hover:text-slate-900 disabled:hover:border-transparent disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 dark:border-slate-900/30 border-t-white dark:border-t-slate-900 rounded-full animate-spin" />
                    ) : (
                      <>
                        {t.contact.sendMessage} <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
