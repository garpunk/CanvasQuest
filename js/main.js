import { setupLoginModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  setupLoginModal();
});


document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.menu-btn');
  const dropdown = document.querySelector('.dropdown-content');

  menuButton.addEventListener('click', function () {
    dropdown.classList.toggle('show');
  });

  // Close dropdown if clicking outside
  document.addEventListener('click', function (event) {
    if (
      !menuButton.contains(event.target) &&
      !dropdown.contains(event.target)
    ) {
      dropdown.classList.remove('show');
    }
  });
});

setupLoginModal();
