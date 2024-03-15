document.addEventListener('DOMContentLoaded', function() {
    const navIcon = document.getElementsByClassName("nav-icon")

    navIcon.addEventListener("click", function() {
        //input documnet loading transition style later ;
    });

    const searchIcon = document.getElementById("search-icon")
    
    searchIcon.addEventListener("click", function() {
        searchInput = document.getElementById("searchInput").value;
        searchResults = document.getElementById("searchResults")

        fetch("/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchInput)
        })
        .then(response => {
            if (!response.ok) {
                alert("No results found");
            }else {
                window.location.href = searchResults;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error. Please retry.");
        });

        searchResults.addEventListener("click", function(event) {
            if (event.target.contains(searchResults)) {
                event.target.style.display = 'none';
            }
        });
    });
    
    
    // Task Completion Handling
    const tasks = document.querySelectorAll('.task-list li');
    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function() {
            // Toggle completion status
            if (checkbox.checked) {
                task.classList.add('completed');
            } else {
                task.classList.remove('completed');
            }
        });
    });

    // Display confetti animation when a task is completed
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach(task => {
        // Trigger confetti animation
        // Code for displaying confetti animation goes here
    });
});
    
    // Adding New Tasks
    const addTaskButton = document.getElementById('add-task-button');
    const addTaskForm = document.getElementById('add-task-form');
    
    addTaskButton.addEventListener('click', function() {
    // Display add task form/modal
    addTaskForm.style.display = 'block';
    });
    
    // Category Management
    // Functions to add, delete, and edit categories go here
    
    // Calendar Display
    // Functions to display tasks on a calendar and switch between views go here
    
    // Account Information
    // Functions to display user account information and settings go here
    
    // Notifications
    // Functions to display notifications for task reminders and events go here
    
    // Search Functionality
    // Functions for searching through tasks and categories go here
    
    // Other Utilities
    // Utility functions for date/time formatting, validation, etc. go here
    });
    