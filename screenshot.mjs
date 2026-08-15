import { chromium } from 'playwright';

const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const browser = await chromium.launch({
  executablePath: CHROMIUM,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

// Hero / top of page
await page.screenshot({ path: '/tmp/shot-hero.png', fullPage: false });

// Scroll to Benefits + Favorites
await page.evaluate(() => window.scrollTo(0, window.innerHeight));
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/shot-favorites.png', fullPage: false });

// Collections
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/shot-collections.png', fullPage: false });

// About + Social + Footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/shot-footer.png', fullPage: false });

await browser.close();
console.log('Done');
