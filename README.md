# 🎈 Always Kids

Sitio web de **[Always Kids](https://alwayskids.cl)** 🥳 — especialistas en animación de cumpleaños, celebraciones y eventos infantiles **a domicilio** en Santiago de Chile 🇨🇱

> Calidad, entretención y novedad, somos [@AlwaysKids.cl](https://www.instagram.com/alwayskids.cl/) 🎂

## ✨ Servicios

| Categoría | Temáticas |
|---|---|
| 🏆 **Animación deportiva** | 💦 AquaKids · 🏃‍♀️ DeporteKids · 🛞 EscuadrónKids · ⚽ FútbolKids · 💃 ZumbaKids |
| 🧪 **Animación científica** | ⚛️ ÁtomoKids · 🔬 Átomo + DeporteKids |
| 🧸 **Plazas blandas bby** | 🌈 Arcoíris · 🦕 Dino · 🚜 Terreneitor · ☀️ Sol |

## 🛠️ Stack

- 🚀 [Astro 7](https://astro.build) — sitio 100% estático
- ⚛️ React islands — solo donde hay interactividad (galería con lightbox)
- 🎨 Tailwind CSS 4 — estilos con tokens propios de la marca
- 🔍 SEO integrado — canónicas, Open Graph, JSON-LD (LocalBusiness, Service, FAQPage), sitemap, robots.txt y llms.txt
- ☁️ Cloudflare Pages — hosting y deploy

## 📂 Estructura

```text
AlwaysKids/
├── content/              📝 Fuente de contenido
│   ├── site.json         🏷️ Datos globales: marca, teléfono, WhatsApp, redes, categorías
│   ├── faqs.json         ❓ Preguntas frecuentes (globales y por categoría)
│   ├── paginas/          📄 Páginas en markdown (inicio, categorías, contacto, términos…)
│   ├── servicios/        🎉 Los 11 servicios con frontmatter estructurado
│   └── images/originals/ 📸 Fotos originales por página
└── web/                  🌐 Proyecto Astro
    ├── src/pages/        🧭 Rutas del sitio
    ├── src/components/   🧩 Componentes Astro + islands React
    ├── src/layouts/      🖼️ BaseLayout con todo el SEO
    ├── src/lib/          📚 site, seo (JSON-LD), faqs, images, redes
    ├── tests/unit/       ✅ Tests unitarios (Vitest)
    └── e2e/              🎭 Tests end-to-end (Playwright)
```

## 🚀 Desarrollo

Requiere Node `22.12.0` (hay `.nvmrc` en `web/`).

```bash
cd web
npm install        # 📦 instalar dependencias
npm run dev        # 🔥 servidor de desarrollo
npm run build      # 🏗️ build estático en dist/
npm run preview    # 👀 previsualizar el build
```

## ✅ Tests

```bash
npm run test:unit  # ⚡ unitarios con Vitest
npm run test:e2e   # 🎭 end-to-end con Playwright
npm test           # 🧪 todo junto
```

## 📬 Contacto

- 🌐 [alwayskids.cl](https://alwayskids.cl)
- 📱 [WhatsApp +56 9 9890 5022](https://wa.me/56998905022)
- 📸 [Instagram](https://www.instagram.com/alwayskids.cl/) · 👍 [Facebook](https://web.facebook.com/alwayskids.cl/) · 🎵 [TikTok](https://www.tiktok.com/@alwayskids.cl)

---

Hecho con 💛 para que cada celebración sea inolvidable 🎉
