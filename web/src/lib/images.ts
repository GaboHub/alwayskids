import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { siteUrl } from './site';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{jpg,jpeg,png}',
  { eager: true },
);

export const imageByName: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => {
    const name = path.split('/').pop()!.replace(/\.(jpe?g|png)$/i, '');
    return [name, mod.default];
  }),
);

export function resolveImage(name: string): ImageMetadata {
  const image = imageByName[name];
  if (!image) {
    throw new Error(`Imagen no encontrada: ${name}`);
  }
  return image;
}

export function ogFormat(image: ImageMetadata): 'png' | 'jpg' {
  return image.format === 'png' ? 'png' : 'jpg';
}

export async function optimizedAbsoluteUrl(image: ImageMetadata, width = 630): Promise<string> {
  const optimizada = await getImage({ src: image, width, format: ogFormat(image), quality: 65 });
  return new URL(optimizada.src, siteUrl).toString();
}
