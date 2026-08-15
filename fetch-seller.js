const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-GB',
  });
  const page = await context.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Fetching product page...');
  await page.goto('https://www.amazon.co.uk/dp/B002G0BULU', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Find seller links
  const sellerLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    return links
      .filter(a => a.href.includes('/sp?') || a.href.includes('me=') || a.href.includes('/stores/'))
      .map(a => ({ text: a.textContent.trim().slice(0, 80), href: a.href }));
  });
  console.log('Seller links:', JSON.stringify(sellerLinks.slice(0, 10), null, 2));

  // Sold by info
  const soldBy = await page.evaluate(() => {
    const el = document.querySelector('#merchant-info, #sellerProfileTriggerId, [data-feature-name="merchant-info"]');
    return el ? el.textContent.trim() : 'not found';
  });
  console.log('Sold by section:', soldBy.slice(0, 200));

  await browser.close();
})().catch(e => console.error('Error:', e.message));
