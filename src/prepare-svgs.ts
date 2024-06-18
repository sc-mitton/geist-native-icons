import { JSDOM } from 'jsdom'
import fs from 'fs-extra'
import path from 'path'
import { toHumpName, replaceAll } from './utils'

const outputDir = path.join(import.meta.dirname, './', 'out')
const sourceFile = path.join(import.meta.dirname, '../', '.source')

const format = (svg: string) => {

  svg = svg.replace(/ {2,}/g, '');
  svg = svg.replace(/style="[^"]*"/g, '');
  svg = replaceAll(svg, 'var(--geist-stroke)', 'currentColor');
  svg = replaceAll(svg, 'var(--geist-fill)', 'currentColor');
  return svg
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
    let svgString = serializer.serializeToString(icon.querySelector('svg')!);

    svgString = format(svgString);

    const name: string = icon.querySelector('.geist-text')?.textContent ?? 'defaultName';
    const fileName = toHumpName(name);

    const outputFilePath = path.join(outputDir, `${fileName}.svg`);

    await fs.writeFile(outputFilePath, svgString, 'utf8');
  }
})()
