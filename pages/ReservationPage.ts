import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { TestConfig, AppConstants } from '../config/TestConfig';
import { ElementActions, PageActions } from '../utils/PageUtils';
import { PageNotLoadedError } from '../utils/CustomErrors';

/**
 * ReservationPage - Handles room reservation interactions
 * Manages date selection, pricing verification, and checkout process
 */
export class ReservationPage extends BasePage {
  // Page elements
  private readonly pageHeader: Locator;
  private readonly calendar: Locator;
  private readonly priceSummary: Locator;
  private readonly reserveNowButton: Locator;
  private readonly dayButtons: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize page elements
    this.pageHeader = page.getByRole('heading', { level: 1 });
    this.calendar = page.getByRole('table', { name: /Month View/i });
    this.priceSummary = page.getByRole('heading', { name: /Price Summary/i }).locator('..');
    this.reserveNowButton = page.locator('#doReservation');
    this.dayButtons = page.getByRole('button');
  }

  /**
   * Verify that the reservation page has loaded correctly
   */
  async verifyPageLoad(): Promise<void> {
    // Verify URL pattern
    const isCorrectUrl = await PageActions.verifyUrlPattern(this.page, AppConstants.RESERVATION_URL_PATTERN);
    if (!isCorrectUrl) {
      throw new PageNotLoadedError('Reservation Page', AppConstants.RESERVATION_URL_PATTERN.toString());
    }

    // Verify page elements
    await this.verifyPageElements();
  }

  /**
   * Select check-in and check-out dates
   */
  async selectDates(checkInDay: string, checkOutDay: string): Promise<void> {
    await this.selectDate(checkInDay);
    await this.selectDate(checkOutDay);
    
    // Wait for price calculation to complete
    await this.wait(TestConfig.PRICE_UPDATE_TIMEOUT);
  }

  /**
   * Verify pricing calculations are correct
   */
  async verifyPricing(): Promise<void> {
    await this.verifyRoomRate();
    await this.verifyFees();
    await this.verifyTotalPrice();
  }

  /**
   * Proceed to checkout by clicking Reserve Now button
   */
  async proceedToCheckout(): Promise<void> {
    await ElementActions.waitForVisible(this.reserveNowButton);
    await ElementActions.clickWithRetry(this.reserveNowButton);
  }

  /**
   * Get the room type from page header
   */
  async getRoomType(): Promise<string> {
    return await ElementActions.getTextContent(this.pageHeader);
  }

  // Private helper methods

  /**
   * Select a specific date on the calendar
   */
  private async selectDate(day: string): Promise<void> {
    const dateButton = this.page.getByRole('button', { name: day }).first();
    await ElementActions.clickWithRetry(dateButton);
  }

  /**
   * Verify essential page elements are present
   */
  private async verifyPageElements(): Promise<void> {
    await expect(this.pageHeader).toHaveText(/(Single Room|Double Room|Suite)/i);
    await ElementActions.waitForVisible(this.calendar);
  }

  /**
   * Verify room rate pricing (Single £100 or Double £150)
   */
  private async verifyRoomRate(): Promise<void> {
    const expectedPattern = new RegExp(`£(${AppConstants.SINGLE_ROOM_PRICE}|${AppConstants.DOUBLE_ROOM_PRICE}) x 1 nights`);
    await expect(this.priceSummary).toContainText(expectedPattern);
  }

  /**
   * Verify additional fees
   */
  private async verifyFees(): Promise<void> {
    await expect(this.priceSummary).toContainText(`£${AppConstants.CLEANING_FEE}`);
    await expect(this.priceSummary).toContainText(`£${AppConstants.SERVICE_FEE}`);
  }

  /**
   * Verify total price calculation
   */
  private async verifyTotalPrice(): Promise<void> {
    const singleTotal = AppConstants.SINGLE_ROOM_PRICE + AppConstants.CLEANING_FEE + AppConstants.SERVICE_FEE;
    const doubleTotal = AppConstants.DOUBLE_ROOM_PRICE + AppConstants.CLEANING_FEE + AppConstants.SERVICE_FEE;
    const expectedPattern = new RegExp(`£(${singleTotal}|${doubleTotal})`);
    
    await expect(this.priceSummary).toContainText(expectedPattern);
  }
}
