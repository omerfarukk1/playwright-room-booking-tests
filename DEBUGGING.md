# Advanced Debugging Guide for Playwright Tests

This guide demonstrates how to move beyond simple `console.log` statements and leverage advanced debugging tools for more effective troubleshooting and development.

## 🎯 Debugging Approaches Implemented

### 1. Playwright Trace Viewer
**What it is:** Interactive trace viewer for step-by-step test execution analysis
**How to use:**
```bash
# Run tests with tracing enabled
npx playwright test --trace=on

# View the trace
npx playwright show-trace test-results/trace.zip
```

**Benefits:**
- Visual timeline of test execution
- Screenshots at each step
- Network activity monitoring
- DOM snapshots
- Action recording and playback

### 2. VS Code Debugger Integration
**What it is:** Native VS Code debugging support with breakpoints
**How to use:**
1. Set breakpoints in your test code
2. Press `F5` or use "Run and Debug" panel
3. Select "Debug Playwright Tests" configuration
4. Step through code line by line

**Benefits:**
- Interactive debugging with breakpoints
- Variable inspection
- Call stack analysis
- Conditional breakpoints

### 3. Enhanced Error Context Capture
**What it is:** Comprehensive error information collection
**Implementation:**
```typescript
catch (error) {
  // Capture additional context
  const currentUrl = page.url();
  const pageTitle = await page.title();
  
  // Take error screenshot
  await page.screenshot({ 
    path: `test-results/debug-error-${Date.now()}.png`,
    fullPage: true 
  });
  
  throw new Error(`Enhanced error: ${error}. Context: URL=${currentUrl}, Title=${pageTitle}`);
}
```

### 4. Test.step() for Organized Reporting
**What it is:** Playwright's built-in step tracking for better test organization
**Implementation:**
```typescript
await test.step('Verify booking confirmation', async () => {
  const confirmation = page.getByText('Booking Confirmed');
  await expect(confirmation).toBeVisible();
});
```

**Benefits:**
- Clear test structure in reports
- Step-by-step execution tracking
- Better error isolation
- Enhanced HTML report readability

### 5. Performance Monitoring
**What it is:** Built-in performance measurement for test operations
**Implementation:**
```typescript
const { result, duration } = await measurePerformance('Page Load', async () => {
  await page.goto('https://example.com');
  return page.waitForLoadState('networkidle');
});
```

### 6. Debug Service Integration
**What it is:** Centralized debugging service for comprehensive test monitoring
**Features:**
- Automatic screenshot capture on errors
- Step-by-step execution tracking
- Performance metrics collection
- Trace file management
- Debug report generation

## 🛠️ Available Debugging Tools

### Command Line Tools
```bash
# Interactive debugging (step-by-step)
npx playwright test --debug

# Headed mode with slow motion
npx playwright test --headed --slowmo=1000

# Generate code by recording actions
npx playwright codegen https://automationintesting.online/

# Run with full tracing
npx playwright test --trace=on --video=on --screenshot=on

# View HTML report
npx playwright show-report

# View specific trace
npx playwright show-trace test-results/trace.zip
```

### Debug Toolkit Script
```bash
# Use the provided debug toolkit
./debug-toolkit.sh help                    # Show all options
./debug-toolkit.sh debug                   # Run in debug mode
./debug-toolkit.sh interactive             # Interactive debugging
./debug-toolkit.sh trace                   # Full tracing mode
./debug-toolkit.sh debug-test "Room Booking" # Debug specific test
./debug-toolkit.sh codegen                 # Code generation
./debug-toolkit.sh view-traces             # View latest trace
./debug-toolkit.sh setup                   # Setup debug environment
```

### VS Code Integration
1. **Launch Configurations** (`.vscode/launch.json`):
   - Debug Playwright Tests
   - Debug Current Test File
   - Debug Specific Test
   - Run Tests with Full Tracing

2. **Debugging Features**:
   - Set breakpoints in test files
   - Step through code execution
   - Inspect variables and page state
   - Interactive console evaluation

## 🎬 Trace Viewer Features

### Navigation
- **Timeline**: Visual representation of test execution
- **Actions**: Step-by-step action log
- **Screenshots**: Visual state at each step
- **Console**: Browser console output
- **Network**: HTTP requests and responses
- **Source**: Test code with execution indicators

