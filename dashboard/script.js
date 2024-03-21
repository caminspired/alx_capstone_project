// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const categoryInput = document.querySelector(".category-input");
const categoryButton = document.querySelector(".category-button");
const categoryList = document.querySelector(".category-list");



// Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
todoList.addEventListener('click', editTodoHandler);
document.addEventListener("DOMContentLoaded", getCategories);
categoryButton.addEventListener('click', addCategory);
categoryList.addEventListener('click', deleteCategory);
categoryList.addEventListener('click', editCategoryHandler);
categoryDropdown.addEventListener('change', assignCategories)



// Functions
function addTodo() {
    // Create task div 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add todo to local storage
    saveLocalTodos(todoInput.value)
    // Create a div to hold buttons
    const controlDiv = document.createElement('div');
    controlDiv.classList.add('control-div');
    // Check button for completed tasks
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    controlDiv.appendChild(completedButton);
    // Trash button for deleting tasks
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    controlDiv.appendChild(deleteButton);
    // Append category dropdown menu for selection
    const categoryDropdown = createCategoryDropdown();
    controlDiv.appendChild(categoryDropdown);
    // Append task div to task list
    todoDiv.appendChild(controlDiv);
    todoList.appendChild(todoDiv);
    // Clear todo input value
    todoInput.value = "";
}

function assignCategories(event) {
    const todos = document.querySelectorAll('.todo-item');
    const todosText = Array.from(todos).map(category => category.innerText);
    localStorage.setItem('category', JSON.stringify(todosText));
}

function deleteCheck(event) {
    const item = event.target;
    // Delete todo from list
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        const todoText = todo.children[0].innerText;
        // Animate falling 
        todo.classList.add("fall");
        removeLocalTodos(todoText);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        })
    }
    // Check todo as complete
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function editTodoHandler(event) {
    const item = event.target;
    // Check if the user clicked on the todo item itself
    if (item.classList.contains('todo-item')) {
        const todo = item.parentElement;
        // Call the editTodo function with the parent todo element
        editTodo(todo); 
    }
}

function editTodo(todo) {
    const todoText = todo.querySelector('.todo-item');
    // Enable content editing
    todoText.contentEditable = true;
    // Focus on the todo text for immediate editing
    todoText.focus();
    // Add event listener to capture when editing is finished
    todoText.addEventListener('blur', function() {
        // Disable content editing after editing is finished
        todoText.contentEditable = false;
        updateLocalTodos();
    });
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "pending":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // Check if there are already items in the todo list
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
        // Check if there are already items in the todo list
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        // Create todo div 
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create list item
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Create a div to hold buttons
        const controlDiv = document.createElement('div');
        controlDiv.classList.add('control-div');
        // Check button for completed tasks
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        controlDiv.appendChild(completedButton);
        // Trash button for deleting tasks
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        controlDiv.appendChild(deleteButton);
        // Append category dropdown menu for selection
        const categoryDropdown = createCategoryDropdown();
        controlDiv.appendChild(categoryDropdown);
        // Append task div to task list
        todoDiv.appendChild(controlDiv);
        todoList.appendChild(todoDiv);
    }) 
}

function removeLocalTodos(todoText) {
    // Check if there are already items in the todo list
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalTodos() {
    const todos = document.querySelectorAll('.todo-item');
    const todosText = Array.from(todos).map(todo => todo.innerText);
    localStorage.setItem('todos', JSON.stringify(todosText));
}

function addCategory() {
    // Create category div 
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    // Create list item
    const newCategory = document.createElement('li');
    newCategory.innerText = categoryInput.value;
    newCategory.classList.add('category-item');
    categoryDiv.appendChild(newCategory);
    // Add category to local storage
    saveLocalCategories(categoryInput.value)
    // Trash button for deleting categories
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    categoryDiv.appendChild(deleteButton);
    // Append category div to category list
    categoryList.appendChild(categoryDiv);
    // Clear category input value
    categoryInput.value = "";
}

function createCategoryDropdown() {
    const categories = fetchCategory();
    const categoryDropdown = document.createElement('select');
    categoryDropdown.classList.add('categoryMenu');
    categories.forEach(function(category) {
        const option = document.createElement('option');
        option.innerText = category;
        categoryDropdown.appendChild(option);
    })
    return categoryDropdown;
}

function deleteCategory(event) {
    const item = event.target;
    // Delete category from list
    if (item.classList[0] === "delete-btn") {
        const category = item.parentElement;
        const categoryText = category.children[0].innerText;
        // Animate falling 
        category.classList.add("fall");
        removeLocalCategory(categoryText);
        category.addEventListener("transitionend", function() {
            category.remove();
        })
}
}

function editCategoryHandler(event) {
    const item = event.target;
    // Check if the user clicked on the category item itself
    if (item.classList.contains('category-item')) {
        const category = item.parentElement;
        // Call the editCategory function with the parent category element
        editCategory(category); 
    }
}

function editCategory(category) {
    const categoryText = category.querySelector('.category-item');
    // Enable content editing
    categoryText.contentEditable = true;
    // Focus on the category text for immediate editing
    categoryText.focus();
    // Add event listener to capture when editing is finished
    categoryText.addEventListener('blur', function() {
        // Disable content editing after editing is finished
        categoryText.contentEditable = false;
        // Update category text
        updateLocalCategories();
    });
}

function saveLocalCategories(category) {
    // Check if there are already items in the category list
    const categories = fetchCategory();
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories))
}

function getCategories() {
    // Check if there are already items in the category list
    const categories = fetchCategory();
    categories.forEach(function(category){
    // Create category div 
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');

    // Create list item
    const newCategory = document.createElement('li');
    newCategory.innerText = category;
    newCategory.classList.add('category-item');
    categoryDiv.appendChild(newCategory);

    // Trash button for deleting categories
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    categoryDiv.appendChild(deleteButton);

    // Append task div to category list
    categoryList.appendChild(categoryDiv);
}) 
}

function removeLocalCategory(categoryText) {
// Check if there are already items in the category list
const categories = fetchCategory();
const categoryIndex = categories.indexOf(categoryText);
categories.splice(categoryIndex, 1);
localStorage.setItem('categories', JSON.stringify(categories));
}

function updateLocalCategories() {
const categories = document.querySelectorAll('.category-item');
const categoryText = Array.from(categories).map(category => category.innerText);
localStorage.setItem('categories', JSON.stringify(categoryText));
}

function fetchCategory() {
    let categories;
    if (localStorage.getItem('categories') === null) {
        categories = [];
    }else {
        categories = JSON.parse(localStorage.getItem('categories'))
    }
    return categories;
}
