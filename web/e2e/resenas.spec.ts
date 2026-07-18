import { test, expect } from '@playwright/test';

const urlGoogle = 'https://share.google/qh3GY8ceWSFX6Ma4S';

const autoresEsperados = [
  'Pamela Villegas',
  'jardincafeyverde',
  'Nicole Soto',
  'Alfredo A. Gutiérrez F.',
  'Cote Vargas',
  'Andrea Cheuquehuala',
  'Cecilia Diaz',
  'Daniela Tilleria',
];

async function verificarJsonLdSinReseñas(page: import('@playwright/test').Page) {
  const bloques = await page.locator('script[type="application/ld+json"]').allTextContents();
  for (const bloque of bloques) {
    expect(bloque).not.toContain('aggregateRating');
    expect(bloque).not.toContain('"Review"');
  }
}

test.describe('badge de Google', () => {
  test('está visible y enlaza a la ficha de Google en la home', async ({ page }) => {
    await page.goto('/');
    const badge = page.getByRole('link', { name: /5\.0 de 5 estrellas en Google/ });
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute('href', urlGoogle);
    await expect(badge).toHaveAttribute('target', '_blank');
    await verificarJsonLdSinReseñas(page);
  });

  test('está visible y enlaza a la ficha de Google en la galería', async ({ page }) => {
    await page.goto('/galeria/');
    const badge = page.getByRole('link', { name: /5\.0 de 5 estrellas en Google/ });
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute('href', urlGoogle);
    await expect(badge).toHaveAttribute('target', '_blank');
    await verificarJsonLdSinReseñas(page);
  });
});

test.describe('sección de reseñas', () => {
  test('muestra las 8 reseñas con autor y CTA a Google', async ({ page }) => {
    await page.goto('/galeria/');
    await expect(page.getByRole('heading', { name: 'Lo que dicen las familias' })).toBeVisible();

    for (const autor of autoresEsperados) {
      await expect(page.getByText(autor, { exact: true })).toBeVisible();
    }

    const cta = page.getByRole('link', { name: 'Ver todas las reseñas en Google' });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', urlGoogle);
  });
});
