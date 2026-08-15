import { chromium } from 'playwright';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const browser = await chromium.launch({
  executablePath: CHROME,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto('http://localhost:3000/shop', { waitUntil: 'networkidle', timeout: 30000 });

// 1. Top of shop page (header + filter tabs + top row products)
await page.screenshot({ path: '/tmp/shop-top.png' });

// 2. Hover on the 3rd product card (Holt) to show price/blur effect
const cards = page.locator('.group.block');
await cards.nth(2).hover();
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/shop-hover.png' });

// 3. Click "Dark" filter tab
await page.getByRole('button', { name: 'Dark' }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/shop-dark-filter.png' });

// 4. Scroll to bottom to show social + footer
await page.getByRole('button', { name: 'All collections' }).click();
await page.waitForTimeout(300);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/shop-footer.png' });

await browser.close();
console.log('Done');
