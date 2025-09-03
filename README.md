# Room Booking Automation Tests

This project contains automated UI tests for the room booking functionality on the [Automation in Testing](https://aut## 🏗️ Project Structure

```
typescript/
├── package.json                     # Project dependencies and scripts
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── index.ts                       # Main exports for easy imports
├── ARCHITECTURE.md               # Detailed architecture documentation
├── config/                       # Configuration management
│   └── TestConfig.ts            # Centralized configuration and constants
├── pages/                        # Page Object Model classes
│   ├── BasePage.ts              # Base class for all page objects
│   ├── HomePage.ts              # Homepage interactions
│   ├── RoomsPage.ts             # Room selection page
│   ├── ReservationPage.ts       # Reservation and pricing page
│   ├── BookingFormPage.ts       # Booking form interactions
│   └── ConfirmationPage.ts      # Confirmation/error handling
├── services/                     # Business logic and services
│   └── ValidationService.ts     # Form validation business logic
├── utils/                        # Utility classes and helpers
│   ├── CustomErrors.ts          # Custom error classes
│   └── PageUtils.ts             # Common UI interaction utilities
├── helpers/                      # Reusable test helpers
│   └── BookingFlowHelper.ts     # Common booking flow actions
├── data/                        # Test data management
│   └── TestData.ts             # Centralized test data constants
├── fixtures/                    # Test fixtures and setup
│   └── test-fixtures.ts        # Page object fixtures
├── tests/                       # Test files
│   ├── room-booking.spec.ts              # Original tests (legacy)
│   ├── room-booking-refactored.spec.ts   # Best practices implementation
│   └── room-booking-structured.spec.ts   # Structured implementation (latest)
├── test-results/                # Test execution artifacts
├── playwright-report/           # HTML test reports
└── README.md                    # This file
```ng.online/) website using Playwright with TypeScript. The project follows modern testing best practices including Page Object Model (POM), DRY principles, and AAA (Arrange-Act-Assert) pattern.

## Project Overview

The test suite covers the complete room booking workflow including:
- Navigation and room selection
- Date selection and price validation
- Form submission and validation
- Error handling scenarios

## 🏗️ Architecture & Best Practices

### **Page Object Model (POM)**
- **Separation of Concerns**: UI elements and actions are encapsulated in page classes
- **Maintainability**: Changes to UI require updates only in page objects
- **Reusability**: Page objects can be shared across multiple tests

### **DRY (Don't Repeat Yourself) Principles**
- **Test Data Management**: Centralized test data in `TestData.ts`
- **Common Flows**: Reusable helper classes for repeated actions
- **Validation Messages**: Constants for expected error messages

### **AAA (Arrange-Act-Assert) Pattern**
- **Arrange**: Set up test data and initialize objects
- **Act**: Perform the actual test actions
- **Assert**: Verify expected outcomes

##  Technologies Used

- **Playwright** - Modern end-to-end testing framework
- **TypeScript** - Type-safe JavaScript for better development experience
- **Node.js** - Runtime environment

## Prerequisites

- Node.js (version 18 or higher)
- npm (Node Package Manager)

## Getting Started

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd typescript
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

### Running Tests

#### Run all tests (headless mode):
```bash
npx playwright test
```

#### Run tests with visible browser (headed mode):
```bash
npx playwright test --headed
```

#### Run structured tests (Latest Implementation - Best Readability):
```bash
# Run all structured tests with clear separation of concerns
npx playwright test room-booking-structured.spec.ts

# Run specific test groups
npx playwright test room-booking-structured.spec.ts --grep "Complete Booking Workflow"
npx playwright test room-booking-structured.spec.ts --grep "Form Validation Tests"
npx playwright test room-booking-structured.spec.ts --grep "Pricing Verification"

# Run with detailed step reporting
npx playwright test room-booking-structured.spec.ts --project=chromium --headed --reporter=line
```

