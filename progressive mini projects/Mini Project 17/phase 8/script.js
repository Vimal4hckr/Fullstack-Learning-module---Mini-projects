const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const tasks = [];

function renderTasks() {
	taskList.innerHTML = "<h2>Tasks</h2>";

	tasks.forEach(function(task, index) {
		const taskItem = document.createElement("p");
		taskItem.textContent = task;

		const completeButton = document.createElement("button");
		completeButton.textContent = "Complete";

		completeButton.addEventListener("click", function() {
			taskItem.style.textDecoration = "line-through";
		});

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";

		deleteButton.addEventListener("click", function() {
			tasks.splice(index, 1);
			renderTasks();
		});

		taskItem.appendChild(completeButton);
		taskItem.appendChild(deleteButton);

		taskList.appendChild(taskItem);
	});
}

function addTask() {
	const task = taskInput.value.trim();

	if (task === "") {
		return;
	}

	tasks.push(task);

	renderTasks();

	taskInput.value = "";
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
		addTask();
	}
});