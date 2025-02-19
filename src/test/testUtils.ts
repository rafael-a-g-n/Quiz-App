    // src/test/testUtils.ts
    type TestResult = {
      success: boolean;
      message: string;
    };

    export const runTests = (tests: Record<string, () => boolean>): void => {
      const results: Record<string, TestResult> = {};
      let totalTests = 0;
      let passedTests = 0;

      for (const testName in tests) {
        totalTests++;
        try {
          const success = tests[testName]();
          results[testName] = { success, message: success ? 'Passed' : 'Failed' };
          if (success) passedTests++;
        } catch (error: any) {
          results[testName] = { success: false, message: error.message };
        }
      }

      console.log(`Ran ${totalTests} tests. Passed: ${passedTests}, Failed: ${totalTests - passedTests}`);
      for (const testName in results) {
        const { success, message } = results[testName];
        console.log(`${testName}: ${success ? '✅' : '❌'} - ${message}`);
      }
    };

    export const assertEquals = (actual: any, expected: any, message: string) => {
      if (actual !== expected) {
        throw new Error(`${message}. Expected: ${expected}, Actual: ${actual}`);
      }
      return true;
    };

    export const assertThrows = (fn: () => any, message: string) => {
      try {
        fn();
        throw new Error(`${message}. Expected an error to be thrown, but no error was thrown.`);
      } catch (error) {
        // Expected behavior
        return true;
      }
    }
