import { site } from './site';
import type { FaqItem } from './faqs';

export interface LocalBusinessJsonLd {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  name: string;
  url: string;
  telephone: string;
  areaServed: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  sameAs: string[];
  logo: string;
  image: string;
}

export interface ServiceJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  provider: LocalBusinessJsonLd;
  areaServed: string;
  serviceType: string;
}

export interface FaqPageJsonLd {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
}

export interface WebSiteJsonLd {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
}

const SITE_URL = `https://${site.dominio}`;

export function buildLocalBusiness(logoAbsoluteUrl: string): LocalBusinessJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.nombre,
    url: SITE_URL,
    telephone: site.telefonoE164,
    areaServed: 'Región Metropolitana de Santiago',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    sameAs: [site.redes.instagram, site.redes.facebook, site.redes.tiktok],
    logo: logoAbsoluteUrl,
    image: logoAbsoluteUrl,
  };
}

export function buildService(
  name: string,
  description: string,
  logoAbsoluteUrl: string,
): ServiceJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: buildLocalBusiness(logoAbsoluteUrl),
    areaServed: 'Región Metropolitana de Santiago',
    serviceType: name,
  };
}

export function buildFaqPage(faqs: FaqItem[]): FaqPageJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.respuesta,
      },
    })),
  };
}

export function buildWebSite(): WebSiteJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.nombre,
    url: SITE_URL,
    description: site.descripcion,
  };
}
