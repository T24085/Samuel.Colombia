import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const sourceDir = path.join(repoRoot, 'Samuel.Studio, Columbia', 'samuel-studio-maximalist');
const stagingDir = path.join(repoRoot, '.pages-build');

const assetExtensions = new Set(['.mp4', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif']);

function collectReferences(text, refs) {
  const patterns = [
    /(?:src|href|poster|data-lightbox-src|data-src)=["']([^"']+)["']/g,
    /url\(\s*["']?(assets\/[^"')]+)["']?\s*\)/g,
    /(?:src|poster):\s*["'](assets\/[^"']+)["']/g,
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      refs.add(match[1]);
    }
  }
}

async function copyFile(relativePath) {
  const sourcePath = path.join(sourceDir, relativePath);
  const targetPath = path.join(stagingDir, relativePath);

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.copyFile(sourcePath, targetPath);
}

async function main() {
  await fs.rm(stagingDir, { recursive: true, force: true });
  await fs.mkdir(stagingDir, { recursive: true });

  const refs = new Set();
  const entryFiles = ['index.html', '404.html', 'styles.css', 'script.js'];

  for (const fileName of entryFiles) {
    const fullPath = path.join(sourceDir, fileName);
    const text = await fs.readFile(fullPath, 'utf8');
    collectReferences(text, refs);
    await copyFile(fileName);
  }

  for (const ref of refs) {
    const normalized = ref.replace(/^\.\//, '');
    if (!normalized.startsWith('assets/')) {
      continue;
    }

    const ext = path.extname(normalized).toLowerCase();
    if (!assetExtensions.has(ext)) {
      continue;
    }

    await copyFile(normalized);
  }

  await fs.writeFile(path.join(stagingDir, '.nojekyll'), '');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
