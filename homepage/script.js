document.addEventListener('DOMContentLoaded', function() {
    // Selecting elements and modals
    const signupButton = document.querySelector(".btn-signup");
    const loginButton = document.querySelector(".btn-login");
    const signupLink = document.querySelector(".signup-link");
    const loginLink = document.querySelector(".login-link");
    const signupModal = document.getElementById("signup-modal");
    const loginModal = document.getElementById("login-modal");

    // Event listeners for displaying modals
    signupButton.addEventListener("click", function() {
        signupModal.style.display = 'block';
        loginModal.style.display = 'none';
    });

    signupLink.addEventListener("click", function() {
        signupModal.style.display = 'block';
        loginModal.style.display = 'none';
    });

    loginButton.addEventListener("click", function() {
        loginModal.style.display = 'block';
        signupModal.style.display = 'none';
    });

    loginLink.addEventListener("click", function() {
        loginModal.style.display = 'block';
        signupModal.style.display = 'none';
    });

    // Event listener for closing modals
    document.querySelectorAll('.close').forEach(function(closeButton) {
        closeButton.addEventListener("click", function() {
            this.closest('.modal').style.display = "none";
        });
    });

    // Sign-up form submission
    const signupForm = document.getElementById("signup-form");
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        // Extracting user data from form fields
        const userData = {
            name: document.getElementById("name").value,
            email: document.getElementById("mail").value,
            password: document.getElementById("password").value
        };
        // Saving user data to local storage
        localStorage.setItem('userData', JSON.stringify(userData));
        // Informing the user about successful account creation
        alert("Account created successfully!");
        // Resetting the form fields
        signupForm.reset();
        // Automatically logging in the user and redirecting to the same URL
        localStorage.setItem('isLoggedIn', true);
        console.log("Redirecting to dashboard homepage");
        window.location.href = "/alx_capstone_project/dashboard/index.html";
    });

  // Checking if the user is already logged in upon page load
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
      // Redirecting to the dashboard if the user is already logged in
      console.log("User is already logged in. Redirecting to dashboard homepage.");
      window.location.href = "/alx_capstone_project/dashboard/index.html";
  } else {
      // Log-in form submission
      const loginForm = document.getElementById("login-form");
      loginForm.addEventListener("submit", function(event) {
          event.preventDefault();
          // Retrieving stored user data from local storage
          const storedUserData = JSON.parse(localStorage.getItem('userData'));
          const email = document.getElementById("mail").value;
          const password = document.getElementById("password").value;
          // Checking if provided email and password match stored user data
          if (storedUserData && email === storedUserData.email && password === storedUserData.password) {
              // Informing the user about successful login
              alert("Login successful!");
              // Resetting the form fields
              loginForm.reset();
              // Automatically logging in the user and redirecting to the same URL
              localStorage.setItem('isLoggedIn', true);
              console.log("Redirecting to dashboard homepage");
              window.location.href = "/alx_capstone_project/dashboard/index.html";
          } else {
              // Informing the user about invalid credentials
              alert("Invalid email or password. Please try again.");
          }
      });
  }
});
