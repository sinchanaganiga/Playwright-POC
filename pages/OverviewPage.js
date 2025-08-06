export class OverviewPage {
  constructor(page) {
    this.page = page;
    this.finishBtn = page.locator('[data-test="finish"]');
    this.confirmationText = page.locator('.complete-header');
  }

  async finishOrder() {
    await this.finishBtn.click();
  }

  async getConfirmation() {
    return await this.confirmationText.textContent();
  }
}
