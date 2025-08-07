import { test } from '@playwright/test';
import { readCSV } from '../utils/readCSV.js';
import { getPassword } from '../utils/envReader.js';
import { LoginPage } from '../pages/LoginPage.js';

const users = readCSV('../utils/users.csv');

test('Login behavior detection for all users', async ({ page }, testInfo) => {
  const loginPage = new LoginPage(page);

  for (const user of users) {
    const username = user.username;
    const password = getPassword();
    const logs = [];

    try {
      await loginPage.goto();
      await loginPage.login(username, password);

      const url = page.url();

      if (url.includes('inventory.html')) {
        logs.push(`${username} logged in successfully.`);

        // Check for broken images
        const brokenImgs = await page.locator('img[src*="sl-404"]');
        if (await brokenImgs.count() > 0) {
          logs.push(`${username} has broken images on the page.`);
        }

        // Detect slow page load 
          const start = Date.now();
          await page.locator('.inventory_list').waitFor({ timeout: 5000 });
          const duration = Date.now() - start;

          if (duration > 1000) {
            logs.push(`${username} had a slow inventory load: ${duration}ms`);
          }

      } 
      
      //check for failed login
      else {
        const errorText = await page.locator('[data-test="error"]').innerText();
        logs.push(`${username} login failed: "${errorText}"`);
      }

    } catch (err) {
      logs.push(`${username} test failed due to error: ${err.message}`);
    }

    // Attach individual user logs to Allure report
    await testInfo.attach(`log-${username}.txt`, {
      body: logs.join('\n'),
      contentType: 'text/plain',
    });
  }
});
