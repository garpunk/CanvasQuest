document.addEventListener('DOMContentLoaded', () => {
  // Extract URL parameters from the current page's URL
  const urlParams = new URLSearchParams(window.location.search);
  const artworkId = urlParams.get('id'); // Get the "id" parameter

  if (artworkId) {
    // If an ID is passed, fetch the artwork with that ID
    fetch('artInfo.json') // Ensure the JSON file is accessible
      .then((response) => response.json())
      .then((jsonData) => {
        const artwork = getArtworkById(jsonData, artworkId);
        if (artwork) {
          displayArtwork(artwork);
        } else {
          console.error('No valid artwork found with the provided ID.');
          // Optionally, fall back to random artwork if ID is not found
          const fallbackArtwork = getRandomArtwork(jsonData);
          displayArtwork(fallbackArtwork);
        }
      })
      .catch((error) => console.error('Error loading JSON:', error));
  } else {
    // If no ID is passed in the URL, show random artwork
    fetch('artInfo.json')
      .then((response) => response.json())
      .then((jsonData) => {
        const artwork = getRandomArtwork(jsonData);
        if (artwork) {
          displayArtwork(artwork);
        } else {
          console.error('No valid artwork found.');
        }
      })
      .catch((error) => console.error('Error loading JSON:', error));
  }
});

// Fetch artwork by ID from the list
function getArtworkById(data, id) {
  const artwork = data.data.find((art) => art.id === parseInt(id)); // Match by ID
  if (!artwork) return null;

  return {
    id: artwork.id,
    title: artwork.title,
    artist: artwork.artist_title || artwork.artist_display,
    year: artwork.date_start,
    imageUrl: artwork.image_id
      ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
      : null,
    questionType: getRandomQuestionType(),
  };
}

// List of valid artwork IDs for random selection
const validIds = [
  206990, 144828, 206992, 160032, 14620, 18579, 15857, 20684, 21954, 21893,
];

// Function to get random artwork from valid IDs
export function getRandomArtwork(data) {
  if (!data || !data.data || data.data.length === 0) {
    console.error('No artwork data available.');
    return null;
  }

  // Filter artworks to only include those in validIds
  const filteredArtworks = data.data.filter((artwork) =>
    validIds.includes(artwork.id)
  );

  if (filteredArtworks.length === 0) {
    console.error('No valid artworks found in the dataset.');
    return null;
  }

  // Pick a random artwork from the filtered list
  const randomIndex = Math.floor(Math.random() * filteredArtworks.length);
  const artwork = filteredArtworks[randomIndex];

  return {
    id: artwork.id,
    title: artwork.title,
    artist: artwork.artist_title || artwork.artist_display,
    year: artwork.date_start,
    imageUrl: artwork.image_id
      ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
      : null,
    questionType: getRandomQuestionType(),
  };
}

// Random question type (year, artist, or style)
export function getRandomQuestionType() {
  const questions = ['year', 'artist', 'style'];
  return questions[Math.floor(Math.random() * questions.length)];
}

// Display the artwork and the quiz
function displayArtwork(artwork) {
  const container = document.querySelector('.quiz-container');
  if (!container) {
    console.error('Quiz container not found.');
    return;
  }

  container.innerHTML = `
            <h2 class="artwork-question">Guess the ${
              artwork.questionType
            } of this artwork!</h2>
            <img src="${artwork.imageUrl || 'placeholder.jpg'}" alt="${
    artwork.title
  }" class="artwork-image">
            <p class="artwork-title"><strong>Title:</strong> ${
              artwork.title
            }</p>
            <input type="text" id="answerInput" placeholder="Enter your answer...">
            <button onclick="checkAnswer('${artwork.questionType}', '${
    artwork[artwork.questionType]
  }')">Submit</button>
            <p id="feedback"></p>
        `;
}

// Check the user's answer
function checkAnswer(questionType, correctAnswer) {
  const userAnswer = document
    .getElementById('answerInput')
    .value.trim()
    .toLowerCase();
  const feedback = document.getElementById('feedback');

  if (userAnswer === correctAnswer.toString().toLowerCase()) {
    feedback.textContent = 'Correct!';
    feedback.style.color = 'green';
  } else {
    feedback.textContent = `Incorrect. The correct answer was: ${correctAnswer}`;
    feedback.style.color = 'red';
  }
}
