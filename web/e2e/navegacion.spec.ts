import { test, expect } from '@playwright/test';

const serviciosPorCategoria = [
  { slug: 'aquakids', titulo: 'AquaKids' },
  { slug: 'atomokids', titulo: 'ÁtomoKids' },
  { slug: 'arcoiris', titulo: 'Arcoíris' },
];

test.describe('navegación principal', () => {
  test('la home carga con h1 y marca', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('header').getByText('Always Kids', { exact: true })).toBeVisible();
  });

  for (const servicio of serviciosPorCategoria) {
    test(`navega desde la home a ${servicio.slug}`, async ({ page }) => {
      await page.goto('/');
      await page.locator(`a[href="/servicios/${servicio.slug}/"]`).first().click();
      await expect(page).toHaveURL(new RegExp(`/servicios/${servicio.slug}/$`));
      await expect(page.getByRole('heading', { level: 1 })).toContainText(servicio.titulo);
    });
  }

  test('el 404 responde para una ruta inexistente', async ({ page }) => {
    const response = await page.goto('/esta-ruta-no-existe/');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Página no encontrada');
  });

  test('/inicio/ redirige a la home', async ({ page }) => {
    await page.goto('/inicio/');
    await page.waitForURL((url) => url.pathname === '/');
    await expect(page.locator('header').getByText('Always Kids', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Cumpleaños');
  });
});
