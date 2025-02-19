    import { runTests, assertEquals } from './testUtils';
    import { JSDOM } from 'jsdom';
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import QuizConfig from '../components/QuizConfig';

    const setupTestEnvironment = () => {
      const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
      (globalThis as any).document = dom.window.document;
      (globalThis as any).window = dom.window;
      (globalThis as any).navigator = dom.window.navigator;
    };

    const renderComponent = (props: any) => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      const root = createRoot(container);
      root.render(React.createElement(QuizConfig, props));
      return container;
    };

    const tests = {
      'QuizConfig renders category dropdown': () => {
        const props = {
          onConfigSubmit: () => {},
          categories: [
            { value: '9', label: 'General Knowledge' },
            { value: '10', label: 'Books' },
          ],
        };
        const container = renderComponent(props);
        const categorySelect = container.querySelector('#category');
        assertEquals(categorySelect !== null, true, 'Category dropdown not found');
        return true;
      },
      'QuizConfig calls onConfigSubmit with correct values': () => {
        let submittedConfig: any = null;
        const props = {
          onConfigSubmit: (config: any) => {
            submittedConfig = config;
          },
          categories: [
            { value: '9', label: 'General Knowledge' },
            { value: '10', label: 'Books' },
          ],
        };
        const container = renderComponent(props);
        const categorySelect = container.querySelector('#category') as HTMLSelectElement;
        const difficultySelect = container.querySelector('#difficulty') as HTMLSelectElement;
        const typeSelect = container.querySelector('#type') as HTMLSelectElement;
        const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;

        // Simulate selecting options
        categorySelect.value = '9';
        difficultySelect.value = 'easy';
        typeSelect.value = 'multiple';

        // Trigger change events
        categorySelect.dispatchEvent(new Event('change', { bubbles: true }));
        difficultySelect.dispatchEvent(new Event('change', { bubbles: true }));
        typeSelect.dispatchEvent(new Event('change', { bubbles: true }));

        submitButton.click();

        assertEquals(submittedConfig.category, '9', 'Category value mismatch');
        assertEquals(submittedConfig.difficulty, 'easy', 'Difficulty value mismatch');
        assertEquals(submittedConfig.type, 'multiple', 'Type value mismatch');
        return true;
      },
    };

    setupTestEnvironment();
    runTests(tests);
