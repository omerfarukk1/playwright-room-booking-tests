import { Page, Locator, expect } from '@playwright/test';

export class ReservationPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly calendar: Locator;
  readonly priceSummary: Locator;
  readonly reserveNowButton: Locator;
  readonly dayButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.getByRole('heading', { level: 1 });
    this.calendar = page.getByRole('table', { name: /Month View/i });
    this.priceSummary = page.getByRole('heading', { name: /Price Summary/i }).locator('..');
    this.reserveNowButton = page.locator('#doReservation');
    this.dayButtons = page.getByRole('button');
  }

  async verifyPageLoad(): Promise<void> {
    await expect(this.page).toHaveURL(/\/reservation/);
    await expect(this.pageHeader).toHaveText(/(Single Room|Double Room|Suite)/i);
    await expect(this.calendar).toBeVisible();
  }

  async selectDates(checkInDay: string, checkOutDay: string): Promise<void> {
    await this.page.getByRole('button', { name: checkInDay }).first().click();
    await this.page.getByRole('button', { name: checkOutDay }).first().click();
    await this.page.waitForTimeout(1000); // Wait for price calculation
  }

  async verifyPricing(): Promise<void> {
    // Verify room rate (Single £100 or Double £150)
    await expect(this.priceSummary).toContainText(/£(100|150) x 1 nights/);
    // Verify fees
    await expect(this.priceSummary).toContainText('£25'); // Cleaning fee
    await expect(this.priceSummary).toContainText('£15'); // Service fee
    // Verify total (Single £140 or Double £190)
    await expect(this.priceSummary).toContainText(/£(140|190)/);
  }

  async proceedToCheckout(): Promise<void> {
    await expect(this.reserveNowButton).toBeVisible();
    await this.reserveNowButton.click();
  }
}
