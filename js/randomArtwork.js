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

  container.innerHTML = '';

  const modal = document.getElementById('artwork-modal');
  const modalImg = document.getElementById('modal-image');
  const captionText = document.getElementById('caption');
  const closeBtn = document.querySelector('.modal-gallery .close');

  artworks.forEach((artwork) => {
    const artworkElement = document.createElement('div');
    artworkElement.classList.add('artwork-item');

    const imageUrl = artwork.image_id
      ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
      : 'placeholder.jpg';

    artworkElement.innerHTML = `
      <img 
        src="${imageUrl}" 
        alt="${artwork.title}" 
        class="artwork-image" 
        data-id="${artwork.id}">
      <p class="artwork-title"><strong>Title:</strong> ${artwork.title}</p>
      <p class="artwork-artist"><strong>Artist:</strong> ${
        artwork.artist_title || artwork.artist_display
      }</p>
      <p class="artwork-year"><strong>Year:</strong> ${artwork.date_start}</p>
    `;

    container.appendChild(artworkElement);
  });

  // Modal open function
  function openModalWithArtwork(artwork) {
    modal.style.display = 'block';
    modalImg.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
    captionText.innerHTML = `<strong>${artwork.title}</strong> by ${
      artwork.artist_title || 'Unknown'
    }, ${artwork.date_start || 'N/A'}`;

    // Push to URL
    const newUrl = `${window.location.pathname}?image=${artwork.id}`;
    history.pushState({}, '', newUrl);
  }

  // Modal close function
  function closeModal() {
    modal.style.display = 'none';
    modalImg.src = '';
    captionText.innerHTML = '';

    // Remove query parameter
    const baseUrl = window.location.pathname;
    history.pushState({}, '', baseUrl);
  }

  // Image click listener
  container.querySelectorAll('.artwork-image').forEach((img) => {
    img.addEventListener('click', () => {
      const id = parseInt(img.dataset.id);
      const artwork = artworks.find((a) => a.id === id);
      if (artwork) openModalWithArtwork(artwork);
    });
  });

  // Close when clicking the X
  closeBtn.addEventListener('click', closeModal);

  // Close when clicking outside modal body
  modal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal-body')) {
      closeModal();
    }
  });

  // If URL contains ?image=ID, open that artwork in modal
  const params = new URLSearchParams(window.location.search);
  const imageIdFromUrl = parseInt(params.get('image'));
  if (imageIdFromUrl) {
    const matchingArtwork = artworks.find((a) => a.id === imageIdFromUrl);
    if (matchingArtwork) {
      openModalWithArtwork(matchingArtwork);
    }
  }
}
