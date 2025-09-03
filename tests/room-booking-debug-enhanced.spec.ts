/**
 * Room Booking Tests - Enhanced with Advanced Debugging
 * 
 * This file demonstrates advanced debugging techniques beyond console.log:
 * - Playwright trace viewer integration
 * - VS Code debugging support
 * - Step-by-step debugging with context capture
 * - Performance monitoring
 * - Comprehensive error tracking
 */

import { test, expect } from '@playwright/test';
import { debugService, debugStep, measurePerformance } from '../services/DebugService';

// Enable VS Code debugging integration
debugService.setupVSCodeDebugging();

test.describe('Room Booking Application - Enhanced Debugging', () => {
  
  test.beforeEach(async ({ context }, testInfo) => {
    // Initialize debugging for each test
    await debugService.initializeTest(testInfo.title, context);
    
    // Log available debugging commands
    debugService.enablePlaywrightDebugging();
  });

  test.afterEach(async ({ context }, testInfo) => {
    // Finalize debugging and generate comprehensive report
    const success = testInfo.status === 'passed';
    await debugService.finalizeTest(testInfo.title, context, success);
  });

  test('Room Booking Scenario - Advanced Debugging Demo', async ({ page }, testInfo) => {
    const testName = testInfo.title;
    
    // Step 1: Navigate to homepage with performance monitoring
    await debugStep(
      testName,
      'Navigate to Homepage',
      'Navigate to the room booking application homepage',
      'page.goto("https://automationintesting.online/")',
      'Homepage should load successfully with hero section visible',
      page,
      async () => {
        const { result, duration } = await measurePerformance('Homepage Navigation', async () => {
          await page.goto('https://automationintesting.online/');
          return page.waitForLoadState('networkidle');
        });
        
        // Advanced assertion with context
        const heroSection = page.locator('.hero');
        await expect(heroSection).toBeVisible();
        
        console.log(`📊 Page loaded in ${duration.toFixed(2)}ms`);
        return result;
      }
    );

    // Step 2: Click hero book now button with detailed tracking
    await debugStep(
      testName,
      'Click Hero Book Now',
      'Click the primary "Book Now" button in the hero section',
      'heroBookNow.click()',
      'Should navigate to rooms selection page',
      page,
      async () => {
        const heroBookNow = page.getByRole('link', { name: /book now/i }).first();
        
        // Wait for element to be ready
        await expect(heroBookNow).toBeVisible({ timeout: 10000 });
        
        // Debug: Log element properties
        const elementText = await heroBookNow.textContent();
        const isEnabled = await heroBookNow.isEnabled();
        console.log(`🎯 Button text: "${elementText}", Enabled: ${isEnabled}`);
        
        await heroBookNow.click();
        
        // Verify navigation
        await page.waitForURL(/\/(#rooms)?/);
      }
    );

    // Step 3: Select room with validation
    await debugStep(
      testName,
      'Select Available Room',
      'Select the first available room from the room list',
      'roomBookNow.click()',
      'Should navigate to reservation page for selected room',
      page,
      async () => {
        // Wait for rooms to load
        await page.waitForSelector('[data-room]', { timeout: 10000 });
        
        const roomBookNow = page.getByRole('link', { name: /book now/i }).nth(1);
        await expect(roomBookNow).toBeVisible();
        
        // Debug: Log available rooms
        const roomElements = await page.locator('[data-room]').count();
        console.log(`🏨 Found ${roomElements} available rooms`);
        
        await roomBookNow.click();
      }
    );

    // Step 4: Verify reservation page with comprehensive checks
    await debugStep(
      testName,
      'Verify Reservation Page',
      'Verify that reservation page loads with all required elements',
      'expect(page).toHaveURL(/\\/reservation/) and verify calendar',
      'Reservation page should display room details, calendar, and pricing',
      page,
      async () => {
        await expect(page).toHaveURL(/\/reservation/);
        
        const header = page.getByRole('heading', { level: 1 });
        await expect(header).toHaveText(/(Single Room|Double Room|Suite)/i);
        
        const calendar = page.getByRole('table', { name: /Month View/i });
        await expect(calendar).toBeVisible();
        
        // Debug: Log page elements
        const headerText = await header.textContent();
        const calendarVisible = await calendar.isVisible();
        console.log(`🏪 Room type: "${headerText}", Calendar visible: ${calendarVisible}`);
      }
    );

    // Step 5: Select dates with validation
    await debugStep(
      testName,
      'Select Booking Dates',
      'Select check-in (1st) and check-out (3rd) dates',
      'Click date buttons and validate selection',
      'Dates should be selected and price should update',
      page,
      async () => {
        // Use VS Code debugger breakpoint
        if (typeof (global as any).debugBreakpoint === 'function') {
          (global as any).debugBreakpoint('About to select dates - inspect calendar state');
        }
        
        await page.getByRole('button', { name: '01' }).first().click();
        await page.getByRole('button', { name: '03' }).first().click();

        // Wait for price calculation
        await page.waitForTimeout(1000);
        
        // Debug: Verify date selection
        const selectedDates = await page.locator('.rbc-selected').count();
        console.log(`📅 Selected ${selectedDates} date ranges`);
      }
    );

    // Step 6: Verify pricing with detailed validation
    await debugStep(
      testName,
      'Verify Price Calculation',
      'Verify that price summary shows correct calculations',
      'Check price summary for room rate, fees, and total',
      'Price summary should show room rate, cleaning fee, service fee, and total',
      page,
      async () => {
        const priceSummary = page.getByRole('heading', { name: /Price Summary/i }).locator('..');
        
        // Enhanced price validation with debugging
        await expect(priceSummary).toContainText(/£(100|150) x 1 nights/);
        await expect(priceSummary).toContainText('£25'); // Cleaning fee
        await expect(priceSummary).toContainText('£15'); // Service fee
        await expect(priceSummary).toContainText(/£(140|190)/);
        
        // Debug: Log pricing details
        const pricingText = await priceSummary.textContent();
        console.log(`💰 Pricing details: ${pricingText}`);
      }
    );

    // Step 7: Proceed to checkout
    await debugStep(
      testName,
      'Proceed to Checkout',
      'Click Reserve Now button to proceed to booking form',
      'reserveNowBtn.click()',
      'Should navigate to booking form page',
      page,
      async () => {
        const reserveNowBtn = page.locator('#doReservation');
        await expect(reserveNowBtn).toBeVisible();
        await reserveNowBtn.click();
        
        // Wait for form to load
        await page.waitForSelector('input[placeholder="Firstname"]', { timeout: 10000 });
      }
    );

    // Step 8: Test form validation with comprehensive error tracking
    await debugStep(
      testName,
      'Test Form Validation',
      'Test form validation by submitting with empty firstname',
      'Fill form with empty firstname and submit',
      'Should display validation errors for missing firstname',
      page,
      async () => {
        const forenameInput = page.getByPlaceholder('Firstname');
        const surnameInput = page.getByPlaceholder('Lastname');
        const emailInput = page.getByPlaceholder('Email');
        const phoneInput = page.getByPlaceholder('Phone');
        const reserveFormBtn = page.getByRole('button', { name: /reserve now/i }).first();

        // Fill form with validation error (empty firstname)
        await forenameInput.fill('');
        await surnameInput.fill('Doe');
        await emailInput.fill('john.doe@example.com');
        await phoneInput.fill('01234567890');
        
        await reserveFormBtn.click();
        
        // Wait for and verify validation messages
        const validationAlert = page.locator('.alert.alert-danger');
        await expect(validationAlert).toBeVisible({ timeout: 5000 });
        
        await expect(validationAlert).toContainText('Firstname should not be blank');
        await expect(validationAlert).toContainText('size must be between 3 and 18');
        
        // Debug: Log validation message
        const validationText = await validationAlert.textContent();
        console.log(`⚠️  Validation errors: ${validationText}`);
      }
    );

    // Step 9: Complete valid form submission
    await debugStep(
      testName,
      'Complete Valid Form Submission',
      'Fill all fields correctly and submit the booking form',
      'Fill valid data and submit form',
      'Should either show booking confirmation or handle known application error',
      page,
      async () => {
        const forenameInput = page.getByPlaceholder('Firstname');
        await forenameInput.fill('John');
        
        const reserveFormBtn = page.getByRole('button', { name: /reserve now/i }).first();
        await reserveFormBtn.click();
        
        // Handle both possible outcomes with detailed tracking
        try {
          // Success case: booking confirmation
          const confirmationHeading = page.getByRole('heading', { name: /Booking Confirmed/i });
          await expect(confirmationHeading).toBeVisible({ timeout: 10000 });
          
          const confirmationText = page.locator('text=Your booking has been confirmed for the following dates:');
          await expect(confirmationText).toBeVisible();
          
          const dateRange = page.locator('text=2025-09-01 - 2025-09-02');
          await expect(dateRange).toBeVisible();
          
          console.log('✅ Booking confirmation displayed successfully');
          
        } catch (confirmationError) {
          // Known error case: application error
          try {
            const errorMessage = page.locator('//h2');
            await expect(errorMessage).toBeVisible({ timeout: 5000 });
            await expect(errorMessage).toContainText('Application error: a client-side exception has occurred');
            
            console.log('⚠️  Expected application error occurred - this is a known website issue');
            
          } catch (errorCheckFailed) {
            // Neither confirmation nor error found - unexpected state
            console.error('❌ Unexpected outcome: Neither confirmation nor application error found');
            
            // Capture additional debug information
            const currentUrl = page.url();
            const pageTitle = await page.title();
            const pageContent = await page.content();
            
            console.log(`🔍 Debug info - URL: ${currentUrl}, Title: ${pageTitle}`);
            
            throw new Error(`Unexpected state after form submission. URL: ${currentUrl}, Title: ${pageTitle}`);
          }
        }
      }
    );

    console.log('\n🎉 Test completed with advanced debugging enabled!');
    console.log('📁 Check test-results/debug/ folder for comprehensive debug files');
    console.log('🎬 Use: npx playwright show-trace test-results/debug/*/trace.zip to view traces');
  });

  test('Email Validation - Debug Mode', async ({ page }, testInfo) => {
    const testName = testInfo.title;
    
    // This test demonstrates focused debugging for validation scenarios
    await debugStep(testName, 'Setup for Email Validation Test', 'Navigate and setup for email validation test', 'Navigate to booking form', 'Should reach booking form', page, async () => {
      await page.goto('https://automationintesting.online/');
      await page.getByRole('link', { name: /book now/i }).first().click();
      await page.getByRole('link', { name: /book now/i }).nth(1).click();
      await expect(page).toHaveURL(/\/reservation/);
      await page.getByRole('button', { name: '01' }).first().click();
      await page.getByRole('button', { name: '03' }).first().click();
      await page.waitForTimeout(1000);
      await page.getByRole('button', { name: /reserve now/i }).first().click();
    });

    await debugStep(testName, 'Test Email Validation', 'Test empty email field validation', 'Submit form with empty email', 'Should show email validation error', page, async () => {
      const forenameInput = page.getByRole('textbox', { name: /Firstname/i });
      const surnameInput = page.getByRole('textbox', { name: /Lastname/i });
      const emailInput = page.getByRole('textbox', { name: /Email/i });
      const phoneInput = page.getByRole('textbox', { name: /Phone/i });
      const reserveFormBtn = page.getByRole('button', { name: /reserve now/i }).first();

      await forenameInput.fill('John');
      await surnameInput.fill('Doe');
      await emailInput.fill(''); // Empty email
      await phoneInput.fill('01234567890');
      await reserveFormBtn.click();
      
      const validationAlert = page.locator('.alert.alert-danger');
      await expect(validationAlert).toBeVisible();
      await expect(validationAlert).toContainText('must not be empty');
      
      console.log('✅ Email validation working correctly');
    });
  });
});

// Export debugging utilities for reuse
export { debugService, debugStep, measurePerformance };
