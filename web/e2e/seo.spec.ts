import { test, expect } from '@playwright/test';

const paginas = [
  { path: '/', esServicio: false, tieneFaq: true },
  { path: '/servicios/', esServicio: false, tieneFaq: false },
  { path: '/servicios/animacion-deportiva/', esServicio: false, tieneFaq: true },
  { path: '/servicios/animacion-cientifica/', esServicio: false, tieneFaq: true },
  { path: '/servicios/plazas-blandas-bby/', esServicio: false, tieneFaq: true },
  { path: '/servicios/aquakids/', esServicio: true, tieneFaq: false },
  { path: '/galeria/', esServicio: false, tieneFaq: false },
  { path: '/contacto/', esServicio: false, tieneFaq: false },
];

async function extraerJsonLd(page: import('@playwright/test').Page) {
  const bloques = await page.locator('script[type="application/ld+json"]').allTextContents();
  return bloques.map((bloque) => JSON.parse(bloque));
}

test.describe('SEO', () => {
  for (const pagina of paginas) {
    test(`metadatos de ${pagina.path}`, async ({ page }) => {
      await page.goto(pagina.path);

      await expect(page.locator('html')).toHaveAttribute('lang', 'es-CL');

      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);

      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toMatch(/^https:\/\/alwayskids\.cl\//);
      expect(canonical?.endsWith('/')).toBe(true);

      const bloquesJsonLd = await extraerJsonLd(page);
      expect(bloquesJsonLd.length).toBeGreaterThan(0);
      const tipos = bloquesJsonLd.map((entrada) => entrada['@type']);
      expect(tipos).toContain('LocalBusiness');

      if (pagina.esServicio) {
        const servicio = bloquesJsonLd.find((entrada) => entrada['@type'] === 'Service');
        expect(servicio).toBeDefined();
        expect(servicio.provider).toBeTruthy();
        expect(servicio.provider['@type']).toBe('LocalBusiness');
      }

      const faqPage = bloquesJsonLd.find((entrada) => entrada['@type'] === 'FAQPage');
      if (pagina.tieneFaq) {
        expect(faqPage).toBeDefined();
        expect(Array.isArray(faqPage.mainEntity)).toBe(true);
        expect(faqPage.mainEntity.length).toBeGreaterThan(0);
        expect(JSON.stringify(faqPage)).not.toContain('aggregateRating');

        for (const pregunta of faqPage.mainEntity) {
          await expect(page.getByText(pregunta.name, { exact: true })).toBeVisible();
        }
      } else {
        expect(faqPage).toBeUndefined();
      }

      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toHaveCount(1);
    });
  }

  test('los títulos y descripciones son únicos entre las páginas muestreadas', async ({ page }) => {
    const titulos = new Set<string>();
    const descripciones = new Set<string>();
    for (const pagina of paginas) {
      await page.goto(pagina.path);
      titulos.add(await page.title());
      descripciones.add((await page.locator('meta[name="description"]').getAttribute('content')) ?? '');
    }
    expect(titulos.size).toBe(paginas.length);
    expect(descripciones.size).toBe(paginas.length);
  });
});
