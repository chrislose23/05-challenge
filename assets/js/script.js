// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let card = 
        <div id="task-${task.id}" class="task-card card bg-light mb-3" draggable="true">
            <div class="card-body">
                <h5 class="card-title">${task.name}</h5>
                <p class="card-text">${task.description}</p>
                <button class="btn btn-danger delete-btn" data-task-id="${task.id}"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    ;
    return card;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    let taskName = $('#taskName').val();
    let dueDate = $('#dueDate').val();
    let taskDescription = $('#taskDescription').val();

    if (taskName && taskDescription && dueDate) {
        let newTask = {
            id: generateTaskId(),
            name: taskName,
            due: dueDate,
            description: taskDescription
        };

        taskList.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        localStorage.setItem('nextId', JSON.stringify(nextId));

        renderTaskList();
        $('#formModal').modal('hide');
        $('#taskForm')[0].reset();
    } else {
        alert("Complete Task Form!");
    }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    renderTaskList();

    $('#taskForm').submit(handleAddTask);

    $(document).on('click', 'delete-btn', handleDeleteTask);

    $('.lane').droppable({
        accept: '.task-card',
        drop: handleDrop
    });

    $('#dueDate').datepicker();

});