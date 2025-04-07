document.addEventListener('DOMContentLoaded', () => {
  fetch('artInfo.json')
    .then((response) => response.json())
    .then((data) => {
      const validIds = [
        206990, 144828, 206992, 160032, 14620, 18579, 15857, 20684, 21954,
        21893,
      ];

      const filteredArtworks = data.data.filter((art) =>
        validIds.includes(art.id)
      );

      if (filteredArtworks.length === 0) {
        console.error('No valid artworks found.');
        return;
      }

      const slideshow = document.getElementById('art-slideshow');

      // Generate slides
      filteredArtworks.forEach((art) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        slide.innerHTML = `
              <img src="https://www.artic.edu/iiif/2/${
                art.image_id
              }/full/843,/0/default.jpg" 
                  alt="${art.title}" class="slide-image">

              <div class="slide-info">
                <h2>${art.title}</h2>
                <p><strong>Date:</strong> ${art.date_display || 'Unknown'}</p>
                <p><strong>Artist:</strong> ${
                  art.artist_display || 'Unknown'
                }</p>
                <p><strong>Origin:</strong> ${
                  art.place_of_origin || 'Unknown'
                }</p>
                <p><strong>Description:</strong> ${
                  art.description || 'No description available'
                }</p>
              </div>
            `;
        slideshow.appendChild(slide);
      });

      startSlideshow();
    })
    .catch((error) => console.error('Error loading JSON:', error));
});

let slideIndex = 0;

function startSlideshow() {
  const slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;

  slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? 'block' : 'none'; // Show only the first slide
  });

  slides[slideIndex].classList.add('active');
}

function changeSlide(step) {
  const slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;

  slides[slideIndex].style.display = 'none'; // Hide current slide
  slideIndex = (slideIndex + step + slides.length) % slides.length; // Update index
  slides[slideIndex].style.display = 'block'; // Show new slide
}

// Attach event listeners dynamically to buttons
document.querySelectorAll('.prev, .next').forEach((button) => {
  button.addEventListener('click', (event) => {
    const step = parseInt(event.target.getAttribute('data-direction'));
    changeSlide(step);
  });
});
