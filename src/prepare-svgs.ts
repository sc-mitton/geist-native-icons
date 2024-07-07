import { JSDOM } from 'jsdom'
import fs from 'fs-extra'
import path from 'path'
import { toHumpName, replaceAll } from './utils'

const outputDir = path.join(import.meta.dirname, './', 'out')
const sourceFile = path.join(import.meta.dirname, '../', '.source')

const format = (icon: Element, serializer: XMLSerializer) => {

  const fill = icon.querySelector('svg')?.getAttribute('style')?.match(/--geist-fill:(.*);/)?.[1];
  const stroke = icon.querySelector('svg')?.getAttribute('style')?.match(/--geist-stroke:(.*);/)?.[1];
  const background = icon.querySelector('svg')?.getAttribute('style')?.match(/--geist-background/);
  let svg = serializer.serializeToString(icon.querySelector('svg')!);

  svg = replaceAll(svg, 'var(--geist-foreground)', 'currentColor');

  if (background) {
    svg = svg.replace(/ {2,}/g, '');
    svg = svg.replace(/style="[^"]*"/g, '');
    svg = replaceAll(svg, 'var(--geist-fill)', fill || '');
    svg = replaceAll(svg, 'var(--geist-stroke)', '#FFF' || '');
  } else {
    svg = svg.replace(/ {2,}/g, '');
    svg = svg.replace(/style="[^"]*"/g, '');
    svg = replaceAll(svg, 'var(--geist-fill)', fill || '');
    svg = replaceAll(svg, 'var(--geist-stroke)', stroke || '');
  }

  return svg;
}

export default (async () => {
  if (!fs.existsSync(outputDir)) {
    await fs.mkdir(outputDir);
  } else {
    await fs.emptyDir(outputDir);
  }

  const html = await fs.readFile(sourceFile, 'utf8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const icons = document.querySelectorAll('.geist-list .icon');

  for (const icon of icons) {
    const serializer = new dom.window.XMLSerializer();

    const svgString = format(icon, serializer);

    const name: string = icon.querySelector('.geist-text')?.textContent ?? 'defaultName';
    const fileName = toHumpName(name);

    const outputFilePath = path.join(outputDir, `${fileName}.svg`);

    await fs.writeFile(outputFilePath, svgString, 'utf8');
  }
})()
