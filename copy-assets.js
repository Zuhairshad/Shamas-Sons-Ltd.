const fs = require('fs');
const path = require('path');

const src = 'c:/Users/user/Documents/Personal Documents/Code Projects/Projects/Landing Pages/landing-page-tester/prompt_assets/2.png';
const dest = path.join(__dirname, 'public/logo.png');

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied logo to public/logo.png');
  } else {
    console.error('Source logo file not found at: ' + src);
  }
} catch (err) {
  console.error('Failed to copy logo:', err);
}
