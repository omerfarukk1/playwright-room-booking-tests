/**
 * Test configuration and constants
 * Centralized configuration for better maintainability
 */
export class TestConfig {
  // Application URLs
  static readonly BASE_URL = 'https://automationintesting.online/';
  
  // Timeouts (in milliseconds)
  static readonly DEFAULT_TIMEOUT = 5000;
  static readonly FORM_SUBMISSION_TIMEOUT = 10000;
  static readonly PRICE_UPDATE_TIMEOUT = 1000;
  
  // Test data paths
  static readonly SCREENSHOT_PATH = 'test-results/';
  
  // Browser configuration
  static readonly VIEWPORT = { width: 1280, height: 720 };
}

/**
 * Application-specific constants
 */
export class AppConstants {
  // Room pricing
  static readonly SINGLE_ROOM_PRICE = 100;
  static readonly DOUBLE_ROOM_PRICE = 150;
  static readonly CLEANING_FEE = 25;
  static readonly SERVICE_FEE = 15;
  
  // Date formats
  static readonly DATE_FORMAT = 'YYYY-MM-DD';
  
  // URL patterns
  static readonly RESERVATION_URL_PATTERN = /\/reservation/;
}
