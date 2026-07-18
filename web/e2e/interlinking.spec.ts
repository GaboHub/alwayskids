import { test, expect } from '@playwright/test';

test.describe('interlinking', () => {
  test.describe('lista de servicios temáticos en la home (mobile)', () => {
    test.skip(({ isMobile }) => !isMobile, 'solo aplica al project mobile');

    test('tocar AquaKids navega a su página con h1', async ({ page }) => {
      await page.goto('/');
      await page.locator('#servicios-tematicos a[href="/servicios/aquakids/"]').click();
      await expect(page).toHaveURL(/\/servicios\/aquakids\/$/);
      await expect(page.getByRole('heading', { level: 1 })).toContainText('AquaKids');
    });

    test('las filas de una categoría se apilan verticalmente', async ({ page }) => {
      await page.goto('/');
      const filaAqua = page.locator('#servicios-tematicos a[href="/servicios/aquakids/"]');
      const filaDeporte = page.locator('#servicios-tematicos a[href="/servicios/deportekids/"]');
      const cajaAqua = await filaAqua.boundingBox();
      const cajaDeporte = await filaDeporte.boundingBox();
      expect(cajaAqua).not.toBeNull();
      expect(cajaDeporte).not.toBeNull();
      expect(cajaAqua!.x).toBeCloseTo(cajaDeporte!.x, 0);
      expect(cajaAqua!.y).not.toBeCloseTo(cajaDeporte!.y, 0);
    });
  });

  test('desde /servicios/ el texto "Animación Infantil Deportiva" navega a la categoría', async ({ page }) => {
    await page.goto('/servicios/');
    await page.locator('.contenido-md a[href="/servicios/animacion-deportiva/"]').click();
    await expect(page).toHaveURL(/\/servicios\/animacion-deportiva\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Animación infantil deportiva');
  });

  test('desde animación deportiva el texto "AquaKids" navega al servicio', async ({ page }) => {
    await page.goto('/servicios/animacion-deportiva/');
    await page.locator('.contenido-md a[href="/servicios/aquakids/"]').click();
    await expect(page).toHaveURL(/\/servicios\/aquakids\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('AquaKids');
  });

  test('la home tiene exactamente 3 tarjetas de categoría y ninguna tarjeta de servicio individual', async ({ page }) => {
    await page.goto('/');
    const tarjetasCategoria = page.locator('#categorias a.group');
    await expect(tarjetasCategoria).toHaveCount(3);
    await expect(tarjetasCategoria.nth(0)).toHaveAttribute('href', '/servicios/animacion-deportiva/');
    await expect(tarjetasCategoria.nth(1)).toHaveAttribute('href', '/servicios/animacion-cientifica/');
    await expect(tarjetasCategoria.nth(2)).toHaveAttribute('href', '/servicios/plazas-blandas-bby/');
    await expect(page.locator('#categorias a[href="/servicios/aquakids/"]')).toHaveCount(0);
  });

  test('la lista de servicios temáticos de la home enlaza las 3 categorías y los 11 servicios', async ({ page }) => {
    await page.goto('/');
    const enlaces = page.locator('#servicios-tematicos a[href^="/servicios/"]');
    await expect(enlaces).toHaveCount(14);
  });
});
