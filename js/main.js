import { setupLoginModal } from './modal.js';
import './randomArtwork.js';

document.addEventListener('DOMContentLoaded', function () {
  setupLoginModal();

  // Ensure the play button is correctly defined
  const playButton = document.querySelector('.play-button'); // Update this with your correct class or ID for the play button
  const quizContainer = document.querySelector('.quiz-container'); // Ensure .quiz-container exists in HTML

  if (!playButton || !quizContainer) {
    console.error('Play button or quiz container not found!');
    return;
  }

  playButton.addEventListener('click', () => {
    fetch('artInfo.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load art data.');
        return response.json();
      })
      .then((data) => {
        console.log('Data received:', data); // Debugging step

        // Check if data contains the correct structure
        if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
          throw new Error('No artwork data found.');
        }

        // Get random artwork
        const randomArtwork = getRandomArtwork(data);

        // Display the artwork and quiz
        if (randomArtwork) {
          displayArtwork(randomArtwork);
        } else {
          console.error('Failed to get random artwork.');
        }
      })
      .catch((error) => console.error('Error loading JSON:', error));
  });

  // Check the user's answer
  window.checkAnswer = function (questionType, correctAnswer) {
    const userAnswer = document
      .getElementById('answerInput')
      .value.trim()
      .toLowerCase();
    const feedback = document.getElementById('feedback');

    feedback.textContent =
      userAnswer === correctAnswer.toString().toLowerCase()
        ? 'Correct!'
        : `Incorrect. The correct answer was: ${correctAnswer}`;
    feedback.style.color =
      userAnswer === correctAnswer.toString().toLowerCase() ? 'green' : 'red';
  };
});
