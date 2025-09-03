# Room Booking Automation Tests

This project contains automated UI tests for the room booking functionality on the [Automation in Testing](https://aut## 🏗️ Project Structure

```
typescript/
├── package.json                 # Project dependencies and scripts
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json              # TypeScript configuration
├── index.ts                   # Main exports for easy imports
├── pages/                     # Page Object Model classes
│   ├── HomePage.ts           # Homepage interactions
│   ├── RoomsPage.ts          # Room selection page
│   ├── ReservationPage.ts    # Reservation and pricing page
│   ├── BookingFormPage.ts    # Booking form interactions
│   └── ConfirmationPage.ts   # Confirmation/error handling
├── helpers/                   # Reusable test helpers
│   └── BookingFlowHelper.ts  # Common booking flow actions
├── data/                     # Test data management
│   └── TestData.ts          # Centralized test data constants
├── fixtures/                 # Test fixtures and setup
│   └── test-fixtures.ts     # Page object fixtures
├── tests/                    # Test files
│   ├── room-booking.spec.ts          # Original tests
│   └── room-booking-refactored.spec.ts # Best practices implementation
├── test-results/             # Test execution artifacts
├── playwright-report/        # HTML test reports
└── README.md                 # This file
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

##  Contributing

1. Follow the existing code style and patterns
2. Add appropriate wait conditions for dynamic content
3. Include descriptive test names and comments
4. Test across all supported browsers before submitting

## 🎯 **Best Practices Improvements**

### **Before vs After Comparison**

#### **🔴 Original Implementation Issues**
- **No Page Object Model**: UI elements scattered throughout tests
- **Code Duplication**: Repeated navigation and setup code
- **Hard-coded Values**: Test data mixed with test logic  
- **Poor Maintainability**: UI changes require multiple test updates
- **Unclear Test Structure**: Missing AAA pattern organization

#### **✅ Refactored Implementation Benefits**
- **Page Object Model**: Centralized UI element management
- **DRY Principles**: Reusable helper classes and common flows
- **Centralized Test Data**: Easy maintenance and updates
- **Clear Architecture**: Separated concerns and modular design
- **AAA Pattern**: Well-organized test structure
- **Type Safety**: Full TypeScript implementation with interfaces

### **Key Improvements**

#### **1. Page Object Model Implementation**
```typescript
// Before: Direct page interactions in tests
await page.getByRole('link', { name: /book now/i }).first().click();

// After: Encapsulated in page objects
await homePage.clickHeroBookNow();
```

#### **2. DRY Principles Application**
```typescript
// Before: Repeated navigation code in each test
// ... duplicated 20+ lines in every test

// After: Reusable helper method
await bookingHelper.navigateToBookingForm();
```

#### **3. Centralized Test Data**
```typescript
// Before: Hard-coded values
await page.getByRole('button', { name: '01' }).first().click();

// After: Centralized constants
await reservationPage.selectDates(TestData.DATES.CHECK_IN, TestData.DATES.CHECK_OUT);
```

#### **4. AAA Pattern Implementation**
```typescript
// Arrange: Set up test data and objects
const bookingHelper = new BookingFlowHelper(homePage, roomsPage, reservationPage, bookingFormPage);
const validationData = TestData.EMPTY_EMAIL;

// Act: Perform test actions  
await bookingHelper.performValidationTest(validationData, expectedMessages, 'email-test');

// Assert: Verify outcomes
await bookingFormPage.verifyValidationAlert();
```

