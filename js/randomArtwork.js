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

  const modal = document.getElementById('artwork-modal');
  const modalImg = document.getElementById('modal-image');
  const captionText = document.getElementById('caption');
  const closeBtn = document.querySelector('.modal .close');

  container.querySelectorAll('.artwork-image').forEach((img, index) => {
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
      const artwork = artworks[index];
      captionText.innerHTML = `<strong>${artwork.title}</strong> by ${
        artwork.artist_title || 'Unknown'
      }, ${artwork.date_start || 'N/A'}`;
    });
  });

  // Close when clicking the X
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close when clicking outside the modal-body (but not the image or caption)
  modal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal-body')) {
      modal.style.display = 'none';
    }
  });
}
