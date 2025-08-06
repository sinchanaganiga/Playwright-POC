export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}
