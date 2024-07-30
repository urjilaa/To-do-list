const A = document.getElementById('task-area');
const B = document.getElementById('single-task');
const C = document.getElementById('tasks');

//Add a new task to the list
function addTask(event) {
    event.preventDefault();
    if (B.value === '') {
        alert("You must write something !");
        return 
    };
    
    const task = createTask(B.value);
    C.appendChild(task);
    B.value = '';   
}

//Create a new task element
function createTask(taskName) {
    const task = document.createElement('li');
    task.classList.add('task');
    task.innerHTML = `
        <input type="checkbox">
        <label>${taskName}</label>
        <span class="edit">edit</span>
        <span class="delete">x</span>
    `;

    //Add an edit button
    const editButton = task.querySelector('.edit');
    editButton.addEventListener('click', editTask);

    //Add a delete button
    const deleteButton = task.querySelector('.delete');
    deleteButton.addEventListener('click', deleteTask);

    return task;
}

//Delete a task from the list
function deleteTask(event) {
    event.target.parentElement.remove();
}

// Edit a task
function editTask(event) {
    const task = event.target.parentElement;
    const label = task.querySelector('label');
    const currentTaskName = label.innerText;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentTaskName;
    task.insertBefore(input, label);
    task.removeChild(label);

    const saveButton = document.createElement('span');
    saveButton.classList.add('save');
    saveButton.innerText = 'save';
    task.insertBefore(saveButton, event.target);
    task.removeChild(event.target);

    saveButton.addEventListener('click', function () {
        const newTaskName = input.value;
        const newLabel = document.createElement('label');
        newLabel.innerText = newTaskName;

        task.insertBefore(newLabel, input);
        task.removeChild(input);

        task.insertBefore(event.target, saveButton);
        task.removeChild(saveButton);
    });
}

A.addEventListener('submit', addTask);