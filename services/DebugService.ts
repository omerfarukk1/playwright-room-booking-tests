/**
 * Debug Service - Advanced Debugging and Tracing for Playwright Tests
 * 
 * This service provides sophisticated debugging capabilities beyond console.log:
 * - Playwright trace viewer integration
 * - Step-by-step debugging with screenshots
 * - Error context capture
 * - Performance monitoring
 * - Test execution flow tracking
 */

import { Page, BrowserContext, test } from '@playwright/test';
import { TestConfig } from '../config/TestConfig';

export interface DebugContext {
  testName: string;
  stepName: string;
  timestamp: Date;
  pageUrl?: string;
  screenshot?: string;
  trace?: string;
  performanceMetrics?: any;
  errorContext?: any;
}

export interface DebugStep {
  stepNumber: number;
  stepName: string;
  description: string;
  action: string;
  expectedResult: string;
  actualResult?: string;
  duration?: number;
  screenshot?: string;
  success: boolean;
  errorDetails?: any;
}

class DebugService {
  private static instance: DebugService;
  private debugSteps: Map<string, DebugStep[]> = new Map();
  private testStartTime: Map<string, Date> = new Map();
  private isDebugMode: boolean;

  private constructor() {
    this.isDebugMode = process.env.DEBUG_MODE === 'true' || process.env.PWDEBUG === '1';
  }

  public static getInstance(): DebugService {
    if (!DebugService.instance) {
      DebugService.instance = new DebugService();
    }
    return DebugService.instance;
  }