#### Run refactored tests (Best Practices Implementation):
```bash
# Run all refactored tests
npx playwright test room-booking-refactored.spec.ts

# Run specific test group
npx playwright test room-booking-refactored.spec.ts --grep "Room Booking Tests"
npx playwright test room-booking-refactored.spec.ts --grep "Price Validation Tests"

# Run with specific browser
npx playwright test room-booking-refactored.spec.ts --project=chromium --headed
```

#### Run original tests:
```bash
npx playwright test room-booking.spec.ts
```

#### Run specific test:
```bash
npx playwright test "Room Booking Scenario"
npx playwright test "Email Validation Test"
```

#### Debug mode (interactive):
```bash
npx playwright test --debug
```

### View Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## 📝 Test Cases

### **Refactored Tests (Best Practices Implementation)**

#### 1. Complete Room Booking Flow - End to End Test
**Architecture**: Uses Page Object Model with AAA pattern
**Purpose**: Complete end-to-end room booking workflow with validation

**Steps**:
1. **Arrange**: Initialize page objects and test data
2. **Act**: Navigate through booking flow, test validation, submit form
3. **Assert**: Verify validation messages and final outcomes

#### 2. Email Field Validation - Empty Email Test  
**Architecture**: Uses helper classes and centralized test data
**Purpose**: Validate email field using reusable components

#### 3. All Fields Empty Validation - Comprehensive Form Validation
**Architecture**: Implements DRY principles with screenshot utilities
**Purpose**: Test all field validations with visual documentation

#### 4. Firstname Validation - Single Field Test
**Architecture**: Demonstrates modular validation testing
**Purpose**: Isolated testing of firstname field validation

#### 5. Price Calculation Verification
**Architecture**: Separated price logic into dedicated test group
**Purpose**: Verify pricing calculations independently

### **Original Tests (Legacy Implementation)**

### 1. Room Booking Scenario - Automation in Testing
**Purpose**: Complete end-to-end room booking workflow

**Steps**:
1. Navigate to homepage
2. Click "Book Now" from hero section
3. Select a room type
4. Choose check-in/check-out dates
5. Validate price calculation
6. Fill booking form with validation test (empty firstname)
7. Complete form with valid data
8. Handle booking confirmation or application error

**Expected Results**:
- Price calculation shows correct amounts
- Form validation works for empty required fields
- Either booking confirmation or known application error occurs

### 2. Email Validation Test - Empty Email Field
**Purpose**: Validate email field validation

**Steps**:
1. Navigate through booking flow to form
2. Fill all fields except email (leave empty)
3. Submit form
4. Verify validation error appears

**Expected Results**:
- "must not be empty" validation message appears for email field

### 3. All Fields Empty Validation Test - Complete Form Validation
**Purpose**: Comprehensive validation testing with visual documentation

**Steps**:
1. Navigate through booking flow to form
2. Leave ALL form fields empty (firstname, lastname, email, phone)
3. Take screenshots before and after form submission
4. Submit form and capture validation errors
5. Verify all field-specific validation messages

**Expected Results**:
- Multiple validation errors appear for each empty field
- Screenshots captured: before submission, after validation, and closeup of errors
- Specific error messages verified:
  - Firstname: "should not be blank" and "size must be between 3 and 18"
  - Lastname: "should not be blank" 
  - Email: "must not be empty"
  - Additional size validations for each field

##  Project Structure

```
typescript/
├── package.json                 # Project dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json              # TypeScript configuration
├── tests/
│   └── room-booking.spec.ts   # Main test file
├── test-results/              # Test execution artifacts
├── playwright-report/         # HTML test reports
└── README.md                  # This file
```

##  Configuration

The project uses the default Playwright configuration with:
- Multiple browser support (Chromium, Firefox, WebKit)
- Parallel test execution
- Automatic screenshots on failure
- Video recording on first retry

## Known Issues

- The target website occasionally shows application errors after form submission
- Tests handle both success and error scenarios gracefully
- WebKit tests may have timing differences compared to Chromium/Firefox

## 📊 Test Results Interpretation

