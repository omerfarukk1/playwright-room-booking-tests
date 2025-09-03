import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RoomsPage } from '../pages/RoomsPage';
import { ReservationPage } from '../pages/ReservationPage';
import { BookingFormPage } from '../pages/BookingFormPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

// Extend the base test with page objects
type TestFixtures = {
  homePage: HomePage;
  roomsPage: RoomsPage;
  reservationPage: ReservationPage;
  bookingFormPage: BookingFormPage;
  confirmationPage: ConfirmationPage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  roomsPage: async ({ page }, use) => {
    await use(new RoomsPage(page));
  },
  reservationPage: async ({ page }, use) => {
    await use(new ReservationPage(page));
  },
  bookingFormPage: async ({ page }, use) => {
    await use(new BookingFormPage(page));
  },
  confirmationPage: async ({ page }, use) => {
    await use(new ConfirmationPage(page));
  },
});

export { expect } from '@playwright/test';
