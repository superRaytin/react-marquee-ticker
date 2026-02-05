import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function genLegacyEntry() {
  const legacyDir = path.resolve(__dirname, '../legacy');
  const legacyIndex = path.join(legacyDir, 'index.js');
  const legacyTypes = path.join(legacyDir, 'index.d.ts');

  if (!fs.existsSync(legacyDir)) {
    fs.mkdirSync(legacyDir, { recursive: true });
  }

  const content = `module.exports = require('../dist/legacy/index.js');`;
  fs.writeFileSync(legacyIndex, content, 'utf8');

  const typesContent = `export * from '../dist/legacy';
export { default } from '../dist/legacy';`
  fs.writeFileSync(legacyTypes, typesContent, 'utf8');

  console.log('✅ legacy/index.js generated');
}

function writeCss() {
  const distDir = path.resolve(__dirname, '../dist');
  const cssFilePath = path.join(distDir, 'index.css');
  const cssContent = fs.readFileSync(cssFilePath, 'utf8').replace(/\r?\n/g, '\\n')

  const files = [
    path.join(distDir, 'index.mjs'),
    path.join(distDir, 'index.cjs'),
    path.join(distDir, 'MarqueeTicker.style.d.ts'),
    path.join(distDir, 'legacy/index.js'),
  ]

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8').replace('{{MARQUEE_TICKER_CSS_TEXT}}', cssContent)
    fs.writeFileSync(filePath, content, 'utf8');
  })

  console.log('✅ css rewrited!');
}

function postBuild() {
  genLegacyEntry()
  writeCss()
}

postBuild()