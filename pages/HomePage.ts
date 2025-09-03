import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { TestConfig } from '../config/TestConfig';
import { ElementActions } from '../utils/PageUtils';
import { ElementNotFoundError } from '../utils/CustomErrors';

/**
 * HomePage - Handles homepage interactions
 * Represents the main landing page of the application
 */
export class HomePage extends BasePage {
  // Page elements
  private readonly heroBookNowButton: Locator;
  private readonly pageTitle: Locator;
  private readonly navigationMenu: Locator;

  constructor(page: Page) {
    super(page, TestConfig.BASE_URL);
    
    // Initialize page elements
    this.heroBookNowButton = page.getByRole('link', { name: /book now/i }).first();
    this.pageTitle = page.getByRole('heading', { level: 1 });
    this.navigationMenu = page.locator('[role="navigation"]');
  }

  /**
   * Navigate to homepage and verify it loads correctly
   */
  async navigateAndVerify(): Promise<void> {
    await this.navigate();
    await this.waitForPageLoad();
    await this.verifyPageElements();
  }

  /**
   * Click the main "Book Now" button in hero section
   */
  async clickHeroBookNow(): Promise<void> {
    await this.verifyHeroBookNowVisible();
    await ElementActions.clickWithRetry(this.heroBookNowButton);
  }

  /**
   * Verify hero "Book Now" button is visible
   */
  private async verifyHeroBookNowVisible(): Promise<void> {
    const isVisible = await ElementActions.isElementVisible(this.heroBookNowButton);
    if (!isVisible) {
      throw new ElementNotFoundError('Hero Book Now button', 'link[name*="book now"]');
    }
  }

  /**
   * Verify essential page elements are present
   */
  private async verifyPageElements(): Promise<void> {
    await ElementActions.waitForVisible(this.heroBookNowButton);
    // Additional element verifications can be added here
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await ElementActions.getTextContent(this.pageTitle);
  }
}
