export type Language = 'en' | 'vi';

export interface Translation {
  nav: {
    home: string;
    about: string;
    skills: string;
    portfolio: string;
    contact: string;
  };
  app: {
    title: string;
    loading: string;
    scrollToTop: string;
    footerRole: string;
    rights: string;
  };
  home: {
    available: string;
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    viewPortfolio: string;
    contactMe: string;
    noImage: string;
    revenue: string;
    highlight1Title: string;
    highlight1Desc: string;
    highlight2Title: string;
    highlight2Desc: string;
    highlight3Title: string;
    highlight3Desc: string;
    experienceTitle: string;
    experienceSubtitle: string;
    learnMore: string;
  };
  about: {
    title: string;
    fullName: string;
    education: string;
    intro1: string;
    intro2: string;
    intro3: string;
    coreValues: string;
    experience: string;
    viewDetails: string;
    values: {
      growthTitle: string;
      growthDesc: string;
      learningTitle: string;
      learningDesc: string;
      profTitle: string;
      profDesc: string;
      customerTitle: string;
      customerDesc: string;
      dataTitle: string;
      dataDesc: string;
    };
  };
  skills: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    tabEcommerce: string;
    tabData: string;
    proficiency: string;
    noSkills: string;
    toolEcosystem: string;
    ecommerce: Array<{ name: string; desc: string; level: number; tags: string[] }>;
    data: Array<{ name: string; desc: string; level: number; tags: string[] }>;
  };
  portfolio: {
    title: string;
    subtitle: string;
    downloadPdf: string;
    page: string;
    of: string;
    fullscreen: string;
  };
  contact: {
    getInTouch: string;
    title: string;
    contactInfo: string;
    phone: string;
    email: string;
    location: string;
    locationValue: string;
    socialProfiles: string;
    messageSent: string;
    thankYou: string;
    sendAnother: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendMessage: string;
    sending: string;
  };
  experienceDetail: {
    notFound: string;
    goBack: string;
    backToAbout: string;
    executionProcess: string;
    challenges: string;
    results: string;
    gallery: string;
  };
}
