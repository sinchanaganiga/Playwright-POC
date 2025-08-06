export class Header {
  constructor(page) {
    this.page = page;
    this.burgerBtn = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async logout() {
    await this.burgerBtn.click();
    await this.page.waitForTimeout(500);
    await this.logoutLink.click();
  }
}
