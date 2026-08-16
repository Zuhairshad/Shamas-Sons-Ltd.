const fs = require('fs');
const path = require('path');

const artifactDir = 'C:/Users/user/.gemini/antigravity-ide/brain/f6365740-36c8-4d61-9a15-0320d6cfd3bc';
const targetDir = path.join(__dirname, 'public/images');

const mappings = {
  'media__1786904879326.png': 'brasso-175ml.png',
  'media__1786904882742.png': 'brasso-175ml-2pack.png',
  'media__1786904887042.png': 'brasso-wadding-75g.png',
  'media__1786904890382.png': 'brasso-1l-2pack.png',
  'media__1786904972130.png': 'brasso-wadding-6pack.png',
  'media__1786905117784.png': 'brasso-wadding-single.png',
  'media__1786905121094.png': 'brasso-liquid-yellow-235ml.png',
  'media__1786905126992.png': 'brasso-175ml-3pack.png',
  'media__1786905130354.png': 'brasso-7metal-yellow-235ml.png'
};

try {
  for (const [srcName, destName] of Object.entries(mappings)) {
    const srcPath = path.join(artifactDir, srcName);
    const destPath = path.join(targetDir, destName);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcName} -> public/images/${destName}`);
    } else {
      console.error(`Source not found: ${srcPath}`);
    }
  }
} catch (err) {
  console.error('Copy failed:', err);
}
