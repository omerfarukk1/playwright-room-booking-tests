#!/bin/bash

# Advanced Debugging Scripts for Playwright Tests
# These scripts provide easy access to different debugging modes

echo "🎭 Playwright Advanced Debugging Toolkit"
echo "========================================"

# Function to show available debugging options
show_debug_options() {
    echo ""
    echo "Available debugging options:"
    echo ""
    echo "1. 🐛 Debug Mode (Headed, Slow Motion)"
    echo "   DEBUG_MODE=true npx playwright test"
    echo ""
    echo "2. 🎬 Interactive Debug (Step-by-step)"
    echo "   npx playwright test --debug"
    echo ""
    echo "3. 📹 Full Tracing Mode"
    echo "   npx playwright test --trace=on --video=on --screenshot=on"
    echo ""
    echo "4. 🎯 Debug Specific Test"
    echo "   npx playwright test --grep 'test-name' --debug"
    echo ""
    echo "5. 🔍 Code Generation"
    echo "   npx playwright codegen https://automationintesting.online/"
    echo ""
    echo "6. 👀 View Trace"
    echo "   npx playwright show-trace test-results/debug/*/trace.zip"
    echo ""
    echo "7. 📊 View HTML Report"
    echo "   npx playwright show-report"
    echo ""
}

# Function to run debug mode
run_debug_mode() {
    echo "🐛 Starting Debug Mode (Headed, Slow Motion)..."
    DEBUG_MODE=true npx playwright test "$@"
}

# Function to run interactive debug
run_interactive_debug() {
    echo "🎬 Starting Interactive Debug Mode..."
    npx playwright test --debug "$@"
}

# Function to run with full tracing
run_full_trace() {
    echo "📹 Starting Full Tracing Mode..."
    npx playwright test --trace=on --video=on --screenshot=on "$@"
}

# Function to debug specific test
debug_specific_test() {
    if [ -z "$1" ]; then
        echo "❌ Please provide a test name to debug"
        echo "Usage: $0 debug-test 'Room Booking'"
        exit 1
    fi
    echo "🎯 Debugging specific test: $1"
    npx playwright test --grep "$1" --debug
}

# Function to generate code
generate_code() {
    echo "🔍 Starting Code Generation..."
    npx playwright codegen https://automationintesting.online/
}

# Function to view traces
view_traces() {
    echo "👀 Opening Trace Viewer..."
    
    # Find the most recent trace file
    TRACE_FILE=$(find test-results -name "trace.zip" -type f -print0 | xargs -0 ls -t | head -n 1)
    
    if [ -z "$TRACE_FILE" ]; then
        echo "❌ No trace files found. Run tests with tracing enabled first."
        echo "   Try: $0 trace"
        exit 1
    fi
    
    echo "📁 Opening trace: $TRACE_FILE"
    npx playwright show-trace "$TRACE_FILE"
}

# Function to view HTML report
view_report() {
    echo "📊 Opening HTML Report..."
    npx playwright show-report
}

# Function to setup debugging environment
setup_debug_env() {
    echo "🔧 Setting up debugging environment..."
    
    # Create debug directories
    mkdir -p test-results/debug
    mkdir -p test-results/screenshots
    mkdir -p test-results/videos
    mkdir -p test-results/traces
    
    echo "✅ Debug directories created"
    
    # Set environment variables for debugging
    export DEBUG_MODE=true
    export PWDEBUG=1
    
    echo "✅ Debug environment variables set"
    echo ""
    echo "🎉 Debugging environment ready!"
    echo "   Use VS Code debugging (F5) or run scripts with debug options"
}

# Function to clean debug files
clean_debug_files() {
    echo "🧹 Cleaning debug files..."
    rm -rf test-results/debug/*
    rm -rf test-results/screenshots/*
    rm -rf test-results/videos/*
    rm -rf test-results/traces/*
    echo "✅ Debug files cleaned"
}

# Main script logic
case "$1" in
    "help"|"--help"|"-h"|"")
        show_debug_options
        echo ""
        echo "Script Usage:"
        echo "  $0 debug [test-file]     # Run in debug mode"
        echo "  $0 interactive [test]    # Run interactive debug"
        echo "  $0 trace [test-file]     # Run with full tracing"
        echo "  $0 debug-test 'name'     # Debug specific test"
        echo "  $0 codegen              # Generate code"
        echo "  $0 view-traces          # View latest trace"
        echo "  $0 view-report          # View HTML report"
        echo "  $0 setup                # Setup debug environment"
        echo "  $0 clean                # Clean debug files"
        ;;
    "debug")
        shift
        run_debug_mode "$@"
        ;;
    "interactive")
        shift
        run_interactive_debug "$@"
        ;;
    "trace")
        shift
        run_full_trace "$@"
        ;;
    "debug-test")
        debug_specific_test "$2"
        ;;
    "codegen")
        generate_code
        ;;
    "view-traces")
        view_traces
        ;;
    "view-report")
        view_report
        ;;
    "setup")
        setup_debug_env
        ;;
    "clean")
        clean_debug_files
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo "Use '$0 help' to see available options"
        exit 1
        ;;
esac