### Analysis Capabilities
- **Performance metrics**: Load times, action durations
- **Network analysis**: Failed requests, slow responses
- **DOM inspection**: Element states and changes
- **Error correlation**: Link errors to specific actions

## 🔧 Environment Configuration

### Debug Mode Environment Variables
```bash
export DEBUG_MODE=true        # Enable comprehensive debugging
export PWDEBUG=1             # Enable Playwright debug mode
export HEADED=true           # Run in headed mode
export SLOWMO=1000           # Slow motion delay (ms)
```

### Playwright Configuration
```typescript
// playwright.config.ts
use: {
  trace: process.env.DEBUG_MODE === 'true' ? 'on' : 'on-first-retry',
  screenshot: process.env.DEBUG_MODE === 'true' ? 'on' : 'only-on-failure',
  video: process.env.DEBUG_MODE === 'true' ? 'on' : 'retain-on-failure',
  headless: process.env.DEBUG_MODE === 'true' ? false : true,
  launchOptions: {
    slowMo: process.env.DEBUG_MODE === 'true' ? 1000 : 0,
  }
}
```

## 📊 Debug Reports and Artifacts

### Generated Files
- **Traces**: `test-results/trace.zip` - Interactive trace files
- **Screenshots**: `test-results/screenshots/` - Error and step screenshots
- **Videos**: `test-results/videos/` - Test execution recordings
- **HTML Report**: `playwright-report/index.html` - Comprehensive test report
- **Debug Logs**: `test-results/debug/` - Detailed debug information

### Report Features
- Test execution timeline
- Step-by-step breakdown
- Error context and screenshots
- Performance metrics
- Network activity logs
- Console output capture

## 🎯 Best Practices

### 1. Use test.step() for Organization
```typescript
await test.step('Login process', async () => {
  await test.step('Navigate to login page', async () => {
    await page.goto('/login');
  });
  
  await test.step('Enter credentials', async () => {
    await page.fill('#username', 'user');
    await page.fill('#password', 'pass');
  });
  
  await test.step('Submit form', async () => {
    await page.click('#login-button');
  });
});
```

### 2. Capture Context on Failures
```typescript
try {
  await expect(element).toBeVisible();
} catch (error) {
  // Capture debug context
  await page.screenshot({ path: 'debug-failure.png' });
  const html = await page.content();
  console.log('Page HTML at failure:', html.substring(0, 1000));
  throw error;
}
```

### 3. Use Performance Monitoring
```typescript
const startTime = Date.now();
await page.goto('/complex-page');
const loadTime = Date.now() - startTime;
console.log(`Page loaded in ${loadTime}ms`);
```

### 4. Leverage Browser Console
```typescript
// Listen to console events
page.on('console', msg => {
  if (msg.type() === 'error') {
    console.log('Browser error:', msg.text());
  }
});

// Evaluate JavaScript in browser context
const result = await page.evaluate(() => {
  return window.performance.timing;
});
```

## 🚀 Quick Start Guide

1. **Setup Debug Environment**:
   ```bash
   ./debug-toolkit.sh setup
   ```

2. **Run Test in Debug Mode**:
   ```bash
   ./debug-toolkit.sh debug tests/room-booking.spec.ts
   ```

3. **View Results**:
   ```bash
   ./debug-toolkit.sh view-traces
   ./debug-toolkit.sh view-report
   ```

4. **VS Code Debugging**:
   - Open test file in VS Code
   - Set breakpoints
   - Press F5
   - Select "Debug Playwright Tests"

## 📝 Debugging Checklist

- [ ] Enable tracing for comprehensive analysis
- [ ] Use test.step() for better organization
- [ ] Capture screenshots on failures
- [ ] Monitor performance metrics
- [ ] Use VS Code debugger for interactive debugging
- [ ] Leverage console output analysis
- [ ] Generate and review HTML reports
- [ ] Use code generation for element discovery
- [ ] Implement proper error context capture
- [ ] Organize debug artifacts systematically

This approach provides much more insight than simple console.log statements and enables efficient troubleshooting and test development.
