import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(dirname, '../../src/assets/images');
const siteJsonPath = path.resolve(dirname, '../../src/data/site.json');

const site = JSON.parse(readFileSync(siteJsonPath, 'utf-8'));
const slugs: string[] = site.categorias.flatMap((categoria: { servicios: string[] }) => categoria.servicios);

const extensionesValidas = ['jpg', 'jpeg', 'png'];

describe('imágenes hero de servicios', () => {
  it.each(slugs)('existe src/assets/images/%s-hero.*', (slug) => {
    const encontrada = extensionesValidas.some((extension) =>
      existsSync(path.join(imagesDir, `${slug}-hero.${extension}`)),
    );
    expect(encontrada).toBe(true);
  });

  it('no hay slugs de site.json sin imagen en assets/images', () => {
    const archivos = readdirSync(imagesDir);
    const faltantes = slugs.filter(
      (slug) => !archivos.some((archivo) => archivo.startsWith(`${slug}-hero.`)),
    );
    expect(faltantes).toEqual([]);
  });
});
