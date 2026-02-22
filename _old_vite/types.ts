export interface Persona {
  id: string;
  title: string;
  role: string;
  painPoint: string;
  solution: string;
  features: string[];
}

export interface ComparisonItem {
  feature: string;
  competitor: string;
  galpi: string;
  note: string;
}

export interface PricingTier {
  name: string;
  price: string;
  originalPrice?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}