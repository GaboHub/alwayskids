import { test, expect, type Page, type Locator } from '@playwright/test';

async function abrirPrimeraFoto(page: Page): Promise<Locator> {
  const dialogo = page.getByRole('dialog', { name: 'Foto ampliada' });
  await expect(async () => {
    await page.getByRole('button', { name: /Ver foto ampliada/ }).first().click();
    await expect(dialogo).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 15000 });
  return dialogo;
}

test.describe('galería', () => {
  test('hay imágenes en la galería', async ({ page }) => {
    await page.goto('/galeria/');
    const miniaturas = page.getByRole('button', { name: /Ver foto ampliada/ });
    await expect(miniaturas.first()).toBeVisible();
    expect(await miniaturas.count()).toBeGreaterThan(1);
  });

  test('al hacer click en una imagen se abre el diálogo', async ({ page }) => {
    await page.goto('/galeria/');
    const dialogo = await abrirPrimeraFoto(page);
    await expect(dialogo.locator('img')).toBeVisible();
  });

  test('se cierra con Escape', async ({ page }) => {
    await page.goto('/galeria/');
    const dialogo = await abrirPrimeraFoto(page);
    await page.keyboard.press('Escape');
    await expect(dialogo).toBeHidden();
  });

  test('se cierra con el botón de cierre', async ({ page }) => {
    await page.goto('/galeria/');
    const dialogo = await abrirPrimeraFoto(page);
    await page.getByRole('button', { name: 'Cerrar foto ampliada' }).click();
    await expect(dialogo).toBeHidden();
  });

  test('la navegación siguiente cambia la imagen', async ({ page }) => {
    await page.goto('/galeria/');
    const dialogo = await abrirPrimeraFoto(page);
    const imagenInicial = await dialogo.locator('img').getAttribute('src');
    await page.getByRole('button', { name: 'Foto siguiente' }).click();
    await expect(dialogo.locator('img')).not.toHaveAttribute('src', imagenInicial ?? '');
    const imagenSiguiente = await dialogo.locator('img').getAttribute('src');
    await page.getByRole('button', { name: 'Foto anterior' }).click();
    await expect(dialogo.locator('img')).toHaveAttribute('src', imagenInicial ?? '');
    expect(imagenSiguiente).not.toBe(imagenInicial);
  });
});
