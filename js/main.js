import { setupLoginModal } from './modal.js';
import { getRandomArtwork } from './randomArtwork.js'; // Ensure the path is correct
import { fetchArtworkData } from './artworkFetcher.js'; // Assuming this is correctly set up, but not used here
import { generateQuizTemplate } from './quizTemplate.js'; // Assuming this is correctly set up, but not used here
import './slideshow.js';

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

  // Display the artwork and the quiz
  function displayArtwork(artwork) {
    if (!quizContainer) return;

    quizContainer.innerHTML = `
      <h2>Guess the ${artwork.questionType} of this artwork!</h2>
      <img src="${artwork.imageUrl || 'placeholder.jpg'}" alt="${
      artwork.title
    }" class="artwork-image">
      <p><strong>Title:</strong> ${artwork.title}</p>
      <input type="text" id="answerInput" placeholder="Enter your answer...">
      <button onclick="checkAnswer('${artwork.questionType}', '${
      artwork[artwork.questionType]
    }')">Submit</button>
      <p id="feedback"></p>
    `;
  }

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
