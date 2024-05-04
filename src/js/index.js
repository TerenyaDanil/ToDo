const toDo = document.querySelector('.todo');
const dataTitle = toDo.querySelector('.date-title');
const statusTitle = toDo.querySelector('.status-title');
const addTaskBtn = toDo.querySelector('.add-btn');
const taskListInCompleted = toDo.querySelector('.list-tasks-incompleted');
const taskListCompleted = toDo.querySelector('.list-tasks-completed');

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

addDataTitle();
addTaskStatus();

addTaskBtn.addEventListener('click', ()=> {
	taskListInCompleted.insertAdjacentHTML('afterbegin', `
		<div class="task w-1/2 flex items-start mt-4">
			<div class="task-checkbox w-6 h-6 border-2 flex items-center justify-center border-gray-200 rounded-md cursor-pointer mt-0.5">
				<svg class="opacity-0 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 6L3.91667 9L9 1" stroke="#575767" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<div class="task-deskription w-1/2 flex flex-col ml-4">
				<input value="Upload 1099-R to TurboTax" class="task-title bg-transparent focus-visible:outline-none text-[#575767] text-lg font-medium" placeholder="Task">
				</input>
				<input value="💰 Finance" class="task-сategory bg-transparent focus-visible:outline-none text-[#B9B9BE] font-semibold mt-1" placeholder="Category">
				</input>
			</div>
		</div>
	`);
	addTaskStatus();
});

taskListInCompleted.addEventListener('click', (event)=> {
	if (event.target.classList.contains('task-checkbox')) {
		const taskContainer = event.target.closest('.task');
		const taskDeskription = taskContainer.querySelector('.task-deskription');
		const taskCheckbox = taskContainer.querySelector('.task-checkbox svg');

		taskDeskription.classList.add('opacity-50');
		taskCheckbox.classList.remove('opacity-0');

		taskListCompleted.insertAdjacentElement('afterbegin', taskContainer);

	}
	addTaskStatus();
});

taskListCompleted.addEventListener('click', (event)=> {
	if (event.target.classList.contains('task-checkbox')) {
		const taskContainer = event.target.closest('.task');
		const taskDeskription = taskContainer.querySelector('.task-deskription');
		const taskCheckbox = taskContainer.querySelector('.task-checkbox svg');

		taskDeskription.classList.remove('opacity-50');
		taskCheckbox.classList.add('opacity-0');

		taskListInCompleted.insertAdjacentElement('afterbegin', taskContainer);
	}
	addTaskStatus();
});