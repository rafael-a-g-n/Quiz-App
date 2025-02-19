    /**
     * Fetches quiz questions from the Open Trivia Database API.
     * @param {number} amount - The number of questions to fetch.
     * @param {string} category - The category of the questions.
     * @param {string} difficulty - The difficulty of the questions.
     * @param {string} type - The type of questions (multiple or boolean).
     * @returns {Promise<any>} - A promise that resolves to the API response data.
     * @throws {Error} - If the API request fails or returns an error.
     */
    export const fetchQuizQuestions = async (
      amount: number,
      category: string,
      difficulty: string,
      type: string
    ): Promise<any> => {
      try {
        const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.response_code !== 0) {
          throw new Error(`API returned error code: ${data.response_code}`);
        }
        return data.results;

      } catch (error:any) {
        console.error("Error fetching quiz questions:", error);
        throw new Error(
          `Failed to fetch quiz questions: ${error.message}`
        ); // Re-throw for handling in component
      }
    };
