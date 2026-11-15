import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartLink = page.getByRole('link', { name: /cart/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  async addProduct(productName: string) {
    await this.page.locator(`[data-test="${productName}"]`).click();
  }

  async doubleClickProductTitle(productName: string) {
    const product = this.page
      .locator('li')
      .filter({
        has: this.page.locator(`[data-test="${productName}"]`),
      });

    await product.locator('h4').dblclick();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}