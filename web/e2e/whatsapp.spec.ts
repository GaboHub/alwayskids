import { test, expect } from '@playwright/test';

const whatsappHrefFragment = 'wa.me/56998905022';

test.describe('WhatsApp', () => {
  test('el botón flotante está visible y apunta a WhatsApp en la home', async ({ page }) => {
    await page.goto('/');
    const flotante = page.locator('a[aria-label="Escríbenos por WhatsApp"]');
    await expect(flotante).toBeVisible();
    await expect(flotante).toHaveAttribute('href', new RegExp(whatsappHrefFragment));
  });

  test('el botón flotante está visible y apunta a WhatsApp en un servicio', async ({ page }) => {
    await page.goto('/servicios/aquakids/');
    const flotante = page.locator('a[aria-label="Escríbenos por WhatsApp"]');
    await expect(flotante).toBeVisible();
    await expect(flotante).toHaveAttribute('href', new RegExp(whatsappHrefFragment));
  });

  test('el botón flotante está visible y apunta a WhatsApp en contacto', async ({ page }) => {
    await page.goto('/contacto/');
    const flotante = page.locator('a[aria-label="Escríbenos por WhatsApp"]');
    await expect(flotante).toBeVisible();
    await expect(flotante).toHaveAttribute('href', new RegExp(whatsappHrefFragment));
  });

  test('el CTA principal de la home apunta a WhatsApp', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('link', { name: 'Cotiza tu fiesta por WhatsApp' });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', new RegExp(whatsappHrefFragment));
  });

  test('el CTA principal de un servicio apunta a WhatsApp', async ({ page }) => {
    await page.goto('/servicios/aquakids/');
    const cta = page.getByRole('link', { name: 'Quiero cotizar AquaKids' });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', new RegExp(whatsappHrefFragment));
  });

  test('el CTA principal de contacto apunta a WhatsApp', async ({ page }) => {
    await page.goto('/contacto/');
    const cta = page.locator('main').getByRole('link', { name: /Escríbenos por WhatsApp/ });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', new RegExp(whatsappHrefFragment));
  });
});
