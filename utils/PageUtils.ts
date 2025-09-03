import { Page, Locator } from '@playwright/test';

/**
 * Utility class for common UI interactions and waits
 * Provides reusable methods for element interactions
 */
export class ElementActions {
  
  /**
   * Click an element with retry logic
   */
  static async clickWithRetry(element: Locator, maxRetries: number = 3): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await element.click();
        return;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await element.page().waitForTimeout(1000);
      }
    }
  }

  /**
   * Fill input field with validation
   */
  static async fillInput(element: Locator, value: string, shouldClear: boolean = true): Promise<void> {
    if (shouldClear) {
      await element.clear();
    }
    await element.fill(value);
  }

  /**
   * Wait for element to be visible with custom timeout
   */
  static async waitForVisible(element: Locator, timeout: number = 5000): Promise<void> {
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Get element text with null check
   */
  static async getTextContent(element: Locator): Promise<string> {
    const text = await element.textContent();
    return text || '';
  }

  /**
   * Check if element exists without throwing error
   */
  static async isElementVisible(element: Locator, timeout: number = 1000): Promise<boolean> {
    try {
      await element.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Utility class for page-level operations
 */
export class PageActions {
  
  /**
   * Navigate to URL with loading validation
   */
  static async navigateToPage(page: Page, url: string): Promise<void> {
    await page.goto(url);
    await page.waitForLoadState('networkidle');
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeTimestampedScreenshot(page: Page, baseName: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${baseName}-${timestamp}.png`;
    await page.screenshot({ path: `test-results/${filename}`, fullPage: true });
    return filename;
  }

  /**
   * Verify page URL matches pattern
   */
  static async verifyUrlPattern(page: Page, pattern: RegExp): Promise<boolean> {
    const currentUrl = page.url();
    return pattern.test(currentUrl);
  }
}
