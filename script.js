function createDeleteButton(li) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });
    return deleteButton;
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        const textNode = document.createTextNode(taskText);
        let deleteButton = createDeleteButton(li);

        li.appendChild(checkbox);
        li.appendChild(textNode);
        li.appendChild(deleteButton)

        taskList.appendChild(li);

        taskInput.value = "";
        saveTasks();
    }
}

// Функция для загрузки и рендеринга задач из localStorage
function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        const textNode = document.createTextNode(task.text);
        let deleteButton = createDeleteButton(li);

        li.appendChild(checkbox);
        li.appendChild(textNode);
        li.appendChild(deleteButton);

        if (task.completed) {
            li.classList.add("completed");
            checkbox.checked = true;
        }

        taskList.appendChild(li);
    });
}

// Функция для сохранения задач в localStorage
function saveTasks() {
    const taskElements = document.querySelectorAll("#taskList li");
    const tasks = [];

    taskElements.forEach(taskElement => {
        tasks.push({
            text: taskElement.textContent.split("Delete")[0],
            completed: taskElement.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Вызываем функцию renderTasks для загрузки и отображения задач при загрузке страницы
renderTasks();
