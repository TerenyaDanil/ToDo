const toDo = document.querySelector(".todo");
const dataTitle = toDo.querySelector(".date-title");
const statusTitle = toDo.querySelector(".status-title");
const addTaskBtn = toDo.querySelector(".add-btn");
const clearDoneTasks = toDo.querySelector(".clear-done-tasks");
const taskListContainer = toDo.querySelector(".tasks-container");
const taskListInCompleted = toDo.querySelector(".list-tasks-incompleted");
const taskListCompleted = toDo.querySelector(".list-tasks-completed");

let taskDeskriptionText = toDo.querySelector(".task-title, .task-сategory");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((item) => {
    renderTask(item);
    if (item.status === "done") {
      const task = taskListContainer.querySelector(`[id="${item.id}"]`);
    }
  });
}

addDataTitle();
addTaskStatus();

function addDataTitle() {
  const date = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  dataTitle.textContent = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function addTaskStatus() {
  const completeTasks = document.querySelectorAll(
    ".list-tasks-completed .task",
  );
  const incompleteTasks = document.querySelectorAll(
    ".list-tasks-incompleted .task",
  );

  statusTitle.textContent = `${incompleteTasks.length} incomplete, ${completeTasks.length} completed`;
}

function renderTask(task) {
  const taskHTML = `<div id="${task.id}" class="task mt-4 first:mt-0 flex items-start">
						<div
							class="task-checkbox mt-0.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-2 border-gray-200"
						>
							<svg
							class="pointer-events-none opacity-0"
							width="10"
							height="10"
							viewBox="0 0 10 10"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							>
							<path
								d="M1 6L3.91667 9L9 1"
								stroke="#575767"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							</svg>
						</div>
						<div class="task-deskription ml-4 flex w-full flex-col">
							<input
							value="${task.title}"
							placeholder="Task"
							data-deskription="title"
							class="task-title bg-transparent text-lg font-medium text-[#575767] focus-visible:outline-none"
							/>
							<input
							value="${task.category}"
							placeholder="Category"
							data-deskription="category"
							class="task-сategory mt-1 bg-transparent font-semibold text-[#B9B9BE] focus-visible:outline-none"
							/>
						</div>
					</div>`;

  if (task.status === "") {
    taskListInCompleted.insertAdjacentHTML("afterbegin", taskHTML);
  } else {
    taskListCompleted.insertAdjacentHTML("afterbegin", taskHTML);
  }

  const taskContainer = taskListContainer.querySelector(`[id="${task.id}"]`);
  const taskText = taskContainer.querySelectorAll(`input[data-deskription]`);

  taskText.forEach((item) => {
    item.addEventListener("input", changeText);
  });

  if (task.status === "done") {
    addDoneCss(taskContainer);
  }
}

function addDoneCss(taskContainer) {
  const taskDeskription = taskContainer.querySelector(".task-deskription");
  const taskCheckbox = taskContainer.querySelector(".task-checkbox svg");

  taskCheckbox.classList.toggle("opacity-0");
  taskDeskription.classList.toggle("opacity-50", "pointer-events-none");
}

function doneTask(task) {
  const taskContainer = task;
  const id = Number(taskContainer.id);
  const taskIndex = tasks.findIndex((item) => item.id === Number(id));

  addDoneCss(taskContainer);

  tasks[taskIndex].status = tasks[taskIndex].status === "done" ? "" : "done";

  if (tasks[taskIndex].status === "done") {
    taskListCompleted.insertAdjacentElement("afterbegin", taskContainer);
  } else {
    taskListInCompleted.insertAdjacentElement("afterbegin", taskContainer);
  }

  addTaskStatus();

  saveToLocalStorage();
}

function changeText() {
  const id = this.closest(".task").id;
  const taskIndex = tasks.findIndex((item) => item.id === Number(id));
  const taskDesk = this.dataset.deskription;

  tasks[taskIndex][taskDesk] = this.value;

  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", () => {
  const task = {
    id: Date.now(),
    title: "",
    category: "",
    status: "",
  };

  renderTask(task);

  tasks.push(task);

  const taskTitle = taskListInCompleted.querySelector(".task-title");

  taskTitle.focus();

  addTaskStatus();
  saveToLocalStorage();
});

clearDoneTasks.addEventListener("click", () => {
  const doneTasks = taskListCompleted.querySelectorAll(".task");

  doneTasks.forEach((item) => {
    item.remove();
  });

  tasks = tasks.filter((item) => item.status !== "done");

  addTaskStatus();
  saveToLocalStorage();
});

taskListContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("task-checkbox")) {
    doneTask(event.target.closest(".task"));
  }
});
