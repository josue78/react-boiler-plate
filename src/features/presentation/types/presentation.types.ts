/**
 * Types for the presentation feature
 */

export interface TechItem {
  name: string;
  category: 'frontend' | 'devtools' | 'ui' | 'i18n' | 'testing';
  icon?: string;
  description?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'development' | 'uiux' | 'i18n' | 'quality';
}

export interface StatCard {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  color: string;
  description?: string;
}

export interface SectionRef {
  id: string;
  title: string;
  ref: React.RefObject<HTMLDivElement>;
}

