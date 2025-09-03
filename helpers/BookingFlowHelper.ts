import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RoomsPage } from '../pages/RoomsPage';
import { ReservationPage } from '../pages/ReservationPage';
import { BookingFormPage } from '../pages/BookingFormPage';

export class BookingFlowHelper {
  constructor(
    private homePage: HomePage,
    private roomsPage: RoomsPage,
    private reservationPage: ReservationPage,
    private bookingFormPage: BookingFormPage
  ) {}

  /**
   * Common flow: Navigate to booking form
   * This implements DRY principle by extracting repeated navigation steps
   */
  async navigateToBookingForm(): Promise<void> {
    // Arrange: Start from homepage
    await this.homePage.navigate();
    
    // Act: Navigate through booking flow
    await this.homePage.clickHeroBookNow();
    await this.roomsPage.selectFirstAvailableRoom();
    await this.reservationPage.verifyPageLoad();
    
    // Continue to booking form
    await this.reservationPage.selectDates('01', '03');
    await this.reservationPage.verifyPricing();
    await this.reservationPage.proceedToCheckout();
  }

  /**
   * Common validation flow with screenshots
   */
  async performValidationTest(
    formData: any,
    expectedMessages: string[],
    testName: string
  ): Promise<void> {
    // Arrange: Navigate to form and take before screenshot
    await this.navigateToBookingForm();
    await this.bookingFormPage.takeScreenshot(`test-results/${testName}-before.png`);
    
    // Act: Fill form and submit
    await this.bookingFormPage.fillForm(formData);
    await this.bookingFormPage.submitForm();
    
    // Wait for validation
    await this.bookingFormPage.page.waitForTimeout(1000);
    
    // Assert: Verify validation and take screenshots
    await this.bookingFormPage.takeScreenshot(`test-results/${testName}-after.png`);
    await this.bookingFormPage.verifyValidationAlert();
    await this.bookingFormPage.verifyMultipleValidationMessages(expectedMessages);
    await this.bookingFormPage.takeValidationAlertScreenshot(`test-results/${testName}-validation.png`);
    
    // Additional assertions
    await this.bookingFormPage.verifyStillOnReservationPage();
  }
}
