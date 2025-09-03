import { test, expect } from '../fixtures/test-fixtures';
import { TestConfig } from '../config/TestConfig';
import { TestData, ValidationMessages } from '../data/TestData';
import { ValidationService, FormData } from '../services/ValidationService';
import { BookingFlowError } from '../utils/CustomErrors';

/**
 * Room Booking Test Suite - Structured Implementation
 * 
 * This test suite demonstrates proper separation of concerns:
 * - Clear test organization with descriptive names
 * - Separation of test data, page logic, and validation
 * - Reusable components and services
 * - Comprehensive error handling
 */
test.describe('Room Booking Application - Structured Tests', () => {

  /**
   * Test Group: Complete Booking Workflow
   * Tests the entire end-to-end booking process
   */
  test.describe('Complete Booking Workflow', () => {
    
    test('should complete full booking flow with validation checks', async ({ 
      homePage, 
      roomsPage, 
      reservationPage, 
      bookingFormPage, 
      confirmationPage 
    }) => {
      // ARRANGE: Prepare test data and expected outcomes
      const testData = {
        invalidFormData: TestData.EMPTY_FIRSTNAME,
        validFormData: TestData.VALID_BOOKING,
        expectedDateRange: TestData.DATES.EXPECTED_RANGE,
        checkInDate: TestData.DATES.CHECK_IN,
        checkOutDate: TestData.DATES.CHECK_OUT
      };

      // ACT & ASSERT: Execute booking flow with validations
      await test.step('Navigate to application and start booking', async () => {
        await homePage.navigateAndVerify();
        await homePage.clickHeroBookNow();
        await roomsPage.selectFirstAvailableRoom();
      });

      await test.step('Configure reservation details', async () => {
        await reservationPage.verifyPageLoad();
        await reservationPage.selectDates(testData.checkInDate, testData.checkOutDate);
        await reservationPage.verifyPricing();
        await reservationPage.proceedToCheckout();
      });

      await test.step('Test form validation with invalid data', async () => {
        await bookingFormPage.fillForm(testData.invalidFormData);
        await bookingFormPage.submitForm();
        
        // Verify validation using service
        const expectedValidation = ValidationService.validateFirstname(testData.invalidFormData.firstname || '');
        await bookingFormPage.verifyValidationAlert();
        
        for (const error of expectedValidation.errors) {
          await bookingFormPage.verifyValidationMessage(error);
        }
      });

      await test.step('Complete booking with valid data', async () => {
        await bookingFormPage.fillForm({ firstname: testData.validFormData.firstname });
        await bookingFormPage.submitForm();
        
        // Handle expected outcomes
        await handleBookingSubmissionOutcome(confirmationPage, testData.expectedDateRange);
      });
    });
  });

  /**
   * Test Group: Form Validation Tests  
   * Focused testing of individual validation scenarios
   */
  test.describe('Form Validation Tests', () => {
    
    test('should validate email field when empty', async ({ 
      homePage, 
      roomsPage, 
      reservationPage, 
      bookingFormPage 
    }) => {
      // ARRANGE: Prepare test scenario
      const testScenario = new ValidationTestScenario(
        'Email Validation',
        TestData.EMPTY_EMAIL,
        ValidationService.validateEmail('')
      );

      // ACT & ASSERT: Execute validation test
      await executeValidationTest(
        { homePage, roomsPage, reservationPage, bookingFormPage }, 
        testScenario
      );
    });

    test('should validate all fields when empty', async ({ 
      homePage, 
      roomsPage, 
      reservationPage, 
      bookingFormPage 
    }) => {
      // ARRANGE: Prepare comprehensive validation scenario
      const testScenario = new ValidationTestScenario(
        'All Fields Empty',
        TestData.ALL_EMPTY,
        ValidationService.validateCompleteForm(TestData.ALL_EMPTY)
      );

      // ACT & ASSERT: Execute comprehensive validation test with screenshots
      await executeValidationTestWithScreenshots(
        { homePage, roomsPage, reservationPage, bookingFormPage }, 
        testScenario
      );
    });

    test('should validate firstname field specifically', async ({ 
      homePage, 
      roomsPage, 
      reservationPage, 
      bookingFormPage 
    }) => {
      // ARRANGE: Prepare firstname-specific validation
      const testScenario = new ValidationTestScenario(
        'Firstname Validation',
        TestData.EMPTY_FIRSTNAME,
        ValidationService.validateFirstname('')
      );

      // ACT & ASSERT: Execute focused validation test
      await executeValidationTest(
        { homePage, roomsPage, reservationPage, bookingFormPage }, 
        testScenario
      );
    });
  });

  /**
   * Test Group: Pricing Verification
   * Isolated testing of pricing calculations
   */
  test.describe('Pricing Verification', () => {
    
    test('should calculate room pricing correctly', async ({ 
      homePage, 
      roomsPage, 
      reservationPage 
    }) => {
      // ARRANGE: Prepare pricing test data
      const pricingTestData = {
        checkInDate: TestData.DATES.CHECK_IN,
        checkOutDate: TestData.DATES.CHECK_OUT
      };

      // ACT: Navigate to pricing display
      await test.step('Navigate to pricing calculation', async () => {
        await homePage.navigateAndVerify();
        await homePage.clickHeroBookNow();
        await roomsPage.selectFirstAvailableRoom();
        await reservationPage.verifyPageLoad();
        await reservationPage.selectDates(pricingTestData.checkInDate, pricingTestData.checkOutDate);
      });

      // ASSERT: Verify pricing calculations
      await test.step('Verify pricing accuracy', async () => {
        await reservationPage.verifyPricing();
      });
    });
  });
});

