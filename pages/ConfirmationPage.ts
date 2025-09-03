import { Page, Locator, expect } from '@playwright/test';

export class ConfirmationPage {
  readonly page: Page;
  readonly confirmationHeading: Locator;
  readonly confirmationText: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationHeading = page.getByRole('heading', { name: /Booking Confirmed/i });
    this.confirmationText = page.locator('text=Your booking has been confirmed for the following dates:');
    this.errorMessage = page.locator('//h2');
  }

  async verifyBookingConfirmation(dateRange: string): Promise<void> {
    await expect(this.confirmationHeading).toBeVisible({ timeout: 10000 });
    await expect(this.confirmationText).toBeVisible();
    
    const dateRangeLocator = this.page.locator(`text=${dateRange}`);
    await expect(dateRangeLocator).toBeVisible();
  }

  async verifyApplicationError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
    await expect(this.errorMessage).toContainText('Application error: a client-side exception has occurred while loading automationintesting.online');
  }
}
