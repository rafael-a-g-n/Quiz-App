    // src/test/QuestionDisplay.test.ts

    import { runTests, assertEquals } from './testUtils';
    import { JSDOM } from 'jsdom';
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import QuestionDisplay from '../components/QuestionDisplay';

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
      root.render(React.createElement(QuestionDisplay, props));
      return container;
    };

    const tests = {
      'QuestionDisplay renders question text correctly': () => {
        const props = {
          question: 'What is the capital of France?',
          answers: ['Paris', 'London', 'Berlin', 'Rome'],
          correctAnswer: 'Paris',
          onAnswerSelect: () => { },
          isAnswerSelected: false,
          selectedAnswer: null,
          disableAnswers: false,
        };
        const container = renderComponent(props);
        assertEquals(
          container.querySelector('h2')?.textContent,
          'What is the capital of France?',
          'Question text does not match'
        );
        return true;
      },
      'QuestionDisplay renders answer buttons correctly': () => {
        const props = {
          question: 'What is the capital of France?',
          answers: ['Paris', 'London', 'Berlin', 'Rome'],
          correctAnswer: 'Paris',
          onAnswerSelect: () => { },
          isAnswerSelected: false,
          selectedAnswer: null,
          disableAnswers: false,
        };
        const container = renderComponent(props);
        const buttons = container.querySelectorAll('button');
        assertEquals(buttons.length, 4, 'Incorrect number of answer buttons');
        assertEquals(buttons[0].textContent, 'Paris', 'First answer button text does not match');
        return true;
      },
      'QuestionDisplay calls onAnswerSelect when an answer is clicked': () => {
        let selectedAnswer = '';
        const props = {
          question: 'What is the capital of France?',
          answers: ['Paris', 'London', 'Berlin', 'Rome'],
          correctAnswer: 'Paris',
          onAnswerSelect: (answer: string) => {
            selectedAnswer = answer;
          },
          isAnswerSelected: false,
          selectedAnswer: null,
          disableAnswers: false,
        };
        const container = renderComponent(props);
        const buttons = container.querySelectorAll('button');
        (buttons[0] as HTMLButtonElement).click(); // Simulate a click
        assertEquals(selectedAnswer, 'Paris', 'onAnswerSelect was not called with the correct answer');
        return true;
      },
    };

    setupTestEnvironment();
    runTests(tests);
