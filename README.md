# 🚀 React Quiz Application 🧠

This project is a dynamic and engaging quiz application built using React, showcasing a range of modern web development skills and technologies. It leverages the Open Trivia Database API to provide diverse quiz questions.

## ✨ Features

* **Configurable Quizzes:**
  * 📝 **Category Selection:** Choose from a wide range of categories (Science, History, Sports, etc.).
  * ⚙️ **Difficulty Toggle:** Select Easy, Medium, or Hard difficulty levels.
  * ❓ **Question Type:** Switch between Multiple Choice and True/False questions.
  * ✅ **Form Validation:** Ensures all required fields are selected before starting the quiz.
  * 💾 **Persistent Settings:** Quiz configuration is saved using `localStorage`.
* **Interactive Quiz Interface:**
  * ⏳ **Countdown Timer:** Each question has a 20-second timer.
  * 💯 **Real-time Score:** Track your correct and incorrect answers as you go.
  * 📊 **Progress Indicator:** Visual progress bar showing your current question number.
  * 🎨 **Visual Feedback:** Correct and incorrect answers are highlighted with CSS transitions.
  * 📱 **Responsive Design:** Works seamlessly on both mobile and desktop devices.
* **Score Tracking and Results:**
  * 🏆 **Final Score:** Calculates your score percentage at the end of the quiz.
  * 📈 **Performance Breakdown:** Detailed statistics on correct and incorrect answers.
  * 🔄 **Retry Option:** Restart the quiz with the same settings.
  * 🥇 **High Score Persistence:** Your highest score is saved using `localStorage`.
* **Robust Development Practices:**
  * 🧩 **Modular Architecture:** Components are separated for reusability and maintainability.
  * 🛡️ **Error Handling:** API requests and component rendering are handled gracefully with error boundaries.
  * 📝 **PropTypes Validation:** Component props are validated for type safety.
  * 📖 **JSDoc Comments:** API functions are documented.
  * 🎨 **CSS Modules:** Scoped styling for better organization and maintainability.
  * 🧪 **Unit Tests:** Basic unit tests included for critical components (using a custom testing framework due to WebContainer limitations).

## 🛠️ Technologies Used

* **Frontend:**
  * ⚛️ **React (v18+):** Functional components and Hooks for state management.
  * 🌐 **HTML5:** Semantic markup for structure.
  * 🎨 **CSS3:** Styling with CSS Modules and Tailwind CSS.
  * 🌙 **Tailwind CSS:** Utility-first CSS framework for rapid styling.
  * <img src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg" alt="TypeScript" width="25" height="25" /> **TypeScript:** Static typing for improved code quality and maintainability.
  * ✨ **Lucide React:** For elegant and accessible icons.
* **API:**
  * 📚 **Open Trivia Database API:** Provides quiz questions.
* **State Management:**
  * 🔄 **React Context API:** (Implicitly used through Hooks)
  * 💾 **`localStorage`:** For persisting quiz settings and high scores.
* **Build Tools:**
  * 📦 **Vite:** Fast and efficient build tool and development server.
  * <img src="https://profilinator.rishav.dev/skills-assets/npm-original-wordmark.svg" alt="NPM" width="35" height="25" /> **npm:** Package manager.
* **Testing:**
  * 🧪 **Custom Testing Framework:** (Due to WebContainer limitations) Basic unit tests for `QuestionDisplay`, `QuizConfig`, and `fetchQuizQuestions`.
  * **jsdom:** Used for simulating a browser environment for testing.
* **Code Quality:**
  * **ESLint:** Configured with recommended rules and React Hooks plugin.

## 💻 Skills Demonstrated

* **React Development:** Proficiency in building interactive UIs with React, including functional components, hooks (`useState`, `useEffect`, `useCallback`), and component composition.
* **TypeScript Proficiency:** Using TypeScript to enhance code quality, readability, and maintainability.
* **API Integration:** Fetching data from external APIs (Open Trivia Database) and handling asynchronous operations.
* **State Management:** Effectively managing application state using React's built-in hooks.
* **CSS Styling:** Creating visually appealing and responsive designs using CSS Modules and Tailwind CSS.
* **Error Handling:** Implementing robust error handling to provide a smooth user experience.
* **Testing:** Writing unit tests to ensure code reliability.
* **Web Development Best Practices:** Following modular architecture, code organization, and accessibility principles.

## 🚀 Getting Started

1. **Clone the repository:**

    ```bash
    git clone <repository_url>  # Replace with the actual repository URL
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run dev
    ```

4. **Run Tests (Limited Support):**

    ```bash
    node src/test/triviaApi.test.ts
    node src/test/QuestionDisplay.test.ts
    node src/test/QuizConfig.test.ts
    ```
    Note: Due to WebContainer limitations, standard testing libraries are not available. A custom testing framework is used for demonstration.

## 🤝 Connect with Me

Feel free to connect with me on LinkedIn:

[<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/ragn/) **Rafael Nogueira**

---
