import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const paginas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/paginas' }),
  schema: z.object({
    titulo: z.string(),
    slug: z.string(),
    tipo: z.enum(['categoria']).optional(),
    emoji: z.string().optional(),
  }),
});

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/servicios' }),
  schema: z.object({
    titulo: z.string(),
    slug: z.string(),
    emoji: z.string(),
    categoria: z.enum(['animacion-deportiva', 'animacion-cientifica', 'plazas-blandas-bby']),
    edad: z.string(),
    gancho: z.string(),
    materiales: z.array(z.string()).optional(),
    incluye: z.array(z.string()).optional(),
    combinable: z.boolean(),
    cierre: z.string(),
  }),
});

export const collections = { paginas, servicios };
