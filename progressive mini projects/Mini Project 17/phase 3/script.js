const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

function addTask() {
	const task = taskInput.value.trim();

	if (task === "") {
		return;
	}

	const taskItem = document.createElement("p");
	taskItem.textContent = task;

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";

	deleteButton.addEventListener("click", function() {
		taskItem.remove();
	});

	taskItem.appendChild(deleteButton);
	taskList.appendChild(taskItem);

	taskInput.value = "";
}

addButton.addEventListener("click", addTask);