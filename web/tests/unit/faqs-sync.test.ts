import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const webFaqsJsonPath = path.resolve(dirname, '../../src/data/faqs.json');
const sourceFaqsJsonPath = path.resolve(dirname, '../../../content/faqs.json');
const siteJsonPath = path.resolve(dirname, '../../../content/site.json');

describe('faqs.json sync', () => {
  it('src/data/faqs.json es idéntico a content/faqs.json', () => {
    const webFaqsJson = JSON.parse(readFileSync(webFaqsJsonPath, 'utf-8'));
    const sourceFaqsJson = JSON.parse(readFileSync(sourceFaqsJsonPath, 'utf-8'));
    expect(webFaqsJson).toStrictEqual(sourceFaqsJson);
  });
});

describe('faqs.json contenido', () => {
  const faqs = JSON.parse(readFileSync(sourceFaqsJsonPath, 'utf-8'));
  const site = JSON.parse(readFileSync(siteJsonPath, 'utf-8'));
  const slugsDeCategorias: string[] = site.categorias.map(
    (categoria: { slug: string }) => categoria.slug,
  );

  it('tiene faqs globales', () => {
    expect(Array.isArray(faqs.global)).toBe(true);
    expect(faqs.global.length).toBeGreaterThan(0);
  });

  it('tiene faqs para cada categoría declarada en site.json', () => {
    for (const slug of slugsDeCategorias) {
      expect(Array.isArray(faqs.categorias[slug])).toBe(true);
      expect(faqs.categorias[slug].length).toBeGreaterThan(0);
    }
  });

  it('cada faq tiene pregunta y respuesta no vacías', () => {
    const todasLasFaqs = [
      ...faqs.global,
      ...Object.values(faqs.categorias as Record<string, { pregunta: string; respuesta: string }[]>).flat(),
    ];
    for (const faq of todasLasFaqs) {
      expect(typeof faq.pregunta).toBe('string');
      expect(faq.pregunta.length).toBeGreaterThan(0);
      expect(typeof faq.respuesta).toBe('string');
      expect(faq.respuesta.length).toBeGreaterThan(0);
    }
  });
});
