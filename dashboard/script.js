// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const categoryInput = document.querySelector(".category-input");
const categoryButton = document.querySelector(".category-button");
const categoryList = document.querySelector(".category-list");
const searchInput = document.querySelector(".search-input");
const categoryFilter = document.querySelector(".filter-category");
const categoryDropdown = document.querySelector(".categoryMenu");


// Event listeners
document.addEventListener("DOMContentLoaded", createTodoList);
todoButton.addEventListener('click', addTodo);
filterOption.addEventListener('change', filterTodo);
document.addEventListener("DOMContentLoaded", getCategories);
categoryButton.addEventListener('click', addCategory);
categoryList.addEventListener('click', deleteCategory);
categoryList.addEventListener('click', editCategoryHandler);
// categoryDropdown.addEventListener('change', assignCategories);
searchInput.addEventListener('input', searchTodo);



// Functions
function addTodo() {
    const newTodo = {
        description: todoInput.value,
        category: null,
        priority: 'Low',
        dueDate: null,
        notify: false
    };
    // Add todo to local storage
    saveLocalTodo(newTodo);
    createTodoCard(newTodo);
    todoInput.value = "";
}

function searchTodo() {
    const searchTerm = searchInput.value.toLowerCase();
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        const todoText = todo.querySelector('.todo-item').innerText.toLowerCase();
        if (todoText.includes(searchTerm)) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
}

function assignCategories(event, id) {
    todos.forEach(todo => {
        const category = event.target.value;
        todo.dataset.category = category;
    });
    // Update local storage after assigning categories
    updateLocalTodos(to);
}

function deleteTodo(event, id) {
    const item = event.target;
    // Delete todo from list
    const todo = item.closest('.todo');
    todo.classList.add("fall");
    removeLocalTodos(id);
    todo.addEventListener("transitionend", function() {
        todo.remove();
    })

}

function markComplete(event, id) {
    // Check todo as complete
    const item = event.target;

        const todo = event.target.closest(".todo");
        //TODO: update TODO in storage
        todo?.classList.toggle('completed');
}

function editTodo(event, todo) {
    const todoText = event.target;
    // Enable content editing
    todoText.contentEditable = true;
    // Focus on the todo text for immediate editing
    todoText.focus();
    // Add event listener to capture when editing is finished
    todoText.addEventListener('blur', function() {
        // Disable content editing after editing is finished
        todoText.contentEditable = false;
        updateLocalTodos({...todo, description: event.target.innerText});
    });
}

function filterTodo() {
    const selectedFilter = filterOption.value;
    const selectedCategory = categoryFilter.value;    
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        const todoCategory = todo.querySelector('.categoryMenu').value;
        const todoCompleted = todo.classList.contains('completed');

        let displayTodo = true;    
    todos.forEach(todo => {
        switch(selectedFilter) {
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

        if (selectedCategory !== "all" && todoCategory !== selectedCategory) {
            displayTodo = false;
        }

        todo.style.display = displayTodo ? "flex" : "none";
    });
})}

