const toDo = document.querySelector('.todo');
const dataTitle = toDo.querySelector('.date-title');
const statusTitle = toDo.querySelector('.status-title');
const addTaskBtn = toDo.querySelector('.add-btn');
const clearDoneTasks = toDo.querySelector('.clear-done-tasks');
const taskListInCompleted = toDo.querySelector('.list-tasks-incompleted');
const taskListCompleted = toDo.querySelector('.list-tasks-completed');

let taskDeskriptionText = toDo.querySelector('.task-title, .task-сategory');

let tasks = [];

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach(item => {
		renderTask(item);
		if (item.status === 'done') {
			const task = taskListInCompleted.querySelector(`[id="${item.id}"]`);
			doneTask(task);
		}
	});
}

addDataTitle();
addTaskStatus();

function addDataTitle() {
	const date = new Date();
	const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
	
	dataTitle.textContent = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

function addTaskStatus() {
	const completeTasks = document.querySelectorAll('.list-tasks-completed .task');
	const incompleteTasks = document.querySelectorAll('.list-tasks-incompleted .task');

	statusTitle.textContent = `${incompleteTasks.length} incomplete, ${completeTasks.length} completed`
}

function renderTask(task) {
	const taskHTML = `<div id="${task.id}" class="task flex items-start mt-4">
			<div class="task-checkbox w-6 h-6 border-2 flex items-center justify-center border-gray-200 rounded-md cursor-pointer mt-0.5">
				<svg class="opacity-0 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 6L3.91667 9L9 1" stroke="#575767" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<div class="task-deskription w-full flex flex-col ml-4">
				<input value="${task.title}" placeholder="Task" data-deskription="title" class="task-title bg-transparent focus-visible:outline-none text-[#575767] text-lg font-medium">
				</input>
				<input value="${task.category}" placeholder="Category" data-deskription="category" class="task-сategory bg-transparent focus-visible:outline-none text-[#B9B9BE] font-semibold mt-1">
				</input>
			</div>
		</div>`;
	
	taskListInCompleted.insertAdjacentHTML('afterbegin', taskHTML);

	const taskText = taskListInCompleted.querySelectorAll(`[id="${task.id}"] input[data-deskription]`);

	taskText.forEach(item => {
		item.addEventListener('input', changeText)
	});
}

function doneTask(task) {
	const taskContainer = task;
	console.log(taskContainer)
	const id = Number(taskContainer.id); 
	const taskIndex = tasks.findIndex((item) => item.id === Number(id));
	const taskDeskription = taskContainer.querySelector('.task-deskription');
	const taskCheckbox = taskContainer.querySelector('.task-checkbox svg');

	taskDeskription.classList.add('opacity-50');
	taskCheckbox.classList.remove('opacity-0');

	taskListCompleted.insertAdjacentElement('afterbegin', taskContainer);
	
	tasks[taskIndex].status = 'done';

	addTaskStatus();

	saveToLocalStorage();
}

function onDoneTask(task) {
	const taskContainer = task.closest('.task');
	const id = Number(taskContainer.id); 
	const taskIndex = tasks.findIndex((item) => item.id === Number(id));
	const taskDeskription = taskContainer.querySelector('.task-deskription');
	const taskCheckbox = taskContainer.querySelector('.task-checkbox svg');

	tasks[taskIndex].status = '';

	taskDeskription.classList.remove('opacity-50');
	taskCheckbox.classList.add('opacity-0');

	taskListInCompleted.insertAdjacentElement('afterbegin', taskContainer);

	saveToLocalStorage();
}

function changeText() {
	const id = this.closest('.task').id;
	const taskIndex = tasks.findIndex((item) => item.id === Number(id));
	const taskDesk = this.dataset.deskription;
	
	tasks[taskIndex][taskDesk] = this.value;

	saveToLocalStorage();
}

function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', ()=> {
	const task = {
		'id' : Date.now(),
		'title' : '',
		'category' : '',
		'status' : '',
	}
	
	renderTask(task);

	tasks.push(task);

	const taskTitle = taskListInCompleted.querySelector('.task-title');

	taskTitle.focus();

	addTaskStatus();
	saveToLocalStorage();
});

clearDoneTasks.addEventListener('click', ()=> {

	const doneTasks = taskListCompleted.querySelectorAll('.task');

	doneTasks.forEach(item => {
		item.remove();
	});

	tasks = tasks.filter(item => item.status !== 'done');

	addTaskStatus();
	saveToLocalStorage();
});

taskListInCompleted.addEventListener('click', (event)=> {
	if (event.target.classList.contains('task-checkbox')) {
		doneTask(event.target.closest('.task'))
	}
});

taskListCompleted.addEventListener('click', (event)=> {
	if (event.target.classList.contains('task-checkbox')) {
		onDoneTask(event.target.closest('.task'))
	}

	addTaskStatus();
});