  /**
   * Initialize debugging for a test
   */
  public async initializeTest(testName: string, context: BrowserContext): Promise<void> {
    this.testStartTime.set(testName, new Date());
    this.debugSteps.set(testName, []);

    if (this.isDebugMode) {
      // Start tracing for debugging
      await context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true,
        title: `Debug trace for: ${testName}`
      });
    }
  }

  /**
   * Track a test step with comprehensive debugging info
   */
  public async trackStep(
    testName: string,
    stepName: string,
    description: string,
    action: string,
    expectedResult: string,
    page: Page,
    stepFunction: () => Promise<any>
  ): Promise<any> {
    const stepStartTime = Date.now();
    const steps = this.debugSteps.get(testName) || [];
    const stepNumber = steps.length + 1;

    let stepResult: DebugStep = {
      stepNumber,
      stepName,
      description,
      action,
      expectedResult,
      success: false,
      duration: 0
    };

    try {
      // Take screenshot before step execution
      if (this.isDebugMode) {
        const screenshotPath = `test-results/debug/${testName}/step-${stepNumber}-before.png`;
        await page.screenshot({ 
          path: screenshotPath,
          fullPage: true 
        });
        stepResult.screenshot = screenshotPath;
      }

      // Execute the step function
      const result = await stepFunction();
      
      const stepEndTime = Date.now();
      stepResult.duration = stepEndTime - stepStartTime;
      stepResult.success = true;
      stepResult.actualResult = 'Step completed successfully';

      // Take screenshot after successful step
      if (this.isDebugMode) {
        const successScreenshotPath = `test-results/debug/${testName}/step-${stepNumber}-success.png`;
        await page.screenshot({ 
          path: successScreenshotPath,
          fullPage: true 
        });
      }

      steps.push(stepResult);
      this.debugSteps.set(testName, steps);

      // Log detailed step information
      await this.logStepDetails(testName, stepResult, page);

      return result;

    } catch (error) {
      const stepEndTime = Date.now();
      stepResult.duration = stepEndTime - stepStartTime;
      stepResult.success = false;
      stepResult.actualResult = `Step failed: ${error}`;
      stepResult.errorDetails = {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        pageUrl: page.url(),
        timestamp: new Date().toISOString()
      };

      // Capture detailed error context
      await this.captureErrorContext(testName, stepResult, page, error);

      steps.push(stepResult);
      this.debugSteps.set(testName, steps);

      throw error;
    }
  }

  /**
   * Capture comprehensive error context for debugging
   */
  private async captureErrorContext(
    testName: string,
    step: DebugStep,
    page: Page,
    error: any
  ): Promise<void> {
    try {
      // Capture error screenshot
      const errorScreenshotPath = `test-results/debug/${testName}/step-${step.stepNumber}-error.png`;
      await page.screenshot({ 
        path: errorScreenshotPath,
        fullPage: true 
      });

      // Capture page HTML for analysis
      const htmlContent = await page.content();
      const htmlPath = `test-results/debug/${testName}/step-${step.stepNumber}-error.html`;
      const fs = require('fs');
      const path = require('path');
      
      // Ensure directory exists
      const dir = path.dirname(htmlPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(htmlPath, htmlContent);

      // Capture console logs if available
      const consoleLogs = await this.getRecentConsoleLogs(page);
      
      // Enhanced error details
      step.errorDetails = {
        ...step.errorDetails,
        screenshot: errorScreenshotPath,
        htmlSnapshot: htmlPath,
        consoleLogs,
        pageTitle: await page.title(),
        pageUrl: page.url(),
        viewportSize: page.viewportSize(),
        userAgent: await page.evaluate(() => navigator.userAgent)
      };

    } catch (captureError) {
      console.error('Failed to capture error context:', captureError);
    }
  }

  /**
   * Log detailed step information using Playwright's test.step
   */
  private async logStepDetails(testName: string, step: DebugStep, page: Page): Promise<void> {
    await test.step(`${step.stepName} (${step.duration}ms)`, async () => {
      const stepInfo = {
        stepNumber: step.stepNumber,
        description: step.description,
        action: step.action,
        expectedResult: step.expectedResult,
        actualResult: step.actualResult,
        duration: `${step.duration}ms`,
        pageUrl: page.url(),
        success: step.success ? '✅' : '❌'
      };

      console.table(stepInfo);

      if (this.isDebugMode) {
        console.log(`🔍 Debug Info for Step ${step.stepNumber}:`);
        console.log(`   📝 Description: ${step.description}`);
        console.log(`   🎯 Action: ${step.action}`);
        console.log(`   ✅ Expected: ${step.expectedResult}`);
        console.log(`   📊 Duration: ${step.duration}ms`);
        console.log(`   📍 Page URL: ${page.url()}`);
        if (step.screenshot) {
          console.log(`   📸 Screenshot: ${step.screenshot}`);
        }
      }
    });
  }

  /**
   * Get recent console logs from the page
   */
  private async getRecentConsoleLogs(page: Page): Promise<string[]> {
    // This would need to be implemented by listening to console events
    // For now, return empty array
    return [];
  }

  /**
   * Finalize test debugging and generate comprehensive report
   */
  public async finalizeTest(
    testName: string,
    context: BrowserContext,
    success: boolean
  ): Promise<void> {
    const steps = this.debugSteps.get(testName) || [];
    const startTime = this.testStartTime.get(testName);
    const endTime = new Date();
    const totalDuration = startTime ? endTime.getTime() - startTime.getTime() : 0;

    // Stop tracing and save
    if (this.isDebugMode) {
      const tracePath = `test-results/debug/${testName}/trace.zip`;
      await context.tracing.stop({ path: tracePath });
      console.log(`🎬 Trace saved to: ${tracePath}`);
      console.log(`   Use: npx playwright show-trace ${tracePath}`);
    }

    // Generate test summary
    await this.generateTestReport(testName, steps, totalDuration, success);

    // Clean up
    this.debugSteps.delete(testName);
    this.testStartTime.delete(testName);
  }

  /**
   * Generate comprehensive test report
   */
  private async generateTestReport(
    testName: string,
    steps: DebugStep[],
    totalDuration: number,
    success: boolean
  ): Promise<void> {
    console.log('\n' + '='.repeat(80));
    console.log(`📋 DEBUG REPORT: ${testName}`);
    console.log('='.repeat(80));
    console.log(`🎯 Test Result: ${success ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`⏱️  Total Duration: ${totalDuration}ms`);
    console.log(`📊 Total Steps: ${steps.length}`);
    console.log(`✅ Successful Steps: ${steps.filter(s => s.success).length}`);
    console.log(`❌ Failed Steps: ${steps.filter(s => !s.success).length}`);
    console.log('\n📝 Step Summary:');

    steps.forEach(step => {
      const icon = step.success ? '✅' : '❌';
      console.log(`   ${icon} Step ${step.stepNumber}: ${step.stepName} (${step.duration}ms)`);
      if (!step.success && step.errorDetails) {
        console.log(`      🚨 Error: ${step.errorDetails.message}`);
        if (step.errorDetails.screenshot) {
          console.log(`      📸 Error Screenshot: ${step.errorDetails.screenshot}`);
        }
      }
    });

    if (this.isDebugMode) {
      console.log('\n🔍 Debug Files Generated:');
      console.log(`   📁 Debug folder: test-results/debug/${testName}/`);
      console.log(`   🎬 Trace file: test-results/debug/${testName}/trace.zip`);
      console.log(`   📸 Screenshots: test-results/debug/${testName}/step-*.png`);
    }

    console.log('='.repeat(80) + '\n');
  }

  /**
   * Set up VS Code debugging integration
   */
  public setupVSCodeDebugging(): void {
    if (process.env.NODE_ENV === 'development') {
      // Add breakpoint helper
      (global as any).debugBreakpoint = (message?: string) => {
        if (message) {
          console.log(`🔍 Debug Breakpoint: ${message}`);
        }
        debugger; // This will trigger VS Code debugger
      };

      console.log('🔧 VS Code debugging setup complete');
      console.log('   Use debugBreakpoint("message") in your tests');
      console.log('   Set breakpoints in VS Code and run with F5');
    }
  }

  /**
   * Enable Playwright's built-in debugging features
   */
  public enablePlaywrightDebugging(): string[] {
    const debugCommands = [
      'npx playwright test --debug',
      'npx playwright test --headed --slowmo=1000',
      'npx playwright codegen https://automationintesting.online/',
      'npx playwright show-trace test-results/debug/*/trace.zip'
    ];

    console.log('🎭 Playwright Debugging Commands:');
    debugCommands.forEach((cmd, index) => {
      console.log(`   ${index + 1}. ${cmd}`);
    });

    return debugCommands;
  }

  /**
   * Performance monitoring for test steps
   */
  public async measurePerformance<T>(
    name: string,
    operation: () => Promise<T>
  ): Promise<{ result: T; duration: number; memoryUsage?: any }> {
    const startTime = performance.now();
    const startMemory = process.memoryUsage();

    try {
      const result = await operation();
      const endTime = performance.now();
      const endMemory = process.memoryUsage();
      const duration = endTime - startTime;

      const memoryDiff = {
        heapUsed: endMemory.heapUsed - startMemory.heapUsed,
        heapTotal: endMemory.heapTotal - startMemory.heapTotal,
        external: endMemory.external - startMemory.external
      };

      if (this.isDebugMode) {
        console.log(`⚡ Performance: ${name} completed in ${duration.toFixed(2)}ms`);
        console.log(`   Memory change: ${(memoryDiff.heapUsed / 1024 / 1024).toFixed(2)}MB`);
      }

      return { result, duration, memoryUsage: memoryDiff };
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.error(`❌ Performance: ${name} failed after ${duration.toFixed(2)}ms`);
      throw error;
    }
  }
}

// Export singleton instance
export const debugService = DebugService.getInstance();

// Export helper function for easy use in tests
export const debugStep = async (
  testName: string,
  stepName: string,
  description: string,
  action: string,
  expectedResult: string,
  page: Page,
  stepFunction: () => Promise<any>
) => {
  return debugService.trackStep(testName, stepName, description, action, expectedResult, page, stepFunction);
};

// Export performance measurement helper
export const measurePerformance = async <T>(
  name: string,
  operation: () => Promise<T>
): Promise<{ result: T; duration: number }> => {
  return debugService.measurePerformance(name, operation);
};