Tests will show one of these outcomes:
- ✅ **Success**: All assertions passed
- ⚠️ **Expected Error**: Known application error handled gracefully
- ❌ **Failure**: Unexpected behavior requiring investigation

##  Debugging Tips

1. **Use headed mode** to see browser interactions:
   ```bash
   npx playwright test --headed
   ```

2. **Use debug mode** for step-by-step execution:
   ```bash
   npx playwright test --debug
   ```

3. **Check test artifacts** in `test-results/` for screenshots and traces
   - `booking-form-before-submission.png` - Form state before submission
   - `all-fields-empty-validation-errors.png` - Full page with validation errors
   - `validation-alert-closeup.png` - Focused view of error messages

4. **View HTML report** for detailed failure analysis:
   ```bash
   npx playwright show-report
   ```

## 🐛 Advanced Debugging Features

This project implements sophisticated debugging capabilities that go far beyond simple `console.log` statements:

### Debugging Tools Available

#### 1. Playwright Trace Viewer
- **Interactive trace analysis** with timeline view
- **Visual step-by-step execution** tracking
- **Network activity monitoring** and request analysis
- **DOM snapshots** at each step
- **Performance metrics** and timing analysis

```bash
# Run tests with tracing
npx playwright test --trace=on

# View traces interactively
npx playwright show-trace test-results/trace.zip
```

#### 2. VS Code Debugger Integration
- **Native debugging support** with breakpoints
- **Step-through execution** with variable inspection
- **Interactive debugging sessions** with call stack analysis
- **Debug configurations** for different scenarios

```bash
# Use F5 in VS Code or run:
# "Debug Playwright Tests" configuration
```

#### 3. Enhanced Error Context Capture
- **Automatic screenshot capture** on failures
- **Full page HTML snapshots** for error analysis
- **Browser console logs** collection
- **Detailed error context** with page state
- **Performance metrics** at error points

#### 4. Debug Service Framework
- **Comprehensive step tracking** with detailed reporting
- **Performance monitoring** for all operations
- **Centralized debug artifact management**
- **Automatic debug report generation**
- **Error context correlation**

#### 5. Test.step() Organization
- **Hierarchical test structure** for better reporting
- **Step-by-step execution tracking** in HTML reports
- **Clear test organization** with logical grouping
- **Enhanced debugging granularity**

### Quick Start Debugging

#### Using Debug Toolkit Scripts
```bash
# Make script executable (first time only)
chmod +x debug-toolkit.sh

# Show all debugging options
./debug-toolkit.sh help

# Run in debug mode (headed, slow motion)
./debug-toolkit.sh debug

# Interactive debugging (step-by-step)
./debug-toolkit.sh interactive

# Full tracing mode
./debug-toolkit.sh trace

# Debug specific test
./debug-toolkit.sh debug-test "Room Booking"

# Code generation for element discovery
./debug-toolkit.sh codegen

# View traces
./debug-toolkit.sh view-traces

# View HTML reports
./debug-toolkit.sh view-report
```

#### Using NPM Scripts
```bash
# Debug mode with headed browser
npm run test:debug

# Interactive step-by-step debugging
npm run test:interactive

# Full tracing with video/screenshots
npm run test:trace

# Headed mode for visual debugging
npm run test:headed

# View HTML reports
npm run report

# Code generation
npm run codegen
```

#### Environment Variables
```bash
export DEBUG_MODE=true    # Enable comprehensive debugging
export PWDEBUG=1         # Enable Playwright debug mode
export HEADED=true       # Run in headed mode
export SLOWMO=1000       # Slow motion delay (ms)
```

### Debug Output Examples

#### Comprehensive Debug Reports
```
================================================================================
📋 DEBUG REPORT: Room Booking Scenario - Advanced Debugging Demo
================================================================================
🎯 Test Result: ✅ PASSED
⏱️  Total Duration: 14672ms
📊 Total Steps: 9
✅ Successful Steps: 9
❌ Failed Steps: 0

📝 Step Summary:
   ✅ Step 1: Navigate to Homepage (1710ms)
   ✅ Step 2: Click Hero Book Now (494ms)
   ✅ Step 3: Select Available Room (2011ms)
   ... detailed step breakdown ...
```

