# Always Kids — Sitio web

Sitio estático de [Always Kids](https://alwayskids.cl) (animación de fiestas infantiles a domicilio en Santiago de Chile), construido con Astro + React islands + Tailwind CSS 4.

## Estructura

```text
AlwaysKids/
├── content/              Fuente de contenido (markdown + site.json + imágenes originales)
│   ├── site.json         Datos globales: marca, teléfono, WhatsApp, redes, categorías
│   ├── paginas/          Páginas (inicio, servicios, categorías, contacto, términos…)
│   ├── servicios/        Los 11 servicios con frontmatter estructurado
│   └── images/originals/ Fotos originales por página
└── web/                  Este proyecto Astro
    ├── src/
    │   ├── pages/        Rutas (índices, /servicios/[slug]/, galería, contacto…)
    │   ├── components/   Componentes Astro + islands React (lightbox, etc.)
    │   ├── layouts/      BaseLayout con SEO (meta, OG, JSON-LD)
    │   ├── lib/          site, seo (JSON-LD), images, redes
    │   ├── data/         Copia de site.json (test de sincronía en tests/unit)
    │   └── assets/       Imágenes curadas servidas vía astro:assets
    ├── e2e/              Pruebas Playwright (desktop + mobile)
    └── tests/unit/       Pruebas Vitest
```

Las colecciones de contenido cargan directamente desde `../content/`; para editar textos del sitio se editan esos markdown, no los componentes.

## Comandos

Todos se ejecutan desde `web/`:

| Comando            | Acción                                                |
| :----------------- | :---------------------------------------------------- |
| `npm install`      | Instala dependencias                                  |
| `npm run dev`      | Servidor de desarrollo en `localhost:4321`            |
| `npm run build`    | Genera el sitio estático en `./dist/`                 |
| `npm run preview`  | Sirve `dist/` tal como quedaría publicado             |
| `npm run test:unit`| Pruebas unitarias (Vitest)                            |
| `npm run test:e2e` | Pruebas end-to-end (Playwright, projects desktop/mobile) |
| `npm test`         | Ambas suites                                          |

## Despliegue (Cloudflare Pages)

El sitio es 100% estático (Astro sin adapter): `npm run build` genera `dist/`
y Cloudflare Pages lo sirve desde su CDN. No hay SSR ni funciones.

El despliegue se configura por integración Git en el dashboard de Cloudflare
(no hay archivos de config de Cloudflare en el repo).

Dónde está en el panel: `dash.cloudflare.com` → sección **Compute & AI**
(antes "Workers & Pages"). Cloudflare está migrando Pages hacia Workers y la
creación de proyectos Pages ya no aparece a simple vista; el flujo clásico
sigue disponible en el enlace directo:
`https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/pages`.
Alternativa equivalente y recomendada por Cloudflare para sitios estáticos
nuevos: crear un **Worker con static assets** importando el repo Git (mismos
ajustes: root `web`, build `npm run build`, assets `dist`).

Ajustes del proyecto:

| Ajuste                  | Valor           |
| :---------------------- | :-------------- |
| Root directory          | `web`           |
| Build command           | `npm run build` |
| Build output directory  | `dist`          |
| Framework preset        | Astro           |
| Variable `NODE_VERSION` | `22.12.0`       |

Cada push a la rama de producción dispara un build y publicación automáticos;
las Pull Requests generan *preview deployments*.

### Alternativa sin repositorio Git (subida directa)

Mientras el proyecto no esté en un repo remoto, se puede publicar el build
local directamente:

```sh
npm run build
npx wrangler pages deploy dist --project-name alwayskids
```

(También se puede arrastrar la carpeta `dist/` en el dashboard de Pages.)
Sin integración Git no hay builds automáticos: cada cambio requiere repetir
build y subida.

Notas:

- `site: 'https://alwayskids.cl'` en `astro.config.mjs` fija las URLs canónicas
  y el sitemap; actualízalo si cambia el dominio.
- `trailingSlash: 'always'` es coherente con el servido de Pages
  (`/servicios/` → `/servicios/index.html`).
- Cloudflare Pages no lee `engines` de `package.json`: fija `NODE_VERSION`
  (o usa el `.nvmrc` del proyecto) para garantizar Node >= 22.12.0.
- El redirect `/inicio` → `/` se materializa como página estática con
  meta-refresh (`dist/inicio/index.html`), sin necesidad de reglas en Pages.
- Dominio: `alwayskids.cl` registrado en NIC Chile con nameservers de
  Cloudflare (zona en la misma cuenta). Conectarlo en el proyecto de Pages →
  Custom domains (`alwayskids.cl` y `www.alwayskids.cl`), y mantener la regla
  de redirección 301 www → raíz para que la única versión canónica sea
  `https://alwayskids.cl`, igual que en canonicals y sitemap.
