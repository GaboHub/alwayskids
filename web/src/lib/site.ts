import raw from '../data/site.json';

export interface Categoria {
  slug: string;
  nombre: string;
  emoji: string;
  resumen: string;
  servicios: string[];
}

export interface SiteData {
  nombre: string;
  dominio: string;
  tagline: string;
  claim: string;
  descripcion: string;
  telefono: string;
  telefonoE164: string;
  whatsapp: string;
  ubicacion: string;
  cobertura: string;
  redes: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  ctaHeader: string;
  footer: string;
  categorias: Categoria[];
  tematicasCombinables: {
    texto: string;
    ejemplos: string[];
    cierre: string;
  };
  cotizacion: {
    titulo: string;
    intro: string;
    criterios: string[];
  };
}

export const site: SiteData = raw as SiteData;

export const siteUrl = new URL(`https://${site.dominio}`);

export function getCategoria(slug: string): Categoria | undefined {
  return site.categorias.find((categoria) => categoria.slug === slug);
}

export function getOtrasCategorias(slug: string): Categoria[] {
  return site.categorias.filter((categoria) => categoria.slug !== slug);
}
