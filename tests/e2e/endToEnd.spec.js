import { test, expect } from '@playwright/test';
import { readCSV } from '../utils/readCSV.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { OverviewPage } from '../pages/OverviewPage.js';
import { Header } from '../pages/Header.js';

const users = readCSV('utils/checkoutData.csv');

for (const user of users) {
  test(`Complete order flow for ${user.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const overviewPage = new OverviewPage(page);
    const header = new Header(page);

    await loginPage.goto();
    await loginPage.login(user.username, process.env.PASSWORD);
    await expect(page).toHaveURL(/inventory.html/);

    await inventoryPage.addFirstProductToCart();
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);

    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await checkoutPage.fillDetails(user.firstName, user.lastName, user.zip);
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await overviewPage.finishOrder();
    const confirmation = await overviewPage.getConfirmation();
    expect(confirmation).toContain('Thank you for your order!');

    await header.logout();
    await expect(page.locator('#user-name')).toBeVisible();
  });
}
