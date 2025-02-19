    // src/test/triviaApi.test.ts
    import { fetchQuizQuestions } from '../api/triviaApi';
    import { runTests, assertThrows, assertEquals } from './testUtils';

    const mockFetch = (response: any, ok: boolean = true) => {
      (globalThis as any).fetch = jest.fn(() =>
        Promise.resolve({
          ok,
          json: () => Promise.resolve(response),
          status: ok ? 200 : 500,
        })
      );
    };


    const tests = {
      'fetchQuizQuestions should return questions on success': async () => {
          const mockData = { response_code: 0, results: [{ question: 'What is 2 + 2?', correct_answer: '4' }] };
          mockFetch(mockData);
          const questions = await fetchQuizQuestions(1, '9', 'easy', 'multiple');
          assertEquals(questions[0].question, 'What is 2 + 2?', 'Question mismatch');
          return true;
      },
      'fetchQuizQuestions should throw error on API failure': async () => {
          mockFetch({}, false); // Simulate a failed fetch
          await assertThrows(
            () => fetchQuizQuestions(1, '9', 'easy', 'multiple'),
            'API request failed'
          );
          return true;
      },
      'fetchQuizQuestions should throw error on non-zero response code': async () => {
          const mockData = { response_code: 1, results: [] };
          mockFetch(mockData);
          await assertThrows(
            () => fetchQuizQuestions(1, '9', 'easy', 'multiple'),
            'API returned error code'
          );
          return true;
      },
    };

    // Mock the fetch function for testing in Node.js environment
    (globalThis as any).fetch = (url: string) => {
      if (url.startsWith('https://opentdb.com/api.php')) {
        // Simulate a successful response
        if (url.includes('response_code=1')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ response_code: 1, results: [] }),
            status: 200
          });
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ response_code: 0, results: [{ question: 'Mock Question', correct_answer: 'Mock Answer' }] }),
          status: 200
        });
      } else {
        // Simulate a failed response
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve({}),
          status: 500
        });
      }
    };

    runTests(tests);
