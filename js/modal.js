// Open Login Modal
function openLoginModal() {
    const loginModal = document.getElementById("login-modal");
    const loginForm = document.getElementById("login-form");
    loginModal.style.display = "flex";
    loginForm.reset();
}
  
// Close Login Modal
function closeLoginModal() {
    const loginModal = document.getElementById("login-modal");
    loginModal.style.display = "none";
}
  
// Open Register Modal
function openRegisterModal() {
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");
    const registerForm = document.getElementById("register-form");
  
    loginModal.style.display = "none";
    registerModal.style.display = "flex";
    registerForm.reset();
}
  
// Close Register Modal
function closeRegisterModal() {
    const registerModal = document.getElementById("register-modal");
    registerModal.style.display = "none";
}
  
// Close Modals on Outside Click
function closeModalsOnClick(event) {
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");
    
    if (event.target === loginModal) loginModal.style.display = "none";
    if (event.target === registerModal) registerModal.style.display = "none";
}
  
// Register Form Handler
function handleRegisterForm(event) {
    event.preventDefault();
  
    const newName = document.getElementById("new-name").value.trim();
    const newUsername = document.getElementById("new-username").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert("Password must include uppercase, lowercase, and a number.");
      return;
    }
  
    const user = {
      name: newName, 
      username: newUsername,
      password: newPassword,
    };
  
    // Save user to localStorage
    localStorage.setItem("testUser", JSON.stringify(user));
  
    alert("Account created! You can now log in.");
    closeRegisterModal();
    openLoginModal();
}
  
// Login Form Handler
function handleLoginForm(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
  
    const storedUser = JSON.parse(localStorage.getItem("testUser"));
  
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      alert("Login successful!");
  
      // Update HTML to show the user's name
      const welcomeMessage = document.querySelector("h1"); 
      welcomeMessage.textContent = `Welcome, ${storedUser.name}!`;
  
      closeLoginModal();
    } else {
        alert("Invalid username or password.");
    }
}
  
// Main function
export function setupLoginModal() {
    const openModalBtn = document.getElementById("open-modal");
    const closeModalBtn = document.querySelector(".close");
    const closeRegisterBtn = document.querySelector(".close-register");
    const createAccountLink = document.getElementById("login-modal").querySelector("a");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    // Event Listeners
    openModalBtn.addEventListener("click", openLoginModal);
    closeModalBtn.addEventListener("click", closeLoginModal);
    closeRegisterBtn.addEventListener("click", closeRegisterModal);
    createAccountLink.addEventListener("click", (e) => {
    e.preventDefault();
    openRegisterModal();
    });

    // Close modals when clicking outside of them
    window.addEventListener("click", closeModalsOnClick);

    // Handle form submissions
    registerForm.addEventListener("submit", handleRegisterForm);
    loginForm.addEventListener("submit", handleLoginForm);
}
    