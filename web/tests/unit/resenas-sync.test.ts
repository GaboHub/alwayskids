import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const webResenasJsonPath = path.resolve(dirname, '../../src/data/resenas.json');
const sourceResenasJsonPath = path.resolve(dirname, '../../../content/resenas.json');

describe('resenas.json sync', () => {
  it('src/data/resenas.json es idéntico a content/resenas.json', () => {
    const webResenasJson = JSON.parse(readFileSync(webResenasJsonPath, 'utf-8'));
    const sourceResenasJson = JSON.parse(readFileSync(sourceResenasJsonPath, 'utf-8'));
    expect(webResenasJson).toStrictEqual(sourceResenasJson);
  });
});

describe('resenas.json contenido', () => {
  const resenas = JSON.parse(readFileSync(sourceResenasJsonPath, 'utf-8'));

  it('tiene los datos de Google correctos', () => {
    expect(resenas.google.rating).toBe(5.0);
    expect(resenas.google.cantidad).toBe(22);
    expect(resenas.google.url).toBe('https://share.google/qh3GY8ceWSFX6Ma4S');
  });

  it('tiene exactamente 8 reseñas', () => {
    expect(Array.isArray(resenas.resenas)).toBe(true);
    expect(resenas.resenas.length).toBe(8);
  });

  it('cada reseña tiene autor y texto no vacíos', () => {
    for (const resena of resenas.resenas) {
      expect(typeof resena.autor).toBe('string');
      expect(resena.autor.length).toBeGreaterThan(0);
      expect(typeof resena.texto).toBe('string');
      expect(resena.texto.length).toBeGreaterThan(0);
    }
  });

  it('no tiene autores duplicados', () => {
    const autores = resenas.resenas.map((resena: { autor: string }) => resena.autor);
    expect(new Set(autores).size).toBe(autores.length);
  });
});
