import { Page, Locator, expect } from '@playwright/test';

export interface BookingFormData {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
}

export class BookingFormPage {
  readonly page: Page;
  readonly forenameInput: Locator;
  readonly surnameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly reserveFormButton: Locator;
  readonly validationAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.forenameInput = page.getByPlaceholder('Firstname');
    this.surnameInput = page.getByPlaceholder('Lastname');
    this.emailInput = page.getByPlaceholder('Email');
    this.phoneInput = page.getByPlaceholder('Phone');
    this.reserveFormButton = page.getByRole('button', { name: /reserve now/i }).first();
    this.validationAlert = page.locator('.alert.alert-danger');
  }

  async fillForm(formData: BookingFormData): Promise<void> {
    if (formData.firstname !== undefined) {
      await this.forenameInput.fill(formData.firstname);
    }
    if (formData.lastname !== undefined) {
      await this.surnameInput.fill(formData.lastname);
    }
    if (formData.email !== undefined) {
      await this.emailInput.fill(formData.email);
    }
    if (formData.phone !== undefined) {
      await this.phoneInput.fill(formData.phone);
    }
  }

  async clearAllFields(): Promise<void> {
    await this.forenameInput.clear();
    await this.surnameInput.clear();
    await this.emailInput.clear();
    await this.phoneInput.clear();
  }

  async submitForm(): Promise<void> {
    await this.reserveFormButton.click();
  }

  async verifyValidationAlert(): Promise<void> {
    await expect(this.validationAlert).toBeVisible();
  }

  async verifyValidationMessage(message: string): Promise<void> {
    await expect(this.validationAlert).toContainText(message);
  }

  async verifyMultipleValidationMessages(messages: string[]): Promise<void> {
    for (const message of messages) {
      await this.verifyValidationMessage(message);
    }
  }

  async takeScreenshot(path: string, fullPage: boolean = true): Promise<void> {
    await this.page.screenshot({ path, fullPage });
  }

  async takeValidationAlertScreenshot(path: string): Promise<void> {
    await this.validationAlert.screenshot({ path });
  }

  async getValidationText(): Promise<string | null> {
    return await this.validationAlert.textContent();
  }

  async verifyFormFieldsVisible(): Promise<void> {
    await expect(this.forenameInput).toBeVisible();
    await expect(this.surnameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
  }

  async verifyStillOnReservationPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/reservation/);
    await this.verifyFormFieldsVisible();
  }
}