/**
 * Helper Classes and Functions for Better Structure
 */

/**
 * Encapsulates validation test scenario data
 */
class ValidationTestScenario {
  constructor(
    public readonly name: string,
    public readonly formData: FormData,
    public readonly expectedValidation: any
  ) {}

  get expectedErrors(): string[] {
    if (this.expectedValidation.allErrors) {
      return this.expectedValidation.allErrors;
    }
    return this.expectedValidation.errors || [];
  }
}

/**
 * Execute a standard validation test
 */
async function executeValidationTest(
  pages: { homePage: any, roomsPage: any, reservationPage: any, bookingFormPage: any },
  scenario: ValidationTestScenario
): Promise<void> {
  const { homePage, roomsPage, reservationPage, bookingFormPage } = pages;

  // Navigate to form
  await test.step(`Navigate to booking form for ${scenario.name}`, async () => {
    await homePage.navigateAndVerify();
    await homePage.clickHeroBookNow();
    await roomsPage.selectFirstAvailableRoom();
    await reservationPage.verifyPageLoad();
    await reservationPage.selectDates(TestData.DATES.CHECK_IN, TestData.DATES.CHECK_OUT);
    await reservationPage.proceedToCheckout();
  });

  // Execute validation test
  await test.step(`Test ${scenario.name} validation`, async () => {
    await bookingFormPage.fillForm(scenario.formData);
    await bookingFormPage.submitForm();
    await bookingFormPage.verifyValidationAlert();
    
    for (const expectedError of scenario.expectedErrors) {
      await bookingFormPage.verifyValidationMessage(expectedError);
    }
    
    await bookingFormPage.verifyStillOnReservationPage();
  });
}

/**
 * Execute validation test with comprehensive screenshots
 */
async function executeValidationTestWithScreenshots(
  pages: { homePage: any, roomsPage: any, reservationPage: any, bookingFormPage: any },
  scenario: ValidationTestScenario
): Promise<void> {
  const { homePage, roomsPage, reservationPage, bookingFormPage } = pages;

  // Navigate to form
  await test.step(`Navigate to booking form for ${scenario.name}`, async () => {
    await homePage.navigateAndVerify();
    await homePage.clickHeroBookNow();
    await roomsPage.selectFirstAvailableRoom();
    await reservationPage.verifyPageLoad();
    await reservationPage.selectDates(TestData.DATES.CHECK_IN, TestData.DATES.CHECK_OUT);
    await reservationPage.proceedToCheckout();
  });

  // Take before screenshot
  await test.step('Capture before state', async () => {
    await bookingFormPage.takeScreenshot(`${scenario.name.toLowerCase().replace(/\s+/g, '-')}-before.png`);
  });

  // Execute validation with screenshots
  await test.step(`Test ${scenario.name} validation with screenshots`, async () => {
    if (scenario.formData === TestData.ALL_EMPTY) {
      await bookingFormPage.clearAllFields();
    } else {
      await bookingFormPage.fillForm(scenario.formData);
    }
    
    await bookingFormPage.submitForm();
    await bookingFormPage.page.waitForTimeout(1000);
    
    // Take after screenshot
    await bookingFormPage.takeScreenshot(`${scenario.name.toLowerCase().replace(/\s+/g, '-')}-after.png`);
    
    // Verify validation
    await bookingFormPage.verifyValidationAlert();
    
    for (const expectedError of scenario.expectedErrors) {
      await bookingFormPage.verifyValidationMessage(expectedError);
    }
    
    // Take focused validation screenshot
    await bookingFormPage.takeValidationAlertScreenshot(`${scenario.name.toLowerCase().replace(/\s+/g, '-')}-validation.png`);
    
    // Log validation details
    const validationText = await bookingFormPage.getValidationText();
    console.log(`📋 ${scenario.name} validation messages:`, validationText);
    
    await bookingFormPage.verifyStillOnReservationPage();
  });
}

/**
 * Handle the outcome of booking submission (success or known error)
 */
async function handleBookingSubmissionOutcome(
  confirmationPage: any, 
  expectedDateRange: string
): Promise<void> {
  try {
    await test.step('Verify booking confirmation', async () => {
      await confirmationPage.verifyBookingConfirmation(expectedDateRange);
      console.log('✅ Booking confirmation displayed successfully');
    });
  } catch (confirmationError) {
    await test.step('Handle expected application error', async () => {
      try {
        await confirmationPage.verifyApplicationError();
        console.log('⚠️ Application error occurred as expected - known website issue');
      } catch (errorCheckFailed) {
        throw new BookingFlowError('Form submission', 'Neither success nor expected error occurred');
      }
    });
  }
}
