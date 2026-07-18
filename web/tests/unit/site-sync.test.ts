import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const webSiteJsonPath = path.resolve(dirname, '../../src/data/site.json');
const sourceSiteJsonPath = path.resolve(dirname, '../../../content/site.json');

describe('site.json sync', () => {
  it('src/data/site.json es idéntico a content/site.json', () => {
    const webSiteJson = JSON.parse(readFileSync(webSiteJsonPath, 'utf-8'));
    const sourceSiteJson = JSON.parse(readFileSync(sourceSiteJsonPath, 'utf-8'));
    expect(webSiteJson).toStrictEqual(sourceSiteJson);
  });
});
