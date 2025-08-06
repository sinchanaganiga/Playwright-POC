export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.zip = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
  }

  async fillDetails(fname, lname, zip) {
    await this.firstName.fill(fname);
    await this.lastName.fill(lname);
    await this.zip.fill(zip);
    await this.continueBtn.click();
  }
}
