import { Page, Locator, expect } from '@playwright/test';

export class RoomsPage {
  readonly page: Page;
  readonly roomBookNowButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.roomBookNowButtons = page.getByRole('link', { name: /book now/i });
  }

  async selectFirstAvailableRoom(): Promise<void> {
    const firstRoomBookNow = this.roomBookNowButtons.nth(1);
    await expect(firstRoomBookNow).toBeVisible();
    await firstRoomBookNow.click();
  }
}
