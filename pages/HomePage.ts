import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heroBookNowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroBookNowButton = page.getByRole('link', { name: /book now/i }).first();
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://automationintesting.online/');
  }

  async clickHeroBookNow(): Promise<void> {
    await expect(this.heroBookNowButton).toBeVisible();
    await this.heroBookNowButton.click();
  }
}
