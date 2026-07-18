import { copyFileSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const ORIGINALS = '/home/gabs/workspace/AlwaysKids/content/images/originals';
const DEST = '/home/gabs/workspace/AlwaysKids/web/src/assets/images';

const servicios = {
  aquakids: { hero: 'img_1.jpg', galeria: ['img_10.jpg', 'img_11.jpg', 'img_17.jpg', 'img_21.jpg'] },
  deportekids: { hero: 'img_2.jpg', galeria: ['img_8.jpg', 'img_9.jpg', 'img_15.jpg', 'img_18.jpg'] },
  escuadronkids: { hero: 'img_15.jpg', galeria: ['img_9.jpg', 'img_10.jpg', 'img_16.jpg', 'img_20.jpg'] },
  futbolkids: { hero: 'img_7.jpg', galeria: ['img_10.jpg', 'img_15.jpg', 'img_18.jpg', 'img_19.jpg'] },
  zumbakids: { hero: 'img_11.jpg', galeria: ['img_3.jpg', 'img_8.jpg', 'img_17.jpg', 'img_20.jpg'] },
  atomokids: { hero: 'img_2.jpg', galeria: ['img_5.jpg', 'img_9.jpg', 'img_13.jpg', 'img_16.jpg'] },
  'atomo-deportekids': { hero: 'img_2.jpg', galeria: ['img_7.jpg', 'img_11.jpg', 'img_13.jpg', 'img_16.jpg'] },
  arcoiris: { hero: 'img_8.jpg', galeria: ['img_1.jpg', 'img_6.jpg', 'img_10.jpg', 'img_15.jpg'] },
  dino: { hero: 'img_2.jpg', galeria: ['img_3.jpg', 'img_5.jpg', 'img_11.jpg', 'img_12.jpg'] },
  terreneitor: { hero: 'img_10.jpg', galeria: ['img_2.jpg', 'img_5.jpg', 'img_7.jpg', 'img_12.jpg'] },
  sol: { hero: 'img_1.jpg', galeria: ['img_2.jpg', 'img_5.jpg', 'img_14.jpg', 'img_18.jpg'] },
};

const galeriaGeneral = [
  'img_1.jpg', 'img_2.jpg', 'img_4.jpg', 'img_5.jpg', 'img_6.jpg', 'img_7.jpg',
  'img_9.jpg', 'img_10.jpg', 'img_11.jpg', 'img_13.jpg', 'img_15.jpg', 'img_16.jpg',
  'img_17.jpg', 'img_18.jpg', 'img_20.jpg', 'img_21.jpg', 'img_22.jpg',
];

mkdirSync(DEST, { recursive: true });

function copy(sourceRelative, destName) {
  const source = join(ORIGINALS, sourceRelative);
  const dest = join(DEST, destName + extname(sourceRelative).toLowerCase());
  copyFileSync(source, dest);
  console.log(`${sourceRelative} -> ${destName}${extname(sourceRelative).toLowerCase()}`);
}

copy('animacion-cientifica/img_1.png', 'logo');

for (const [slug, { hero, galeria }] of Object.entries(servicios)) {
  copy(`${slug}/${hero}`, `${slug}-hero`);
  galeria.forEach((file, index) => copy(`${slug}/${file}`, `${slug}-${index + 1}`));
}

galeriaGeneral.forEach((file, index) => copy(`resenas-y-galeria/${file}`, `galeria-${index + 1}`));

console.log('Listo.');
