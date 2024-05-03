const toDo = document.querySelector('.todo');
const dataTitle = toDo.querySelector('.date-title');
const statusTitle = toDo.querySelector('.status-title');
const addTaskBtn = toDo.querySelector('.add-btn');
const taskList = toDo.querySelector('.list-tasks-incompleted');



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

addDataTitle()
addTaskStatus()

addTaskBtn.addEventListener('click', ()=> {
	taskList.insertAdjacentHTML('afterbegin', `
		<div class="task flex items-start mt-4">
			<div class="checkbox w-6 h-6 border-2 flex items-center justify-center border-gray-200 rounded-md cursor-pointer mt-0.5">
				<svg class="opacity-0" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 6L3.91667 9L9 1" stroke="#575767" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<div class="flex flex-col ml-4">
				<div contenteditable class="task-title text-[#575767] text-lg font-medium">
					Upload 1099-R to TurboTax
				</div>
				<div contenteditable class="task-deskription text-[#B9B9BE] font-semibold mt-1">
					💰 Finance
				</div>
			</div>
		</div>
	`);

	addTaskStatus()
})