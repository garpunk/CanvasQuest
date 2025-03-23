document.addEventListener('DOMContentLoaded', () => {
  const quizContainer = document.querySelector('.quiz-container');
  const playButton = document.querySelector('.play-button');

  playButton.addEventListener('click', () => {
    fetch('artInfo.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load art data.');
        return response.json();
      })
      .then((data) => {
        console.log('Data received:', data); // Debugging step

        // Check if data contains the 'artworks' key
        if (
          !data.artworks ||
          !Array.isArray(data.artworks) ||
          data.artworks.length === 0
        ) {
          throw new Error('No artwork data found.');
        }

        // Pick a random artwork
        const randomIndex = Math.floor(Math.random() * data.artworks.length);
        const artwork = data.artworks[randomIndex];

        // Extract information
        const title = artwork.title || 'Unknown Title';
        const artist = artwork.artist_title || 'Unknown Artist';
        const date = artwork.date_display || 'Unknown Date';
        const imageUrl = artwork.image_id
          ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
          : 'images/img-placeholder.jpg';

        // Populate the quiz-container div
        quizContainer.innerHTML = `
          <img src="${imageUrl}" alt="${title}" style="max-width:100%; height:auto;">
          <h2>${title}</h2>
          <p><strong>Artist:</strong> ${artist}</p>
          <p><strong>Date:</strong> ${date}</p>
        `;
      })
      .catch((error) => console.error('Error loading JSON:', error));
  });
});
