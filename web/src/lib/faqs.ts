import raw from '../data/faqs.json';

export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export interface FaqsData {
  global: FaqItem[];
  categorias: Record<string, FaqItem[]>;
}

export const faqs: FaqsData = raw as FaqsData;

export function getFaqsCategoria(slug: string): FaqItem[] {
  return faqs.categorias[slug] ?? [];
}