function saveLocalTodo(todo) {
    // Check if there are already items in the todo list
    const todos = fetchTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function createTodoCard(todo) {
    const {id, description, category, priority, dueDate, notify} = todo;

    // Create todo card 
    const todoCard = document.createElement('li');
    todoCard.classList.add('todo');
    //add todo content 
    const newTodo = document.createElement('div');
    newTodo.innerText = description;
    newTodo.classList.add('todo-item');
    newTodo.addEventListener('click', (event) => editTodo(event, todo))
    todoCard.appendChild(newTodo);
    //add container for control buttons
    const controlDiv = document.createElement('div');
    controlDiv.classList.add('control-div');
    const controlFirstRow = document.createElement('div');
    controlFirstRow.classList.add('control-first-row');
    const controlSecondRow = document.createElement('div');
    controlSecondRow.classList.add('control-second-row');
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('control-button-container');

    const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn', 'control-button');
        completedButton.addEventListener('click', (event) => markComplete(event));
        buttonsDiv.appendChild(completedButton);
        // Trash button for deleting tasks
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn', 'control-button');
        deleteButton.addEventListener('click', (event) => deleteTodo(event, id));
        buttonsDiv.appendChild(deleteButton);
        controlFirstRow.appendChild(buttonsDiv);
        // add notify me checkbox 
        const notifyButton = document.createElement('input');
        const notifyDiv = document.createElement('div');
        notifyButton.type = 'checkbox';
        notifyButton.id = 'notify';
        notifyButton.checked = notify;
        const notifyLabel = document.createElement('label');
        notifyLabel.htmlFor = 'notify';
        notifyLabel.innerText = 'Notify Me'
        notifyDiv.appendChild(notifyButton);
        notifyDiv.appendChild(notifyLabel);
        controlFirstRow.appendChild(notifyDiv);
        controlDiv.appendChild(controlFirstRow);
        // Append category dropdown menu
        const {categoryDropdown, categoryLabel} = createCategoryDropdown({id, category});
        controlSecondRow.appendChild(categoryLabel);
        controlSecondRow.appendChild(categoryDropdown);
        // Append priority dropdown menu
        const {priorityDropdown, priorityLabel} = createPriorityDropdown({id, priority});
        controlSecondRow.appendChild(priorityLabel);
        controlSecondRow.appendChild(priorityDropdown);
        controlDiv.appendChild(controlSecondRow);        
        const datePicker = createDueDatePicker({id, dueDate});
        controlDiv.appendChild(datePicker);
        // Append todo card to todo list
        todoCard.appendChild(controlDiv);
        todoList.appendChild(todoCard);
}

function fetchTodos() {
        // Check if there are already items in the todo list
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function createTodoList() {
    const todos = fetchTodos();
    todos.forEach(function(todo){
        createTodoCard(todo);
    }); 
}

function removeLocalTodos(id) {
    const todos = fetchTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalTodos(todo) {
    const todos = fetchTodos();
    const updatedTodos = todos.map((td) => {
            return td.id === todo.id ? todo : td
    })
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

function addCategory() {
    const categoryContainer = document.querySelector('.category-list');
    // Create category div 
    const categoryDiv = document.createElement('li');
    categoryDiv.classList.add('category');
    // Create list item
    const newCategory = document.createElement('div');
    newCategory.innerText = categoryInput.value;
    newCategory.classList.add('category-item');
    categoryDiv.appendChild(newCategory);
    categoryContainer.appendChild(categoryDiv);
    // Add category to local storage
    saveLocalCategories(categoryInput.value)
    // Trash button for deleting categories
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', deleteCategory);
    categoryDiv.appendChild(deleteButton);
    // Append category div to category list
    categoryList.appendChild(categoryDiv);
    // Clear category input value
    categoryInput.value = "";
}

function createCategoryDropdown({id, category}) {
    const categoryId = `category-${id}`;
    const categories = fetchCategory();
    const categoryLabel = document.createElement('label');
    categoryLabel.htmlFor = categoryId;
    categoryLabel.innerText = 'Category';
    const categoryDropdown = document.createElement('select');
    categoryDropdown.classList.add('categoryMenu');
    categoryDropdown.value = category;
    categories.forEach(function(category) {
        const option = document.createElement('option');
        option.innerText = category;
        categoryDropdown.appendChild(option);
    });
    return {categoryDropdown, categoryLabel};
}

function createPriorityDropdown({id, priority}) {
    const priorityOptions = ['Low', 'Medium', 'High'];

    const priorityId = `priority-${id}`;
    const priorityLabel = document.createElement('label');
    priorityLabel.htmlFor = priorityId;
    priorityLabel.innerText = 'Priority'
    const priorityDropdown = document.createElement('select');
    priorityDropdown.classList.add('categoryMenu');
    priorityDropdown.id = priorityId;
    priorityOptions.forEach(function(priority) {
        const option = document.createElement('option');
        option.innerText = priority;
        priorityDropdown.appendChild(option);
    });
    priorityDropdown.value = priority;
    return {priorityDropdown, priorityLabel};
}

function createDueDatePicker({id, dueDate}) {
    const dueDateId = `dueDate-${id}`;
    const datePicker = document.createElement('time');
    datePicker.id = dueDateId;
    datePicker.value = dueDate;
    return datePicker; 
}

function deleteCategory(event) {
    const item = event.target;
    // Delete category from list
        const category = item.parentElement;
        const categoryText = category.children[0].innerText;
        // Animate falling 
        category.classList.add("fall");
        removeLocalCategory(categoryText);
        category.addEventListener("transitionend", function() {
            category.remove();
        })

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
