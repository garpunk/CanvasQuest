export function setupLoginModal() {
  const modal = document.getElementById("login-modal");
  const openModalBtn = document.getElementById("open-modal");
  const closeModalBtn = document.querySelector(".close");
  const loginForm = document.getElementById("login-form");

  if (!modal || !openModalBtn || !closeModalBtn || !loginForm) {
      console.error("Modal elements not found!");
      return;
  }

  // Open modal
  openModalBtn.addEventListener("click", () => {
      modal.style.display = "flex";
  });

  // Close modal when clicking "X"
  closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });

  loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Sanitize user input (basic)
      const username = document.getElementById("username").value.replace(/[<>\/]/g, "").trim();
      const password = document.getElementById("password").value.replace(/[<>\/]/g, "").trim();

      // Password strength check
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
          alert("Password must be at least 8 characters long and include uppercase, lowercase, and a number.");
          return;
      }

      if (username && password) {
          alert("Login successful!"); 
          modal.style.display = "none"; // Close modal after submission
      } else {
          alert("Please fill in all fields.");
          incrementLoginAttempts();
      }
  });

  // Prevent clickjacking
  if (window.top !== window.self) {
      window.top.location = window.self.location;
  }

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    loginForm.reset(); // Clears all input fields when model is opened
  });
}