#### Step-by-Step Tracking
```
┌────────────────┬───────────────────────────────────────────────────────────────┐
│ (index)        │ Values                                                        │
├────────────────┼───────────────────────────────────────────────────────────────┤
│ stepNumber     │ 1                                                             │
│ description    │ 'Navigate to the room booking application homepage'           │
│ action         │ 'page.goto("https://automationintesting.online/")'            │
│ expectedResult │ 'Homepage should load successfully with hero section visible' │
│ actualResult   │ 'Step completed successfully'                                 │
│ duration       │ '1710ms'                                                      │
│ pageUrl        │ 'https://automationintesting.online/'                         │
│ success        │ '✅'                                                          │
└────────────────┴───────────────────────────────────────────────────────────────┘
```

#### Performance Monitoring
```
📊 Page loaded in 1582.10ms
🎯 Button text: "Book Now", Enabled: true
💰 Pricing details: Room rate: £100, Cleaning: £25, Service: £15, Total: £140
```

#### Error Context Capture
```
🚨 Error: page.waitForSelector: Timeout 10000ms exceeded
📸 Error Screenshot: test-results/debug/step-3-error.png
📄 HTML Snapshot: test-results/debug/step-3-error.html
🌐 Page URL: https://automationintesting.online/#booking
📱 Viewport: 1280x720
```

### Debug Files and Artifacts

#### Generated Debug Files
- **Traces**: `test-results/trace.zip` - Interactive trace files
- **Screenshots**: `test-results/screenshots/` - Step and error screenshots
- **Videos**: `test-results/videos/` - Test execution recordings
- **HTML Reports**: `playwright-report/index.html` - Comprehensive test reports
- **Debug Reports**: `test-results/debug/` - Detailed debug information
- **Error Context**: `test-results/error-context.md` - Error analysis files

#### Trace Viewer Features
- Timeline visualization of test execution
- Action replay with visual feedback
- Network tab for request analysis
- Console output integration
- DOM snapshot inspection
- Performance metrics overlay

### VS Code Debugging Setup

#### Debug Configurations (`.vscode/launch.json`)
- **Debug Playwright Tests**: Full debugging with breakpoints
- **Debug Current Test File**: Debug the currently open test file
- **Debug Specific Test**: Debug a test by name pattern
- **Run Tests with Full Tracing**: Complete tracing and artifact collection

#### Using VS Code Debugger
1. Set breakpoints in your test code
2. Press `F5` or use "Run and Debug" panel
3. Select appropriate debug configuration
4. Step through code with full variable inspection
5. Use debug console for interactive evaluation

### Best Practices for Debugging

#### 1. Use test.step() for Organization
```typescript
await test.step('User login process', async () => {
  await test.step('Navigate to login page', async () => {
    await page.goto('/login');
  });
  
  await test.step('Enter credentials', async () => {
    await page.fill('#username', 'user');
    await page.fill('#password', 'pass');
  });
});
```

#### 2. Implement Error Context Capture
```typescript
try {
  await expect(element).toBeVisible();
} catch (error) {
  await page.screenshot({ path: 'debug-failure.png' });
  const pageTitle = await page.title();
  const currentUrl = page.url();
  throw new Error(`Element not visible. Page: ${pageTitle}, URL: ${currentUrl}`);
}
```

#### 3. Use Performance Monitoring
```typescript
const { result, duration } = await measurePerformance('Page Load', async () => {
  await page.goto('/complex-page');
  return page.waitForLoadState('networkidle');
});
console.log(`Operation completed in ${duration.toFixed(2)}ms`);
```

#### 4. Leverage Browser Console Integration
```typescript
// Listen to browser console
page.on('console', msg => {
  if (msg.type() === 'error') {
    console.log('Browser error:', msg.text());
  }
});

// Evaluate in browser context
const performanceData = await page.evaluate(() => {
  return window.performance.timing;
});
```

