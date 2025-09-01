# Room Booking Automation Tests

This project contains automated UI tests for the room booking functionality on the [Automation in Testing](https://automationintesting.online/) website using Playwright with TypeScript.

## Project Overview

The test suite covers the complete room booking workflow including:
- Navigation and room selection
- Date selection and price validation
- Form submission and validation
- Error handling scenarios

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

#### Run tests for specific browser:
```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit (Safari) only
npx playwright test --project=webkit
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

## Test Cases

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

