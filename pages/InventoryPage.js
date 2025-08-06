export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.firstAddToCart = page.locator('button.btn_primary').first();
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addFirstProductToCart() {
    await this.firstAddToCart.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}
