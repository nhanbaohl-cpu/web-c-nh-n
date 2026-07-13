/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WorkExperience {
  period: string;
  role: string;
  company: string;
  highlights: string[];
  results?: string[];
  images?: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface ToolItem {
  name: string;
  category: 'office' | 'design' | 'dev' | 'ai' | 'ecommerce';
  iconName?: string;
}

export interface CareerGoal {
  type: 'short_term' | 'long_term';
  title: string;
  items: string[];
}

export interface PortfolioPage {
  pageNumber: number;
  title: string;
  subtitle?: string;
  content: string[];
  kpis?: string[];
  section?: string;
  images?: {
    title: string;
    description: string;
  }[];
}
