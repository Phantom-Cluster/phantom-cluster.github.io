import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5177/');
  await page.waitForTimeout(2000);
  
  const result = await page.evaluate(() => {
    // Assuming tubesApp might be accessible if we expose it, but let's just log what we can find.
    // Or we can just evaluate the module directly in the browser context.
    return new Promise(async (resolve) => {
        try {
            const mod = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
            const canvas = document.createElement('canvas');
            const app = mod.default(canvas, {
                tubes: { colors: ['#ff0000'], lights: { intensity: 1, colors: ['#ff0000'] } }
            });
            resolve(Object.keys(app));
        } catch(e) {
            resolve(e.message);
        }
    });
  });
  console.log('Tubes API:', result);
  await browser.close();
})();
