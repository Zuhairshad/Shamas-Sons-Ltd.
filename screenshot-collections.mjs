import { chromium } from 'playwright';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// 1. Homepage — click Collections to open dropdown
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
await page.getByRole('button', { name: 'Collections' }).click();
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/nav-dropdown.png' });

// 2. Click "Dark" in dropdown -> /collections/dark
await page.getByRole('link', { name: 'Dark' }).first().click();
await page.waitForURL('**/collections/dark');
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/collection-dark.png' });

// 3. Hover a product card
const cards = page.locator('.group.block');
await cards.nth(1).hover();
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/collection-dark-hover.png' });

// 4. /collections/wood
await page.goto('http://localhost:3000/collections/wood', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/collection-wood.png' });

await browser.close();
console.log('Done');
