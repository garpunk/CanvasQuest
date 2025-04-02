export function generateQuizTemplate(artwork) {
  return `
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
