// randomArtwork.js

document.addEventListener('DOMContentLoaded', () => {
  fetch('artInfo.json')
    .then((response) => response.json())
    .then((data) => {
      // Fetch artworks by valid IDs
      if (
        data &&
        data.data &&
        Array.isArray(data.data) &&
        data.data.length > 0
      ) {
        const artworksToDisplay = getArtworksByIds(data, validIds);
        displayArtworks(artworksToDisplay);
      } else {
        console.error('No valid artwork data found.');
      }
    })
    .catch((error) => console.error('Error loading artwork data:', error));
});

// List of valid artwork IDs to fetch specific pieces
const validIds = [
  206990, 144828, 206992, 14620, 18579, 15857, 20684, 21954, 21893,
];

// Function to get artworks by their IDs
function getArtworksByIds(data, ids) {
  return data.data.filter((artwork) => ids.includes(artwork.id));
}

// Function to display artworks in a row
function displayArtworks(artworks) {
  const container = document.querySelector('.artwork-row');
  if (!container) {
    console.error('Artwork container not found.');
    return;
  }

  // Clear the container first to avoid duplicates
  container.innerHTML = '';

  artworks.forEach((artwork) => {
    const artworkElement = document.createElement('div');
    artworkElement.classList.add('artwork-item');

    // Create the HTML for each artwork
    artworkElement.innerHTML = `
      <img src="${
        artwork.image_id
          ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
          : 'placeholder.jpg'
      }" alt="${artwork.title}" class="artwork-image">
      <p class="artwork-title"><strong>Title:</strong> ${artwork.title}</p>
      <p class="artwork-artist"><strong>Artist:</strong> ${
        artwork.artist_title || artwork.artist_display
      }</p>
      <p class="artwork-year"><strong>Year:</strong> ${artwork.date_start}</p>
    `;

    // Append the artwork element to the container
    container.appendChild(artworkElement);
  });
}
