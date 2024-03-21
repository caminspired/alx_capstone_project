const dynamicWord = document.getElementById("dynamic-word");
const words = ['tasks', 'work', 'studies', 'home', 'life']
let index = 0;

setInterval(() => {
    dynamicWord.textContent = words[index];
    index = (index + 1) % words.length;
}, 1000);


document.addEventListener('DOMContentLoaded', function() {
    const signupButton = document.querySelector("btn-signup");
    const loginButton = document.querySelector(".btn-login");
    const signupLink = document.querySelector(".signup-link");
    const loginLink = document.querySelector(".login-link");
    const signupModal = document.getElementById("signup-modal");
    const loginModal = document.getElementById("login-modal");

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

    document.querySelectorAll('.close').forEach(function(closeButton) {
        closeButton.addEventListener("click", function() {
            this.closest('.modal').style.display = "none";
        });
    });


    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        validatePassword();
    });

    function validatePassword(password) {
        
        const password = document.getElementById("password").value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const valid = regex.test(password);

        if (valid) {
            matchPasswords(password);
        }
        else {
            alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character (!@#$%^&*).");
        }
    }

    function matchPasswords() {
        const confirmPassword = document.getElementById("confirm_password").value;
        if (confirmPassword == password) {
            signupForm.submit();
        }else {
            alert("Passwords do not match");
          return;
        }
    }

    
    // const userData = {
    //     name: document.getElementById("name").value,
    //     email: document.getElementById("mail").value,
    //     password: password
    // }

    // fetch("/signup_page", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(userData)
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error("Signup failed");
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     alert("Welcome "+ userData.name + "!")
    //     window.location.href = "/dashboard.html";
    // })
    // .catch(error => {
    //     console.error("Error signing up:", error);
    //     alert("Failed to log in. Please try again later.");
    // });

    // const loginForm = document.getElementById("login-form")

    // loginForm.addEventListener("submit", function(event) {
    //     event.preventDefault();
    // })
    
    // const email = document.getElementById("mail").value;
    // const password = document.getElementById("password").value;
    
    // const loginDetails = {
    //     email: email,
    //     password: password
    // };

    // fetch("/login", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(loginDetails)
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         alert("Login failed. Please check your email and password");
    //     }else {
    //         window.location.href = "/dashboard.html";
    //     }
    // })
    // .catch(error => {
    //     console.error("Error:", error);
    //     alert("Failed to log in. Please try again later.");
    // });
});
