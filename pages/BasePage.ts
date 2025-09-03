import { Page } from '@playwright/test';

/**
 * Base class for all page objects
 * Provides common functionality and establishes consistent patterns
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly pageUrl?: string;

  constructor(page: Page, pageUrl?: string) {
    this.page = page;
    this.pageUrl = pageUrl;
  }

  /**
   * Navigate to the page if URL is defined
   */
  async navigate(): Promise<void> {
    if (this.pageUrl) {
      await this.page.goto(this.pageUrl);
    }
  }

  /**
   * Wait for page to be ready
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot of the current page
   */
  async takeScreenshot(filename: string, fullPage: boolean = true): Promise<void> {
    await this.page.screenshot({ 
      path: `test-results/${filename}`, 
      fullPage 
    });
  }

  /**
   * Wait for a specific timeout
   */
  protected async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }
}
