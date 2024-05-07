!function(){const t=document.querySelector(".todo"),e=t.querySelector(".date-title"),s=t.querySelector(".status-title"),n=t.querySelector(".add-btn"),o=t.querySelector(".clear-done-tasks"),a=t.querySelector(".list-tasks-incompleted"),i=t.querySelector(".list-tasks-completed");t.querySelector(".task-title, .task-сategory");let r=[];function c(){const t=document.querySelectorAll(".list-tasks-completed .task"),e=document.querySelectorAll(".list-tasks-incompleted .task");s.textContent=`${e.length} incomplete, ${t.length} completed`}function l(t){const e=`<div id="${t.id}" class="task flex items-start mt-4">\n\t\t\t<div class="task-checkbox w-6 h-6 border-2 flex items-center justify-center border-gray-200 rounded-md cursor-pointer mt-0.5">\n\t\t\t\t<svg class="opacity-0 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t<path d="M1 6L3.91667 9L9 1" stroke="#575767" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t<div class="task-deskription w-full flex flex-col ml-4">\n\t\t\t\t<input value="${t.title}" placeholder="Task" data-deskription="title" class="task-title bg-transparent focus-visible:outline-none text-[#575767] text-lg font-medium">\n\t\t\t\t</input>\n\t\t\t\t<input value="${t.category}" placeholder="Category" data-deskription="category" class="task-сategory bg-transparent focus-visible:outline-none text-[#B9B9BE] font-semibold mt-1">\n\t\t\t\t</input>\n\t\t\t</div>\n\t\t</div>`;a.insertAdjacentHTML("afterbegin",e),a.querySelectorAll(`[id="${t.id}"] input[data-deskription]`).forEach((t=>{t.addEventListener("input",u)}))}function d(t){const e=t;console.log(e);const s=Number(e.id),n=r.findIndex((t=>t.id===Number(s))),o=e.querySelector(".task-deskription"),a=e.querySelector(".task-checkbox svg");o.classList.add("opacity-50"),a.classList.remove("opacity-0"),i.insertAdjacentElement("afterbegin",e),r[n].status="done",c(),k()}function u(){const t=this.closest(".task").id,e=r.findIndex((e=>e.id===Number(t))),s=this.dataset.deskription;r[e][s]=this.value,k()}function k(){localStorage.setItem("tasks",JSON.stringify(r))}localStorage.getItem("tasks")&&(r=JSON.parse(localStorage.getItem("tasks")),r.forEach((t=>{l(t),"done"===t.status&&d(a.querySelector(`[id="${t.id}"]`))}))),function(){const t=new Date;e.textContent=`${["January","February","March","April","May","June","July","August","September","October","November","December"][t.getMonth()]} ${t.getDate()}, ${t.getFullYear()}`}(),c(),n.addEventListener("click",(()=>{const t={id:Date.now(),title:"",category:"",status:""};l(t),r.push(t),a.querySelector(".task-title").focus(),c(),k()})),o.addEventListener("click",(()=>{i.querySelectorAll(".task").forEach((t=>{t.remove()})),r=r.filter((t=>"done"!==t.status)),c(),k()})),a.addEventListener("click",(t=>{t.target.classList.contains("task-checkbox")&&d(t.target.closest(".task"))})),i.addEventListener("click",(t=>{t.target.classList.contains("task-checkbox")&&function(t){const e=t.closest(".task"),s=Number(e.id),n=r.findIndex((t=>t.id===Number(s))),o=e.querySelector(".task-deskription"),i=e.querySelector(".task-checkbox svg");r[n].status="",o.classList.remove("opacity-50"),i.classList.add("opacity-0"),a.insertAdjacentElement("afterbegin",e),k()}(t.target.closest(".task")),c()}))}();