import { test, expect } from '@playwright/test';

test.describe('archivos estáticos', () => {
  test('robots.txt responde 200 y referencia el sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const cuerpo = await response.text();
    expect(cuerpo).toContain('Sitemap: https://alwayskids.cl/sitemap-index.xml');
  });

  test('llms.txt responde 200 y menciona los servicios', async ({ request }) => {
    const response = await request.get('/llms.txt');
    expect(response.status()).toBe(200);
    const cuerpo = await response.text();
    expect(cuerpo).toContain('AquaKids');
    expect(cuerpo).toContain('ÁtomoKids');
    expect(cuerpo).toContain('Arcoíris');
  });

  test('sitemap-index.xml responde 200', async ({ request }) => {
    const response = await request.get('/sitemap-index.xml');
    expect(response.status()).toBe(200);
    const cuerpo = await response.text();
    expect(cuerpo).toContain('<sitemapindex');
  });
});
