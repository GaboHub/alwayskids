import { describe, expect, it } from 'vitest';
import { buildLocalBusiness, buildService, buildWebSite, buildFaqPage } from '../../src/lib/seo';
import type { FaqItem } from '../../src/lib/faqs';

const logoUrl = 'https://alwayskids.cl/_astro/logo.png';

describe('buildLocalBusiness', () => {
  const localBusiness = buildLocalBusiness(logoUrl);

  it('incluye telephone, areaServed, sameAs y address', () => {
    expect(localBusiness['@type']).toBe('LocalBusiness');
    expect(typeof localBusiness.telephone).toBe('string');
    expect(localBusiness.telephone.length).toBeGreaterThan(0);
    expect(typeof localBusiness.areaServed).toBe('string');
    expect(localBusiness.areaServed.length).toBeGreaterThan(0);
    expect(Array.isArray(localBusiness.sameAs)).toBe(true);
    expect(localBusiness.sameAs.length).toBeGreaterThan(0);
    expect(localBusiness.address['@type']).toBe('PostalAddress');
    expect(localBusiness.address.addressLocality).toBeTruthy();
    expect(localBusiness.address.addressRegion).toBeTruthy();
    expect(localBusiness.address.addressCountry).toBeTruthy();
  });

  it('es serializable y re-parseable sin undefined', () => {
    const serializado = JSON.stringify(localBusiness);
    expect(serializado).not.toContain('undefined');
    expect(JSON.parse(serializado)).toStrictEqual(localBusiness);
  });
});

describe('buildService', () => {
  const service = buildService('AquaKids', 'Fiesta acuática', logoUrl);

  it('incluye provider y serviceType', () => {
    expect(service['@type']).toBe('Service');
    expect(service.provider['@type']).toBe('LocalBusiness');
    expect(service.provider.telephone).toBeTruthy();
    expect(service.serviceType).toBe('AquaKids');
  });

  it('es serializable y re-parseable sin undefined', () => {
    const serializado = JSON.stringify(service);
    expect(serializado).not.toContain('undefined');
    expect(JSON.parse(serializado)).toStrictEqual(service);
  });
});

describe('buildFaqPage', () => {
  const items: FaqItem[] = [
    { pregunta: '¿Pregunta uno?', respuesta: 'Respuesta uno.' },
    { pregunta: '¿Pregunta dos?', respuesta: 'Respuesta dos.' },
  ];
  const faqPage = buildFaqPage(items);

  it('genera un mainEntity con Question y acceptedAnswer por cada faq', () => {
    expect(faqPage['@type']).toBe('FAQPage');
    expect(faqPage.mainEntity).toHaveLength(items.length);
    faqPage.mainEntity.forEach((entrada, indice) => {
      expect(entrada['@type']).toBe('Question');
      expect(entrada.name).toBe(items[indice].pregunta);
      expect(entrada.acceptedAnswer['@type']).toBe('Answer');
      expect(entrada.acceptedAnswer.text).toBe(items[indice].respuesta);
    });
  });

  it('no incluye aggregateRating ni markup de reseñas', () => {
    const serializado = JSON.stringify(faqPage);
    expect(serializado).not.toContain('aggregateRating');
    expect(serializado).not.toContain('Review');
  });

  it('es serializable y re-parseable sin undefined', () => {
    const serializado = JSON.stringify(faqPage);
    expect(serializado).not.toContain('undefined');
    expect(JSON.parse(serializado)).toStrictEqual(faqPage);
  });
});

describe('buildWebSite', () => {
  const webSite = buildWebSite();

  it('incluye name y url', () => {
    expect(webSite['@type']).toBe('WebSite');
    expect(webSite.name).toBeTruthy();
    expect(webSite.url).toMatch(/^https:\/\//);
  });

  it('es serializable y re-parseable sin undefined', () => {
    const serializado = JSON.stringify(webSite);
    expect(serializado).not.toContain('undefined');
    expect(JSON.parse(serializado)).toStrictEqual(webSite);
  });
});
