/**
 * Custom error classes for better error handling and debugging
 */
export class TestError extends Error {
  constructor(message: string, public readonly context?: any) {
    super(message);
    this.name = 'TestError';
  }
}

export class PageNotLoadedError extends TestError {
  constructor(pageName: string, expectedUrl?: string) {
    super(`${pageName} did not load correctly${expectedUrl ? `. Expected URL pattern: ${expectedUrl}` : ''}`);
    this.name = 'PageNotLoadedError';
  }
}

export class ElementNotFoundError extends TestError {
  constructor(elementDescription: string, selector?: string) {
    super(`Element not found: ${elementDescription}${selector ? ` (selector: ${selector})` : ''}`);
    this.name = 'ElementNotFoundError';
  }
}

export class ValidationError extends TestError {
  constructor(fieldName: string, expectedMessage: string, actualMessage?: string) {
    super(`Validation failed for ${fieldName}. Expected: "${expectedMessage}"${actualMessage ? `, Got: "${actualMessage}"` : ''}`);
    this.name = 'ValidationError';
  }
}

export class BookingFlowError extends TestError {
  constructor(step: string, details?: string) {
    super(`Booking flow failed at step: ${step}${details ? `. Details: ${details}` : ''}`);
    this.name = 'BookingFlowError';
  }
}
