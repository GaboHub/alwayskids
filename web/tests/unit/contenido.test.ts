import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import matter from 'gray-matter';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const serviciosDir = path.resolve(dirname, '../../../content/servicios');
const siteJsonPath = path.resolve(dirname, '../../../content/site.json');

const categoriasValidas = ['animacion-deportiva', 'animacion-cientifica', 'plazas-blandas-bby'];

const archivos = readdirSync(serviciosDir).filter((archivo) => archivo.endsWith('.md'));

const servicios = archivos.map((archivo) => {
  const contenido = readFileSync(path.join(serviciosDir, archivo), 'utf-8');
  const { data } = matter(contenido);
  return { archivo, data };
});

describe('frontmatter de servicios', () => {
  it.each(servicios)('$archivo tiene los campos requeridos', ({ data }) => {
    expect(typeof data.titulo).toBe('string');
    expect(data.titulo.length).toBeGreaterThan(0);
    expect(typeof data.slug).toBe('string');
    expect(data.slug.length).toBeGreaterThan(0);
    expect(typeof data.emoji).toBe('string');
    expect(data.emoji.length).toBeGreaterThan(0);
    expect(categoriasValidas).toContain(data.categoria);
    expect(typeof data.gancho).toBe('string');
    expect(data.gancho.length).toBeGreaterThan(0);
    expect(typeof data.cierre).toBe('string');
    expect(data.cierre.length).toBeGreaterThan(0);
  });
});

describe('slugs de servicios vs site.json', () => {
  const site = JSON.parse(readFileSync(siteJsonPath, 'utf-8'));
  const slugsDeclarados: string[] = site.categorias.flatMap(
    (categoria: { servicios: string[] }) => categoria.servicios,
  );
  const slugsDeContenido = servicios.map(({ data }) => data.slug as string);

  it('cada slug declarado en site.json existe como servicio', () => {
    for (const slug of slugsDeclarados) {
      expect(slugsDeContenido).toContain(slug);
    }
  });

  it('cada servicio en contenido está declarado en site.json', () => {
    for (const slug of slugsDeContenido) {
      expect(slugsDeclarados).toContain(slug);
    }
  });

  it('hay exactamente 11 servicios, sin duplicados', () => {
    expect(slugsDeContenido.length).toBe(11);
    expect(new Set(slugsDeContenido).size).toBe(11);
    expect(slugsDeclarados.length).toBe(11);
    expect(new Set(slugsDeclarados).size).toBe(11);
  });
});
