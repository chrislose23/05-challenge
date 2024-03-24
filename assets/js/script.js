// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Function to create a task card
function createTaskCard(task) {
    let card = `
        <div id="task-${task.id}" class="task-card card bg-light mb-3" draggable="true">
            <div class="card-body">
                <h5 class="card-title">${task.name}</h5>
                <p class="card-text">${task.description}</p>
                <button class="btn btn-danger delete-btn" data-task-id="${task.id}"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
    return card;
}

// Function to render the task list and make cards draggable
function renderTaskList() {
    $("#todo-cards").empty();
    $("#in-progress-cards").empty();
    $("#done-cards").empty();

    taskList.forEach(task => {
        let card = createTaskCard(task);
        $(`#${task.status}-cards`).append(card);
    });

    $(".task-card").draggable({
        revert: "invalid",
        cursor: "move",
        zIndex: 1000
    });
}

// Function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    let taskName = $("#taskName").val();
    let taskDescription = $("#taskDescription").val();

    if (taskName && taskDescription) {
        let newTask = {
            id: generateTaskId(),
            name: taskName,
            description: taskDescription,
            status: "todo"
        };

        taskList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        localStorage.setItem("nextId", JSON.stringify(nextId));

        renderTaskList();
        $("#formModal").modal("hide");
        $("#taskForm")[0].reset();
    } else {
        alert("Complete Task Form");
    }
}

// Function to handle deleting a task
function handleDeleteTask(event) {
    let taskId = $(this).data("task-id");
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    let taskId = ui.draggable.attr("id").split("-")[1];
    let newStatus = $(this).attr("id");
    let taskIndex = taskList.findIndex(task => task.id == taskId);

    taskList[taskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $("#taskForm").submit(handleAddTask);

    $(document).on("click", ".delete-btn", handleDeleteTask);

    $(".lane").droppable({
        accept: ".task-card",
        drop: handleDrop
    });

    $("#dueDate").datepicker();
});